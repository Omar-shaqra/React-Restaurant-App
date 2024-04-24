import { motion } from "framer-motion";

const Button = ({ text, type, onClick, disabled }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="relative flex px-6 py-2 rounded-md radial-gradient disabled:cursor-not-allowed"
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5,
        type: "spring",
        stiffness: 20,
        damping: 10,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}>
      <span className="relative block w-full h-full text-lg font-light tracking-wide text-nowrap text-neutral-100 linear-mask">
        {text}
      </span>
      <span className="absolute inset-0 block p-px rounded-md linear-overlay" />
    </motion.button>
  );
};

export default Button;
