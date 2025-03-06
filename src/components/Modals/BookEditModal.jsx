import { uploadCloudinary } from "@/hooks/upload";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Checkbox, Modal } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const BookEditModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
  book,
  refetch,
}) => {
  console.log("current book is", book);

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
    bookNameBangla: book?.bookName?.[0],
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

  // Prepopulate formData with values from the `book` object
  useEffect(() => {
    if (book) {
      setFormData({
        bookNameBangla: book?.bookName?.[0] || "",
        bookNameBanglish: book?.bookName?.[1] || "",
        bookNameEnglish: book?.bookName?.[2] || "",
        publisherBangla: book?.publisher?.[0] || "",
        publisherBanglish: book?.publisher?.[1] || "",
        categoryBangla: book?.category?.[0] || "",
        categoryEnglish: book?.category?.[1] || "",
        categoryBanglish: book?.category?.[2] || "",
        subCategoryBangla: book?.subCategory?.[0] || "",
        subCategoryEnglish: book?.subCategory?.[1] || "",
        subCategoryBanglish: book?.subCategory?.[2] || "",
        subjectBangla: book?.subject || "",
        price: book?.price || "",
        discount: book?.discount || "",
        stock: book?.stock || "",
        pages: book?.pages || "",
        language: book?.language || "",
        editionenglish: book?.edition || "",
        // publicationdate: book?.publicationDate || "",
        publicationID: book?.publicationID || "",
        authorID: book?.authorInfo?.authorID || "",
        authorNameBangla: book?.authorInfo?.name?.[0] || "",
        authorNameEnglish: book?.authorInfo?.name?.[1] || "",
        hardCoverPrice: book?.price || "",
        ebookPrice: book?.buyingOptions?.[1]?.price || "",
        ebookFileLink: book?.buyingOptions?.[1]?.fileLink || "",
        formatbangla: book?.format || "",
        bindingbangla: book?.binding || "",
        countrybangla: book?.country || "",
        description: book?.description || "",
      });

      setIsFeatured(book?.isFeatured);
      setIsFlashSale(book?.isFlashSale);
      setIsPreOrder(book?.isPreOrder);
      setIsBestSelling(book?.isBestSelling);
      setIsComboOffer(book?.isComboOffer);
      setIsTrending(book?.isTrending);
      setIsGift(book?.isGift);
    }
  }, [book]); // Run whenever the `book` object changes

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        formDataObject?.bookNameBangla || book?.bookName?.[0],
        formDataObject?.bookNameBanglish || book?.bookName?.[1],
        formDataObject?.bookNameEnglish || book?.bookName?.[2],
      ],
      publisher: [
        formDataObject?.publisherBangla || book?.publisher?.[0],
        formDataObject?.publisherBanglish || book?.publisher?.[1],
      ],
      category: [
        formDataObject?.categoryBangla || book?.category?.[0],
        formDataObject?.categoryEnglish || book?.category?.[1],
        formDataObject?.categoryBanglish || book?.category?.[2],
      ],
      subCategory: [
        formDataObject?.subCategoryBangla || book?.subCategory?.[0],
        formDataObject?.subCategoryBanglish || book?.subCategory?.[1],
        formDataObject?.subCategoryEnglish || book?.subCategory?.[2],
      ],
      subject: formDataObject?.subjectBangla || book?.subject,
      price: parseInt(formDataObject?.price || book?.price),
      discount: parseInt(formDataObject?.discount || book?.discount),
      stock: parseInt(formDataObject?.stock || book?.stock),
      language: formDataObject?.language || book?.language,
      bookID: book?.bookID,
      edition: formDataObject?.editionenglish || book?.edition,
      // publicationDate: formDataObject?.publicationdate || book?.publicationDate,
      pages: parseInt(formDataObject?.pages || book?.pages),
      format: formDataObject?.formatbangla || book?.format,
      binding: formDataObject?.bindingbangla || book?.binding,
      country: formDataObject?.countrybangla || book?.country,
      coverImage: imageUrl || book?.coverImage,
      description: formDataObject?.description || book?.description,
      authorInfo: {
        authorID: formDataObject?.authorID || book?.authorInfo?.authorID,
        name: [
          formDataObject?.authorNameBangla || book?.authorInfo?.name?.[0],
          formDataObject?.authorNameEnglish || book?.authorInfo?.name?.[1],
        ],
      },
      buyingOptions: [
        {
          type: "হার্ডকভার",
          price: parseInt(formDataObject?.price || book?.price),
        },
        {
          type: "ইবুক",
          price: parseInt(
            formDataObject?.ebookPrice || book?.buyingOptions?.[1]?.price
          ),
          fileLink:
            formDataObject?.ebookFileLink || book?.buyingOptions?.[1]?.fileLink,
        },
      ],
      publicationID: formDataObject?.publicationID || book?.publicationID,
      isFeatured,
      isFlashSale,
      isPreOrder,
      isBestSelling,
      isComboOffer,
      isTrending,
      isGift,
    };

    console.log("updated book data", bookData);
    try {
      const res = await axiosPublic.put(`/updateBook/${book?._id}`, bookData);
      console.log(res);
      if (res?.status) {
        setLoading(false);
        refetch();
        toast.success("Successfully updated 😍");
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
    <>
      {/* modal for edit book  */}

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
                    book?.coverImage ||
                    "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
                  }
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
              <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
                <label className="block font-medium">{`Book Name (${lang})`}</label>
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
            {["Bangla", "English", "Banglish"]?.map((lang, index) => (
              <div key={lang} className="space-y-2 text-sm text-zinc-700 ">
                <label className="block font-medium">
                  {`Category (${lang})`}{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
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
                <label className="block font-medium">
                  {`Subcategory (${lang})`}{" "}
                  <span className="text-red-500 font-bold">*</span>
                </label>
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
              <label className="block font-medium">
                Subject (Bangla){" "}
                <span className="text-red-500 font-bold">*</span>
              </label>
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
              <label className="block font-medium">
                Language <span className="text-red-500 font-bold">*</span>
              </label>
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
      </Modal>
    </>
  );
};

export default BookEditModal;
