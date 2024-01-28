import NavbarSidebarLayout from "@/components/admin/layouts/navbar-sidebar";
import { FC, useState } from "react";
import {
  Button,
  Dropdown,
  FileInput,
  Modal,
  Pagination,
  Spinner,
  Table,
  Toast,
} from "flowbite-react";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import { objectToQueryParam } from "@/utils/builder";
import useSWR from "swr";
import { File as FileType } from "@/interfaces/file";
import { HiCheck } from "react-icons/hi";
import { convertSize } from "@/utils/size-converter";
import Link from "next/link";

export default function List() {
  return (
    <>
      <Flowbite theme={customTheme}>
        <NavbarSidebarLayout>
          <div className="px-4 pt-6">
            <FileList />
          </div>
        </NavbarSidebarLayout>
      </Flowbite>
    </>
  );
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

const FileList: FC = function () {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/file/list" + objectToQueryParam({ page: currentPage }),
    fetcher
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleDeleteButton(file: FileType) {
    setOpenModal(true);
    setDeleteFile(file);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function handleUpload() {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("files", file);

      try {
        const result = await fetch("/api/admin/file/upload", {
          method: "POST",
          body: formData,
        });

        if (result.ok) {
          setIsUploading(false);
          setToastMessage("File uploaded successfully.");
          setOpenToast(true);
          mutate();
          setFile(null);
          setInputKey(Date.now());
        }
      } catch (error) {
        setIsUploading(false);
      }
    }
  }

  async function handleDeleteRequest() {
    const deleteUrl = `/api/admin/file/${deleteFile.id}`;
    const response = await fetch(deleteUrl, { method: "DELETE" }).then((res) =>
      res.json()
    );

    if (response.status == 200) {
      setToastMessage("File deleted successfully.");
      setOpenToast(true);
      mutate();
    }
    setOpenModal(false);
  }

  const [openModal, setOpenModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(Object);
  const [openToast, setOpenToast] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState<number | null>(null);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="sm:flex">
            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
              {isUploading && (
                <Spinner color="purple" aria-label="Uploading File" />
              )}
              <FileInput
                id="files"
                name="files"
                sizing="sm"
                disabled={isUploading == true}
                onChange={handleFileChange}
                key={inputKey || ""}
              />
              {file && (
                <Button
                  className="text-white rounded-lg bg-purple-700 hover:bg-purple-800 sm:w-auto dark:bg-purple-600 dark:hover:bg-purple-700 p-0"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* user grid */}
      <Table>
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            CID
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Size
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Type
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data.response.data.map((file: FileType, index: number) => (
            <Table.Row key={index}>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {file.name}
              </Table.Cell>
              <Table.Cell className="text-sm  font-normal text-gray-500 dark:text-gray-400 px-4">
                <p>{file.internalCid}</p>
                <p>{file.cid}</p>
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {convertSize(file.size)}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {file.mimeType}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 px-4">
                <Dropdown label="Action" size="sm" placement="bottom">
                  <Dropdown.Item
                    theme={{
                      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full dark:text-gray-200 focus:outline-none dark:hover:text-white dark:focus:text-white",
                    }}
                  >
                    Copy Link
                  </Dropdown.Item>
                  <Dropdown.Item
                    theme={{
                      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full dark:text-gray-200 focus:outline-none dark:hover:text-white dark:focus:text-white",
                    }}
                  >
                    <Link href={`/stream/${file.internalCid}`} target="_blank">
                      View
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDeleteButton(file)}
                    theme={{
                      base: "flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full dark:text-gray-200 focus:outline-none dark:hover:text-white dark:focus:text-white",
                    }}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={data.response.meta.pageCount}
            onPageChange={onPageChange}
            showIcons={true}
            previousLabel=""
            nextLabel=""
          />
        </div>
      </div>
      {/* modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          The following user will be deleted, are you sure ?
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              CID: {deleteFile.cid}
              <br />
              Internal CID: {deleteFile.internalCid}
              <br />
              Name: {deleteFile.name}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="purple" onClick={() => handleDeleteRequest()}>
            Yes
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Toast (notification) */}
      {openToast && (
        <div className="absolute right-5 top-5">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <Toast.Toggle onDismiss={() => setOpenToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};
