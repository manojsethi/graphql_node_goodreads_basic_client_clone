import Loader from "@/components/appLoader";
import AddNewBookModal from "@/components/pages/myBooks/addNewBookModal";
import MyBooksShelfModal from "@/components/pages/myBooks/myBooksShelfModal";
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
      width: 300,
      render: (row, data) => (
        <img
          src={
            !data.book?.image
              ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
              : `${constants.BASE_URL}/photos/${data.book?.image}`
          }
          alt={"staticbooks"}
          style={{ height: "10rem", width: "7rem" }}
        />
      ),
    },
    {
      title: "Title",
      width: 250,
      key: "book.name",
      render: (row, data) => data.book?.name,
    },
    {
      title: "Status",
      key: "status",
      render: (row, data) => {
        return (
          <Button
            onClick={() => {
              setSelectedRow(data);
              setIsModalOpen(true);
            }}
            className="border-0"
            shape="round"
            icon={<EditOutlined className="text-2xl" />}
            size={"middle"}
          >
            {data.status}
          </Button>
        );
      },
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClickModal = () => {
    queryUpdatedMe();
    setSelectedRow(undefined);
  };
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
