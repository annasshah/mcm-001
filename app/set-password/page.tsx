'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/services/supabase';
import { Input_Component } from '@/components/Input_Component';

export default function SetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams()
  const access_token = searchParams.get('access_token')

  console.log(access_token)

  useEffect(() => {

    if (access_token) {
      // @ts-ignore
      supabase.auth.setSession(access_token);
    }
    // else{
    //   router.push('/login')
    // }
  }, [access_token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    }
    //  else {
    //   // Redirect to login or dashboard
    //   router.push('/login');
    // }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>

      <div className='w-[500px] px-4 py-5 bg-white rounded-md min-h-[200px]'>
        <h1 className='mb-3 text-xl font-bold text-center text-slate-900'>Set Your Password</h1>
        <div className=' h-[200px] flex flex-col justify-center'>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {error && <p className='text-red-600'>{error}</p>}

            <Input_Component
              label='Password'
              value={password}
              passwordEye
              placeholder="Password"
              border="border-[1px] border-gray-300 rounded-md"
              onChange={(e: any) => setPassword(e)}
            />

            <button
              type="submit"
              className="bg-black border-2 border-black text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:border-gray-400 col-span-3 w-full"
            >Set Password
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
