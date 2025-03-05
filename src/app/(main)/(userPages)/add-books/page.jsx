"use client";

import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddBookForm = () => {
  const axiosPublic = useAxiosPublic();

  const [images, setImages] = useState({});
  const [links, setLinks] = useState("");
  const [showName, setShowName] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState({
    Bangla: [],
    English: [],
    Banglish: [],
  });

  const [subCategories, setSubCategories] = useState({
    Bangla: [],
    English: [],
    Banglish: [],
  });

  const [subjectsBangla, setSubjectBangla] = useState([]);
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

  // extra attribute handle
  const [isFeatured, setIsFeatured] = useState(false);
  const [isFlashSale, setIsFlashSale] = useState(false);
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [isBestSelling, setIsBestSelling] = useState(false);
  const [isComboOffer, setIsComboOffer] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isGift, setIsGift] = useState(false);

  const featuredBookChange = (e) => {
    setIsFeatured(e.target.checked);
  };

  const flashSaleChange = (e) => {
    setIsFlashSale(e.target.checked);
  };
  const preOrderChange = (e) => {
    setIsPreOrder(e.target.checked);
  };
  const bestSellingChange = (e) => {
    setIsBestSelling(e.target.checked);
  };
  const comboOfferChange = (e) => {
    setIsComboOffer(e.target.checked);
  };
  const trendingChange = (e) => {
    setIsTrending(e.target.checked);
  };
  const giftChange = (e) => {
    setIsGift(e.target.checked);
  };

  const [formData, setFormData] = useState({
    // Book Name Fields
    bookNameBangla: "",
    bookNameBanglish: "",
    bookNameEnglish: "",
    // Publisher Fields
    publisherBangla: "",
    publisherBanglish: "",
    // Category Fields
    categoryBangla: "",
    categoryEnglish: "",
    categoryBanglish: "",
    // Subcategory Fields
    subCategoryBangla: "",
    subCategoryEnglish: "",
    subCategoryBanglish: "",
    // Subject Field
    subjectBangla: "",
    // Numeric Fields
    price: "",
    discount: "",
    stock: "",
    pages: "",
    // Language Field
    language: "",
    // Text Fields
    editionenglish: "",
    // publicationdate: "",
    publicationID: "",
    authorID: "",
    authorNameBangla: "",
    authorNameEnglish: "",
    hardCoverPrice: "",
    ebookPrice: "",
    ebookFileLink: "",
    formatbangla: "",
    bindingbangla: "",
    countrybangla: "",
    description: "",
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
    queryKey: ["totalBooks"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getBooksLength");
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
    console.log("subject is ", formDataObject?.subjectBangla);

    const uniqueId = generateUniqueId();
    const bookData = {
      bookName: [
        formDataObject?.bookNameBangla,
        formDataObject?.bookNameBanglish,
        formDataObject?.bookNameEnglish,
      ],
      publisher: [
        formDataObject?.publisherBangla,
        formDataObject?.publisherBanglish,
      ],
      category: [
        formDataObject?.categoryBangla,
        formDataObject?.categoryEnglish,
        formDataObject?.categoryBanglish,
      ],
      subCategory: [
        formDataObject?.subCategoryBangla,
        formDataObject?.subCategoryBanglish,
        formDataObject?.subCategoryEnglish,
      ],
      subject: formDataObject?.subjectBangla,
      price: parseInt(formDataObject?.price),
      discount: parseInt(formDataObject?.discount),
      stock: parseInt(formDataObject?.stock),
      language: formDataObject?.language,
      bookID: uniqueId,
      edition: formDataObject?.editionenglish,
      // publicationDate: formDataObject?.publicationdate,
      pages: parseInt(formDataObject?.pages),
      format: formDataObject?.formatbangla,
      binding: formDataObject?.bindingbangla,
      country: formDataObject?.countrybangla,
      coverImage: imageUrl,
      description: formDataObject?.description,
      authorInfo: {
        authorID: formDataObject?.authorID.trim(),
        name: [
          formDataObject?.authorNameBangla,
          formDataObject?.authorNameEnglish,
        ],
      },
      buyingOptions: [
        {
          type: "হার্ডকভার",
          price: parseInt(formDataObject?.price),
        },
        {
          type: "ইবুক",
          price: parseInt(formDataObject?.ebookPrice),
          fileLink: formDataObject?.ebookFileLink,
        },
      ],
      publicationID: formDataObject?.publicationID.trim(),
      isFeatured,
      isFlashSale,
      isPreOrder,
      isBestSelling,
      isComboOffer,
      isTrending,
      isGift,
    };

    try {
      const res = await axiosPublic.post("/addNewBook", bookData);
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

  // category data get
  const { data: allCategories = [] } = useQuery({
    queryKey: ["manageCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllCategories");

      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (allCategories.length > 0) {
      const newCategories = {
        Bangla: [],
        English: [],
        Banglish: [],
      };

      allCategories.forEach((category) => {
        newCategories.Bangla.push(category.bengali);
        newCategories.English.push(category.english);
        newCategories.Banglish.push(category.banglish);
      });

      setCategories(newCategories); // ✅ This will trigger re-render
    }
  }, [allCategories]);

  // sub category data get
  const { data: allSubCategories = [] } = useQuery({
    queryKey: ["manageSubCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubCategories");
      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (allSubCategories.length > 0) {
      const newSubCategories = {
        Bangla: [],
        English: [],
        Banglish: [],
      };

      allSubCategories.forEach((subCategory) => {
        newSubCategories.Bangla.push(subCategory.bengali);
        newSubCategories.English.push(subCategory.english);
        newSubCategories.Banglish.push(subCategory.banglish);
      });

      setSubCategories(newSubCategories); // ✅ This will trigger re-render
    }
  }, [allSubCategories]);

  // subject data get
  const { data: allSubjects = [] } = useQuery({
    queryKey: ["manageSubject"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubjects");
      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (allSubjects.length > 0) {
      const newSubjects = [];

      allSubjects.forEach((subject) => {
        newSubjects.push(subject.bengali);
      });

      setSubjectBangla(newSubjects); // ✅ This will trigger re-render
    }
  }, [allSubjects]);

  return (
    <div className="bg-white p-4 ">
      <p className="text-[17px] font-semibold mb-6">Add New Book</p>

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
                "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
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
                placeholder="Book Image"
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

        {/* Book Name Fields */}
        {["Bangla", "Banglish", "English"]?.map((lang) => (
          <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{`Book Name (${lang}) Required`}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={`bookName${lang}`}
              value={formData[`bookName${lang}`]}
              onChange={handleChange}
              type="text"
              placeholder={`Book Name in ${lang}`}
            />
          </div>
        ))}

        {/* Publisher Fields */}
        {["Bangla", "Banglish"]?.map((lang) => (
          <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{`Publication Name (${lang})`}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={`publisher${lang}`}
              value={formData[`publisher${lang}`]}
              onChange={handleChange}
              type="text"
              placeholder={`Publisher in ${lang}`}
            />
          </div>
        ))}

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Publication ID`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`publicationID`}
            value={formData[`publicationID`]}
            onChange={handleChange}
            type="text"
            placeholder={`Publisher ID`}
          />
        </div>

        {/* author info  */}
        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Author ID`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`authorID`}
            value={formData[`authorID`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author ID`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Author Name Bangla`}</label>
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
          <label className="block font-medium">{`Author Name English`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`authorNameEnglish`}
            value={formData[`authorNameEnglish`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author Name English`}
          />
        </div>

        {/* buing option  */}
        {/* <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`Hard Cover Price`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`hardCoverPrice`}
            value={formData[`hardCoverPrice`]}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder={`Hard Cover Price`}
          />
        </div> */}

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`E-book Price`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`ebookPrice`}
            value={formData[`ebookPrice`]}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder={`Ebook Price`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">{`E-book File link`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name={`ebookFileLink`}
            value={formData[`ebookFileLink`]}
            onChange={handleChange}
            type="text"
            placeholder={`Ebook File link`}
          />
        </div>

        {/* Category Fields */}
        {["Bangla", "English", "Banglish"]?.map((lang) => (
          <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{`Category (${lang})`}</label>
            <select
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={`category${lang}`}
              value={formData[`category${lang}`]}
              onChange={handleChange}
            >
              {categories[lang]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Subcategory Fields */}
        {["Bangla", "English", "Banglish"]?.map((lang) => (
          <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{`Subcategory (${lang})`}</label>
            <select
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={`subCategory${lang}`}
              value={formData[`subCategory${lang}`]}
              onChange={handleChange}
            >
              {subCategories[lang]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Subject Field */}
        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">Subject (Bangla)</label>
          <select
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name="subjectBangla"
            value={formData.subjectBangla}
            onChange={handleChange}
          >
            {subjectsBangla?.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Numeric Fields */}
        {["Price", "Discount", "Stock", "Pages"]?.map((field) => (
          <div key={field} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{field}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={field.toLowerCase()}
              value={formData[field.toLowerCase()]}
              onChange={handleChange}
              type="number"
              onWheel={(e) => e.target.blur()}
              placeholder={field}
            />
          </div>
        ))}

        {/* Language Field */}
        <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">Language</label>
          <select
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            {["English", "বাংলা", "অন্যান্য"]?.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Text Fields */}
        {[
          "Edition English",
          "Format Bangla",
          "Binding Bangla",
          "Country Bangla",
          "Description",
        ]?.map((field) => (
          <div key={field} className="space-y-2 text-sm text-zinc-700 ">
            <label className="block font-medium">{field}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
              name={field.replace(/ /g, "").toLowerCase()}
              value={formData[field.replace(/ /g, "").toLowerCase()]}
              onChange={handleChange}
              type={field === "Description" ? "textarea" : "text"}
              placeholder={field}
            />
          </div>
        ))}

        <div className="space-y-2 text-sm text-zinc-700 ">
          <Checkbox checked={isFeatured} onChange={featuredBookChange}>
            বাছাইকৃত বই
          </Checkbox>

          <Checkbox checked={isFlashSale} onChange={flashSaleChange}>
            ফ্ল্যাশ সেলস
          </Checkbox>
          <Checkbox checked={isPreOrder} onChange={preOrderChange}>
            প্রি-অর্ডার বই
          </Checkbox>
          <Checkbox checked={isBestSelling} onChange={bestSellingChange}>
            বেস্ট সেলার বই
          </Checkbox>
          <Checkbox checked={isComboOffer} onChange={comboOfferChange}>
            কম্বো অফার
          </Checkbox>
          <Checkbox checked={isTrending} onChange={trendingChange}>
            ট্রেন্ডিং বই
          </Checkbox>
          <Checkbox checked={isGift} onChange={giftChange}>
            গিফট বই
          </Checkbox>
        </div>

        {/* <div className="space-y-2 text-sm text-zinc-700 ">
          <label className="block font-medium">Publication Date</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
            name="publicationdate"
            value={formData.publicationdate}
            onChange={handleChange}
            type="text"
            placeholder="month-date-year"
          />
        </div> */}

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

export default AddBookForm;
