import Modal from "./modal";
import Currency from "../../components/ui/currency";
import Button from "../ui/button";

const BillModal = ({ data, isOpen, onClose }) => {
  console.log(data);
  return (
    <Modal open={isOpen} onClose={onClose} bgColor={"bg-white"}>
      <div className="flex flex-col items-end p-3 text-black">
        <div className="flex items-center justify-between w-full py-4 font-serif text-xl tracking-wider">
          <h2>Order Details</h2>
          <Button text={"Print"} onClick={() => window.print()} />
        </div>

        {/* Order Info */}
        <div className="flex flex-col gap-4 p-1 py-2 mb-3 border rounded-sm">
          {/* First row */}
          <div className="flex justify-between gap-5">
            {/* Order Date */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Order Date:</p>
              <p className="p-px bg-gray-200 rounded">{data.Date}</p>
            </div>

            {/* Total Price */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Total Price:</p>
              <span className="p-px bg-gray-200 rounded">
                <Currency value={data.TotalPrice} />
              </span>
            </div>
          </div>
          {/* Second row */}
          <div className="flex justify-between gap-5">
            {/* Order Type */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Order Type:</p>
              <p className="p-px bg-gray-200 rounded">{data.orderType}</p>
            </div>
            {/* Paid Status */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Paid Status:</p>
              <p className="p-px bg-gray-200 rounded">{data.statue}</p>
            </div>
          </div>
          {/* Third row */}
          <div className="flex justify-between gap-5">
            {/* Address */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Address:</p>
              <p className="p-px bg-gray-200 rounded">{data.address}</p>
            </div>

            {/* Total Price */}
            <div className="flex gap-2 p-1 bg-white rounded w-fit">
              <p>Phone Number:</p>
              <span className="p-px bg-gray-200 rounded">{data.userphone}</span>
            </div>
          </div>
          {/* Branch */}
          <p className="self-center p-px bg-gray-200 rounded w-fit">
            {data.BranchID}
          </p>
        </div>

        {/* Order Items */}
        <div className="w-full overflow-hidden border border-gray-300 rounded-lg">
          {/* Table Head */}
          <div className="flex justify-between px-2 py-2 bg-gray-200 ">
            <p className="text-left">Item</p>
            <p className="text-center">Quantity</p>
            <p>Size</p>
          </div>

          {/* Table Body */}
          <div className="divide-y-2 ">
            {data.productData.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between w-full gap-8 px-1 py-2 ">
                <span className="w-32">
                  <p>{item.title}</p>
                  <p className="p-px bg-gray-200 rounded w-fit">
                    {item.doughType ? item.doughType : ""}
                  </p>
                </span>
                <p className="w-20">x{item.quantity}</p>
                <p>{item.scale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default BillModal;
