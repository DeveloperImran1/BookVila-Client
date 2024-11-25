"use client";
import { useEffect, useState } from "react";
import { Heart, Share2, Info, Star, ShoppingCart } from "lucide-react";
import Modal from "react-modal";
import { PlusCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { FaBook, FaPen, FaBuilding, FaBarcode } from "react-icons/fa";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { PanoramaSharp } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { cartBookGet, favoruteBookGet, setCartBook, setFavoruteBook } from "@/hooks/localStorage";
import { useSession } from "next-auth/react";
import BookInformation from "./BookInformation";
import ReviewPage from "./ReviewPage";
import SimilarBooks from "./SimilarBook";
import Loading from "../shared/Loading";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

    const { data: book = {}, isLoading, refetch } = useQuery({
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

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };
  // const openQuestionModal = () => setQuestionModalIsOpen(true);
  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setIsLoading(true); // Reset loading state when modal closes
  // };

  // const handleIframeLoad = () => {
  //   setIsLoading(false);
  // };


  // add favorute list relate kaj 
  useEffect(() => {
    const res = favoruteBookGet()
    const favoruteArr = res?.map(singleBook => singleBook?.books?._id)
    setFavorutes(favoruteArr)
    setFavoruteBooks(res)
  }, [])




  const handleFavoruteAdded = async () => {
    const obj = { userEmail: session?.data?.user?.email || "demoEmail@gmail.com", books: book }
    setFavoruteBook(obj)

    // refetch er kaj korbe
    const res = favoruteBookGet()
    const favoruteArr = res?.map(singleBook => singleBook?.books?._id)
    setFavorutes(favoruteArr)
    setFavoruteBooks(res)
  }


  // add to cart relate kaj

  useEffect(() => {
    const res = cartBookGet();
    const cartArr = res?.map(singleBook => singleBook?.books?._id)
    setAddToCart(cartArr)
    setCartBooks(res)
  }, [])




  // add add to cart
  const handleAddtoCart = async () => {
    const obj = { userEmail: session?.data?.user?.email || 'demoEmail@gmail.com', books: book }
    setCartBook(obj)

    // refetch 
    const res = cartBookGet();
    const cartArr = res?.map(singleBook => singleBook?.books?._id)
    setAddToCart(cartArr)
    setCartBooks(res)
  }



  if (isLoading) {
    <Loading></Loading>
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
          <div className="absolute top-2 -left-6 bg-red-500 px-3  transform -rotate-45">
            <p className="text-white text-base px-3 py-1">
              <span className="font-bold">{book?.discount}%</span> OFF
            </p>
          </div>
          <Image
            src={book?.coverImage}
            alt={book?.bookName?.[0] || "Books"}
            className="w-full h-[300px]  md:h-[500px] object-cover"
            height={676}
            width={1200}
          />
        </div>

        {/* Book Details Section */}

        <div className="w-full md:w-[60%] space-y-6 p-4 bg-white">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl text-black font-bold">
                  {book?.bookName?.[0]}
                </h1>
                <p className="text-gray-500">({book?.bookName?.[1]})</p>
              </div>
              <Info
                className="h-5 w-5 text-gray-500"
                title="Book information"
              />
            </div>
            <p className="text-gray-500 mt-2">by {book?.authorInfo?.name?.[0]}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-400"
                    }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {book?.ratings} Ratings | {book?.reviews} Reviews
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-gray-600 font-bold">
                TK. {discountedPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                TK. {book?.price}
              </span>
              <span className="text-green-600 text-sm">
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

          <div className="flex flex-col md:flex-row gap-4 text-gray-700 mt-8">
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

          <div className="flex items-center gap-4 justify-start pt-4">
            <button onClick={handleFavoruteAdded} className={`${addToCart?.includes(book?._id) ? 'text-secondary  ' : 'text-gray-500 '} text-gray-500 flex items-center`} >
              {/* <button onClick={handleFavoruteAdded}  className="text-gray-500 hover:text-primary flex items-center"> */}
              <Heart className="mr-2 h-4 w-4 " />
              Add to Booklist
            </button>
            <button className="text-gray-500 flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share This Book
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleAddtoCart} className={`${addToCart?.includes(book?._id) ? 'bg-secondary text-white ' : 'bg-[#00bffe] text-white'} p-2  rounded flex items-center justify-center`} >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </button>
            <button
              // onClick={openModal}    // pdf er system akhono korini
              className="p-2 bg-slate-200 border rounded font-bold text-[#077aa0b7]"
            >
              একটু পড়ে দেখুন
            </button>
          </div>


        </div>
      </div>
      {/* </motion.div> */}



      {/* </div> */}

      {/* PDF Preview Modal */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 bg-opacity-75 bg-gray-500 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative p-6">
          <X
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={closeModal}
          />
          <div className="relative h-[500px] w-full">
            {isLoading && (
              <p className="absolute inset-0 flex items-center justify-center text-gray-500">
                Loading...
              </p>
            )}
            <iframe
              src={book?.pdfUrl}
              title="PDF Preview"
              onLoad={handleIframeLoad}
              className="w-full h-full"
            />
          </div>
        </div>
      </Modal> */}
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

      <ReviewPage book={book} refetch={refetch}  ></ReviewPage>

      <SimilarBooks category={book?.category?.[0]}></SimilarBooks>
    </div>
  );
}
