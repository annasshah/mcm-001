"use client";

import Image from "next/image";
import { Logo } from "@/assets/images";

import { Clinic } from "./Clinic";
import { SidebarPanel } from "./SidebarPanel";

export const SidebarSection = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center py-5 bg-white">
      <div className="flex justify-center w-full">
        <Image
          src={Logo}
          alt={"logo"}
          className="w-[155px] aspect-auto object-contain"
        />
      </div>

      <SidebarPanel />
      <Clinic />
    </div>
  );
};
