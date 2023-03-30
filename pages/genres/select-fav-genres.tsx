import Loader from "@/components/appLoader";
import { Alert, Col, Row } from "antd";
import dynamic from "next/dynamic";
const Genres = () => {
  const DynamicGenreSelectors = dynamic(
    () => import("../../components/pages/genres/genreSelectors"),
    {
      loading: () => <Loader />,
    }
  );

  return (
    <div>
      <h1 className="text-xl font-bold	text-center mt-4">
        Select your favorite genres
      </h1>
      <div className="p-2">
        <Row>
          <Col md={6}></Col>
          <Col md={12}>
            <Alert
              className="text-center p-4"
              message="We use your favorite genres to make better book recommendations and tailor what you see in your Updates feed."
              type="success"
            />
          </Col>
        </Row>
      </div>

      <DynamicGenreSelectors />
    </div>
  );
};

export default Genres;
