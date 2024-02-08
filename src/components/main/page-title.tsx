import { FC } from "react";
import Head from "next/head";

interface PageTitleProps {
  title: string;
}
const PageTitle: FC<PageTitleProps> = function ({ title }) {
  const pageTitle = `${process.env.NEXT_PUBLIC_APP_NAME} | ${title}`;
  return (
    <Head>
      <title>{pageTitle}</title>
    </Head>
  );
};

export default PageTitle;
