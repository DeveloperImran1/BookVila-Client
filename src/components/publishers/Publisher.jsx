"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BooksCard from "../books/BookCard";
import { usePathname } from "next/navigation";

const Publisher = () => {
    const axiosPublic = useAxiosPublic()
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const [totalPages, setTotalPages] = useState(1);

    const pathname = usePathname();
    const lastPathSegment = pathname?.split('/').pop();

    const { data: publisher = {} } = useQuery({
        queryKey: ['publisher', lastPathSegment],
        queryFn: async () => { 
            const res = await axiosPublic.get(`/getSinglePublication/${lastPathSegment}`)
            return res?.data[0]
        }
    })

    const { data: publisherBook = {}, isLoading } = useQuery({
        queryKey: ["publisherBook", page, search, publisher],
        queryFn: async () => {  
            const res = await axiosPublic.get(`/getPublicationBooks?publicationId=${publisher?.publicationID}&searchQuery=${search}&page=${page}`);
            setTotalPages(Math.ceil(res?.data?.totalBooks / 12))
            return res?.data;
        }
    })

    const handleSearch = (e) => {
        e.preventDefault;
        setSearch(e.target.value)
    }

  

    console.log(publisher);
    console.log(publisherBook);

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
                <Image height={676} width={1200} src={"https://pathokpoint.com/_next/image?url=%2Fdefault%2Fpublisher-cover.jpg&w=1920&q=75"} alt="featured books" className="h-[360px] w-full pb-[160px] "></Image>

                <div className="flex items-center gap-3 absolute bottom-[30px] left-11">
                    <Image height={676} width={1200} src={publisher?.photo} alt="Publisher books" className="h-[190px] w-[190px] rounded-full border-[4px] "></Image>
                    <h1 className="text-[22px] font-bold">{publisher?.name?.[1]}</h1>
                </div>

            </div>

            <div className="bg-white mt-[10px] pt-6 px-5 rounded-md">
                <div className="flex items-center justify-between text-gray-500">
                    <p>Tota Result {publisherBook?.totalBooks}</p>
                    <span className="relative   ">
                        <input onKeyUp={handleSearch}  type="text" placeholder="Search Anything" className="  bg-bg-gray  md:w-[200px] lg:w-[300px] py-3  px-2 border-none focus:outline-none focus:border-none  rounded-md  " />
                        <FaSearch size={22} className='text-gray-500 absolute right-3 top-[20%]'></FaSearch>
                    </span>
                </div>

                {/* all result is here */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[38px] ">
                    {
                        publisherBook?.books?.map((book, index) => <BooksCard key={book?._id} book={book}></BooksCard>)
                    }
                </div>

                {/* Pagination */}

                <div className="flex justify-center items-center mt-5">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 1}
                        className={`px-4 py-2 border ${page === 1 ? "bg-bg-gray" : "bg-bg-blue text-white"
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
                        className={`px-4 py-2 border ${page === totalPages ? "bg-bg-gray" : "bg-bg-blue text-white"
                            } rounded-md cursor-pointer`}
                    >
                        Next
                    </button>
                </div>
            </div>
            
        </section>
    );
};

export default Publisher;