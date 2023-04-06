import {
  useAddBookRatingMutation,
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
  UserBooks,
} from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, notification, Rate, Row } from "antd";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";

const EditReview = (props: { values: string; bookdetails: UserBooks }) => {
  const { TextArea } = Input;
  const [rateValue, setRateValue] = useState<number>();
  const [reviewValue, setReviewValue] = useState<string>();
  const [getCurrentUserQuery, { data: userData }] =
    useGetCurrentUserLazyQuery();
  useEffect(() => {
    getCurrentUserQuery();
  }, [getCurrentUserQuery]);
  const [mutateAddBookRating] = useAddBookRatingMutation({
    onCompleted({ addBookRating }) {
      notification.open({
        message: "Success",
        description: "Rating Added Successfully",
        placement: "topRight",
        icon: <CheckCircleOutlined style={{ color: "#00FF00" }} />,
      });
      Router.push(`/library/${props.bookdetails.book?._id}`);
    },
  });
  return (
    <div>
      <Row className="mt-4">
        <Col md={2} lg={3} xl={4}></Col>
        <Col md={20} lg={20} xl={18} className="mt-2">
          <p className="font-semibold text-2xl">
            {props.bookdetails.book?.name}
          </p>
          <div className="flex space-x-4">
            <div
              style={{ height: "5rem", width: "5rem", position: "relative" }}
            >
              <Image
                src={
                  !props.bookdetails.book?.image
                    ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                    : `${constants.BASE_URL}/photos/${props.bookdetails.book?.image}`
                }
                alt={props.bookdetails.book!.name}
                fill
                objectFit="contain"
              />
            </div>

            <div>
              <p className="font-semibold text-xl">
                {props.bookdetails.book?.name}
                <br />
                <span className="text-base">
                  by {props.bookdetails.book?.author}
                </span>
                <br />
              </p>
            </div>
          </div>
          <hr className="mt-2" />
          <div className="flex space-x-4">
            <p className="mt-2">My Rating</p>
            <Rate value={rateValue} onChange={(e) => setRateValue(e)} />
          </div>

          <div className="mt-2">
            <div className="font-normal text-bas my-2">
              What did you think ?
            </div>
            <TextArea
              onChange={(e) => setReviewValue(e.target.value)}
              rows={12}
            />
            <Button
              onClick={() => {
                !reviewValue
                  ? message.error("Review is required")
                  : mutateAddBookRating({
                      variables: {
                        input: {
                          addedBy: userData!.me._id,
                          bookId: props.bookdetails.book!._id,
                          rating: rateValue!,
                          review: reviewValue,
                        },
                      },
                    });
              }}
              style={{ background: "#F4F1EA" }}
              className="mt-4"
            >
              Post
            </Button>
          </div>
        </Col>
        <Col xl={6}></Col>
      </Row>
    </div>
  );
};

export default EditReview;
