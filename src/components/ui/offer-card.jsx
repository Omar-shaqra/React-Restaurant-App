import { useOfferPreviewModal } from "../../hooks/use-preview-modal";

const OfferCard = ({ data }) => {
  const previewModal = useOfferPreviewModal();

  const onPreview = (e) => {
    e.preventDefault();
    previewModal.onOpen(data);
  };

  return (
    <div
      className="container relative cursor-pointer w-fit"
      onClick={onPreview}>
      <h1 className="absolute left-0 p-1 font-serif font-semibold text-white rounded md:text-2xl sm:text-lg xs:text-sm bg-black/90 ">
        {data.name}
      </h1>
      <h1 className="absolute bottom-0 right-0 flex items-center gap-1 p-1 font-semibold text-white rounded md:text-2xl sm:text-lg xs:text-sm bg-black/90 ">
        <span className="text-xs text-gray-400">OMR</span>
        {data.price}
      </h1>
      <img
        // src={data?.image.replace("undefined", "http://localhost:8000/")}
        src={data?.image}
        alt="Offer Image"
        className="w-64 rounded-2xl"
      />
    </div>
  );
};

export default OfferCard;
