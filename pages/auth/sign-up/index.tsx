import Loader from "@/components/appLoader";
import { Button } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import readUsers from "../../../assets/images/goodreads.png";
const SignUp = () => {
  const SignUpForm = dynamic(
    () => import("../../../components/pages/auth/signup"),
    {
      loading: () => <Loader />,
    }
  );
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full">
        <div>
          <Image className="mx-auto" src={readUsers} alt={"readusers"} />
        </div>
        <h1 className="text-4xl font-semibold	text-center mt-7">Sign Up</h1>
        <div className="w-full">
          <SignUpForm />
        </div>
        <div>
          <div className="text-center font-normal text-base text-slate-400 mt-1">
            <div>Already have an account?</div>
            <Button
              onClick={() => Router.push("/auth/sign-in")}
              className="xs:w-2/3 md:w-1/3 text-black btn_good_reads mt-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
