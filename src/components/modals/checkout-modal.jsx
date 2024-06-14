import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Modal from "./modal";
import { useEffect } from "react";
import Button from "../ui/button";
import { governates } from "../../utils/constants";

const CheckoutModal = ({ isOpen, onClose, handleDeliveryInfo }) => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user ? `${user?.firstName} ${user.lastName}` : "",
    email: user ? `${user?.emailAddresses[0]?.emailAddress}` : "",
    phone: "+968",
    governate: "",
    state: "",
    address: "",
    notes: "",
    orderType: "Select Order Type",
    branch: "Select Nearest Branch",
    payment: "Select Payment Method",
  });

  useEffect(() => {
    // To add user name and email automatically
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user ? `${user?.firstName} ${user.lastName}` : "",
        email: user ? `${user?.emailAddresses[0]?.emailAddress}` : "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // State Validation
    if (name === "state") {
      const governate = Object.keys(governates).find((gov) =>
        governates[gov].state.includes(value)
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        governate: governate,
      }));
    } else {
      // For other input fields, directly update the state
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDeliveryInfo(formData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} bgColor={"bg-black"}>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-5 p-2 text-black">
        <p className="text-2xl font-semibold tracking-wider text-white">
          Order Information
        </p>

        <div className="flex flex-col gap-5 sm:flex-row">
          {/* First Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-6 text-white">
              <label className="font-bold ">Name:</label>
              <input
                placeholder="Enter your name"
                required
                className="input-field"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center gap-6 text-white">
              <label className="font-bold ">Email:</label>
              <input
                placeholder="Enter your email"
                required
                className="input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center gap-6 text-white">
              <label className="font-bold ">Phone:</label>
              <input
                placeholder="Enter your phone"
                required
                className="input-field"
                type="text"
                name="phone"
                minLength={4}
                maxLength={12}
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center gap-6 text-white">
              <label className="font-bold">State:</label>
              <select
                required
                placeholder="Select your state"
                className="w-full input-field"
                name="state"
                value={formData.state}
                onChange={handleInputChange}>
                <option value="" disabled className="text-gray-300">
                  Select your state
                </option>
                {Object.keys(governates).map((governate) => (
                  <optgroup
                    key={governate}
                    label={governate}
                    className="font-semibold tracking-wider text-black bg-white">
                    {governates[governate].state.map((state) => (
                      <option
                        key={state}
                        value={state}
                        className="text-white bg-black">
                        {state}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-6 text-white">
              <label className="font-bold">Address:</label>
              <input
                required
                placeholder="Enter your full address"
                className="input-field"
                name="address"
                min={10}
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center gap-6 text-white text-nowrap">
              <label htmlFor="branch" className="font-bold text-center">
                Branch:
              </label>
              <select
                id="branch"
                name="branch"
                className="input-field"
                value={formData.branch}
                onChange={handleInputChange}>
                <option
                  value="Select Nearest Branch"
                  disabled
                  className="text-gray-300">
                  Select Nearest Branch
                </option>
                <option value="Al Khuwair - الخوير">Al Khuwair - الخوير</option>
                <option value="AL Amrat - العامرات">AL Amrat - العامرات</option>
                <option value="Al-Watiya - الوطية">Al-Watiya - الوطية</option>
                <option value="Al Khawd - الخوض">Al Khawd - الخوض</option>
                <option value="Al Ma`abilah - المعبيلة">
                  Al Ma`abilah - المعبيلة
                </option>
              </select>
            </div>

            <div className="flex items-center gap-6 text-white text-nowrap">
              <label className="font-bold text-center">Order Type:</label>
              <select
                name="orderType"
                className="input-field"
                value={formData.orderType}
                onChange={handleInputChange}>
                <option
                  value="Select Order Type"
                  disabled
                  className="text-gray-300">
                  Select Order Type
                </option>
                <option value="Delivery">Delivery</option>
                <option value="Take Away">Take Away</option>
                <option value="Dine In">Dine In</option>
              </select>
            </div>

            <div className="flex items-center gap-6 text-white text-nowrap">
              <label className="font-bold text-center">Payment:</label>
              <select
                name="payment"
                className="input-field"
                value={formData.payment}
                onChange={handleInputChange}>
                <option
                  value="Select Payment Method"
                  disabled
                  className="text-gray-300">
                  Select Payment Method
                </option>
                <option value="Cash or Visa On Delivery">
                  Cash or Visa on Delivery
                </option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="flex flex-col items-center self-start justify-between w-full gap-6 sm:flex-row">
          {formData.orderType === "Delivery" && (
            <div className="flex items-center gap-6 font-bold text-white text-nowrap">
              <label className="text-center">Delivery Fees:</label>
              <p className="border-b border-b-orange-400">Free Delivery</p>
            </div>
          )}

          <div className="flex justify-between w-full gap-1">
            <Button
              text={"Continue"}
              type={"submit"}
              disabled={
                formData.phone.length < 8 ||
                formData.address.length < 8 ||
                formData.state.length < 3 ||
                formData.orderType == "Select Order Type" ||
                formData.payment == "Select Payment Method"
              }
            />
            {/* Notes */}
            <textarea
              required
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add Notes"
              className="content-center w-full text-white input-field min-h-12 max-h-16"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CheckoutModal;
