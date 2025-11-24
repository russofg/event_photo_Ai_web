import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-3 sm:py-6 text-center bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-30"
    >
      <div className="flex items-center justify-center gap-2">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
        <h1 className="text-xl sm:text-3xl font-black tracking-wide sm:tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 px-2">
          AI Photo Booth
        </h1>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </div>
      <p className="text-xs sm:text-sm text-purple-300 mt-1 sm:mt-2 px-2 font-medium">
        Transforma tus fotos con IA
      </p>
    </motion.div>
  );
};
