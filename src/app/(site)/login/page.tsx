"use client";

import Link from "next/link";
import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  // CONST
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const session = useSession();

  // HOOKS
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  // FUNCTION
  const submitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      } else {
        toast.success("Logged in");
        router.push("/");
      }
    });
  };
  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 mb-1 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 w-full sm:max-w-[400px] bg-secondaryBg p-5 rounded-md">
        <form className="space-y-5" onSubmit={submitLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-md font-medium leading-6"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="text"
                required
                placeholder="notspidey"
                value={data.username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, username: e.target.value });
                }}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black placeholder:text-secondayGray placeholder:opacity-[50%] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-md font-medium leading-6"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={data.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setData({ ...data, password: e.target.value });
                }}
                className="block w-full rounded-md border-0 py-1.5 shadow-sm text-black placeholder:text-secondayGray placeholder:opacity-[50%] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primaryYellow px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:scale-[1.02] focus:scale-[0.98] transition-all"
            >
              Sign in
            </button>
            <Link href={"/register"} className="flex justify-center w-full">
              <p className="pt-2 text-sm text-primaryYellow opacity-[70%] hover:opacity-[100%] transition-all">
                {"doesn't have an account?"}
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
