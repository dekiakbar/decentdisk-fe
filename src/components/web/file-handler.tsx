import dynamic from "next/dynamic";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { isImage, isSupportedByReactPlayer } from "@/utils/file-handler-helper";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineFilePresent, MdOutlineSdStorage } from "react-icons/md";
import { convertSize } from "@/utils/size-converter";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface MediaPlayerProps {
  internalCid: string;
}

interface streamUrlProps {
  streamUrl: string;
  fileMeta: Record<string, string> | null;
}

interface FileContainerProps extends PropsWithChildren {
  fileMeta: Record<string, string> | null;
}
/**
 *
 * @param {MediaPlayerProps} internalCid
 *
 * @returns {FC}
 */
const FileHandler: FC<MediaPlayerProps> = ({ internalCid }) => {
  const streamUrl = `/api/stream/${internalCid}`;
  let content;
  const [fileMeta, setFileMeta] = useState<Record<string, string> | null>(null);

  const getFileMeta = async (url: string): Promise<void> => {
    const response = await fetch(url, { method: "HEAD" });
    const headers = response.headers;
    const headersObject: Record<string, string> = {};
    headers.forEach((value, name) => {
      const camelCaseKey = name.replace(/-([a-z])/g, (match, letter) =>
        letter.toUpperCase()
      );
      headersObject[camelCaseKey] = value;
    });
    setFileMeta(headersObject);
  };

  useEffect(() => {
    getFileMeta(streamUrl);
  }, [streamUrl]);

  const mimeType = fileMeta ? fileMeta.contentType : "";

  if (isSupportedByReactPlayer(mimeType)) {
    content = <VideoLayout streamUrl={streamUrl} fileMeta={fileMeta} />;
  } else if (isImage(mimeType)) {
    content = <ImageLayout streamUrl={streamUrl} fileMeta={fileMeta} />;
  } else {
    content = <Link href={streamUrl}>Download Me</Link>;
  }

  return <>{content}</>;
};

const ImageLayout: FC<streamUrlProps> = ({ streamUrl, fileMeta }) => {
  return (
    <FileContainer fileMeta={fileMeta}>
      <Image
        src={streamUrl}
        alt="File Image"
        width="100"
        height="100"
        layout="responsive"
      />
    </FileContainer>
  );
};

const VideoLayout: FC<streamUrlProps> = ({ streamUrl, fileMeta }) => {
  return (
    <FileContainer fileMeta={fileMeta}>
      <ReactPlayer
        url={streamUrl}
        controls={true}
        playing={false}
        width="100%"
        height="100%"
      />
    </FileContainer>
  );
};

const FileContainer: FC<FileContainerProps> = function ({
  children,
  fileMeta,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="grid grid-cols-subgrid gap-4 col-span-3 p-5 bg-gray-100 dark:bg-gray-600">
        {children}
      </div>
      <div className="p-5 py-10 dark:bg-gray-800">
        <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Peer Power: Streaming Magic on IPFS!
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 my-5">
          Discover the magic of decentralized file streaming with us on IPFS!
          Seamlessly enjoy a curated collection of diverse content, securely
          hosted on a global peer-to-peer network. Elevate your streaming
          experience - fast, reliable, and without boundaries.
        </p>
        <ul className="my-5 space-y-5">
          <li className="flex space-x-3">
            <MdOutlineFilePresent className="h-8 w-8 shrink-0 text-cyan-600 dark:text-gray-500" />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              {fileMeta?.fileName}
            </span>
          </li>
          <li className="flex space-x-3">
            <MdOutlineSdStorage className="h-8 w-8 shrink-0 text-cyan-600 dark:text-gray-500" />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              {fileMeta?.contentLength &&
                convertSize(parseInt(fileMeta?.contentLength))}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileHandler;
