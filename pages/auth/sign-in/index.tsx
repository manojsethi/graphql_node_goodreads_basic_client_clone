import Loader from "@/components/appLoader";
import LanguageSwitcher from "@/components/language_switcher";
import { Button } from "antd";
import { GetStaticProps } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router from "next/router";
import readUsers from "../../../assets/images/goodreads.png";
const SignIn = () => {
  const { t } = useTranslation("common");

  const SignInForm = dynamic(
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
        <div>
          <div className="text-center mx-auto font-normal text-base text-slate-400 mt-1">
            <div className="text-black btn_good_reads mt-2">
              <span className="mr-5">{t("change_language")}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="w-full">
          <SignInForm />
        </div>
        <div>
          <div className="text-center font-normal text-base text-slate-400 mt-1">
            <div> New to GoodReads?</div>
            <Button
              onClick={() => Router.push("/auth/sign-up")}
              className="xs:w-2/3 md:w-1/3 text-black btn_good_reads mt-2"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default SignIn;
