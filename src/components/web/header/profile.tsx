import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { HeaderProps } from "next-auth";
import { RoleEnum } from "@/enum/role-enum";
import { Avatar, Button, Dropdown } from "flowbite-react";

export default function Profile(props: HeaderProps) {
  const image = props?.session?.user?.image
    ? props?.session.user.image
    : "/images/placeholder/profile.svg";
  const email = props?.session?.user?.email;
  const name = props?.session?.user?.name;
  const isAdmin = props?.session?.roles?.includes(RoleEnum.ADMIN);

  if (props?.session?.user) {
    return (
      <>
        {/* Profile dropdown */}
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
            <span className="block truncate text-sm font-medium">{email}</span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href={"/user/file/list"} className="w-full text-left">
              User Dashboard
            </Link>
          </Dropdown.Item>
          {isAdmin ? (
            <Dropdown.Item>
              <Link href={"/admin/dashboard"} className="w-full text-left">
                Admin Dashboard
              </Link>
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
      </>
    );
  }

  /**
   * User not logged in
   */
  return (
    <Button onClick={() => signIn()} color="purple" size="sm">
      Sign In
    </Button>
  );
}
