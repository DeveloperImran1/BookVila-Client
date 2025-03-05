// "use client";

// import { uploadCloudinary } from "@/hooks/upload";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";

// const AddBanner = () => {
//   const [imagesSmall, setImagesSmall] = useState({});
//   const [imagesLarge, setImagesLarge] = useState({});
//   const [selectedImageSmall, setSelectedImageSmall] = useState(null);
//   const [selectedImageLarge, setSelectedImageLarge] = useState(null);

//   const handleImageChangeSmall = async (e) => {
//     const fileSmallImage = e.target.files[0]; // Get the selected file
//     if (fileSmallImage) {
//       // Create a URL for the selected file to display as an image
//       const imageUrl = URL.createObjectURL(fileSmallImage);
//       setSelectedImageSmall(imageUrl);
//     }
//     await imageUploadFuncSmall();
//   };

//   const handleImageChangeLarge = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImageLarge(imageUrl);
//       setImagesLarge(file); // Set the file
//     }
//   };

//   useEffect(() => {
//     if (imagesLarge?.name) {
//       imageUploadFuncLarge();
//     }
//   }, [imagesLarge]);

//   const imageUploadFuncSmall = async () => {
//     // image upload in cloudinary
//     if (imagesSmall?.name) {
//       try {
//         const data = await uploadCloudinary(imagesSmall);
//         return data?.url;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };
//   const imageUploadFuncLarge = async () => {
//     // image upload in cloudinary
//     if (imagesLarge?.name) {
//       try {
//         const data = await uploadCloudinary(imagesLarge);
//         return data?.url;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const axiosPublic = useAxiosPublic();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     setLoading(true);
//     const imageSmall = await imageUploadFuncSmall();
//     const imageLarge = await imageUploadFuncLarge();
//     if (!imageSmall || !imageLarge) {
//       toast.error("Small and Large Image is Required!");
//       return;
//     }
//     console.log("image", [imageSmall, imageLarge]);
//     try {
//       const res = await axiosPublic.post("/addNewBanner", {
//         images: [imageSmall, imageLarge],
//       });
//       console.log(res);
//       if (res?.status) {
//         setLoading(false);
//         toast.success("Successfully added 😍");
//         e.target.reset;
//       } else {
//         setLoading(false);
//         toast.error("Something went wrong 😢");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Something went wrong 😢");
//     }
//   };

//   return (
//     <div className="bg-white p-4 ">
//       <p className="text-[17px] font-semibold mb-6">Add New Banner Image</p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="mb-6  relative">
//           <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
//             <Image
//               height={676}
//               width={1200}
//               src={
//                 selectedImageSmall ||
//                 "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
//               }
//               // src={data?.photo || 'https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'}
//               className="w-36 h-36 scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
//               alt="Banner image"
//             />
//             <div
//               onChange={handleImageChangeSmall}
//               className="absolute w-36 h-36 mx-auto rounded-full inset-0   flex items-center justify-center  duration-300"
//             >
//               <label
//                 htmlFor="profilePicInput"
//                 className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-[#14a1d9] duration-300"
//               >
//                 Add Banner
//               </label>
//               <input
//                 type="file"
//                 placeholder="Your Image"
//                 onChange={async (e) => {
//                   console.log(
//                     "onchange er moddhe image file",
//                     e.target.files?.[0]
//                   );
//                   await setImagesSmall(e.target.files?.[0]);
//                 }}
//                 id="profilePicInput"
//                 accept="image/*"
//                 className="hidden"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mb-6  relative">
//           <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
//             <Image
//               height={676}
//               width={1200}
//               src={
//                 selectedImageLarge ||
//                 "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
//               }
//               // src={data?.photo || 'https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'}
//               className="w-36 h-36 scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue "
//               alt="Banner image"
//             />
//             <div
//               onChange={handleImageChangeLarge}
//               className="absolute w-36 h-36 mx-auto rounded-full inset-0   flex items-center justify-center  duration-300"
//             >
//               <label
//                 htmlFor="profilePicInput"
//                 className="cursor-pointer px-3 py-1 rounded-full text-sm font-medium text-yellow-50 bg-[#14a1d9] duration-300"
//               >
//                 Add Banner
//               </label>
//               <input
//                 type="file"
//                 placeholder="Your Image"
//                 onChange={async (e) => {
//                   console.log(
//                     "onchange er moddhe large image file",
//                     e.target.files?.[0]
//                   );
//                   await setImagesLarge(e.target.files?.[0]);
//                 }}
//                 id="profilePicInput"
//                 accept="image/*"
//                 className="hidden"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex  justify-end">
//           <button
//             disabled={loading}
//             type="submit"
//             className={`bg-bg-blue hover:bg-[#4ed9c4]
//                           text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 ${
//                             loading && "cursor-not-allowed"
//                           }`}
//           >
//             {loading ? (
//               <p className="flex flex-col justify-center items-center">
//                 <TbFidgetSpinner
//                   size={22}
//                   className="text-white animate-spin "
//                 ></TbFidgetSpinner>
//               </p>
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBanner;

"use client";

import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddBanner = () => {
  const [imageSmall, setImageSmall] = useState(null);
  const [imageLarge, setImageLarge] = useState(null);
  const [previewSmall, setPreviewSmall] = useState(null);
  const [previewLarge, setPreviewLarge] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image) => {
    try {
      if (image) {
        const data = await uploadCloudinary(image);
        return data?.url;
      }
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageSmallUrl = await uploadImage(imageSmall);
    const imageLargeUrl = await uploadImage(imageLarge);
    console.log("imageSmallUrl, imageLargeUrl", imageSmallUrl, imageLargeUrl);
    if (!imageSmallUrl || !imageLargeUrl) {
      toast.error("Both small and large images are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosPublic.post("/addNewBanner", {
        images: [imageSmallUrl, imageLargeUrl],
      });
      if (res?.status) {
        toast.success("Successfully added 😍");
        e.target.reset();
        setPreviewSmall(null);
        setPreviewLarge(null);
        setImageSmall(null);
        setImageLarge(null);
      } else {
        toast.error("Something went wrong 😢");
      }
    } catch (error) {
      toast.error("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4">
      <p className="text-[17px] font-semibold mb-6">Add New Banner Image</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          {
            label: "Small Banner",
            setImage: setImageSmall,
            setPreview: setPreviewSmall,
            preview: previewSmall,
          },
          {
            label: "Large Banner",
            setImage: setImageLarge,
            setPreview: setPreviewLarge,
            preview: previewLarge,
          },
        ].map(({ label, setImage, setPreview, preview }, index) => (
          <div key={index} className="mb-6 relative">
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden group">
              <Image
                height={676}
                width={1200}
                src={
                  preview ||
                  "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
                }
                className="w-36 h-36 transition-all duration-200 hover:scale-110 rounded-full border-4 border-bg-blue"
                alt={label}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <label className="cursor-pointer px-3 py-1 rounded-full text-sm text-yellow-50 bg-[#14a1d9]">
                  {label}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setImage, setPreview)}
                  />
                </label>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-bg-blue text-white py-2 px-4 rounded-md transition-all duration-300 hover:scale-105 ${
              loading ? "cursor-not-allowed" : "hover:bg-[#4ed9c4]"
            }`}
          >
            {loading ? (
              <TbFidgetSpinner size={22} className="animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;

// "use client";

// import { uploadCloudinary } from "@/hooks/upload";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import Image from "next/image";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";

// const AddBanner = () => {
//   const [images, setImages] = useState([]);
//   const [links, setLinks] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);

//   const axiosPublic = useAxiosPublic();
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);
//     const imageUrls = files.map((file) => URL.createObjectURL(file));
//     setSelectedImages(imageUrls);
//   };

//   const imageUploadFunc = async () => {
//     const uploadedLinks = [];
//     for (const image of images) {
//       try {
//         const data = await uploadCloudinary(image);
//         uploadedLinks.push(data?.url);
//       } catch (error) {
//         console.error(error);
//         toast.error("Image upload failed 😢");
//       }
//     }
//     setLinks(uploadedLinks);
//     return uploadedLinks;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const uploadedImages = await imageUploadFunc();
//     if (!uploadedImages.length) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const res = await axiosPublic.post("/addNewBanner", {
//         images: uploadedImages,
//       });
//       if (res?.status === 200) {
//         setLoading(false);
//         toast.success("Successfully added 😍");
//         e.target.reset();
//         setSelectedImages([]);
//         setImages([]);
//       } else {
//         setLoading(false);
//         toast.error("Something went wrong 😢");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error("Something went wrong 😢");
//     }
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       <p className="text-[17px] font-semibold mb-6">Add New Banner Images</p>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <p className="text-sm my-6">
//           1st Image for Small Device and 2nd Image for Large Device
//         </p>
//         <div className="mb-6 relative">
//           <div className="grid grid-cols-3 items-center gap-4">
//             {selectedImages.length > 0 ? (
//               selectedImages.map((image, index) => (
//                 <div
//                   key={index}
//                   className="relative w-36 h-36 rounded-lg overflow-hidden border-4 border-bg-blue"
//                 >
//                   <Image
//                     height={676}
//                     width={1200}
//                     src={image}
//                     className="w-full h-full object-cover scale-100 transition-all duration-200 hover:scale-110"
//                     alt={`Banner image ${index + 1}`}
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-bg-blue">
//                 <Image
//                   height={676}
//                   width={1200}
//                   src="https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
//                   className="w-full h-full object-cover scale-100 transition-all duration-200 hover:scale-110"
//                   alt="Default image"
//                 />
//               </div>
//             )}
//             <label
//               htmlFor="profilePicInput"
//               className="cursor-pointer my-auto px-3 py-1 rounded-full text-sm font-medium text-white h-[30px] w-[100px] bg-bg-blue hover:bg-[#14a1d9] transition-colors duration-300 text-center"
//             >
//               Upload
//             </label>
//             <input
//               type="file"
//               id="profilePicInput"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//               multiple
//             />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             disabled={loading}
//             type="submit"
//             className={`bg-bg-blue hover:bg-[#4ed9c4] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 ${
//               loading ? "cursor-not-allowed opacity-50" : ""
//             }`}
//           >
//             {loading ? (
//               <TbFidgetSpinner size={22} className="animate-spin" />
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBanner;
