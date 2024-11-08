"use client"
import Banner from "./Banner";
import BudgetFriendlyBooks from "./BudgetFriendlyBooks";
import FeaturedBooks from "./FeaturedBooks";
import RecentlyBooks from "./RecentlyBooks";


const HomeContainer = () => {
    return (
        <div className=" ">
          <Banner></Banner>
         <FeaturedBooks/>
         <RecentlyBooks/>
         <BudgetFriendlyBooks/>
        </div>
    );
};

export default HomeContainer;