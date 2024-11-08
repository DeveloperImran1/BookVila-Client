"use client"
import Banner from "./Banner";
import FeaturedBooks from "./FeaturedBooks";


const HomeContainer = () => {
    return (
        <div className=" ">
          <Banner></Banner>
         
          <FeaturedBooks/>
        </div>
    );
};

export default HomeContainer;