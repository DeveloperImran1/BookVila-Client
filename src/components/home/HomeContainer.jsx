"use client";
import Banner from "./Banner";
import BestSeller from "./BestSeller";
import BudgetFriendlyBooks from "./BudgetFriendlyBooks";
import ComboOffer from "./ComboOffer";
import FamousPublisher from "./FamousPublisher";
import FamousWriter from "./FamousWriter";
import FeaturedBooks from "./FeaturedBooks";
import FlashSale from "./FlashSale";
import GiftBook from "./GiftBook";
import PreOrder from "./PreOrder";
import RecentlyBooks from "./RecentlyBooks";
import Review from "./Review";
import TrendingBook from "./TrendingBook";

const HomeContainer = () => {
  return (
    <div className=" ">
      <Banner></Banner>
      <FeaturedBooks />
      <BestSeller />
      <TrendingBook />

      <ComboOffer />
      <FlashSale />
      <GiftBook />
      <PreOrder />

      <RecentlyBooks />
      <BudgetFriendlyBooks />
      <FamousWriter />
      <FamousPublisher />
      <Review></Review>
    </div>
  );
};

export default HomeContainer;
