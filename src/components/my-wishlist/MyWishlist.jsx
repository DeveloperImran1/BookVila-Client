"use client"
import { cartBookGet, favoruteBookGet, removeBook, setCartBook } from "@/hooks/localStorage";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import DataNotFound from "../shared/DataNotFound";

const MyWishlist = () => {
  const axiosPublic = useAxiosPublic();
  const session = useSession();
  const email = session?.data?.user?.email;
  const [data, setData] = useState([])
  // Calculate discounted price
  function calculateDiscountedPrice(price, discountPercentage) {
    return price - (price * discountPercentage) / 100;
  }



  useEffect(() => {
    const res = favoruteBookGet()
    setData(res)
  }, [])

  console.log("My wishlist is", data)


  // add add to cart
  const handleDeleteWishlist = async (book) => {
    removeBook(book)

    // refetch er kaj korbe 
    const res = favoruteBookGet()
    setData(res)
  }


  

  // add add to cart
  const handleAddtoCart = async (deletedId, book) => {

    const obj = { userEmail: session?.data?.user?.email || 'demoEmail@gmail.com', books: book }
    setCartBook(obj)
  }



  return (
    <div className='bg-white p-4 '>
      <p className="text-[17px] font-semibold mb-6">My Total Favorute Books: {data?.length || 0}</p>
    {
      data?.length < 1 && <div className="w-full "> <DataNotFound></DataNotFound> </div>
    }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        { 
          data?.map(book => <div key={book?._id} className="w-full max-w-[340px] space-y-3  bg-white p-4 shadow-lg dark:bg-[#18181B] border-2 rounded">
            <div className="relative flex h-[250px] w-full justify-center ">
              <div className="absolute left-2 w-full flex items-center justify-between">
                {
                  book?.books?.discount > 0 && <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">{book?.books?.discount}% off</button>
                }

                <MdDelete onClick={() => handleDeleteWishlist(book)} size={23} className=" text-primary hover:text-red-500 hover:scale-125 cursor-pointer duration-300 "></MdDelete>
              </div>



              <Image width={400} height={400} className="rounded-lg bg-white m-auto mt-9 h-[200px] w-[150px] " src={book?.books?.coverImage || "https://i.postimg.cc/jC0Wbpym/pngtree-educational-learning-books-png-image-3851016-removebg-preview.png"} alt="card navigate ui" />
            </div>
            <div className="space-y-2 font-semibold">
              <h6 className="text-sm inline md:text-base lg:text-lg">{book?.books?.bookName?.[0]} </h6>
              <span className="text-xs font-semibold text-gray-400 md:text-sm"> by {book?.books?.authorInfo?.name?.[0]}</span>
              <div className="flex gap-4 items-center">
                <h2 className="text-[17px] font-semibold flex items-center ">
                  <span>{parseInt(calculateDiscountedPrice(book?.books?.price, book?.books?.discount))}</span>
                  <TbCurrencyTaka size={22}></TbCurrencyTaka>
                </h2>
                <del className="text-[17px] font-semibold text-gray-600 flex items-center">
                  <span>{book?.books?.price}</span>
                  <TbCurrencyTaka size={22}></TbCurrencyTaka>
                </del>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between  text-sm lg:text-base">
              <Link href={`/book/${book?.books?._id}`} className="rounded-lg bg-[#49B2FF] px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">View Details</Link>
              <button onClick={() => handleAddtoCart(book?._id, book?.books)} className="rounded-lg bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600">Add to Cart</button>

            </div>
          </div>)
        }
      </div>

    </div>
  )
}

export default MyWishlist;