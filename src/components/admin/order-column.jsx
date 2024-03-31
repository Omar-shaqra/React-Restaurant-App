import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { GetOrders } from "../../actions/get-orders";

const columns = [
  {
    accessoryKey: "productData",
    header: "Products",
    // cell: (props) => <p>{props.getValue()?.id}</p>,
  },
  {
    accessoryKey: "phone",
    header: "Phone",
    // cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessoryKey: "TypeOfPayment",
    header: "Payment Method",
    // cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessoryKey: "address",
    header: "Address",
    // cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessoryKey: "state",
    header: "State",
    // cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessoryKey: "TotalPrice",
    header: "Total Price",
    // cell: (props) => <p>{props.getValue()}</p>,
  },
];

export const OrderColumn = () => {
  const [orders, setOrders] = useState([]);
  GetOrders({ setOrders: setOrders });
  console.log("orders: ", orders);

  const table = useReactTable({
    orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section>
      <div className="flex text-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <p key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <p key={header.id}>{header.column.columnDef.header}</p>
            ))}
          </p>
        ))}
        {/* {table.getRowModel().rows.map((row) => (
          <p key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <p key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </p>
            ))}
          </p>
        ))} */}
      </div>
    </section>
  );
};
