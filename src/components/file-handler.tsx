import dynamic from "next/dynamic";
import { FC } from "react";
import {
  decodeMimeType,
  isImage,
  isSupportedByReactPlayer,
} from "@/utils/file-handler-helper";
import Image from "next/image";
import Link from "next/link";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface MediaPlayerProps {
  internalCid: string;
}

const FileHandler: FC<MediaPlayerProps> = ({ internalCid }) => {
  const streamUrl = `${process.env.NEXT_PUBLIC_API_URL}/view/${internalCid}`;
  const mimeType = decodeMimeType(internalCid);
  let content;
  if (isSupportedByReactPlayer(mimeType)) {
    content = <ReactPlayer url={streamUrl} controls={true} playing={true} />;
  } else if (isImage(mimeType)) {
    content = (
      <Image
        src={streamUrl}
        alt="File Image"
        width="100"
        height="100"
        layout="responsive"
      />
    );
  } else {
    content = <Link href={streamUrl}>Download Me</Link>;
  }

  return <>{content}</>;
};

export default FileHandler;
