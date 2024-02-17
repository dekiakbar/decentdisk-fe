import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/user/layout";
import FileList from "@/components/user/file-list";
import PageTitle from "@/components/main/page-title";
import FileUpload from "@/components/main/file/file-upload";

export default function List() {
  return (
    <>
      <PageTitle title="File" />
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-6">
            <FileUpload
              apiUrl="/api/user/file/upload"
              mutateKey="/api/user/file/list"
            />
            <FileList />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
