// Check for admin role
export function checkUserRole(session) {
  if (
    !session ||
    !session.user ||
    !session.user.organizationMemberships ||
    session.user.organizationMemberships.length === 0
  ) {
    return null; // Return null if the user is not a basic member
  }

  const organizationMemberships = session.user.organizationMemberships;

  // Loop through all organization memberships
  for (const membership of organizationMemberships) {
    if (membership.role) {
      return membership.role.toLowerCase(); // Return the role in lowercase if it exists
    }
  }

  return null; // Return null if no role is found in the memberships
}

// Play Notification Sound
export const playNotificationSound = () => {
  // Create an audio element for the notification sound
  const notificationSound = new Audio("/order-sound.mp4");

  // Play the notification sound
  notificationSound.play();
};

// Get current date & Format (For the API Request)
export function getCurrentDate(dateString) {
  if (!dateString) dateString = Date.now();

  const date = new Date(dateString);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

// Summary products price
export const productsTotalPrice = (productItems) => {
  return productItems.reduce((total, item) => {
    return (
      total +
      Number(
        item.price.find((price) => price.size === item.selectedSize)?.pr *
          item.quantity || item.price[0].pr * item.quantity
      )
    );
  }, 0);
};

// Summary offers price
export const offersTotalPrice = (offerItems) => {
  return offerItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

// Add products to productData
export const addProductsToData = (productItems, productData) => {
  console.log(productItems);
  productItems?.forEach((item) => {
    const productObj = {
      // title: item.title,
      id: item._id,
      doughType:
        item.category?.name.toLowerCase() == "pizza"
          ? item.selectedDough
          : null,
      scale: item.selectedSize,
      quantity: item.quantity,
    };
    productData.push(productObj);
  });
};

// Add offers to productData
export const addOffersToData = (offerItems, offerData) => {
  offerItems?.forEach((item) => {
    const offerObj = {
      id: item._id,
      title: item.name,
      items: item.items.map((item) => item.title),
      quantity: item.quantity,
    };
    offerData.push(offerObj);
  });
};

// All of the governates
export const governates = {
  // "محافظة الداخلية": {
  //   state: [
  //     "نزوى",
  //     "بهلا",
  //     "منح",
  //     "الحمراء",
  //     "أدم",
  //     "إزكي",
  //     "سمائل",
  //     "بدبد",
  //     "الجبل الأخضر",
  //   ],
  // },
  // "محافظة الظاهرة": {
  //   state: ["عبري", "ينقل", "ضنك"],
  // },
  // "محافظة شمال الباطنة": {
  //   state: ["صحار", "شناص", "لوى", "صحم", "الخابورة", "السويق	"],
  // },
  // "محافظة جنوب الباطنة": {
  //   state: ["نخل", "وادي المعاول", "العوابي", "المصنعة", "بركاء", "الرستاق"],
  // },
  // "محافظة البريمي": {
  //   state: ["البريمي", "محضة", "السنينة"],
  // },
  // "محافظة الوسطى": {
  //   state: ["هيما", "الدقم", "محوت", "الجازر"],
  // },
  // "محافظة شمال الشرقية": {
  //   state: [
  //     "إبراء",
  //     "المضيبي",
  //     "بدية",
  //     "وادي بني خالد",
  //     "دماء والطائيين",
  //     "القابل",
  //     "سناو",
  //   ],
  // },
  // "محافظة جنوب الشرقية": {
  //   state: [
  //     "مصيرة",
  //     "صور",
  //     "جعلان بني بو حسن",
  //     "جعلان بني بو علي",
  //     "الكامل والوافي",
  //   ],
  // },
  // "محافظة ظفار": {
  //   state: [
  //     "صلالة",
  //     "طاقة",
  //     "مرباط",
  //     "ثمريت",
  //     "سدح",
  //     "رخيوت",
  //     "ضلكوت",
  //     "مقشن",
  //     "شليم وجزر الحلانيات",
  //     "المزيونة",
  //   ],
  // },
  "محافظة مسقط": {
    state: ["مسقط", "مطرح", "بوشر", "السيب", "العامرات", "قريات"],
  },
  // "محافظة مسندم": {
  //   state: ["خصب", "بخا", "دباء", "مدحاء"],
  // },
};

// Headers of the Orders Table (Admin)
export const OrdersTablecolumns = [
  {
    label: "Order",
    accessor: "[productData]",
    sortable: false,
  },
  {
    label: "Order ID",
    accessor: "_id",
    sortable: false,
  },
  {
    label: "Branch",
    accessor: "BranchID",
    sortable: true,
  },
  {
    label: "Phone",
    accessor: "userphone",
    sortable: false,
  },
  {
    label: "Date",
    accessor: "Date",
    sortable: true,
  },
  {
    label: "Governate",
    accessor: "governate",
    sortable: true,
  },
  {
    label: "State",
    accessor: "state",
    sortable: true,
  },
  {
    label: "Address",
    accessor: "address",
    sortable: false,
  },
  {
    label: "Payment",
    accessor: "TypeOfPayment",
    sortable: true,
  },
  {
    label: "Price",
    accessor: "TotalPrice",
    sortable: false,
  },
  {
    label: "Paid",
    accessor: "statue",
    sortable: true,
  },
];
