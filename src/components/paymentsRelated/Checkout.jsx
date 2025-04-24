"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbCurrencyTaka } from "react-icons/tb";

const Checkout = () => {
  const axiosPublic = useAxiosPublic();
  const session = useSession();
  const email = session?.data?.user?.email;
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const lastPathSegment = pathname?.split("/").filter(Boolean).pop();
  const [shipping, setShipping] = useState("sundorbon");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setmessage] = useState("");
  // order summary te hePay er value state a na rakhai quick update hossena, tai hePay ai valuetai nowPay state er moddhe rakhtesi
  const [nowPay, setNowPay] = useState(0);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // get this order info
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["myOrder", email],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `getMyOrderWithId/${lastPathSegment}`
      );
      return result?.data;
    },
  });
  console.log("orders is", data);

  //   he current payment and after payment Calculate
  useEffect(() => {
    if (shipping == "sundorbon") {
      if (isChecked) {
        setNowPay(60);
      } else {
        setNowPay(data?.[0]?.totalPayment);
      }
    } else {
      if (isChecked) {
        setNowPay(90);
      } else {
        setNowPay(data?.[0]?.totalPayment + 30);
      }
    }
  }, [shipping, isChecked, data?.[0]?.totalPayment]);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    // capture all form data

    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const email = document.getElementById("_email").value;
    const address = document.getElementById("address").value;
    const thana = document.getElementById("thana").value;
    const district = document.querySelector("select").value;
    const note = document.getElementById("note").value;
    if (!name) {
      setmessage("Please fillup your name");
      setLoading(false);
      return;
    } else if (!email) {
      setmessage("Please fillup your email");
      setLoading(false);
      return;
    } else if (!contact) {
      setmessage("Please fillup your contact");
      setLoading(false);
      return;
    } else if (!address) {
      setmessage("Please fillup your address");
      setLoading(false);
      return;
    } else if (!thana) {
      setmessage("Please fillup your thana");
      setLoading(false);
      return;
    } else if (!district) {
      setmessage("Please fillup your district");
      setLoading(false);
      return;
    } else if (!shipping) {
      setmessage("Please sellect a shipping method");
      setLoading(false);
      return;
    } else {
      setmessage("");
    }

    const orderInfo = {
      name: name,
      email: email,
      contact: contact,
      address: address,
      thana: thana,
      district: district,
      note: note,
      shippingMethod: shipping,
      cashOnDelivery: isChecked ? "Cash on delivery" : "Before payment",
      orderId: lastPathSegment,
      totalPayment:
        shipping === "sundorbon"
          ? data?.[0]?.totalPayment
          : data?.[0]?.totalPayment + 30,
      hePay: nowPay,
    };
    console.log("handle payment is triggered", orderInfo, "now pay", nowPay);
    const result = await axiosPublic.post("/createPayment", orderInfo);

    setLoading(false);
    const redirectUrl = result?.data?.payment_url;
    if (redirectUrl) {
      window.location.replace(redirectUrl);
    }
  };

  return (
    <div className="py-8">
      <div className="container flex flex-col lg:flex-row gap-4">
        {/* left side  */}
        <div className="w-full  rounded-lg bg-white  shadow-md  p-4">
          <div className="mb-5">
            <h2 className="text-[20px] font-semibold tracking-tight">
              Shipping address{" "}
            </h2>
          </div>
          <form className="w-full space-y-4">
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium" htmlFor="name">
                Name
              </label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1  cursor-not-allowed"
                id="name"
                defaultValue={data?.[0]?.user?.name}
                placeholder={data?.[0]?.user?.name}
                disabled
                name="name"
                type="text"
              />
            </div>
            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium" htmlFor="contact">
                Contact Number
              </label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                id="contact"
                placeholder="Your Phone Number"
                name="phone"
                type="number"
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium" htmlFor="_email">
                Email
              </label>
              <input
                className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1  cursor-not-allowed"
                id="_email"
                defaultValue={data?.[0]?.user?.email}
                placeholder={data?.[0]?.user?.email}
                disabled
                name="email"
                type="email"
              />
            </div>

            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium" htmlFor="address">
                Address
              </label>
              <textarea
                className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 "
                id="address"
                placeholder="House no, Road no, Area"
                name="message"
              />
            </div>

            <div className="flex justify-between">
              <div className="space-y-2 text-sm text-zinc-700 ">
                <label className="block font-medium" htmlFor="thana">
                  Thana
                </label>
                <input
                  className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 "
                  id="thana"
                  placeholder="Thana"
                  name="thana"
                  type="text"
                />
              </div>
              <div className="space-y-2 text-sm text-zinc-700 ">
                <label className="block font-medium" htmlFor="district">
                  District
                </label>
                <select className="  h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 ">
                  <option disabled selected>
                    Select District
                  </option>
                  {[
                    "Bagerhat",
                    "Bandarban",
                    "Barguna",
                    "Barisal",
                    "Bhola",
                    "Bogra",
                    "Brahmanbaria",
                    "Chandpur",
                    "Chapai Nawabganj",
                    "Chattogram",
                    "Chuadanga",
                    "Cox's Bazar",
                    "Cumilla",
                    "Dhaka",
                    "Dinajpur",
                    "Faridpur",
                    "Feni",
                    "Gaibandha",
                    "Gazipur",
                    "Gopalganj",
                    "Habiganj",
                    "Jamalpur",
                    "Jashore",
                    "Jhalokati",
                    "Jhenaidah",
                    "Joypurhat",
                    "Khagrachari",
                    "Khulna",
                    "Kishoreganj",
                    "Kurigram",
                    "Kushtia",
                    "Lakshmipur",
                    "Lalmonirhat",
                    "Madaripur",
                    "Magura",
                    "Manikganj",
                    "Meherpur",
                    "Moulvibazar",
                    "Munshiganj",
                    "Mymensingh",
                    "Naogaon",
                    "Narail",
                    "Narayanganj",
                    "Narsingdi",
                    "Natore",
                    "Netrokona",
                    "Nilphamari",
                    "Noakhali",
                    "Pabna",
                    "Panchagarh",
                    "Patuakhali",
                    "Pirojpur",
                    "Rajbari",
                    "Rajshahi",
                    "Rangamati",
                    "Rangpur",
                    "Satkhira",
                    "Shariatpur",
                    "Sherpur",
                    "Sirajganj",
                    "Sunamganj",
                    "Sylhet",
                    "Tangail",
                    "Thakurgaon",
                  ].map((district) => (
                    <option key={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2 text-sm text-zinc-700 ">
              <label className="block font-medium" htmlFor="note">
                Note (if any)
              </label>
              <textarea
                className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 "
                id="note"
                placeholder="extra information"
                name="note"
              />
            </div>
          </form>
        </div>

        {/* right side  */}
        <div className="w-full">
          <div className="bg-white p-4">
            {/* order summary  */}
            <div>
              <h2 className="text-[20px] mb-5 font-semibold tracking-tight">
                Order summary
              </h2>

              <div className="flex text-[15px] justify-between items-center">
                <p>Sub total ({data?.[0]?.items?.length} items)</p>
                <p>
                  <span className="text-2xl">৳</span>
                  {data?.[0]?.totalPayment - 60}
                </p>
              </div>
              <div className="flex text-[15px] justify-between items-center">
                <p>Delivery charge</p>
                <p>
                  <span className="text-2xl">৳</span>
                  {shipping === "sundorbon" ? 60 : 90}
                </p>
              </div>

              <hr className="my-3" />
              <div className="flex text-[15px] justify-between font-semibold items-center">
                <p>Grand total</p>
                <p>
                  <span className="text-2xl">৳</span>
                  {shipping === "sundorbon"
                    ? data?.[0]?.totalPayment
                    : data?.[0]?.totalPayment + 30}
                </p>
              </div>
              <div className="flex text-[15px] justify-between  items-center">
                <p>Pay now</p>
                <p>
                  <span className="text-2xl">৳</span>
                  {nowPay}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div className="bg-white p-4 mt-4 rounded-md">
            <div>
              <h2 className="text-[20px] mb-5 font-semibold tracking-tight">
                Shipping method
              </h2>

              <div className="flex items-center  gap-4">
                <div
                  onClick={() => setShipping("sundorbon")}
                  className={`flex flex-col  rounded-md items-start gap-2 py-2 px-3 cursor-pointer ${
                    shipping === "sundorbon"
                      ? "border-2 border-[#00c0ff]"
                      : "border-[1px]"
                  }`}
                >
                  <p className="font-semibold text-[16px]">
                    Sundarban Courier Services
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <p className="flex items-center gap-1">
                      <TbCurrencyTaka size={17}></TbCurrencyTaka> 60 Taka
                    </p>
                    <p className="flex items-center gap-1">
                      <FaRegClock size={17}></FaRegClock> 2-3 days
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    সুন্দরবন অফিস থেকে পার্সেল কালেক্ট করতে হবে
                  </p>
                </div>

                <div
                  onClick={() => setShipping("in house")}
                  className={` flex flex-col  rounded-md items-start gap-2 py-2 px-3 cursor-pointer ${
                    shipping === "in house"
                      ? "border-2 border-[#00c0ff]"
                      : "border-[1px]"
                  }`}
                >
                  <p className="font-semibold text-[16px]">In-House Delivery</p>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <p className="flex items-center gap-1">
                      <TbCurrencyTaka size={17}></TbCurrencyTaka> 90 Taka
                    </p>
                    <p className="flex items-center gap-1">
                      <FaRegClock size={17}></FaRegClock> 5-7 days
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    পার্সেল বাসায় পৌছিয়ে দেওয়া হবে
                  </p>
                </div>
              </div>

              <p className="text-[15px] text-[#23a3cd] mt-4">
                {shipping == "sundorbon"
                  ? "সুন্দরবন কোরিয়ার সার্ভিস অফিস থেকে বই সংগ্রহ করলে ডেলিভারি চার্জ ৬০ টাকা "
                  : "ডেলিভারি ম্যান বই বাসায় পৌছিয়ে দিলে ডেলিভারি চার্জ ৯০ টাকা "}
              </p>
            </div>
          </div>

          {/* payment method */}
          <div className="bg-white p-4 mt-4 rounded-md">
            <div>
              <h2 className="text-[20px] mb-5 font-semibold tracking-tight">
                Payment method
              </h2>

              <div className="">
                <div className="form-control">
                  <label className="cursor-pointer label  max-w-[160px] flex items-center">
                    <input
                      type="checkbox"
                      name="paymentType"
                      className="checkbox checkbox-info"
                      onChange={handleCheckboxChange}
                    />
                    <span className="label-text ml-2 text-base">
                      Cash on delivery
                    </span>
                  </label>
                </div>

                {isChecked && (
                  <p className="text-[15px] text-[#23a3cd] mt-2">
                    {shipping == "sundorbon"
                      ? `অর্ডারটি কনফার্ম করতে ডেলিভারি চার্জ ${
                          shipping == "sundorbon" ? "60" : "90"
                        } টাকা অগ্রিম পেমেন্ট করুন, বাকী টাকা বই হাতে পেয়ে পরিশোধ করুন।`
                      : "ডেলিভারি ম্যান বই বাসায় পৌছিয়ে দিলে ডেলিভারি চার্জ ৯০ টাকা "}
                  </p>
                )}

                {/* payment icon  */}
                <div className="flex gap-2 items-center flex-wrap mt-4">
                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/8z3zSVrq/bkash.webp"
                      alt="payment method"
                    ></Image>
                  </div>
                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/2S3SM53Q/nagad.png"
                      alt="payment method"
                    ></Image>
                  </div>

                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/fT8b8dWW/rocket.webp"
                      alt="payment method"
                    ></Image>
                  </div>

                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/RCQhn8jH/upay.webp"
                      alt="payment method"
                    ></Image>
                  </div>

                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/L69XkDp0/visa.webp"
                      alt="payment method"
                    ></Image>
                  </div>

                  <div className="border-[1px] rounded-md py-1 px-3 flex items-center justify-center cursor-not-allowed">
                    <Image
                      className="h-[50px] w-[90px]"
                      height={600}
                      width={500}
                      src="https://i.postimg.cc/SRrKF2Wr/mastercard.webp"
                      alt="payment method"
                    ></Image>
                  </div>
                </div>

                <p className="text-[15px] text-red-500 mt-14">
                  {message && message}
                </p>
                {/* payment button  */}
                <button
                  disabled={loading}
                  onClick={handleCreatePayment}
                  className="mt-4 btn hover:bg-primary/55 text-white bg-primary w-full"
                >
                  <div className="flex gap-x-1 items-center">
                    <span>Checkout</span>
                    <HiArrowNarrowRight className="text-base" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
