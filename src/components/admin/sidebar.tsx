import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState, PropsWithChildren } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiUsers,
} from "react-icons/hi";
import { RiFileCloudFill, RiFileList3Fill, RiUser2Fill } from "react-icons/ri";
import { ImDrive } from "react-icons/im";
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
                    ? "bg-gray-100 dark:bg-gray-700"
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
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                User list
              </Sidebar.Item>
              <Sidebar.Collapse
                icon={ImDrive}
                label="Files"
                open={currentPage.includes("/admin/file")}
                className={
                  currentPage.includes("/admin/file")
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Sidebar.Item
                  icon={RiFileCloudFill}
                  href="/admin/file/mine"
                  className={
                    "/admin/file/mine" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  My Files
                </Sidebar.Item>
                <Sidebar.Item
                  icon={RiFileList3Fill}
                  href="/admin/file/list"
                  className={
                    "/admin/file/list" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  File List
                </Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
