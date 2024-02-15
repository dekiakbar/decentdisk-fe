"use client";
import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import PageTitle from "@/components/main/page-title";
import GatewayList from "@/components/admin/gateway/gateway-list";
import GatewayAdd from "@/components/admin/gateway/gateway-add";
import GatewayEditProvider from "@/components/admin/gateway/gateway-edit-provider";

export default function List() {
  return (
    <>
      <PageTitle title="Gateway" />
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-6">
            <GatewayAdd />
            <GatewayEditProvider>
              <GatewayList />
            </GatewayEditProvider>
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
