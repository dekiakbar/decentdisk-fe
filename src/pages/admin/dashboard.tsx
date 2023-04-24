import Header from "@/components/web/header/main";
import { useSession } from "next-auth/react";
export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header session={session} />
        <div className="flex flex-col h-screen justify-center items-center">
          <p className="text-4xl">Admin Dashboard</p>
        </div>
      </div>
    </>
  );
}
