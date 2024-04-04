import { useState } from "react";
import { GetOrders } from "../../actions/get-orders";
import TableHead from "./order-table-head";
import TableBody from "./order-table-body";

const OrderTable = () => {
  const [orders, setOrders] = useState();
  GetOrders({ setOrders: setOrders });

  const columns = [
    {
      label: "User ID",
      accessor: "userID",
    },
    {
      label: "Phone",
      accessor: "userphone",
    },
    {
      label: "Date",
      accessor: "Date",
    },
    {
      label: "Governate",
      accessor: "governate",
    },
    {
      label: "State",
      accessor: "state",
    },
    {
      label: "Address",
      accessor: "address",
    },
    {
      label: "Payment Method",
      accessor: "TypeOfPayment",
    },
    {
      label: "Price",
      accessor: "TotalPrice",
    },
    {
      label: "Paid",
      accessor: "statue",
    },
  ];

  return (
    <table className="table border-4 ">
      <caption className="self-center py-5 text-2xl font-extrabold tracking-wider">
        Orders
      </caption>
      {orders && (
        <>
          <TableHead columns={columns} />
          <TableBody columns={columns} tableData={orders} />
        </>
      )}
    </table>
  );
};
export default OrderTable;
