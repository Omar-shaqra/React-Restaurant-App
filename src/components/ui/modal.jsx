import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

import IconButton from "../ui/icon-button";

const Modal = ({ open, onClose, children }) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-20">
        <div className="fixed inset-0 bg-black bg-opacity-70 transition" />
        <div className="fixed inset-0 overflow-y-auto text-white">
          <div className="flex min-h-full sm:items-center xs:items-start xs:mt-8 justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="max-w-4xl text-left align-middle ">
                <div className="relative flex w-fit items-center pt-4 pb-2 m-2 px-4 overflow-hidden text-wrap bg-zinc-950 shadow-2xl rounded-md border border-orange-300 border-opacity-40">
                  <div className="absolute z-10 right-4 top-4">
                    <IconButton
                      className="hover:bg-red-400 text-white border-2 rounded-full"
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
