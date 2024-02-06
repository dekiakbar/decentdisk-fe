import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/user/layout";
import FileList from "@/components/user/file-list";
import FileUpload from "@/components/user/file-upload";

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
