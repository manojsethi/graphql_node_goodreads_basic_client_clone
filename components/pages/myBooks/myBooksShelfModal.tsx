import {
  Book_Status,
  UserBooks,
  useUpdateUserBooksMutation,
} from "@/gql/generated/graphql";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
const MyBooksShelfModal = (props: {
  selectedRow: UserBooks;
  isModalOpen: boolean;
  handleOk: () => any;
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
  const handleSelectedBook = (i: Book_Status) => {
    mutateAddUserBook({
      variables: {
        input: {
          bookId: props.selectedRow.book!._id,
          status: i,
        },
      },
    });
    console.log(i, "i");
    // setButtonArr((prev) => {
    //   prev[i].selected = prev[i].selected ? false : true;
    //   console.log(prev, "prev");
    //   return [...prev];
    // });
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
              onClick={() => handleSelectedBook(x.value)}
              style={{ width: "70%", height: "2.5rem" }}
              className="mt-4 border-solid border-2 border-black"
              shape="round"
              size={"large"}
            >
              {" "}
              {x.selected ? <CheckOutlined /> : ""}
              {x.name}
            </Button>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default MyBooksShelfModal;
