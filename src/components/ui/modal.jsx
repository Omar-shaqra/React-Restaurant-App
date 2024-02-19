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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl text-left align-middle">
                <div className="relative flex w-full items-center overflow-hidden text-wrap bg-zinc-950 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-md border border-orange-300 border-opacity-40">
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