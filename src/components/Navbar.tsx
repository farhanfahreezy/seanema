"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface Path {
  label: string;
  path: string;
}

const Navbar = () => {
  // CONST
  const [isScrolled, setIsScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [navbarOption, setNavbarOption] = useState<Path[]>([
    { label: "Home", path: "/" },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isComponentScrolled = window.scrollY > 25;

      setIsScrolled(isComponentScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (session?.status === "authenticated") {
      setNavbarOption([
        { label: "Home", path: "/" },
        { label: "Transaction", path: "/transaction" },
        { label: "Account", path: "/account" },
        { label: "Balance", path: "/balance" },
      ]);
      setIsLoggedIn(true);
    }
  }, [session?.status]);

  return (
    <>
      <div
        className={`z-[10] fixed top-0 flex flex-row w-full justify-between items-center transition-all py-[20px] ${
          isScrolled
            ? "px-[30px] sm:px-[50px] lg:px-[80px] bg-gradient-to-t from-primaryBg to-secondaryBg"
            : "px-[20px] sm:px-[40px] lg:px-[50px] bg-transparent"
        }`}
      >
        <Link href="/">
          <Image
            src={"/seanema-short.svg"}
            alt="seanema"
            width={0}
            height={0}
            sizes="100vw"
            className={`${
              isScrolled ? "h-[30px] sm:h-[45px]" : "h-[40px] sm:h-[60px]"
            } w-auto transition-all`}
          />
        </Link>
        <div className="hidden lg:flex flex-row items-center gap-[50px]">
          <div className="flex flex-row items-center gap-[40px] text-[16px] font-medium">
            {navbarOption.map((path) => (
              <Link href={path.path} key={path.label}>
                {path.label}
              </Link>
            ))}
          </div>
          <Link
            href={isLoggedIn ? "/" : "/login"}
            className={`w-[150px] ${
              isLoggedIn ? "bg-transparent" : "bg-gradient-to-br"
            } from-primaryYellow to-secondaryYellow border-2 py-2 rounded-3xl text-center font-medium text-white text-[20px] hover:scale-[1.01] active:scale-[0.98] transition-all`}
            onClick={() => {
              if (isLoggedIn) {
                signOut();
                setIsLoggedIn(false);
                router.push("/");
              }
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </div>
        <div className="flex lg:hidden flex-col items-center justify-center">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="w-fit h-fit"
          >
            {openModal ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MODALS */}

      <div
        className={`z-[9] fixed ${
          openModal ? "top-0 opacity-100" : "top-[-500px] opacity-0 select-none"
        } flex flex-col items-center justify-center right-0 bg-secondaryBg rounded-xl w-screen p-6 gap-5 transition-all shadow-xl ${
          isScrolled ? "pt-[110px]" : "pt-[120px]"
        }`}
      >
        <Link
          href={isLoggedIn ? "/" : "/login"}
          className={`w-[150px] ${
            isLoggedIn ? "bg-transparent" : "bg-gradient-to-br"
          } from-primaryYellow to-secondaryYellow border-2 py-2 rounded-3xl text-center font-medium text-white text-[20px] hover:scale-[1.01] active:scale-[0.98] transition-all`}
          onClick={() => {
            if (isLoggedIn) {
              signOut();
              setIsLoggedIn(false);
            }
          }}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Link>
        <div className="flex flex-col items-center gap-[40px] text-[16px] font-medium">
          {navbarOption.map((path) => (
            <Link href={path.path} key={path.label}>
              {path.label}
            </Link>
          ))}
        </div>
      </div>
      {openModal && (
        <>
          <div
            className="z-[8] fixed top-0 left-0 w-screen h-screen bg-primaryBg opacity-50"
            onClick={() => setOpenModal(false)}
          ></div>
        </>
      )}
    </>
  );
};

export default Navbar;
