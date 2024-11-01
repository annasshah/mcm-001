"use client";
import { useEffect, useState, FC } from "react";
import ImpressionIcons from "../../../assets/images/icons/Commercial.png";
import Image from "next/image";
import React from "react";
import { PageImpressions } from "../../../utils/facebook";
const PageImpression = () => {
  const [impressions, setImpressions] = useState(undefined);
  const [impressionsPeriod, setImpressionsPeriod] = useState("day");
  const [impressionsType, setImpressionsType] = useState("day");
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const impressionofpages = await PageImpressions(impressionsPeriod);
        setImpressions(impressionofpages);
        // console.log(likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [impressionsPeriod]);
  return (
    <div
      className={`flex relative  flex-col items-center w-[25%] h-[350px] bg-[#BFC1F9] justify-center mr-10  rounded-[10px] p-4 cursor-pointer `}
    >
      <div className="flex flex-col w-[50%] top-3 right-3  absolute">
        <div className="w-[100%] text-xs  flex items-center justify-center   rounded-[5px]  bg-[#F6F6F6]">
          {/* <div
            className="w-[25%] text-center"
            onClick={() => setImpressionsType("all")}
          >
            all
          </div> */}
          {/* <div
            className="w-[45%] text-center border border-r-[#000] "
            onClick={() => setImpressionsType("organic")}
          >
            organic
          </div> */}
          {/* <div
            className="w-[30%] text-center "
            onClick={() => setImpressionsType("paid")}
          >
            paid
          </div> */}
        </div>
        <div className="w-[100%] text-xs  flex items-center justify-center  mt-1 rounded-[5px]  bg-[#F6F6F6]">
          <div
            className={`w-[25%] text-center cursor-pointer  ${
              impressionsPeriod === "day" && "bg-[#343131] text-white"
            } cursor-pointer `}
            onClick={() => setImpressionsPeriod("day")}
          >
            day
          </div>
          <div
            className={`w-[35%] text-center border border-x-[#000] cursor-pointer ${
              impressionsPeriod === "week" && "bg-[#343131] text-white"
            } cursor-pointer `}
            onClick={() => setImpressionsPeriod("week")}
          >
            week
          </div>
          <div
            className={`w-[35%] text-center cursor-pointer  ${
              impressionsPeriod === "days_28" && "bg-[#343131] text-white"
            } cursor-pointer `}
            onClick={() => setImpressionsPeriod("days_28")}
          >
            month
          </div>
        </div>
      </div>

      <Image src={ImpressionIcons} width={80} height={60} alt="" />

      <p className=" text-3xl font-bold">{impressions}</p>

      <p>Page Impression</p>
    </div>
  );
};

export default PageImpression;
