import { useCreateUserMutation } from "@/gql/generated/graphql";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import Router from "next/router";
import { useTranslation } from "next-i18next";

const SignUpForm = ({ locale }: any) => {
  const { t } = useTranslation();

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

  return (
    <div className="flex flex-col justify-center items-center">
      <Form
        className="mt-7 xs:w-full md:w-2/3"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row className="flex flex-col justify-center items-center">
          <Col className="xs:w-2/3 md:w-2/4">
            <div className="text-base	font-normal	">Your name</div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input className="rounded-3xl h-9	bg-slate-100	" />
            </Form.Item>
          </Col>

          <Col className="xs:w-2/3 md:w-2/4">
            <div className="text-base	font-normal	">Email</div>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input type={"email"} className="rounded-3xl bg-slate-100	h-9	" />
            </Form.Item>
          </Col>

          <Col className="xs:w-2/3 md:w-2/4">
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

          <Col className="xs:w-2/3 md:w-2/4">
            <div className="text-base	font-normal	">Confirm Password</div>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please input your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="rounded-3xl bg-slate-100	h-9	" />
            </Form.Item>
          </Col>

          <Col className="xs:w-2/3 md:w-2/4">
            <div>
              <Form.Item>
                <Button
                  loading={loading}
                  className="bg-black text-white w-full btn_good_reads"
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
