import MainLayout from "@/components/user/layout";

export default function Dashboard() {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col h-screen justify-center items-center">
          <p className="text-4xl">User Dashboard</p>
        </div>
      </MainLayout>
    </>
  );
}
