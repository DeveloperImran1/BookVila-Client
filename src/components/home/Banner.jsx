"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

import { FaSearch } from "react-icons/fa";

import { useEffect, useState } from "react";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Banner = () => {
  const [selectCategory, setSelectCategory] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [subjects, setSubjects] = useState([]);
  const [boiShomogro, setBoiShomogro] = useState([]);
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

  // subject data get
  const { data: allSubjects = [] } = useQuery({
    queryKey: ["manageSubject"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubjects");
      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (allSubjects.length > 0) {
      const newSubjects = [];

      allSubjects.forEach((subject) => {
        newSubjects.push(subject.bengali);
      });

      setSubjects(newSubjects); // ✅ This will trigger re-render
    }
  }, [allSubjects]);

  // sub category data get
  const { data: allSubCategories = [] } = useQuery({
    queryKey: ["manageSubCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubCategories");
      return response.data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (allSubCategories.length > 0) {
      const newSubCategories = [];

      allSubCategories.forEach((subCategory) => {
        newSubCategories.push(subCategory.bengali);
      });

      setBoiShomogro(newSubCategories); // ✅ This will trigger re-render
    }
  }, [allSubCategories]);

  // banner data get
  const {
    data: banners = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allBanner"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllBanner");
      return response.data;
    },
    keepPreviousData: true,
  });
  console.log("banners", banners?.banner?.images?.[1]);

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
              <p>বই</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"/all-book"}
              onMouseOver={() => setSelectCategory("subjects")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>বিষয়</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"#"}
              onMouseOver={() => setSelectCategory("writers")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>লেখক</p>
              <MdOutlineArrowForwardIos></MdOutlineArrowForwardIos>
            </Link>
            <Link
              href={"#"}
              onMouseOver={() => setSelectCategory("publications")}
              className="py-3 px-3 font-semibold w-full hover:bg-[#00bffe] hover:text-white rounded-md flex justify-between items-center"
            >
              <p>প্রকাশনী</p>
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
          {banners?.map((banner, index) => (
            <SwiperSlide key={banner?._id} className=" rounded-md  ">
              <Image
                className="h-full w-full hidden md:block"
                height={676}
                width={1200}
                src={banner?.images?.[1]}
                alt="Banner"
              ></Image>
              <Image
                className="h-full w-full block md:hidden"
                height={676}
                width={1200}
                src={banner?.images?.[0]}
                alt="Banner"
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Banner;
