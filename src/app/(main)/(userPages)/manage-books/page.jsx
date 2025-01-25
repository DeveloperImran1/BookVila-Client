"use client";

import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Input, Space, Table } from "antd";
import { useState } from "react";

const ManageBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const axiosPublic = useAxiosPublic();

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["manageBooks", searchQuery, page],
    queryFn: async () => {
      const response = await axiosPublic.get("/books", {
        params: {
          searchQuery,
          page,
          limit: 12,
        },
      });
      setTotalPages(parseInt(books?.totalBooks) / 12);
      return response.data;
    },
    keepPreviousData: true,
  });
  const { Search } = Input;
  const onSearch = (value, _e, info) => setSearchQuery(value);

  console.log("manage books to ", books);
  const columns = [
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
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = books?.books?.map((book, index) => ({
    key: index,
    bookName: book?.bookName?.[0],
    authorName: 42,
    price: "London No. 1 Lake Park",
    discount: 34,
    stock: 34,
    bookId: 34,
    action: 34,
  }));

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
        <Table columns={columns} dataSource={data} />
      </section>
    </>
  );
};

export default ManageBooks;
