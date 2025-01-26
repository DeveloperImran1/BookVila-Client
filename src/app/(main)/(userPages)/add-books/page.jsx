"use client";

import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const AddBookForm = () => {
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
    publicationdate: "",
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
      bookID: `001${data + 1}`,
      edition: formDataObject?.editionenglish,
      publicationDate: formDataObject?.publicationdate,
      pages: parseInt(formDataObject?.pages),
      format: formDataObject?.formatbangla,
      binding: formDataObject?.bindingbangla,
      country: formDataObject?.countrybangla,
      coverImage: imageUrl,
      description: formDataObject?.description,
      authorInfo: {
        authorID: formDataObject?.authorID,
        name: [
          formDataObject?.authorNameBangla,
          formDataObject?.authorNameEnglish,
        ],
      },
      buyingOptions: [
        {
          type: "হার্ডকভার",
          price: parseInt(formDataObject?.hardCoverPrice),
        },
        {
          type: "ইবুক",
          price: parseInt(formDataObject?.ebookPrice),
          fileLink: formDataObject?.ebookFileLink,
        },
      ],
      publicationID: formDataObject?.publicationID,
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

  const subCategories = {
    Bangla: [
      "মহাকালের কণ্ঠ",
      "গোয়েন্দা কাহিনী সমগ্র",
      "ভূতের গল্প",
      "নক্ষত্রের রাত",
      "জীবনের জলছবি",
      "বাংলা সাহিত্যের ইতিহাস",
      "ইতিহাসের অজানা অধ্যায়",
      "গণিতের আনন্দ",
      "পাখিদের নিয়ে গল্প",
      "ভূগোলের বিস্ময়",
      "শিশুতোষ গল্পসমগ্র",
      "রহস্যময় পৃথিবী",
      "প্রাণীর কাহিনী",
      "বিজ্ঞানের বিস্ময়",
      "বিশ্বের সেরা উপন্যাস",
      "রবীন্দ্রনাথের কবিতা",
      "প্রাচীন মিসরের ইতিহাস",
      "যুগান্তরের কবিতা",
      "অ্যালিস ইন ওয়ান্ডারল্যান্ড (বাংলা অনুবাদ)",
      "বাংলা প্রবাদ প্রবচন",
      "আধুনিক বাংলার কথা",
      "চর্যাপদ ও প্রাচীন সাহিত্য",
      "বাংলাদেশের মুক্তিযুদ্ধের গল্প",
    ],
    English: [
      "Voice of Eternity",
      "Detective Story Collection",
      "Ghost Stories",
      "Starry Night",
      "Life's Watercolor",
      "History of Bengali Literature",
      "Unknown Chapters of History",
      "Joy of Mathematics",
      "Stories about Birds",
      "Wonders of Geography",
      "Children's Story Collection",
      "Mysterious Earth",
      "Stories of Animals",
      "Wonders of Science",
      "World's Best Novels",
      "Rabindranath's Poems",
      "History of Ancient Egypt",
      "Poems of a New Era",
      "Alice in Wonderland (Bengali Translation)",
      "Bengali Proverbs and Sayings",
      "Modern Bengal's Story",
      "Charyapada and Ancient Literature",
      "Stories of Bangladesh Liberation War",
    ],
    Banglish: [
      "Mahakaler Kontho",
      "Goenda Kahini Samagra",
      "Bhuter Golpo",
      "Nokkhotrer Raat",
      "Jiboner Jolchhobi",
      "Bangla Sahitter Itihash",
      "Itihasher Ojano Oddhay",
      "Goniter Anondo",
      "Pakhir Golpo",
      "Vugoler Bishmoy",
      "Shishutosh Golposamagra",
      "Rohosshomoy Prithibi",
      "Pranir Kahini",
      "Bigganer Bishmoy",
      "Bishwer Sera Uponyas",
      "Robindranather Kobita",
      "Prachin Misher Itihash",
      "Jugantorer Kobita",
      "Alice in Wonderland (Bangla Onubad)",
      "Bangla Probad Probachan",
      "Adhunik Banglar Kotha",
      "Charyapod O Prachin Sahitto",
      "Bangladesher Muktijuddher Golpo",
    ],
  };

  const categories = {
    Bangla: [
      "মাস্ট রিড কালেকশন",
      "সেলফ ডেভেলপমেন্ট",
      "শিশুদের বই",
      "কমিকস",
      "টপ ট্রেন্ডস",
    ],
    English: [
      "Must Read Collection",
      "Self Development",
      "Children's Books",
      "Comics",
      "Top Trends",
    ],
    Banglish: [
      "Must Read Kolekshan",
      "Self Development",
      "Shishuder Boi",
      "Comics",
      "Top Trends",
    ],
  };

  const subjectsBangla = [
    "উপন্যাস",
    "কবিতা",
    "গল্প",
    "ইতিহাস",
    "বিজ্ঞান",
    "দর্শন",
    "ধর্ম",
    "জীবনী",
    "শিশুসাহিত্য",
    "কৃষি",
    "ভ্রমণকাহিনী",
    "রাজনীতি",
    "সমাজবিজ্ঞান",
    "প্রযুক্তি",
    "চিকিৎসাশাস্ত্র",
    "গণিত",
    "আইন",
    "সাহিত্য",
    "শিল্প ও সংস্কৃতি",
    "ভৌগোলিক গবেষণা",
  ];

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

        {/* Book Name Fields */}
        {["Bangla", "Banglish", "English"]?.map((lang) => (
          <div
            key={lang}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{`Book Name (${lang})`}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
          <div
            key={lang}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{`Publisher Name (${lang})`}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              name={`publisher${lang}`}
              value={formData[`publisher${lang}`]}
              onChange={handleChange}
              type="text"
              placeholder={`Publisher in ${lang}`}
            />
          </div>
        ))}

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`Publisher ID`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`publicationID`}
            value={formData[`publicationID`]}
            onChange={handleChange}
            type="text"
            placeholder={`Publisher ID`}
          />
        </div>

        {/* author info  */}
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`Author ID`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`authorID`}
            value={formData[`authorID`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author ID`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`Author Name Bangla`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`authorNameBangla`}
            value={formData[`authorNameBangla`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author Name Bangla`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`Author Name English`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`authorNameEnglish`}
            value={formData[`authorNameEnglish`]}
            onChange={handleChange}
            type="text"
            placeholder={`Author Name English`}
          />
        </div>

        {/* buing option  */}
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`Hard Cover Price`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`hardCoverPrice`}
            value={formData[`hardCoverPrice`]}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder={`Hard Cover Price`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`E-book Price`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`ebookPrice`}
            value={formData[`ebookPrice`]}
            onChange={handleChange}
            type="number"
            onWheel={(e) => e.target.blur()}
            placeholder={`Ebook Price`}
          />
        </div>

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">{`E-book File link`}</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name={`ebookFileLink`}
            value={formData[`ebookFileLink`]}
            onChange={handleChange}
            type="text"
            placeholder={`Ebook File link`}
          />
        </div>

        {/* Category Fields */}
        {["Bangla", "English", "Banglish"]?.map((lang) => (
          <div
            key={lang}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{`Category (${lang})`}</label>
            <select
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
          <div
            key={lang}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{`Subcategory (${lang})`}</label>
            <select
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">Subject (Bangla)</label>
          <select
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
          <div
            key={field}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{field}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">Language</label>
          <select
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
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
          <div
            key={field}
            className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400"
          >
            <label className="block font-medium">{field}</label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              name={field.replace(/ /g, "").toLowerCase()}
              value={formData[field.replace(/ /g, "").toLowerCase()]}
              onChange={handleChange}
              type={field === "Description" ? "textarea" : "text"}
              placeholder={field}
            />
          </div>
        ))}

        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium">Publication Date</label>
          <input
            className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            name="publicationdate"
            value={formData.publicationdate}
            onChange={handleChange}
            type="text"
            placeholder="month-date-year"
          />
        </div>

        <div className="flex  justify-end">
          <button
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
