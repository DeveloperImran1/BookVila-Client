"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Drawer, DrawerAction, DrawerContent } from "keep-react";
import Image from "next/image";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { Range } from "react-range";
import BooksCard from "../books/BookCard";
import BookCardSkelletion from "../books/BookCardSkelletion";

const MIN = 0;
const MAX = 999;

const AllBook = () => {
  //   const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchAuthorQuery, setSearchAuthorQuery] = useState("");
  const [searchSubjectsQuery, setSearchSubjectsQuery] = useState("");
  const [searchCategoriesQuery, setSearchCategoriesQuery] = useState("");
  const [priceRange, setPriceRange] = useState([MIN, MAX]);

  const axiosPublic = useAxiosPublic();

  // Search input change handlers with explicit casting
  const handleSearchAuthorChange = (e) =>
    setSearchAuthorQuery(String(e.target.value || ""));
  const handleSearchSubjectsChange = (e) =>
    setSearchSubjectsQuery(String(e.target.value || ""));
  const handleSearchCategoriesChange = (e) =>
    setSearchCategoriesQuery(String(e.target.value || ""));
  const handlePriceChange = (values) => {
    setPriceRange(values);
  };

  // Authors, categories, and subjects options
  const authors = [
    { bengali: "রবীন্দ্রনাথ ঠাকুর", english: "Rabindranath Tagore" },
    { bengali: "কাজী নজরুল ইসলাম", english: "Kazi Nazrul Islam" },
    {
      bengali: "শরৎচন্দ্র চট্টোপাধ্যায়",
      english: "Sarat Chandra Chattopadhyay",
    },
    { bengali: "সেলিনা হোসেন", english: "Selina Hossain" },
    { bengali: "আখতারুজ্জামান ইলিয়াস", english: "Akhtaruzzaman Elias" },
    { bengali: "হুমায়ুন আহমেদ", english: "Humayun Ahmed" },
    { bengali: "মাইকেল মধুসূদন দত্ত", english: "Michael Madhusudan Dutt" },
    { bengali: "জীবনানন্দ দাশ", english: "Jibanananda Das" },
    { bengali: "বুদ্ধদেব বসু", english: "Buddhadeb Basu" },
    { bengali: "মানিক বন্দ্যোপাধ্যায়", english: "Manik Bandopadhyay" },
    { bengali: "হাসান আজিজুল হক", english: "Hasan Azizul Haque" },
    { bengali: "আরিফ আজাদ", english: "Arif Azad" },
    { bengali: "তারিক জামিল", english: "Tarik Jamil" },
  ];

  const subjects = [
    { bengali: "দেশপ্রেম", english: "Patriotism", banglish: "Deshprem" },
    {
      bengali: "প্রেম ও বেদনা",
      english: "Love and Sorrow",
      banglish: "Prem o Bedona",
    },
    { bengali: "প্রতিবাদী", english: "Revolutionary", banglish: "Protibadi" },
    { bengali: "ভালোবাসা", english: "Love", banglish: "Bhalobasha" },
    {
      bengali: "সমাজ ও সভ্যতা",
      english: "Society and Civilization",
      banglish: "Shomaj o Shobbota",
    },
    {
      bengali: "গ্রামবাংলার জীবন",
      english: "Rural Life of Bengal",
      banglish: "GramBanglar Jibon",
    },
    { bengali: "থ্রিলার", english: "Thriller", banglish: "Thriller" },
    {
      bengali: "বাংলাদেশ প্রসঙ্গ রাজনীতি",
      english: "Politics of Bangladesh",
      banglish: "Bangladesh Proshonggo Rajniti",
    },
    {
      bengali: "মুক্তিযুদ্ধের নানা ঘটনা",
      english: "Liberation War Stories",
      banglish: "Muktijuddher Nana Ghotoona",
    },
    {
      bengali: "উপন্যাস সমগ্র",
      english: "Novel Collection",
      banglish: "Uponyas Shomogro",
    },
    {
      bengali: "মুক্তিযুদ্ধের ইতিহাস: প্রসঙ্গ মুক্তিযুদ্ধ",
      english: "Liberation War History",
      banglish: "Muktijuddher Itihash",
    },
    {
      bengali: "ব্যঙ্গ ও রম্যরচনা",
      english: "Satire and Humor",
      banglish: "Byango o Romyorochona",
    },
    {
      bengali: "পশ্চিমবঙ্গের বই: রম্যরচনা",
      english: "West Bengal Books: Humor",
      banglish: "Poschimbonge Boi: Romyorochona",
    },
    { bengali: "ঈমান", english: "Faith", banglish: "Iman" },
    {
      bengali: "বিপ্লব ও বিদ্রোহ",
      english: "Revolution and Rebellion",
      banglish: "Biplob o Bidroho",
    },
    {
      bengali: "মুক্তিযুদ্ধ ও রাজনীতি",
      english: "Liberation War and Politics",
      banglish: "Muktijuddho o Rajniti",
    },
    { bengali: "Love Story", english: "Love Story", banglish: "Love Story" },
    {
      bengali: "বাংলাদেশ ও ইতিহাস",
      english: "Bangladesh and History",
      banglish: "Bangladesh o Itihash",
    },
    { bengali: "নাটক", english: "Drama", banglish: "Drama" },
    {
      bengali: "দর্শনীয় স্থান ও পর্যটন ইতিহাস",
      english: "Historical Tourism",
      banglish: "Darshoniya Sthan o Porjoton Itihash",
    },
    { bengali: "ফুটবল", english: "Football", banglish: "Football" },
    {
      bengali: "ইসলাম ও বিজ্ঞান",
      english: "Islam and Science",
      banglish: "Islam o Biggan",
    },
    {
      bengali: "ইসলামি দর্শন",
      english: "Islamic Philosophy",
      banglish: "Islami Darshan",
    },
    { bengali: "ডায়রি", english: "Diary", banglish: "Diary" },
    {
      bengali: "রোমান্টিক কবিতা",
      english: "Romantic Poetry",
      banglish: "Romantic Kobita",
    },
    {
      bengali: "দর্শন ও দার্শনিক বিষয়ক প্রবন্ধ",
      english: "Philosophical Essays",
      banglish: "Darshon o Darshonik Bishoyok Probondho",
    },
    {
      bengali: "সাহিত্য সমালোচনা বিষয়ক প্রবন্ধ",
      english: "Literary Criticism",
      banglish: "Shahitto Shamalochona Bishoyok Probondho",
    },
    {
      bengali: "প্রাচীন সভ্যতার ইতিহাস",
      english: "History of Ancient Civilizations",
      banglish: "Prachin Shobbotar Itihash",
    },
    {
      bengali: "পরকাল ও জান্নাত-জাহান্নাম",
      english: "Afterlife and Heaven-Hell",
      banglish: "Porokal o Jannat-Jahannam",
    },
    {
      bengali: "বাংলাদেশের রাজনৈতিক ব্যক্তিত্ব",
      english: "Political Figures of Bangladesh",
      banglish: "Bangladesher Rajnoitik Bekti",
    },
    { bengali: "আভেঞ্চার", english: "Adventure", banglish: "Adventure" },
    { bengali: "ওয়েস্টার্ন", english: "Western", banglish: "Western" },
    { bengali: "Nonfiction", english: "Nonfiction", banglish: "Nonfiction" },
    {
      bengali: "চিঠি ও স্মৃতিচারণ",
      english: "Letters and Memoirs",
      banglish: "Chithi o Smriticharon",
    },
    {
      bengali: "সমকালীন উপন্যাস",
      english: "Contemporary Novel",
      banglish: "Shomokaline Uponyas",
    },
    {
      bengali: "হিন্দু ধর্মীয় বই",
      english: "Hindu Religious Books",
      banglish: "Hindu Dhormiyo Boi",
    },
    {
      bengali: "সেবা অনুবাদ",
      english: "Seba Translation",
      banglish: "Seba Onubad",
    },
  ];

  const categories = [
    { bengali: "কাব্য", english: "Poetry", banglish: "Kabyo" },
    { bengali: "উপন্যাস", english: "Novel", banglish: "Uponyash" },
    { bengali: "ছোটগল্প", english: "Short Story", banglish: "Chotogolpo" },
    { bengali: "মহাকাব্য", english: "Epic", banglish: "Mohakabyo" },
    { bengali: "নাটক", english: "Drama", banglish: "Natok" },
    { bengali: "কবিতা", english: "Poem", banglish: "Kobita" },
    {
      bengali: "সায়েন্স ফিকশন",
      english: "Science Fiction",
      banglish: "Science Fiction",
    },
    { bengali: "ইতিহাস", english: "History", banglish: "Itihash" },
    { bengali: "আত্মজীবনী", english: "Autobiography", banglish: "Atmojiboni" },
    { bengali: "রোমান্স", english: "Romance", banglish: "Romance" },
    { bengali: "থ্রিলার", english: "Thriller", banglish: "Thriller" },
    { bengali: "মিস্ট্রি", english: "Mystery", banglish: "Mystery" },
    { bengali: "কমেডি", english: "Comedy", banglish: "Comedy" },
    { bengali: "ফ্যান্টাসি", english: "Fantasy", banglish: "Fantasy" },
    { bengali: "ড্রামা", english: "Drama", banglish: "Drama" },
    {
      bengali: "দার্শনিক সাহিত্য",
      english: "Philosophical Literature",
      banglish: "Darshonik Sahitto",
    },
    {
      bengali: "ভ্রমণ কাহিনী",
      english: "Travelogue",
      banglish: "Vromon Kahini",
    },
    {
      bengali: "সমাজবাদী সাহিত্য",
      english: "Socialist Literature",
      banglish: "Shomajbadi Sahitto",
    },
    { bengali: "রাজনীতি", english: "Politics", banglish: "Rajniti" },
    { bengali: "শিক্ষামূলক", english: "Educational", banglish: "Shikhamulok" },
  ];

  // Handle checkbox change
  const handleCheckboxChange = (setStateFunction, value) => {
    setStateFunction((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  // Memoize fetchBooks to prevent redefinition on every render
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "books",
      searchQuery,
      selectedAuthors,
      selectedCategories,
      selectedSubjects,
      page,
      priceRange,
    ],
    queryFn: async () => {
      const [minPrice, maxPrice] = priceRange;
      const response = await axiosPublic.get("/books", {
        params: {
          searchQuery,
          author: selectedAuthors.join(","),
          category: selectedCategories.join(","),
          subject: selectedSubjects.join(","),
          page,
          limit: 12,
          minPrice,
          maxPrice,
        },
      });
      console.log(books);
      setTotalPages(response.data.totalPages || 1);
      return response.data;
    },
    keepPreviousData: true,
  });

  // if (isLoading) return <Loading></Loading>
  if (error) return <p>Error loading books: {error.message}</p>;

  // Filter authors based on search input
  const filteredAuthors = authors.filter(
    (author) =>
      author.bengali.includes(searchAuthorQuery) ||
      author.english.toLowerCase().includes(searchAuthorQuery.toLowerCase())
  );

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.bengali.includes(searchSubjectsQuery || "") ||
      subject.english
        ?.toLowerCase()
        .includes((searchSubjectsQuery || "").toLowerCase())
  );
  const filteredCategories = categories.filter(
    (category) =>
      category.bengali.includes(searchCategoriesQuery || "") ||
      category.english
        ?.toLowerCase()
        .includes((searchCategoriesQuery || "").toLowerCase()) ||
      category.banglish
        ?.toLowerCase()
        .includes((searchCategoriesQuery || "").toLowerCase())
  );

  console.log(books);
  console.log(searchSubjectsQuery);

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <div className="container mx-auto ">
      <div className="">
        <Drawer className="text-black border-2 mt-9 ">
          <DrawerAction asChild>
            <div className="flex justify-end">
              <p className="bg-gray-300 hover:text-primary w-[37px] p-1 mt-4 mr-2 rounded-md lg:hidden">
                <CiFilter size={28} />
              </p>
            </div>
          </DrawerAction>

          <DrawerContent
            position="left"
            className="w-[60%] md:max-w-[40%]  flex flex-col justify-between  h-[100vh] overflow-scroll"
          >
            <div className="flex flex-col bg-white pt-[10px] pb-[50px] rounded-md justify-between items-center">
              <div className="flex flex-col gap-6 mt-[20px] md:mt-[33px] lg:mt-11">
                {/* Filter Checkboxes */}
                <div className="bg-white p-4 rounded">
                  <h3 className="font-semibold">Authors</h3>
                  <input
                    type="text"
                    placeholder="Search Authors"
                    value={searchAuthorQuery}
                    onChange={handleSearchAuthorChange} // Update search query
                    className="mb-2 w-full p-2 border border-gray-300"
                  />

                  {/* Scrollable container for authors */}
                  <div className="flex flex-col max-h-[200px] overflow-y-auto">
                    {filteredAuthors.map((author) => (
                      <label key={author.bengali}>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedAuthors,
                              author.bengali
                            )
                          }
                          checked={selectedAuthors.includes(author.bengali)}
                        />
                        {author.bengali}
                      </label>
                    ))}
                  </div>
                </div>

                {/* categories filtering  */}
                <div className="bg-white p-4 rounded">
                  <h3 className="font-semibold">Categories</h3>
                  <input
                    type="text"
                    placeholder="Search Category"
                    value={searchCategoriesQuery}
                    onChange={handleSearchCategoriesChange} // Update search query
                    className="mb-2 w-full p-2 border border-gray-300"
                  />

                  {/* Scrollable container for authors */}
                  <div className="flex flex-col max-h-[200px] overflow-y-auto">
                    {filteredCategories.map((category) => (
                      <label key={category.bengali}>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedCategories,
                              category.bengali
                            )
                          }
                          checked={selectedCategories.includes(
                            category.bengali
                          )} // Update this line
                        />
                        {category.bengali}
                      </label>
                    ))}
                  </div>
                </div>

                {/* subject filtering  */}
                <div className="bg-white p-4 rounded">
                  <h3 className="font-semibold">Subjects</h3>
                  {/* Author Search Input */}
                  <input
                    type="text"
                    placeholder="Search Subjects"
                    value={searchSubjectsQuery}
                    onChange={handleSearchSubjectsChange} // Update search query
                    className="mb-2 w-full p-2 border border-gray-300"
                  />

                  {/* Scrollable container for authors */}
                  <div className="flex flex-col max-h-[200px] overflow-y-auto">
                    {filteredSubjects.map((subject) => (
                      <label key={subject.bengali}>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedSubjects,
                              subject.bengali
                            )
                          }
                          checked={selectedSubjects.includes(subject.bengali)}
                        />
                        {subject.bengali}
                      </label>
                    ))}
                  </div>
                </div>

                {/* filtering price */}
                <div className="bg-white p-4 rounded">
                  <h2 className="font-semibold">Price Range Filter</h2>
                  <Range
                    values={priceRange}
                    step={10}
                    min={MIN}
                    max={MAX}
                    onChange={handlePriceChange}
                    draggableTrack
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          height: "6px",
                          width: "90%",
                          backgroundColor: "#ccc",
                          margin: "50px 0",
                          position: "relative",
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => (
                      <div
                        {...props}
                        style={{
                          height: "30px",
                          width: "30px",
                          backgroundColor: "#999",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          marginTop: "-30px", // নতুন এই padding যোগ করা হয়েছে
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)", // Center-aligns the text vertically
                            fontSize: "12px",
                            color: "#fff",
                          }}
                        >
                          {priceRange[index]}
                        </span>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="flex gap-5 ">
          <div className="hidden lg:flex w-[20%]  flex-col gap-6 mt-[20px] md:mt-[33px] lg:mt-11">
            {/* Filter Checkboxes */}
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold">Authors</h3>
              <input
                type="text"
                placeholder="Search Authors"
                value={searchAuthorQuery}
                onChange={handleSearchAuthorChange} // Update search query
                className="mb-2 w-full p-2 border border-gray-300"
              />

              {/* Scrollable container for authors */}
              <div className="flex flex-col max-h-[200px] overflow-y-auto">
                {filteredAuthors.map((author) => (
                  <label key={author.bengali}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(setSelectedAuthors, author.bengali)
                      }
                      checked={selectedAuthors.includes(author.bengali)}
                    />
                    {author.bengali}
                  </label>
                ))}
              </div>
            </div>

            {/* categories filtering  */}
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold">Categories</h3>
              <input
                type="text"
                placeholder="Search Category"
                value={searchCategoriesQuery}
                onChange={handleSearchCategoriesChange} // Update search query
                className="mb-2 w-full p-2 border border-gray-300"
              />

              {/* Scrollable container for authors */}
              <div className="flex flex-col max-h-[200px] overflow-y-auto">
                {filteredCategories.map((category) => (
                  <label key={category.bengali}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedCategories,
                          category.bengali
                        )
                      }
                      checked={selectedCategories.includes(category.bengali)} // Update this line
                    />
                    {category.bengali}
                  </label>
                ))}
              </div>
            </div>

            {/* subject filtering  */}
            <div className="bg-white p-4 rounded">
              <h3 className="font-semibold">Subjects</h3>
              {/* Author Search Input */}
              <input
                type="text"
                placeholder="Search Subjects"
                value={searchSubjectsQuery}
                onChange={handleSearchSubjectsChange} // Update search query
                className="mb-2 w-full p-2 border border-gray-300"
              />

              {/* Scrollable container for authors */}
              <div className="flex flex-col max-h-[200px] overflow-y-auto">
                {filteredSubjects.map((subject) => (
                  <label key={subject.bengali}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedSubjects,
                          subject.bengali
                        )
                      }
                      checked={selectedSubjects.includes(subject.bengali)}
                    />
                    {subject.bengali}
                  </label>
                ))}
              </div>
            </div>

            {/* filtering price */}
            <div className="bg-white p-4 rounded">
              <h2 className="font-semibold">Price Range Filter</h2>
              <Range
                values={priceRange}
                step={10}
                min={MIN}
                max={MAX}
                onChange={handlePriceChange}
                draggableTrack
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      height: "6px",
                      width: "90%",
                      backgroundColor: "#ccc",
                      margin: "50px 0",
                      position: "relative",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => (
                  <div
                    {...props}
                    style={{
                      height: "30px",
                      width: "30px",
                      backgroundColor: "#999",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      marginTop: "-30px", // নতুন এই padding যোগ করা হয়েছে
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)", // Center-aligns the text vertically
                        fontSize: "12px",
                        color: "#fff",
                      }}
                    >
                      {priceRange[index]}
                    </span>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Book List */}
          <div className="w-full lg:w-[80%] bg-white p-5 mt-[20px] md:mt-[33px] lg:mt-11">
            <div className="flex justify-between items-start">
              <p className="text-[17px] font-semibold text-gray-600">
                Total Books: {books?.totalBooks || 0}
              </p>
              {/* Search Input */}
              <div className="text-center flex justify-center items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by book name"
                  className="border-2 w-full mb-4 px-5 py-2 rounded-lg"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="container">
                <div className="w-full mx-auto  py-4 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 ">
                  {[1, 2, 3, 4].map((card, index) => (
                    <BookCardSkelletion key={index}></BookCardSkelletion>
                  ))}
                </div>
              </div>
            ) : books?.books?.length < 1 ? (
              <div className="flex flex-col items-center justify-center bg-white ">
                <Image
                  className="h-[300px] w-[300px] "
                  height={676}
                  width={1200}
                  src="https://i.postimg.cc/PJX8X2QK/46524b382087d63a209441765be9eb5b-removebg-preview.png"
                  alt="gift"
                />
                <h3 className="text-[20px] font-semibold text-gray-500 mt-5 mb-8 ml-3">
                  Your Filtering Book Not Available 🤔
                </h3>
              </div>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
                {books?.books?.map((book) => (
                  <BooksCard key={book._id} book={book} />
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Pagination */}

        <div className="flex justify-center items-center mt-5 ">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 border ${
              page === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white"
            } cursor-pointer rounded-md`}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className={`px-4 py-2 border ${
              page >= totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white"
            } cursor-pointer rounded-md`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBook;
