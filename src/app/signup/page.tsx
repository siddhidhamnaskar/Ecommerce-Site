"use client";

import { useState } from "react";


export default function SignUpPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');


    return<>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
         <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup To Your Account</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)} 
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 rounded-lg border" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Confirm Password</label>
                 <input 
                   type="password" 
                   className="w-full px-4 py-2 rounded-lg border" 
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   required
                   />
              </div>
            </form>
            
         </div>

      </div>

    </>
}