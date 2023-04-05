import { CommentOutlined } from "@ant-design/icons";
import { Col, Input, Rate, Row } from "antd";
import ReadingProcessStepper from "./reading_process_stepper";

const ShowReviewUpperPart = () => {
  const { TextArea } = Input;
  return (
    <div>
      <Row gutter={16}>
        <Col md={5} xl={6} lg={5}></Col>
        <Col md={19} xl={12} lg={19} className="mt-2">
          <p className="font-semibold text-2xl">
            {
              "Zero to One: Notes on Startups, or How to Build the Future > Review > Edit"
            }
          </p>
          <div className="flex space-x-8">
            <div>
              <img
                src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630663027l/18050143._SY75_.jpg"
                style={{ height: "12rem", width: "8rem" }}
              />
            </div>

            <div>
              <p className="font-semibold text-sm">
                {"Zero to One: Notes on Startups, or How to Build the Future"}
                <br />
                <span className="text-base">by Atul Kumar.</span>
                <br />
                <div className="flex space-x-3">
                  <CommentOutlined />
                  <div>
                    {" "}
                    <p>
                      Atul Review <br />
                      <Rate />
                    </p>
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div className="mt-2 text-2xl">Reading Books</div>
          <hr className="mt-4" />

          <ReadingProcessStepper />
        </Col>
        <Col md={24} xl={6} lg={6}></Col>
      </Row>
    </div>
  );
};

export default ShowReviewUpperPart;
