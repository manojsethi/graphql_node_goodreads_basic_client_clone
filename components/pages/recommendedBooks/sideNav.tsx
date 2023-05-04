import {
  useGetCategoriesQuery,
  useGetCurrentUserQuery,
} from "@/gql/generated/graphql";
interface Iprops {
  setCategoryId: any;
}
const SideNav = (props: Iprops) => {
  const { loading, error, data } = useGetCategoriesQuery();

  const {
    loading: loadingMe,
    error: errorMe,
    data: dataMe,
  } = useGetCurrentUserQuery();

  return (
    <div className="px-5">
      <div className="font-bold font-sans text-black text-base">Fav Genres</div>
      {dataMe?.me.category.map((x) => (
        <div
          onClick={() => {
            props.setCategoryId(x._id);
          }}
          key={x._id}
          className="pt-3 cursor-pointer"
        >
          {x.name}
        </div>
      ))}

      <div className="mt-5 font-bold font-sans text-black text-base">
        More Genres
      </div>
      {data?.getCategories.map((x) => (
        <div
          onClick={() => {
            props.setCategoryId(x._id);
          }}
          key={x._id}
          className="pt-3 cursor-pointer"
        >
          {x.name}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
