import Loader from "@/components/appLoader";
import dynamic from "next/dynamic";
import Image from "next/image";
import readUsers from "../../../assets/images/goodreads.png";
const SignIn = () => {
  const DynamicSigInForm = dynamic(
    () => import("../../../components/pages/auth/signInForm"),
    {
      loading: () => <Loader />,
    }
  );

  return (
    <div>
      <div className="flex item-center justify-center mt-7">
        <Image src={readUsers} alt={"readusers"} />
      </div>
      <h1 className="text-4xl font-semibold	text-center mt-7">Sign In</h1>
      <div>
        <DynamicSigInForm />
      </div>
    </div>
  );
};

export default SignIn;
