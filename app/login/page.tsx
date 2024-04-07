'use client'
import { login } from "@/actions/supabase_auth/action";
import { Logo } from "@/assets/images";
import { Password_Input } from "@/components/Inputs_fields.tsx/Password_Input";
import Image from "next/image";
async function Login({searchParams}: {searchParams:{error_message:string}}) {

  return (
    <main className="max-w-[450px] w-full">

      <div className="">
        <form className="flex flex-col items-center px-4 space-y-5">
          <Image
            className="w-52"
            src={Logo}
            // className="object-scale-down h-96"
            alt="Logo"
          // height={500}
          // width={250}
          // width={list?.icon?.width}
          />

          <div className="space-y-6 pb-7 w-full">
            <div className="border-b-black border-b-2">
              <input id="email" name="email" type="email" required
                placeholder="Enter email" className="py-3 bg-transparent w-full  focus-visible:outline-0" />
            </div>


            <Password_Input Child_Input_Compionent={({ show_password }: { show_password: any }) => {
              return <input id="password" name="password" type={show_password ? "text" : "password"} required={true} placeholder="Password" className="py-3 bg-transparent  w-full focus-visible:outline-0 " />
            }} />
            {/* <div className="border-b-black border-b-2 flex items-center">
              
              <span onClick={()=>setShow_password(!show_password)} className="cursor-pointer">
                {show_password ? <IoIosEyeOff  size={30} /> : <IoMdEye  size={30} />}
              </span>
            </div> */}
          </div>



          {/* <Button  color="dark" className="!border-r-0 bg-primary_color" size="lg" fullSized={true} >Login</Button> */}
          <button formAction={login} className=" bg-primary_color py-3 w-full text-white ">
            Login
          </button>

          {searchParams?.error_message && (
            <p className="mt-4 p-4 bg-red-600/10 w-full rounded-xl text-red-600  text-foreground border-[1px] border-red-600/25">
              {searchParams.error_message}
            </p>
          )}
        </form>

      </div>





    </main>
  );
};

export default Login;
