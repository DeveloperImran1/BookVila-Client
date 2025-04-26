const BookCardSkelletion = () => {
  return (
    <div className="flex w-full flex-col mx-auto gap-4 bg-white">
      <div className="skeleton h-32 w-full bg-gray-300"></div>
      <div className="skeleton h-4 w-28 bg-gray-300"></div>
      <div className="skeleton h-4 w-full bg-gray-300"></div>
      <div className="skeleton h-4 w-full bg-gray-300"></div>
    </div>
  );
};

export default BookCardSkelletion;
