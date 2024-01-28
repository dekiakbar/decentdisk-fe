import { useSession } from "next-auth/react";
import Header from "@/components/web/header/main";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { File } from "@/interfaces/file";
import { ParsedUrlQuery } from "querystring";
import {
  decodeMimeType,
  isImage,
  isSupportedByReactPlayer,
} from "@/utils/file-handler-helper";
import Image from "next/image";
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
    content = <p>File is not supported to play</p>;
  }

  return <>{content}</>;
};

export default FileHandler;
