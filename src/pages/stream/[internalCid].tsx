import { useRouter } from "next/router";
import FileHandler from "@/components/file-handler";

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
