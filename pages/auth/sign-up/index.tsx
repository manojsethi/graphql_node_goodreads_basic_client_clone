import Loader from "@/components/appLoader";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import readUsers from "../../../assets/images/goodreads.png";
const SignUp = () => {
  const DynamicSignUpForm = dynamic(
    () => import("../../../components/pages/auth/signUpForm"),
    {
      loading: () => <Loader />,
    }
  );
  return (
    <div>
      <div className="flex item-center justify-center mt-7">
        <Image src={readUsers} alt={"readusers"} />
      </div>
      <h1 className="text-4xl font-semibold	text-center mt-7">Create Account</h1>
      <div className=" mt-7">
        <DynamicSignUpForm />
      </div>

      <div className="text-center mt-14">
        Already have an account?
        <u
          className="cursor-pointer"
          onClick={() => Router.push("/auth/sign-in")}
        >
          Sign in
        </u>
      </div>
    </div>
  );
};

export default SignUp;
