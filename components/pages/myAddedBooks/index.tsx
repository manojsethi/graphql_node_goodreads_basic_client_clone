import {
  Book,
  useGetBooksByUserLazyQuery,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
  UserBooks,
} from "@/gql/generated/graphql";
import constants from "@/utils/constants";

import { Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { useEffect, useState } from "react";

const MyAddedBooks = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [myAddedBooksQuery] = useGetBooksByUserLazyQuery({
    onCompleted({ getBooksByUser }) {
      setMyBooks(getBooksByUser as Book[]);
    },
  });
  useEffect(() => {
    myAddedBooksQuery();
  }, [myAddedBooksQuery]);
  const columns: ColumnsType<Book> = [
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",

      render: (row, data) => (
        <div style={{ height: "10rem", width: "10rem", position: "relative" }}>
          {" "}
          {data.image && (
            <Image
              objectFit="contain"
              fill
              alt={data.name}
              src={`${constants.BASE_URL}/photos/${data.image}`}
            />
          )}
        </div>
      ),
    },
    {
      title: "Title",

      key: "book.name",
      render: (row, data) => data.name,
    },
    {
      title: "Author",

      key: "book.author",
      render: (row, data) => data.author,
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (row, data) => {
        return new Date(data.publishDate).toLocaleDateString("en-US");
      },
    },
    {
      title: "Rating",

      key: "rating",
      render: (row, data) => (
        <Rate allowHalf disabled value={data.totalRatingValue ?? 0}></Rate>
      ),
    },
  ];
  return (
    <div className="mt-10">
      <h1 style={{ color: "rgb(66,101,93)" }} className="text-xl font-bold">
        My Added Books
      </h1>
      <div>
        <div className="mt-8">
          <Table
            pagination={false}
            scroll={{ x: 1000 }}
            columns={columns}
            dataSource={myBooks}
            rowKey={(record) => record._id}
          />
        </div>
      </div>
    </div>
  );
};

export default MyAddedBooks;
