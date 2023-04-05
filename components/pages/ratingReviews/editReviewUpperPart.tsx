import {
  useAddBookRatingMutation,
  useGetCurrentUserQuery,
  useGetUpdatedCurrentUserLazyQuery,
  UserBooks,
} from "@/gql/generated/graphql";
import { Button, Col, Input, message, Rate, Row } from "antd";
import Router from "next/router";
import constants from "@/utils/constants";
import { useState } from "react";

const EditReview = (props: { values: string; bookdetails: UserBooks }) => {
  const { TextArea } = Input;
  const [rateValue, setRateValue] = useState<number>();
  const [reviewValue, setReviewValue] = useState<string>();
  const {
    loading: loadingUser,
    error: userError,
    data: userData,
  } = useGetCurrentUserQuery();
  const [mutateAddBookRating, { loading, error, data }] =
    useAddBookRatingMutation();
  return (
    <div>
      <Row className="mt-4">
        <Col md={2} lg={3} xl={4}></Col>
        <Col md={20} lg={20} xl={18} className="mt-2">
          <p className="font-semibold text-2xl">
            {props.bookdetails.book?.name}
          </p>
          <div className="flex space-x-4">
            <div>
              <img
                src={`${constants.BASE_URL}/photos/${props.bookdetails.book?.image}`}
                style={{ height: "5rem" }}
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
                Router.push(`/library/${props.bookdetails.book?._id}`);
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
