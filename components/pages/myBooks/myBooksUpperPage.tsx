import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Rate, Row } from "antd";
const buttonsArr: { name: string; icon: any }[] = [
  { name: "Read", icon: <EditOutlined className="text-2xl" /> },
  { name: "Buy on Amazon In", icon: "" },
];
const MyBooksUpperPage = (props: { setIsModalOpen: any }) => {
  return (
    <div>
      <Row className="mt-20">
        <Col className="mt-20" md={24} lg={24} xl={5}></Col>
        <Col md={12} lg={12} xl={6}>
          <div className="items-center justify-center flex">
            <img
              src={
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386925614i/9742.jpg"
              }
              style={{ height: "19rem" }}
            />
          </div>
          {buttonsArr.map((x, i) => (
            <div key={i} className="items-center justify-center flex">
              <Button
                onClick={() => {
                  i === 0 ? props.setIsModalOpen(true) : "";
                }}
                style={{ width: "70%", height: "3rem" }}
                className="mt-4 border-solid border-2 border-black"
                shape="round"
                icon={x.icon}
                size={"large"}
              >
                {x.name}
              </Button>
            </div>
          ))}
          <div className="items-center justify-center flex mt-3">
            <Rate className="text-center " />
          </div>
        </Col>
        <Col md={12} lg={12} xl={9}>
          <h1 className="text-4xl	">
            The Audacity of Hope: Thoughts on Reclaiming the American Dream
          </h1>
          <div className="text-2xl ">Barack Obama</div>
          <Rate className="mt-3" />
          <p className="mt-3 text-base pr-5">
            3.82 160,713 ratings5,726 reviews The Audacity of Hope is Barack
            Obama's call for a new kind of politics—a politics that builds upon
            those shared understandings that pull us together as Americans.
            Lucid in his vision of America's place in the world, refreshingly
            candid about his family life and his time in the Senate, Obama here
            sets out his political convictions and inspires us to trust in the
            dogged optimism that has long defined us and that is our best hope
            going forward.
          </p>
          <p className="mt-3 text-base">375 pages, Hardcover</p>
          <div className="text-base">First published January 1, 2006</div>
        </Col>
        <Col md={24} lg={24} xl={5}></Col>
      </Row>
    </div>
  );
};

export default MyBooksUpperPage;
