import MainNavbar from "@/components/web/header/main-navbar";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import MainFooter from "@/components/web/footer/main-footer";
import { FC, PropsWithChildren } from "react";
import PageTitle from "../main/page-title";

interface MainLayoutProps extends PropsWithChildren {
  title: string;
}

const MainLayout: FC<MainLayoutProps> = function ({ children, title }) {
  return (
    <>
      <PageTitle title={title} />
      <Flowbite theme={customTheme}>
        <MainNavbar />
        <div className="pt-16">{children}</div>
        <MainFooter />
      </Flowbite>
    </>
  );
};

export default MainLayout;
