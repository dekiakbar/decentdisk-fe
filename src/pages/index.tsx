import { useSession } from "next-auth/react";
import Header from "@/components/web/header/main";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header session={session} />
        <div className="flex flex-col h-screen justify-center items-center">
          <p className="text-4xl">Home Page</p>
        </div>
      </div>
    </>
  );
}
