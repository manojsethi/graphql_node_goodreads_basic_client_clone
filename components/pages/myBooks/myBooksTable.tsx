import { staticBooksData } from "@/pages/recommendedBooks";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Rate, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Router from "next/router";

interface DataType {
  name: string;
  category: string;
  image: string;
  title: string;
}
const MyBooksTable = () => {
  const data: DataType[] = [...staticBooksData];
  const columns: ColumnsType<DataType> = [
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",
      width: 300,
      render: (row, data) => (
        <div
          className="cursor-pointer"
          onClick={() => Router.push("/library/2")}
        >
          <img src={data.image} style={{ height: "8rem", width: "8rem" }}></img>
        </div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 250,
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      width: 300,
      key: "rate",
      render: () => {
        return <>{<Rate />}</>;
      },
    },
    {
      title: "Address",
      dataIndex: "shelves",
      key: "shelves",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Date Read",
      dataIndex: "date read",
      key: "date read",
    },
    {
      title: "Date Added",
      dataIndex: "date added",
      key: "date added",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space className="cursor-pointer" size="middle">
          <EditFilled className="text-sky-700	text-2xl" />
          <DeleteFilled className="text-red-500 text-xl" />
        </Space>
      ),
    },
  ];
  return (
    <div className="mt-8">
      <Table scroll={{ x: 1000 }} columns={columns} dataSource={data} />
    </div>
  );
};

export default MyBooksTable;
