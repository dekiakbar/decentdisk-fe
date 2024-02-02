import MainLayout from "@/components/web/main-layout";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";

export default function Home() {
  return (
    <MainLayout>
      {/* hero */}
      <div className="relative overflow-hidden dark:bg-black">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 transform -translate-x-1/4"
        >
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
          <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[125rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="mt-5 max-w-2xl">
                <h1 className="block font-semibold text-gray-800 text-3xl md:text-4xl lg:text-5xl dark:text-gray-200">
                  Decentralized Storage Based On IPFS
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Unlock the potential of public IPFS on our SaaS platform -
                  your gateway to free, decentralized storage! Seamlessly store
                  and share files with the world. Embrace the simplicity of
                  public IPFS. Try it now and elevate your storage.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <a
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
                  href="#"
                  onClick={() => signIn()}
                >
                  <FaGoogle size={20} />
                  Continue with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Elevate Your Experience with IPFS Storage
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Experience the simplicity of file management with our platform.
                Effortlessly upload and secure your files using IPFS-based
                storage. Streamline your data workflow and enjoy a hassle-free
                file upload experience like never before.
              </p>
              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
              >
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    IPFS-Powered Uploads
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Reliable IPFS Infrastructure
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Cross-Browser Compatibility
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Instant Shareable Links
                  </span>
                </li>
              </ul>
            </div>
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src="https://placehold.co/2200x1600.png"
              alt="dashboard feature image"
            />
          </div>
          <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
            <img
              className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
              src="https://placehold.co/2200x1600.png"
              alt="feature image 2"
            />
            <div className="text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Seamless File Streaming
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Immerse yourself in a seamless streaming experience! Our
                platform goes beyond storage, supporting hassle-free file
                streaming. Enjoy the flexibility of streaming videos, music, and
                more directly from our IPFS-integrated platform.
              </p>
              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
              >
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Effortless Video Streaming
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Low Latency Streaming
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Dynamic File Loading
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Instant Preview Functionality
                  </span>
                </li>
                <li className="flex space-x-3">
                  <HiCheckCircle className="text-purple-500" />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Secure Streaming Protocol
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
