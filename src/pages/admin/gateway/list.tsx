"use client";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import PageTitle from "@/components/main/page-title";
import GatewayList from "@/components/admin/gateway-list";
import GatewayAdd from "@/components/admin/gateway-add";

export default function List() {
  return (
    <>
      <PageTitle title="Gateway" />
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-6">
            <GatewayAdd />
            <GatewayList />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
