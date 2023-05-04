import Loader from "@/components/appLoader";
import {
  Book,
  Book_Status,
  Category,
  useGetBooksByCategoryLazyQuery,
  useGetCategoryByIdLazyQuery,
  useGetCurrentUserQuery,
  useGetUpdatedCurrentUserLazyQuery,
  User,
  useUpdateUserBooksMutation,
} from "@/gql/generated/graphql";
import constants from "@/utils/constants";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export const staticBooksData: {
  name: string;
  image: string;
  category: string;
  want_to_read: boolean;
  title: string;
}[] = [];
const RecommendedBooks = () => {
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const rightAreaRef = useRef<HTMLDivElement>(null);

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
  }, [categoryByIdQuery, categoryId, getBooksByCategoryQuery, queryUpdatedMe]);
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
    <div className="flex">
      <div
        ref={categoryMenuRef}
        className="h-[100vh-52px] py-5 fixed top-[52px] bottom-0 overflow-y-scroll bg-green-200 w-[250px] left-[-250px] md:left-0 duration-1000 ease-in"
      >
        <DynamicSideNav setCategoryId={setCategoryId} />
      </div>
      <div
        ref={rightAreaRef}
        className="mt-[60px] px-5 md:ml-[250px] md:mr-[25px] w-full md:w-[calc(100vw-300px)] duration-500 ease-in"
      >
        <>
          <div className="flex items-center">
            <span
              title="Other Categories"
              onClick={() => {
                categoryMenuRef.current?.classList.toggle("left-[-250px]");
                rightAreaRef.current?.classList.toggle("ml-[250px]");
                categoryMenuRef.current?.classList.toggle("z-10");
              }}
              className="xs:block md:hidden cursor-pointer mr-2"
            >
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24.75 24.75"
              >
                <g>
                  <path
                    d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
		c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
                  />
                </g>
              </svg>
            </span>
            <h1 className="text-3xl m-0">Recommended Books</h1>
          </div>
          {[
            ...staticBooks.map((cat, index) => {
              return (
                <div key={index}>
                  {(dataMe?.me.category.map((x) => x._id).includes(cat._id) ||
                    categoryId) &&
                    cat.books.length > 0 && (
                      <>
                        <h1 className="font-bold text-lg mt-6">{cat.name}</h1>

                        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {cat.books.map((staticBook, bookIndex) => {
                            return (
                              <div
                                key={bookIndex}
                                className="z-[-1] align-center justify-center my-4 border-2 p-2"
                              >
                                <div>
                                  <div
                                    className="flex mx-auto"
                                    style={{
                                      height: "10rem",
                                      width: "7rem",
                                      position: "relative",
                                    }}
                                  >
                                    <Image
                                      src={
                                        !staticBook.image
                                          ? "https://www.shutterstock.com/image-vector/default-image-icon-thin-linear-260nw-2136460353.jpg"
                                          : `${constants.BASE_URL}/photos/${staticBook.image}`
                                      }
                                      alt={staticBook.name}
                                      fill
                                      objectFit="contain"
                                      className="z-[-1]"
                                    />
                                  </div>
                                  <div className="align-center justify-center flex">
                                    {staticBook.name}
                                  </div>
                                  <div className="align-center justify-center flex">
                                    <Button
                                      disabled={userBooksIds.includes(
                                        staticBook._id
                                      )}
                                      onClick={() =>
                                        onWantToReadHandler(staticBook)
                                      }
                                      className={`mx-auto
                                        ${
                                          userBooksIds.includes(staticBook._id)
                                            ? "bg-green-100 mt-3"
                                            : "bg-slate-100 mt-3"
                                        }
                                          `}
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
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                </div>
              );
            }),
          ]}
        </>
      </div>
    </div>
  );
};

export default RecommendedBooks;
