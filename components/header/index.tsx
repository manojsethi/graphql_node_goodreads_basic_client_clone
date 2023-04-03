import {
  useGetCurrentUserQuery,
  useLogoutLazyQuery,
  useLogoutQuery,
} from "@/gql/generated/graphql";
import { Avatar, Button, MenuProps } from "antd";

import { Dropdown } from "antd";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useState } from "react";

import goodReads from "../../assets/images/goodreads.png";
import AddNewBookModal from "../pages/library/addNewBookModal";
const Header = () => {
  const { data: data } = useGetCurrentUserQuery();
  const [addBookModal, setAddBookModal] = useState<boolean>(false);

  const [userLogout, { error, data: logoutData }] = useLogoutLazyQuery();
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            userLogout();
            Router.push("/auth/sign-in");
          }}
          className="cursor-pointer"
        >
          Logout
        </div>
      ),
    },
  ];
  return (
    <>
      <div
        className="flex justify-around pt-2"
        style={{ background: "#F4F1EA" }}
      >
        <div className="flex space-x-10">
          <div className="m-1">
            <Image src={goodReads} alt="ghoodreads" height={33} />
          </div>
          <div className="text-stone-600">
            <div className="flex text-lg cursor-pointer mt-1 space-x-5">
              <p>
                {router.pathname.includes("/recommendedBooks" || "/genres")
                  ? "Getting Started"
                  : "Home"}
              </p>
              <p
                className="cursor-pointer"
                onClick={() => Router.push("/library")}
              >
                Library
              </p>
              <p>AddedBooks</p>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="flex space-x-3">
            <Button onClick={() => setAddBookModal(true)}>Add Book</Button>
            <Dropdown
              className="cursor-pointer"
              menu={{ items }}
              placement="bottom"
              arrow
            >
              <Avatar
                className="h-10 w-10"
                src={"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"}
                alt={""}
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <AddNewBookModal
        isModalOpen={addBookModal}
        setIsModalOpen={setAddBookModal}
      />
    </>
  );
};

export default Header;
