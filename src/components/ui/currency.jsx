import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "omr",
  maximumFractionDigits: "2",
});

const Currency = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <p className="font-semibold text-[9px] sm:text-[10px] md:text-[11px]">
      {formatter.format(Number(value))}
    </p>
  );
};
export default Currency;
