"use client";
import React, { useState, useEffect } from "react";

interface CountData {
  male: number;
  female: number;
  others: number;
}

const Card3: React.FC = () => {
  const [countData, setCountData] = useState<CountData>({
    male: 0,
    female: 0,
    others: 0,
  });

  useEffect(() => {
    const responseData = {
      value: {
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
        "F.18-24": 78,
      },
    };

    const counts: CountData = { male: 0, female: 0, others: 0 };

    for (const key in responseData.value) {
      const [gender] = key.split(".");
      const fans = responseData.value[key];

      if (gender === "M") {
        counts.male += fans;
      } else if (gender === "F") {
        counts.female += fans;
      } else {
        counts.others += fans;
      }
    }

    setCountData(counts);
  }, []);

  const maxCount = Math.max(countData.male, countData.female, countData.others);

  return (
    <div className="flex flex-col items-start relative p-4 rounded-[10px] mx-5 w-[30%] h-[350px] bg-[#B8C8E1] justify-start">
      <p className="text-xl font-bold">Age By Gender</p>
      <p className="text-3xl mt-2 font-extrabold">
        {countData.male + countData.female + countData.others}
      </p>
      <p className="text-[#343131]">Total Users</p>
      <div className="h-[250px] w-full mt-[10px] flex flex-col justify-start items-start">
        <div className="flex-1 flex flex-row justify-between w-[90%] items-end my-4 ">
          <div
            className="relative w-[20%] mx-2"
            style={{
              height: `${(countData.male / maxCount) * 100}%`,
              backgroundColor: "#000000", // Blue for Male
              borderRadius: "0px",
            }}
          >
            <div className="absolute bottom-[-20px] text-center text-xs w-full">
              Male
            </div>
            <div className="absolute top-[-20px] text-center text-xs w-full">
              {countData.male}
            </div>
          </div>
          <div
            className="relative w-[20%]  mx-2"
            style={{
              height: `${(countData.female / maxCount) * 100}%`,
              backgroundColor: "#000000", // Pink for Female
              borderRadius: "0px",
            }}
          >
            <div className="absolute bottom-[-20px] text-center text-xs w-full">
              Female
            </div>
            <div className="absolute top-[-20px] text-center text-xs w-full">
              {countData.female}
            </div>
          </div>
          <div
            className="relative w-[20%]  mx-2"
            style={{
              height: `${(countData.others / maxCount) * 100}%`,
              backgroundColor: "#000000", // Green for Others
              borderRadius: "0px",
            }}
          >
            <div className="absolute bottom-[-20px] text-center text-xs w-full">
              Others
            </div>
            <div className="absolute top-[-20px] text-center text-xs w-full">
              {countData.others}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-between mt-2">
          <span className="text-xs">Male</span>
          <span className="text-xs">Female</span>
          <span className="text-xs">Others</span>
        </div> */}
      </div>
    </div>
  );
};

export default Card3;
