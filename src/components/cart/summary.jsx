import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { FilePen, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import useCart from "../../hooks/use-cart";
import {
  addOffersToData,
  addProductsToData,
  getCurrentDate,
  offersTotalPrice,
  productsTotalPrice,
} from "../../utils/constants";
import CheckoutModal from "../modals/checkout-modal";
import Button from "../ui/button";
import Currency from "../ui/currency";

function Summary() {
  const { user } = useUser();
  // const [searchParams] = useSearchParams();
  const productData = [];

  console.log("productData:  ", productData);

  const productItems = useCart((state) => state.productItems);
  const offerItems = useCart((state) => state.offerItems);
  const removeAll = useCart((state) => state.removeAll);

  const productsPrice = productsTotalPrice(productItems);
  const offersPrice = offersTotalPrice(offerItems);
  const totalPrice = (productsPrice + offersPrice).toFixed(2);

  addProductsToData(productItems, productData);
  addOffersToData(offerItems, productData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [payment, setPayment] = useState();
  const [address, setAddress] = useState();
  const [userPhone, setUserPhone] = useState();
  const [state, setState] = useState();
  const [governate, setGovernate] = useState();
  const [orderType, setOrderType] = useState();
  const [branch, setBranch] = useState();
  const [notes, setNotes] = useState();

  //! This useEffect was used to send order to sells api if the order was paid online
  // useEffect(() => {
  //   let paymentCompleted = false;

  //   const handlePaymentSuccess = async () => {
  //     if (!user) return; // User not logged in

  //     if (searchParams.get("success") && !paymentCompleted) {
  //       try {
  //         await axios.post(`${import.meta.env.VITE_REACT_API_URL}/sells`, {
  //           userID: user?.id,
  //           productData,
  //           TypeOfPayment: payment,
  //           userphone: userPhone,
  //           governate,
  //           state,
  //           address,
  //           orderType,
  //           TotalPrice: totalPrice,
  //           BranchID: branch,
  //           statue: "Paid",
  //           Date: getCurrentDate(Date.now()),
  //         });
  //         toast.success("Payment Completed.");
  //         removeAll();
  //         paymentCompleted = true;
  //       } catch (error) {
  //         console.error("Error completing payment:", error);
  //         toast.error("Error completing payment.");
  //       }
  //     }

  //     if (searchParams.get("canceled")) {
  //       toast.error("Payment Was Canceld.");
  //     }
  //   };
  //   handlePaymentSuccess();
  // });

  const onCheckout = async () => {
    if (!payment) setIsModalOpen(true);

    // Cash Payment
    const cashOrder = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/sells`, {
          userID: user?.id,
          productData,
          TypeOfPayment: payment,
          userphone: userPhone,
          governate,
          state,
          address,
          orderType,
          notes,
          TotalPrice: totalPrice,
          BranchID: branch,
          statue: "Not Paid",
          Date: getCurrentDate(Date.now()),
        });
        toast.success("Order sent successfully.");
        removeAll();
      } catch (error) {
        toast.error("Error sending order.");
      }
    };

    // Onlined Payment
    const onlineOrder = async () => {
      // Redirect to Checkout Page
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_REACT_API_URL}/paymob/${totalPrice}`,
          {
            TotalPrice: totalPrice,
          }
        );

        //Todo: still under review => (Send Order to Sells API after online payment)
        try {
          await axios.post(`${import.meta.env.VITE_REACT_API_URL}/sells`, {
            userID: user?.id,
            productData,
            TypeOfPayment: payment,
            userphone: userPhone,
            governate,
            state,
            address,
            orderType,
            notes,
            TotalPrice: totalPrice,
            BranchID: branch,
            statue: "Paid",
            Date: getCurrentDate(Date.now()),
          });
          toast.success("Order Sent Successfully.");
        } catch {
          toast.error("Error Sending Order.");
        }

        // Redirect to Home page
        const redirectURL = res.data;
        if (redirectURL) {
          window.location.href = redirectURL;
        } else {
          toast.error("Error redirecting to payment.");
        }
      } catch (error) {
        toast.error("Error Sending Order.");
      }
    };

    if (payment === "Cash or Visa On Delivery") {
      setIsModalOpen(false);
      await cashOrder();
    }

    if (payment === "Online Payment") {
      setIsModalOpen(false);
      await onlineOrder();
    }
  };

  const handleDeliveryInfo = (value) => {
    setPayment(value.payment);
    setState(value.state);
    setAddress(value.address);
    setUserPhone(value.phone);
    setGovernate(value.governate);
    setOrderType(value.orderType);
    setBranch(value.branch);
    setNotes(value.notes);
  };

  const accumulatedOffers = offerItems.reduce((acc, item) => {
    const existingItem = acc.find(
      (i) => i._id === item._id || i.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }

    return acc;
  }, []);

  return (
    <div className="min-w-full mt-5 rounded-xl bg-black/90 px-4 py-4 text-white self-center border-y border-opacity-50 border-y-[#d4662297] shadow-sm shadow-[#d4662290]">
      <h2 className="mb-1 text-2xl font-medium">Order Summary</h2>
      {/* Products Summary */}
      {productItems?.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}-${item.selectedDough}`}
          className="flex items-center gap-1 mb-1">
          <p className="p-1 font-bold tracking-widest">{item.title}</p>
          <p className="p-1 text-sm rounded-full bg-orange-800/90">
            {item.selectedSize}
          </p>
          {item.selectedDough && (
            <p className="p-1 text-sm rounded-full bg-orange-800/70">
              {item.selectedDough}
            </p>
          )}
          <p className="p-1 text-sm rounded-full bg-white/10">
            x{item.quantity}
          </p>
        </div>
      ))}

      {/* Offers Summary */}
      {accumulatedOffers.map((item) => (
        <div key={item._id} className="flex items-center gap-1 mb-1">
          <p className="p-1 font-bold tracking-widest">{item.name}</p>
          <p className="p-1 text-sm rounded-full bg-white/10">
            x{item.quantity}
          </p>
        </div>
      ))}

      {/* Order Total */}
      <div className="mt-3 space-y-4 ">
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium">Order Total</div>
          <Currency value={totalPrice} />
        </div>

        <div className="flex justify-between w-full gap-x-2">
          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            type="submit"
            disabled={
              productItems.length === 0 && accumulatedOffers.length === 0
            }
            className="flex items-center justify-center w-full gap-2 p-2 font-semibold text-white transition duration-500 rounded-md bg-neutral-500 hover:bg-green-600 disabled:cursor-not-allowed group">
            <CheckoutModal
              handleDeliveryInfo={handleDeliveryInfo}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <p className="tracking-wider uppercase transition group-hover:-translate-x-3">
              {!payment ? "Fill Details First" : "Order Now"}
            </p>
            {payment ? (
              <Wallet
                size={20}
                className="transition group-hover:translate-x-3"
              />
            ) : (
              <FilePen className="transition group-hover:translate-x-3" />
            )}
          </button>

          {/* Details Modal Button */}
          {payment && (
            <Button
              text={"Change Details"}
              type={"button"}
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
