import { setLocaleCookie } from "@/utils/methods";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import "../../node_modules/flag-icons/css/flag-icons.min.css";
import Cookies from "js-cookie";
import { Select } from "antd";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { i18n } from "next-i18next";
import { lang } from "moment";

interface Language {
  key: string;
  name: string;
  countryCode: string;
}
const LanguageSwitcher = () => {
  const router = useRouter();
  const languages: Language[] = useMemo(
    () => [
      {
        key: "en",
        name: "English",
        countryCode: "us",
      },
      {
        key: "hi",
        name: "Hindi",
        countryCode: "in",
      },
    ],
    []
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language>();
  useEffect(() => {
    let lang = Cookies.get("NEXT_LOCALE") || "en";
    setSelectedLanguage(languages.find((x) => x.key == lang));
  }, [languages]);
  const handleLanguageChange = async (language: string) => {
    if (!["en", "hi"].includes(language)) language = "en";
    setLocaleCookie(language);
    router.push(router.asPath, undefined, { locale: language });
  };
  const Option = Select.Option;
  return (
    <>
      {selectedLanguage && (
        <Select
          defaultValue={selectedLanguage?.key}
          onChange={handleLanguageChange}
        >
          {languages.map((language, index) => {
            return (
              <Option key={index} value={language.key}>
                {getUnicodeFlagIcon(language.countryCode)}
                <span className="ml-2">{language.name}</span>
              </Option>
            );
          })}
        </Select>
      )}
    </>
  );
};
export default LanguageSwitcher;
