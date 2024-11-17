import React from "react";

const TotalPageFans = () => {
  return (
    <div className="flex   items-start w-[98%] h-[550px] bg-[#D8E5F1] justify-center mr-10  rounded-[10px] p-4  ">
      <div className="w-[25%]  ">
        <h1 className=" text-2xl font-bold">Total Page Fans</h1>
      </div>
      <div className="w-[25%]">
        <h1 className=" text-2xl font-bold">Fans by locale</h1>
      </div>
      <div className="w-[25%]">
        <h1 className=" text-2xl font-bold">Fans by City</h1>
      </div>
      <div className="w-[25%]">
        <h1 className=" text-2xl font-bold">Fans by Country</h1>
      </div>
    </div>
  );
};

export default TotalPageFans;
