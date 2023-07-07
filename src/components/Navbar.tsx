"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// interface UserSession {
//   name: string;
//   username: string;
//   birthday: Date;
//   balance: string;
// }

// interface NavbarProps {
//   user: UserSession | null;
// }

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <>
      <div
        className={`z-[10] fixed top-0 flex flex-row w-full justify-between items-center transition-all py-[20px] ${
          isScrolled
            ? "px-[30px] sm:px-[50px] lg:px-[80px] bg-gradient-to-t from-primaryBg to-secondaryBg"
            : "px-[20px] sm:px-[40px] lg:px-[50px] bg-transparent"
        }`}
      >
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
        <div className="hidden lg:flex flex-row items-center gap-[50px]">
          <div className="flex flex-row items-center gap-[40px] text-[16px] font-medium">
            <Link href="/">Home</Link>
            <Link href="/transaction">Transaction</Link>
            <Link href="/account">Account</Link>
            <Link href="/balance">Balance</Link>
          </div>
          <Link
            href={"/login"}
            className="w-[150px] bg-gradient-to-br from-primaryYellow to-secondaryYellow py-2 rounded-3xl text-center font-medium text-white text-[20px]"
          >
            Login
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
          href={"/login"}
          className="w-[200px] bg-gradient-to-br from-primaryYellow to-secondaryYellow py-2 rounded-3xl text-center font-medium text-white text-[20px]"
        >
          Login
        </Link>
        <div className="flex flex-col items-center gap-[40px] text-[16px] font-medium">
          <Link href="/">Home</Link>
          <Link href="/transaction">Transaction</Link>
          <Link href="/account">Account</Link>
          <Link href="/balance">Balance</Link>
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
