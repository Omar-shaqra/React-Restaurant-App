import CategoryItem from "./category-item";

const CategoryList = ({ categories, deleteItem, refetch }) => {
  return (
    <div className="w-full max-h-80 overflow-y-scroll hide-scrollbar grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 gap-4 bg-black p-2 bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
      {categories.data?.length > 0 ? (
        categories.data.map((item) => (
          <CategoryItem
            item={item}
            deleteItem={deleteItem}
            refetch={refetch}
            key={item._id}
          />
        ))
      ) : (
        <p className="text-nowrap">No Categories Found</p>
      )}
    </div>
  );
};

export default CategoryList;
