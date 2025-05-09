"use client";
import {
  cartBookGet,
  favoruteBookGet,
  setCartBook,
  setFavoruteBook,
} from "@/hooks/localStorage";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { Heart, Info, Share2, ShoppingCart, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsMessenger } from "react-icons/bs";
import { FaBarcode, FaBook, FaBuilding, FaPen } from "react-icons/fa";
import { FacebookMessengerShareButton, FacebookShareButton } from "react-share";
import Loading from "../shared/Loading";
import BookInformation from "./BookInformation";
import ReviewPage from "./ReviewPage";
import SimilarBooks from "./SimilarBook";

// facebook share for

// Configure modal root element for accessibility
// Modal.setAppElement("#root");

// Placeholder data
const initialQAs = [
  {
    id: "1",
    question: "এটার ই-বুক কি নাই???",
    answer: "প্রিয় গ্রাহক, বর্তমানে বইটির ই-বুক ভার্সন নেই, ধন্যবাদ।",
    questionedBy: "Hedayetullah",
    answeredBy: "SG Shamim Ahmed",
    questionDate: "28 Jul, 2024",
    answerDate: "28 Jul, 2024",
  },
  {
    id: "2",
    question: "পিডিএফ বই কি ভাবে ডাউনলোড করা যাবে না pdf?",
    answer: "দুঃখিত, আপনাকে হার্ডকপি অর্ডার করতে হবে।",
    questionedBy: "Md.Abu Siddique",
    answeredBy: "Md. Mahmud Alam",
    questionDate: "07 Oct, 2020",
    answerDate: "07 Oct, 2020",
  },
];

export default function BookDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qas, setQas] = useState(initialQAs);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // Track the question being replied to
  const [newReply, setNewReply] = useState(""); // State for the reply input
  const axiosPublic = useAxiosPublic();
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const [favorutes, setFavorutes] = useState([]);
  const [favoruteBooks, setFavoruteBooks] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);
  const [bookStatus, setBookStatus] = useState("");

  const session = useSession();
  // Question And Ans Form
  // const handleSubmitQuestion = (e) => {
  //   e.preventDefault();
  //   if (newQuestion.trim()) {
  //     const newQA = {
  //       id: (qas.length + 1).toString(),
  //       question: newQuestion,
  //       answer: "",
  //       questionedBy: "Anonymous",
  //       answeredBy: "",
  //       questionDate: new Date().toLocaleDateString(),
  //       answerDate: "",
  //     };
  //     setQas([newQA, ...qas]);
  //     setNewQuestion("");
  //   }
  // };
  // const handleReplySubmit = (e, qaId) => {
  //   e.preventDefault();
  //   setQas(
  //     qas.map((qa) =>
  //       qa.id === qaId
  //         ? {
  //           ...qa,
  //           answer: newReply,
  //           answeredBy: "Admin",
  //           answerDate: new Date().toLocaleDateString(),
  //         }
  //         : qa
  //     )
  //   );
  //   setNewReply("");
  //   setReplyingTo(null); // Close the reply form after submission
  // };

  // const { data: questions = {}, refetch } = useQuery({
  //   queryKey: ["questions"],
  //   queryFn: async () => {
  //     const { data } = await axiosPublic.get(`/question/${book.bookID}`);
  //     console.log(data);
  //     return data;
  //   },
  // });
  // console.log(questions[0]);

  // useEffect(() => {
  //   setLoading(true)
  //   const res = axios
  //     .get(`https://book-vila-server.vercel.app/book/${id}`)
  //     .then((res) => {
  //       setBook(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //     setLoading(false)
  // }, [id, uiUpdate]);

  const {
    data: book = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookDetails"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/book/${id}`);
      console.log(data);
      return data;
    },
  });

  console.log(book);
  const discountedPrice = Math.round(
    book?.price - (book?.price * book?.discount) / 100
  );
  const savings = book?.price - discountedPrice;

  // calculate for book status
  const currentDateTime = new Date().getTime() - 2592000000;

  useEffect(() => {
    const newPublishedBooks =
      new Date(book?.updatedAt).getTime() > currentDateTime;

    if (book?.discount) {
      setBookStatus(`${book?.discount}%`);
    } else if (newPublishedBooks) {
      setBookStatus("New");
    }
  }, [book?.discount, book, currentDateTime]);

  // book rating er gor calculation
  const { data: currentBookReview = [] } = useQuery({
    queryKey: ["currentBookReview", book?._id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getReview/${book?._id}`);
      return res?.data;
    },
  });

  let totalRating = 0;
  currentBookReview?.map((rating) => {
    totalRating += parseFloat(rating?.rating);
  });
  const totalRatingsGor =
    currentBookReview?.length > 0
      ? (totalRating / parseInt(currentBookReview?.length)).toFixed(1)
      : 0;

  // add favorute list relate kaj
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

  // add to cart relate kaj

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

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="container mx-auto border  rounded shadow-lg  pt-9">
      {/* <div className="flex flex-col md:flex-row gap-8 bg-white"> */}
      {/* Book Cover Section */}
      {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full md:w-1/3 cursor-pointer"
          onClick={openModal} 
        > */}
      <div className=" flex flex-col md:flex-row gap-5">
        <div className="relative border-2 w-full md:w-[40%] rounded-lg overflow-hidden">
          <div className=" absolute top-[-2px] left-0 z-50 overflow-hidden">
            <div className="relative text-[18px]">
              <Image
                height={600}
                width={600}
                className="h-[70px] md:h-[90px] w-[70px] md:w-[90px]"
                src="https://i.postimg.cc/bJJggnKk/Untitled-design-removebg-preview.png"
                alt=""
              />
              {bookStatus === "New" ? (
                <p className=" text-white top-[45%] left-[10%px]  font-semibold absolute text-center ">
                  {bookStatus}
                </p>
              ) : (
                <p className=" text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-semibold absolute text-center  ">
                  {bookStatus}{" "}
                  <span className="block mt-[-5px] text-[13px]">ছাড়</span>
                </p>
              )}
            </div>
          </div>
          <Image
            src={book?.coverImage}
            alt={book?.bookName?.[0] || "Books"}
            className="w-full h-[300px]  md:h-[500px] "
            height={676}
            width={1200}
          />
        </div>

        {/* Book Details Section */}

        <div className="w-full md:w-[60%] space-y-6 p-4 bg-white">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[18px] md:text-[20px] lg:text-2xl text-black font-bold">
                  {book?.bookName?.[0]}
                </h1>
              </div>
              <Info
                className="h-5 w-5 text-gray-500"
                title="Book information"
              />
            </div>
            <p className="text-gray-500 mt-2">
              by {book?.authorInfo?.name?.[0]}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(totalRatingsGor)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-black">{totalRatingsGor}</span>{" "}
              Star Ratings |{" "}
              <span className="font-bold text-black">
                {currentBookReview?.length || 0}
              </span>{" "}
              Reviews
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col md:flex-row items-baseline gap-5">
              <div className="flex items-baseline gap-2">
                <span className="text-[18px] md:text-[20px] lg:text-2xl text-gray-600 font-bold">
                  TK. {discountedPrice}
                </span>
                <span className="text-[15px] md:text-[17px] lg:text-xl text-gray-500 line-through">
                  TK. {book?.price}
                </span>
              </div>

              <span className="text-green-600 text-sm ">
                You Save TK. {savings} ({book?.discount}%)
              </span>
            </div>
            {book?.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                In Stock (only {book?.stock} copies left)
              </div>
            ) : (
              <div className="text-red-600">Out of Stock</div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-4 justify-between text-gray-700 mt-8">
            <div className="text-center">
              <FaBook className="text-lg mx-auto " />
              <h1 className="font-semibold">Book Length</h1>
              <h4>{book?.pages} Pages</h4>
            </div>
            <div className="text-center">
              <FaPen className="text-lg mx-auto " />
              <h1 className="font-semibold">Edition</h1>
              <h3>{book?.edition}</h3>
            </div>
            <div className="text-center">
              <FaBuilding className="text-lg mx-auto " />
              <h1 className="font-semibold">Publication</h1>
              <h2>{book?.publisher?.[0]}</h2>
            </div>
            <div className="text-center">
              <FaBarcode className="text-lg mx-auto " />
              <h1 className="font-semibold">BookID</h1>
              <div>{book?.bookID}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between pt-4">
            <button
              onClick={handleFavoruteAdded}
              className={`${
                addToCart?.includes(book?._id)
                  ? "text-secondary  "
                  : "text-gray-500 "
              } text-gray-500 flex items-center`}
            >
              {/* <button onClick={handleFavoruteAdded}  className="text-gray-500 hover:text-primary flex items-center"> */}
              <Heart className="md:mr-2 h-4 w-4 " />
              <span className="hidden sm:block">Add to Booklist</span>
            </button>

            <FacebookShareButton
              className="flex gap-2"
              url={`https://www.readora.shop${window.location.pathname}`}
              quote={"Readora Online Book Shop"}
              hashtag="#readora #onlineshop #bookshop"
            >
              <button className="text-gray-500 flex items-center">
                <Share2 className="md:mr-2 h-4 w-4" />

                <span className="hidden sm:block">Share On Facebook</span>
              </button>
            </FacebookShareButton>

            <FacebookMessengerShareButton
              className="flex gap-2"
              url={`${window.location.origin}${window.location.pathname}`}
              appId="711734981208843"
            >
              <button className="text-gray-500 flex items-center">
                <BsMessenger className="md:mr-2 h-4 w-4" />
                <span className="hidden sm:block">Share On Messenger</span>
              </button>
            </FacebookMessengerShareButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {addToCart?.includes(book?._id) ? (
              <Link
                href="/cart"
                className={`${
                  addToCart?.includes(book?._id)
                    ? "bg-secondary text-white "
                    : "bg-[#00bffe] text-white"
                } p-2  rounded flex items-center justify-center`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Cart
              </Link>
            ) : (
              <button
                onClick={handleAddtoCart}
                className={`${
                  addToCart?.includes(book?._id)
                    ? "bg-secondary text-white "
                    : "bg-[#00bffe] text-white"
                } p-2  rounded flex items-center justify-center`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(true)} // pdf er system akhono korini
              className="p-2 bg-slate-200 border rounded md:font-bold text-[#077aa0b7]"
            >
              একটু পড়ে দেখুন
            </button>
          </div>
        </div>
      </div>
      {/* </motion.div> */}

      {/* </div> */}

      {/* PDF Preview Modal */}

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=""
        className="w-screen h-screen"
        width={book?.buyingOptions?.[1]?.fileLink ? "80%" : "30%"}
      >
        <div className="  relative p-6">
          {book?.buyingOptions?.[1]?.fileLink ? (
            <iframe
              // google docs k anyone mode a kore share link ta hobe aita: https://docs.google.com/document/d/1_tlEoFNaAe1ibJXJRFKXwRbJNiyO2c-1St59sAZBWVc/edit?usp=sharing
              // but last a edit?usp=sharing aite remove kore nicher url er motot preview likhle sudho docs ta show hobe.
              src={
                book?.buyingOptions?.[1]?.fileLink ||
                "https://drive.google.com/file/d/1fSwERpyWCEW2wx5mDqvG-81stNhp1TBg/preview"
              }
              title="PDF Preview"
              className="w-full h-screen"
            />
          ) : (
            <h2 className="text-xl font-bold text-center pt-11">
              PDF Not Available
            </h2>
          )}
        </div>
      </Modal>

      {/* <div className="flex justify-between border-b-2 py-4 mt-2 items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Q/A</h2>
        <button onClick={openQuestionModal} className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ask a Question
        </button>
      </div> */}

      {/* Q&A List */}
      {/* <div className="space-y-4">
        {questions?.[0]?.questions?.map((qa) => (
          <div key={qa.number} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-semibold text-lg">{qa.question}</h3>
            <p className="text-gray-600">
              Asked by: {qa.questionedBy} on {qa.questionedDate}
            </p>
            <div className="mt-2">
              {qa.answer ? (
                <>
                  <p className="text-gray-800">{qa.answer.response}</p>
                  <p className="text-gray-500">
                    Answered by: {qa.answer.answeredBy} on{" "}
                    {qa.answer.answeredDate}
                  </p>
                </>
              ) : (
                <p className="text-gray-500 italic">Awaiting answer...</p>
              )}
            </div>


            <button
              onClick={() => setReplyingTo(qa.number)} // Set the question to reply to
              className="text-blue-500 mt-2"
            >
              Reply
            </button>


            {replyingTo === qa.number && (
              <form
                onSubmit={(e) => handleReplySubmit(e, qa.number)} // Submit reply for specific question
                className="mt-4"
              >
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Type your reply here..."
                  className="mb-2 w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 rounded"
                >
                  Submit Reply
                </button>
              </form>
            )}
          </div>
        ))}
      </div> */}

      {/* Question Section
      <div className="w-full max-w-4xl mx-auto p-4">
        <Modal
          className="fixed inset-0 bg-opacity-75 bg-gray-500 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
          isOpen={questionModalIsOpen}
          onRequestClose={() => setQuestionModalIsOpen(false)}
        >
          <div className=" rounded-lg p-6 ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-black font-semibold">
                Ask a Question
              </h3>
              <button onClick={() => setQuestionModalIsOpen(false)}>
                <X className="h-6 text-red-500 font-extrabold w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmitQuestion}>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Type your question here..."
                className="mb-4 w-full"
              />
              <button
                type="submit"
                className=" btn text-yellow-50 text-lg  bg-[#00bffe]"
              >
                Submit Question
              </button>
            </form>
          </div>
        </Modal>
      </div> */}

      <BookInformation book={book}></BookInformation>

      <ReviewPage book={book} refetch={refetch}></ReviewPage>

      <SimilarBooks category={book?.category?.[0]}></SimilarBooks>
    </div>
  );
}
