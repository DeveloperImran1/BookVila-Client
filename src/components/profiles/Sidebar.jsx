"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { FiBook, FiClipboard, FiLogOut, FiUserCheck } from "react-icons/fi";
import { MdManageSearch, MdRateReview } from "react-icons/md";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { BiBookAdd } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { HiOutlineLibrary } from "react-icons/hi";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState(false);
  const [books, setBooks] = useState(false);
  const [bookWriters, setBookWriters] = useState(false);
  const [bookPublications, setBookPublications] = useState(false);
  const { data, isLoading, refetch, isPending } = useAuth();

  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  console.log(session);

  const handleLogOut = async () => {
    await signOut();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Log Out",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => router.push("/login"));
  };

  return (
    <div position="left" className="  flex flex-col justify-between  bg-white ">
      <div className="flex flex-col bg-white pt-[10px] pb-[50px] rounded-md justify-between items-center">
        <div>
          <Image
            height={676}
            width={1200}
            src={
              data?.photo ||
              "https://i.postimg.cc/xTmfVLXn/download-black-male-user-profile-icon-png-701751695035033bwdeymrpov.png"
            }
            className="w-[100px] h-[100px] scale-100 text-white transition-all duration-200 hover:scale-110 rounded-full border-2 border-bg-gray p-1"
            alt="logo"
          />
        </div>
        <hr className="border-[1px] my-[18px] w-full" />

        <Link
          href="/my-profile"
          className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
        >
          <AiOutlineUser
            size={18}
            className="hover:text-bg-gray"
          ></AiOutlineUser>
          <p>My Profile</p>
        </Link>
        <Link
          href="/my-order"
          className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
        >
          <BsBag size={18} className="hover:text-bg-gray"></BsBag>
          <p>My Order</p>
        </Link>
        <Link
          href="/wishlist"
          className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
        >
          <AiOutlineHeart
            size={18}
            className="hover:text-bg-gray"
          ></AiOutlineHeart>
          <p>Wishlist</p>
        </Link>
        <Link
          href="/my-review"
          className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
        >
          <MdRateReview size={18} className="hover:text-bg-gray"></MdRateReview>
          <p>My Reviews</p>
        </Link>
        {data?.role === "admin" && (
          <>
            <Link
              href="/add-author"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <FiUsers size={18} className="hover:text-bg-gray"></FiUsers>
              <p>Add Author</p>
            </Link>
            <Link
              href="/add-books"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <FiBook size={18} className="hover:text-bg-gray"></FiBook>
              <p>Add Book</p>
            </Link>
            <Link
              href="/add-publication"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <BiBookAdd size={18} className="hover:text-bg-gray"></BiBookAdd>
              <p>Add Publication</p>
            </Link>

            <Link
              href="/manage-order"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <FiClipboard
                size={18}
                className="hover:text-bg-gray"
              ></FiClipboard>
              <p>Manage Orders</p>
            </Link>
            <Link
              href="/manage-books"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <MdManageSearch
                size={18}
                className="hover:text-bg-gray"
              ></MdManageSearch>
              <p>Manage Books</p>
            </Link>

            <Link
              href="/manage-author"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <FiUserCheck
                size={18}
                className="hover:text-bg-gray"
              ></FiUserCheck>
              <p>Manage Author</p>
            </Link>
            <Link
              href="/manage-publication"
              className={` py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
            >
              <HiOutlineLibrary
                size={18}
                className="hover:text-bg-gray"
              ></HiOutlineLibrary>
              <p>Manage Publication</p>
            </Link>
          </>
        )}
      </div>

      {/* bottom section of sidebar */}
      <div className="flex flex-col">
        <hr className="border-[1px] my-[18px] w-full" />
        <div
          onClick={handleLogOut}
          className={`cursor-pointer py-2 px-3 font-semibold w-full hover:bg-bg-blue hover:text-white rounded-md flex gap-3 items-center`}
        >
          <FiLogOut size={18} className="hover:text-bg-gray"></FiLogOut>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
