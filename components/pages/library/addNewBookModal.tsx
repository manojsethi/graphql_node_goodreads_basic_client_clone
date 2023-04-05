import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import AddNewBookForm from "./addNewBookForm";
interface IAddNewBookModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
const AddNewBookModal = (props: IAddNewBookModalProps) => {
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <div>
      <Modal
        footer={null}
        width={1000}
        title="Add New Book"
        open={props.isModalOpen}
        onOk={() => props.setIsModalOpen(false)}
        onCancel={handleCancel}
      >
        <div className="my-7">
          <AddNewBookForm setIsModalOpen={props.setIsModalOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default AddNewBookModal;
