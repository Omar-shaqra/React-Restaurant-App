import { useEffect, useState } from "react";
import ProductPreviewModal from "../components/modals/product-preview-modal";

const ProductModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProductPreviewModal />
    </>
  );
};

export default ProductModalProvider;
