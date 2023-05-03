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
    <div className="h-[100vh-52px] py-5 pl-5 fixed top-[52px] bottom-0 overflow-y-scroll bg-green-200 w-[250px] ">
      <div className="font-bold font-sans text-black text-base">Fav Genres</div>
      {dataMe?.me.category.map((x) => (
        <div
          onClick={() => {
            props.setCategoryId(x._id);
          }}
          key={x._id}
          className="pt-3 font-semibold cursor-pointer"
        >
          {x.name}
        </div>
      ))}
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

      <div className=" font-bold mt-4 text-white">More Genres</div>
      {data?.getCategories.map((x) => (
        <div
          onClick={() => {
            props.setCategoryId(x._id);
          }}
          key={x._id}
          className="pt-3 mr-5 text-stone-600 font-bold cursor-pointer"
        >
          {x.name}
        </div>
      ))}
    </div>
  );
};

export default SideNav;
