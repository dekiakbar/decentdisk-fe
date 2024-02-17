import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import FileList from "@/components/admin/file-list";
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
              apiUrl="/api/admin/file/upload"
              mutateKey="/api/admin/file/list"
            />
            <FileList />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
