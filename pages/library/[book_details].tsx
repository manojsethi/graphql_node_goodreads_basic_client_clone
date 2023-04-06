import Loader from "@/components/appLoader";
import MyBooksShelfModal from "@/components/pages/library/myBooksShelfModal";
import {
  useGetUpdatedCurrentUserLazyQuery,
  UserBooks,
} from "@/gql/generated/graphql";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BookDetails = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userBook, setUserBook] = useState<UserBooks>();
  const [currentStatus, setCurrentStatus] = useState<any>({
    id: router.query.book_details,
    status: undefined,
  });

  const [queryUpdatedMe, { loading, data: dataUpdatedMe }] =
    useGetUpdatedCurrentUserLazyQuery({
      onCompleted({ getUpdatedMe }) {
        let selectedUserBook = getUpdatedMe.userBooks.find(
          (x) => x.book?._id === router.query.book_details
        ) as UserBooks;
        setUserBook(selectedUserBook);
      },
    });

  const handleClickModal = () => {
    setUserBook(undefined);
    queryUpdatedMe();
  };
  const DynamicMyBooksUpperPage = dynamic(
    () => import("../../components/pages/library/myBooksUpperPage"),
    {
      loading: () => <Loader />,
    }
  );
  useEffect(() => {
    queryUpdatedMe();
  }, [queryUpdatedMe]);

  return (
    <div>
      {userBook && (
        <>
          <DynamicMyBooksUpperPage
            setIsModalOpen={setIsModalOpen}
            userBook={userBook}
          />

          <MyBooksShelfModal
            isModalOpen={isModalOpen}
            handleOk={handleClickModal}
            setIsModalOpen={setIsModalOpen}
            selectedRow={userBook}
          />
        </>
      )}
    </div>
  );
};

export default BookDetails;
