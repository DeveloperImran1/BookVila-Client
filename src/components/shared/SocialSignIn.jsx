"use client"; // Ensure this component is client-side only

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialSignIn = () => {
  const router = useRouter();
  const { status } = useSession(); // Get session status

  const successfullSignIn = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Welcome to Readora!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => router.push("/"));
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

  const handleSocialLogin = async (provider) => {
    await signIn(provider, {
      redirect: false,
      callbackUrl: "/", // Redirect URL on successful sign-in
    })
      .then((resp) => {
        if (resp?.error) {
          errorSignIn(); // Show error if sign-in fails
        } else {
          successfullSignIn(); // Show success modal and navigate
        }
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
        errorSignIn();
      });
  };

  return (
    <div className="text-center mt-4">
      {/* Sign up with Google, Facebook, Apple */}
      <p>Or, Sign up with</p>
      <div className="flex  items-center justify-center mt-2 gap-3 md:gap-6 w-full max-w-md mx-auto">
        {/* Google Sign Up Button */}
        <button
          onClick={() => handleSocialLogin("google")}
          className="border w-full md:w-auto border-gray-300 hover:bg-slate-200 rounded-md px-4 py-2 flex items-center justify-center transition-all duration-200"
        >
          <FcGoogle className="mr-2 w-5 h-5" /> Google
        </button>

        {/* Facebook Sign Up Button */}
        <button
          onClick={() => handleSocialLogin("facebook")}
          className="border w-full md:w-auto border-gray-300 hover:bg-slate-200 rounded-md px-4 py-2 flex items-center justify-center transition-all duration-200"
        >
          <FaFacebook className="mr-2 w-5 h-5 text-blue-600" /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SocialSignIn;
