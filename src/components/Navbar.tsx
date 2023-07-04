"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div
      className={`z-[10] fixed top-0 flex flex-row w-full justify-between items-center transition-all py-[20px] ${
        isScrolled ? "px-[80px] bg-primaryBg" : "px-[50px] bg-secondaryBg"
      }`}
    >
      <img
        src="seanema.svg"
        alt="seanema"
        className={`${
          isScrolled ? "w-[200px]" : "w-[250px]"
        } h-auto transition-all`}
      />
      <div className="flex flex-row items-center gap-[70px]">
        <div className="hidden lg:flex flex-row items-center gap-[40px] text-[16px] font-medium">
          <Link href="/">Home</Link>
          <Link href="/">Tab2</Link>
          <Link href="/">Tab3</Link>
        </div>
        <Link
          href={"/login"}
          className="w-[150px] bg-gradient-to-br from-primaryYellow to-secondaryYellow py-2 rounded-3xl text-center font-medium text-white text-[20px]"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
