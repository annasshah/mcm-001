'use client'
import { useState } from 'react';
import { login } from "@/actions/supabase_auth/action";
import { Logo } from "@/assets/images";
import { Password_Input } from "@/components/Inputs_fields.tsx/Password_Input";
import Image from "next/image";
import { CircularProgress } from '@mui/material';

function Login({ searchParams }: { searchParams: { error_message: string } }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true);

    // Wait for the server action to process the form submission
    await login(new FormData(event.currentTarget));

    setLoading(false);
  };

  return (
    <main className="max-w-[450px] w-full">
      <div>
        <form className="flex flex-col items-center px-4 space-y-5" onSubmit={handleSubmit}>
          <Image
            className="w-52"
            src={Logo}
            alt="Logo"
          />

          <div className="space-y-6 pb-7 w-full">
            <div className="border-b-black border-b-2">
              <input 
                id="email" 
                name="email" 
                type="email" 
                required
                placeholder="Enter email" 
                className="py-3 bg-transparent w-full focus-visible:outline-0" 
              />
            </div>

            <Password_Input Child_Input_Compionent={({ show_password }: { show_password: any }) => {
              return (
                <input 
                  id="password" 
                  name="password" 
                  type={show_password ? "text" : "password"} 
                  required 
                  placeholder="Password" 
                  className="py-3 bg-transparent w-full focus-visible:outline-0" 
                />
              );
            }} />
          </div>

          <button 
            type="submit" 
            className="bg-primary_color py-3 w-full text-white disabled:opacity-70 hover:opacity-90 active:opacity-80" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Login'}
          </button>

          {searchParams?.error_message && (
            <p className="mt-4 p-4 bg-red-600/10 w-full rounded-xl text-red-600 text-foreground border-[1px] border-red-600/25">
              {searchParams.error_message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default Login;
