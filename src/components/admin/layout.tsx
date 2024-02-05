import type { FC, PropsWithChildren } from "react";
import Navbar from "../main/navbar";
import Sidebar from "./sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import MainFooter from "../main/footer";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const Layout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter = true,
}) {
  return (
    <>
      <SidebarProvider>
        <Navbar />
        <div className="flex items-start pt-16">
          <Sidebar />
          <MainContent isFooter={isFooter}>{children}</MainContent>
        </div>
      </SidebarProvider>
    </>
  );
};

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({
  children,
  isFooter,
}) {
  return (
    <main className="relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 lg:ml-64 min-h-screen">
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainFooter />
        </div>
      )}
    </main>
  );
};

export default Layout;
