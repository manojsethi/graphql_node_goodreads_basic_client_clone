import { useCreateUserMutation } from "@/gql/generated/graphql";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import Router from "next/router";

const SignUpForm = () => {
  const [createUser, { error, loading, data }] = useCreateUserMutation({
    onCompleted({ createUser }) {
      notification.open({
        message: "Success",
        description: "User created successfully",
        placement: "topRight",
        icon: <CheckCircleOutlined style={{ color: "#00FF00" }} />,
      });
      Router.push("/auth/sign-in");
    },
    onError({ message }) {
      notification.open({
        message: "Error",
        description: message,
        placement: "topRight",
        icon: <CloseCircleOutlined style={{ color: "#FF0000" }} />,
      });
    },
  });
  const onFinish = (values: any) => {
    createUser({
      variables: {
        input: {
          email: values.email,
          name: values.name,
          password: values.password,
        },
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div>
      <Form
        name="basic"
        // wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col xs={2} md={6} lg={9}></Col>
          <Col xs={20} md={12} lg={6}>
            <div className="text-base	font-normal	">Your name</div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input className="rounded-3xl h-9	bg-slate-100	" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={24}></Col>
          <Col xs={2} md={6} lg={9}></Col>

          <Col xs={20} md={12} lg={6}>
            <div className="text-base	font-normal	">Email</div>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input type={"email"} className="rounded-3xl bg-slate-100	h-9	" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={24}></Col>
          <Col xs={2} md={6} lg={9}></Col>
          <Col xs={20} md={12} lg={6}>
            <div className="text-base	font-normal	">Password</div>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="rounded-3xl bg-slate-100	h-9	" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} sm={24} lg={24} xl={24}></Col>
          <Col xs={2} sm={2} md={6} lg={9} xl={10}></Col>
          <Col xs={20} sm={20} md={12} lg={6} xl={4}>
            <div>
              <Form.Item>
                <Button
                  loading={loading}
                  className="bg-black	 text-white w-full h-full px-20	p-2 rounded-3xl"
                  htmlType="submit"
                >
                  Create Account
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignUpForm;
