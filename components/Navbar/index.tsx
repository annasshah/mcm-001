"use client";

import { Avatar } from "@/assets/images";
import Image from "next/image";
import { HiOutlineBell } from "react-icons/hi";

import { useContext } from "react";
import { TabContext } from "@/context";

export const Navbar = ({ width }: { width: string }) => {
  const { activeTitle } = useContext(TabContext);

  return (
    <header
      className={` h-[70px] px-5 flex justify-between items-center fixed z-20 bg-[#B8C8E1]`}
      style={{ width: `calc(100% - ${width})` }}
    >
      <div className="text-[#121111] text-[16px] font-[700]">{activeTitle}</div>
      <div className="flex gap-4 items-center pr-5">
        <div>En</div>
        <div className="text-[#000000] text-[16px]">
          <HiOutlineBell />
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={Avatar}
            alt=""
            className="w-[48px] h-[48px] rounded-[50%] aspect-auto object-contain"
          />

          <div className="flex flex-col items-start justify-center">
            <div className="text-[#121111] text-[16px] font-semibold">
              Raheel
            </div>
            <div className="text-[#121111] text-[12px]">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
