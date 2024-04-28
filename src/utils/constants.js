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

// Find current data
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
export const currentDate = `${day}-${month}-${year}`;

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
  productItems.forEach((item) => {
    const productObj = {
      productid: item.id,
      title: item.title,
      doughType:
        item.category.name.toLowerCase() === "pizza"
          ? item.selectedDough
          : null,
      scale: item.selectedSize,
      quantity: item.quantity,
    };
    productData.push(productObj);
  });
};

// Add offers to productData
export const addOffersToData = (offerItems, productData) => {
  offerItems.forEach((item) => {
    const offerObj = {
      offersid: item._id,
      title: item.title,
      quantity: item.quantity,
    };
    productData.push(offerObj);
  });
};
