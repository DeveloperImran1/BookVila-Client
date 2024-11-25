"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";


export const MyOrder = () => {
    const axiosPublic = useAxiosPublic();
    const session = useSession();
    const email = session?.data?.user?.email;
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['myOrder', email],
        queryFn: async () => {
            const result = await axiosPublic.get(`/getMyOrder/${email}`)
            return result?.data;
        }
    })
    console.log("My orders is", data)
    return (
        <div className='bg-white p-4 '>
            <p className="text-[17px] font-semibold mb-6">My Total Orders: {data?.length || 0}</p>
            {
                data?.length < 1 && <div className="flex flex-col items-center justify-center ">
                    <Image className="h-[230px] w-[240px] " height={676} width={1200} src="https://i.postimg.cc/PJX8X2QK/46524b382087d63a209441765be9eb5b-removebg-preview.png" alt="gift" />
                    <h3 className="text-[20px] font-semibold text-gray-500 my-5 ml-3">You Have Not Order Any Book 🤔</h3>
                    <Link href="/all-book"
                        className="px-3 md:px-5 lg:px-6 py-1 md:py-2 lg:py-3 text-lg bg-[#fe5857] text-white rounded-lg  transition">
                        Order Now
                    </Link>
                </div>
            }
            {
                data?.map(order => (
                    <div key={order?._id}>
                        <div className="flex flex-col lg:flex-row gap-4 items-start">

                            <Swiper
                                modules={[]}
                                className="mySwiper border-2 w-[150px] rounded-md"
                            >
                                {
                                    order?.items?.map((item, index) => <SwiperSlide key={index}>
                                        <Image src={item?.bookPhoto || 'https://i.postimg.cc/jC0Wbpym/pngtree-educational-learning-books-png-image-3851016-removebg-preview.png'} height={676} width={1200} alt="book" className="w-[150px] h-[200px] mx-auto"></Image>
                                    </SwiperSlide>)
                                }


                            </Swiper>

                            <div className="flex flex-col items-start justify-between  w-full h-[200px]">
                                <div className="w-full ">
                                    <div className="flex flex-col md:flex-row justify-between w-full ">
                                        <h3 className="text-[16px] ">Your Order ID: <span className="text-primary">{order?.orderId}</span>  <span>({formatDistanceToNow(new Date(order?.timestamps?.createdAt), { addSuffix: true })})</span></h3>

                                        <p>Payable Amount: <span className="text-primary">TK. {order?.totalPayment}</span></p>
                                    </div>
                                    <div className="flex justify-between  w-full items-center my-1">
                                        <div>
                                            {
                                                order?.items?.map((item, index) => <h3 key={index} className="text-[16px] ">{item?.name || 'book name...'}<span> ({item?.quantity || 0} Items)</span> <span>{item?.totalPrice} Taka</span></h3>)
                                            }
                                        </div>



                                        <button className={`${order?.status === 'Cancelled' ? 'cursor-not-allowed bg-gray-500' : 'bg-bg-blue hover:bg-[#4ed9c4]'} 
                                     text-white font-medium py-1 px-2 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}>
                                            {
                                                order?.status === 'Cancelled' ? <span>Cancled</span> : <span>Cancle <span className="hidden sm:inline ">Order</span></span>
                                            }

                                        </button>
                                    </div>
                                </div>
                                {
                                    order?.status === 'Pending' ? <ul className="steps mx-auto px-5">
                                        <li className="step  step-accent">Pending</li>
                                        <li className="step ">Processing</li>
                                        <li className="step ">Shipped</li>
                                        <li className="step">Delivered</li>
                                        <li className="step">Cancelled</li>
                                    </ul> : ""
                                }
                                {
                                    order?.status === 'Processing' ? <ul className="steps mx-auto px-5">
                                        <li className="step  step-accent">Pending</li>
                                        <li className="step step-accent">Processing</li>
                                        <li className="step ">Shipped</li>
                                        <li className="step">Delivered</li>
                                        <li className="step">Cancelled</li>
                                    </ul> : ""
                                }
                                {
                                    order?.status === 'Shipped' ? <ul className="steps mx-auto px-5">
                                        <li className="step  step-accent">Pending</li>
                                        <li className="step step-accent">Processing</li>
                                        <li className="step step-accent">Shipped</li>
                                        <li className="step">Delivered</li>
                                        <li className="step">Cancelled</li>
                                    </ul> : ""
                                }
                                {
                                    order?.status === 'Delivered' ? <ul className="steps mx-auto px-5">
                                        <li className="step  step-accent">Pending</li>
                                        <li className="step step-accent">Processing</li>
                                        <li className="step step-accent">Shipped</li>
                                        <li className="step step-accent">Delivered</li>
                                        <li className="step">Cancelled</li>
                                    </ul> : ""
                                }
                                {
                                    order?.status === 'Cancelled' ? <ul className="steps mx-auto px-5">
                                        <li className="step  step-accent">Pending</li>
                                        <li className="step step-accent">Cancelled</li>
                                    </ul> : ""
                                }

                            </div>
                        </div>
                        <p className="my-[30px] w-full border-[1px] text-gray-500"></p>
                    </div>
                ))
            }



        </div>
    )
}



