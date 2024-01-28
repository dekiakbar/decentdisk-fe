import NavbarSidebarLayout from "@/components/admin/layouts/navbar-sidebar";
import { FC } from "react";
import { Table } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import useSWR from "swr";
import { AdminDashboard } from "@/interfaces/admin-dashboard-data";
import { User } from "@/interfaces/user";
import { SwrResponse } from "@/interfaces/swr-response";
import Link from "next/link";
import { File } from "@/interfaces/file";
import { convertSize } from "@/utils/size-converter";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export default function Dashboard() {
  const { data, error, isLoading }: SwrResponse = useSWR(
    "/api/admin/dashboard",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (!data.response) {
    return <div>failed to load</div>;
  }

  const { response } = data;

  return (
    <>
      <Flowbite theme={customTheme}>
        <NavbarSidebarLayout>
          <div className="px-4 pt-4">
            <div>
              <Info
                totalUser={response.totalUser}
                totalFile={response.totalFile}
                totalStorage={response.totalStorage}
              />
            </div>
            <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3">
              <div className="md:col-span-2 xl:col-span-2">
                <LatestFiles latestFiles={response.latestFiles} />
              </div>
              <div className="col-span-1">
                <LatestCustomers latestUsers={response.latestUsers} />
              </div>
            </div>
          </div>
        </NavbarSidebarLayout>
      </Flowbite>
    </>
  );
}

const Info: FC<
  Pick<AdminDashboard, "totalUser" | "totalFile" | "totalStorage">
> = ({ totalUser, totalFile, totalStorage }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="w-full">
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Users
          </h3>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            {totalUser}
          </span>
        </div>
        <div className="w-full" id="new-products-chart"></div>
      </div>
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="w-full">
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Files
          </h3>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            {totalFile}
          </span>
        </div>
        <div className="w-full" id="week-signups-chart"></div>
      </div>
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="w-full">
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Storage
          </h3>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            {convertSize(totalStorage)}
          </span>
        </div>
        <div className="w-full" id="week-signups-chart"></div>
      </div>
    </div>
  );
};

const LatestFiles: FC<Pick<AdminDashboard, "latestFiles">> = ({
  latestFiles,
}) => {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Users
        </h3>
        <Link
          href="file/list"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </Link>
      </div>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>File Name</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          <Table.HeadCell>type</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {latestFiles &&
            latestFiles.map((file: File, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                  {file.name}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                  {convertSize(file.size)}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
                  {file.mimeType}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const LatestCustomers: FC<Pick<AdminDashboard, "latestUsers">> = ({
  latestUsers,
}) => {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Users
        </h3>
        <Link
          href="user/list"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {latestUsers &&
            latestUsers.map((user: User, index: number) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.picture}
                      alt="Profile picture"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
