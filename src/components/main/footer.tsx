import { Footer } from "flowbite-react";
import { FC } from "react";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const MainFooter: FC = function () {
  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <Footer.LinkGroup>
            <Footer.Link
              href="/terms-and-conditions"
              className="mr-3 mb-3 lg:mb-0"
            >
              Terms and conditions
            </Footer.Link>
            <Footer.Link href="/privacy-policy" className="mr-3 mb-3 lg:mb-0">
              Privacy Policy
            </Footer.Link>
            <Footer.Link href="/faq" className="mr-3">
              FAQ
            </Footer.Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup>
            <div className="flex gap-x-1">
              {/* <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <MdFacebook className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaInstagram className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaTwitter className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaGithub className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaDribbble className="text-lg" />
              </Footer.Link> */}
              <p className="text-sm text-gray-500 dark:text-gray-300">
                &copy; {new Date().getFullYear()}{" "}
                {process.env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
              </p>
            </div>
          </Footer.LinkGroup>
        </div>
      </Footer>
      {/* <p className="my-8 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.
        All rights reserved.
      </p> */}
    </>
  );
};
export default MainFooter;
