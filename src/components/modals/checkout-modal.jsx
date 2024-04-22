import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Modal from "./modal";
import { useEffect } from "react";

const governates = {
  "محافظة الداخلية": {
    state: [
      "نزوى",
      "بهلا",
      "منح",
      "الحمراء",
      "أدم",
      "إزكي",
      "سمائل",
      "بدبد",
      "الجبل الأخضر",
    ],
  },
  "محافظة الظاهرة": {
    state: ["عبري", "ينقل", "ضنك"],
  },
  "محافظة شمال الباطنة": {
    state: ["صحار", "شناص", "لوى", "صحم", "الخابورة", "السويق	"],
  },
  "محافظة جنوب الباطنة": {
    state: ["نخل", "وادي المعاول", "العوابي", "المصنعة", "بركاء", "الرستاق"],
  },
  "محافظة البريمي": {
    state: ["البريمي", "محضة", "السنينة"],
  },
  "محافظة الوسطى": {
    state: ["هيما", "الدقم", "محوت", "الجازر"],
  },
  "محافظة شمال الشرقية": {
    state: [
      "إبراء",
      "المضيبي",
      "بدية",
      "وادي بني خالد",
      "دماء والطائيين",
      "القابل",
      "سناو",
    ],
  },
  "محافظة جنوب الشرقية": {
    state: [
      "مصيرة",
      "صور",
      "جعلان بني بو حسن",
      "جعلان بني بو علي",
      "الكامل والوافي",
    ],
  },
  "محافظة ظفار": {
    state: [
      "صلالة",
      "طاقة",
      "مرباط",
      "ثمريت",
      "سدح",
      "رخيوت",
      "ضلكوت",
      "مقشن",
      "شليم وجزر الحلانيات",
      "المزيونة",
    ],
  },
  "محافظة مسقط": {
    state: ["مسقط", "مطرح", "بوشر", "السيب", "العامرات", "قريات"],
  },
  "محافظة مسندم": {
    state: ["خصب", "بخا", "دباء", "مدحاء"],
  },
};

const CheckoutModal = ({ isOpen, onClose, handleDeliveryInfo }) => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user ? `${user?.firstName} ${user.lastName}` : "",
    email: user ? `${user?.emailAddresses[0]?.emailAddress}` : "",
    phone: "+968",
    governate: "",
    state: "",
    address: "",
    orderType: "Select Order Type",
    payment: "Select Payment Method",
  });

  useEffect(() => {
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
    // Phone Validation
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
    }
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
    <Modal open={isOpen} onClose={onClose}>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-5 p-5 text-black ">
        <p className="text-2xl font-semibold tracking-wider text-white">
          Delivery Information
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
                className="w-full h-12 pl-3 text-base capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70"
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
              <label className="font-bold text-center">Payment Method:</label>
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
                <option value="Cash On Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
          </div>
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
