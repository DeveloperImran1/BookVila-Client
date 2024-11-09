import DiscountCard from "./DiscountCard";
import OrderSummary from "./OrderSummary";
import PromoCode from "./PromoCode";

const RightSide = () => {
    return (
        <div>
            <OrderSummary/>
            <DiscountCard/>
            <PromoCode/>
        </div>
    );
};

export default RightSide;