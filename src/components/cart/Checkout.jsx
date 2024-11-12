import { HiArrowNarrowRight  } from "react-icons/hi";

const Checkout = () => {
    return (
        <button className="mt-14 btn hover:bg-primary/55 text-white bg-primary w-full">
            <div className="flex gap-x-1 items-center">
                <span>Checkout</span>
                <HiArrowNarrowRight  className="text-base" />
            </div>
        </button>
    );
};

export default Checkout;