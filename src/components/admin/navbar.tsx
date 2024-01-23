import { DarkThemeToggle, Navbar } from "flowbite-react";
import { FC } from "react";
import { Dropdown } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { useSidebarContext } from "@/context/SidebarContext";
import { signOut, useSession } from "next-auth/react";
import { RoleEnum } from "@/enum/role-enum";
import Link from "next/link";

const AdminNavbar: FC<Record<string, never>> = function () {
  const { isOpenOnSmallScreens, isPageWithSidebar, setOpenOnSmallScreens } =
    useSidebarContext();
  const { data: session } = useSession();
  const image = session?.user?.image
    ? session.user.image
    : "/images/placeholder/profile.svg";
  const email = session?.user?.email;
  const name = session?.user?.name;
  const isAdmin = session?.roles?.includes(RoleEnum.ADMIN);

  return (
    <Navbar fluid className="px-0 py-0">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              {/* <img alt="" src="/images/logo.svg" className="mr-3 h-6 sm:h-8" /> */}
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </Navbar.Brand>
          </div>
          <div className="flex items-center gap-3">
            <DarkThemeToggle />
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="Profile Picture"
                  img={image}
                  rounded={true}
                  size="sm"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{name}</span>
                <span className="block truncate text-sm font-medium">
                  {email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link href={"/user/dashboard"}>User Dashboard</Link>
              </Dropdown.Item>
              {isAdmin ? (
                <Dropdown.Item>
                  <Link href={"/admin/dashboard"}>Admin Dashboard</Link>
                </Dropdown.Item>
              ) : (
                ""
              )}
              <Dropdown.Divider />
              <Dropdown.Item>
                <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign out
                </Link>
              </Dropdown.Item>
            </Dropdown>

            {isPageWithSidebar && (
              <button
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
                onClick={() => setOpenOnSmallScreens(!isOpenOnSmallScreens)}
              >
                <span className="sr-only">Open main menu</span>

                {isOpenOnSmallScreens ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 12 16"
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 12 16"
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
                    ></path>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AdminNavbar;
