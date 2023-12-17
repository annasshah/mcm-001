"use client";

import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";

import { routeList } from "./constant";
import Image from "next/image";
import { Logo, clinca_logo } from "@/assets/images";
import { usePathname } from "next/navigation";

const screenHeight = window.innerHeight;
const sidebarMaxHeight = screenHeight - 200;

const customTheme: CustomFlowbiteTheme["sidebar"] = {
  root: {
    base: "bg-white",
    inner: `bg-white overflow-auto max-h-[${sidebarMaxHeight}]`,
  },
};

export const SidebarSection = () => {
  const pathname = usePathname();

  const sidebarStyle = {
    maxHeight: `${sidebarMaxHeight}px`,
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 items-center py-5 bg-white">
      <div className="flex justify-center w-full">
        <Image
          src={Logo}
          alt={"logo"}
          className="w-[155px] aspect-auto object-contain"
        />
      </div>

      <Sidebar
        aria-label="Sidebar with multi-level dropdown"
        className="w-full relative"
        theme={customTheme}
        style={sidebarStyle}
      >
        <Sidebar.Items className="pl-5 bg-white">
          <Sidebar.ItemGroup className="flex flex-col gap-5 ">
            {routeList.map((list, index) => {
              if (!list.children) {
                return (
                  <Sidebar.Item
                    key={list.id}
                    // href={list.route || ""}
                    icon={list.icon}
                    className="text-[#3A3541]"
                  >
                    {list.name}
                  </Sidebar.Item>
                );
              } else {
                const isRouteActive = list.children.some(
                  (item) => pathname === item.route
                );

                return (
                  <div key={list.id} className="relative w-full">
                    {isRouteActive && (
                      <div
                        style={{ zIndex: 30 }}
                        className="w-[6px] h-full bg-[#0F4698] bg-opacity-30 rounded-r-[20px] absolute left-0 -ml-[1.25rem]"
                      />
                    )}
                    <Sidebar.Collapse
                      icon={list.icon}
                      label={list.name}
                      className={`text-[#3A3541] hover:bg-[#0F4698] hover:bg-opacity-30  ${
                        isRouteActive ? "bg-[#0F4698] bg-opacity-30" : ""
                      }`}
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
      <article className="w-full p-3 bottom-5 bg-white flex justify-center">
        <div className="w-[185px] h-[55px] rounded-[8px] bg-[#8AA0C2] p-2 flex items-center justify-start gap-3">
          <Image
            src={clinca_logo}
            alt="logo"
            className="w-[30px] h-[30px] object-contain rounded-[5px]"
          />
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-[#FFFFFF] text-[12px]">Clinca San Miguel</h3>
            <p className="text-[#FFFFFF] text-[10px]">River Oaks Road</p>
          </div>
        </div>
      </article>
    </div>
  );
};
