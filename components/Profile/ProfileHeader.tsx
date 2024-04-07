import React from "react";

const ProfileHeader = () => {
  return (
    <div className="flex w-full items-center justify-start ">
      <div className="  flex mx-4 font-bold  border-b-[2px] border-black ">
        <p className="px-1">●</p> <p className="px-1">Facebook</p>
      </div>
      <div className=" flex mx-4   font-bold  border-b-[2px] border-black ">
        <p className="px-1">●</p>
        <p className="px-1">Instagram</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
