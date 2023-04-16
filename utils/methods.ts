export const setLocaleCookie = (locale: string) => {
  document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
};
