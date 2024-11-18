'use client'

import React, { useState } from 'react'
import { Facebook, Google } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';


export default function SignInAndUp() {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleToggle = () => {
    setIsSignIn(!isSignIn)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    
    if (isSignIn) {
      // Login logic
      console.log('Login:', data)
    } else {
      // Register logic
      console.log('Register:', data)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Social Login: ${provider}`)
    // Implement social login logic
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-5xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Sliding Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-emerald-500 text-white transition-transform duration-700 ease-in-out ${
            isSignIn ? 'translate-x-0' : '-translate-x-full'
          } hidden md:flex md:flex-col md:items-center md:justify-center`}
        >
          <div className="px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">
              {isSignIn ? 'Welcome Back!' : 'Join Our Community'}
            </h1>
            <p className="text-sm mb-8">
              {isSignIn
                ? 'Sign in to access your account and explore our features.'
                : 'Create an account to get started with your journey.'}
            </p>
            <button
              onClick={handleToggle}
              className="px-6 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-emerald-500 transition-colors duration-300"
            >
              {isSignIn ? 'Create Account' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div
          className={`w-full md:w-1/2 h-full transition-transform duration-700 ease-in-out ${
            isSignIn ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col items-center justify-center px-6 md:px-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-8">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </h2>
     {/* sign up form */}
            <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
              {!isSignIn && (
                <div>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                
              )}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
              {!isSignIn && (
                <div>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}
              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            {/* Social Login */}
            <div className="w-full max-w-sm mt-4">
              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-300 w-full"></div>
                <span className="px-4 text-gray-500">or</span>
                <div className="h-px bg-gray-300 w-full"></div>
              </div>
              <div className="mt-4 space-y-3">
                <button 
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >

                  <FcGoogle className="mr-2" />
                  {isSignIn ? 'Sign in' : 'Sign up'} with Google
                </button>
                <button 
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FaFacebook className="mr-2" />
                  {isSignIn ? 'Sign in' : 'Sign up'} with Facebook
                </button>
              </div>
            </div>

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