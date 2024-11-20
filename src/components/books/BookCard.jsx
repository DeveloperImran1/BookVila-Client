"use client";
import { useEffect, useState } from "react";
import "./bookCard.css";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { TbCurrencyTaka } from "react-icons/tb";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useMyCartBooks from "@/hooks/useCartBooks";

const BooksCard = ({ book }) => {
  const [bookStatus, setBookStatus] = useState("");
  const currentDateTime = new Date().getTime() - 2592000000;
  const axiosPublic = useAxiosPublic();
  const session = useSession();
  const [favorutes, setFavorutes] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const { data, refetch: addToCartRefetch, isLoading } = useMyCartBooks();

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
    const newPublishedBooks = new Date(book?.updatedAt).getTime() > currentDateTime;

    if (book?.discount) {
      setBookStatus(`${book?.discount}% off`)
    }
    else if (newPublishedBooks) {
      setBookStatus("New")
    }

  }, [book?.discount, currentDateTime, book])

  const { data: favoruteBooks = [], refetch } = useQuery({
    queryKey: ["featuredBooks", session?.data?.user?.email, book?._id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getMyFavorutes/${session?.data?.user?.email}`);
      const favoruteArr = res?.data?.map(singleBook => singleBook?.books?._id)
      setFavorutes(favoruteArr)
      return res?.data;
    }
  })
  


  // add favorutes
  const handleFavoruteAdded = async () => {
    const result = await axiosPublic.get(`/getMyFavorutes/${session?.data?.user?.email}`);
    const favoruteArr = result?.data?.map(singleBook => singleBook?.books?._id)
    if (favoruteArr?.includes(book?._id)) {
      return toast.error('You have already added 😍')
    }
    const obj = { userEmail: session?.data?.user?.email, books: book }
    const res = await axiosPublic.post('/addFavoruteBook', obj)
    if (res?.status === 200) {
      toast.success('Successfully Added Favorutelit❤️')
      refetch()
    }
    else {
      toast.error('Something went wrong😢')

    }
  }

  const { data: cartBooks = [], refetch:cartRefetch } = useQuery({
    queryKey: ["cartBooks", session?.data?.user?.email, book?._id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getMyAddToCart/${session?.data?.user?.email}`);
      const cartArr = res?.data?.map(singleBook => singleBook?.books?._id)
      setAddToCart(cartArr)
      return res?.data;
    }
  })
  

  // add add to cart
  const handleAddtoCart = async () => {
    const result = await axiosPublic.get(`/getMyAddToCart/${session?.data?.user?.email}`);
    const cartArr = result?.data?.map(singleBook => singleBook?.books?._id)
    if (cartArr?.includes(book?._id)) {
      return toast.error('You have already added 😍')
    }
    const obj = { userEmail: session?.data?.user?.email, books: book }
    const res = await axiosPublic.post('/addToCartBook', obj)
    if (res?.status === 200) {
      toast.success('Successfully Added Add To Cart')
      addToCartRefetch()
      cartRefetch()
    }
    else {
      toast.error('Something went wrong😢')

    }
  }


  return (
    <article className="rounded-md border-2 p-4 w-full space-y-3 relative bg-white">
      <div className="clit-element absolute top-[-2px] left-0 z-50 overflow-hidden">
        {
          bookStatus === "New" ? <p className="-rotate-[50deg] text-white top-3 left-1 font-semibold absolute ">
            {bookStatus}
          </p> : <p className="-rotate-[50deg] text-white top-[9px] left-[-2px] font-semibold absolute ">
            {bookStatus}
          </p>
        }

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
              book?.coverImage || "https://i.ibb.co/x6jR8ny/Link-prod16-png.png"
            }
            alt="book"
            className="w-[180px] h-[210px] my-4 rounded-md"
          />

        </Link>
      </div>

      <div className=" text-gray-600 space-x-2">
        <Link href={`/book/${book?._id}`} className="inline">
          <h1 className="text-[17px] hover:underline mt-2 inline">{book?.bookName[0]}</h1>
        </Link> 
        <Link href={`/writer/${book?.authorInfo?.authorID}`} className="inline hover:underline">
          <small>by {book?.authorInfo?.name[0]}</small>
        </Link>
      </div>
      {/* Render stars based on rating
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => setUserRating(star)}
            className="w-4 cursor-pointer"
            viewBox="0 0 24 24"
            fill={star <= userRating ? "#f2b00a" : "#94a3b8"} // Dynamic fill color
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" />
          </svg>
        ))}
        <span>{`(${averageRating})`}</span>
      </div> */}

      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-[17px] font-semibold flex items-center ">
            <span>{parseInt(newPrice)}</span>
            <TbCurrencyTaka size={22}></TbCurrencyTaka>
          </h2>
          <del className="text-[17px] font-semibold text-gray-600 flex items-center">
            <span>{originalPrice}</span>
            <TbCurrencyTaka size={22}></TbCurrencyTaka>
          </del>
        </div>
        <button onClick={handleAddtoCart} className={`${addToCart?.includes(book?._id) ? 'bg-secondary ': 'bg-primary'} px-2 py-1 rounded-md text-white hover:bg-[#e0435e]`}>
          Add to Cart
        </button>
      </div>
    </article>

  );
};

export default BooksCard;
