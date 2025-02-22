"use client";

import CategoryEditModal from "@/components/Modals/CategoryEditModal";
// import AuthorEditModal from "@/components/Modals/AuthorEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({}); // Holds the selected book for editing
  const [editCategory, setEditCategory] = useState({});
  const axiosPublic = useAxiosPublic();

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageCategory"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllCategories");
      return response.data;
    },
    keepPreviousData: true,
  });
  // delite function
  const handleDelite = async (categorie) => {
    const res = await axiosPublic.delete(`/deleteCategory/${categorie?._id}`);
    console.log("delete res is", res);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully Category deleted 😍");
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
      title: "Category Name (Bangla)",
      dataIndex: "bengali",
      key: "bengali",
    },
    {
      title: "Category Name (English)",
      dataIndex: "english",
      key: "english",
    },
    {
      title: "Category Name (Banglish)",
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
              showModal(record?.categorie); // Pass the specific book data
            }}
          >
            Edit
          </a>

          <a onClick={() => handleDelite(record?.categorie)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = categories?.map((categorie, index) => ({
    key: index + 1,
    serial: index,
    bengali: categorie?.bengali,
    english: categorie?.english,
    banglish: categorie?.banglish,
    action: "",
    categorie: categorie,
  }));

  // handle modal for edit a book
  const showModal = (categorie) => {
    setEditCategory(categorie); // Set the book to be edited
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
            Total Category: {categories?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />

        <CategoryEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          editCategory={editCategory}
          refetch={refetch}
        ></CategoryEditModal>
      </section>
    </>
  );
};

export default ManageCategory;
