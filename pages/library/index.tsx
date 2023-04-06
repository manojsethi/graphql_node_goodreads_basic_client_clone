import MyBooksShelfModal from "@/components/pages/library/myBooksShelfModal";
import {
  useGetUpdatedCurrentUserLazyQuery,
  User,
  UserBooks,
} from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { EditFilled } from "@ant-design/icons";
import { Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import Router from "next/router";
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
  }, [queryUpdatedMe]);
  const columns: ColumnsType<UserBooks> = [
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",

      render: (row, data) => (
        <div
          className="flex"
          style={{ height: "10rem", width: "10rem", position: "relative" }}
        >
          <Image
            src={
              !data.book?.image
                ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                : `${constants.BASE_URL}/photos/${data.book?.image}`
            }
            alt={data.book!.name}
            fill
            objectFit="contain"
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
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (row: any, data: any) => (
        <>
          <Rate disabled allowHalf value={data.book?.totalRatingValue}></Rate>
        </>
      ),
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
              pagination={false}
              rowKey={(record) => record.book!._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
