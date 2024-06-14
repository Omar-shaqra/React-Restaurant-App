import { Multiselect } from "multiselect-react-dropdown";

import useCart from "../../hooks/use-cart";
import Button from "../ui/button";
import Currency from "../ui/currency";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const OfferPreviewInfo = ({ data, onCloseModal }) => {
  const { addOfferItem } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectionCount, setSelectionCount] = useState({});

  // Initialize selection count for each product group
  useEffect(() => {
    const initialSelectionCount = data.GroupsID.reduce((acc, group) => {
      acc[group._id] = 0;
      return acc;
    }, {});
    setSelectionCount(initialSelectionCount);
  }, [data.GroupsID]);

  const handleSelect = (selectedItem, productId) => {
    setSelectedItems((prevSelectedItems) => [
      ...prevSelectedItems,
      { ...selectedItem, productId },
    ]);
    setSelectionCount((prevCount) => ({
      ...prevCount,
      [productId]: prevCount[productId] + 1,
    }));
  };

  const handleRemove = (removedItem, productId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter(
        (item) =>
          !(item._id === removedItem._id && item.productId === productId)
      )
    );
    setSelectionCount((prevCount) => ({
      ...prevCount,
      [productId]: prevCount[productId] - 1,
    }));
  };

  const onAdd = () => {
    addOfferItem(data, selectedItems);
    onCloseModal();
  };

  const allGroupsSelected = data.GroupsID.every(
    (group) =>
      selectionCount[group._id] === data.quantity[data.GroupsID.indexOf(group)]
  );

  const productsList = data.GroupsID.map((product, index) => (
    <div key={product._id} className="flex flex-col items-start pb-1 gap-y-2">
      <span className="flex gap-1 gap-x-2">
        Select Your:
        <p className="px-1 rounded bg-white/20">{product.name}</p>
        <p className="px-1 rounded bg-orange-600/50">{product.scale}</p>
        <p className="px-1 rounded bg-orange-800/50">x{data.quantity[index]}</p>
      </span>

      <div className="relative flex flex-col w-full gap-5">
        <Multiselect
          onSelect={(selectedList, selectedItem) =>
            handleSelect(selectedItem, product._id)
          }
          onRemove={(selectedList, removedItem) =>
            handleRemove(removedItem, product._id)
          }
          options={product.products}
          displayValue={"title"}
          closeOnSelect={false}
          hidePlaceholder
          isObject
          showCheckbox
          keepSearchTerm
          selectionLimit={data.quantity[index]}
          style={{
            chips: {
              backgroundColor: "#d84f03",
              fontSize: "14px",
            },
            searchBox: {
              color: "white",
              backgroundColor: "black",
              border: "dotted #fce2bf .5px",
            },
            option: {
              color: "white",
              backgroundColor: "black",
              margin: "1px 0 0 0",
            },
          }}
          placeholder={`Select ${product.name}`}
          className="w-full text-base text-black capitalize bg-black border border-red-300 rounded-lg h-fit"
        />
        <ChevronDown className="absolute -translate-y-1/2 right-2 top-1/2" />
      </div>
    </div>
  ));

  return (
    <section className="flex flex-col w-full gap-x-2">
      {/* Name & Price */}
      <div className="flex items-center justify-between w-full mt-5">
        <p className="text-2xl">{data.name}</p>
        <span className="p-1 rounded shadow-sm w-fit bg-white/30 shadow-orange-400">
          <Currency value={data.price} />
        </span>
      </div>
      <hr className="my-2" />
      {/* Products */}
      <div className="flex items-end sm:gap-6 xs:gap-3 sm:mb-4 sm:justify-between">
        <div className="flex flex-col justify-center gap-2 xs:space-y-2">
          {productsList}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1">
        {/* Add Button */}
        <Button
          text={"Add To Cart"}
          type={"button"}
          onClick={onAdd}
          disabled={!allGroupsSelected}
        />
      </div>
    </section>
  );
};

export default OfferPreviewInfo;
