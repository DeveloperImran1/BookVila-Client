"use client"
import { useState } from "react";
import { Heart, Share2, Info, Star, ShoppingCart } from "lucide-react";
import Modal from "react-modal";
import { PlusCircle, X } from 'lucide-react';
import { motion } from "framer-motion";
import { FaBook, FaPen, FaBuilding, FaBarcode } from "react-icons/fa";

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
    answerDate: "28 Jul, 2024"
  },
  {
    id: "2",
    question: "পিডিএফ বই কি ভাবে ডাউনলোড করা যাবে না pdf?",
    answer: "দুঃখিত, আপনাকে হার্ডকপি অর্ডার করতে হবে।",
    questionedBy: "Md.Abu Siddique",
    answeredBy: "Md. Mahmud Alam",
    questionDate: "07 Oct, 2020",
    answerDate: "07 Oct, 2020"
  }
];

export default function BookDetails() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [qas, setQas] = useState(initialQAs);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // Track the question being replied to
  const [newReply, setNewReply] = useState(""); // State for the reply input
  
// Question And Ans Form
  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const newQA = {
        id: (qas.length + 1).toString(),
        question: newQuestion,
        answer: "",
        questionedBy: "Anonymous",
        answeredBy: "",
        questionDate: new Date().toLocaleDateString(),
        answerDate: ""
      };
      setQas([newQA, ...qas]);
      setNewQuestion("");
    }
  };
  const handleReplySubmit = (e, qaId) => {
    e.preventDefault();
    setQas(
      qas.map((qa) =>
        qa.id === qaId
          ? { ...qa, answer: newReply, answeredBy: "Admin", answerDate: new Date().toLocaleDateString() }
          : qa
      )
    );
    setNewReply("");
    setReplyingTo(null); // Close the reply form after submission
  };

  // Initial Book Data
  const bookData = {
    title: ["ইতি স্মৃতিপক্ষ", "Iti Smritipakkha"],
    publisher: ["অন্যধারা", "Onnodhara"],
    category: ["সমকালীন উপন্যাস", "Contemporary Novel"],
    price: 660,
    discount: 25,
    stock: 10,
    edition: "5th Edition",
    pages: 400,
    isbn: "9789849598060",
    ratings: 62,
    reviews: 26,
    coverImage: "https://i.ibb.co/2gcSdDv/pexels-thought-catalog-317580-904620.jpg",
    authorInfo: {
      name: ["সাদাত হোসাইন", "Sadat Hossain"]
    },
    pdfUrl: "https://drive.google.com/file/d/1DnTI5ohyr0MutrSUkt6DbxmhZSRC4k6w/preview"
  };

  const discountedPrice = Math.round(bookData.price - (bookData.price * bookData.discount / 100));
  const savings = bookData.price - discountedPrice;

  const openModal = () => {
    setModalIsOpen(true);
  };
  const openQuestionModal  = () => setQuestionModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setIsLoading(true); // Reset loading state when modal closes
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto border rounded shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Book Cover Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full md:w-1/3 cursor-pointer"
          onClick={openModal}
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <div className="absolute top-4 -left-4 bg-red-500 px-3 rounded-full transform -rotate-45">
              <p className="text-white text-base">
                <span className="font-bold">{bookData.discount}%</span> OFF
              </p>
            </div>
            <img 
              src={bookData.coverImage} 
              alt={bookData.title[0]}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Book Details Section */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl text-black font-bold">{bookData.title[0]}</h1>
                <p className="text-gray-500">({bookData.title[1]})</p>
              </div>
              <Info className="h-5 w-5 text-gray-500" title="Book information" />
            </div>
            <p className="text-gray-500 mt-2">by {bookData.authorInfo.name[0]}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-400"}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {bookData.ratings} Ratings | {bookData.reviews} Reviews
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-gray-600 font-bold">TK. {discountedPrice}</span>
              <span className="text-lg text-gray-500 line-through">TK. {bookData.price}</span>
              <span className="text-green-600 text-sm">
                You Save TK. {savings} ({bookData.discount}%)
              </span>
            </div>
            {bookData.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                In Stock (only {bookData.stock} copies left)
              </div>
            ) : (
              <div className="text-red-600">Out of Stock</div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 text-gray-700 mt-8">
            <div className="text-center">
              <FaBook className="text-lg mx-auto text-[#00befe8c]" />
              <h1 className="font-semibold">Book Length</h1>
              <h4>{bookData.pages} Pages</h4>
            </div>
            <div className="text-center">
              <FaPen className="text-lg mx-auto text-[#00befe8c]" />
              <h1 className="font-semibold">Edition</h1>
              <h3>{bookData.edition}</h3>
            </div>
            <div className="text-center">
              <FaBuilding className="text-lg mx-auto text-[#00befe8c]" />
              <h1 className="font-semibold">Publication</h1>
              <h2>{bookData.publisher[0]}</h2>
            </div>
            <div className="text-center">
              <FaBarcode className="text-lg mx-auto text-[#00befe8c]" />
              <h1 className="font-semibold">ISBN</h1>
              <div>{bookData.isbn}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="p-2 bg-[#00bffe] text-white rounded flex items-center justify-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </button>
            <button onClick={openModal} className="p-2 bg-slate-200 border rounded font-bold text-[#077aa0b7]">
              একটু পড়ে দেখুন
            </button>
          </div>

          <div className="flex items-center gap-4 justify-center pt-4">
            <button className="text-gray-500 flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Add to Booklist
            </button>
            <button className="text-gray-500 flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share This Book
            </button>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 bg-opacity-75 bg-gray-500 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative p-6">
          <X className="absolute top-3 right-3 cursor-pointer text-gray-500" onClick={closeModal} />
          <div className="relative h-[500px] w-full">
            {isLoading && (
              <p className="absolute inset-0 flex items-center justify-center text-gray-500">Loading...</p>
            )}
            <iframe
              src={bookData.pdfUrl}
              title="PDF Preview"
              onLoad={handleIframeLoad}
              className="w-full h-full"
            />
          </div>
        </div>
      </Modal>
      <div className="flex justify-between border-b-2 py-4 mt-2 items-center mb-6">
           <h2 className="text-2xl font-semibold">Product Q/A</h2>
           <button onClick={openQuestionModal} className="flex items-center">
             <PlusCircle className="mr-2 h-4 w-4" />
             Ask a Question
           </button>
         </div>
  {/* Q&A List */}
  <div className="space-y-4">
        {qas.map((qa) => (
          <div key={qa.id} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-semibold text-lg">{qa.question}</h3>
            <p className="text-gray-600">Asked by: {qa.questionedBy} on {qa.questionDate}</p>
            <div className="mt-2">
              {qa.answer ? (
                <>
                  <p className="text-gray-800">{qa.answer}</p>
                  <p className="text-gray-500">Answered by: {qa.answeredBy} on {qa.answerDate}</p>
                </>
              ) : (
                <p className="text-gray-500 italic">Awaiting answer...</p>
              )}
            </div>

            {/* Reply Button */}
            <button onClick={() => setReplyingTo(qa.id)} className="text-blue-500 mt-2">
              Reply
            </button>

            {/* Reply Form */}
            {replyingTo === qa.id && (
              <form onSubmit={(e) => handleReplySubmit(e, qa.id)} className="mt-4">
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Type your reply here..."
                  className="mb-2 w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                  Submit Reply
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

             {/* Question Section */}
       <div className="w-full max-w-4xl mx-auto p-4">
       
        
         <Modal   
           className="fixed inset-0 bg-opacity-75 bg-gray-500 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
          isOpen={questionModalIsOpen} onRequestClose={() => setQuestionModalIsOpen(false)}>
           <div className=" rounded-lg p-6 ">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl text-black font-semibold">Ask a Question</h3>
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
              <button type="submit" className=" btn text-yellow-50 text-lg  bg-[#00bffe]">Submit Question</button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

