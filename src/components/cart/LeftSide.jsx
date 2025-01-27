"use client";
import { cartBookGet } from "@/hooks/localStorage";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiDiscount1 } from "react-icons/ci";
import { HiArrowNarrowRight } from "react-icons/hi";
import { TbCurrencyTaka, TbTruckDelivery } from "react-icons/tb";
import DataNotFound from "../shared/DataNotFound";
import TableCard from "./TableCard";

const LeftSide = () => {
  const axiosPublic = useAxiosPublic();
  const [favorutes, setFavorutes] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  // const { data, refetch } = useMyCartBooks();
  const [totalBook, setTotalBook] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setDelivery] = useState(60);
  const [isLoading, seIsLoading] = useState(false);
  const [offerTotal, setOfferTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [data, setData] = useState([]);
  const session = useSession();
  const auth = useAuth();

  // every book er quantity er jonno
  const [quantities, setQuantities] = useState({}); // To track quantities for each product

  const router = useRouter();
  useEffect(() => {
    const res = cartBookGet();
    setData(res);
  }, []);
  console.log(data);
  useEffect(() => {
    if (data) {
      let initialTotalBooks = 0;
      let initialTotalPrice = 0;

      data.forEach((item) => {
        const discountedPrice = calculateDiscountedPrice(
          item.books.price,
          item.books.discount
        );
        initialTotalBooks += 1; // Assuming each item is 1 book initially
        initialTotalPrice += discountedPrice;
      });

      setTotalBook(initialTotalBooks);
      setTotalPrice(initialTotalPrice);
    }
  }, [data]);

  useEffect(() => {
    if (offerTotal > 1500) {
      setGrandTotal(totalPrice);
      setOfferTotal(totalPrice);
    } else {
      setGrandTotal(totalPrice + delivery);
      setOfferTotal(totalPrice + delivery);
    }
  }, [totalPrice, offerTotal, delivery]);

  // Calculate discounted price
  function calculateDiscountedPrice(price, discountPercentage) {
    return Math.round(price - (price * discountPercentage) / 100);
  }

  const refetch = () => {
    const res = cartBookGet();
    setData(res);
  };

  // Function to handle quantity changes
  const handleQuantityChange = (bookId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [bookId]: quantity,
    }));
  };

  // order er jonno unique id generate:
  function generateUniqueId() {
    const randomPart = Math.random().toString(36).substring(2, 10); // Random string
    const timestampPart = Date.now().toString(36); // Current timestamp in base 36
    return `${randomPart}-${timestampPart}`; // Combine both parts
  }

  const handleCheckout = async () => {
    seIsLoading(true);
    if (!auth?.data) {
      seIsLoading(false);
      return toast
        .error("Please! Before Login now😢")
        .then(router?.push("/login"));
    }
    const itemsArr = data.map((item) => ({
      bookId: item?.books?._id,
      bookPhoto: item?.books?.coverImage,
      name: item?.books?.bookName?.[0],
      quantity: quantities[item?.books?._id] || 1, // Use the quantity from state or default to 1
      totalPrice:
        calculateDiscountedPrice(item?.books?.price, item?.books?.discount) *
        (quantities[item?.books?._id] || 1),
    }));

    const uniqueId = generateUniqueId();

    console.log("new unique id: ", uniqueId);

    const orderObj = {
      orderId: uniqueId,
      user: {
        userId: auth?.data?._id,
        name: auth?.data?.name,
        email: auth?.data?.email,
        phoneNumber: auth?.data?.phone,
      },
      items: itemsArr,
      totalPayment: grandTotal,
    };

    const res = await axiosPublic.post("/createNewOrder", orderObj);
    console.log(res);
    if (res?.status === 200) {
      seIsLoading(false);
      toast
        .success("Your order is pending👏 Please fillup delivery address")
        .then(router.push(`/checkout/${res.data.orderId}`));
    } else {
      seIsLoading(false);
      toast.error("Sorry! something went wrong 😢");
    }
  };

  return (
    <>
      <div className=" mx-auto  px-0 ">
        <div className="flex flex-col container md:flex-row  gap-x-2.5 py-5 md:py-10 ">
          <div className="flex-1 bg-white">
            {/* // left side  */}
            <div className="bg-white w-full p-4 sm:p-6 md:p-7 lg:p-10">
              <h1 className="text-sm sm:text-xl font-inter font-semibold">
                My cart
              </h1>
              <div className="mt-3 sm:mt-5 md:mt-6 lg:mt-8 overflow-scroll">
                {data?.length < 1 && (
                  <div className="w-full ">
                    {" "}
                    <DataNotFound></DataNotFound>{" "}
                  </div>
                )}
                <table className="table table-px-0 border-t">
                  <tbody>
                    {data?.map((item) => (
                      <tr key={item?._id}>
                        <TableCard
                          item={item}
                          calculateDiscountedPrice={calculateDiscountedPrice}
                          setTotalBook={setTotalBook}
                          totalBook={totalBook}
                          setTotalPrice={setTotalPrice}
                          totalPrice={totalPrice}
                          refetch={refetch}
                          // Every book er quantity newer jonno
                          quantity={quantities[item?.books?._id] || 1} // Pass quantity from state
                          onQuantityChange={handleQuantityChange} // Pass handler function
                        ></TableCard>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-white w-full md:w-64 lg:w-96 p-4 sm:p-6 md:p-7 lg:p-10">
            {/* // right side */}

            <h1 className="font-semibold sm:text-lg md:text-xl">
              Order summary
            </h1>
            {/* Table */}
            <table className="mt-2 sm:mt-3 lg:mt-5 table text-xs table-px-0 dropdown">
              <tbody>
                {/* Sub total (5 items)	 */}
                <tr>
                  <td className="p-0 text-gray-700">
                    <span className="mr-1">Sum total </span>
                    <span>({totalBook || 0} Items)</span>
                  </td>
                  <td></td>
                  <td className="w-10">
                    <div className="flex">
                      <TbCurrencyTaka className="text-lg -mr-0.5" />
                      <span className="block text-sm">{totalPrice || 0}</span>
                    </div>
                  </td>
                </tr>
                {/* Delivery charge	 */}
                <tr>
                  <td className="p-0 text-gray-700">
                    <div className="flex items-center">
                      <p className="mr-2">Delivery charge </p>
                      <TbTruckDelivery className="text-base mt-1" />
                    </div>
                  </td>
                  <td></td>
                  <td className="w-10">
                    <div className="flex">
                      <TbCurrencyTaka className="text-lg -mr-0.5" />
                      <span className="block text-sm">{delivery}</span>
                    </div>
                  </td>
                </tr>
                {/* Grand total	 */}
                <tr className="font-bold text-xs">
                  <td className="p-0 text-gray-700">
                    <p className="">Grand total</p>
                  </td>
                  <td></td>
                  <td className="w-10">
                    <div className="flex">
                      <TbCurrencyTaka className="text-lg -mr-0.5" />
                      <span className="block text-sm">{grandTotal || 0}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* discount card  */}
            <div className="mt-10 rounded border font-semibold text-black border-primary">
              <div className="">
                {/* ENGLISH10 */}
                <div className="text-xs p-2 cursor-pointer group">
                  <div className="flex items-center text-primary gap-1">
                    <div className="">
                      <CiDiscount1 />
                    </div>
                    <span className="group-hover:underline">
                      New Year Discount: 10% Off
                    </span>
                  </div>
                  <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">
                    NEW YEAR 2025 কুপন কোড ব্যবহার করলে মোট মূল্যের উপর ১০%
                    ডিসকাউন্ট।
                  </p>
                </div>
                <div className="border-b border-dashed border-b-black05"></div>
                {/* FREE DELIVERY: */}
                <div className="text-xs p-2 cursor-pointer group">
                  <div className="flex items-center text-primary gap-1">
                    <div className="">
                      <CiDiscount1 />
                    </div>
                    <span className="group-hover:underline">
                      FREEDELIVERY :
                    </span>
                  </div>
                  <p className="text-[rgb(120,121,123)] font-bn mt-1 text-justify">
                    ১৫০০ টাকার বই অর্ডার করলে ফ্রি ডেলিভারি।
                  </p>
                </div>
              </div>
            </div>

            {/* Promo code  */}
            <div className="mt-5">
              <h3 className="font-medium text-sm">Promo code</h3>
              <div className="mt-4 flex gap-2">
                <input
                  onKeyUp={(e) => {
                    if (e.target.value === "NEW YEAR 2025") {
                      setGrandTotal(
                        Math.round(offerTotal - (offerTotal * 10) / 100)
                      );
                    } else {
                      setGrandTotal(offerTotal);
                    }
                  }}
                  className="min-w-0 w-full pl-4 h-11 border bg-[#f5f5f5] border-[rgb(226,226,226)] outline-none rounded-sm"
                  type="text"
                />
                <button className="btn btn-sm h-11 bg-primary text-white min-w-20">
                  Apply
                </button>
              </div>
            </div>

            {/* Order summary  */}
            <button
              disabled={isLoading}
              onClick={handleCheckout}
              className={`${
                isLoading && "cursor-not-allowed"
              } mt-14 btn hover:bg-primary/55 text-white bg-primary w-full`}
            >
              <div className="flex gap-x-1 items-center">
                <span>Payment</span>
                <HiArrowNarrowRight className="text-base" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
