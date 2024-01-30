import MainNavbar from "@/components/web/header/main-navbar";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import MainFooter from "@/components/web/footer/main-footer";
import { FC, PropsWithChildren } from "react";

const MainLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <>
      <Flowbite theme={customTheme}>
        <MainNavbar />
          <div className="container mx-auto pt-16">{children}</div>
        <MainFooter />
      </Flowbite>
    </>
  );
};

export default MainLayout;
