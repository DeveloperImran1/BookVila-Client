"use client";

import SubjectEditModal from "@/components/Modals/SubjectEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Space, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAuthor, setEditedAuthor] = useState({}); // Holds the selected book for editing
  const [editSubject, setEditSubject] = useState({});
  const axiosPublic = useAxiosPublic();

  const {
    data: subjects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageSubject"],
    queryFn: async () => {
      const response = await axiosPublic.get("/getAllSubjects");
      return response.data;
    },
    keepPreviousData: true,
  });
  // delite function
  const handleDelite = async (subject) => {
    const res = await axiosPublic.delete(`/deleteSubject/${subject?._id}`);
    console.log("delete res is", res);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully Subject deleted 😍");
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
      title: "Subject Name (Bangla)",
      dataIndex: "bengali",
      key: "bengali",
    },
    {
      title: "Subject Name (English)",
      dataIndex: "english",
      key: "english",
    },
    {
      title: "Subject Name (Banglish)",
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
              showModal(record?.subject); // Pass the specific book data
            }}
          >
            Edit
          </a>

          <a onClick={() => handleDelite(record?.subject)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = subjects?.map((subject, index) => ({
    key: index + 1,
    serial: index,
    bengali: subject?.bengali,
    english: subject?.english,
    banglish: subject?.banglish,
    action: "",
    subject: subject,
  }));

  // handle modal for edit a book
  const showModal = (subject) => {
    setEditSubject(subject); // Set the book to be edited
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
            Total Subject: {subjects?.length || 0}
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
        />

        <SubjectEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          editSubject={editSubject}
          refetch={refetch}
        ></SubjectEditModal>
      </section>
    </>
  );
};

export default ManageSubject;
