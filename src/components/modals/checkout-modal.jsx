import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Modal from "./modal";

const governorates = [
  "Ad Dakhiliyah",
  "Ad Dhahirah",
  "Al Batinah North",
  "Al Batinah South",
  "Al Buraimi",
  "Al Wusta",
  "Ash Sharqiyah North",
  "Ash Sharqiyah South",
  "Dhofar",
  "Musandam",
  "Muscat",
];

const CheckoutModal = ({ isOpen, onClose, handleDeliveryInfo }) => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user ? `${user?.firstName} ${user.lastName}` : "",
    phone: "+968",
    email: user ? `${user?.emailAddresses[0]?.emailAddress}` : "",
    state: "",
    address: "",
    payment: "Cash On Delivery" || "Online Payment",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Check if the value starts with "+968" and has a total length of 12 characters
      if (value.startsWith("+968") && value.length === 12) {
        setFormData({ ...formData, [name]: value });
      } else if (value.startsWith("+968") && value.length > 12) {
        // If the value starts with "+968" and has more than 12 characters, truncate to 12 characters
        setFormData({ ...formData, [name]: value.slice(0, 12) });
      } else if (value.length <= 8) {
        // If the value has less than or equal to 8 characters, update the state
        setFormData({ ...formData, [name]: value });
      }
    } else {
      // For other input fields, directly update the state
      setFormData({ ...formData, [name]: value });
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDeliveryInfo(formData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center w-full gap-5 p-5 text-black">
        <p className="text-2xl font-semibold tracking-wider text-white">
          Delivery Information
        </p>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold ">Name:</label>
          <input
            placeholder="Enter your name"
            required
            className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold ">Email:</label>
          <input
            placeholder="Enter your email"
            required
            className="w-full h-12 pl-3 text-base bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold ">Phone:</label>
          <input
            placeholder="Enter your phone"
            required
            className="w-full h-12 pl-3 text-base bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            type="text"
            name="phone"
            minLength={4}
            maxLength={12}
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold">State:</label>
          <select
            required
            placeholder="Select your state"
            className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            name="state"
            value={formData.state}
            onChange={handleInputChange}>
            <option value="" disabled className="text-gray-300">
              Select your state
            </option>
            {governorates.map((governorate) => (
              <option key={governorate} value={governorate}>
                {governorate}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold">Address:</label>
          <input
            required
            placeholder="Enter your full address"
            className="w-full h-12 pl-3 text-base bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            name="address"
            min={10}
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center w-full gap-6 text-white">
          <label className="font-bold">Payment Method:</label>
          <select
            name="payment"
            className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
            value={formData.payment}
            onChange={handleInputChange}>
            <option value="" disabled className="text-gray-300">
              Select Payment Method
            </option>
            <option value="Cash On Delivery">Cash on Delivery</option>
            <option value="Online Payment">Online Payment</option>
          </select>
        </div>

        <button
          className="flex items-center justify-center w-full gap-2 p-3 mt-6 font-semibold text-white transition duration-500 rounded-full bg-neutral-500 hover:bg-green-600 disabled:cursor-not-allowed"
          type="submit">
          {!formData.payment ? "Choose payment first!" : "Continue"}
        </button>
      </form>
    </Modal>
  );
};

export default CheckoutModal;
