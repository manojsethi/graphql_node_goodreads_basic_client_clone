import Loader from "@/components/appLoader";
import dynamic from "next/dynamic";

const ShowReviews = () => {
    const DynamicRatingBooksUpperPage = dynamic(
        () => import("../../../components/pages/ratingReviews/showReviews/showReviewUpperPart"),
        {
          loading: () => <Loader />,
        }
      );
  return (
    <div>

        <DynamicRatingBooksUpperPage/>
    </div>
  )
}

export default ShowReviews