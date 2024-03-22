import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "omr",
  maximumFractionDigits: "1",
});

const Currency = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="font-semibold xl:text-[18px] md:text-[13px] sm:text-sm">
      {formatter.format(Number(value))}
    </div>
  );
};
export default Currency;
