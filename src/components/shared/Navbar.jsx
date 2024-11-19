"user client"
import { useEffect, useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import Swal from 'sweetalert2';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import { Button, Drawer, DrawerAction, DrawerContent, Skeleton, SkeletonLine } from 'keep-react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiLogIn } from 'react-icons/fi';
import { AiOutlinePhone } from 'react-icons/ai';
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaClipboardList, FaHeart, FaStar, FaSignOutAlt, FaInfoCircle, FaPhone } from 'react-icons/fa';
import { Button, Drawer, DrawerAction, DrawerContent, Skeleton, SkeletonLine } from 'keep-react'
import { signOut, useSession } from "next-auth/react";
import { IoCartSharp } from "react-icons/io5";
import useMyCartBooks from "@/hooks/useCartBooks";

const Navbar = () => {
    const [show, setShow] = useState(false)
    const [subject, setSubject] = useState(false)
    const [books, setBooks] = useState(false)
    const [bookWriters, setBookWriters] = useState(false)
    const [bookPublications, setBookPublications] = useState(false)
    const { data, refetch, isLoading } = useMyCartBooks();

    const session = useSession();
    const user = session?.data?.user;

    console.log(session)
    const handleLogOut = () => {
        signOut()
        Swal ("Logout", "You have Login Out", "success");
        navigate("/login")
    }

    const boiShomogro = [
        "মহাকালের কণ্ঠ",
        "গোয়েন্দা কাহিনী সমগ্র",
        "ভূতের গল্প",
        "নক্ষত্রের রাত",
        "জীবনের জলছবি",
        "বাংলা সাহিত্যের ইতিহাস",
        "ইতিহাসের অজানা অধ্যায়",
        "গণিতের আনন্দ",
        "পাখিদের নিয়ে গল্প",
        "ভূগোলের বিস্ময়",
        "শিশুতোষ গল্পসমগ্র",
        "রহস্যময় পৃথিবী",
        "প্রাণীর কাহিনী",
        "বিজ্ঞানের বিস্ময়",
        "বিশ্বের সেরা উপন্যাস",
        "রবীন্দ্রনাথের কবিতা",
        "প্রাচীন মিসরের ইতিহাস",
        "যুগান্তরের কবিতা",
        "অ্যালিস ইন ওয়ান্ডারল্যান্ড (বাংলা অনুবাদ)",
        "বাংলা প্রবাদ প্রবচন",
        "আধুনিক বাংলার কথা",
        "চর্যাপদ ও প্রাচীন সাহিত্য",
        "বাংলাদেশের মুক্তিযুদ্ধের গল্প",

    ];

    // বিষয়ের নামের অ্যারে
    const subjects = [
        "উপন্যাস",
        "কবিতা",
        "গল্প",
        "ইতিহাস",
        "বিজ্ঞান",
        "দর্শন",
        "ধর্ম",
        "জীবনী",
        "শিশুসাহিত্য",
        "কৃষি",
        "ভ্রমণকাহিনী",
        "রাজনীতি",
        "সমাজবিজ্ঞান",
        "প্রযুক্তি",
        "চিকিৎসাশাস্ত্র",
        "গণিত",
        "আইন",
        "সাহিত্য",
        "শিল্প ও সংস্কৃতি",
        "ভৌগোলিক গবেষণা"
    ];

    // লেখকের নামের অ্যারে
    const writers = [
        "হুমায়ুন আহমেদ",
        "জহির রায়হান",
        "রবীন্দ্রনাথ ঠাকুর",
        "কাজী নজরুল ইসলাম",
        "আবুল বাশার",
        "সৈয়দ মুজতবা আলী",
        "সুনীল গঙ্গোপাধ্যায়",
        "আবুল মনসুর আহমদ",
        "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
        "মুহম্মদ জাফর ইকবাল",
        "শীর্ষেন্দু মুখোপাধ্যায়",
        "আনিসুল হক",
        "আহমদ ছফা",
        "অনীশ দাস অপু",
        "বেগম রোকেয়া",
        "ফয়েজ আহমেদ",
        "মীর মশাররফ হোসেন",
        "তসলিমা নাসরিন",
        "জাকির তালুকদার",
        "প্রেমচাঁদ"
    ];

    // প্রকাশনীর নামের অ্যারে
    const publications = [
        "প্রথমা প্রকাশন",
        "অন্যপ্রকাশ",
        "আনন্দ পাবলিশার্স",
        "বাংলা একাডেমি",
        "বিদ্যাপ্রকাশ",
        "ইত্যাদি গ্রন্থ প্রকাশ",
        "কাকলী প্রকাশনী",
        "পাঠক সমাবেশ",
        "মাওলা ব্রাদার্স",
        "সাহিত্য প্রকাশ",
        "অনন্যা প্রকাশনী",
        "অন্তর্জলী প্রকাশন",
        "বঙ্গপ্রকাশ",
        "সৃজনশীল প্রকাশনী",
        "সম্প্রতি প্রকাশনী",
        "জ্ঞানভবন প্রকাশনী",
        "বিশ্বসাহিত্য কেন্দ্র",
        "শিখা প্রকাশনী",
        "বর্ণমালা প্রকাশনী",
        "সাহিত্য সংসদ"
    ];





    return (
        <div className="">


            <div className="bg-[#ffffff]">
                <nav className="flex items-center justify-between container  text-black font-semibold ">

                    {/* drawer section  */}
                    <div className=" cursor-pointer rounded-2xl flex items-center text-xl font-semibold max-w-[50%]">

                        <Drawer className="text-black border-2">
                            <DrawerAction asChild>
                                <p className="bg-gray-300 p-1 rounded-md md:hidden">
                                    <IoReorderThree size={28} />
                                </p>
                            </DrawerAction>

                            <DrawerContent
                                position="left"
                                className="w-full max-w-[70%] md:max-w-full flex flex-col justify-between  h-[100vh] overflow-scroll"
                            >
                                <div className="flex flex-col bg-white pt-[10px] pb-[50px] rounded-md justify-between items-center">
                                    <Link href="/">
                                        <Image height={676} width={1200}
                                            src="https://i.ibb.co.com/SfNwSrp/Whats-App-Image-2024-10-10-at-11-12-02-PM-removebg-preview-1.png"
                                            className="w-[100px] h-[100px] scale-100 text-white transition-all duration-200 hover:scale-110"
                                            alt="logo"
                                        />
                                    </Link>
                                    <hr className="border-[1px] my-[18px] w-full" />
                                    {/* books list  */}
                                    <div className="w-full flex flex-col">
                                        {/* Main Subject Link */}
                                        <Link href=""
                                            onClick={() => setBooks(!books)}
                                            className={`${books ? 'bg-bg-blue text-white' : ''
                                                } py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                        >
                                            <p>Books</p>
                                            {books ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </Link>

                                        <ul className={`${books ? 'flex ' : 'hidden'
                                            } py-2 flex-col ml-4 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-auto `} aria-labelledby="multiLevelDropdownButton">

                                            {boiShomogro?.map((sub, index) => (
                                                <Link href=""
                                                    key={index}
                                                    className="py-2 px-3 font-semibold w-[90%] hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center"
                                                >
                                                    <p>{sub}</p>
                                                </Link>
                                            ))}

                                        </ul>

                                    </div>

                                    {/* subject list  */}
                                    <div className="w-full flex flex-col">

                                        <Link href=""
                                            onClick={() => setSubject(!subject)}
                                            className={`${subject ? 'bg-bg-blue text-white' : ''
                                                } py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                        >
                                            <p>Subjects</p>
                                            {subject ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </Link>

                                        <ul className={`${subject ? 'flex ' : 'hidden'
                                            } py-2 flex-col ml-4 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-auto `} aria-labelledby="multiLevelDropdownButton">

                                            {subjects?.map((sub, index) => (
                                                <Link href=""
                                                    key={index}
                                                    className="py-2 px-3 font-semibold w-[90%] hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center"
                                                >
                                                    <p>{sub}</p>
                                                </Link>
                                            ))}

                                        </ul>

                                    </div>

                                    {/* writer list  */}
                                    <div className="w-full flex flex-col">

                                        <Link href=""
                                            onClick={() => setBookWriters(!bookWriters)}
                                            className={`${bookWriters ? 'bg-bg-blue text-white' : ''
                                                } py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                        >
                                            <p>Writers</p>
                                            {bookWriters ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </Link>

                                        <ul className={`${bookWriters ? 'flex ' : 'hidden'
                                            } py-2 flex-col ml-4 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-auto `} aria-labelledby="multiLevelDropdownButton">

                                            {writers?.map((sub, index) => (
                                                <Link href=""
                                                    key={index}
                                                    className="py-2 px-3 font-semibold w-[90%] hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center"
                                                >
                                                    <p>{sub}</p>
                                                </Link>
                                            ))}

                                        </ul>

                                    </div>

                                    {/* publication list */}
                                    <div className="w-full flex flex-col">
                                        {/* Main Subject Link */}
                                        <Link href=""
                                            onClick={() => setBookPublications(!bookPublications)}
                                            className={`${bookPublications ? 'bg-bg-blue text-white' : ''
                                                } py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                        >
                                            <p>Publications</p>
                                            {bookPublications ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </Link>

                                        <ul className={`${bookPublications ? 'flex ' : 'hidden'
                                            } py-2 flex-col ml-4 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-auto `} aria-labelledby="multiLevelDropdownButton">

                                            {publications?.map((sub, index) => (
                                                <Link href=""
                                                    key={index}
                                                    className="py-2 px-3 font-semibold w-[90%] hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center"
                                                >
                                                    <p>{sub}</p>
                                                </Link>
                                            ))}

                                        </ul>

                                    </div>

                                </div>


                                {/* bottom section of sidebar */}
                                <div className="flex flex-col">
                                    <hr className="border-[1px] my-[18px] w-full" />

                                    <Link href="" className={` py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                    >
                                        <p>Contact Us</p>
                                        <AiOutlinePhone></AiOutlinePhone>
                                    </Link>
                                    {
                                        user ? <div onClick={handleLogOut} className={` py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}>
                                            <p>Logout</p>
                                            <FiLogIn></FiLogIn>
                                        </div> :  <div className={` py-3 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex justify-between items-center`}
                                    >
                                        <p>Login</p>
                                        <FiLogIn></FiLogIn>
                                    </div>
                                    }
                               
                                  
                                </div>
                            </DrawerContent>
                        </Drawer>


                        <Link href="/"> <Image height={676} width={1200} src="https://i.ibb.co.com/SfNwSrp/Whats-App-Image-2024-10-10-at-11-12-02-PM-removebg-preview-1.png" className="w-[60px] h-[60px] scale-100 text-white transition-all duration-200 hover:scale-110 " alt="logo" /></Link>
                    </div>


                    <div className="flex items-center justify-between gap-16">
                        <ul className="hidden md:flex items-center justify-between gap-7">
                            <li className="group flex  cursor-pointer flex-col">
                                Home <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-bg-blue transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="group flex  cursor-pointer flex-col">
                                Pages <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-bg-blue transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="group flex  cursor-pointer flex-col">
                                Products <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-bg-blue transition-all duration-300 group-hover:w-full"></span>
                            </li>
                            <li className="group flex  cursor-pointer flex-col">
                                Contact  <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-bg-blue transition-all duration-300 group-hover:w-full"></span>
                            </li>


                            <Link href="/cart" className="bg-bg-color relative rounded-full p-2 hover:scale-105 duration-200 cursor-pointer">
                              <IoCartSharp size={23}></IoCartSharp>
                              <p className="bg-red-500 px-[3px] py-[-3px] text-sm text-white rounded-full absolute right-0 top-0">
                                {
                                    isLoading ? "0" : data?.length
                                }
                                
                                </p>
                            </Link>
                        </ul>
                        <div onClick={() => setShow(!show)} className="flex items-center border-2 rounded-[32px] relative cursor-pointer">
                            <button className="rounded-full transition-all duration-300 hover:scale-90">
                                <Image height={676} width={1200} src={`${user?.photo || 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg'}`} alt="user" className="h-[50px] w-[50px] rounded-full " />
                            </button>
                            <div className={`${show ? 'right-0 top-[50px] visible' : 'right-0 top-[90px]  invisible'}  absolute z-50  bg-white rounded-2xl py-2 px-4 w-[190px] transition-all my-transition`}>
                                <ul>
                                    <Link href={"/my-profile"} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaUser size={18}></FaUser>
                                        <li className=" ">My Profile</li>
                                    </Link>
                                    <Link href={"/my-order"} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaClipboardList size={18}></FaClipboardList>
                                        <li className=" ">My Order</li>
                                    </Link>
                                    <Link href={"/wishlist"} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaHeart size={18}></FaHeart>
                                        <li className=" ">Wishlist</li>
                                    </Link>
                                    <Link href={"/my-reviews"} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaStar size={18}></FaStar>
                                        <li className=" ">My Reviews</li>
                                    </Link>
                                    <Link href={""} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaInfoCircle size={18}></FaInfoCircle>
                                        <li className=" ">About Us</li>
                                    </Link>
                                    <Link href={""} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                        <FaPhone size={18}></FaPhone>
                                        <li className=" ">Contact Us</li>
                                    </Link>


                                    {
                                        user ? <>
                                            <div onClick={handleLogOut} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                                <FaSignOutAlt size={18}></FaSignOutAlt>
                                                <li className=" ">Logout</li>
                                            </div>


                                        </> : <>
                                            <Link href={"/login"} className="flex items-center gap-2 w-full p-1 pl-3 rounded-sm hover:bg-bg-blue hover:text-white ">
                                                <FaStar size={18}></FaStar>
                                                <li className=" ">Login</li>
                                            </Link>


                                        </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>



        </div>
    );
};

export default Navbar;




