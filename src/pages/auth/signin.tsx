import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Link from "next/link";
import customTheme from "@/components/flowbite-theme";
import PageTitle from "@/components/main/page-title";
import { Flowbite } from "flowbite-react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <PageTitle title="Sign In" />
      <Flowbite theme={customTheme}>
        <div className="flex flex-col h-screen justify-center items-center dark:bg-dark-base">
          <div className="relative container m-auto px-6 py-16 text-gray-700 md:px-12 xl:px-40">
            <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
              <div className="rounded-xl bg-white shadow-xl dark:bg-dark-content dark:text-gray-400">
                <div className="p-6 sm:p-16">
                  <div className="space-y-4">
                    <Image
                      src="/images/logo.svg"
                      loading="lazy"
                      className="w-14 mx-auto"
                      width={100}
                      height={100}
                      alt="decendisk logo"
                    />
                    <h2 className="mb-8 text-medium font-bold text-center dark:text-gray-100">
                      Sign in to unlock and access decentralized storage
                      effortlessly.
                    </h2>
                  </div>
                  <div className="mt-10 grid space-y-4">
                    {Object.values(providers).map((provider, index) => (
                      <button
                        key={index}
                        className="group h-12 px-6 border-2 rounded-full transition duration-300 hover:border-purple-600 focus:border-purple-600"
                        onClick={() => signIn(provider.id)}
                      >
                        <div className="relative flex items-center space-x-4 justify-center">
                          <Image
                            src={`/images/auth/${provider.name.toLowerCase()}.svg`}
                            className="absolute left-0 w-5"
                            width={100}
                            height={100}
                            alt="google logo"
                          />
                          <span className="block w-max font-semibold tracking-wide text-xs transition duration-300 group-hover:text-purple-600 focus:text-purple-600 md:text-sm">
                            Continue with {provider.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 space-y-4 text-center sm:-mb-8">
                    <p className="text-xs">
                      Before continuing, please confirm that you have accepted
                      our&nbsp;
                      <Link href="/privacy-policy" className="underline">
                        Terms of Use
                      </Link>
                      &nbsp;and you have read our&nbsp;
                      <Link href="/privacy-policy" className="underline">
                        Privacy.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Flowbite>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
