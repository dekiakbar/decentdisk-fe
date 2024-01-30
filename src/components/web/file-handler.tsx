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

/**
 *
 * @param {MediaPlayerProps} internalCid
 *
 * @returns {FC}
 */
const FileHandler: FC<MediaPlayerProps> = ({ internalCid }) => {
  const streamUrl = `/api/stream/${internalCid}`;
  const mimeType = decodeMimeType(internalCid);
  let content;
  if (isSupportedByReactPlayer(mimeType)) {
    content = (
      <ReactPlayer
        url={streamUrl}
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    );
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