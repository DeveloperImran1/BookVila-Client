"use client";

import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddAuthor = () => {
  const axiosPublic = useAxiosPublic();

  const [images, setImages] = useState({});
  const [links, setLinks] = useState("");
  const [showName, setShowName] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        const data = await uploadCloudinary(images);
        setLinks(data?.url);
        return data?.url;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [formData, setFormData] = useState({
    authorNameEnglish: "",
    authorNameBangla: "",
    authorAbout: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["totalAuthors"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAuthorLength");
      return response?.data;
    },
  });

  // unique id generate
  const generateUniqueId = () => `id-${Date.now()}`;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    // Create a new FormData instance from the form element
    const formData = new FormData(e.target);
    // Initialize an empty object to hold the form data
    const formDataObject = {};

    // Iterate over the FormData entries
    formData.forEach((value, key) => {
      if (formDataObject[key]) {
        // Handle multiple values for the same key
        formDataObject[key] = Array.isArray(formDataObject[key])
          ? [...formDataObject[key], value]
          : [formDataObject[key], value];
      } else {
        formDataObject[key] = value; // Assign value to the key
      }
    });

    const imageUrl = await imageUploadFunc();
    const uniqueId = generateUniqueId();
    const authorData = {
      name: [
        formDataObject?.authorNameEnglish,
        formDataObject?.authorNameBangla,
      ],
      authorID: uniqueId,
      about: formDataObject?.authorAbout,
      photo: imageUrl,
    };
    console.log(authorData);
    try {
      const res = await axiosPublic.post("/addNewAuthor", authorData);
      console.log(res);
      if (res?.status) {
        setLoading(false);
        toast.success("Successfully added 😍");
        e.target.reset;
      } else {
        setLoading(false);
        toast.error("Something went wrong 😢");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong 😢");
    }
  };

  return (
    <div className="bg-white p-4 ">
      <p className="text-[17px] font-semibold mb-6">Add New Author</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* book image upload  */}

        <div className="mb-6  relative">
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
            <Image
              height={676}
              width={1200}
              src={
                selectedImage ||
                data?.photo ||
                "https://i.postimg.cc/xj7YmS74/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail-1.png"
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

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Author Name (English)`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`authorNameEnglish`}
            value={formData[`authorNameEnglish`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author Name English`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Author Name (Bangla)`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`authorNameBangla`}
            value={formData[`authorNameBangla`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author Name Bangla`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Author About`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`authorAbout`}
            value={formData[`authorAbout`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author About`}
          />
        </div>

        <div className="flex  justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`bg-bg-blue hover:bg-[#4ed9c4]
                          text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 ${
                            loading && "cursor-not-allowed"
                          }`}
          >
            {loading ? (
              <p className="flex flex-col justify-center items-center">
                <TbFidgetSpinner
                  size={22}
                  className="text-white animate-spin "
                ></TbFidgetSpinner>
              </p>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
