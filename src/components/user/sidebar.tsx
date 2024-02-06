import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { useSidebarContext } from "@/context/SidebarContext";
import classNames from "classnames";

const UserSidebar: FC = function () {
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
                icon={RiFileList3Fill}
                href="/user/file/list"
                className={
                  "/user/file/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                File List
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserSidebar;
