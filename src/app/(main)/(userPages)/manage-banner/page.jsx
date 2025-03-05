"use client";

// import AuthorEditModal from "@/components/Modals/AuthorEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({}); // Holds the selected book for editing
  const [editSubCategory, setEditSubCategory] = useState({});
  const axiosPublic = useAxiosPublic();

  const {
    data: banners = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageBanner"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllBanner");
      return response.data;
    },
    keepPreviousData: true,
  });
  console.log("banners", banners);
  // delite function
  const handleDelite = async (banner) => {
    console.log("banner", banner);
    const res = await axiosPublic.delete(`/deleteBanner/${banner?._id}`);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully deleted 😍");
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
      width: 50,
    },

    {
      title: "Small Device Image",
      dataIndex: "smallImage",
      key: "smallImage",
      render: (image) => (
        <div>
          <Image
            className="h-[70px] w-[130px] rounded"
            height={500}
            width={500}
            src={image?.[0]}
            alt="banner image"
          ></Image>
        </div>
      ),
    },
    {
      title: "Large Device Image",
      dataIndex: "largeImage",
      key: "largeImage",
      render: (image) => (
        <div>
          <Image
            className="h-[70px] w-[130px] rounded"
            height={500}
            width={500}
            src={image?.[1]}
            alt="banner image"
          ></Image>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelite(record?.banner)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = banners?.map((image, index) => ({
    key: index + 1,
    serial: index,
    smallImage: image?.images,
    largeImage: image?.images,
    action: "",
    banner: image,
  }));

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <section>
        <div className="flex justify-between items-start">
          <p className="text-[17px] font-semibold text-gray-600">
            Total Banner: {banners?.length || 0}
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

export default ManageBanner;
