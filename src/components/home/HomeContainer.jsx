"use client"
import Banner from "./Banner";
import BudgetFriendlyBooks from "./BudgetFriendlyBooks";
import FamousWriter from "./FamousWriter";
import FeaturedBooks from "./FeaturedBooks";
import RecentlyBooks from "./RecentlyBooks";


const HomeContainer = () => {
    return (
        <div className=" ">
          <Banner></Banner>
         <FeaturedBooks/>
         <RecentlyBooks/>
         <BudgetFriendlyBooks/>
         <FamousWriter/>
        </div>
    );
};

export default HomeContainer;