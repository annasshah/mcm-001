"use client";
import { useEffect, useState, FC } from "react";
import LikeIcons from "../../../assets/images/icons/Thumbs Down.png";
import ViewIcons from "../../../assets/images/icons/Sleepy Eyes.png";
import EngagementIcons from "../../../assets/images/icons/Wedding Rings.png";
import ImpressionIcons from "../../../assets/images/icons/Commercial.png";
import Image from "next/image";
import React from "react";
import { PageLikes } from "../../../utils/facebook";

const PostClickLikes = () => {
  const [likes, setLikes] = useState(undefined);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likeofpages = await PageLikes();

        setLikes(likeofpages);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, []);
  return (
    <div
      className={`flex relative  flex-col items-center w-[25%] h-[350px] bg-[#E1ECE6] justify-center mr-5  rounded-[10px] p-4 cursor-pointer `}
    >
      <div className="w-[150px] text-[#236D00] text-xs  flex items-center justify-center  absolute rounded-[5px] top-3 right-3 bg-[#F6F6F6]">
        +20 this week
      </div>
      <Image src={LikeIcons} width={80} height={20} alt="" />

      <p className=" text-3xl font-bold">{likes}</p>

      <p>Total Page Likes</p>
    </div>
  );
};

export default PostClickLikes;
