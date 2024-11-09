import Checkout from "./Checkout";
import DiscountCard from "./DiscountCard";
import OrderSummary from "./OrderSummary";
import PromoCode from "./PromoCode";

const RightSide = () => {
    return (
        <div>
            <OrderSummary/>
            <DiscountCard/>
            <PromoCode/>
            <Checkout/>
        </div>
    );
};

export default RightSide;