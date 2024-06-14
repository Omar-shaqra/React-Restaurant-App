import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import Modal from "./modal";
import { useEffect } from "react";
import Button from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const ContactModal = ({ isOpen, onClose }) => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user ? `${user?.firstName} ${user.lastName}` : "",
    email: user ? `${user?.emailAddresses[0]?.emailAddress}` : "",
    phone: "+968",
    text: "",
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
    // For other input fields, directly update the state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_IMAGES_URL}/mail`,
        formData
      );
      toast.success("Mail Sent Successfully");
      setFormData((prevData) => ({
        ...prevData,
        phone: "",
        text: "",
      }));
    } catch (error) {
      toast.error("Error Sending Mail.");
    }
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} bgColor={"bg-black"}>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center gap-5 p-5 text-black">
        <p className="text-2xl font-semibold tracking-wider text-white">
          Contact Information
        </p>

        <div className="flex flex-wrap items-center gap-5 max-w-96">
          {/* First Column */}
          <div className="flex flex-col w-full gap-3">
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

            <div className="flex items-center gap-4 text-white">
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

            <div className="flex items-center gap-6 text-white ">
              <label className="font-bold ">Email:</label>
              <input
                placeholder="Enter your email"
                required
                className="w-full input-field"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col w-full gap-3">
            <div className="flex w-full gap-8 text-white">
              <label className="font-bold">Text:</label>
              <textarea
                required
                placeholder="Enter Your Message"
                className="w-full overflow-hidden text-base input-field max-h-28 min-h-28"
                name="text"
                min={10}
                value={formData.text}
                onChange={handleInputChange}
              />
            </div>

            <Button
              text={"Submit"}
              type={"submit"}
              disabled={formData.phone.length < 8 || formData.text.length < 10}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ContactModal;
