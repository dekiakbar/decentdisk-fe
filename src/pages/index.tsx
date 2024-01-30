import MainLayout from "@/components/web/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex h-screen flex-col">
        <div className="flex flex-col h-screen justify-center items-center">
          <p className="text-4xl">Home Page</p>
        </div>
      </div>
    </MainLayout>
  );
}
