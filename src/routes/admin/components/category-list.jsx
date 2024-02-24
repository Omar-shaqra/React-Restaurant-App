import CategoryItem from "./category-item";

const CategoryList = ({ categories, deleteItem, refetch }) => {
  return (
    <div className="flex gap-2 bg-black p-2 bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
      {categories.data && categories.data.length > 0 ? (
        categories.data.map((item) => (
          <CategoryItem
            item={item}
            deleteItem={deleteItem}
            refetch={refetch}
            key={item.id}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryList;
