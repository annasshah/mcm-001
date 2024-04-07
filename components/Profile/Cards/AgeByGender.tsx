"use client";
import React, { FC, useState, useEffect, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { PageFansCountry, FansCountryKeys } from "../../../utils/facebook";
interface Card2 {
  color: string;
  name: string;
}
interface FanData {
  country: string;
  fans: number;
}
const Card3 = () => {
  const [fansCountry, setFansCountry] = useState(undefined);
  const [fansRemoveMenu, setFansRemoveMenu] = useState(false);
  const [fansCountryMenu, setFansCountryMenu] = useState(false);
  const [fansCountryOption, setFansCountryOption] = useState("");
  const [countryOptions, setCountryOptions] = useState<string[]>();
  const [fanData, setFanData] = useState<FanData[]>([]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const fanscountrykeys = await FansCountryKeys();

        // Use map to create an array of promises
        const promises = fanscountrykeys.map(async (element: any) => {
          const fanscountry = await PageFansCountry(element);
          // console.log(`{ country: ${element}, fans: ${fanscountry} }`);
          return { country: element, fans: fanscountry };
        });

        // Wait for all promises to resolve
        const results = await Promise.all(promises);

        // Sort the array based on the 'fans' property
        results.sort((a: any, b: any) => b.fans - a.fans);

        // Now 'results' array is sorted based on the 'fans' property
        const top5 = results.slice(0, 5);

        setFanData(top5);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);

  return (
    <div
      className={`flex flex-col items-start  relative p-4  rounded-[10px] mx-5 w-[30%] h-[350px] bg-[#B8C8E1] justify-start`}
    >
      <p className=" text-xl font-bold">Age by gender</p>
      <p className=" text-3xl mt-2 font-extrabold">300</p>
      <p className=" text-[#343131] ">Total Users</p>
      <div className="h-[250px] flex mt-[10px]  items-end justify-start  w-[100%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={500}
            data={fanData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="country" />
            <YAxis dataKey="fans" />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="fans"
              fill="#000000"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Card3;
