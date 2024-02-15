import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { RiFileList3Fill, RiGlobalFill, RiUser2Fill } from "react-icons/ri";
import { useSidebarContext } from "@/context/SidebarContext";
import classNames from "classnames";

const AdminSidebar: FC = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown"
      className={classNames("lg:left-0", {
        "-left-64": !isSidebarOpenOnSmallScreens,
        "left-0": isSidebarOpenOnSmallScreens,
      })}
    >
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/admin/dashboard"
                icon={HiChartPie}
                className={
                  "/admin/dashboard" === currentPage
                    ? "bg-gray-100 dark:bg-dark-light"
                    : ""
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/admin/user/list"
                icon={RiUser2Fill}
                className={
                  "/admin/user/list" === currentPage
                    ? "bg-gray-100 dark:bg-dark-light"
                    : ""
                }
              >
                User list
              </Sidebar.Item>
              <Sidebar.Item
                icon={RiFileList3Fill}
                href="/admin/file/list"
                className={
                  "/admin/file/list" === currentPage
                    ? "bg-gray-100 dark:bg-dark-light"
                    : ""
                }
              >
                File List
              </Sidebar.Item>
              <Sidebar.Item
                icon={RiGlobalFill}
                href="/admin/gateway/list"
                className={
                  "/admin/gateway/list" === currentPage
                    ? "bg-gray-100 dark:bg-dark-light"
                    : ""
                }
              >
                Gateway List
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
