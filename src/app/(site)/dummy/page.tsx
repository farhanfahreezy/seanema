import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import UserFetcher from "@/components/UserFetcher";

interface UserSession {
  name: string;
  username: string;
  birthday: Date;
  balance: string;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserSession;
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium">
        <div>Server Side Render</div>
        <div>{JSON.stringify(session)}</div>
        <div>Client Side Render</div>
      </div>
    </div>
  );
}
