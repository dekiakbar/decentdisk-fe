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

const navigation = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/" },
  { name: "Terms of Service", href: "/" },
  { name: "FAQs", href: "faq" },
];

const MainNavbar: FC<Record<string, never>> = function () {
  const { data: session } = useSession();

  return (
    <Navbar fluid className="px-4 py-3">
      <Navbar.Brand href="/">
        {/* <img alt="" src="/images/logo.svg" className="mr-3 h-6 sm:h-8" /> */}
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
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
