"use client";

import Navbar from "@/components/Navbar";
import UserFetcher from "@/components/UserFetcher";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserDetail {
  name: string;
  username: string;
  balance: number;
  birthday: Date;
}

// DUMMY
const dummyUsername = "notspidey";
// END OF DUMMY

export default function Home() {
  // CONST
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  // FUNCTION
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    axios
      .get("/api/getUser/", { params: { username: dummyUsername } })
      .then((res) => {
        const newUserDetail = {
          ...res.data,
          birthday: new Date(res.data.birthday),
        };
        setUserDetail(newUserDetail);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium">
        {userDetail ? (
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
                      <Link href={"/topup"}>
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
