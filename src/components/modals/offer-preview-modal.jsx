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
      <div className="container flex flex-col gap-4 md:flex-row xs:flex-col">
        <img
          src={offer.image.replace("undefined", "http://91.108.102.253:8000/")}
          // src={offer.image}
          className="self-center rounded aspect-square max-w-40"
        />
        <div className="mt-5 w-fit">
          <OfferPreviewInfo data={offer} />
        </div>
      </div>
    </Modal>
  );
};
export default OfferPreviewModal;
