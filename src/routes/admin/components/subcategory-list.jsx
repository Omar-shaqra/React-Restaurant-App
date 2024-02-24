import SubcategoryItem from "./subcategory-item";

const SubcategoryList = ({ subcategories, deleteItem, refetch }) => {
  return (
    <div className="flex gap-2 bg-black p-2 bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
      {subcategories.data && subcategories.data.length > 0 ? (
        subcategories.data.map((item) => (
          <SubcategoryItem
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

export default SubcategoryList;
