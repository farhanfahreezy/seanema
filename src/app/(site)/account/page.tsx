"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface UserDetail {
  name: string;
  username: string;
  balance: number;
  birthday: Date;
}

interface UserSession {
  name: string;
  username: string;
}

export default function Home() {
  // CONST
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const router = useRouter();
  const session = useSession();
  const userSession = session.data?.user as UserSession;

  // HOOKS
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/login");
    }
  }, [session?.status, router]);

  // FUNCTION
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    axios
      .get("/api/getUser/", { params: { username: userSession?.username } })
      .then((res) => {
        const newUserDetail = {
          ...res.data,
          birthday: new Date(res.data.birthday),
        };
        setUserDetail(newUserDetail);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [userSession?.username]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      {userDetail ? (
        <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium items-center justify-center">
          <div className="flex flex-col w-full rounded-xl py-4 px-6 shadow-2xl">
            <div className="text-[24px] pb-2 pl-2">
              Welcome Back, {userDetail.name}
            </div>
            <div className="flex flex-col w-full border-[1px] border-slate-600 bg-primaryBg pt-6 sm:px-6 rounded-lg">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-white">
                  Account Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  User data and information
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300 sm:col-span-2 sm:mt-0">
                      {userDetail.name}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">
                      Username
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300 sm:col-span-2 sm:mt-0">
                      {userDetail.username}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">
                      Date of birth
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300 sm:col-span-2 sm:mt-0">
                      {userDetail.birthday.toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-white">
                      Current balance
                    </dt>
                    <dd className="flex flex-row items-center justify-start mt-1 text-sm leading-6 text-slate-300 sm:col-span-2 sm:mt-0 gap-2">
                      <div>{formatter.format(userDetail.balance)} </div>
                      <Link href={"/balance"}>
                        <button className="px-3 rounded-md border-2 border-slate-600 hover:bg-slate-600 text-[12px] transition-all">
                          Top Up
                        </button>
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
