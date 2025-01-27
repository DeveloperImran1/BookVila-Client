"use client";

import AuthorEditModal from "@/components/Modals/AuthorEditModal";
// import AuthorEditModal from "@/components/Modals/AuthorEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageAuthor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({}); // Holds the selected book for editing

  const axiosPublic = useAxiosPublic();

  const {
    data: authors = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageAuthors"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllAuthors");
      return response.data;
    },
    keepPreviousData: true,
  });
  // delite function
  const handleDelite = async (author) => {
    const res = await axiosPublic.delete(`/deleteAuthor/${author?._id}`);
    console.log("delete res is", res);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully author deleted 😍");
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
      title: "Aithor Photo",
      dataIndex: "authorPhoto",
      key: "authorPhoto",
      render: (_, record) => (
        <>
          {console.log("record is", record)}
          <Image
            src={
              record?.authorPhoto ||
              "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
            }
            className="h-[60px] w-[60px] rounded-md"
            height={60}
            width={60}
            alt="author image"
          />
        </>
      ),
    },
    {
      title: "Author Name",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Total Book",
      dataIndex: "totalBook",
      key: "totalBook",
    },
    {
      title: "Author ID",
      dataIndex: "authorId",
      key: "authorId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              showModal(record?.author); // Pass the specific book data
            }}
          >
            Edit
          </a>

          <a onClick={() => handleDelite(record?.author)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = authors?.map((author, index) => ({
    key: index + 1,
    serial: index,
    authorPhoto: author?.photo,
    authorName: author?.name?.[1] || author?.name?.[0],
    totalBook: author?.books?.length,
    authorId: author?.authorID,
    action: "",
    author: author,
  }));

  // handle modal for edit a book
  const showModal = (book) => {
    setEditedAuthor(book); // Set the book to be edited
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
            Total authors: {authors?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />

        <AuthorEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          author={editedAuthor}
          refetch={refetch}
        ></AuthorEditModal>
      </section>
    </>
  );
};

export default ManageAuthor;
