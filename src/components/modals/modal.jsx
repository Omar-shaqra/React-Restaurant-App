import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

import IconButton from "../ui/icon-button";

const Modal = ({ open, onClose, children }) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-20 ">
        <div className="fixed inset-0 transition bg-black bg-opacity-70" />
        <div className="fixed inset-0 overflow-y-auto text-white">
          <div className="flex justify-center min-h-full text-center sm:items-center xs:items-start xs:mt-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="max-w-4xl text-left align-middle ">
                <div className="relative flex items-center px-4 pt-4 pb-2 m-2 border border-orange-300 rounded-md shadow-2xl text-wrap bg-zinc-950 border-opacity-40">
                  <div className="absolute z-10 right-3 top-2">
                    <IconButton
                      className="text-white border-2 rounded-full"
                      onClick={onClose}
                      icon={<X size={15} />}
                    />
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
