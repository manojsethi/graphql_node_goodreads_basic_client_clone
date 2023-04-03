import {
  Book_Status,
  UserBooks,
  useRemoveUserBooksMutation,
  useUpdateUserBooksMutation,
} from "@/gql/generated/graphql";
import { CheckOutlined, DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import Router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
const { confirm } = Modal;

const MyBooksShelfModal = (props: {
  selectedRow: UserBooks;
  isModalOpen: boolean;
  setCurrentStatus?: any;
  handleOk: () => any;
  currentStatus?: any;
  setIsModalOpen: any;
}) => {
  const [buttonArr, setButtonArr] = useState([
    {
      name: "Want to read",
      selected: props.selectedRow.status == Book_Status.WantToRead,
      value: Book_Status.WantToRead,
    },
    {
      name: "Currently Reading",
      selected: props.selectedRow.status == Book_Status.Reading,
      value: Book_Status.Reading,
    },
    {
      name: "Read",
      selected: props.selectedRow.status == Book_Status.Read,
      value: Book_Status.Read,
    },
  ]);
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const [
    mutateAddUserBook,
    {
      loading: loadingUpdateUserBook,
      error: errorUpdateUserBook,
      data: dataUpdateUserBook,
    },
  ] = useUpdateUserBooksMutation({
    onCompleted({ updateUserBooks }) {
      props.handleOk();
      handleCancel();
    },
  });

  const [
    mutateRemoveUserBook,
    {
      loading: loadingRemoveUserBook,
      error: errorRemoveUserBook,
      data: dataRemoveUserBook,
    },
  ] = useRemoveUserBooksMutation({
    onCompleted({ removeUserBooks }) {
      Router.push("/library");
    },
  });
  const handleSelectedBook = (i: Book_Status) => {
    mutateAddUserBook({
      variables: {
        input: {
          bookId: props.selectedRow.book!._id,
          status: i,
        },
      },
    });
  };
  return (
    <div>
      <Modal
        footer={null}
        className="py-5"
        style={{ maxWidth: "41rem" }}
        open={props.isModalOpen}
        onOk={props.handleOk}
        onCancel={handleCancel}
      >
        <h1 className="text-center font-semibold	text-xl">
          Choose a shelf for this book
        </h1>
        {buttonArr.map((x, index) => (
          <div className="items-center justify-center flex" key={index}>
            <Button
              disabled={x.selected}
              onClick={() => {
                handleSelectedBook(x.value);
              }}
              style={{ width: "70%", height: "2.5rem" }}
              className="mt-4 border-solid border-2 border-black"
              shape="round"
              size={"large"}
            >
              {x.selected ? <CheckOutlined /> : ""}
              {x.name}
            </Button>
          </div>
        ))}

        <div className="flex items-center justify-center mt-4">
          <Button
            className="text-center flex items-center space-x-1 justify-center cursor-pointer "
            disabled={props.selectedRow.status !== Book_Status.Read}
            onClick={() => {
              confirm({
                type: "confirm",
                title: "Do you want remove this book from shelf?",

                onOk: async () => {
                  await mutateRemoveUserBook({
                    variables: {
                      input: {
                        bookId: props.selectedRow.book?._id as string,
                      },
                    },
                  });
                  Router.push("/library");
                },
              });
            }}
          >
            <DeleteFilled className="text-lg" />
            <p className="mt-3 text-base font-semibold">Remove from my shelf</p>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyBooksShelfModal;
