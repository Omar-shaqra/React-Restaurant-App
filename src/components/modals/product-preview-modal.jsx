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
      <div className="container flex gap-4 md:flex-row xs:flex-col">
        <img
          src={product.imageCover.replace(
            "undefined",
            "http://localhost:8000/"
          )}
          className="self-center rounded aspect-square xl:h-64 lg:h-60 xs:h-52"
        />
        <div className="container mt-5 sm:col-span-8 lg:col-span-7 xs:col-span-10">
          <ProductPreviewInfo data={product} />
        </div>
      </div>
    </Modal>
  );
};
export default ProductPreviewModal;
