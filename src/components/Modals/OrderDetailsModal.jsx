import { Modal } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const OrderDetailsModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
  order,
}) => {
  console.log("current order is", order);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <>
      {/* modal for edit book  */}

      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="bg-white p-4 ">
          <p className="text-[17px] font-semibold mb-6">Order Details</p>

          <div key={order?._id}>
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <Swiper
                modules={[]}
                className="mySwiper border-2 w-[150px] rounded-md"
              >
                {order?.items?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={
                        item?.bookPhoto ||
                        "https://i.postimg.cc/jC0Wbpym/pngtree-educational-learning-books-png-image-3851016-removebg-preview.png"
                      }
                      height={676}
                      width={1200}
                      alt="book"
                      className="w-[150px] h-[200px] mx-auto"
                    ></Image>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="flex flex-col items-start justify-between  w-full text-[16px]">
                <span className=""> Order ID: {order?.orderId}</span>{" "}
                <span className=""> Transition ID: {order?.transitionId}</span>{" "}
                <span>
                  Add To Cart Date: {formatDate(order?.timestamps?.createdAt)}
                </span>
                <span>
                  Transition Date: {formatDate(order?.transitionDate)}
                </span>
                <span>Card Type: {order?.cardType}</span>
                <span>Delivery Type: {order?.cashOnDelivery}</span>
                <span>He Payed: {order?.hePay}</span>
                <span>Total Amount: {order?.totalPayment}</span>
                <span>Payment: {order?.payment}</span>
                <span>Shipping Method: {order?.shippingMethod}</span>
                <hr className="my-5 " />
                <h2 className="text-xl font-bold">Book Information</h2>
                <div>
                  {order?.items?.map((item, index) => (
                    <h3 key={index} className="text-[16px] ">
                      {item?.name || "book name..."}
                      <span> ({item?.quantity || 0} Items)</span>{" "}
                      <span>{item?.totalPrice} Taka</span>
                    </h3>
                  ))}
                </div>
                <hr className="my-5 " />
                <h2 className="text-xl font-bold">Customer Information</h2>
                <span>Customer Name: {order?.user?.name}</span>
                <span>Email: {order?.user?.email}</span>
                <span>Thana: {order?.user?.thana}</span>
                <span>District: {order?.user?.district}</span>
                <span>Address: {order?.user?.address}</span>
                <span>Contact: {order?.user?.contact}</span>
                <span className="mb-5">Note: {order?.user?.note}</span>
                {order?.status === "Pending" ? (
                  <ul className="steps mx-auto px-5">
                    <li className="step  step-accent">Pending</li>
                    <li className="step ">Processing</li>
                    <li className="step ">Shipped</li>
                    <li className="step">Delivered</li>
                    <li className="step">Cancelled</li>
                  </ul>
                ) : (
                  ""
                )}
                {order?.status === "Processing" ? (
                  <ul className="steps mx-auto px-5">
                    <li className="step  step-accent">Pending</li>
                    <li className="step step-accent">Processing</li>
                    <li className="step ">Shipped</li>
                    <li className="step">Delivered</li>
                    <li className="step">Cancelled</li>
                  </ul>
                ) : (
                  ""
                )}
                {order?.status === "Shipped" ? (
                  <ul className="steps mx-auto px-5">
                    <li className="step  step-accent">Pending</li>
                    <li className="step step-accent">Processing</li>
                    <li className="step step-accent">Shipped</li>
                    <li className="step">Delivered</li>
                    <li className="step">Cancelled</li>
                  </ul>
                ) : (
                  ""
                )}
                {order?.status === "Delivered" ? (
                  <ul className="steps mx-auto px-5">
                    <li className="step  step-accent">Pending</li>
                    <li className="step step-accent">Processing</li>
                    <li className="step step-accent">Shipped</li>
                    <li className="step step-accent">Delivered</li>
                    <li className="step">Cancelled</li>
                  </ul>
                ) : (
                  ""
                )}
                {order?.status === "Cancelled" ? (
                  <ul className="steps mx-auto px-5">
                    <li className="step  step-accent">Pending</li>
                    <li className="step step-accent">Cancelled</li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
            <p className="my-[30px] w-full border-[1px] text-gray-500"></p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;
