import { SwrResponse } from "@/interfaces/swr-response";
import { FC } from "react";
import AlertError from "../main/alert/alert-error";
import TableSkeleton from "../main/skeleton/table-skeleton";
import useSWR from "swr";
import { DashboardInterface } from "@/interfaces/dashboard-interface";
import { convertSize } from "@/utils/size-converter";
import Link from "next/link";
import { Table } from "flowbite-react";
import { User } from "@/interfaces/user";
import Image from "next/image";
import { File } from "@/interfaces/file";

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
};

const AdminDashboard: FC = function () {
  const { data, error, isLoading }: SwrResponse = useSWR(
    "/api/admin/dashboard",
    fetcher
  );

  if (error) return <AlertError />;
  if (isLoading) return <TableSkeleton />;

  if (!data.response) {
    return <div>failed to load</div>;
  }

  const { response } = data;

  return (
    <>
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
    </>
  );
};

const Info: FC<
  Pick<DashboardInterface, "totalUser" | "totalFile" | "totalStorage">
> = ({ totalUser, totalFile, totalStorage }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-900 sm:p-6 dark:bg-dark-light">
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
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-900 sm:p-6 dark:bg-dark-light">
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
      <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-900 sm:p-6 dark:bg-dark-light">
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

const LatestFiles: FC<Pick<DashboardInterface, "latestFiles">> = ({
  latestFiles,
}) => {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-dark-light sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Users
        </h3>
        <Link
          href="file/list"
          className="inline-flex items-center rounded-lg p-2 text-md font-medium text-purple-700 dark:text-violet-400 hover:underline"
        >
          View all
        </Link>
      </div>
      <Table hoverable>
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
                className="bg-white dark:border-gray-900 dark:bg-dark-light"
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

const LatestCustomers: FC<Pick<DashboardInterface, "latestUsers">> = ({
  latestUsers,
}) => {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-dark-light sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Users
        </h3>
        <Link
          href="user/list"
          className="inline-flex items-center rounded-lg p-2 text-md font-medium text-purple-700 dark:text-violet-400 hover:underline"
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
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user.picture}
                      alt="Profile picture"
                      width="100"
                      height="100"
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

export default AdminDashboard;
