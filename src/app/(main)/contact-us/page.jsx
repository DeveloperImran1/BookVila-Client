"use client";
// react tostify
import { toast } from "react-toastify";

import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { RiHomeOfficeFill } from "react-icons/ri";
const submited = () => toast("Successfully Submited !");

const ContactUs = () => {
  const [place, setPlace] = useState([23.7104, 90.4074]);
  console.log(place);
  const handleSubmit = (e) => {
    e.preventDefault();
    submited();
    e.target.reset();
  };

  const svgs = [
    {
      link: "https://wa.me/message/XPWNEV3HUN6MO1",
      svg: (
        <svg
          width="25px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle fill="#65A2D9" cx="256" cy="256" r="256"></circle>
            <path
              fill="#3A7CA5"
              d="M393.014,139.326c-26.703,23.169-53.253,43.475-74.954,71.852 c-53.381,64.372-118.613,155.7-207.386,142.086l158.61,158.396c134.456-6.873,241.497-117.493,242.686-253.376L393.014,139.326z"
            ></path>
            <path
              fill="#FFFFFF"
              d="M397.872,162.471c-6.513,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.631-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.672,0-13.405,1.04-20.016,3.091 c-20.487,6.353-36.295,23.254-41.257,44.103c-1.86,7.818-2.362,15.648-1.496,23.264c0.097,0.876-0.314,1.486-0.569,1.772 c-0.45,0.502-1.084,0.791-1.745,0.791c-0.072,0-0.15-0.003-0.224-0.01c-44.846-4.168-85.287-25.772-113.869-60.837 c-1.455-1.789-4.253-1.569-5.415,0.422c-5.596,9.606-8.554,20.589-8.554,31.766c0,17.127,6.884,33.27,18.837,45.039 c-5.027-1.193-9.893-3.07-14.414-5.582c-2.188-1.214-4.877,0.35-4.908,2.851c-0.31,25.445,14.588,48.087,36.905,58.282 c-0.45,0.01-0.9,0.014-1.35,0.014c-3.537,0-7.121-0.338-10.645-1.015c-2.463-0.467-4.532,1.867-3.768,4.253 c7.246,22.618,26.717,39.288,50.021,43.07c-19.339,12.983-41.863,19.83-65.302,19.83l-7.306-0.003c-2.255,0-4.16,1.469-4.73,3.65 c-0.565,2.145,0.474,4.413,2.396,5.53c26.412,15.372,56.541,23.495,87.138,23.495c26.784,0,51.838-5.313,74.466-15.798 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.286,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471 L397.872,162.471z"
            ></path>
            <path
              fill="#D1D1D1"
              d="M397.872,162.471c-6.515,2.889-13.271,5.167-20.208,6.815c7.644-7.261,13.39-16.346,16.632-26.484 c0.926-2.893-2.219-5.398-4.832-3.848c-9.65,5.725-20.044,10.016-30.894,12.762c-0.628,0.16-1.276,0.24-1.929,0.24 c-1.979,0-3.896-0.733-5.411-2.065c-11.542-10.174-26.39-15.777-41.805-15.777c-6.671,0-13.405,1.04-20.016,3.091 c-14.322,4.441-26.343,14.048-33.985,26.546v205.477c6.222-2.029,12.293-4.403,18.198-7.139 c20.745-9.609,39.076-23.345,54.486-40.827c14.357-16.287,25.581-35.085,33.365-55.879c7.418-19.816,11.34-40.967,11.34-61.154 v-0.964c0-3.241,1.465-6.291,4.024-8.37c9.706-7.882,18.16-17.158,25.122-27.572C403.796,164.578,400.896,161.13,397.872,162.471z"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      link: "https://m.me/bookvilaBD",
      svg: (
        <svg
          width="25px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle fill="#6C27B3" cx="256" cy="256" r="256"></circle>
            <path
              fill="#501A96"
              d="M374.71,132.922c-30.587,3.872-62.479,3.737-94.575,0.681 c-44.822-3.448-110.33-24.135-134.465,17.239c-38.772,66.236-19.649,151.035-10.614,226.078l134.737,134.708 c130.388-6.923,234.886-111.407,241.831-241.79L374.71,132.922z"
            ></path>
            <g>
              <path
                fill="#FFFFFF"
                d="M315.227,109.468H196.772c-48.14,0-87.304,39.164-87.304,87.304v118.455 c0,48.138,39.164,87.305,87.305,87.305h118.455c48.138,0,87.305-39.165,87.305-87.305V196.772 C402.532,148.632,363.367,109.468,315.227,109.468L315.227,109.468z M373.05,315.228c0,31.934-25.888,57.822-57.822,57.822H196.773 c-31.934,0-57.822-25.888-57.822-57.822V196.773c0-31.934,25.888-57.823,57.822-57.823h118.455 c31.934,0,57.822,25.89,57.822,57.823V315.228z"
              ></path>
              <path
                fill="#FFFFFF"
                d="M256,180.202c-41.794,0-75.798,34.004-75.798,75.798c0,41.791,34.004,75.795,75.798,75.795 s75.795-34.001,75.795-75.795S297.794,180.202,256,180.202L256,180.202z M256,302.313c-25.579,0-46.316-20.733-46.316-46.313 s20.737-46.316,46.316-46.316s46.313,20.735,46.313,46.316C302.313,281.579,281.579,302.313,256,302.313L256,302.313z"
              ></path>
            </g>
            <g>
              <path
                fill="#D1D1D1"
                d="M350.103,180.774c0,10.03-8.132,18.163-18.163,18.163c-10.03,0-18.163-8.133-18.163-18.163 c0-10.031,8.133-18.163,18.163-18.163C341.973,162.611,350.103,170.741,350.103,180.774L350.103,180.774z"
              ></path>
              <path
                fill="#D1D1D1"
                d="M315.228,109.468h-59.802v29.482h59.802c31.934,0,57.822,25.89,57.822,57.823v118.455 c0,31.934-25.888,57.822-57.822,57.822h-59.802v29.482h59.802c48.138,0,87.304-39.165,87.304-87.305V196.772 C402.532,148.632,363.367,109.468,315.228,109.468z"
              ></path>
              <path
                fill="#D1D1D1"
                d="M256,180.202c-0.193,0-0.381,0.014-0.574,0.014v29.482c0.191-0.002,0.381-0.014,0.574-0.014 c25.579,0,46.313,20.735,46.313,46.316c0,25.579-20.733,46.313-46.313,46.313c-0.193,0-0.383-0.012-0.574-0.014v29.482 c0.193,0.002,0.381,0.014,0.574,0.014c41.794,0,75.795-34.002,75.795-75.795C331.795,214.206,297.794,180.202,256,180.202z"
              ></path>
            </g>
          </g>
        </svg>
      ),
    },
    {
      link: "https://www.facebook.com/bookvilabd",
      svg: (
        <svg
          width="25px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle fill="#D22215" cx="256" cy="256" r="256"></circle>
            <path
              fill="#A81411"
              d="M384.857,170.339c-7.677,2.343-15.682,4.356-23.699,6.361 c-56.889,12.067-132.741-20.687-165.495,32.754c-27.317,42.494-35.942,95.668-67.017,133.663L294.629,509.1 c110.47-16.72,197.773-104.036,214.476-214.511L384.857,170.339z"
            ></path>
            <path
              fill="#FFFFFF"
              d="M341.649,152.333H170.351c-33.608,0-60.852,27.245-60.852,60.852v85.632 c0,33.608,27.245,60.852,60.852,60.852h171.298c33.608,0,60.852-27.245,60.852-60.852v-85.632 C402.501,179.578,375.256,152.333,341.649,152.333L341.649,152.333z M300.494,260.167l-80.12,38.212 c-2.136,1.019-4.603-0.536-4.603-2.901v-78.814c0-2.4,2.532-3.955,4.67-2.87l80.12,40.601 C302.947,255.602,302.904,259.019,300.494,260.167L300.494,260.167z"
            ></path>
            <path
              fill="#D1D1D1"
              d="M341.649,152.333h-87.373v78.605l46.287,23.455c2.384,1.208,2.341,4.624-0.069,5.773l-46.218,22.044 v77.459h87.373c33.608,0,60.852-27.245,60.852-60.852v-85.632C402.501,179.578,375.256,152.333,341.649,152.333z"
            ></path>
          </g>
        </svg>
      ),
    },
    {
      link: "https://www.facebook.com/bookvilabd",

      svg: (
        <svg
          width="25px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512.002 512.002"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <circle fill="#4E598F" cx="256.001" cy="256" r="256"></circle>
            <path
              fill="#364270"
              d="M511.596,241.7L391.019,121.085c-1.998,0.605-6.982-1.714-9.173-1.274 c-51.717,8.62-101.71,0-151.704,13.791c-24.135,6.896-25.859,36.202-34.478,55.165c-12.067,34.478-10.343,72.404-25.859,105.158 c-10.343,22.411-34.478,36.202-43.098,62.061c-2.875,10.785-2.705,24.379-5.956,34.69l120.98,120.922 c4.725,0.26,9.48,0.403,14.269,0.403c141.384,0,256-114.616,256-256C512.001,251.201,511.858,246.434,511.596,241.7z"
            ></path>
            <g>
              <path
                fill="#FFFFFF"
                d="M363.043,109.466H148.958c-21.809,0-39.49,17.68-39.49,39.49v214.085 c0,21.811,17.68,39.49,39.49,39.49h105.584l0.183-104.722h-27.21c-3.536,0-6.406-2.86-6.418-6.396l-0.133-33.759 c-0.014-3.553,2.867-6.444,6.42-6.444h27.162v-32.618c0-37.852,23.118-58.463,56.884-58.463h27.71c3.543,0,6.42,2.874,6.42,6.42 v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.239h40.351 c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491v-214.09C402.533,127.147,384.852,109.466,363.043,109.466L363.043,109.466z"
              ></path>
              <polygon
                fill="#FFFFFF"
                points="254.542,402.53 254.725,297.808 254.277,297.808 254.277,402.53 "
              ></polygon>
            </g>
            <path
              fill="#D1D1D1"
              d="M363.043,109.466H254.277v141.741h0.269V218.59c0-37.852,23.118-58.463,56.884-58.463h27.71 c3.543,0,6.42,2.874,6.42,6.42v28.463c0,3.546-2.874,6.42-6.416,6.42l-17.006,0.01c-18.363,0-21.921,8.725-21.921,21.533v28.238 h40.351c3.848,0,6.83,3.358,6.375,7.173l-4.001,33.759c-0.381,3.232-3.122,5.665-6.375,5.665h-36.168l-0.183,104.726h62.826 c21.809,0,39.49-17.682,39.49-39.491V148.956C402.533,127.147,384.852,109.466,363.043,109.466z"
            ></path>
          </g>
        </svg>
      ),
    },
  ];
  return (
    <div
      id="contact"
      className="container mx-auto pt-[20px] md:pt-[33px] lg:pt-11"
    >
      <div className="  grid  grid-cols-1 gap-8 px-8 py-16 md:px-12 lg:px-16 xl:px-32 mx-auto rounded-lg md:grid-cols-2  bg-white  text-gray-800">
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              Lets talk!
            </h2>
            <div className="dark:text-gray-600">
              If you know more information? Please Contact Us.
            </div>
          </div>
          <h2 className=" font-bold leading-tight mt-[26px] text-2xl">
            Find Us!
          </h2>
          <div className="flex gap-9 py-2">
            {svgs?.map((svg, idx) => (
              <Link
                href={svg?.link || "/"}
                target="_blank"
                key={idx}
                className="rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  duration-300 hover:scale-150"
              >
                {svg?.svg}
              </Link>
            ))}
          </div>

          <Image
            height={1200}
            width={1200}
            src="https://i.ibb.co/Br9Fpxs/th-2-removebg-preview.png"
            alt=""
            className="lg:-ml-16 h-full"
          />
        </div>
        <form onSubmit={handleSubmit} noValidate="" className="space-y-6 ">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
          >
            <label htmlFor="name" className="text-sm">
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full p-3 rounded  border-2 "
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="150"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
          >
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              placeholder="Your email"
              type="email"
              className="w-full p-3 rounded border-2"
            />
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="250"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
          >
            <label htmlFor="message" className="text-sm">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Message..."
              rows="3"
              className="w-full p-3 rounded border-2"
            ></textarea>
          </div>
          <button
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="350"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            type="submit"
            className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-primary text-gray-50"
          >
            Send Message
          </button>
        </form>
      </div>

      <div>
        <div className="flex flex-col items-center lg:flex-row justify-between pt-[20px] md:pt-[33px] lg:pt-11">
          <div className="grid gap-7 grid-cols-2">
            <div className="w-[230px] h-[230px] cursor-pointer md:mr-4 rounded-3xl bg-white  hover:bg-[#076aa5] hover:text-white flex flex-col justify-center items-center transition-all delay-300">
              <span className="p-3 rounded-full bg-white text-black">
                <RiHomeOfficeFill size={30}></RiHomeOfficeFill>
              </span>
              <h2 className="text-[19px] font-bold group  dark:text-black">
                Shariatpur
              </h2>
              <h2 className="text-center px-3 mt-3 group ">
                Shariatpur Sadar. Neat at Thakurgaon Polytechnic Institute
              </h2>
            </div>

            <div className="w-[230px] h-[230px] cursor-pointer md:mr-4 rounded-3xl bg-white  hover:bg-[#076aa5] hover:text-white flex flex-col justify-center items-center transition-all delay-300">
              <span className="p-3 rounded-full bg-white text-black">
                <FiPhone size={30}></FiPhone>
              </span>
              <h2 className="text-[19px] font-bold group  dark:text-black">
                Phone
              </h2>
              <h2 className="text-center px-3 mt-3 group ">+880 1580-995152</h2>
            </div>
            <div className="w-[230px] h-[230px] cursor-pointer md:mr-4 rounded-3xl bg-white  hover:bg-[#076aa5] hover:text-white flex flex-col justify-center items-center transition-all delay-300">
              <span className="p-3 rounded-full bg-white text-black">
                <MdOutlineEmail size={30}></MdOutlineEmail>
              </span>
              <h2 className="text-[19px] font-bold group  dark:text-black">
                Email
              </h2>
              <h2 className="text-center px-3 mt-3 group ">
                bookvila.xyz@gmail.com
              </h2>
            </div>

            <div className="max-w-[230px] max-h-[230px] cursor-pointer md:mr-4 rounded-3xl bg-white  hover:bg-[#076aa5] hover:text-white flex flex-col justify-center items-center transition-all delay-300">
              <span className="p-3 rounded-full bg-white text-black">
                <AiOutlineClockCircle size={30}></AiOutlineClockCircle>
              </span>
              <h2 className="text-[19px] font-bold group  dark:text-black">
                Working Hours
              </h2>
              <h2 className="text-center px-3 mt-3 group ">7 Days 24 hours</h2>
            </div>
          </div>

          {/*  image  */}
          <div className="max-w-[600px]  lg:w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.635440218263!2d90.3874386305595!3d23.183502063489914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375511e6910abf39%3A0x20860e13c054d730!2z4Ka24Kaw4KeA4Kav4Ka84Kak4Kaq4KeB4KawIOCmquCmsuCmv-Cmn-Cnh-CmleCmqOCmv-CmlSDgpofgpqjgprjgp43gpp_gpr_gpp_gpr_gpongpp8!5e0!3m2!1sen!2sbd!4v1737373526060!5m2!1sen!2sbd"
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
