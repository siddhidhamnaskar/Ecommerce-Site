"use client";

import { useState } from "react";


export default function SignUpPage(){
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const [loading,setLoading]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');


    const handleSubmit=async(e:any)=>{
      e.preventDefault();
      setError("");
      try{
         if(password !=confirmPassword)
         {
           setError("Password not matched");
           return
         }
         setLoading(true);
         const res=await fetch(`/api/auth/signup`,{
          method:"POST",
          headers:{
            "Content-type":"apllication/json"
          },
          body:JSON.stringify({name,email,password})
         })
         const data=await res.json();
         if(!res.ok)
         {
           setError(data.error || "Signup Failed");
         }
         else{
           console.log("Account Created Successfully");
           setSuccess("Account Created Successfully");
           setTimeout(()=>{
             setSuccess("");
           },5000)
         }
      }
      catch(err)
      {
          setError("Something went wrong");
      }
      finally{
          setLoading(false);
      }

    }


    return<>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
         <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup To Your Account</h2>
            {error && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-600 text-sm">
                {success}
              </div>
            )}
            <form onSubmit={(e)=>handleSubmit(e)} className="space-y-5">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border focus:ring focus:ring-indigo-300 focus:outline-none" 
                  value={name}
                  onChange={(e)=>setName(e.target.value)} 
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-indigo-300" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-indigo-300" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Confirm Password</label>
                 <input 
                   type="password" 
                   className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring focus:ring-indigo-300" 
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   required
                   />
              </div>
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
               >
                {loading ? "Creating accounr..." : "Login"}
               </button>
            </form>
            <p className="mt-6 text-center text-gray-600  text-sm">
              Already have an account?{' '}
              <a href="/" className="text-indigo-600 font-medium hover:underline">
                 Login
              </a>
            </p>
            
         </div>

      </div>

    </>
}