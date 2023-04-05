import Loader from "@/components/appLoader";
import {
  Book,
  Book_Status,
  useAddBookMutation,
  useGetBooksByCategoryLazyQuery,
  useGetBooksByCategoryQuery,
  useGetBooksQuery,
  useGetCategoryByIdLazyQuery,
  useGetCurrentUserQuery,
  useGetUpdatedCurrentUserLazyQuery,
  User,
  useUpdateUserBooksMutation,
} from "@/gql/generated/graphql";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Category } from "@/gql/generated/graphql";
import constants from "@/utils/constants";
export const staticBooksData: {
  name: string;
  image: string;
  category: string;
  want_to_read: boolean;
  title: string;
}[] = [];
const RecommendedBooks = () => {
  const { data: dataMe } = useGetCurrentUserQuery();
  const [me, setMe] = useState<User>();
  const [queryUpdatedMe, { data: dataUpdatedMe }] =
    useGetUpdatedCurrentUserLazyQuery({
      onCompleted({ getUpdatedMe }) {
        setMe(getUpdatedMe as User);
        let userBookIds = getUpdatedMe.userBooks.map((x) => x.book!._id);
        setUserBooksIds(userBookIds);
      },
    });

  const [getBooksByCategoryQuery, { loading, error, data }] =
    useGetBooksByCategoryLazyQuery({
      onCompleted({ getCategories }) {
        let s = getCategories as Category[];
        setStaticBooks([...s]);
      },
    });
  const [
    categoryByIdQuery,
    {
      loading: loadingByCategory,
      error: errorByCategory,
      data: dataByCategory,
    },
  ] = useGetCategoryByIdLazyQuery({
    onCompleted({ getCategoryById }) {
      let d = [getCategoryById] as Category[];
      setStaticBooks(d);
    },
  });
  const [userBooksIds, setUserBooksIds] = useState<string[]>([]);
  data?.getCategories.map((cat) => {
    cat.books.map;
  });
  const DynamicSideNav = dynamic(
    () => import("../../components/pages/recommendedBooks/sideNav"),
    {
      loading: () => <Loader />,
    }
  );
  const [staticBooks, setStaticBooks] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>();
  useEffect(() => {
    queryUpdatedMe();
    if (categoryId) {
      categoryByIdQuery({
        variables: {
          id: categoryId,
        },
      });
    } else {
      getBooksByCategoryQuery();
    }
  }, [categoryId]);
  const [
    mutateAddUserBook,
    {
      loading: loadingUpdateUserBook,
      error: errorUpdateUserBook,
      data: dataUpdateUserBook,
    },
  ] = useUpdateUserBooksMutation({
    onCompleted({ updateUserBooks }) {
      queryUpdatedMe();
    },
  });
  const onWantToReadHandler = (staticBook: Book) => {
    mutateAddUserBook({
      variables: {
        input: {
          bookId: staticBook._id,
          status: Book_Status.WantToRead,
        },
      },
    });
  };

  return (
    <div>
      <Row className="mt-4 ">
        <Col md={8} xl={4}>
          <DynamicSideNav setCategoryId={setCategoryId} />
        </Col>
        <Col className="" md={16} xl={20}>
          <>
            <h1 className="text-3xl">Recommended Books</h1>

            {[
              ...staticBooks.map((cat) => {
                return (
                  <>
                    {(dataMe?.me.category.map((x) => x._id).includes(cat._id) ||
                      categoryId) &&
                      cat.books.length > 0 && (
                        <>
                          <h1 className="ml-6 text-lg my-6">{cat.name}</h1>

                          <Row className="mt-3">
                            {cat.books.map((staticBook, bookIndex) => {
                              return (
                                <Col
                                  key={bookIndex}
                                  className="align-center justify-center flex my-4 border-2 p-2"
                                >
                                  <div>
                                    <div
                                      className="flex"
                                      style={{ height: "10rem", width: "7rem" }}
                                    >
                                      <img
                                        className="self-center"
                                        src={
                                          !staticBook.image
                                            ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                                            : `${constants.BASE_URL}/photos/${staticBook.image}`
                                        }
                                        alt={staticBook.name}
                                      />
                                    </div>
                                    <div className="align-center justify-center flex">
                                      {staticBook.name}
                                    </div>
                                    <Button
                                      disabled={userBooksIds.includes(
                                        staticBook._id
                                      )}
                                      onClick={() =>
                                        onWantToReadHandler(staticBook)
                                      }
                                      className={
                                        userBooksIds.includes(staticBook._id)
                                          ? "bg-green-100 mt-3"
                                          : "bg-slate-100 mt-3"
                                      }
                                    >
                                      {userBooksIds.includes(staticBook._id) ? (
                                        <>
                                          <CheckOutlined className="text-green-600	" />
                                          Added
                                        </>
                                      ) : (
                                        "Want to read"
                                      )}
                                    </Button>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                        </>
                      )}
                  </>
                );
              }),
            ]}
          </>
          <div className="items-center flex justify-center my-20 ">
            <Button
              disabled={userBooksIds.length == 0}
              onClick={() => Router.push("/library")}
              className="my-20"
              style={{ background: "#F4F1EA" }}
            >
              My library
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendedBooks;
