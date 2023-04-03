import { UserBooks } from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Rate, Row } from "antd";
const buttonsArr: { name: string; icon: any }[] = [
  { name: "Read", icon: <EditOutlined className="text-2xl" /> },
];
const MyBooksUpperPage = (props: {
  setIsModalOpen: any;
  userBook: UserBooks;
}) => {
  return (
    <div>
      <Row className="mt-20">
        <Col className="mt-20" md={24} lg={24} xl={5}></Col>
        <Col md={12} lg={12} xl={6}>
          <div className="items-center justify-center flex">
            <img
              src={
                !props.userBook.book?.image
                  ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                  : `${constants.BASE_URL}/photos/${props.userBook.book?.image}`
              }
              alt={"staticbooks"}
              style={{ height: "10rem", width: "7rem" }}
            />
          </div>

          <div className="items-center justify-center flex">
            <Button
              onClick={() => {
                props.setIsModalOpen(true);
              }}
              style={{ width: "70%", height: "3rem" }}
              className="mt-4 border-solid border-2 border-black"
              shape="round"
              icon={<EditOutlined className="text-2xl" />}
              size={"large"}
            >
              {props.userBook.status}
            </Button>
          </div>
        </Col>
        <Col md={12} lg={12} xl={9}>
          <h1 className="text-4xl	">{props.userBook.book?.name}</h1>
          <div className="text-2xl ">{props.userBook.book?.author}</div>
          <Rate className="mt-3" />
          <p className="mt-3 text-base pr-5">
            {props.userBook.book?.description}
          </p>

          <div className="text-base">{props.userBook.createdAt}</div>
        </Col>
        <Col md={24} lg={24} xl={5}></Col>
      </Row>
    </div>
  );
};

export default MyBooksUpperPage;
