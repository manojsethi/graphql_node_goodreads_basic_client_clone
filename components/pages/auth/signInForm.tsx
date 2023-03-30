import {
  useGetCurrentUserLazyQuery,
  useGetCurrentUserQuery,
  useLoginUserMutation,
} from "@/gql/generated/graphql";
import { CloseCircleOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/AntdIcon";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import Router from "next/router";

const SignInForm = () => {
  const onFinish = (values: any) => {
    loginUser({
      variables: { input: { email: values.name, password: values.password } },
    });
  };
  const [getMeQuery, { loading: loadingMe, error: errorMe, data: dataMe }] =
    useGetCurrentUserLazyQuery({
      onCompleted(data) {
        console.log(data);
        if (data.me.category && data.me.category.length == 0)
          Router.push("/genres/select-fav-genres");
        else {
          Router.push("/recommendedBooks");
        }
      },
    });
  const [loginUser, { data, loading, error }] = useLoginUserMutation({
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

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <div>
      <Form
        className="mt-7"
        name="basic"
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
              <Input className="rounded-3xl h-9	bg-slate-100			" />
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
              <Input.Password className="rounded-3xl 	h-9 bg-slate-100		" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} sm={24} lg={24} xl={24}></Col>
          <Col xs={2} sm={2} md={6} lg={9} xl={10}></Col>
          <Col xs={20} sm={20} md={12} lg={6} xl={4}>
            <div>
              <Form.Item>
                <Button
                  loading={loading}
                  className="bg-black text-white w-full h-full px-20	p-2 rounded-3xl"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>

      <div>
        <div className="text-center font-normal text-base text-slate-400 mt-8">
          New to GoodReads ?
        </div>
        <Row>
          <Col xs={2} sm={2} md={6} lg={9} xl={10}></Col>
          <Col xs={20} sm={20} md={12} lg={6} xl={4}>
            <Button
              onClick={() => Router.push("/auth/sign-up")}
              className="	 text-black w-full  h-full px-20 mt-3	p-0.5 rounded-3xl"
            >
              Sign Up
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignInForm;
