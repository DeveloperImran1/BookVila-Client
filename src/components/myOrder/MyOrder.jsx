"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image"


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
                data?.map(order => (
                    <div>
                        <div className="flex flex-col lg:flex-row gap-4 items-start">
                            <Image src="https://pathokpoint.com/_next/image?url=https%3A%2F%2Fpathokpoint.s3.ap-southeast-1.amazonaws.com%2Fbook%2F202-2168.jpg&w=1920&q=75" height={676} width={1200} alt="book" className="w-[150px] h-[200px] mx-auto"></Image>
                            <div className="flex flex-col items-start justify-between  w-full h-[200px]">
                                <div className="w-full ">
                                    <div className="flex justify-between w-full items-center">
                                        <h3 className="text-[16px] ">Your Order ID: <span className="text-primary">{order?.orderId}</span>  <span>({order?.items?.length || 0} Items)</span></h3>

                                        <p>Payable Amount: <span className="text-primary">TK. 199</span></p>
                                    </div>
                                    <div className="flex justify-between  w-full items-center my-1">
                                        <h3 className="text-[16px] ">ইংলিশে দুর্বলদের জন্য Eng </h3>


                                        <button className="bg-bg-blue hover:bg-[#4ed9c4]
                                     text-white font-medium py-1 px-2 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105">
                                            Cancle <span className="sm:hidden ">Order</span>
                                        </button>
                                    </div>
                                </div>
                                <ul className="steps mx-auto px-5">
                                    <li className="step  step-accent ">Pending</li>
                                    <li className="step  step-accent ">Processing</li>
                                    <li className="step step-accent">Shipped</li>
                                    <li className="step">Delivered</li>
                                    <li className="step">Cancelled</li>
                                </ul>
                            </div>
                        </div>
                        <p className="my-[30px] w-full border-[1px] text-gray-500"></p>
                    </div>
                ))
            }



        </div>
    )
}


