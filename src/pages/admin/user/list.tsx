'use client'
import NavbarSidebarLayout from "@/components/admin/layouts/navbar-sidebar";
import { FC, use, useEffect, useState } from "react";
import { Alert, Button, Dropdown, Modal, Table, Toast } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import { NextRequest } from "next/server";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { objectToQueryParam } from "@/utils/builder";
import useSWR from "swr";
import { User } from "@/interfaces/user";
import { HiCheck } from "react-icons/hi";

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserList: FC = function () {
  const router = useRouter();
  const { query } = router;
  const { data, error, isLoading } = useSWR('/api/admin/user/list'+ objectToQueryParam(query), fetcher)

  function handleDeleteUser(user:User){
    setOpenModal(true);
    setDeleteUser(user);
  }

  async function handleDeleteRequest(){
    const deleteUrl = `/api/admin/user/${deleteUser.id}`;
    const response = await fetch(deleteUrl,{method: "DELETE" }).then((res) => res.json());
    if(response.status == 200){
      setOpenToast(true);
      setOpenModal(false);
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(Object);
  const [openToast, setOpenToast] = useState(false);

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* user grid */}
      <Table>
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          {/* <Table.HeadCell>
            <div className="flex items-center">
              <input
                id="checkbox-all"
                aria-describedby="checkbox-1"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all" className="sr-only">
                checkbox
              </label>
            </div>
          </Table.HeadCell> */}
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Roles
          </Table.HeadCell>
          {/* <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Disk Usage
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Bandwidth Usage
          </Table.HeadCell>
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Status
          </Table.HeadCell> */}
          <Table.HeadCell className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
            Action
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {
            data.response.data.map((user:User, index:number) =>(
              <Table.Row key={user.id}>
                <Table.Cell className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.picture}
                    alt="user picture"
                    referrerPolicy="no-referrer"
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
                <Table.Cell className="text-base font-normal text-gray-500">
                  {user.roles.join(' | ')}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    label="Action"
                    inline={true}
                    size="sm"
                    placement="bottom"
                  >
                    <Dropdown.Item>
                      <Button onClick={() => handleDeleteUser(user)}>Delete</Button>
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
      <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white p-1">
              1-20
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white p-1">
              2290
            </span>
          </span>
        </div>
      </div>
      {/* modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>The following user will be deleted, are you sure ?</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ID: {deleteUser?.id}
              <br/>
              Name: {deleteUser?.name}
              <br/>
              Email: {deleteUser?.email}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleDeleteRequest()}>Yes</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Toast (notification) */}
      { openToast && (
        <div className="absolute right-5 top-5">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">User deleted successfully.</div>
            <Toast.Toggle onDismiss={() => setOpenToast(false)} />
          </Toast>
        </div>
      )}
    </>
  );
};
