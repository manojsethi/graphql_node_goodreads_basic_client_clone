import { useRouter } from "next/router";

const GenreDetails = () => {
  const router = useRouter();
  console.log(router.query.genre_id, "t");
  return <>{router.query.genre_id}</>;
};
export default GenreDetails;
