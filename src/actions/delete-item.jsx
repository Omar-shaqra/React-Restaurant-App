import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const deleteItem = async ({ id, routeName }) => {
  const isConfirm = await Swal.fire({
    title: "Sure to Delete?",
    text: "You won't be able to undo this operation",
    icon: "warning",
    showCancelButton: true,
    background: "#292927",
    color: "#fff",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "yes, Delete",
  }).then((result) => {
    return result.isConfirmed;
  });

  if (!isConfirm) {
    return;
  }
  await axios
    .delete(
      `https://restaurant-menue-ordering-v1.onrender.com/api/v1/${routeName}/${id}`
    )
    .then(() => {
      toast.success("Delete Successfully.");
    })
    .catch(({ response: { data } }) => {
      Swal.fire({
        text: "Error :" + data.message,
        icon: "error",
        background: "#292927",
        color: "#fff",
      });
    });
};
