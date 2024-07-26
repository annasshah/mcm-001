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

    const [menArray, setMenArray] = useState([]);
    const [womenArray, setWomenArray] = useState([]);
    const [undefinedArray, setUndefinedArray] = useState([]);
  
    useEffect(() => {
      const responseData = {
        "value": {
          "U.55-64": 3,
          "M.55-64": 141,
          "U.35-44": 10,
          "F.45-54": 750,
          "M.18-24": 42,
          "M.35-44": 399,
          "F.25-34": 651,
          "M.25-34": 208,
          "F.13-17": 3,
          "U.45-54": 7,
          "F.65+": 113,
          "F.55-64": 276,
          "M.13-17": 1,
          "M.65+": 66,
          "F.35-44": 914,
          "U.25-34": 6,
          "M.45-54": 337,
          "F.18-24": 78
        }
      };
  
      // Initialize arrays
      const men = [];
      const women = [];
      const undefinedValues = [];
  
      // Parse the response data
      for (const key in responseData.value) {
        const [gender, ageRange] = key.split('.');
        const fans = responseData.value[key];
  
        // Remove "M.", "F.", and "U." prefixes
        const cleanAgeRange = ageRange.replace(/^\d{1,2}-/, '');
  
        if (gender === 'M') {
          men.push({ age: cleanAgeRange, fans: fans });
        } else if (gender === 'F') {
          women.push({ age: cleanAgeRange, fans: fans });
        } else {
          undefinedValues.push({ age: cleanAgeRange, fans: fans });
        }
      }
  
      // Set state with the parsed data
      setMenArray(men);
      setWomenArray(women);
      setUndefinedArray(undefinedValues);
    }, []);

  return (
    <div
      className={`flex flex-col items-start  relative p-4  rounded-[10px] mx-5 w-[30%] h-[350px] bg-[#B8C8E1] justify-start`}
    >
      <p className=" text-xl font-bold">Age by gender</p>
      <p className=" text-3xl mt-2 font-extrabold">300</p>
      <p className=" text-[#343131] ">Total Users</p>
      <div className="h-[250px] flex mt-[10px]  items-end justify-start  w-[100%]">
        {/* <ResponsiveContainer width="100%" height="100%">
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
        </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default Card3;
