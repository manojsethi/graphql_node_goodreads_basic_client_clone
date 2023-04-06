import { useRouter } from "next/router";

const GenreDetails = () => {
  const router = useRouter();
  return <>{router.query.genre_id}</>;
};
export default GenreDetails;
