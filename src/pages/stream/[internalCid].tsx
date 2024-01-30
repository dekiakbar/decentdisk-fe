import { useRouter } from "next/router";
import FileHandler from "@/components/web/file-handler";
import MainLayout from "@/components/web/main-layout";

export default function Stream() {
  const router = useRouter();
  const { internalCid } = router.query;

  /**
   * Not sure why return null on first render.
   * 
   * @see https://github.com/vercel/next.js/discussions/11484
   * @see https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render
   */
  if (!internalCid) {
    return <></>;
  }

  const internalCidString: string = internalCid as string;

  return (
    <MainLayout>
      <FileHandler internalCid={internalCidString} />
    </MainLayout>
  );
}
