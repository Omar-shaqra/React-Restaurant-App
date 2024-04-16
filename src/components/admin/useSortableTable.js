import { useState } from "react";
import { GetOrders } from "../../actions/get-orders";

export const useSortableTable = (data) => {
  const [orders, setOrders] = useState(data);
  GetOrders({ setOrders: setOrders });

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...orders.data].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setOrders({ ...orders, data: sorted });
    }
  };

  return [orders, setOrders, handleSorting];
};
