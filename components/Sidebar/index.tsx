"use client";

import { Sidebar } from "flowbite-react";

import { routeList } from "./constant";
import Image from "next/image";
import { Logo } from "@/assets/images";
import { SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";

export const SidebarSection = () => {
  const pathname = usePathname();

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown"
      className="w-full h-full"
    >
      <div className="flex justify-center w-full">
        <Image
          src={Logo}
          alt={"logo"}
          className="w-[155px] aspect-auto object-contain"
        />
      </div>
      <Sidebar.Items className="p-5">
        <Sidebar.ItemGroup className="flex flex-col gap-5 ">
          {routeList.map((list, index) => {
            if (!list.children) {
              return (
                <Sidebar.Item
                  key={list.id}
                  href={list.route || ""}
                  icon={list.icon}
                  className="text-[#3A3541]"
                >
                  {list.name}
                </Sidebar.Item>
              );
            } else {
              // const isCollapseOpen = openCollapse === list.id;
              const isRouteActive = list.children.some(
                (item) => pathname === item.route
              );

              return (
                <div key={list.id} className="relative w-full">
                  {isRouteActive && (
                    <div className="w-[6px] h-full bg-[#0F4698] bg-opacity-30 rounded-r-[20px] absolute left-0 -ml-[2rem]"></div>
                  )}
                  <Sidebar.Collapse
                    icon={list.icon}
                    label={list.name}
                    className={`text-[#3A3541] hover:bg-[#0F4698] hover:bg-opacity-30 w-[185px] ${
                      isRouteActive ? "bg-[#0F4698] bg-opacity-30" : ""
                    }`}
                    // onToggle={() => handleCollapseToggle(list.id)}
                  >
                    {list.children.map((item, index) => (
                      <Sidebar.Item
                        key={item.id}
                        href={item.route}
                        className={`text-[#3A3541] ${
                          pathname === item.route ? "text-[#0F4698]" : ""
                        }`}
                      >
                        {item.name}
                      </Sidebar.Item>
                    ))}
                  </Sidebar.Collapse>
                </div>
              );
            }
          })}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
