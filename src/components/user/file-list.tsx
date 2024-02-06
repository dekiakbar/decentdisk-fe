import { FC, useState } from "react";
import { Button, Dropdown, Modal, Pagination, Table } from "flowbite-react";
import { File as FileType } from "@/interfaces/file";
import useSWR from "swr";
import { objectToQueryParam } from "@/utils/builder";
import { convertSize } from "@/utils/size-converter";
import Link from "next/link";
import Notification from "../main/notification";

const FileList: FC = function () {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(Object);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    return res.json();
  };

  const { data, error, isLoading, mutate } = useSWR(
    "/api/user/file/list" + objectToQueryParam({ page: currentPage }),
    fetcher
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleDeleteButton(file: FileType) {
    setOpenModal(true);
    setDeleteFile(file);
  }

  async function handleDeleteRequest() {
    const deleteUrl = `/api/user/file/${deleteFile.id}`;
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

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {/* file grid */}
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

      {/* pagination */}
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

      {/* Delete confirmation */}
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

      {/* Notification */}
      {openToast && (
        <Notification
          toastMessage={toastMessage}
          onDismiss={() => {
            setOpenToast(false);
          }}
        />
      )}
    </>
  );
};

export default FileList;
