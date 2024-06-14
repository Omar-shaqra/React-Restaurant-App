import { useProductPreviewModal } from "../../hooks/use-preview-modal";
import Modal from "./modal";
import ProductPreviewInfo from "./product-preview-info";

const ProductPreviewModal = () => {
  const previewModal = useProductPreviewModal();

  const product = previewModal.productData;

  const handleCloseModal = () => {
    previewModal.onClose();
  };

  if (!product) {
    return null;
  }

  const imgURL =
    product.imageCover !=
    // Handle No Image Case
    "undefined/products/null"
      ? product.imageCover?.replace(
          "undefined",
          `${import.meta.env.VITE_REACT_IMAGES_URL}/`
        )
      : "/logo.png";

  return (
    <Modal
      open={previewModal.isOpen}
      onClose={previewModal.onClose}
      bgColor={"bg-black"}>
      <div className="flex flex-col max-w-full gap-3 pt-5 md:flex-row xs:flex-col">
        <img
          src={imgURL}
          className="self-center bg-white rounded aspect-square max-h-44"
        />
        <div className="w-full ">
          <ProductPreviewInfo data={product} onCloseModal={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};
export default ProductPreviewModal;
