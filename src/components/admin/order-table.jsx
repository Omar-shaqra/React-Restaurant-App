import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import { useSortableTable } from "./useSortableTable";

const columns = [
  // {
  //   label: "User ID",
  //   accessor: "userID",
  //   sortable: false,
  // },
  {
    label: "Order",
    accessor: "[productData]",
    sortable: false,
    CellData: ({ row }) => {
      const { productData } = row.original;

      // Map product data only once
      const title = productData.map((product) => product.title).join(", ");
      const scale = productData.map((product) => product.scale).join(", ");
      const doughType = productData
        .map((product) => product.doughType)
        .join(", ");
      const quantity = productData
        .map((product) => product.quantity)
        .join(", ");

      return (
        <div className="flex items-start gap-1">
          {/* Conditional rendering for titles */}
          {title && <p className="p-px rounded bg-white/50">{title}</p>}
          {/* Conditional rendering for scales */}
          {scale && <p className="p-px bg-gray-300 rounded">{scale}</p>}
          {/* Conditional rendering for dough types */}
          {doughType && <p className="p-px bg-gray-300 rounded">{doughType}</p>}
          {/* Conditional rendering for quantities */}
          {quantity && (
            <p className="p-px text-white rounded bg-black/70">x {quantity}</p>
          )}
        </div>
      );
    },
  },
  {
    label: "Phone",
    accessor: "userphone",
    sortable: false,
  },
  {
    label: "Date",
    accessor: "Date",
    sortable: true,
  },
  {
    label: "Governate",
    accessor: "governate",
    sortable: true,
  },
  {
    label: "State",
    accessor: "state",
    sortable: true,
  },
  {
    label: "Address",
    accessor: "address",
    sortable: false,
  },
  {
    label: "Payment Method",
    accessor: "TypeOfPayment",
    sortable: true,
  },
  {
    label: "Price",
    accessor: "TotalPrice",
    sortable: false,
  },
  {
    label: "Paid",
    accessor: "statue",
    sortable: true,
  },
];

const OrderTable = () => {
  //TODO: tableData = orders
  //TODO: setTableData = setOrders

  const [orders, setOrders, handleSorting] = useSortableTable();

  const updateOrderData = (newData) => {
    setOrders(newData);
  };

  return (
    <table className="table border-4 table-fixed">
      <caption className="self-center py-5 text-2xl font-extrabold tracking-wider">
        Orders
      </caption>
      {orders && (
        <>
          <TableHead {...{ columns, handleSorting }} />
          <TableBody
            onUpdateData={updateOrderData}
            columns={columns}
            tableData={orders}
          />
        </>
      )}
    </table>
  );
};
export default OrderTable;
