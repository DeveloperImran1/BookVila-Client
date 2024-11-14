"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Range } from "react-range";
import BooksCard from "../books/BookCard";
import { useQuery } from "@tanstack/react-query";
import { Slider } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { debounce } from "lodash";

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
  // const [priceRange, setPriceRange] = useState([MIN, MAX]);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximumPrice] = useState(1000);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(minimumPrice);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(maximumPrice);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedMinPrice(minimumPrice);
      setDebouncedMaxPrice(maximumPrice);
    }, 500); // Wait 500 milliseconds before updating
    handler();
    return () => handler.cancel();
  }, [minimumPrice, maximumPrice]);

  const handleSliderChange = (newValue) => {
    setDebouncedMinPrice(newValue[0]);
    setDebouncedMaxPrice(newValue[1]);
  };

  const handleSliderRelease = () => {
    setIsSliderActive(false);
    fetchData();
  };

  const fetchData = useCallback(() => {
    console.log(
      `Fetching data for price range: ${debouncedMinPrice} - ${debouncedMaxPrice}`
    );
    // Call your API or fetch logic here using the debounced values
  }, [debouncedMinPrice, debouncedMaxPrice]);

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
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "books",
      debouncedMinPrice,
      debouncedMaxPrice,
      selectedAuthors,
      selectedCategories,
      selectedSubjects,
    ],
    queryFn: async () => {
      const response = await axiosPublic.get("/books", {
        params: {
          searchQuery,
          authors: selectedAuthors,
          categories: selectedCategories,
          subjects: selectedSubjects,
          minPrice: debouncedMinPrice,
          maxPrice: debouncedMaxPrice,
          page,
        },
      });
      return response.data;
    },
  });
  console.log(books)
  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books: {isError.message}</p>;

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
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex gap-4 mb-4">
        <Select
          label="Authors"
          value={searchAuthorQuery}
          onChange={handleSearchAuthorChange}
        >
          {authors.map((author, index) => (
            <SelectItem key={index} value={author.english}>
              {author.english}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Categories"
          value={searchCategoriesQuery}
          onChange={handleSearchCategoriesChange}
        >
          {categories.map((category, index) => (
            <SelectItem key={index} value={category.english}>
              {category.english}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Subjects"
          value={searchSubjectsQuery}
          onChange={handleSearchSubjectsChange}
        >
          {subjects.map((subject, index) => (
            <SelectItem key={index} value={subject.english}>
              {subject.english}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="mb-4">
        <Slider
          aria-label="Price range"
          value={[debouncedMinPrice, debouncedMaxPrice]}
          onChange={handleSliderChange}
          onChangeEnd={handleSliderRelease}
          step={1}
          min={0}
          max={1000}
        />
        <div className="flex justify-between mt-2">
          <span>{debouncedMinPrice}</span>
          <span>{debouncedMaxPrice}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books?.map((book) => (
          <BooksCard key={book.id} book={book} />
        ))}
      </div>
      <div className="mt-4">
        {/* Pagination logic */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBook;
