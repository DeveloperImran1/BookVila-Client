"use client"
import Banner from "./Banner";
import BudgetFriendlyBooks from "./BudgetFriendlyBooks";
import FamousPublisher from "./FamousPublisher";
import FamousWriter from "./FamousWriter";
import FeaturedBooks from "./FeaturedBooks";
import RecentlyBooks from "./RecentlyBooks";
import Review from "./Review";


const HomeContainer = () => {
  return (
    <div className=" ">
      <Banner></Banner>
      <FeaturedBooks />
      <RecentlyBooks />
      <BudgetFriendlyBooks />
      <FamousWriter />
      <FamousPublisher />
      <Review></Review>
    </div>
  );
};

export default HomeContainer;