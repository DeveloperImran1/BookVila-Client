"use client";
import {
  cartBookGet,
  favoruteBookGet,
  setCartBook,
  setFavoruteBook,
} from "@/hooks/localStorage";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useMyCartBooks from "@/hooks/useCartBooks";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import "./bookCard.css";

const BooksCard = ({ book }) => {
  const [bookStatus, setBookStatus] = useState("");
  const currentDateTime = new Date().getTime() - 2592000000;
  const axiosPublic = useAxiosPublic();
  const session = useSession();
  const [favorutes, setFavorutes] = useState([]);
  const [favoruteBooks, setFavoruteBooks] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);
  const { data } = useMyCartBooks();

  // Calculate discounted price
  function calculateDiscountedPrice(price, discountPercentage) {
    return price - (price * discountPercentage) / 100;
  }

  const originalPrice = book?.price;
  const discountPercentage = book?.discount;
  const newPrice = calculateDiscountedPrice(originalPrice, discountPercentage);

  function calculateAverageRating(ratings) {
    if (ratings?.length === 0) return 0; // Return 0 if there are no ratings
    const total = ratings?.reduce((sum, rating) => sum + rating, 0);
    return (total / ratings?.length)?.toFixed(1); // Calculate average and round to 1 decimal place
  }

  useEffect(() => {
    const newPublishedBooks =
      new Date(book?.updatedAt).getTime() > currentDateTime;

    if (book?.discount) {
      setBookStatus(`${book?.discount}%`);
    } else if (newPublishedBooks) {
      setBookStatus("New");
    }
  }, [book?.discount, currentDateTime, book]);

  useEffect(() => {
    const res = favoruteBookGet();
    const favoruteArr = res?.map((singleBook) => singleBook?.books?._id);
    setFavorutes(favoruteArr);
    setFavoruteBooks(res);
  }, []);

  const handleFavoruteAdded = async () => {
    const obj = {
      userEmail: session?.data?.user?.email || "demoEmail@gmail.com",
      books: book,
    };
    setFavoruteBook(obj);

    // refetch er kaj korbe
    const res = favoruteBookGet();
    const favoruteArr = res?.map((singleBook) => singleBook?.books?._id);
    setFavorutes(favoruteArr);
    setFavoruteBooks(res);
  };

  useEffect(() => {
    const res = cartBookGet();
    const cartArr = res?.map((singleBook) => singleBook?.books?._id);
    setAddToCart(cartArr);
    setCartBooks(res);
  }, []);

  // add add to cart
  const handleAddtoCart = async () => {
    const obj = {
      userEmail: session?.data?.user?.email || "demoEmail@gmail.com",
      books: book,
    };
    setCartBook(obj);

    // refetch
    const res = cartBookGet();
    const cartArr = res?.map((singleBook) => singleBook?.books?._id);
    setAddToCart(cartArr);
    setCartBooks(res);
  };

  return (
    <>
      {/* large device er jonno  */}
      <article className="rounded-md border-2 md:p-2 lg:p-4  w-full space-y-3 hidden lg:flex flex-col justify-between relative bg-white">
        {/* <div className="clit-element absolute top-[-2px] left-0 z-50 overflow-hidden">
          {bookStatus === "New" ? (
            <p className="-rotate-[50deg] text-white top-3 left-1 font-semibold absolute ">
              {bookStatus}
            </p>
          ) : (
            <p className="-rotate-[50deg] text-white top-[9px] left-[-2px] font-semibold absolute ">
              {bookStatus}
            </p>
          )}
        </div> */}
        <div className=" absolute top-[-2px] left-0 z-50 overflow-hidden">
          <div className="relative">
            <Image
              height={600}
              width={600}
              className="h-[60px] w-[60px]"
              src="https://i.postimg.cc/bJJggnKk/Untitled-design-removebg-preview.png"
              alt=""
            />
            {bookStatus === "New" ? (
              <p className=" text-white top-[45%] left-[10%px]  font-semibold absolute text-center ">
                {bookStatus}
              </p>
            ) : (
              <p className=" text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold absolute text-center text-sm ">
                {bookStatus}{" "}
                <span className="block text-[10px] mt-[-5px]">ছাড়</span>
              </p>
            )}
          </div>
        </div>

        <div
          onClick={handleFavoruteAdded}
          className="absolute top-[-2px] right-1 z-50 rounded-full p-2 hover:scale-150 duration-300 cursor-pointer"
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6717 1.71722C13.5151 2.435 13.9637 3.35016 14.0175 4.46271C14.0714 5.57526 13.7125 6.51733 12.9409 7.28894L7.746 12.6722C7.56655 12.8517 7.36019 12.9414 7.12692 12.9414C6.89364 12.9414 6.68728 12.8517 6.50784 12.6722L1.31295 7.28894C0.541345 6.51733 0.182458 5.57526 0.236291 4.46271C0.290124 3.35016 0.738733 2.435 1.58212 1.71722C2.31783 1.08917 3.16122 0.820007 4.11227 0.909729C5.08126 0.981506 5.9067 1.36731 6.58859 2.06714L7.12692 2.60547L7.66525 2.06714C8.34713 1.36731 9.1636 0.981506 10.1146 0.909729C11.0836 0.820007 11.936 1.08917 12.6717 1.71722Z"
              fill={favorutes?.includes(book?._id) ? "red" : "#00befd"} // Replace "Bright Cyan Blue" with a valid color
              className=""
            />
          </svg>
        </div>

        <div className="hover:scale-110 transition delay-900 cursor-pointer flex flex-col justify-center items-center">
          <Link href={`/book/${book?._id}`}>
            <Image
              height={676}
              width={1200}
              src={
                book?.coverImage ||
                "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
              }
              alt="book"
              className="w-[180px] h-[210px] my-4 rounded-md"
            />
          </Link>
        </div>

        <div className=" text-gray-600 space-x-2">
          <Link href={`/book/${book?._id}`} className="inline">
            <h1 className="text-[17px] hover:underline mt-2 inline">
              {book?.bookName[0]}
            </h1>
          </Link>
          <Link
            href={`/writer/${book?.authorInfo?.authorID}`}
            className="inline hover:underline"
          >
            <small>by {book?.authorInfo?.name[0]}</small>
          </Link>
        </div>
        <div className="my-1 md:my-2 text-smitems-center ">
          <span className=" text-red-500 ">
            {book?.stock < 1 && "Product in stock out"}
          </span>
          <span className="text-green-500">
            {book?.stock > 0 && "Product in stock"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h2 className="text-[17px] font-semibold flex items-center ">
              <span>{parseInt(newPrice)}</span>
              <TbCurrencyTaka size={22}></TbCurrencyTaka>
            </h2>
            <del className="text-sm  font-semibold text-gray-600 flex items-center">
              <span>{originalPrice}</span>
              <TbCurrencyTaka size={16}></TbCurrencyTaka>
            </del>
          </div>

          {addToCart?.includes(book?._id) ? (
            <Link
              href="/cart"
              className={`bg-secondary flex items-center justify-center  px-2 py-1  rounded-md text-white w-full`}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>View Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddtoCart}
              className={`bg-primary px-2 py-1  rounded-md text-white hover:bg-[#e0435e] w-full`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </article>

      {/* small to medium device er jonno  */}
      <article className="min-h-[260px] rounded-md border-2 p-1 flex flex-col justify-between   lg:hidden relative bg-white">
        <div className=" absolute top-[-2px] left-0 z-50 overflow-hidden">
          <div className="relative">
            <Image
              height={600}
              width={600}
              className="h-[60px] w-[60px]"
              src="https://i.postimg.cc/bJJggnKk/Untitled-design-removebg-preview.png"
              alt=""
            />
            {bookStatus === "New" ? (
              <p className=" text-white top-[45%] left-[10%px]  font-semibold absolute text-center ">
                {bookStatus}
              </p>
            ) : (
              <p className=" text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold absolute text-center text-sm ">
                {bookStatus}{" "}
                <span className="block text-[10px] mt-[-5px]">ছাড়</span>
              </p>
            )}
          </div>
        </div>
        <div
          onClick={handleFavoruteAdded}
          className="absolute top-[-2px] right-1 z-50 rounded-full p-2 hover:scale-150 duration-300 cursor-pointer"
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6717 1.71722C13.5151 2.435 13.9637 3.35016 14.0175 4.46271C14.0714 5.57526 13.7125 6.51733 12.9409 7.28894L7.746 12.6722C7.56655 12.8517 7.36019 12.9414 7.12692 12.9414C6.89364 12.9414 6.68728 12.8517 6.50784 12.6722L1.31295 7.28894C0.541345 6.51733 0.182458 5.57526 0.236291 4.46271C0.290124 3.35016 0.738733 2.435 1.58212 1.71722C2.31783 1.08917 3.16122 0.820007 4.11227 0.909729C5.08126 0.981506 5.9067 1.36731 6.58859 2.06714L7.12692 2.60547L7.66525 2.06714C8.34713 1.36731 9.1636 0.981506 10.1146 0.909729C11.0836 0.820007 11.936 1.08917 12.6717 1.71722Z"
              fill={favorutes?.includes(book?._id) ? "red" : "#00befd"} // Replace "Bright Cyan Blue" with a valid color
              className=""
            />
          </svg>
        </div>

        <div className=" transition delay-900 cursor-pointer ">
          <Link href={`/book/${book?._id}`}>
            <Image
              height={676}
              width={1200}
              src={
                book?.coverImage ||
                "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
              }
              alt="book"
              className="w-full h-[260px] sm:h-[270px] md:h-[260px]  rounded-md"
            />
          </Link>
        </div>

        <div className=" text-gray-600 space-x-2 mt-2 md:mt-3">
          <Link href={`/book/${book?._id}`} className="inline">
            <h1 className="text-[15px] md:text-base lg:text-[17px] hover:underline mt-2 inline">
              {book?.bookName?.[0]}
            </h1>
          </Link>
          <Link
            href={`/writer/${book?.authorInfo?.authorID}`}
            className="inline hover:underline"
          >
            <small>by {book?.authorInfo?.name[0]}</small>
          </Link>
        </div>

        <div className="text-[15px] md:text-base lg:text-[17px]">
          <div className="flex gap-4 my-1 md:my-3 items-center ">
            <h2 className=" font-semibold flex items-center ">
              <span>{parseInt(newPrice)}</span>
              <TbCurrencyTaka></TbCurrencyTaka>
            </h2>
            <del className="text-sm font-semibold text-gray-600 flex items-center">
              <span>{originalPrice}</span>
              <TbCurrencyTaka></TbCurrencyTaka>
            </del>
          </div>

          <div className="my-1 md:my-2 text-smitems-center ">
            <span className=" text-red-500 ">
              {book?.stock < 1 && "Product in stock out"}
            </span>
            <span className="text-green-500">
              {book?.stock > 0 && "Product in stock"}
            </span>
          </div>

          {addToCart?.includes(book?._id) ? (
            <Link
              href="/cart"
              className={`bg-secondary flex items-center justify-center  px-2 py-1  rounded-md text-white w-full`}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>View Cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddtoCart}
              className={`bg-primary px-2 py-1  rounded-md text-white hover:bg-[#e0435e] w-full`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </article>
    </>
  );
};

export default BooksCard;
