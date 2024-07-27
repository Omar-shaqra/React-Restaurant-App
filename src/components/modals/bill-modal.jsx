import Currency from "../../components/ui/currency";
import { getCurrentDate } from "../../utils/constants";
import Button from "../ui/button";
import Modal from "./modal";

const BillModal = ({ data, isOpen, onClose }) => {
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
              <p className="p-px bg-gray-200 rounded">
                {getCurrentDate(data.Date)}
              </p>
            </div>

            {/* Total Price */}
            <div className="flex items-center gap-2 p-1 bg-white rounded w-fit">
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
          <div className="flex justify-between w-[600px] px-2 py-2 bg-gray-200 ">
            <p className="text-left">Item</p>
            <p className="pl-12 text-center">Quantity</p>
            <p>Size</p>
          </div>

          {/* Table Body */}
          <div className="divide-y-2 ">
            {data.productData?.map((item) => (
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
            {data.offers?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between w-full px-1 py-2">
                <div className="w-fit">
                  <p className="items-center px-1 text-center bg-gray-200 rounded-full w-fit">
                    {item.title}
                  </p>
                  <div className="pl-3">
                    {item.items.map((i) => (
                      <p className="w-[230px]" key={i}>
                        -{i}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="w-40">x{item.quantity}</p>
                <p>-----</p>
              </div>
            ))}
          </div>
        </div>

        {data.notes && (
          <div className="flex self-start gap-2 mt-3 bg-white rounded w-fit">
            <p>Notes:</p>
            <p className="p-px bg-gray-200 border rounded border-black/30">
              {data.notes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
export default BillModal;
