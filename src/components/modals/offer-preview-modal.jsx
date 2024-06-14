import { useOfferPreviewModal } from "../../hooks/use-preview-modal";
import Modal from "./modal";
import OfferPreviewInfo from "./offer-preview-info";

const OfferPreviewModal = () => {
  const previewModal = useOfferPreviewModal();

  const offer = previewModal.offerData;

  const imgUrl = offer?.image.replace(
    "undefined",
    `${import.meta.env.VITE_REACT_IMAGES_URL}/`
  );

  const handleCloseModal = () => {
    previewModal.onClose();
  };

  if (!offer) {
    return null;
  }

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
      bgColor="bg-black">
      <div className="container flex flex-col gap-4 md:flex-row xs:flex-col">
        <img src={imgUrl} className="self-center rounded max-w-40" />
        <div className="mt-5">
          <OfferPreviewInfo data={offer} onCloseModal={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};
export default OfferPreviewModal;
