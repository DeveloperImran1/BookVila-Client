"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";

const MyReview = () => {
    const session = useSession();
    const axiosPublic = useAxiosPublic();
    const myEmail = session?.data?.user?.email;
    const { data: myReview = [] } = useQuery({
        queryKey: ['myReview', myEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getMyReviews/${myEmail}`)
            return res?.data;
        }
    })
    console.log("myReview", myReview)
    return (
        <div className="container">
            {
                <div className="">
                    {
                        myReview?.length < 1 && <div className="flex flex-col items-center justify-center ">
                            <Image className="h-[270px] w-[280px] " height={676} width={1200} src="https://i.postimg.cc/pVj1rn9D/360-F-106646110-Lv-Qrtj1uxmnse1g-GOIFv7-Gh-WSXFv-Z3lk-removebg-preview.png" alt="gift" />
                            <h3 className="text-[20px] font-semibold text-gray-500 my-5 ml-3">You Have Not Review Any Book 🤔</h3>
                            <Link href="/all-book"
                                className="px-3 md:px-5 lg:px-6 py-1 md:py-2 lg:py-3 text-lg bg-[#fe5857] text-white rounded-lg  transition mb-11">
                                Give a Review
                            </Link>
                        </div>
                    }
                </div>
            }
            <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {
                    myReview?.map(review => <div key={review?._id} className=" flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md shadow-md">
                        <div className="flex justify-between p-4">
                            <div className="flex space-x-4">
                                <div>
                                    <Image height={676} width={1200} src={review?.userImage || 'https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png'} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{review?.user || 'anonymus'}</h4>
                                    <span className="text-xs dark:text-gray-600">{formatDistanceToNow(new Date(review?.createdAt), { addSuffix: true })}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 dark:text-yellow-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                                    <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                                </svg>
                                <span className="text-xl font-bold">{review?.rating || 5}</span>
                            </div>
                        </div>
                        {
                            review?.bookPhoto?.length > 0 && <Swiper
                                modules={[]}
                                className="mySwiper border-2 w-[150px] rounded-md"
                            >
                                {
                                    review?.bookPhoto?.map((item, index) => <SwiperSlide key={index}>
                                        <Image src={item || 'https://i.postimg.cc/jC0Wbpym/pngtree-educational-learning-books-png-image-3851016-removebg-preview.png'} height={676} width={1200} alt="book" className="w-[150px] h-[200px] mx-auto"></Image>
                                    </SwiperSlide>)
                                }


                            </Swiper>

                        }
                        <div className="p-4 space-y-2 text-sm dark:text-gray-600">
                            <p>{review?.comment}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyReview;