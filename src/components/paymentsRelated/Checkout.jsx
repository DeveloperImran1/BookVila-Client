"use client"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";

const Checkout = () => {
    const axiosPublic = useAxiosPublic();
    const session = useSession();
    const email = session?.data?.user?.email;
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const lastPathSegment = pathname?.split('/').filter(Boolean).pop();


    // get this order info

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['myOrder', email],
        queryFn: async () => {
            const result = await axiosPublic.get(`getMyOrderWithId/${lastPathSegment}`)
            return result?.data;
        }
    })
    console.log("orders is", data)

    const handleCreatePayment = async (e) => {
        e.preventDefault();
        const orderInfo = {
            userEmail: "imran112@gmail.com",
            orderId: lastPathSegment,
            totalPayment: data?.[0]?.totalPayment
        }
        console.log("handle payment is triggered")
        const result = await axiosPublic.post('/createPayment', orderInfo)
        console.log("result is ", result)
        const redirectUrl = result?.data?.paymentUrl;
        if (redirectUrl) {
            window.location.replace(redirectUrl)
        }
    }



    return (
        <div className="py-8">

            <div className="container flex flex-col lg:flex-row gap-4">
                {/* left side  */}
                <div className="w-full max-w-md rounded-lg bg-white  shadow-md dark:bg-zinc-900 p-4">
                    <div className="mb-5">
                        <h2 className="text-[20px] font-semibold tracking-tight">Shipping address </h2>
                    </div>
                    <form onSubmit={handleCreatePayment} className="w-full space-y-4">
                        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                            <label className="block font-medium" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                type="text"
                            />
                        </div>
                        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                            <label className="block font-medium" htmlFor="contact">
                                Contact Number
                            </label>
                            <input
                                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                id="contact"
                                placeholder="Your Phone Number"
                                name="phone"
                                type="number"
                            />
                        </div>

                        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                            <label className="block font-medium" htmlFor="_email">
                                Email
                            </label>
                            <input
                                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                id="_email"
                                placeholder="Your Email"
                                name="email"
                                type="email"
                            />
                        </div>

                        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                            <label className="block font-medium" htmlFor="address">
                                Address
                            </label>
                            <textarea
                                className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                id="address"
                                placeholder="House no, Road no, Area"
                                name="message"
                            />
                        </div>

                        <div className="flex justify-between">

                            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                                <label className="block font-medium" htmlFor="thana">
                                    Thana
                                </label>
                                <input
                                    className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                    id="thana"
                                    placeholder="Thana"
                                    name="thana"
                                    type="text"
                                />
                            </div>
                            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                                <label className="block font-medium" htmlFor="district">
                                    District
                                </label>
                                <select className="  h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700">
                                    <option disabled selected>Select District</option>
                                    {[
                                        "Bagerhat",
                                        "Bandarban",
                                        "Barguna",
                                        "Barisal",
                                        "Bhola",
                                        "Bogra",
                                        "Brahmanbaria",
                                        "Chandpur",
                                        "Chapai Nawabganj",
                                        "Chattogram",
                                        "Chuadanga",
                                        "Cox's Bazar",
                                        "Cumilla",
                                        "Dhaka",
                                        "Dinajpur",
                                        "Faridpur",
                                        "Feni",
                                        "Gaibandha",
                                        "Gazipur",
                                        "Gopalganj",
                                        "Habiganj",
                                        "Jamalpur",
                                        "Jashore",
                                        "Jhalokati",
                                        "Jhenaidah",
                                        "Joypurhat",
                                        "Khagrachari",
                                        "Khulna",
                                        "Kishoreganj",
                                        "Kurigram",
                                        "Kushtia",
                                        "Lakshmipur",
                                        "Lalmonirhat",
                                        "Madaripur",
                                        "Magura",
                                        "Manikganj",
                                        "Meherpur",
                                        "Moulvibazar",
                                        "Munshiganj",
                                        "Mymensingh",
                                        "Naogaon",
                                        "Narail",
                                        "Narayanganj",
                                        "Narsingdi",
                                        "Natore",
                                        "Netrokona",
                                        "Nilphamari",
                                        "Noakhali",
                                        "Pabna",
                                        "Panchagarh",
                                        "Patuakhali",
                                        "Pirojpur",
                                        "Rajbari",
                                        "Rajshahi",
                                        "Rangamati",
                                        "Rangpur",
                                        "Satkhira",
                                        "Shariatpur",
                                        "Sherpur",
                                        "Sirajganj",
                                        "Sunamganj",
                                        "Sylhet",
                                        "Tangail",
                                        "Thakurgaon",
                                    ].map((district) => (
                                        <option key={district}>{district}</option>
                                    ))}
                                </select>
                            </div>



                        </div>

                        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                            <label className="block font-medium" htmlFor="note">
                                Note (if any)
                            </label>
                            <textarea
                                className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
                                id="note"
                                placeholder="extra information"
                                name="note"
                            />
                        </div>
                        {/* <div className='flex  justify-end'>
                            <button

                                type="submit"
                                className={`bg-bg-blue hover:bg-[#4ed9c4]
                                        text-white font-medium py-2 px-4 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105`}

                            >

                                {
                                    loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Update"
                                }
                            </button>
                        </div> */}
                    </form>
                </div>

                {/* right side  */}
                <div className="w-full">
                    <div className="bg-white p-4">
                        {/* order summary  */}
                        <div>
                            <h2 className="text-[20px] mb-5 font-semibold tracking-tight">Order summary</h2>

                            <div className="flex text-[15px] justify-between items-center">
                                <p>Sub total (3 items)</p>
                                <p><span className="text-2xl">৳</span>530</p>
                            </div>
                            <div className="flex text-[15px] justify-between items-center">
                                <p>Delivery charge</p>
                                <p><span className="text-2xl">৳</span>530</p>
                            </div>

                            <hr className="my-3" />
                            <div className="flex text-[15px] justify-between font-semibold items-center">
                                <p>Grand total</p>
                                <p><span className="text-2xl">৳</span>530</p>
                            </div>
                            <div className="flex text-[15px] justify-between  items-center">
                                <p>Pay now</p>
                                <p><span className="text-2xl">৳</span>530</p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white p-4 mt-4">

                        {/* Shipping method */}
                        <div>
                            <h2 className="text-[20px] mb-5 font-semibold tracking-tight">Shipping method</h2>

                            <p className="text-[15px] text-red-600">Address is missing, Please provide your address. </p>
                            <div className="flex text-[15px]  items-center">
                                <p>Sundarban Courier</p>
                                <p className="flex items-center"><TbCurrencyTaka size={19}></TbCurrencyTaka> 530 Taka</p>
                                <p className="flex items-center"><FaRegClock size={19}></FaRegClock> 2-3 days</p>
                                <p>সুন্দরবন অফিস থেকে পার্সেল কালেক্ট করতে হবে</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Checkout;