import Image from "next/image";
import Link from "next/link";

const Success = () => {
  return (
    <div className="flex items-center justify-center py-[25px] md:py-[35px] lg:py-[50px]">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center z-10">
        <div className="flex justify-center items-center mb-4">
          <div className="w-[90px] h-[90px] rounded-full bg-green-100 flex justify-center items-center">
            <Image
              height={400}
              width={400}
              className=""
              src="https://i.postimg.cc/T38Ht5GV/check-mark-removebg-preview.png"
              alt="Success Logo"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Payment Succeeded!</h2>
        <p className="text-gray-600 mb-5">
          Thank you for your purchase! Your book has been successfully
          purchased.
        </p>

        <Link
          href="/my-order"
          className="hover:bg-[#ff4d6d] bg-[#01c0ff] text-white px-6 py-2 rounded-full transition-transform transform hover:scale-95"
        >
          My Order
        </Link>
      </div>
    </div>
  );
};

export default Success;
