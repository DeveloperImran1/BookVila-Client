"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const AllBooksPage = () => {
  // State setup
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchAuthorQuery, setSearchAuthorQuery] = useState(""); // Author search query

  const axiosPublic = useAxiosPublic();

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

  const categories = [
    "কাব্য",
    "উপন্যাস",
    "ছোটগল্প",
    "মহাকাব্য",
    "নাটক",
    "কবিতা",
  ];
  const subjects = ["দেশপ্রেম", "প্রতিবাদী", "ভালোবাসা"];

  // Handle checkbox change
  const handleCheckboxChange = (setStateFunction, value) => {
    setStateFunction((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  // Memoize fetchBooks to prevent redefinition on every render
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("/books", {
        params: {
          searchQuery,
          author: selectedAuthors.join(","),
          category: selectedCategories.join(","),
          subject: selectedSubjects.join(","),
          page,
          limit: 10,
        },
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedAuthors,
    selectedCategories,
    selectedSubjects,
    page,
  ]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Filter authors based on search input
  const filteredAuthors = authors.filter(
    (author) =>
      author.bengali.includes(searchAuthorQuery) ||
      author.english.toLowerCase().includes(searchAuthorQuery.toLowerCase())
  );

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mx-auto">
      <h1>All Books</h1>

      {/* Search Input */}
      <div className="text-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by book name"
          className="border-2 mb-4 px-5 py-2 rounded-lg"
        />
      </div>

      <div className="flex gap-8">
        <div className="w-2/12">
          {/* Filter Checkboxes */}
          <div>
            <h3>Authors</h3>

            {/* Author Search Input */}
            <input
              type="text"
              placeholder="Search Authors"
              value={searchAuthorQuery} // Value for author search query
              onChange={(e) => setSearchAuthorQuery(e.target.value)} // Update search query
              className="mb-2 p-2 border border-gray-300"
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

          <div>
            <h3>Categories</h3>
            <div className="flex flex-col">
              {categories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange(setSelectedCategories, category)
                    }
                    checked={selectedCategories.includes(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3>Subjects</h3>
            {subjects.map((subject) => (
              <label key={subject}>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleCheckboxChange(setSelectedSubjects, subject)
                  }
                  checked={selectedSubjects.includes(subject)}
                />
                {subject}
              </label>
            ))}
          </div>
        </div>

        {/* Book List */}
        <div className="w-10/12">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="grid grid-cols-3 gap-5">
              {books.map((book) => (
                <li key={book._id}>
                  <h4>{book.bookName.join(" / ")}</h4>
                  <img src={book.coverImage} alt={book.bookName[0]} />
                  <p>{book.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBooksPage;
