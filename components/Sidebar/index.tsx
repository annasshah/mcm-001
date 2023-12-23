"use client";

import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";

import { routeList } from "./constant";
import Image from "next/image";
import { Logo, clinca_logo } from "@/assets/images";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { FaChevronRight } from "react-icons/fa";

export const SidebarSection = () => {
  const pathname = usePathname();
  const [openedCollapse, setOpenedCollapse] = useState<number>(-1);

  const customTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
      base: "bg-white overflow-y-auto",
      inner: `bg-white overflow-y-auto flex flex-col justify-between h-full pr-3`,
    },
  };

  const handleCollapseClick = (collapseId: number) => {
    setOpenedCollapse(collapseId === openedCollapse ? -1 : collapseId);
  };

  const sidebarStyle = {
    marginBottom: `80px`,
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
                const isRouteActive = list.route === pathname;

                return (
                  <div key={list.id} className="relative w-full">
                    {isRouteActive && (
                      <div
                        style={{ zIndex: 30 }}
                        className="w-[6px] h-[40px] bg-[#0F4698] bg-opacity-30 rounded-r-[20px] absolute left-0 -ml-[1.25rem]"
                      />
                    )}
                    <Sidebar.Item
                      key={list.id}
                      href={list.route}
                      icon={() => (
                        <div className="flex items-center">
                          <Image
                            src={list?.icon?.src || ""}
                            alt="Icon"
                            height={list?.icon?.height}
                            width={list?.icon?.width}
                          />
                        </div>
                      )}
                      label={
                        <div className="text-[15px] -mr-1">
                          <FaChevronRight />
                        </div>
                      }
                      labelColor="transparent"
                      className={`text-[#3A3541] hover:bg-[#0F4698] hover:bg-opacity-30  ${
                        isRouteActive ? "bg-[#0F4698] bg-opacity-30" : ""
                      }`}
                    >
                      <h3>{list.name}</h3>
                    </Sidebar.Item>
                  </div>
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
                        className="w-[6px] h-[40px] bg-[#0F4698] bg-opacity-30 rounded-r-[20px] absolute left-0 -ml-[1.25rem]"
                      />
                    )}
                    <Sidebar.Collapse
                      icon={() => (
                        <Image
                          src={list?.icon?.src || ""}
                          alt="Icon"
                          height={list?.icon?.height}
                          width={list?.icon?.width}
                        />
                      )}
                      label={list.name}
                      className={`text-[#3A3541] hover:bg-[#0F4698] hover:bg-opacity-30  ${
                        isRouteActive ? "bg-[#0F4698] bg-opacity-30" : ""
                      }`}
                      onClick={() => handleCollapseClick(list.id)}
                      open={list.id === openedCollapse}
                    >
                      {list.children.map((item, index) => (
                        <Sidebar.Item
                          key={item.id}
                          href={item.route}
                          className={`text-[#3A3541] text-left ${
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
      <article className="fixed w-[233px] p-3 bottom-5 bg-white flex justify-center">
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
