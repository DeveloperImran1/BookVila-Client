"use client"
import { LuMinus, LuPlus } from "react-icons/lu";
import { TbCurrencyTaka, TbTruckDelivery } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { removeCartBook } from "@/hooks/localStorage";

const TableCard = ({ item, calculateDiscountedPrice, setTotalBook, totalBook, setTotalPrice, totalPrice, refetch }) => {
    const [singleBookTotal, setSingleBookTotal] = useState(1);
    const discountedPrice = calculateDiscountedPrice(item?.books?.price, item?.books?.discount);
    const [singleBookTotalPrice, setSingleBookTotalPrice] = useState(discountedPrice);
    const axiosPublic = useAxiosPublic()


    const handleDelete = async()=> {
        removeCartBook(item)
        refetch()
    }
    return (
        <div className="flex justify-between">
            <td className='px-0 md:px-4 py-3'>
                <div className="w-full">
                    <div className="flex w-full overflow-hidden">
                        <Link href={`/book/${item?._id}`} >
                            <div className="h-full w-16 sm:min-w-24 sm:w-24 hover:opacity-80 relative rounded">
                                <Image width={500} height={5000} className='object-contain rounded absolute h-full w-full inset-0 text-transparent' src={item?.books?.coverImage || "https://pathokpoint.com/_next/image?url=%2Fdefault%2Fbook.png&w=384&q=75"} alt="" />
                            </div>
                        </Link>
                        <div className="flex flex-col ml-3">
                            <Link href={`/book/${item?._id}`}>
                                <h1 className='font-semibold hover:underline'>{item?.books?.bookName?.[0]}<span className='ml-1 text-xs text-[rgb(54,55,57)] font-normal text-opacity-100'>({item?.books?.format}) </span> </h1>
                            </Link>
                            <h3 className="flex gap-x-1 items-center mt-1.5 text-xs text-[rgb(120,121,123)] font-bn">by <Link href={`/writer/${item?.books?.authorInfo?.authorID}`} className="hover:underline">{item?.books?.authorInfo?.name?.[0]}</Link></h3>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                {
                                    item?.books?.subCategory?.includes("টপ ট্রেন্ডস") && <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                        বেস্ট সেলার
                                    </div>
                                }
                                {
                                    item?.books?.subCategory?.includes("মাস্ট রিড কালেকশন") && <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                        মাস্ট রিড কালেকশন
                                    </div>
                                }
                                {
                                    item?.books?.subCategory?.includes("সেলফ ডেভেলপমেন্ট") && <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                        সেলফ ডেভেলপমেন্ট
                                    </div>
                                }
                                {
                                    item?.books?.subCategory?.includes("শিশুদের বই") && <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                        শিশুদের বই
                                    </div>
                                }
                                {
                                    item?.books?.subCategory?.includes("কমিকস") && <div className="badge block font-semibold text-xxs sm:text-xs whitespace-nowrap text-primary bg-primary/10 ">
                                        কমিকস
                                    </div>
                                }

                            </div>
                            <h3 className='mt-1.5 text-[rgb(242,33,58)] text-xs'>{item?.books?.stock || 0} Items in stock</h3>
                        </div>
                    </div>
                </div>
            </td>
            <td className='px-0 md:px-4 py-3'>
                <div className="flex flex-col lg:flex-row md:justify-between gap-4">
                    <div className="flex lg:flex-col items-baseline justify-end lg:justify-center gap-3">
                        <div className="flex">
                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                            <span className='block text-sm'>
                                {
                                    discountedPrice
                                }
                            </span>
                        </div>
                        <del className="flex">
                            <TbCurrencyTaka className='text-lg -mr-0.5' />
                            <p className='block text-sm'>
                                {item?.books?.price}
                            </p>
                        </del>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => {
                                    if (singleBookTotal > 1) {
                                        setSingleBookTotal((prevTotal) => {
                                            const newTotal = prevTotal - 1;
                                            const priceReduction = discountedPrice;
                                            setSingleBookTotalPrice(newTotal * discountedPrice);
                                            setTotalBook(totalBook - 1);
                                            setTotalPrice(totalPrice - priceReduction);
                                            return newTotal;
                                        });
                                    }
                                    else{
                                        toast.error("Sorry! Unavailable in stock 😢")
                                    }
                                }}
                                className='btn btn-xs bg-slate-200 rounded w-[30px] h-[30px]'>
                                <LuMinus />
                            </button>
                            {/* <input className="text-center bg-slate-200 rounded text-xs w-[42px] h-[30px] mx-1 outline-none border-none"  value="1" /> */}
                            <p className="flex flex-col items-center justify-center bg-slate-200 rounded w-[42px] h-[30px] mx-1 outline-none border-none">{singleBookTotal}</p>
                            <button onClick={() => {
                            if(item?.books?.stock > singleBookTotal){
                                setSingleBookTotal((prevTotal) => {
                                    const newTotal = prevTotal + 1;
                                    const priceIncrease = discountedPrice;
                                    setSingleBookTotalPrice(newTotal * discountedPrice);
                                    setTotalBook(totalBook + 1);
                                    setTotalPrice(totalPrice + priceIncrease);
                                    return newTotal;
                                });
                            }
                            else{
                                toast.error("Sorry! Unavailable in stock 😢")
                            }
                            }} className='btn btn-xs bg-slate-200 rounded w-[30px] h-[30px]'>
                                <LuPlus />
                            </button>
                        </div>
                        <div className="flex items-center justify-end gap-5 lg:gap-7">
                            <div className="font-semibold text-secondary">
                                <div className="flex items-center">
                                    <TbCurrencyTaka className='text-lg -mr-0.5' />
                                    <span className='text-base'>{singleBookTotalPrice}</span>
                                </div>
                            </div>
                            <div onClick={handleDelete} className="cursor-pointer text-gray-600 hover:text-gray-700">
                                <MdDeleteForever className='text-2xl' />
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </div>
    );
};

export default TableCard;