import SubcategoryItem from "./subcategory-item";

const SubcategoryList = ({ subcategories, deleteItem, refetch }) => {
  return (
    <div className="w-full grid lg:grid-cols-8 md:grid-cols-6 gap-12 bg-black p-2 bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
      {subcategories.data?.length > 0 ? (
        subcategories.data.map((item) => (
          <SubcategoryItem
            item={item}
            deleteItem={deleteItem}
            refetch={refetch}
            key={item._id}
          />
        ))
      ) : (
        <div>No Subcategories Found</div>
      )}
    </div>
  );
};

export default SubcategoryList;
