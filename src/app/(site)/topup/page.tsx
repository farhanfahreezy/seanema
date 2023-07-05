"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

interface UserDetail {
  name: string;
  username: string;
  balance: number;
  birthday: Date;
}

// DUMMY DATA

const dummyPayment2: UserDetail = {
  name: "Miles Morales",
  username: "notspidey",
  balance: 690000,
  birthday: new Date(),
};

// END OF DUMMY DATA
export default function Home() {
  // CONST
  const [topupValue, setTopupValue] = useState(0);
  const userDetail: UserDetail = { ...dummyPayment2 };

  // FUNCTION
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const submitTopup = (event: any) => {
    event.preventDefault();
    console.log(topupValue);
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium">
        <div className="flex flex-col w-full rounded-xl py-4 px-6 shadow-2xl">
          <div className="flex flex-col w-full justify-center items-center border-[1px] border-slate-600 bg-primaryBg py-6 sm:px-6 rounded-lg gap-4">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="lg:text-[24px] font-semibold">Balance Top Up</div>
              <div className="text-slate-400">
                Add more balance to your account
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <form className="space-y-2" onSubmit={submitTopup}>
                <div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="number"
                      autoComplete="number"
                      required
                      placeholder="69000"
                      value={topupValue}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = parseInt(e.target.value);
                        if (value >= 0) {
                          setTopupValue(value);
                        }
                      }}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black placeholder:text-secondayGray placeholder:opacity-[50%] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primaryYellow px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Topup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
