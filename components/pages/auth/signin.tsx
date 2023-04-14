import {
  useGetCurrentUserLazyQuery,
  useLoginUserMutation,
} from "@/gql/generated/graphql";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import Router from "next/router";

const SignInForm = () => {
  const onFinish = (values: any) => {
    loginUser({
      variables: { input: { email: values.name, password: values.password } },
    });
  };
  const [getMeQuery] = useGetCurrentUserLazyQuery({
    onCompleted(data) {
      if (data.me.category && data.me.category.length == 0)
        Router.push("/genres/select-fav-genres");
      else {
        Router.push("/recommended-books");
      }
    },
  });
  const [loginUser, { loading }] = useLoginUserMutation({
    onCompleted({ login }) {
      if (login) {
        getMeQuery();
      }
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
              <Input className="rounded-3xl h-9	bg-slate-100" />
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
              <Input.Password className="rounded-3xl 	h-9 bg-slate-100		" />
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
                  Sign In
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
      <div className="sm:w-2/3 md:w-1/2 text-center">
        <div className="text-center font-normal text-base text-slate-400 mt-1">
          New to GoodReads ?
        </div>
        <Button
          onClick={() => Router.push("/auth/sign-up")}
          className="w-2/3 text-black btn_good_reads mt-2"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
