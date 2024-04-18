// import slide1 from "/src/assets/slide1.jpg";
// import slide2 from "/src/assets/slide2.jpg";
// import slide3 from "/src/assets/slide3.jpg";
// import slide4 from "/src/assets/slide4.jpg";
// import slide5 from "/src/assets/slide5.jpg";
// export const heroSlides = [slide2, slide4];

function checkUserRole(session) {
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

export { checkUserRole };
