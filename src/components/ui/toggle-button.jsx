const ToggleButton = ({ active, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer select-none themeSwitcherTwo">
      <input
        type="checkbox"
        checked={active}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={` mx-2 flex h-6 w-[50px] items-center rounded-full p-1 duration-200 ${
          !active ? "bg-[#c77e3a]" : "bg-[#CCCCCE]"
        }`}>
        <span
          className={` h-5 w-5 rounded-full bg-white duration-200 ${
            !active ? "translate-x-[23px]" : ""
          }`}></span>
      </span>
      <span className="flex items-center text-sm font-medium text-white label">
        Hide Product
      </span>
    </label>
  );
};

export default ToggleButton;
