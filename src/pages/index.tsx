import MainNavbar from "@/components/web/header/main-navbar";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";

export default function Home() {
  return (
    <>
      <Flowbite theme={customTheme}>
        <MainNavbar />
        <div className="flex h-screen flex-col">
          <div className="flex flex-col h-screen justify-center items-center">
            <p className="text-4xl">Home Page</p>
          </div>
        </div>
      </Flowbite>
    </>
  );
}
