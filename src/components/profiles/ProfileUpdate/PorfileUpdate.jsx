"use client";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Loading from "@/components/shared/Loading";
import { uploadCloudinary } from "@/hooks/upload";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import PasswordUpdate from "../PasswordUpdate";
function ProfileUpdate() {
  const { data, isLoading, refetch, isPending } = useAuth();
  const [images, setImages] = useState({});
  const [links, setLinks] = useState("");
  const [showName, setShowName] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const axiosPublic = useAxiosPublic();

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
        console.log(error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target?.name?.value || data?.name;
    const day = e.target.day?.value || data?.day;
    const month = e.target.month?.value || data?.month;
    const year = e.target.year?.value || data?.year;
    const phoneNumber = e.target.phoneNumber?.value || data?.phoneNumber;
    const gender = e.target.gender?.value || data?.gender;

    const imageUrl = await imageUploadFunc();
    const newObj = {
      name,
      day,
      month,
      year,
      phoneNumber,
      gender,
      photo: imageUrl || data?.photo,
    };
    console.log("Form data submitted:", newObj);
    const email = session?.data?.user?.email;

    // Check if no fields were modified
    const isNameUnchanged = name === data?.name;
    const isDayUnchanged = day === data?.day;
    const isMonthUnchanged = month === data?.month;
    const isYearUnchanged = year === data?.year;
    const isPhoneNumberUnchanged = phoneNumber === data?.phoneNumber;
    const isGenderUnchanged = gender === data?.gender;
    const isImageUnchanged = !imageUrl && !images?.name; // No new image uploaded

    if (
      isNameUnchanged &&
      isDayUnchanged &&
      isMonthUnchanged &&
      isYearUnchanged &&
      isPhoneNumberUnchanged &&
      isGenderUnchanged &&
      isImageUnchanged
    ) {
      setLoading(false);
      return toast.error("Please modify at least one field 😢");
    }

    const result = await axiosPublic.patch(`/updateUserInfo/${email}`, newObj);
    console.log(result);

    if (result?.data?.modifiedCount) {
      toast.success("Updated successfully 👌");
      setLoading(false);
      refetch();
      e.target.reset();
    } else {
      toast.error("Something went wrong😢");
    }
  };

  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <Tabs>
      <TabList>
        <Tab>
          <h2 className="text-base font-semibold">Personal Information</h2>
        </Tab>
        <Tab>
          <h2 className="text-base font-semibold">Password </h2>
        </Tab>
      </TabList>

      <TabPanel>
        <div className="  p-6 w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6  relative">
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
                <Image
                  height={676}
                  width={1200}
                  src={
                    selectedImage ||
                    data?.photo ||
                    "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
                  }
                  // src={data?.photo || 'https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'}
                  className="w-36 h-36 scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
                  alt="logo"
                />
                <div
                  onChange={handleImageChange}
                  className="absolute w-36 h-36 mx-auto rounded-full inset-0 bg-black bg-opacity-50 group-hover:opacity-100 flex items-center justify-center opacity-0  transition-opacity duration-300"
                >
                  <label
                    htmlFor="profilePicInput"
                    className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-bg-blue hover:bg-[#14a1d9] transition-colors duration-300"
                  >
                    Edit
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
            <div>
              <label htmlFor="firstName" className="block font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={data?.name}
                className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2  "
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Date of Birth</label>
              <div className="flex space-x-2">
                <select
                  name="day"
                  defaultValue={data?.day}
                  className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2  "
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
                  defaultValue={data?.month}
                  className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2  "
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index + 1} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  defaultValue={data?.year}
                  className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2  "
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
              <label htmlFor="phoneNumber" className="block font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+88 01700001111"
                defaultValue={data?.phoneNumber}
                className="border-2 rounded-md px-3 py-2 w-full transition-all duration-300 focus:outline-none focus:ring-2  "
              />
            </div>
            <div className="mt-4">
              <label className="block font-medium mb-1">Gender</label>
              <div className="flex items-center space-x-4">
                {["Male", "Female", "Others"].map((gender) => (
                  <label key={gender} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={data?.gender}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex  justify-end">
              <button
                type="submit"
                className={`bg-bg-blue hover:bg-[#4ed9c4]
                   text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}
              >
                {loading ? (
                  <p className="flex flex-col justify-center items-center">
                    <TbFidgetSpinner
                      size={22}
                      className="text-white animate-spin "
                    ></TbFidgetSpinner>
                  </p>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </TabPanel>
      <TabPanel>
        <div className="flex justify-center">
          <PasswordUpdate></PasswordUpdate>
        </div>
      </TabPanel>
    </Tabs>
  );
}

export default ProfileUpdate;
