import {
  useGetCurrentUserQuery,
  useLogoutLazyQuery,
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
  const userMenuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            Router.push("/my-added-books");
          }}
          className="cursor-pointer"
        >
          My Added Books
        </div>
      ),
    },
    {
      key: "2",
      label: <Button onClick={() => setAddBookModal(true)}>Add Book</Button>,
    },
    {
      key: "3",
      label: (
        <>
          <hr className="mb-2" />
          <div
            onClick={() => {
              userLogout();
              Router.push("/auth/sign-in");
            }}
            className="cursor-pointer"
          >
            Logout
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="py-1 fixed top-0 w-full bg-green-50">
      <div className="flex h-full items-center mx-5 mt-1">
        <div className="flex-1">
          <Image src={goodReads} alt="goodreads" height={33} />
        </div>

        <div className="flex items-center justify-center cursor-pointer space-x-5">
          <span onClick={() => Router.push("/recommended-books")}>
            Recommended Books
          </span>
          <span onClick={() => Router.push("/library")}>Library</span>

          <Dropdown
            className="cursor-pointer"
            menu={{ items: userMenuItems }}
            placement="bottomLeft"
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
      <AddNewBookModal
        isModalOpen={addBookModal}
        setIsModalOpen={setAddBookModal}
      />
    </div>
  );
};

export default Header;
