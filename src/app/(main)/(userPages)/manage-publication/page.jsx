"use client";

import PublicationEditModal from "@/components/Modals/PublicationEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageAuthor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPublication, setEditedPublication] = useState({}); // Holds the selected book for editing

  const axiosPublic = useAxiosPublic();

  const {
    data: publication = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["managePublication"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getPublications");
      return response.data;
    },
    keepPreviousData: true,
  });
  // delite function
  const handleDelite = async (publica) => {
    const res = await axiosPublic.delete(`/deletePublication/${publica?._id}`);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully publication deleted 😍");
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
      title: "Publication Photo",
      dataIndex: "publicationPhoto",
      key: "publicationPhoto",
      render: (_, record) => (
        <>
          <Image
            src={
              record?.publicationPhoto ||
              "https://cdn-icons-png.flaticon.com/512/5078/5078727.png"
            }
            className="h-[60px] w-[60px] rounded-md"
            height={60}
            width={60}
            alt="publication image"
          />
        </>
      ),
    },
    {
      title: "Publication Name",
      dataIndex: "publicationName",
      key: "publicationName",
    },
    {
      title: "Total Book",
      dataIndex: "totalBook",
      key: "totalBook",
    },
    {
      title: "Publication ID",
      dataIndex: "publicationId",
      key: "publicationId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              showModal(record?.publica); // Pass the specific book data
            }}
          >
            Edit
          </a>

          <a onClick={() => handleDelite(record?.publica)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = publication?.map((publica, index) => ({
    key: index + 1,
    serial: index,
    publicationPhoto: publica?.photo,
    publicationName: publica?.name?.[1] || author?.name?.[0],
    totalBook: publica?.books?.length,
    publicationId: publica?.publicationID,
    action: "",
    publica: publica,
  }));

  // handle modal for edit a book
  const showModal = (publica) => {
    setEditedPublication(publica); // Set the book to be edited
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
            Total Publication: {publication?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />

        <PublicationEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          publica={editedPublication}
          refetch={refetch}
        ></PublicationEditModal>
      </section>
    </>
  );
};

export default ManageAuthor;
