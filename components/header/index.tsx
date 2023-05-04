import {
  useGetCurrentUserQuery,
  useLogoutLazyQuery,
} from "@/gql/generated/graphql";
import { Avatar, Button, MenuProps } from "antd";

import { Dropdown } from "antd";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useRef, useState } from "react";

import goodReads from "../../assets/images/goodreads.png";
import AddNewBookModal from "../pages/library/addNewBookModal";
const Header = () => {
  const { data: data } = useGetCurrentUserQuery();
  const menuRef = useRef<HTMLDivElement>(null);
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
    <>
      <div className="py-1 fixed top-0 w-full bg-green-50 z-10">
        <div className="flex h-full items-center mx-5 mt-1">
          <div className="flex-1">
            <Image
              onClick={() => router.push("/")}
              className="cursor-pointer"
              src={goodReads}
              alt="goodreads"
              height={33}
            />
          </div>

          <div className="flex items-center justify-center cursor-pointer space-x-5">
            <span
              className="hidden md:block"
              onClick={() => Router.push("/recommended-books")}
            >
              Recommended Books
            </span>
            <span
              className="hidden md:block"
              onClick={() => Router.push("/library")}
            >
              Library
            </span>

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
            <span
              onClick={() => {
                menuRef.current?.classList.toggle("right-[-300px]");
                menuRef.current?.classList.toggle("right-0");
                menuRef.current?.classList.toggle("z-10");
              }}
              className="xs:block md:hidden cursor-pointer"
            >
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24.75 24.75"
              >
                <g>
                  <path
                    d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
		c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
		c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
        <AddNewBookModal
          isModalOpen={addBookModal}
          setIsModalOpen={setAddBookModal}
        />
      </div>
      <div
        ref={menuRef}
        className="md:hidden py-5 pl-5 fixed top-[52px] right-[-300px] overflow-y-scroll bg-green-200 w-[250px] duration-500"
      >
        <span
          className="block"
          onClick={() => Router.push("/recommended-books")}
        >
          Recommended Books
        </span>
        <span className="block mt-2" onClick={() => Router.push("/library")}>
          Library
        </span>
      </div>
    </>
  );
};

export default Header;
