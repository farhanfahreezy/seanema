"use client";

import Navbar from "@/components/Navbar";
import User from "@/components/User";
import getUser from "@/components/getUser";
import { useSession } from "next-auth/react";
interface UserSession {
  name: string;
  username: string;
}

export default async function Home() {
  const { data: session } = useSession();
  const user = session?.user as UserSession;

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium">
        <div>Client Side Render</div>
        <User />
        <div>Client Side Render 2</div>
        <div>{user.username}</div>
      </div>
    </div>
  );
}
