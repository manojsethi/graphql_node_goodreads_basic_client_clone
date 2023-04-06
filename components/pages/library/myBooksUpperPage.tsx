import { UserBooks } from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Rate, Row } from "antd";
import Image from "next/image";
import RatingReviews from "../ratingReviews";
const buttonsArr: { name: string; icon: any }[] = [
  { name: "Read", icon: <EditOutlined className="text-2xl" /> },
];
const MyBooksUpperPage = (props: {
  setIsModalOpen: any;
  userBook: UserBooks;
}) => {
  return (
    <div>
      <Row gutter={14} className="mt-20">
        <Col md={8}>
          <div className="items-center justify-center flex">
            <div
              style={{ height: "10rem", width: "10rem", position: "relative" }}
            >
              <Image
                src={
                  !props.userBook.book?.image
                    ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                    : `${constants.BASE_URL}/photos/${props.userBook.book?.image}`
                }
                alt={props.userBook.book!.name}
                fill
                objectFit="contain"
              />
            </div>
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

        <Col md={16}>
          <h1 className="text-4xl	">{props.userBook.book?.name}</h1>
          <div className="text-2xl ">{props.userBook.book?.author}</div>
          {props.userBook.book?.totalRatingValue && (
            <>
              <div className="mt-3">
                Total Ratings :{" "}
                <span>{props.userBook.book.totalRatingCount}</span>
              </div>
              <Rate
                disabled={true}
                allowHalf
                value={props.userBook.book.totalRatingValue}
                className="mt-3"
              />
            </>
          )}

          <p className="mt-3 text-base pr-5">
            {props.userBook.book?.description}
          </p>

          <div className="text-base">
            {new Date(props.userBook.book?.publishDate).toLocaleDateString(
              "en-US"
            )}
          </div>
        </Col>
      </Row>
      <div className="mt-12">
        <RatingReviews userBook={props.userBook} />
      </div>
    </div>
  );
};

export default MyBooksUpperPage;
