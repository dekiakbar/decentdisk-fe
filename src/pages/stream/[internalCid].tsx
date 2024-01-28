import { useSession } from "next-auth/react";
import Header from "@/components/web/header/main";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FileHandler from "@/components/file-handler";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Stream() {
  const router = useRouter();
  const { internalCid } = router.query;

  /**
   * Not sure why return null on first render.
   * https://github.com/vercel/next.js/discussions/11484
   * https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
   */
  if (!internalCid) {
    return <></>;
  }

  const internalCidString: string = internalCid as string;

  return (
    <>
      <FileHandler internalCid={internalCidString} />
    </>
  );
}
