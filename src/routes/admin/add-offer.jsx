import { FilePlus2, List } from "lucide-react";
import { useEffect, useState } from "react";

import { GetOffers } from "../../actions/get-offers";
import { GetProductsForAdmin } from "../../actions/get-products";
import OfferForm from "../../components/admin/offer-form";
import OfferList from "../../components/admin/offer-list";
import AddGroupModal from "../../components/modals/add-group-modal";
import ViewGroupsModal from "../../components/modals/view-groups-modal";
import { GetGroups } from "../../actions/get-groups";

const AddOffer = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [viewGroupModal, setViewGroupModal] = useState(false);

  GetProductsForAdmin({ setProducts });
  const { data, isSuccess, refetch: refetchGroups } = GetGroups();

  const { refetch } = GetOffers({
    setOffers,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setGroups(data);
    }
  }, [data, isSuccess]);

  return (
    <section className="flex flex-col items-center px-4 my-5 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">All offers</h1>
      <OfferList offers={offers} refetch={refetch} />

      <div className="flex w-full">
        <div className="flex gap-3 h-fit">
          {/* Create Group Button */}
          <button
            onClick={() => setCreateGroupModal(true)}
            type="button"
            className="flex items-center mt-28 ml-auto gap-2 h-fit p-1 bg-black border border-[#fca5a5] rounded-lg text-base hover:bg-gray-600 transition-colors duration-500">
            <AddGroupModal
              refetch={refetchGroups}
              products={products.data}
              isOpen={createGroupModal}
              onClose={() => setCreateGroupModal(false)}
            />
            Create Group
            <FilePlus2 />
          </button>

          {/* View Groups Button */}
          <button
            onClick={() => setViewGroupModal(true)}
            type="button"
            className="flex items-center mt-28  ml-auto gap-2 h-fit p-1 bg-black border border-[#fca5a5] rounded-lg text-base hover:bg-gray-600 transition-colors duration-500">
            <ViewGroupsModal
              refetch={refetchGroups}
              groups={groups.data}
              isOpen={viewGroupModal}
              onClose={() => setViewGroupModal(false)}
            />
            View Groups
            <List />
          </button>
        </div>

        {/* Add New Offer Form */}
        <OfferForm refetch={refetch} groups={groups.data} />
      </div>
    </section>
  );
};

export default AddOffer;
