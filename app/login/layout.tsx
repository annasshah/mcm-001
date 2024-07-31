import { login_bottom_right_arrows, login_left_circle, login_top_right_circle } from "@/assets/SVGs";
import Image from "next/image";

export default function layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<div>

    <div className="hidden -z-20  absolute w-screen lg:flex justify-between">
      <div className="min-h-screen flex items-center">
        <Image
          // className=""
          src={login_left_circle}
          // className="object-scale-down h-96"
          alt="Icon"
        // height={500}
        // width={250}
        // width={list?.icon?.width}
        />
      </div>


      <div className="flex flex-col min-h-screen justify-between items-end">
        <div className="">
          <Image
            className=""
            src={login_top_right_circle}
            // className="object-scale-down h-96"
            alt="Icon"
          // height={500}
          // width={250}
          // width={list?.icon?.width}
          />
        </div>
        <div className="">
          <Image
            className=""
            src={login_bottom_right_arrows}
            // className="object-scale-down h-96"
            alt="Icon"
          // height={500}
          // width={250}
          // width={list?.icon?.width}
          />
        </div>
      </div>
    </div>




    <div className="grid place-items-center min-h-screen">
      {children}
    </div>

  </div>

  )
}
