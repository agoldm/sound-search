import { motion } from "framer-motion";

export default function FlyImage({ flyImage, onComplete }) {
  return (
    <motion.img
      src={flyImage.src}
      initial={{
        position: "fixed",
        top: flyImage.top,
        left: flyImage.left,
        width: flyImage.width,
        height: flyImage.height,
        zIndex: 1000,
        borderRadius: "8px",
      }}
      animate={{
        top: 200,
        left: "50%",
        x: "-50%",
        width: 300,
        height: 300,
        opacity: 0,
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
      style={{ pointerEvents: "none" }}
    />
  );
}