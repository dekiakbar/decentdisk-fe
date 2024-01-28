"use client";
import NavbarSidebarLayout from "@/components/admin/layouts/navbar-sidebar";
import { FC, useState } from "react";
import {
  Button,
  Dropdown,
  Modal,
  Pagination,
  Table,
  Toast,
} from "flowbite-react";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { objectToQueryParam } from "@/utils/builder";
import useSWR from "swr";
import { User } from "@/interfaces/user";
import { HiCheck } from "react-icons/hi";
import Image from "next/image";

export default function List() {
  return (
    <>
      <Flowbite theme={customTheme}>
        <NavbarSidebarLayout>
          <div className="px-4 pt-6">
            <UserList />
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

const UserList: FC = function () {
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

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {data.response.data.map((user: User, index: number) => (
            <Table.Row key={user.id}>
              <Table.Cell className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={user.picture}
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
                <Dropdown label="Action" size="sm" placement="bottom">
                  <Dropdown.Item
                    onClick={() => handleDeleteButton(user)}
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
      {/* Toast (notification) */}
      {openToast && (
        <div className="absolute right-5 top-5">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              User deleted successfully.
            </div>
            <Toast.Toggle onDismiss={() => setOpenToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};
