"use client";

import BookEditModal from "@/components/Modals/BookEditModal";
import Loading from "@/components/shared/Loading";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Input, Space, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedBook, setEditedBook] = useState(null); // Holds the selected book for editing

  const axiosPublic = useAxiosPublic();

  const {
    data: books = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["manageBooks", searchQuery],
    queryFn: async () => {
      const response = await axiosPublic.get("/books", {
        params: {
          searchQuery,
        },
      });
      setTotalPages(parseInt(books?.totalBooks) / 12);
      return response.data;
    },
    keepPreviousData: true,
  });
  const { Search } = Input;
  const onSearch = (value, _e, info) => setSearchQuery(value);

  // delite function
  const handleDelite = async (book) => {
    const res = await axiosPublic.delete(`/deleteBook/${book?._id}`);
    console.log("delete res is", res);
    if (res?.data?.deletedCount) {
      refetch();
      toast.success("Successfully book deleted 😍");
    } else {
      refetch();
      toast.error("Something went wrong 😢");
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    // Update current page when pagination changes
    setPage(pagination.current);
    console.log("Current Page:", pagination, filters, sorter);
  };

  const columns = [
    {
      title: "Serial No",
      dataIndex: "key",
      rowScope: "row",
    },
    {
      title: "Book Name",
      dataIndex: "bookName",
      key: "bookName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Author Name",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      key: "discount",
      dataIndex: "discount",
    },
    {
      title: "Stock",
      key: "stock",
      dataIndex: "stock",
    },
    {
      title: "Book ID",
      key: "bookId",
      dataIndex: "bookId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              showModal(record?.book); // Pass the specific book data
            }}
          >
            Edit {record.name}
          </a>

          <a onClick={() => handleDelite(record?.book)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = books?.books?.map((book, index) => ({
    key: index + 1,
    serial: index,
    bookName: book?.bookName?.[0],
    authorName: book?.authorInfo?.name?.[0],
    price: `${book?.price} Taka`,
    discount: `${book?.discount} %`,
    stock: book?.stock,
    bookId: book?.bookID,
    action: "",
    book: book,
  }));

  // handle modal for edit a book
  const showModal = (book) => {
    setEditedBook(book); // Set the book to be edited
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
            Total Books: {books?.totalBooks || 0}
          </p>
          <Search
            placeholder="Search by book name"
            onSearch={onSearch}
            className="p-2"
            style={{
              width: 270,
            }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: "max-content",
          }}
          onChange={handleTableChange}
        />

        <BookEditModal
          showModal={showModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          book={editedBook}
          refetch={refetch}
        ></BookEditModal>
      </section>
    </>
  );
};

export default ManageBooks;
