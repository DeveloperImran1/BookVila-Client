"use client";
import BookCardSkelletion from "@/components/books/BookCardSkelletion";
import WriterCard from "@/components/home/WriterCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AllWriters = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  const { data: queryAuthors = {}, isLoading } = useQuery({
    queryKey: ["queryAuthors", page, search],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/getAllAuthorsWithParams?searchQuery=${search}&page=${page}`
      );
      setTotalPages(Math.ceil(res?.data?.totalAuthors / 12));
      return res?.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault;
    setSearch(e.target.value);
  };

  console.log(queryAuthors);
  console.log(search);

  // Pagination handlers
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <section className="container  ">
      <div className="relative bg-white rounded-md">
        <Image
          height={676}
          width={1200}
          src={
            "https://pathokpoint.com/_next/image?url=%2Fdefault%2Fpublisher-cover.jpg&w=1920&q=75"
          }
          alt="author page banner"
          className="h-[290px] md:h-[320px] lg:h-[360px] w-full pb-[90px] md:pb-[130px] lg:pb-[160px] "
        ></Image>

        <div className="flex items-center gap-3 absolute bottom-[20px] md:bottom-[35px] lg::bottom-[30px] ">
          <Image
            height={676}
            width={1200}
            src={
              "https://prokashoni.net/wp-content/themes/prokashoni/assets/images/stations/default.png"
            }
            alt="author page logo"
            className="h-[100px] md:h-[140px] lg:h-[190px] w-[100px] md:w-[140px] lg:w-[190px] rounded-full border-[4px] "
          ></Image>
          <h1 className="text-[17px] md:text-[19px] lg:text-[22px] font-bold">
            লেখক সমূহ
          </h1>
        </div>
      </div>

      <div className="bg-white mt-[10px] pt-6 px-2 md:px-5 rounded-md">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-sm md:text-base">
            Total Result {queryAuthors?.totalAuthors}
          </p>
          <span className="relative   ">
            <input
              onKeyUp={handleSearch}
              type="text"
              placeholder="Search now"
              className="  bg-bg-gray w-[140px] md:w-[200px] lg:w-[300px] py-3  px-2 border-none focus:outline-none focus:border-none  rounded-md  "
            />
            <FaSearch className="text-[18px] md:text-[22px] text-gray-500 absolute right-3 top-[30%]"></FaSearch>
          </span>
        </div>

        {isLoading ? (
          <div className="container">
            <div className="w-full mx-auto  py-4 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center gap-4 ">
              {[1, 2, 3, 4].map((card, index) => (
                <BookCardSkelletion key={index}></BookCardSkelletion>
              ))}
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mt-[10px] md:mt-[18px] lg:mt-[28px] ">
            {queryAuthors?.authors?.map((writer) => (
              <WriterCard key={writer?._id} writer={writer}></WriterCard>
            ))}
          </section>
        )}

        {/* Pagination */}

        <div className="flex justify-center items-center mt-5 pb-[20px] md:pb-[30px]">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className={`px-4 py-2 border ${
              page === 1 ? "bg-bg-gray" : "bg-bg-blue text-white"
            } rounded-md cursor-pointer`}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className={`px-4 py-2 border ${
              page === totalPages ? "bg-bg-gray" : "bg-bg-blue text-white"
            } rounded-md cursor-pointer`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllWriters;
