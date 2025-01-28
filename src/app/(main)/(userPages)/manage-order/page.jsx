"use client";

import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Select, Table } from "antd";
import toast from "react-hot-toast";

const ManageOrder = () => {
  const axiosPublic = useAxiosPublic();

  //   date formating

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

  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllOrder");
      return response.data;
    },
    keepPreviousData: true,
  });

  const handleChange = async (value, order) => {
    console.log(`selected ${value} order`, order);
    const res = await axiosPublic.put(`/statusUpdate/${order?._id}`, {
      status: value,
    });
    console.log("respopnce is", res);
    if (res?.data?.modifiedCount) {
      refetch();
      toast.success("Successfully status updated 😍");
    } else {
      refetch();
      toast.error("Something went wrong 😢");
    }
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Transition Date",
      dataIndex: "transitionDate",
      key: "transitionDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {console.log("record is a", record?.order)}
          <Select
            defaultValue={record?.status || "Pending"}
            style={{
              width: 120,
            }}
            onChange={(value) => {
              handleChange(value, record?.order);
            }}
            options={[
              {
                value: "Pending",
                label: "Pending",
              },
              {
                value: "Processing",
                label: "Processing",
              },
              {
                value: "Shipped",
                label: "Shipped",
              },
              {
                value: "Delivered",
                label: "Delivered",
              },
              {
                value: "Cancelled",
                label: "Cancelled",
              },
            ]}
          />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <>detail </>,
    },
  ];
  const data = orders?.map((order, index) => ({
    key: index + 1,
    serial: index,
    userName: order?.user?.name,
    payment: order?.payment ? order?.payment : "Not Complet",
    orderId: order?.orderId,
    transitionDate: order?.transitionDate
      ? formatDate(order?.transitionDate)
      : "Payment Not Complete",
    status: order?.status,
    //     action: "",
    order: order,
  }));

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <section>
        <div className="flex justify-between items-start">
          <p className="text-[17px] font-semibold text-gray-600">
            Total Orders: {orders?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />
      </section>
    </>
  );
};

export default ManageOrder;
