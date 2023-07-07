"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

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
  const [topupValue, setTopupValue] = useState("");
  const [withdrawValue, setWithdrawValue] = useState("");
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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

  const submitTopup = (event: any) => {
    event.preventDefault();
    const value = parseInt(topupValue);
    if (value <= 0) {
      setErrMsg("Invalid value!");
    } else {
      axios
        .patch("/api/topup/", {
          newBalance: value,
          username: userDetail?.username,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    }
  };

  const submitWithdraw = (event: any) => {
    event.preventDefault();
    const value = parseInt(withdrawValue);
    if (value <= 0) {
      setErrMsg("Invalid value!");
    } else if (value > userDetail?.balance!) {
      setErrMsg("Insufficent balance!");
    } else {
      axios
        .patch("/api/withdraw/", {
          newBalance: value,
          username: userDetail?.username,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {/* PAGE CONTENT */}
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 font-medium justify-center items-center">
        <div className="w-full px-6 flex flex-col items-center justify-center">
          <div className="text-[20px] sm:text-[24px]">Current Balance</div>
          <div className="w-full max-w-[320px] text-center bg-white text-primaryBg text-[16px] sm:text-[20px] py-1 px-3 rounded-md shadow-inner font-semibold">
            {userDetail ? formatter.format(userDetail.balance) : "Loading..."}
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-5 text-[16px] sm:text-[20px] pt-3">
            <div
              className={`${
                isWithdraw
                  ? "shadow-xl bg-secondaryBg"
                  : "bg-gradient-to-br from-primaryYellow to-secondaryYellow"
              } px-6 py-2 rounded-md w-full max-w-[150px] text-center transition-all hover:scale-[1.01] active:[0.98] select-none`}
              onClick={() => setIsWithdraw(false)}
            >
              Topup
            </div>
            <div
              className={`${
                isWithdraw
                  ? "bg-gradient-to-br from-primaryYellow to-secondaryYellow"
                  : "shadow-xl bg-secondaryBg"
              } px-6 py-2 rounded-md w-full max-w-[150px] text-center transition-all hover:scale-[1.01] active:[0.98] select-none`}
              onClick={() => setIsWithdraw(true)}
            >
              Withdraw
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full rounded-xl pb-4 px-6 shadow-2xl">
          <div className="flex flex-col w-full justify-center items-center border-[1px] border-slate-600 bg-primaryBg py-6 sm:px-6 rounded-lg gap-4">
            <div className="flex flex-col w-full justify-center items-center">
              <div className="lg:text-[24px] font-semibold">
                {isWithdraw ? "Balance Withdraw" : "Balance Top Up"}
              </div>
              <div className="text-slate-400">
                {isWithdraw
                  ? "Get some cash from you account"
                  : "Add more balance to your account"}
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <form
                className="space-y-2"
                onSubmit={isWithdraw ? submitWithdraw : submitTopup}
              >
                <div>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="number"
                      autoComplete="number"
                      required
                      placeholder="Input here..."
                      value={isWithdraw ? withdrawValue : topupValue}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (isWithdraw) {
                          setWithdrawValue(e.target.value);
                        } else {
                          setTopupValue(e.target.value);
                        }
                        setErrMsg("");
                      }}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black placeholder:text-secondayGray placeholder:opacity-[50%] sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border-2 hover:bg-primaryYellow px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all active:[0.98] select-none"
                >
                  {isWithdraw ? "Withdraw" : "Topup"}
                </button>
                <div className="w-full px-2">
                  {errMsg && (
                    <div className="w-full bg-red-400 text-white font-light text-center rounded-sm py-1 px-2">
                      {errMsg}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
