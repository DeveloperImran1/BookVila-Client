"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Drawer, DrawerAction, DrawerContent } from "keep-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [authors, setAuthors] = useState([]);
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

  const {
    data: allAuthorsObj = [],
    isLoading: isAuthorLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageAuthors"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllAuthors");
      return response.data;
    },
  });

  useEffect(() => {
    if (allAuthorsObj) {
      const formatedAuthorObj = allAuthorsObj?.map((obj) => ({
        bengali: obj?.name?.[1],
        english: obj?.name?.[0],
      }));
      console.log("formatedAuthorObj", formatedAuthorObj);
      setAuthors(formatedAuthorObj);
    }
  }, [allAuthorsObj]);

  // category data get
  const { data: categories = [] } = useQuery({
    queryKey: ["manageCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllCategories");

      return response.data;
    },
    keepPreviousData: true,
  });

  // subject data get
  const { data: subjects = [] } = useQuery({
    queryKey: ["manageSubject"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubjects");
      return response.data;
    },
    keepPreviousData: true,
  });

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
      setTotalPages(response.data.totalPages || 1);
      return response.data;
    },
    keepPreviousData: true,
  });

  if (error) return <p>Error loading books: {error.message}</p>;

  // Filter authors based on search input
  const filteredAuthors = searchAuthorQuery.trim()
    ? authors?.filter(
        (author) =>
          author.bengali.includes(searchAuthorQuery.trim()) ||
          author.english
            .toLowerCase()
            .includes(searchAuthorQuery.trim().toLowerCase())
      )
    : authors;

  const filteredSubjects = searchSubjectsQuery.trim()
    ? subjects.filter(
        (subject) =>
          subject.bengali.includes(searchSubjectsQuery.trim()) ||
          subject.english
            ?.toLowerCase()
            .includes(searchSubjectsQuery.trim().toLowerCase()) ||
          subject.banglish
            ?.toLowerCase()
            .includes(searchSubjectsQuery.trim().toLowerCase())
      )
    : subjects.slice();

  const filteredCategories = searchCategoriesQuery.trim()
    ? categories.filter(
        (category) =>
          category.bengali.includes(searchCategoriesQuery.trim()) ||
          category.english
            ?.toLowerCase()
            .includes(searchCategoriesQuery.trim().toLowerCase()) ||
          category.banglish
            ?.toLowerCase()
            .includes(searchCategoriesQuery.trim().toLowerCase())
      )
    : categories;

  console.log(
    "filteredCategories",
    filteredCategories,
    "filteredSubjects",
    filteredSubjects,
    "filteredAuthors",
    filteredAuthors
  );
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
                    className="mb-2 w-full p-2 border border-gray-300 bg-white"
                  />

                  {/* Scrollable container for authors */}
                  <div className="flex flex-col max-h-[200px] overflow-y-auto">
                    {filteredAuthors?.map((author) => (
                      <label key={author?.bengali}>
                        <input
                          type="checkbox"
                          className=""
                          onChange={() =>
                            handleCheckboxChange(
                              setSelectedAuthors,
                              author?.bengali
                            )
                          }
                          checked={selectedAuthors?.includes(author?.bengali)}
                        />
                        {author?.bengali}
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
                    className="mb-2 w-full p-2 border border-gray-300 bg-white"
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
                    className="mb-2 w-full p-2 border border-gray-300 bg-white"
                  />

                  {/* Scrollable container for authors */}
                  <div className="flex flex-col max-h-[200px] overflow-y-auto ">
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
                className="mb-2 w-full p-2 border border-gray-300 bg-white"
              />

              {/* Scrollable container for authors */}
              <div className="flex flex-col max-h-[200px] overflow-y-auto">
                {filteredAuthors?.map((author) => (
                  <label key={author?.bengali}>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleCheckboxChange(
                          setSelectedAuthors,
                          author?.bengali
                        )
                      }
                      checked={selectedAuthors.includes(author?.bengali)}
                    />
                    {author?.bengali}
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
                className="mb-2 w-full p-2 border border-gray-300 bg-white"
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
                className="mb-2 w-full p-2 border border-gray-300 bg-white"
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
                  className="border-2 w-full mb-4 px-5 py-2 rounded-lg bg-white"
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
