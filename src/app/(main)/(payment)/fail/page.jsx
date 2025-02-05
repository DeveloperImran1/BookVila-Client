import Image from "next/image";
import Link from "next/link";

const Fail = () => {
  return (
    <div className="flex items-center justify-center py-[25px] md:py-[35px] lg:py-[50px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center z-10">
        <div className="flex justify-center items-center mb-4">
          <div className="w-[90px] h-[90px] rounded-full bg-red-100 flex justify-center items-center">
            <Image
              height={400}
              width={400}
              className=""
              src="https://i.postimg.cc/nrnF7mJP/png-transparent-button-computer-icons-cancel-button-logo-sign-internet-thumbnail-removebg-preview.png"
              alt="Success Logo"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Purchase Failed</h2>
        <p className="text-gray-600">
          We are sorry! Your purchase could not be completed.
        </p>
        <p className=" mb-6 mt-2">
          Please check your payment method or internet connection and try again.
        </p>
        <Link
          href="https://wa.me/message/XPWNEV3HUN6MO1"
          target="_blank"
          className="hover:bg-[#ff4d6d] bg-[#01c0ff] text-white px-6 py-2 rounded-full transition-transform transform hover:scale-95"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default Fail;
