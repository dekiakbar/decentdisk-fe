import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import FileList from "@/components/admin/file-list";
import FileUpload from "@/components/admin/file-upload";

export default function List() {
  return (
    <>
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-6">
            <FileUpload />
            <FileList />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
