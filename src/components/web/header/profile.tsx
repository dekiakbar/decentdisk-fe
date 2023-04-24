import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "./main";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { HeaderProps } from "next-auth";
import { RoleEnum } from "@/enum/role-enum";

export default function Profile(props: HeaderProps) {
  const image = props?.session?.user?.image;
  if (props?.session?.user) {
    return (
      <>
        {/* Profile dropdown */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={image !== null ? image : undefined}
                  alt="profile picture"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/user/dashboard"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>

                {/* Admin Dashboard */}
                <AdminDashboardLink session={props?.session} />

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="#"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Sign out
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </>
    );
  }

  /**
   * User not logged in
   */
  return <SignInBUtton />;
}

export function SignInBUtton() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <button
        onClick={() => signIn()}
        className="block md:px-4 transition hover:text-primary dark:hover:text-primaryLight"
      >
        <span>Sign In</span>
      </button>
    </div>
  );
}

const AdminDashboardLink = (props: HeaderProps) => {
  const roles = props?.session?.roles;
  if (roles?.includes(RoleEnum.ADMIN)) {
    return (
      <Menu.Item>
        {({ active }) => (
          <Link
            href="/admin/dashboard"
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700"
            )}
          >
            Admin Dashboard
          </Link>
        )}
      </Menu.Item>
    );
  }

  return <></>;
};
