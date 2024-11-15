'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import PasswordUpdate from '../PasswordUpdate';
function ProfileUpdate() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', 
    day: '',
    month: '',
    year: '',
    phoneNumber: '',
    gender: ''
  });
  const [profilePic, setProfilePic] = useState('https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data or handle it as needed
    console.log('Form data submitted:', formData);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Updated successfully"
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Tabs   >
    <TabList>
      <Tab><h2 className="text-xl font-bold">Personal Information</h2></Tab>
      <Tab><h2 className="text-xl font-bold">Password </h2></Tab>
    </TabList>

    <TabPanel>
    <div className="  p-6 w-full max-w-2xl mx-auto">
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6  relative">
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
          <Image height={676} width={1200}
                        src= "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                        className="w-36 h-36 scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
                        alt="logo"
                    />
            <div className="absolute w-36 h-36 mx-auto rounded-full inset-0 bg-black bg-opacity-50 group-hover:opacity-100 flex items-center justify-center opacity-0  transition-opacity duration-300">
              <label htmlFor="profilePicInput" className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-bg-blue hover:bg-[#14a1d9] transition-colors duration-300">
                Edit
              </label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px] "
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-medium mb-1">Date of Birth</label>
          <div className="flex space-x-2">
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
            >
              <option value="">Day</option>
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
            >
              <option value="">Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                (month, index) => (
                  <option key={index + 1} value={index + 1}>
                    {month}
                  </option>
                )
              )}
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
            >
              <option value="">Year</option>
              {[...Array(50).keys()].map((year) => (
                <option key={year} value={2024 - year}>
                  {2024 - year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="phoneNumber" className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+88 01700001111"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:bg-gray-600 focus:text-cyan-300 focus:shadow-[rgba(0,255,255,0.5)_-3px_-3px_15px]"
          />
        </div>
        <div className="mt-4">
          <label className="block font-medium mb-1">Gender</label>
          <div className="flex items-center space-x-4">
            {['Male', 'Female', 'Others'].map((gender) => (
              <label key={gender} className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
        </div>
      <div  className='flex  justify-end'>
      <button
         
          type="submit"
          disabled={!formData.firstName && !formData.lastName && !formData.phoneNumber}
          className={`${
            !formData.firstName && !formData.lastName && !formData.phoneNumber
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-bg-blue hover:bg-[#4ed9c4]'
          } text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}
        
        >
          Update
        </button>
      </div>
      </form>
    </div>
    </TabPanel>
    <TabPanel>
      <div  className='flex justify-center'>
        <PasswordUpdate></PasswordUpdate>
      </div>
    </TabPanel>
  </Tabs>
   
  );
}

export default ProfileUpdate;