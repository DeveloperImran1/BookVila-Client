"use client"
import { LuMinus, LuPlus } from "react-icons/lu";
import { TbCurrencyTaka, TbTruckDelivery } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { CiDiscount1 } from "react-icons/ci";
import { HiArrowNarrowRight } from "react-icons/hi";
import useMyCartBooks from "@/hooks/useCartBooks";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { useSession } from "next-auth/react";

const LeftSide = () => {
    const axiosPublic = useAxiosPublic();
    const [favorutes, setFavorutes] = useState([]);
    const [addToCart, setAddToCart] = useState([]);
    const { data, refetch } = useMyCartBooks();
    const [totalBook, setTotalBook] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [delivery, setDelivery] = useState(60);

    const [offerTotal, setOfferTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const session = useSession();

    console.log(data)
    useEffect(() => {
        if (data) {
            let initialTotalBooks = 0;
            let initialTotalPrice = 0;
    
            data.forEach((item) => {
                const discountedPrice = calculateDiscountedPrice(item.books.price, item.books.discount);
                initialTotalBooks += 1; // Assuming each item is 1 book initially
                initialTotalPrice += discountedPrice;
            });
    
            setTotalBook(initialTotalBooks);
            setTotalPrice(initialTotalPrice);
      
        }
    }, [data]);

    useEffect(()=> {
        if(offerTotal > 1500){
            setGrandTotal(totalPrice)
            setOfferTotal(totalPrice)
        }else{
            setGrandTotal(totalPrice + delivery)
            setOfferTotal(totalPrice + delivery)
        }
      
    }, [totalPrice, offerTotal])
    
    // Calculate discounted price
    function calculateDiscountedPrice(price, discountPercentage) {
        return Math.round(price - (price * discountPercentage) / 100);
    }

  
    // const handleOrder = async ()=> {
    //     const result = await axiosPublic.get(`/getMyAddToCart/${session?.data?.user?.email}`)
    //     return result?.data;
    // }


    return (
        <>
            <div className=' mx-auto  px-0 '>
                <div className="flex flex-col container md:flex-row  gap-x-2.5 py-5 md:py-10 ">
                    <div className="flex-1 bg-white">
                        {/* // left side  */}
                        <div className='bg-white w-full p-4 sm:p-6 md:p-7 lg:p-10'>
                            <h1 className="text-sm sm:text-xl font-inter font-semibold">My cart</h1>
                            <div className="mt-3 sm:mt-5 md:mt-6 lg:mt-8 overflow-scroll">
                                <table className='table table-px-0 border-t'>
                                    <tbody>
                                        {data?.map((item) => (
                                            <tr key={item?._id}>
                                                <TableCard item={item} calculateDiscountedPrice={calculateDiscountedPrice} setTotalBook={setTotalBook} totalBook={totalBook} setTotalPrice={setTotalPrice} totalPrice={totalPrice} refetch={refetch} ></TableCard>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white w-full md:w-64 lg:w-96 p-4 sm:p-6 md:p-7 lg:p-10">
                        {/* // right side */}

                        <h1 className="font-semibold sm:text-lg md:text-xl">Order summary</h1>
                        {/* Table */}
                        <table className="mt-2 sm:mt-3 lg:mt-5 table text-xs table-px-0 dropdown">
                            <tbody>
                                {/* Sub total (5 items)	 */}
                                <tr>
                                    <td className='p-0 text-gray-700'>
                                        <span className='mr-1'>Sum total </span>
                                        <span>({totalBook || 0} Items)</span>
                                    </td>
                                    <td></td>
                                    <td className='w-10'>
                                        <div className="flex">
                                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                                            <span className='block text-sm'>{totalPrice || 0}</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Delivery charge	 */}
                                <tr>
                                    <td className='p-0 text-gray-700'>
                                        <div className="flex items-center">
                                            <p className='mr-2'>Delivery charge </p>
                                            <TbTruckDelivery className='text-base mt-1' />
                                        </div>
                                    </td>
                                    <td></td>
                                    <td className='w-10'>
                                        <div className="flex">
                                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                                            <span className='block text-sm'>{delivery}</span>
                                        </div>
                                    </td>
                                </tr>
                                {/* Grand total	 */}
                                <tr className='font-bold text-xs'>
                                    <td className='p-0 text-gray-700'>
                                        <p className=''>Grand total</p>
                                    </td>
                                    <td></td>
                                    <td className='w-10'>
                                        <div className="flex">
                                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                                            <span className='block text-sm'>{grandTotal || 0}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* discount card  */}
                        <div className="mt-10 rounded border font-semibold text-black border-primary">
                            <div className="">
                                {/* ENGLISH10 */}
                                <div className="text-xs p-2 cursor-pointer group">
                                    <div className="flex items-center text-primary gap-1">
                                        <div className="">
                                            <CiDiscount1 />
                                        </div>
                                        <span className='group-hover:underline'>New Year Discount: 10% Off</span>
                                    </div>
                                    <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">NEW YEAR 2025 কুপন কোড ব্যবহার করলে মোট মূল্যের উপর ১০% ডিসকাউন্ট। ঢাকা ও ঢাকার বাইরে ডেলিভারি চার্জ মাত্র ৬০ টাকা।</p>
                                </div>
                                <div className="border-b border-dashed border-b-black05"></div>
                                {/* FREE DELIVERY: */}
                                <div className="text-xs p-2 cursor-pointer group">
                                    <div className="flex items-center text-primary gap-1">
                                        <div className="">
                                            <CiDiscount1 />
                                        </div>
                                        <span className='group-hover:underline'>FREEDELIVERY :</span>
                                    </div>
                                    <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">১৫০০ টাকার বই অর্ডার করলে ফ্রি ডেলিভারি।</p>
                                </div>
                            </div>
                        </div>


                        {/* Promo code  */}
                        <div className="mt-5">
                            <h3 className="font-medium text-sm">Promo code</h3>
                            <div className="mt-4 flex gap-2">
                                <input onKeyUp={(e)=> {
                                    if(e.target.value === "NEW YEAR 2025"){
                                        setGrandTotal(Math.round(offerTotal - (offerTotal * 10) / 100))
                                        
                                    }else{
                                        setGrandTotal(offerTotal)
                                    }
                                }} className="min-w-0 w-full pl-4 h-11 border bg-[#f5f5f5] border-[rgb(226,226,226)] outline-none rounded-sm" type="text" />
                                <button className="btn btn-sm h-11 bg-primary text-white min-w-20">Apply</button>
                            </div>
                        </div>


                        {/* Order summary  */}
                        <button className="mt-14 btn hover:bg-primary/55 text-white bg-primary w-full">
                            <div className="flex gap-x-1 items-center">
                                <span>Checkout</span>
                                <HiArrowNarrowRight className="text-base" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>




        </>

    );
};

export default LeftSide;