import Loader from "@/components/appLoader";
import { Button } from "antd";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import readUsers from "../../../assets/images/goodreads.png";
import { SSRConfig, useTranslation } from "next-i18next";
import Link from "next/link";
import { setLocaleCookie } from "@/utils/methods";
import LanguageSwitcher from "@/components/language_switcher";
const SignUp = (props: SSRConfig) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const changeTo = () => {
    let newLocale = router.locale === "en" ? "hi" : "en";
    setLocaleCookie(newLocale);
    router.push(router.asPath, undefined, { locale: newLocale });
  };

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
        <h1 className="text-4xl font-semibold	text-center mt-7">
          {t("signup")}
        </h1>
        <div>
          <div className="text-center mx-auto font-normal text-base text-slate-400 mt-1">
            <div className="text-black btn_good_reads mt-2">
              <span className="mr-5">Change Language</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
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
interface LocaleProps {
  locale?: SSRConfig;
}

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default SignUp;
