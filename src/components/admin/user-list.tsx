import { User } from "@/interfaces/user";
import { objectToQueryParam } from "@/utils/builder";
import { Button, Modal, Pagination, Table } from "flowbite-react";
import Image from "next/image";
import { FC, useState } from "react";
import useSWR from "swr";
import Notification from "../main/notification";
import TableSkeleton from "../main/skeleton/table-skeleton";
import AlertError from "../main/alert/alert-error";
import { FaTrashAlt } from "react-icons/fa";

export const UserList: FC = function () {
  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    "/api/admin/user/list" + objectToQueryParam({ page: currentPage }),
    fetcher
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleDeleteButton(user: User) {
    setOpenModal(true);
    setDeleteUser(user);
  }

  async function handleDeleteRequest() {
    const deleteUrl = `/api/admin/user/${deleteUser.id}`;
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
  const [deleteUser, setDeleteUser] = useState(Object);
  const [openToast, setOpenToast] = useState(false);

  if (error) return <AlertError />;
  if (isLoading) return <TableSkeleton />;

  return (
    <>
      {/* user grid */}
      <Table>
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Roles
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Provider
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-dark-light dark:divide-gray-700">
          {data.response.data.map((user: User, index: number) => (
            <Table.Row key={index}>
              <Table.Cell className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={
                    user.picture
                      ? user.picture
                      : "/images/placeholder/profile.svg"
                  }
                  alt="profile picture"
                  loading="lazy"
                  height="24"
                  width="24"
                />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {user.roles.join(" & ")}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 dark:text-gray-400 px-4">
                {user.provider}
              </Table.Cell>
              <Table.Cell className="text-base font-normal text-gray-500 px-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDeleteButton(user)}
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

      {/* modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          The following user will be deleted, are you sure ?
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ID: {deleteUser?.id}
              <br />
              Name: {deleteUser?.name}
              <br />
              Email: {deleteUser?.email}
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
          toastMessage="User deleted successfully."
          onDismiss={() => {
            setOpenToast(false);
          }}
        />
      )}
    </>
  );
};

export default UserList;
