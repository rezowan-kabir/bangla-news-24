"use client"
import React from 'react';

import Image from "next/image";
import Link from "next/link";
import NavLink from './NavLink';

const Header = () => {
  const [date] = React.useState(() =>
    new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    }),
  );

  return (
    <header className=" container mx-auto w-full bg-white border-b border-gray-200">
      <div className="h-2 bg-[#1b2a2f]"></div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center">
        <div className="w-full flex items-center justify-between relative mb-6">
          <div className="w-1/3 hidden md:block"></div>

          <Link
            href="/"
            className="flex items-center justify-center gap-3 w-full md:w-1/3"
          >
            <div className="relative w-[50px] h-[50px]">
              <Image
                src="/logo.webp"
                alt="logo"
                width={50}
                height={50}
                className="rounded-xl object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-serif font-bold text-[#b80000] tracking-tight">
                Bangla News 24
              </h1>
              <p className="text-xs text-gray-500 font-serif mt-0.5">{date}</p>
            </div>
          </Link>

          <div className="flex items-center justify-end gap-4 w-1/3">
            <Link
              href="/signin"
              className="text-sm font-medium text-gray-800 hover:text-red-700 transition-colors"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-[#c00000] hover:bg-red-800 px-4 py-2 rounded-md transition-colors shadow-sm"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* <nav className="w-full flex justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm font-serif text-gray-800">
            <li>
              <Link href="/" className="hover:text-red-700 transition-colors">
                হোম
              </Link>
            </li>
            <li>
              <Link
                href="/politics"
                className="hover:text-red-700 transition-colors"
              >
                রাজনীতি
              </Link>
            </li>
            <li>
              <Link
                href="/world"
                className="hover:text-red-700 transition-colors"
              >
                বিশ্ব
              </Link>
            </li>
            <li>
              <Link
                href="/economy"
                className="hover:text-red-700 transition-colors"
              >
                অর্থনীতি
              </Link>
            </li>
            <li>
              <Link
                href="/health"
                className="hover:text-red-700 transition-colors"
              >
                স্বাস্থ্য
              </Link>
            </li>
            <li>
              <Link
                href="/sports"
                className="hover:text-red-700 transition-colors"
              >
                খেলা
              </Link>
            </li>
            <li>
              <Link
                href="/tech"
                className="hover:text-red-700 transition-colors"
              >
                প্রযুক্তি
              </Link>
            </li>
            <li>
              <Link
                href="/watch"
                className="hover:text-red-700 transition-colors"
              >
                দেখুন
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>

      <NavLink/>

    </header>
  );
};


export default Header;