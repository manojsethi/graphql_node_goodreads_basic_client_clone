import {
  Category,
  useGetCategoriesQuery,
  useAddBookMutation,
  useGetCurrentUserQuery,
} from "@/gql/generated/graphql";
import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  DatePickerProps,
  notification,
  Select,
  UploadFile,
  UploadProps,
} from "antd";
import type { SelectProps } from "antd";

import { Button, Col, DatePicker, Form, Input, Row, Upload } from "antd";
import moment from "moment";
import { useState } from "react";
// import { useForm } from "antd/es/form/Form"
import { RcFile } from "antd/es/upload";

const AddNewBookForm = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const props: UploadProps = {
    maxCount: 1,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  const [form] = Form.useForm();

  const [categories, setCategories] = useState<Category[]>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);
  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
  } = useGetCurrentUserQuery();
  const [
    mutateAddBook,
    { loading: loadingAddBook, error: errorAddBook, data: dataAddBook },
  ] = useAddBookMutation({
    onCompleted({ addBook }) {
      console.log(addBook);
      form.resetFields();
      notification.open({
        message: "Success",
        description: "Book Added Successfully",
        placement: "topRight",
        icon: <CheckCircleOutlined style={{ color: "#00FF00" }} />,
      });
    },
  });

  const { loading: categoriesLoading, data } = useGetCategoriesQuery({
    onCompleted({ getCategories }) {
      setCategories(getCategories as Category[]);
    },
  });

  const onFinish = (values: any) => {
    mutateAddBook({
      context: {
        headers: {
          "Apollo-Require-Preflight": "true", // this header will reach the server
        },
      },
      variables: {
        input: {
          name: values.title,
          addedBy: dataMe!.me._id,
          categoryId: selectedItemsIds,
        },
        ...(fileList &&
          fileList.length > 0 && {
            picture: fileList[0] as RcFile,
          }),
      },
    });
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size={"middle"}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <div className="font-semibold">Title</div>
            <Form.Item
              className="mt-1"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Enter title name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <div className="font-semibold">Author</div>

            <Form.Item
              className="mt-1"
              name="author"
              rules={[{ required: true, message: "Author is required" }]}
            >
              <Input placeholder="Enter author name " />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <div className="font-semibold">Publish Date</div>
            <Form.Item
              className="mt-1"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker style={{ width: "100%" }} onChange={onChange} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <div className="font-semibold">Categories</div>
            {!categoriesLoading && (
              <Form.Item
                className="mt-1"
                name="collection"
                rules={[{ required: true, message: "Categories is required" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={(value) => {
                    setSelectedItems(
                      categories!
                        .filter((x) => value.includes(x._id))
                        .map((x) => x.name)
                    );
                    setSelectedItemsIds(value);
                  }}
                  style={{ width: "100%" }}
                  options={categories?.map((item) => ({
                    value: item._id,
                    label: item.name,
                  }))}
                />
              </Form.Item>
            )}
          </Col>
          <Col xs={24} md={12}>
            <div className="font-semibold">Cover Image</div>
            <Form.Item className="mt-1" name="cover_image">
              <Upload
                name="cover_image"
                style={{ width: "100%" }}
                listType="picture"
                maxCount={1}
                {...props}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            loading={loadingAddBook}
            style={{ background: "#F4F1EA" }}
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewBookForm;
