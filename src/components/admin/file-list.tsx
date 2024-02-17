import { FC, useState } from "react";
import { Button, Modal, Pagination, Table } from "flowbite-react";
import { File as FileType } from "@/interfaces/file";
import useSWR from "swr";
import { objectToQueryParam } from "@/utils/builder";
import { convertSize } from "@/utils/size-converter";
import Link from "next/link";
import Notification from "../main/notification";
import TableSkeleton from "../main/skeleton/table-skeleton";
import AlertError from "../main/alert/alert-error";
import ShareFile from "../main/share-file";
import { FaFileAlt, FaTrashAlt } from "react-icons/fa";

const FileList: FC = function () {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [deleteFile, setDeleteFile] = useState(Object);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  };

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

  if (error) return <AlertError />;
  if (isLoading) return <TableSkeleton />;

  return (
    <>
      {/* file grid */}
      <Table>
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            User
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
          <Table.HeadCell className="p-4 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:divide-gray-700">
          {data.response.data.map((file: FileType, index: number) => (
            <Table.Row key={index}>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {file.name}
              </Table.Cell>
              <Table.Cell className="text-sm  font-normal text-gray-500 dark:text-gray-400 px-4">
                {file?.user && (
                  <>
                    <p>{file.user?.name}</p>
                    <p>{file.user?.email}</p>
                  </>
                )}
                {!file.user && (
                  <>
                    <p>Guest</p>
                  </>
                )}
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
                <div className="flex gap-2">
                  <Link
                    href={`/stream/${file.internalCid}`}
                    target="_blank"
                    title="Preview"
                    className="group flex items-center justify-center px-1 py-1 text-center font-medium relative"
                  >
                    <span className="flex items-center transition-all duration-200 rounded-md text-xs px-2 py-1">
                      <FaFileAlt className="h-5 w-5 text-gray-500 dark:text-white" />
                    </span>
                  </Link>
                  <ShareFile
                    gateways={file?.gateways}
                    streamPathUrl={`stream/${file.internalCid}`}
                  />
                  <Button
                    onClick={() => handleDeleteButton(file)}
                    title="Delete"
                    size="xs"
                    className="focus:outline-none"
                  >
                    <FaTrashAlt className="h-5 w-5 text-red-700" />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* pagination */}
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 dark:bg-dark-light dark:border-gray-700">
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={
              data.response.meta.pageCount != 0
                ? data.response.meta.pageCount
                : 1
            }
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
          The following file will be deleted, are you sure ?
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
