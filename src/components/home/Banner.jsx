"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

import { FaSearch } from "react-icons/fa";

import { useState } from "react";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Banner = () => {
  const [selectCategory, setSelectCategory] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { data: writers = [] } = useQuery({
    queryKey: ["sidebarWriter"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getAllAuthors`);
      const writerArr = await res?.data?.map((singleWriter) => {
        const writer = {
          authorID: singleWriter?.authorID,
          name: singleWriter?.name?.[1],
        };
        return writer;
      });
      return writerArr;
    },
  });

  const { data: publications = [] } = useQuery({
    queryKey: ["sidebarPublisher"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getPublications`);
      const customizePublisherArr = await res?.data?.map(
        (singlePublication) => {
          const writer = {
            publicationID: singlePublication?._id,
            name: singlePublication?.name?.[1],
          };
          return writer;
        }
      );
      return customizePublisherArr;
    },
  });

  console.log(publications);

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
    "ভৌগোলিক গবেষণা",
  ];

  // // লেখকের নামের অ্যারে
  // const writers = [
  //     "হুমায়ুন আহমেদ",
  //     "জহির রায়হান",
  //     "রবীন্দ্রনাথ ঠাকুর",
  //     "কাজী নজরুল ইসলাম",
  //     "আবুল বাশার",
  //     "সৈয়দ মুজতবা আলী",
  //     "সুনীল গঙ্গোপাধ্যায়",
  //     "আবুল মনসুর আহমদ",
  //     "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
  //     "মুহম্মদ জাফর ইকবাল",
  //     "শীর্ষেন্দু মুখোপাধ্যায়",
  //     "আনিসুল হক",
  //     "আহমদ ছফা",
  //     "অনীশ দাস অপু",
  //     "বেগম রোকেয়া",
  //     "ফয়েজ আহমেদ",
  //     "মীর মশাররফ হোসেন",
  //     "তসলিমা নাসরিন",
  //     "জাকির তালুকদার",
  //     "প্রেমচাঁদ"
  // ];

  // // প্রকাশনীর নামের অ্যারে
  // const publications = [
  //     "প্রথমা প্রকাশন",
  //     "অন্যপ্রকাশ",
  //     "আনন্দ পাবলিশার্স",
  //     "বাংলা একাডেমি",
  //     "বিদ্যাপ্রকাশ",
  //     "ইত্যাদি গ্রন্থ প্রকাশ",
  //     "কাকলী প্রকাশনী",
  //     "পাঠক সমাবেশ",
  //     "মাওলা ব্রাদার্স",
  //     "সাহিত্য প্রকাশ",
  //     "অনন্যা প্রকাশনী",
  //     "অন্তর্জলী প্রকাশন",
  //     "বঙ্গপ্রকাশ",
  //     "সৃজনশীল প্রকাশনী",
  //     "সম্প্রতি প্রকাশনী",
  //     "জ্ঞানভবন প্রকাশনী",
  //     "বিশ্বসাহিত্য কেন্দ্র",
  //     "শিখা প্রকাশনী",
  //     "বর্ণমালা প্রকাশনী",
  //     "সাহিত্য সংসদ"
  // ];

  return (
    <>
      <div className="container ">
        <section className="hidden md:flex py-2  px-2 items-center justify-between bg-[#00bffe]  rounded-md">
          <span className="relative   ">
            <input
              type="text"
              placeholder="Search by book or author name"
              className="  bg-white  md:w-[200px] lg:w-[300px] py-1  px-2 border-none focus:outline-none focus:border-none bg-transparent rounded-full md:rounded-l-full "
            />
            <FaSearch
              size={22}
              className="text-gray-500 absolute right-3 top-[20%]"
            ></FaSearch>
          </span>

          <div className="hidden md:flex items-center  gap-2 bg-[#00bffe] ">
            <BiSolidOffer size={22} className="text-white"></BiSolidOffer>
            <p className="font-semibold lg:text-[18px] text-white">
              Free shipping order over 1500 Taka
            </p>
          </div>

          <div className="hidden md:flex  items-center gap-2 bg-[#00bffe]">
            <BiSolidOffer size={22} className="text-white"></BiSolidOffer>
            <p className="font-semibold lg:text-[18px] text-white">
              New Year Cupon Code
            </p>
          </div>
        </section>

        {/* for small device serchebar */}
        <section className="flex md:hidden py-2  px-2 items-center justify-between bg-[#00bffe] mb-3 rounded-md">
          <span className="relative  w-full ">
            <input
              type="text"
              placeholder="Search by book or author name"
              className="  bg-white  w-full py-1  px-2 border-none focus:outline-none focus:border-none bg-transparent rounded-full md:rounded-l-full "
            />
            <FaSearch
              size={22}
              className="text-gray-500 absolute right-3 top-[20%]"
            ></FaSearch>
          </span>
        </section>
      </div>

      <div className="flex relative gap-[10px] container">
        <div className="md:w-[30%] lg:w-[20%] hidden md:flex  bg-white pt-[10px] pb-[50px] rounded-md  justify-between items-start  border-2">
          <ul onMouseLeave={() => setSelectCategory(null)} className="w-full ">
            <Link
              href={"#"}
              onMouseOver={() => setSelectCategory("books")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>Books</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"/all-book"}
              onMouseOver={() => setSelectCategory("subjects")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>Subjects</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"#"}
              onMouseOver={() => setSelectCategory("writers")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>Writer</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"#"}
              onMouseOver={() => setSelectCategory("publications")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>Publications</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>

            {selectCategory && (
              <div className="bg-white absolute right-0 top-0 z-50 w-full md:w-[70%] lg:w-[80%]">
                <ul className="w-full px-6 py-4 flex flex-col flex-wrap h-[430px] ">
                  {selectCategory === "books"
                    ? boiShomogro?.map((book, index) => (
                        <Link
                          href={"/all-book"}
                          key={index}
                          className="py-3 px-3 font-normal w-[250px] hover:text-[#00bffe] hover:underline"
                        >
                          {book}
                        </Link>
                      ))
                    : selectCategory === "subjects"
                    ? subjects?.map((book, index) => (
                        <Link
                          href={"/all-book"}
                          key={index}
                          className="py-3 px-3 font-normal w-[250px] hover:text-[#00bffe] hover:underline"
                        >
                          {book}
                        </Link>
                      ))
                    : selectCategory === "writers"
                    ? writers?.map((book, index) => (
                        <Link
                          href={`/writer/${book?.authorID}`}
                          key={index}
                          className="py-3 px-3 font-normal w-[250px] hover:text-[#00bffe] hover:underline"
                        >
                          {book?.name}
                        </Link>
                      ))
                    : selectCategory === "publications"
                    ? publications?.map((book, index) => (
                        <Link
                          href={`/publisher/${book?.publicationID}`}
                          key={index}
                          className="py-3 px-3 font-normal w-[250px] hover:text-[#00bffe] hover:underline"
                        >
                          {book?.name}
                        </Link>
                      ))
                    : ""}
                </ul>
              </div>
            )}
          </ul>
        </div>

        <Swiper
          //  spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          //  pagination={{
          //    clickable: true,
          //  }}
          //  navigation={true}
          modules={[Autoplay]}
          className="mySwiper h-[150px] md:h-[340px] lg:h-[430px] w-full md:w-[70%] lg:w-[80%] "
        >
          <SwiperSlide className=" rounded-md  ">
            <Image
              className="h-full w-full"
              height={676}
              width={1200}
              src="https://i.postimg.cc/RhstS7fm/464131621-1724559988082883-6219848670324800565-n.jpg"
              alt="Banner"
            ></Image>
          </SwiperSlide>

          <SwiperSlide className=" rounded-md  ">
            <Image
              className="h-full w-full"
              height={676}
              width={1200}
              src="https://i.postimg.cc/m2n9KSBN/463936600-847081824293619-1177587183998418642-n.jpg"
              alt="Banner"
            ></Image>
          </SwiperSlide>

          <SwiperSlide className=" rounded-md  ">
            <Image
              className="h-full w-full"
              height={676}
              width={1200}
              src="https://i.postimg.cc/dt3dWfPV/462201945-838668078468327-2997440976020437268-n.jpg"
              alt="Banner"
            ></Image>
          </SwiperSlide>

          <SwiperSlide className=" rounded-md  ">
            <Image
              className="h-full w-full"
              height={676}
              width={1200}
              src="https://i.postimg.cc/jqZP4b11/457252998-812125854455883-2437830174375563780-n.jpg"
              alt="Banner"
            ></Image>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
