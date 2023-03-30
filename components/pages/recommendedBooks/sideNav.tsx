import {
  useGetCategoriesQuery,
  useGetCurrentUserQuery,
} from "@/gql/generated/graphql";
import Router from "next/router";
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
    <div>
      <div className="m-8">
        <div className="h-100vw bg-slate-400 w-52 font-sans min-h-[50rem] rounded-md pl-8 cursor-pointer">
          <div className="pt-8 font-bold font-sans text-white text-base">
            Fav Genres
          </div>
          {dataMe?.me.category.map((x) => (
            <div
              onClick={() => {
                props.setCategoryId(x._id);
              }}
              key={x._id}
              className=" pt-3 mr-5 text-stone-600 font-bold cursor-pointer"
            >
              {x.name}
            </div>
          ))}

          <div className=" font-bold pt-4 text-white">More Genres</div>
          {data?.getCategories.map((x) => (
            <div
              onClick={() => {
                props.setCategoryId(x._id);
              }}
              key={x._id}
              className="pt-3 mr-5 text-black  text-stone-600 font-bold cursor-pointer"
            >
              {x.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
