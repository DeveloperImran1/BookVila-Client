import Link from "next/link";

const CommonSectionForTitleAndSeeMore = ({
  title,
  seeMorePathName,
  children,
}) => {
  return (
    <section className="container">
      <div className="bg-white my-8 p-2 lg:p-4 relative">
        <div className="flex justify-between mb-6 font-semibold">
          <h1 className="text-[16px] md:text-[18px]  text-gray-600">{title}</h1>
          <Link href={seeMorePathName}>
            <h1 className="text-bg-blue underline">See more</h1>
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
};

export default CommonSectionForTitleAndSeeMore;
