const IconButton = ({ onClick, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} 'rounded-full flex items-center justify-center bg-black/50 border shadow-md p-2 hover:scale-110 transition`}>
      {icon}
    </button>
  );
};
export default IconButton;
