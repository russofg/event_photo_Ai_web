import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-2 sm:py-3 text-white text-center shadow-lg z-20"
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium px-2">
        <span>Hecho con amor</span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-red-200 inline-block"
        >
          <Heart className="w-4 h-4 fill-current" />
        </motion.span>
        <span>por</span>
        <span className="font-bold">Mate Code</span>
      </div>
    </motion.footer>
  );
};
