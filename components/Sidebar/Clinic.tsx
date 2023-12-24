import { clinca_logo } from "@/assets/images";
import Image from "next/image";

export const Clinic = () => {
  return (
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
  );
};
