import {
  useGetCurrentUserLazyQuery,
  useLoginUserMutation,
} from "@/gql/generated/graphql";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, notification, Row } from "antd";
import { useTranslation } from "next-i18next";
import Router from "next/router";

const SignInForm = () => {
  const { t } = useTranslation();
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
            <div className="text-base	font-normal	">{t("email")}</div>
            <Form.Item
              name="name"
              rules={[{ required: true, message: `${t("email_is_required")}` }]}
            >
              <Input className="rounded-3xl h-9	bg-slate-100" />
            </Form.Item>
          </Col>
          <Col className="xs:w-2/3 md:w-2/4">
            <div className="text-base	font-normal	">{t("password")}</div>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: `${t("password_is_required")}` },
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
                  {t("signin")}
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignInForm;
