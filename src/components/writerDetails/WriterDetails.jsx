
"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import BooksCard from "../books/BookCard";
import { usePathname } from "next/navigation";

const WriterDetails = () => {
    const axiosPublic = useAxiosPublic()
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    const [totalPages, setTotalPages] = useState(1);

    const pathname = usePathname();
    const lastPathSegment = pathname?.split('/').pop();

    const { data: writer = {} } = useQuery({
        queryKey: ['writerDetails', lastPathSegment],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getSingleWriter/${lastPathSegment}`)
            return res?.data[0]
        }
    })

    const { data: authorsBook = {}, isLoading } = useQuery({
        queryKey: ["authorsBook", page, search, writer],
        queryFn: async () => {  
            const res = await axiosPublic.get(`/getAuthorBooks?authorId=${writer?.authorID}&searchQuery=${search}&page=${page}`);
            setTotalPages(Math.ceil(res?.data?.totalBooks / 12))
            return res?.data;
        }
    })

    const handleSearch = (e) => {
        e.preventDefault;
        setSearch(e.target.value)
    }

    console.log(writer)
    console.log(authorsBook)

    // Pagination handlers
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };


    return (
        <section className="container  ">
            <div className="lg:relative bg-white rounded-md">
                <Image height={676} width={1200} src={"https://pathokpoint.com/_next/image?url=%2Fdefault%2Fauthor-cover.jpg&w=1920&q=75"} alt="featured books" className="h-[200px] md:h-[270px] lg:h-[360px] w-full "></Image>

                <div className="flex flex-col md:flex-row items-center gap-3 relative p-3 lg:p-4">
                    <Image height={676} width={1200} src={`${writer?.photo || 'https://i.postimg.cc/tgSnXdKk/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'}`} alt="featured books" className="h-[100px] md:h-[140px] lg:h-[190px] w-[100px] md:w-[140px] lg:w-[190px] rounded-full border-[4px] -mt-[38px] md:-mt-55px] lg:-mt-[68px]"></Image>
                    <div className="flex flex-col p-2 md:p-6 lg:p-0">
                        <h1 className="text-[22px] font-bold">{writer?.name?.[1]}</h1>
                        <p className="text-gray-600">{writer?.about}</p>
                    </div>
                </div>


            </div>

            <div className="bg-white mt-[10px] pt-6 px-5 rounded-md">
                <div className="flex items-center justify-between text-gray-500">
                    <p>Tota Result {authorsBook?.totalBooks}</p>
                    <span className="relative   ">
                        <input onKeyUp={handleSearch} type="text" placeholder="Search Anything" className="  bg-bg-gray  md:w-[200px] lg:w-[300px] py-3  px-2 border-none focus:outline-none focus:border-none  rounded-md  " />
                        <FaSearch size={22} className='text-gray-500 absolute right-3 top-[20%]'></FaSearch>
                    </span>
                </div>

                {/* all result is here */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[38px] ">
                    {
                        authorsBook?.books?.map((book, index) => <BooksCard key={book?._id} book={book}></BooksCard>)
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

export default WriterDetails;