import { Button, Footer } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const MainFooter: FC = function () {
  return (
    <Footer container>
      <div className="w-full mx-auto space-y-8 pt-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Image
                src="/images/auth.svg"
                width="40"
                height="40"
                alt={process.env.NEXT_PUBLIC_APP_NAME ?? "logo"}
              />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-700 sm:max-w-xs sm:text-left dark:text-gray-400">
              Elevate your storage experience with our IPFS-based service.
              Access files globally through the IPFS gateway, ensuring secure,
              decentralized storage. Redefine connectivity and convenience for
              your digital assets.
            </p>
          </div>

          <div className="grid">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Helpful Links
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-purple-500 dark:hover:text-purple-500 dark:text-gray-400"
                      href="faq"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Legal
                </p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-purple-500 dark:hover:text-purple-500 dark:text-gray-400"
                      href="/"
                    >
                      Term Of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-700 transition hover:text-purple-500 dark:hover:text-purple-500 dark:text-gray-400"
                      href="/"
                    >
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 lg:mt-0">
            <span className="hidden h-1 w-10 rounded bg-purple-500 lg:block"></span>
            <div>
              <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 text-center md:text-left">
                Create Account
              </h2>

              <p className="mt-4 max-w-lg text-gray-700 dark:text-gray-400">
                Empowering users with free decentralized storage – Seamlessly
                upload, manage, and access your files with enhanced limits when
                you sign in. Your data, your control. Experience freedom in the
                digital realm.
              </p>
            </div>
            <Button color="purple">Sign Up</Button>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-300 dark:border-gray-700 pt-8">
          <p className="text-center text-xs/relaxed text-gray-700 dark:text-gray-100">
            &copy; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}
            . All rights reserved.
          </p>
        </div>
      </div>
    </Footer>
  );
};

export default MainFooter;
