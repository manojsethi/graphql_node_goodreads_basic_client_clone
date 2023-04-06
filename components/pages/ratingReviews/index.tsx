import {
  BookRating,
  Book_Status,
  useGetBookRatingLazyQuery,
  useGetCurrentUserQuery,
  useNewRatingSubscription,
  UserBooks,
} from "@/gql/generated/graphql";
import { Button, Col, Rate, Row, Table } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";

const RatingReviews = (props: { userBook: UserBooks }) => {
  const [bookRatings, setBookRatings] = useState<BookRating[]>([]);
  const [myRating, setMyBookRatings] = useState<BookRating>();
  const { data: dataMe } = useGetCurrentUserQuery();
  const { data: dataNewComment, loading: loadingNewComment } =
    useNewRatingSubscription({
      variables: {
        bookId: props.userBook.book!._id,
      },
      onData({ data }) {
        if (data.data?.newRating) {
          setBookRatings((prevState) => [
            data.data?.newRating as BookRating,
            ...prevState,
          ]);
        }
      },
    });

  const [queryGetBookRatings, { loading, error, data }] =
    useGetBookRatingLazyQuery({
      onCompleted({ getBookRating }) {
        setBookRatings(getBookRating as BookRating[]);
        let myRating = getBookRating.find((x) => x.user._id == dataMe?.me._id);
        if (myRating) {
          setMyBookRatings(myRating as BookRating);
        }
      },
    });
  useEffect(() => {
    queryGetBookRatings({
      variables: {
        input: props.userBook.book!._id,
      },
    });
  }, [queryGetBookRatings, props.userBook.book]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: () => (
        <>{myRating && <Rate disabled allowHalf value={myRating.rating} />}</>
      ),
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      render: () => (
        <>
          {myRating &&
            new Date(myRating.publishDate).toLocaleDateString("en-US")}
        </>
      ),
    },
  ];
  const communityColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (row: any, data: any) => (
        <>
          <Rate disabled allowHalf value={data.rating}></Rate>
        </>
      ),
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      render: (row: any, data: BookRating) => (
        <>{new Date(data.publishDate).toLocaleDateString("en-US")}</>
      ),
    },
  ];
  return (
    <div className="mt-12">
      <Row>
        <Col md={24}>
          <>
            {props.userBook.status == Book_Status.Finish && (
              <>
                <hr />
                <div>
                  <h2 className="text-3xl font-semibold mt-6">
                    Rating & Reviews
                  </h2>

                  {myRating && (
                    <>
                      <div className="mt-8"></div>
                      <p className="text-xl">My Review</p>
                      <Table
                        dataSource={[
                          {
                            _id: myRating?._id,
                            name: myRating?.user.name,
                            review: myRating?.review,
                          },
                        ]}
                        rowKey={(record) => record._id}
                        columns={columns}
                        pagination={false}
                      ></Table>
                    </>
                  )}
                </div>
                {!myRating && (
                  <div className="my-10">
                    <Button
                      onClick={() =>
                        Router.push(
                          {
                            pathname: `/review/edit/${props.userBook.book?._id}`,
                            query: { data: JSON.stringify(props.userBook) },
                          },
                          `/review/edit/${props.userBook.book?._id}`
                        )
                      }
                      className="bg-black text-white h-14 p-4 w-44 rounded-3xl"
                    >
                      Write a review
                    </Button>
                  </div>
                )}
              </>
            )}
            <hr />
            {bookRatings.length > 0 && (
              <div className="mt-4">
                <p className="text-xl">Community Reviews</p>
                <Table
                  dataSource={bookRatings.map((x) => {
                    return {
                      _id: x._id,
                      user: x.user,
                      name: x.user.name,
                      review: x.review,
                      rating: x.rating,
                      publishDate: x.publishDate,
                    };
                  })}
                  rowKey={(record) => record._id}
                  pagination={false}
                  columns={communityColumns}
                ></Table>
              </div>
            )}
          </>
          {bookRatings.length == 0 &&
            props.userBook.status != Book_Status.Finish && (
              <>
                <hr />
                <div>
                  <h2 className="text-3xl text-center font-semibold mt-6">
                    No Reviews Yet!!
                  </h2>
                </div>
              </>
            )}
        </Col>
      </Row>
    </div>
  );
};

export default RatingReviews;
