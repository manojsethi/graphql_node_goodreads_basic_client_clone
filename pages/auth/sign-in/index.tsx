import Loader from "@/components/appLoader";
import dynamic from "next/dynamic";
import Image from "next/image";
import readUsers from "../../../assets/images/goodreads.png";
const SignIn = () => {
  const DynamicSigInForm = dynamic(
    () => import("../../../components/pages/auth/signin"),
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
        <h1 className="text-4xl font-semibold	text-center mt-7">Sign In</h1>
        <div className="w-full">
          <DynamicSigInForm />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
