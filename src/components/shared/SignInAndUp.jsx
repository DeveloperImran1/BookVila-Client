"use client";

import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineEye } from "react-icons/hi";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import SocialSignIn from "./SocialSignIn";

export default function SignInAndUp() {
  const router = useRouter();
  const searchParamsForError = useSearchParams();
  const error = searchParamsForError.get("error");
  const [isSignIn, setIsSignIn] = useState(true);

  const [images, setImages] = useState({});
  const [links, setLinks] = useState("");
  const [showName, setShowName] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Create a URL for the selected file to display as an image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
    await imageUploadFunc();
  };
  const imageUploadFunc = async () => {
    // image upload in cloudinary
    if (images?.name) {
      try {
        console.log("images is", images);
        const data = await uploadCloudinary(images);
        setLinks(data?.url);
        return data?.url;
      } catch (error) {
        return "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png";
      }
    } else {
      return "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png";
    }
  };

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  // register //
  const successfullySignIn = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Welcome to Readora",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const errorSignIn = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "SignIn Error",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const errorSignInExistUser = () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "User Already Registered",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = `${e.target.firstName.value}`;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = await imageUploadFunc();

    if (!image) {
      setLoading(false);
      return;
    }

    const newUser = {
      name: `${e.target.firstName.value}`,
      email: e.target.email.value,
      password: e.target.password.value,
      photo: image,
    };

    console.log(newUser);

    const resp = await axiosPublic.post("/addeNewUser", newUser);
    console.log("SignUp korar por responce is ", resp);

    // user already regiterd hole return kore dibo
    if (!resp?.data?.success) {
      setLoading(false);
      return errorSignInExistUser();
    }

    // nextJs dia login korar way:
    const responce = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("responce is", responce);
    setLoading(false);
    // thik vabe login hole home page a pathia dibo.
    if (responce.status === 200) {
      successfullySignIn();
      router.push("/");
    } else {
      errorSignIn();
    }
  };

  useEffect(() => {
    if (error === "access_denied") {
      toast.error("You cannot access this route 😒");
    }
  }, [error]);

  const [viewPass, setViewPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // navigate kore onno page conditinaly jaoer jonno
  const path = searchParamsForError.get("redirect");
  console.log("search params is a ", searchParamsForError, "path is a ", path);
  const handleSignsubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setLoading(true);
    // nextJs dia login korar way:
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: path ? path : "/",
    });
    console.log("responce is", resp);
    setLoading(false);
    // thik vabe login hole home page a pathia dibo.
    if (resp?.ok) {
      successfullySignIn(resp?.url);
      e.target.reset();
      router?.push("/");
    } else {
      errorSignIn();
      console.log("Sign In Error ", resp?.error);
    }
  };

  return (
    <>
      {/* large divice component  */}
      <div
        className="min-h-screen hidden md:flex items-center justify-center bg-gray-100 p-4"
        // style={{ backgroundImage: "url('https://i.ibb.co.com/hmH7ZnS/pexels-philippedonn-1169754.jpg')" }}
      >
        <div className="relative w-full max-w-5xl h-[600px] bg-white border  border-gray-400 shadow-2xl rounded-3xl ">
          {/* Sliding Panel */}
          <div
            className={`absolute top-0 right-0 h-full w-1/2  text-white transition-transform duration-700 ease-in-out ${
              isSignIn ? "translate-x-0" : "-translate-x-full"
            } hidden md:flex md:flex-col md:items-center md:justify-center  bg-cover bg-center bg-no-repeat bg-fixed `}
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/hmH7ZnS/pexels-philippedonn-1169754.jpg')",
            }}
          >
            <div className="px-8 text-center flex flex-col justify-center items-center">
              {/* logo section  */}
              <Link href="/">
                <Image
                  height={676}
                  width={1200}
                  src="https://i.postimg.cc/RVP3mcZM/Logo-R1-T-modify.png"
                  className="w-[220px] h-[110px] scale-100 text-white transition-all duration-200 hover:scale-110"
                  alt="logo"
                />
              </Link>

              <h1 className="text-3xl font-bold mb-2">
                {isSignIn ? "Welcome Back!" : "Join Our Community"}
              </h1>
              <p className="text-sm font-semibold mb-6">
                {isSignIn
                  ? "Sign in to access your account and explore our features."
                  : "Create an account to get started with your journey."}
              </p>
              <p className="text-base mb-2  ">
                {isSignIn
                  ? "Don`t have an account?"
                  : "Already have an account?"}
              </p>
              <button
                onClick={handleToggle}
                className="px-2 py-1 border-2 border-white rounded-lg text-lg   hover:bg-[#1b85db] text-white  p-3  font-bold bg-[#1b85dbb8]  transition-colors duration-300"
              >
                {isSignIn ? "Create Account" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Form Section */}
          <div
            className={`w-full md:w-1/2 h-full transition-transform duration-700 ease-in-out ${
              isSignIn ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col items-center justify-center px-2 md:px-12">
              <h2 className="text-2xl border-b border-cyan-300 py-1 font-bold text-gray-700 ">
                {isSignIn ? "Sign In" : "Create Account"}
              </h2>

              {/* sign up form */}
              <div className="w-full max-w-sm my-2 ">
                {!isSignIn && (
                  <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="mb-6  relative">
                      <div className="w-[80px] h-[80px] mx-auto rounded-full overflow-hidden group">
                        <Image
                          height={676}
                          width={1200}
                          src={
                            selectedImage ||
                            "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                          }
                          className="w-[80px] h-[80px] scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
                          alt="logo"
                        />
                        <div
                          onChange={handleImageChange}
                          className="absolute w-[80px] h-[80px] mx-auto rounded-full inset-0 bg-black bg-opacity-50 group-hover:opacity-100 flex items-center justify-center opacity-0  transition-opacity duration-300"
                        >
                          <label
                            htmlFor="profilePicInput"
                            className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-bg-blue hover:bg-[#14a1d9] transition-colors duration-300"
                          >
                            Upload
                          </label>
                          <input
                            type="file"
                            placeholder="Your Image"
                            onChange={async (e) => {
                              console.log(
                                "onchange er moddhe image file",
                                e.target.files?.[0]
                              );
                              await setImages(e.target.files?.[0]);
                            }}
                            id="profilePicInput"
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                    {/* First  Name */}

                    <div className="w-full">
                      <label className="block text-[15px] font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                      />
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
                        className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
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
                        className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                      />
                      <span
                        onClick={() => {
                          setViewPass(!viewPass);
                        }}
                        className={`${
                          !viewPass
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
                      {loading ? (
                        <p className="flex flex-col justify-center items-center">
                          <TbFidgetSpinner
                            size={22}
                            className="text-white animate-spin "
                          ></TbFidgetSpinner>
                        </p>
                      ) : (
                        "Sign up"
                      )}
                    </button>
                  </form>
                )}
              </div>
              {/* Sign in form */}
              <form
                onSubmit={handleSignsubmit}
                className="w-full  max-w-sm space-y-4"
              >
                {isSignIn && (
                  <div className="space-y-3">
                    <div>
                      <input
                        type="email"
                        name="email"
                        // value={SignINformData.email}
                        // onChange={handleSignChange}
                        placeholder="Email address"
                        className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div className="relative">
                      <input
                        type={`${!viewPass ? "password" : "text"}`}
                        name="password"
                        // value={SignINformData.password}
                        // onChange={handleSignChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <span
                        onClick={() => {
                          setViewPass(!viewPass);
                        }}
                        className={`${
                          !viewPass
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
                      {loading ? (
                        <p className="flex flex-col justify-center items-center">
                          <TbFidgetSpinner
                            size={22}
                            className="text-white animate-spin "
                          ></TbFidgetSpinner>
                        </p>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                )}
              </form>
              {/* Social Login */}

              <SocialSignIn></SocialSignIn>

              {/* Mobile Toggle */}
              <div className="md:hidden mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignIn
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={handleToggle}
                    className="text-emerald-500 font-semibold"
                  >
                    {isSignIn ? "Create Account" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* smal device er jonno  */}

      {/* Form Section */}
      <div className="bg-[#f3f4f6] pt-[50px] ">
        <div
          className={`md:hidden bg-white w-[90%] mx-auto py-[30px] rounded-md `}
        >
          <div className="h-full flex flex-col items-center justify-center px-2 md:px-12">
            {/* logo section  */}
            <Link href="/">
              <Image
                height={676}
                width={1200}
                src="https://i.postimg.cc/RVP3mcZM/Logo-R1-T-modify.png"
                className="w-[220px] h-[110px] scale-100 text-white transition-all duration-200 hover:scale-110"
                alt="logo"
              />
            </Link>

            <h2 className="text-2xl border-b border-cyan-300 py-1 font-bold text-gray-700 ">
              {isSignIn ? "Sign In" : "Create Account"}
            </h2>

            {/* sign up form */}
            <div className="w-full max-w-sm my-2 ">
              {!isSignIn && (
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="mb-6  relative">
                    <div className="w-[80px] h-[80px] mx-auto rounded-full overflow-hidden group">
                      <Image
                        height={676}
                        width={1200}
                        src={
                          selectedImage ||
                          "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                        }
                        className="w-[80px] h-[80px] scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
                        alt="logo"
                      />
                      <div
                        onChange={handleImageChange}
                        className="absolute w-[80px] h-[80px] mx-auto rounded-full inset-0 bg-black bg-opacity-50 group-hover:opacity-100 flex items-center justify-center opacity-0  transition-opacity duration-300"
                      >
                        <label
                          htmlFor="profilePicInput"
                          className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-bg-blue hover:bg-[#14a1d9] transition-colors duration-300"
                        >
                          Upload
                        </label>
                        <input
                          type="file"
                          placeholder="Your Image"
                          onChange={async (e) => {
                            console.log(
                              "onchange er moddhe image file",
                              e.target.files?.[0]
                            );
                            await setImages(e.target.files?.[0]);
                          }}
                          id="profilePicInput"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                  {/* First Name */}
                  <div className="w-full">
                    <label className="block text-[15px] font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                    />
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
                      className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
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
                      className="border bg-gray-100 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
                    />
                    <span
                      onClick={() => {
                        setViewPass(!viewPass);
                      }}
                      className={`${
                        !viewPass
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
                    {loading ? (
                      <p className="flex flex-col justify-center items-center">
                        <TbFidgetSpinner
                          size={22}
                          className="text-white animate-spin "
                        ></TbFidgetSpinner>
                      </p>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>
              )}
            </div>
            {/* Sign in form */}
            <form
              onSubmit={handleSignsubmit}
              className="w-full  max-w-sm space-y-4"
            >
              {isSignIn && (
                <div className="space-y-3">
                  <div>
                    <input
                      type="email"
                      name="email"
                      // value={SignINformData.email}
                      // onChange={handleSignChange}
                      placeholder="Email address"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={`${!viewPass ? "password" : "text"}`}
                      name="password"
                      // value={SignINformData.password}
                      // onChange={handleSignChange}
                      placeholder="Password"
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <span
                      onClick={() => {
                        setViewPass(!viewPass);
                      }}
                      className={`${
                        !viewPass
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
                    {loading ? (
                      <p className="flex flex-col justify-center items-center">
                        <TbFidgetSpinner
                          size={22}
                          className="text-white animate-spin "
                        ></TbFidgetSpinner>
                      </p>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              )}
            </form>
            {/* Social Login */}

            <SocialSignIn></SocialSignIn>

            {/* Mobile Toggle */}
            <div className="md:hidden mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignIn
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={handleToggle}
                  className="text-emerald-500 font-semibold"
                >
                  {isSignIn ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//   {/* small device componennt  */}
//   <div
//   className="min-h-screen flex items-center justify-center bg-gray-100 p-4"      >

//   {/* Form Section */}
//   <div
//       className={`w-full h-full transition-transform duration-700 ease-in-out`}
//     >
//       <div className="h-full flex flex-col items-center justify-center px-2 md:px-12">
//         <h2 className="text-2xl border-b border-cyan-300 py-1 font-bold text-gray-700 ">
//           {isSignIn ? 'Sign In' : 'Create Account'}
//         </h2>

//         {/* sign up form */}
//         <div className="w-full max-w-sm my-2 ">
//           {!isSignIn && (
//             <form onSubmit={handleSubmit} className="space-y-2">

//               {/* First and Last Name */}
//               <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2">

//                 <div className="w-full">
//                   <label className="block text-[15px] font-medium mb-1">
//                     First name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     placeholder="First name"
//                     required
//                     className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                   />
//                 </div>
//                 <div className="w-full">
//                   <label className="block text-[15px] font-medium mb-1">
//                     Last name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     placeholder="Last name"
//                     required
//                     className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-[15px] font-medium mb-1">
//                   Email address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email address"
//                   required
//                   className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                 />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <label className="block text-[15px] font-medium mb-1">
//                   Password
//                 </label>
//                 <input
//                   type={`${!viewPass ? "password" : "text"}`}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   required
//                   className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-100"
//                 />
//                 <span
//                   onClick={() => {
//                     setViewPass(!viewPass);
//                   }}
//                   className={`${!viewPass
//                     ? "absolute right-4 top-9"
//                     : "absolute right-4 top-9 text-gray-400"
//                     }`}
//                 >
//                   <HiOutlineEye className="text-xl" />
//                 </span>
//               </div>

//               {/* Sign up Button */}
//               <button
//                 type="submit"
//                 className="bg-bg-blue mt-4 text-white text-lg rounded-md py-1 w-full font-bold hover:bg-[#1bb8db]"
//               >
//                 {
//                   loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Sign up"
//                 }

//               </button>

//             </form>

//           )}

//         </div>
//         {/* Sign in form */}
//         <form onSubmit={handleSignsubmit} className="w-full  max-w-sm space-y-4">
//           {isSignIn && (
//             <div className='space-y-3' >

//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={SignINformData.email}
//                   onChange={handleSignChange}
//                   placeholder="Email address"

//                   className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <input
//                   type={`${!viewPass ? "password" : "text"}`}
//                   name="password"
//                   value={SignINformData.password}
//                   onChange={handleSignChange}
//                   placeholder="Password"
//                   className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                   required
//                 />
//                 <span
//                   onClick={() => {
//                     setViewPass(!viewPass);
//                   }}
//                   className={`${!viewPass
//                     ? "absolute right-4 top-3"
//                     : "absolute right-4 top-3 text-gray-400"
//                     }`}
//                 >
//                   <HiOutlineEye className="text-2xl" />
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 className="bg-bg-blue text-white rounded-md p-2 w-full font-bold hover:bg-[#1babdb]"
//               >
//                 {
//                   loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Login"
//                 }

//               </button>

//             </div>
//           )}

//         </form>
//         {/* Social Login */}

//         <SocialSignIn></SocialSignIn>

//         {/* Mobile Toggle */}
//         <div className="md:hidden mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             {isSignIn ? "Don't have an account? " : 'Already have an account? '}
//             <button
//               onClick={handleToggle}
//               className="text-emerald-500 font-semibold"
//             >
//               {isSignIn ? 'Create Account' : 'Sign In'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
// </div>
