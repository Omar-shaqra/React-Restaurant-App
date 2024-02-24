import { useEffect, useState } from "react";

import { deleteItem } from "../../actions/delete-item";
import { GetCategories } from "../../actions/get-categories";
import { GetSubCategories } from "../../actions/get-subcategories";
import SubcategoryForm from "./components/subcategory-form";
import SubcategoryList from "./components/subcategory-list";

const AddSubcategory = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { refetch } = GetSubCategories({
    setSubcategories: setSubcategories,
  });

  GetCategories({
    setCategories: setCategories,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <section className="mx-5 my-5 text-2xl font-semibold flex flex-col gap-4 text-white">
      <h1 className="self-center font-extrabold tracking-wider">
        All Subcategories
      </h1>
      <SubcategoryList
        subcategories={subcategories}
        deleteItem={deleteItem}
        refetch={refetch}
      />
      <SubcategoryForm
        subcategories={subcategories}
        categories={categories.data}
        refetch={refetch}
      />
    </section>
  );
};

export default AddSubcategory;
