"use client"
import { uploadCloudinary } from "@/hooks/upload";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";


import { formatDistanceToNow } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';

const ReviewPage = ({ book }) => {

    const totalRating = book?.rating?.reduce(((prevRating, sum) => prevRating + sum), 0)
    const sumOfRating = parseInt(totalRating / book?.rating?.length);
    const [userRating, setUserRating] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(true);

    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showName, setShowName] = useState({})
    const axiosPublic = useAxiosPublic();
    const { data } = useAuth();
    const router = useRouter();

    // Handle file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            // Create a URL for the selected file to display as an image
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };


    const session = useSession();
    const myEmail = session?.data?.user?.email;
    const { data: myReview = [] } = useQuery({
        queryKey: ['myReview', book?._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getReview/${book?._id}`)
            return res?.data;
        }
    })
    console.log("myReview", myReview)


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data) {
            return toast.error("Sorry! before login now 😢").then(router?.push('/login'))
        }
        setLoading(true)
        const message = e.target.message.value;
        const image = links?.[0]


        // image upload in cloudinary
        let ImageArr = [];
        try {

            for (let i = 0; i < images.length; i++) {
                const data = await uploadCloudinary(images[i])
                ImageArr.push(data?.url)
            }
            setLinks(ImageArr)
        }
        catch (error) {
            console.log(error)
        }

        const reviewObj = { user: data?.name, userEmail: data?.email, userImage: data?.photo, bookPhoto: ImageArr, rating: userRating, comment: message, bookId: book?._id }
        // const res = await axiosPublic.post(`/`);

        console.log("reviewObj ", reviewObj)
        setLoading(false)

    };





    return (
        <div>
            {/* Feedback Section */}
            <div className=' my-[30px] bg-white shadow-xl rounded-xl p-4 lg:p-6 2xl:p-10'>
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-start">Reviews and Ratings</h2>

                    <div className="flex flex-col items-center">
                        <h2 className="text-[28px]  text-gray-800 mb-4 text-start">5.00</h2>

                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className='w-7 cursor-pointer' viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        fill={star <= sumOfRating ? "#f2b00a" : "#94a3b8"} />
                                </svg>
                            ))}
                        </div>
                        <h2 className=" font-semibold text-gray-700 mb-4 text-start">Total {book?.rating?.length} Ratings</h2>

                    </div>
                </div>

                <div className=' flex flex-col lg:flex-row justify-between '>
                    <div className=''>
                        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                            <div className="w-full flex flex-col justify-center items-center ">
                                <Image src={selectedImage || "https://i.postimg.cc/GtsM2qQ0/pngtree-educational-learning-books-png-image-3851016.jpg"} height={500} width={1200} alt="Profile Image" id="img" className="h-[100px] w-[100px] rounded-3xl" />
                                <div onChange={handleImageChange} className="my-4 flex justify-center">
                                    <label className="flex h-full w-max items-end gap-4 rounded-md bg-cyan-500 px-6 py-4 text-white active:ring-4 " htmlFor="file">
                                        <svg width={30} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Complete"><g id="upload"><g><path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><g><polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline><line fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="16.3" y2="4.8"></line></g></g></g></g></g>
                                        </svg>
                                        <p className="text-lg font-medium text-white"> {showName.name ? showName?.name?.slice(0, 20) : 'Upload'}</p>
                                    </label>
                                    <input
                                        type="file"
                                        multiple={true}
                                        placeholder="Your Image"
                                        onChange={(e) => {
                                            setImages(e.target.files)
                                            if (e.target.files && e.target.files[0]) {
                                                const imageFile = e.target.files[0];
                                                setShowName(imageFile)
                                            }
                                        }} className="hidden" id="file" />
                                </div>

                            </div>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} onClick={() => setUserRating(star)} className='w-7 cursor-pointer' viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                            fill={star <= userRating ? "#f2b00a" : "#94a3b8"} />
                                    </svg>
                                ))}
                            </div>
                            <textarea
                                className='w-full lg:w-[450px] p-4  border-2 rounded-lg my-4'
                                placeholder='Write your feedback here...'
                                name="message"
                            ></textarea>


                            <button type='submit' className='bg-primary text-white px-4 py-2  rounded-lg'>
                                {
                                    loading ? <p className="flex flex-col justify-center items-center"><TbFidgetSpinner size={22} className="text-white animate-spin "></TbFidgetSpinner></p> : "Submit Feedback"
                                }
                            </button>
                        </form>
                    </div>
                    <div className=''>
                        <Image src="https://img.freepik.com/free-vector/flat-design-feedback-concept_23-2148944236.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721520000&semt=ais_user"
                            height={200}
                            width={200}
                            alt="feedback image"
                            className='h-72 w-96'
                        />
                    </div>
                </div>
            </div>

            {/* review show section  */}

            <div className="bg-white shadow-xl rounded-xl ">
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
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 h-full pt-[50px] ">
                    {
                        showAll ? myReview?.slice(0, 4)?.map(review => <div key={review?._id} className=" flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md ">
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
                        </div>) : myReview?.map(review => <div key={review?._id} className=" flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md shadow-md">
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

                <div className='w-full flex justify-center items-center'>
                    <button onClick={() => setShowAll(!showAll)} className='bg-primary text-white px-4 py-2  rounded-lg my-6 '>
                        Show All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;