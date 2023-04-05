import Loader from "@/components/appLoader";
import {
  useGetUpdatedCurrentUserLazyQuery,
  UserBooks,
} from "@/gql/generated/graphql";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditReview = () => {
  const query: any = useRouter();
  const [userBook, setUserBook] = useState<UserBooks>();
  const [currentStatus, setCurrentStatus] = useState<any>({
    id: query.query.edit_id?.toString(),
    status: undefined,
  });

  const [queryUpdatedMe, { loading: loadingMe, data: dataUpdatedMe }] =
    useGetUpdatedCurrentUserLazyQuery({
      onCompleted({ getUpdatedMe }) {
        let selectedUserBook = getUpdatedMe.userBooks.find(
          (x) => x.book?._id === query.query.edit_id?.toString()
        ) as UserBooks;
        setUserBook(selectedUserBook);
      },
    });
  useEffect(() => {
    queryUpdatedMe();
  }, []);
  const DynamicRatingBooksUpperPage = dynamic(
    () => import("../../../components/pages/ratingReviews/editReviewUpperPart"),
    {
      loading: () => <Loader />,
    }
  );

  return (
    <div>
      {!loadingMe && query.query.edit_id && userBook && (
        <DynamicRatingBooksUpperPage
          bookdetails={userBook}
          values={query.query.edit_id?.toString()}
        />
      )}
    </div>
  );
};

export default EditReview;
