import { useEffect, useState } from "react";
import OfferPreviewModal from "../components/modals/offer-preview-modal";

const OfferModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <OfferPreviewModal />
    </>
  );
};

export default OfferModalProvider;
