'use client'

import { HiOutlineEye } from 'react-icons/hi';
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from 'sweetalert2'
import { TbFidgetSpinner } from "react-icons/tb";
import toast from "react-hot-toast";
import SocialSignIn from "./SocialSignIn";
import useAxiosPublic from '@/hooks/useAxiosPublic';


export default function SignInAndUp() {


  const router = useRouter();
    const searchParamsForError = useSearchParams();
    const error = searchParamsForError.get('error');

    const [isSignIn, setIsSignIn] = useState(true)
       
    const handleToggle = () => {
      setIsSignIn(!isSignIn)
    }


// register //
const successfullySignIn = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Successfully SignIn",
    showConfirmButton: false,
    timer: 1500
  });
}
const errorSignIn = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "SignIn Error",
    showConfirmButton: false,
    timer: 1500
  });
}
const errorSignInExistUser = () => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "User Already Registered",
    showConfirmButton: false,
    timer: 1500
  });
}

const [viewConfirmPass, setViewConfirmPass] = useState(false)

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


const [images, setImages] = useState([]);
const [links, setLinks] = useState([]);
const [showName, setShowName] = useState({})
const [selectedImage, setSelectedImage] = useState(null);
const axiosPublic = useAxiosPublic()
// Handle file selection
const handleImageChange = (e) => {
  const file = e.target.files[0]; // Get the selected file
  if (file) {
    // Create a URL for the selected file to display as an image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  }
};





const handleSubmit = async (e) => {
  e.preventDefault();
  const name = `${e.target.firstName.value} ${e.target.lastName.value}`
  const email = e.target.email.value
  const password = e.target.password.value
  const image = links?.[0]
  console.log("db te image pathassi", image);

  // image upload in cloudinary
  try {
    let arr = [];
    for (let i = 0; i < images.length; i++) {
      const data = await uploadCloudinary(images[i])
      arr.push(data?.url)
    }
    setLinks(arr)
  }
  catch (error) {
    console.log(error)
  }
  console.log("multiple images ", links)
  console.log("iMAGE FILE IS ", images)

  if (!image) {
    return;
  }

  const newUser = {
    name: `${e.target.firstName.value} ${e.target.lastName.value}`,
    email: e.target.email.value,
    password: e.target.password.value,
    photo: image,
  }

  console.log(newUser)
  setLoading(true)
  const resp = await axiosPublic.post('/addeNewUser', newUser)
  console.log("SignUp korar por responce is ", resp)

  // user already regiterd hole return kore dibo
  if(!resp?.data?.success){
      return   errorSignInExistUser()
  }

  // nextJs dia login korar way: 
  const responce = await signIn('credentials', {
    email, password,
    redirect: false
  });
  console.log("responce is", responce)
  setLoading(false)
  // thik vabe login hole home page a pathia dibo.
  if (responce.status === 200) {
    successfullySignIn()
    router.push('/')
  }
  else {
    errorSignIn()
  }
};






    useEffect(() => {
        if (error === 'access_denied') {
            toast.error('You cannot access this route 😒');
        }
    }, [error]);

 

    const [viewPass, setViewPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const [SignINformData, setSignInFormData] = useState({
        email: "",
        password: "",
    });

    const handleSignChange = (e) => {
        setSignInFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // navigate kore onno page conditinaly jaoer jonno
    const path = searchParamsForError.get("redirect");
    console.log("search params is a ", searchParamsForError, "path is a ", path)
    const handleSignsubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true)
        // nextJs dia login korar way: 
        const resp = await signIn('credentials', {
            email, password,
            redirect: false,
            callbackUrl: path ? path : "/"
        });
        console.log("responce is", resp)
        setLoading(false)
        // thik vabe login hole home page a pathia dibo.
        if (resp?.ok) {
            successfullySignIn(resp?.url)
            e.target.reset()
            
        }
        else {
            errorSignIn()
            console.log("Sign In Error ", resp?.error)
        }
    };




  return (
    <div
    className="min-h-screen   bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center bg-gray-100 p-4"
    style={{ backgroundImage: "url('https://i.ibb.co.com/hmH7ZnS/pexels-philippedonn-1169754.jpg')" }}
    >
      <div className="relative w-full max-w-5xl h-[700px] bg-white border  border-gray-400 shadow-2xl rounded-3xl overflow-hidden">
        {/* Sliding Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2  text-white transition-transform duration-700 ease-in-out ${isSignIn ? 'translate-x-0' : '-translate-x-full'
            } hidden md:flex md:flex-col md:items-center md:justify-center  bg-cover bg-center bg-no-repeat bg-fixed `}
            style={{ backgroundImage: "url('https://i.ibb.co.com/hmH7ZnS/pexels-philippedonn-1169754.jpg')" }}

>
          <div className="px-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isSignIn ? 'Welcome Back!' : 'Join Our Community'}
            </h1>
            <p className="text-sm font-semibold mb-6">
              {isSignIn
                ? 'Sign in to access your account and explore our features.'
                : 'Create an account to get started with your journey.'}
           
            </p>
            <p className="text-base mb-2  ">
              {isSignIn
                ? 'Don`t have an account?'
                : 'Already have an account?'}
           
            </p>
            <button
              onClick={handleToggle}
              className="px-2 py-1 border-2 border-white rounded-lg text-lg   hover:bg-[#1b85db] text-white  p-3  font-bold bg-[#1b85dbb8]  transition-colors duration-300"
            >
              {isSignIn ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`w-full md:w-1/2 h-full transition-transform duration-700 ease-in-out ${isSignIn ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="h-full flex flex-col items-center justify-center px-2 md:px-12">
            <h2 className="text-2xl border-b border-cyan-300 py-1 font-bold text-gray-700 ">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </h2>

            {/* sign up form */}
            <div  className="w-full max-w-sm my-2 ">
              {!isSignIn && (
                 <form onSubmit={handleSubmit} className="space-y-2">
                 <div className="w-full flex gap-2 justify-center items-center ">
                   <Image src={selectedImage || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"} height={500} width={1200} alt="Profile Image" id="img" className="h-[70px] w-[70px] rounded-full" />
                   <div onChange={handleImageChange} className=" flex justify-center">
                     <label className="flex h-full w-max items-end gap-2 rounded-md bg-bg-blue p-1 px-2 text-white active:ring-4 " htmlFor="file">
                       <svg width={25} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Complete"><g id="upload"><g><path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><g><polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline><line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line></g></g></g></g></g>
                       </svg>
                       <p className="text-lg font-medium text-white"> {showName.name ? showName?.name?.slice(0, 20) : 'Upload'}</p>
                     </label>
                     <input
                       type="file"
                       multiple={true}
                       placeholder="Your Image"
                       required
                       onChange={(e) => {
                         setImages(e.target.files)
                         if (e.target.files && e.target.files[0]) {
                           const imageFile = e.target.files[0];
                           setShowName(imageFile)
                         }
                       }} className="hidden" id="file" />
                   </div>
   
                 </div>
                 {/* First and Last Name */}
                 <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2">
   
                   <div className="w-full">
                     <label className="block text-[15px] font-medium mb-1">
                       First name
                     </label>
                     <input
                       type="text"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                       placeholder="First name"
                       required
                       className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                     />
                   </div>
                   <div className="w-full">
                     <label className="block text-[15px] font-medium mb-1">
                       Last name
                     </label>
                     <input
                       type="text"
                       name="lastName"
                       value={formData.lastName}
                       onChange={handleChange}
                       placeholder="Last name"
                       required
                       className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                     />
                   </div>
                 </div>
   
                 {/* Email */}
                 <div>
                   <label className="block text-[15px] font-medium mb-1">
                     Email address
                   </label>
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Email address"
                     required
                     className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                   />
                 </div>
   
                 {/* Password */}
                 <div className="relative">
                   <label className="block text-[15px] font-medium mb-1">
                     Password
                   </label>
                   <input
                     type={`${!viewPass ? "password" : "text"}`}
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Password"
                     required
                     className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                   />
                   <span
                     onClick={() => {
                       setViewPass(!viewPass);
                     }}
                     className={`${!viewPass
                       ? "absolute right-4 top-9"
                       : "absolute right-4 top-9 text-gray-400"
                       }`}
                   >
                     <HiOutlineEye className="text-xl" />
                   </span>
                 </div>
   
                 {/* Confirm Password */}
                 <div className="relative">
                   <label className="block text-[15px] font-medium mb-1">
                     Confirm Password
                   </label>
                   <input
                     type={`${!viewConfirmPass ? "password" : "text"}`}
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     placeholder="Confirm Password"
                     required
                     className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                   />
                   <span
                     onClick={() => {
                       setViewConfirmPass(!viewConfirmPass);
                     }}
                     className={`${!viewConfirmPass
                       ? "absolute right-4 top-9"
                       : "absolute right-4 top-9 text-gray-400"
                       }`}
                   >
                     <HiOutlineEye className="text-xl" />
                   </span>
                 </div>
   
                 {/* Sign up Button */}
                 <button
                   type="submit"
                   className="bg-bg-blue mt-4 text-white text-lg rounded-md py-1 w-full font-bold hover:bg-[#1bb8db]"
                 >
                   {
                     loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Sign up"
                   }
   
                 </button>
                
               </form>
                  
              )}
                
            </div>
            {/* Sign in form */}
            <form onSubmit={handleSignsubmit} className="w-full  max-w-sm space-y-4">
              {isSignIn && (
                <div className='space-y-3' >

                  <div>
                    <input
                     type="email"
                     name="email"
                     value={SignINformData.email}
                     onChange={handleSignChange}
                     placeholder="Email address"
                    
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                    type={`${!viewPass ? "password" : "text"}`}
                    name="password"
                    value={SignINformData.password}
                    onChange={handleSignChange}
                    placeholder="Password"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <span
                                    onClick={() => {
                                        setViewPass(!viewPass);
                                    }}
                                    className={`${!viewPass
                                        ? "absolute right-4 top-3"
                                        : "absolute right-4 top-3 text-gray-400"
                                        }`}
                                >
                                    <HiOutlineEye className="text-2xl" />
                                </span>
                  </div>
                  <button
                                type="submit"
                                className="bg-bg-blue text-white rounded-md p-2 w-full font-bold hover:bg-[#1babdb]"
                            >
                                {
                                    loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Login"
                                }

                            </button>




                </div>
              )}

            </form>
            {/* Social Login */}
            
            <SocialSignIn></SocialSignIn>

            {/* Mobile Toggle */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={handleToggle}
                  className="text-emerald-500 font-semibold"
                >
                  {isSignIn ? 'Create Account' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}