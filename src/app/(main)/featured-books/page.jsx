import BooksCard from "@/components/books/BookCard";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const FeaturedBooks = () => {

    const books = [
        {
          _id: "1",
          category: "Electronics",
          color: "Black",
          description: "High-quality wireless headphones with noise cancellation.",
          image:
            "https://www.shutterstock.com/image-vector/3d-wireless-headphones-mockup-set-260nw-2130630635.jpg",
          offer: 20,
          price: 79.99,
          title: "Wireless Headphones",
          totalAvailable: 30,
        },
        {
          _id: "2",
          category: "Home Appliances",
          color: "Silver",
          description: "Energy-efficient smart vacuum cleaner.",
          image:
            "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
          offer: 15,
          price: 199.99,
          title: "Smart Vacuum Cleaner",
          totalAvailable: 15,
        },
        {
          _id: "3",
          category: "Fashion",
          color: "Blue",
          description: "Stylish denim jacket for all occasions.",
          image:
            "https://www.shutterstock.com/image-vector/3d-wireless-headphones-mockup-set-260nw-2130630635.jpg",
          offer: 10,
          price: 49.99,
          title: "Denim Jacket",
          totalAvailable: 25,
        },
        {
          _id: "4",
          category: "Fitness",
          color: "Green",
          description: "Durable yoga mat for all fitness levels.",
          image:
            "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
          offer: 5,
          price: 29.99,
          title: "Yoga Mat",
          totalAvailable: 50,
        },
        {
          _id: "5",
          category: "book",
          color: "Multi",
          description: "A motivational book for personal growth.",
          image:
            "https://img.drz.lazcdn.com/static/bd/p/70de89e7dfae0fdc030ed5c5006f93d2.jpg_720x720q80.jpg",
          offer: 25,
          price: 14.99,
          title: "Motivational Book",
          totalAvailable: 100,
        },
      ];

      
    return (
        <section className="container  ">
            <div className="relative bg-white rounded-md">
                <Image height={676} width={1200} src={"https://pathokpoint.com/_next/image?url=%2Fdefault%2Fpublisher-cover.jpg&w=1920&q=75"} alt="featured books" className="h-[360px] w-full pb-[160px] "></Image>

                <div className="flex items-center gap-3 absolute bottom-[30px] left-11">
                    <Image height={676} width={1200} src={"https://prokashoni.net/wp-content/themes/prokashoni/assets/images/stations/default.png"} alt="featured books" className="h-[190px] w-[190px] rounded-full border-[4px] "></Image>
                    <h1 className="text-[22px] font-bold">বাতিঘর</h1>
                </div>

            </div>

            <div className="bg-white mt-[10px] pt-6 px-5 rounded-md">
                <div className="flex items-center justify-between text-gray-500">
                    <p>Tota Result 13</p>
                    <span className="relative   ">
                        <input type="text" placeholder="Search Anything" className="  bg-bg-gray  md:w-[200px] lg:w-[300px] py-3  px-2 border-none focus:outline-none focus:border-none  rounded-md  " />
                        <FaSearch size={22} className='text-gray-500 absolute right-3 top-[20%]'></FaSearch>
                    </span>
                </div>

                {/* all result is here */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[38px] ">
                    {
                        books?.map((book, index) =>  <BooksCard key={index} book={book}></BooksCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturedBooks;