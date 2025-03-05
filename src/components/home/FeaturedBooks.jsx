"use client";

import CommonSectionBook from "./CommonSectionBook";

const FeaturedBooks = () => {
  return (
    <div className="   ">
      <CommonSectionBook
        sectionTitle="বাছাইকৃত বই"
        attribute="isFeatured"
      ></CommonSectionBook>
    </div>
  );
};

export default FeaturedBooks;
