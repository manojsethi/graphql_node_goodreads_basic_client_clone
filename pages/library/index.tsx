import Loader from "@/components/appLoader";
import AddNewBookModal from "@/components/pages/library/addNewBookModal";
import MyBooksShelfModal from "@/components/pages/library/myBooksShelfModal";
import {
  Book,
  Book_Status,
  useGetUpdatedCurrentUserLazyQuery,
  User,
  UserBooks,
} from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { DeleteFilled, EditFilled, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MyBooks = () => {
  const [me, setMe] = useState<User>();
  const [userBooks, setUserBooks] = useState<UserBooks[]>([]);
  const [selectedRow, setSelectedRow] = useState<UserBooks>();

  const [queryUpdatedMe, { loading, data: dataUpdatedMe }] =
    useGetUpdatedCurrentUserLazyQuery({
      onCompleted({ getUpdatedMe }) {
        setMe(getUpdatedMe as User);
        setUserBooks(getUpdatedMe.userBooks as UserBooks[]);
      },
    });
  useEffect(() => {
    queryUpdatedMe();
  }, []);
  const [addBookModal, setAddBookModal] = useState<boolean>(false);
  const router = useRouter();
  const columns: ColumnsType<UserBooks> = [
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",

      render: (row, data) => (
        <div className="flex" style={{ height: "10rem", width: "7rem" }}>
          <img
            className="self-center"
            src={
              !data.book?.image
                ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                : `${constants.BASE_URL}/photos/${data.book?.image}`
            }
            alt={data.book?.name}
          />
        </div>
      ),
    },
    {
      title: "Title",

      key: "book.name",
      render: (row, data) => data.book?.name,
    },
    {
      title: "Author",

      key: "book.author",
      render: (row, data) => data.book?.author,
    },
    {
      title: "Status",
      key: "status",
      render: (row, data) => {
        return data.status;
      },
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (row, data) => {
        return new Date(data.book?.publishDate).toLocaleDateString("en-US");
      },
    },
    {
      title: "Action",

      key: "action",
      render: (row, data) => (
        <div
          onClick={() => Router.push(`/library/${data.book?._id}`)}
          className="text-2xl text-blue-600 cursor-pointer"
        >
          <EditFilled />
        </div>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClickModal = () => {
    queryUpdatedMe();
    setSelectedRow(undefined);
  };
  console.log(selectedRow, "selected");
  return (
    <div className="px-20 my-10">
      {selectedRow && (
        <MyBooksShelfModal
          selectedRow={selectedRow}
          isModalOpen={isModalOpen}
          handleOk={handleClickModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <h1 style={{ color: "rgb(66,101,93)" }} className="text-xl font-bold">
        Library
      </h1>
      <div>
        <div className="mt-8">
          {!loading && (
            <Table
              key={Math.random()}
              scroll={{ x: 1000 }}
              columns={columns}
              dataSource={userBooks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
