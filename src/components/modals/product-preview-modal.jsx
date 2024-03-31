import { useProductPreviewModal } from "../../hooks/use-preview-modal";
import Modal from "./modal";
import ProductPreviewInfo from "./product-preview-info";

const ProductPreviewModal = () => {
  const previewModal = useProductPreviewModal();

  const product = previewModal.productData;

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="container flex flex-col gap-4 md:flex-row xs:flex-col">
        <img
          src={product.imageCover.replace(
            "undefined",
            "https://restaurant-menue-ordering-v1.onrender.com"
          )}
          className="self-center rounded aspect-square max-h-44 "
        />
        <div className="mt-5">
          <ProductPreviewInfo data={product} />
        </div>
      </div>
    </Modal>
  );
};
export default ProductPreviewModal;
