import {
  DarkThemeToggle,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { FC } from "react";
import { useSession } from "next-auth/react";
import Profile from "./profile";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "privacy-policy" },
  { name: "Terms And Conditions", href: "terms-and-conditions" },
  { name: "FAQs", href: "faq" },
];

const MainNavbar: FC<Record<string, never>> = function () {
  const { data: session } = useSession();

  return (
    <Navbar fluid className="px-4 py-3 md:px-14">
      <Navbar.Brand href="/">
        <Image
          src="/images/logo.svg"
          width="40"
          height="40"
          alt={`${process.env.NEXT_PUBLIC_APP_NAME} logo`}
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ml-2">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <NavbarToggle />
        <DarkThemeToggle className="lg:mx-4" />
        <Profile session={session} />
      </div>
      <NavbarCollapse>
        {navigation.map((menu, index) => (
          <NavbarLink href={menu.href} className="font-semibold" key={index}>
            {menu.name}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
};

export default MainNavbar;
