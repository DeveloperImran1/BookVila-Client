import Image from "next/image";
import Link from "next/link";

const Cancle = () => {
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
        <h2 className="text-2xl font-semibold mb-2">
          Your Purchase Was Cancelled.
        </h2>
        <p className="text-gray-600">
          You have cancelled the purchase process. If this was accidental,
          please try again.
        </p>
        <p className=" mb-6 mt-2">
          For any issues, feel free to contact{" "}
          <a
            target="_blank"
            className="font-bold text-[#01c0ff]"
            href="https://wa.me/message/XPWNEV3HUN6MO1"
          >
            our support team.
          </a>
        </p>
        <Link
          href="/cart"
          className="hover:bg-[#ff4d6d] bg-[#01c0ff] text-white px-6 py-2 rounded-full transition-transform transform hover:scale-95"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default Cancle;
