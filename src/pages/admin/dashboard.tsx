import { Flowbite } from "flowbite-react";
import customTheme from "@/components/flowbite-theme";
import Layout from "@/components/admin/layout";
import AdminDashboard from "@/components/admin/dashboard";

export default function Dashboard() {
  return (
    <>
      <Flowbite theme={customTheme}>
        <Layout>
          <div className="px-4 pt-4">
            <AdminDashboard />
          </div>
        </Layout>
      </Flowbite>
    </>
  );
}
