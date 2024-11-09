import { CiDiscount1 } from "react-icons/ci";

const DiscountCard = () => {
    return (
        <div className="mt-10 rounded border border-primary">
        <div className="">
          {/* ENGLISH10 */}
          <div className="text-xs p-2 cursor-pointer group">
            <div className="flex items-center text-primary gap-1">
              <div className="">
                <CiDiscount1 />
              </div>
              <span className='group-hover:underline'>ENGLISH10:</span>
            </div>
            <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">10% Discount on English Old</p>
          </div>
          <div className="border-b border-dashed border-b-black05"></div>
          {/* FREE DELIVERY: */}
          <div className="text-xs p-2 cursor-pointer group">
            <div className="flex items-center text-primary gap-1">
              <div className="">
                <CiDiscount1 />
              </div>
              <span className='group-hover:underline'>FREEDELIVERY :</span>
            </div>
            <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">699 টাকার পুরাতন অথবা 1999 টাকার নতুন বই অর্ডার করলে ফ্রি ডেলিভারি।</p>
          </div>
        </div>
      </div>
    );
};

export default DiscountCard;