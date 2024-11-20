"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';

const Sidebar = () => {
    const [show, setShow] = useState(false)
    const [subject, setSubject] = useState(false)
    const [books, setBooks] = useState(false)
    const [bookWriters, setBookWriters] = useState(false)
    const [bookPublications, setBookPublications] = useState(false)
    const { data, isLoading, refetch, isPending } = useAuth();

    const session = useSession();
    const user = session?.data?.user;

    console.log(session)
    const handleLogOut = () => {
        signOut()
        Swal("Logout", "You have Login Out", "success");
        navigate("/login")
    }


    return (
        <div
            position="left"
            className="  flex flex-col justify-between  bg-white ">
            <div className="flex flex-col bg-white pt-[10px] pb-[50px] rounded-md justify-between items-center">
                <div>
                    <Image height={676} width={1200}
                        src={data?.photo || "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"}
                        className="w-[100px] h-[100px] scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-2 border-bg-gray p-1"
                        alt="logo"
                    />
                </div>
                <hr className="border-[1px] my-[18px] w-full" />

                <Link href="" className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`} >
                    <AiOutlineUser size={18} className="hover:text-bg-gray"></AiOutlineUser>
                    <p>My Profile</p>
                </Link>
                <Link href="" className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`} >
                    <BsBag size={18} className="hover:text-bg-gray"></BsBag>
                    <p>My Order</p>
                </Link>
                <Link href="" className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`} >
                    <AiOutlineHeart size={18} className="hover:text-bg-gray"></AiOutlineHeart>
                    <p>Wishlist</p>
                </Link>
                <Link href="" className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`} >
                    <MdRateReview size={18} className="hover:text-bg-gray"></MdRateReview>
                    <p>My Reviews</p>
                </Link>

            </div>


            {/* bottom section of sidebar */}
            <div className="flex flex-col">
                <hr className="border-[1px] my-[18px] w-full" />
                <div onClick={handleLogOut} className={`cursor-pointer py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`} >
                    <FiLogOut size={18} className="hover:text-bg-gray"></FiLogOut>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;