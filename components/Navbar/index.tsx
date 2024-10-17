"use client";

import { Avatar } from "@/assets/images";
import Image from "next/image";
import { HiOutlineBell } from "react-icons/hi";

import { useContext } from "react";
import { TabContext } from "@/context";
import MenuWithAvatar from "./MenuWithAvatar";

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
        <MenuWithAvatar />
      </div>
    </header>
  );
};
