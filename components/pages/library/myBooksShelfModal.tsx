import {
  Book_Status,
  UserBooks,
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
    {
      name: "Finish",
      selected: props.selectedRow.status == Book_Status.Finish,
      value: Book_Status.Finish,
    },
  ]);

  const selectedIndex = buttonArr.indexOf(
    buttonArr.find((x) => x?.value == props.selectedRow.status)!
  );
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
        <h1 className="text-center font-semibold text-xl">
          Choose a shelf for this book
        </h1>
        {buttonArr.map((x, index) => (
          <div className="items-center justify-center flex" key={index}>
            <Button
              disabled={index < selectedIndex || index > selectedIndex + 1}
              onClick={() => {
                if (!x!.selected) handleSelectedBook(x!.value);
              }}
              style={{
                width: "70%",
                height: "2.5rem",
                backgroundColor: x!.selected ? "green" : "",
                color: x!.selected ? "white" : "",
                cursor: x!.selected ? "default" : "",
              }}
              className="mt-4 border-solid border-2 border-black"
              shape="round"
              size={"large"}
            >
              {x!.name}
            </Button>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default MyBooksShelfModal;
