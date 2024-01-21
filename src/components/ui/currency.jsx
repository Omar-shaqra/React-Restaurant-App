import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Currency = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <div>{formatter.format(Number(value))}</div>;
};
export default Currency;
