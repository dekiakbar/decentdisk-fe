"use client";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import UserList from "@/components/admin/user-list";
import PageTitle from "@/components/main/page-title";

export default function List() {
  return (
    <>
      <PageTitle title="User" />
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-6">
            <UserList />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
