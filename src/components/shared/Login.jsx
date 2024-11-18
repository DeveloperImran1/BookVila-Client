// "use client";
// import Link from "next/link";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { HiOutlineEye } from "react-icons/hi";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Swal from 'sweetalert2'
// import { TbFidgetSpinner } from "react-icons/tb";
// import toast from "react-hot-toast";
// import SocialSignIn from "./SocialSignIn";




// const Login = () => {
//     const router = useRouter();

//     const searchParamsForError = useSearchParams();
//     const error = searchParamsForError.get('error');

//     useEffect(() => {
//         if (error === 'access_denied') {
//             toast.error('You cannot access this route 😒');
//         }
//     }, [error]);


//     const successfullySignIn = (callBackUrl) => {
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "Successfully SignIn",
//             showConfirmButton: false,
//             timer: 1500
//         }).then(()=> router.push(callBackUrl || "/"))
//     }
//     const errorSignIn = () => {
//         Swal.fire({
//             position: "center",
//             icon: "error",
//             title: "SignIn Error",
//             showConfirmButton: false,
//             timer: 1500
//         });
//     }

//     const [viewPass, setViewPass] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // navigate kore onno page conditinaly jaoer jonno
//     const path = searchParamsForError.get("redirect");
//     console.log("search params is a ", searchParamsForError, "path is a ", path)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         setLoading(true)
//         // nextJs dia login korar way: 
//         const resp = await signIn('credentials', {
//             email, password,
//             redirect: false,
//             callbackUrl: path ? path : "/"
//         });
//         console.log("responce is", resp)
//         setLoading(false)
//         // thik vabe login hole home page a pathia dibo.
//         if (resp?.ok) {
//             successfullySignIn(resp?.url)
//             e.target.reset()
            
//         }
//         else {
//             errorSignIn()
//             console.log("Sign In Error ", resp?.error)
//         }
//     };

//     return (
//         <div className="">
//             <div
//                 style={{ backgroundImage: `url('https://i.postimg.cc/j5F0kNnY/loginBG.jpg')` }}
//                 className="bg-cover bg-center pb-16"
//             >
//                 <div className="container mx-auto flex flex-col md:flex-row text-white">
//                     <div className="w-full md:w-1/2 my-5 md:mt-14 p-3">
//                         <div className="max-w-[550px] mb-44">
//                             <h1 className="pb-[30px] mb-[30px] font-bold text-3xl md:border-b text-center md:text-start md:ml-0">
//                             <Link href="/">
//                                         <Image height={676} width={1200}
//                                             src="https://i.ibb.co.com/SfNwSrp/Whats-App-Image-2024-10-10-at-11-12-02-PM-removebg-preview-1.png"
//                                             className="w-[100px] h-[100px] scale-100 text-white transition-all duration-200 hover:scale-110"
//                                             alt="logo"
//                                         />
//                                     </Link>
//                             </h1>
//                             <div className="hidden md:block">
//                                 <h1 className="font-semibold text-2xl leading-9 mb-6">
//                                     Why choose EventBookings for your <br /> event ticketing?
//                                 </h1>
//                                 <ul className="mb-4">
//                                     <li>
//                                         <p className="text-[1rem] mb-1 font-semibold text-white flex gap-x-2">
//                                             <span>
//                                                 <IoIosCheckmarkCircle className="text-2xl text-[#1b85db]" />
//                                             </span>
//                                             Simple, easy-to-use platform
//                                         </p>
//                                     </li>
//                                     <li>
//                                         <p className="text-[1rem] mb-1 font-semibold text-white flex gap-x-2">
//                                             <span>
//                                                 <IoIosCheckmarkCircle className="text-2xl text-[#1b85db]" />
//                                             </span>
//                                             Lowest ticketing fees
//                                         </p>
//                                     </li>
//                                     <li>
//                                         <p className="text-[1rem] mb-1 font-semibold text-white flex gap-x-2">
//                                             <span>
//                                                 <IoIosCheckmarkCircle className="text-2xl text-[#1b85db]" />
//                                             </span>
//                                             Dedicated customer support team
//                                         </p>
//                                     </li>
//                                     <li>
//                                         <p className="text-[1rem] mb-1 font-semibold text-white flex gap-x-2">
//                                             <span>
//                                                 <IoIosCheckmarkCircle className="text-2xl text-[#1b85db]" />
//                                             </span>
//                                             Powerful features
//                                         </p>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="hidden md:block text-white">
//                             <h2 className="font-bold text-2xl my-12">
//                                 10,000+ communities and organisers worldwide sell with
//                                 EventBookings
//                             </h2>
//                             <div className="grid grid-cols-4 gap-x-10 gap-10 w-4/5 items-center justify-center">
//                                 {/* brand logos */}

//                                 {/* img3 */}
//                                 <div>
//                                     <Image
//                                         src="https://i.postimg.cc/NMcbvcD8/org-3.png"
//                                         height={1000}
//                                         width={1000}
//                                         alt="logo"
//                                         className=""
//                                     />
//                                 </div>

//                                 {/* img5 */}
//                                 <div>
//                                     <Image
//                                         src="https://i.postimg.cc/br6Rn2hL/org-5.png"
//                                         height={1000}
//                                         width={1000}
//                                         alt="logo"
//                                         className="w-10/12 p-1"
//                                     />
//                                 </div>

//                                 {/* img7 */}
//                                 <div>
//                                     <Image
//                                         src="https://i.postimg.cc/mZVjJKHM/org-7.png"
//                                         height={1000}
//                                         width={1000}
//                                         alt="logo"
//                                         className="w-10/12 p-3"
//                                     />
//                                 </div>
//                                 {/* img8 */}
//                                 <div>
//                                     <Image
//                                         src="https://i.postimg.cc/br6Rn2hL/org-5.png"
//                                         height={1000}
//                                         width={1000}
//                                         alt="logo"
//                                         className="w-10/12 p-1"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Right side content */}
//                     <div className="max-w-[599px] md:w-1/2 md:mr-5 md:mx-auto max-h-[650px] bg-white text-black p-10 shadow-lg flex flex-col justify-center -mt-[220px] mx-5 md:mt-[50px] rounded-xl">
//                         <h1 className="text-2xl md:text-[27px] font-bold mb-11 text-center">
//                             Log in to your account
//                         </h1>

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Email */}
//                             <div>
//                                 <label className="block text-[15px] font-medium mb-1">
//                                     Email address
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="Email address"
//                                     required
//                                     className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                                 />
//                             </div>

//                             {/* Password */}
//                             <div className="relative">
//                                 <label className="block text-[15px] font-medium mb-1">
//                                     Password
//                                 </label>
//                                 <input
//                                     type={`${!viewPass ? "password" : "text"}`}
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="Password"
//                                     required
//                                     className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                                 />
//                                 <span
//                                     onClick={() => {
//                                         setViewPass(!viewPass);
//                                     }}
//                                     className={`${!viewPass
//                                         ? "absolute right-4 top-10"
//                                         : "absolute right-4 top-10 text-gray-400"
//                                         }`}
//                                 >
//                                     <HiOutlineEye className="text-2xl" />
//                                 </span>
//                             </div>

//                             {/* Log in Button */}
//                             <button
//                                 type="submit"
//                                 className="bg-[#1b85db] text-white rounded-md p-3 w-full font-bold hover:bg-[#1b85db]"
//                             >
//                                 {
//                                     loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Login"
//                                 }

//                             </button>
//                         </form>


//                         {/* Sign up with Google, Facebook, Apple */}
//                         <SocialSignIn></SocialSignIn>

//                         {/* Sign up Link */}
//                         <p className="text-center mt-4">
//                             Dont have an account?
//                             <Link href="register" className="text-[#1b85db] font-bold hover:underline">
//                                 Sign Up
//                             </Link>
//                         </p>

//                         {/* Terms & Privacy */}
//                         <p className="text-center text-xs text-gray-500 mt-2">
//                             By clicking Log In, you agree to EventBookings{" "}
//                             <Link href="#" className="text-[#1b85db] underline">
//                                 Terms & Conditions
//                             </Link>{" "}
//                             and have read the{" "}
//                             <Link href="#" className="text-[#1b85db] underline">
//                                 Privacy Policy
//                             </Link>

//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
'use client'
import React, { useState, useEffect } from 'react';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background curved shape - Matching the image exactly */}
      <div className="absolute top-0 right-0 h-screen w-[65%] bg-emerald-500 transform transition-transform duration-1000 ease-in-out rounded-l-[100px] z-0" />

      {/* Main content wrapper */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side with form */}
        <div className="w-[35%] flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            {/* Sign Up Form */}
            <div className={`w-full bg-white rounded-3xl p-8 shadow-xl transform transition-transform duration-500 ease-in-out ${isSignIn ? 'scale-0' : 'scale-100'}`}>
              <div className="space-y-5">
                <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <input 
                  type="password" 
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <button className="w-full py-3 rounded-lg bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-colors">
                  Sign up
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button onClick={toggle} className="font-semibold text-emerald-500 hover:text-emerald-600">
                    Sign in here
                  </button>
                </p>
              </div>
            </div>

            {/* Sign In Form */}
            <div className={`w-full bg-white rounded-3xl p-8 shadow-xl transform transition-transform duration-500 ease-in-out ${isSignIn ? 'scale-100' : 'scale-0'} absolute top-8 left-8`}>
              <div className="space-y-5">
                <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none"
                />
                <button className="w-full py-3 rounded-lg bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-colors">
                  Sign in
                </button>
                <p className="text-center">
                  <button className="text-sm font-semibold text-emerald-500 hover:text-emerald-600">
                    Forgot password?
                  </button>
                </p>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button onClick={toggle} className="font-semibold text-emerald-500 hover:text-emerald-600">
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with welcome text */}
        <div className="w-[65%] flex items-center justify-center">
          <div className={`text-center text-white transform transition-transform duration-1000 ${isSignIn ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-6xl font-extrabold whitespace-nowrap">
              {isSignIn ? 'Welcome Back' : 'Join with us'}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
