import {
  useGetCategoriesQuery,
  useGetCurrentUserQuery,
  useUpdateUserGenreMutation,
} from "@/gql/generated/graphql";
import { Button, Card, Checkbox, Col, Row } from "antd";
import Router from "next/router";
import { useState } from "react";
import { genreJSON } from "./genreJSON";

const GenreSelectors = () => {
  const { loading, error, data } = useGetCategoriesQuery();
  const [
    updateGenre,
    {
      loading: genreUpdateLoading,
      error: errorUpdateGenre,
      data: genreUpdateData,
    },
  ] = useUpdateUserGenreMutation({
    onCompleted: () => Router.push("/recommendedBooks"),
  });

  const [genres, setGenres] = useState<any[]>([]);

  const handleCheckBox = (name: string) => {
    setGenres((prev) => {
      if (!prev.includes(name)) {
        prev = [...prev, name];
      } else {
        prev = prev.filter((x) => x !== name);
      }
      return [...prev];
    });
  };

  return (
    <div className="mt-6">
      <div className="items-center flex justify-center">
        <Card style={{ width: "100vh" }}>
          <Row gutter={16}>
            {data?.getCategories.map((x) => {
              return (
                <>
                  <Col
                    className="text-center justify-evenly flex items-center mt-3"
                    md={8}
                    sm={12}
                    lg={6}
                    xs={24}
                    xl={6}
                  >
                    <div className="bg-slate-100  p-2">
                      <div style={{ minWidth: "10rem" }}>
                        <Checkbox onChange={() => handleCheckBox(x._id)}>
                          {x.name}
                        </Checkbox>
                      </div>
                    </div>
                  </Col>
                </>
              );
            })}
          </Row>
        </Card>
      </div>
      <div className="flex items-center justify-center mt-5">
        {genres.length > 0 ? (
          <Button
            onClick={() => {
              updateGenre({
                variables: {
                  input: {
                    categoryIds: genres,
                  },
                },
              });
              //localStorage.setItem("genres", JSON.stringify(genres));
              //;
            }}
            className="px-10 h-10 bg-slate-100"
          >
            Continue{" "}
          </Button>
        ) : (
          <Button className="px-10 h-10 bg-slate-100">
            Select at least one genre to cotinue
          </Button>
        )}
      </div>
    </div>
  );
};

export default GenreSelectors;
