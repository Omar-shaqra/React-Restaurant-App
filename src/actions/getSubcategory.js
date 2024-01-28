const URL = import.meta.env.PUBLIC_API_URL

export const getSubcategory = async () => {
  const res = await fetch(URL);

  return res.json();
};

export default getSubcategory;
