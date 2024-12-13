'use client';
import React, { useEffect, useState } from 'react'
import { Input_Component } from '../Input_Component';
const SetPasswordComponent = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
    //   const { error } = await supabase.auth.updateUser({ password });
  
    //   if (error) {
    //     setError(error.message);
    //   }
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

export default SetPasswordComponent
