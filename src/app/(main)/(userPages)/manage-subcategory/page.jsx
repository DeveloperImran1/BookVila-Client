"use client";

import SubCategoryEditModal from "@/components/Modals/SubCategoryEditModal";
// import AuthorEditModal from "@/components/Modals/AuthorEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageSubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({}); // Holds the selected book for editing
  const [editSubCategory, setEditSubCategory] = useState({});
  const axiosPublic = useAxiosPublic();

  const {
    data: subCategories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageSubCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubCategories");
      return response.data;
    },
    keepPreviousData: true,
  });
  
  // delite function
  const handleDelite = async (subCategorie) => {
    const res = await axiosPublic.delete(
      `/deleteSubCategory/${subCategorie?._id}`
    );
    console.log("delete res is", res);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully Sub Categorie deleted 😍");
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
      title: "Sub Category Name (Bangla)",
      dataIndex: "bengali",
      key: "bengali",
    },
    {
      title: "Sub Category Name (English)",
      dataIndex: "english",
      key: "english",
    },
    {
      title: "Sub Category Name (Banglish)",
      dataIndex: "banglish",
      key: "banglish",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              showModal(record?.subCategorie); // Pass the specific book data
            }}
          >
            Edit
          </a>

          <a onClick={() => handleDelite(record?.subCategorie)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = subCategories?.map((subCategorie, index) => ({
    key: index + 1,
    serial: index,
    bengali: subCategorie?.bengali,
    english: subCategorie?.english,
    banglish: subCategorie?.banglish,
    action: "",
    subCategorie: subCategorie,
  }));

  // handle modal for edit a book
  const showModal = (subCategorie) => {
    setEditSubCategory(subCategorie); // Set the book to be edited
    setIsModalOpen(true); // Open the modal
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <section>
        <div className="flex justify-between items-start">
          <p className="text-[17px] font-semibold text-gray-600">
            Total Sub Category: {subCategories?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />

        <SubCategoryEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          editSubCategory={editSubCategory}
          refetch={refetch}
        ></SubCategoryEditModal>
      </section>
    </>
  );
};

export default ManageSubCategory;
