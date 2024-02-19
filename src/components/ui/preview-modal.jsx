import Modal from "../../components/ui/modal";
import usePreviewModal from "../../hooks/use-preview-modal";
import ProductInfo from "./product-info";

const PreviewModal = () => {
  const previewModal = usePreviewModal();

  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="container flex md:flex-row xs:flex-col gap-4">
        <img
          src={product.imageCover.replace(
            "undefined",
            "http://localhost:8000/"
          )}
          className="aspect-square self-center xl:h-64 lg:h-60  xs:h-56 rounded"
        />
        <div className="mt-5 container sm:col-span-8 lg:col-span-7 xs:col-span-10">
          <ProductInfo data={product} />
        </div>
      </div>
    </Modal>
  );
};
export default PreviewModal;
