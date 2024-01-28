const URL = import.meta.env.PUBLIC_API_URL;

export const getCategory = async () => {
  const res = await fetch(`${URL}/category`);

  return res.json();
};

export default getCategory;
