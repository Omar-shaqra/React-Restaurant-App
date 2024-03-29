import { useOfferPreviewModal } from "../../hooks/use-preview-modal";
import Modal from "./modal";
import OfferPreviewInfo from "./offer-preview-info";

const OfferPreviewModal = () => {
  const previewModal = useOfferPreviewModal();
  const offer = previewModal.offerData;

  if (!offer) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="container flex gap-4 md:flex-row xs:flex-col">
        <img
          // src={offer.image.replace("undefined", "http://localhost:8000/")}
          src={offer.image}
          className="self-center rounded aspect-square xl:h-64 lg:h-60 xs:h-52"
        />
        <div className="container mt-5 sm:col-span-8 lg:col-span-7 xs:col-span-10">
          <OfferPreviewInfo data={offer} />
        </div>
      </div>
    </Modal>
  );
};
export default OfferPreviewModal;
