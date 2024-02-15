import { objectToQueryParam } from "@/utils/builder";
import { Button, Modal, Pagination, Table } from "flowbite-react";
import { FC, useContext, useState } from "react";
import useSWR from "swr";
import Notification from "../../main/notification";
import TableSkeleton from "../../main/skeleton/table-skeleton";
import AlertError from "../../main/alert/alert-error";
import {
  FaEdit,
  FaRegPlayCircle,
  FaRegStopCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { Gateway } from "@/interfaces/gateway";
import { GatewayEditContext } from "./gateway-edit-provider";
import GatewayEditModal from "./gateway-edit";
export const GatewayList: FC = function () {
  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/gateway/list" + objectToQueryParam({ page: currentPage }),
    fetcher
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleDeleteButton(gateway: Gateway) {
    setOpenModal(true);
    setDeleteGateway(gateway);
  }

  async function handleDeleteRequest() {
    const deleteUrl = `/api/admin/gateway/${deleteGateway.id}`;
    const response = await fetch(deleteUrl, { method: "DELETE" }).then((res) =>
      res.json()
    );

    if (response.status == 200) {
      setOpenToast(true);
      mutate();
    }
    setOpenModal(false);
  }

  const [openModal, setOpenModal] = useState(false);
  const [deleteGateway, setDeleteGateway] = useState(Object);
  const [openToast, setOpenToast] = useState(false);
  const { setIsModalOpen, setGatewayEdit } = useContext(GatewayEditContext);

  if (error) return <AlertError />;
  if (isLoading) return <TableSkeleton />;

  return (
    <>
      {/* <GatewayEditProvider> */}
      {/* gateway grid */}
      <Table>
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Gateway
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Status
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Latency
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Is Enabled
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Updated At
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:divide-gray-700">
          {data.response.data.map((gateway: Gateway, index: number) => (
            <Table.Row key={index}>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {gateway.gateway}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {gateway.status || <>-</>}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {gateway.latency || <>-</>}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {gateway.isEnabled && (
                  <FaRegPlayCircle color="green" className="h-7 w-7" />
                )}

                {!gateway.isEnabled && (
                  <FaRegStopCircle color="red" className="h-7 w-7" />
                )}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {gateway.updatedAt}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 px-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setGatewayEdit(gateway);
                    }}
                    className="focus:outline-none"
                  >
                    <FaEdit className="h-5 w-5 text-gray-500 dark:text-white" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteButton(gateway)}
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
      {/* {openEditModal && (
        <GatewayEditModal gatewayData={editGatewayData} />
      )} */}
      <GatewayEditModal />

      {/* modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          The following gateway will be deleted, are you sure ?
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ID: {deleteGateway?.id}
              <br />
              Gateway: {deleteGateway?.gateway}
              <br />
              Status: {deleteGateway?.status}
              <br />
              Latency: {deleteGateway?.latency}
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
          toastMessage="Gateway deleted successfully."
          onDismiss={() => {
            setOpenToast(false);
          }}
        />
      )}
      {/* </GatewayEditProvider> */}
    </>
  );
};

export default GatewayList;
