"use client";
import React, { FC, useState, useEffect } from "react";

import { PageFansCountry, FansCountryKeys } from "../../../utils/facebook";

interface Card2 {
  color: string;
  name: string;
}

interface FanData {
  country: string;
  fans: number;
}

const Card3: FC<Card2> = ({ color, name }) => {
  const [fanData, setFanData] = useState<FanData[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fanscountrykeys = await FansCountryKeys();
        const promises = fanscountrykeys.map(async (element: any) => {
          const fanscountry = await PageFansCountry(element);
          return { country: element, fans: fanscountry };
        });
        const results = await Promise.all(promises);
        results.sort((a: any, b: any) => b.fans - a.fans);
        const top5 = results.slice(0, 5);
        setFanData(top5);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  const maxFans = Math.max(...fanData.map((data) => data.fans));

  return (
    <div
      className={`flex flex-col items-start relative p-4 rounded-[10px] mx-5 w-[30%] h-[350px] ${color} justify-start`}
    >
      <p className="text-xl font-bold">{name}</p>
      <p className="text-[#343131]">Total Users</p>
      <div className="flex flex-row mt-[10px] w-[100%] h-[250px] items-end">
        {fanData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col h-full items-center  justify-end w-1/5 mx-1"
          >
            <span className="text-center mt-1 text-xs">{data.country}</span>
            <div
              className="bg-black my-2 text-white"
              style={{
                height: `${(data.fans / maxFans) * 100}%`, // Proportional height
                width: "100%",
                // minHeight: "10px", // Minimum height for visibility
              }}
            >
              &nbsp;
            </div>
            <span className="text-center text-xs">{data.fans}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card3;
