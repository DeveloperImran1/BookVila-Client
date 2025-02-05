// react icons
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { BsMessenger } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  const handleNewsletterSubmit = () => {
    toast.success("Thank you for join us ❤️");
  };
  return (
    <section className="container">
      <footer className="bg-white boxShadow rounded-xl w-full py-6 lg:py-9 px-3 lg:px-5">
        <div className="flex justify-between gap-[15px] md:gap-[25px] lg:gap-[30px] flex-wrap w-full">
          <div className="">
            <h3 className="text-[1rem] font-semibold mb-2 text-gray-500">
              SHOP BY
            </h3>
            <div className="flex text-black flex-col gap-[10px]">
              <Link
                href={"/all-book"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                বই
              </Link>

              <Link
                href={"/"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                লেখক
              </Link>

              <Link
                href={"/all-book"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                ক্যাটাগরি
              </Link>

              <Link
                href={"/"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                প্রকাশনী
              </Link>
            </div>
          </div>
          <div className="">
            <h3 className="text-[1rem] font-semibold mb-2 text-gray-500">
              USEFULL LINKSS
            </h3>
            <div className="flex text-black flex-col gap-[10px]">
              <Link
                href={"/my-profile"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                My Account
              </Link>

              <Link
                href={"/wishlist"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                Wishlist
              </Link>

              <Link
                href={"/my-order"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                My Orders
              </Link>

              <Link
                href={"/my-review"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                My Reviews
              </Link>
            </div>
          </div>
          <div className="">
            <h3 className="text-[1rem] font-semibold mb-2 text-gray-500">
              LEGAL
            </h3>
            <div className="flex text-black flex-col gap-[10px]">
              <Link
                href={"/"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                Privacy Policy
              </Link>

              <Link
                href={"/about-us"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                Terms & Conditions
              </Link>

              <Link
                href={"/about-us"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                About Us
              </Link>

              <Link
                href={"/contact-us"}
                className="text-[0.9rem] text-text hover:text-[#00bffe] cursor-pointer transition-all duration-200 hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="">
            <h3 className="text-[1rem] font-semibold mb-2 text-gray-500">
              JOIN A Newsletter
            </h3>
            <div className="flex gap-[2px] flex-col text-text relative">
              <label className="text-[0.9rem]">Your Email</label>
              <input
                type="email"
                className="py-3 px-4 w-full pr-[90px] rounded-md border border-[#00bffe] outline-none"
                placeholder="Email address"
              />

              <button
                onClick={handleNewsletterSubmit}
                className="px-4 h-[67%] rounded-r-md bg-[#00bffe] text-white absolute top-[24px] right-0"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-[20px] mt-[40px] flex flex-col md:flex-row items-center justify-between w-full flex-wrap gap-[20px]">
          <Link href="/">
            <Image
              height={676}
              width={1200}
              src="https://i.postimg.cc/d0Q1LPVR/Bookvila-removebg-preview.png"
              alt="logo"
              className="w-[120px] h-[60px] "
            />
          </Link>

          <p className="text-[0.9rem] text-center text-gray-600">
            &copy; 2025{" "}
            <Link
              href={"https://developerimran-portfolio.netlify.app/"}
              target="_blank"
              className="font-bold hover:text-primary hover:underline"
            >
              Book Vila Team
            </Link>
            . All Rights Reserved.{" "}
          </p>

          <div className="flex items-center gap-[10px] text-text">
            <a
              href="https://www.facebook.com/bookvilabd"
              target="_blank"
              className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#00bffe] transition-all duration-300"
            >
              <CgFacebook />
            </a>
            <a
              href="https://m.me/bookvilaBD"
              target="_blank"
              className="text-[1rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#00bffe] transition-all duration-300"
            >
              <BsMessenger />
            </a>
            <a
              href="https://wa.me/message/XPWNEV3HUN6MO1"
              target="_blank"
              className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#00bffe] transition-all duration-300"
            >
              <IoLogoWhatsapp />
            </a>
            <a
              href="https://t.me/developerrakib0"
              target="_blank"
              className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#00bffe] transition-all duration-300"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
