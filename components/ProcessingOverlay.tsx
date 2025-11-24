import React from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

export const ProcessingOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 sm:p-8"
    >
      <div className="relative mb-6 sm:mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-24 h-24 sm:w-32 sm:h-32 border-t-4 border-l-4 border-pink-500 rounded-full"
        />
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-purple-400" />
        </motion.div>
      </div>

      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-4"
      >
        ✨ Procesando...
      </motion.h2>
      <p className="text-base sm:text-xl text-purple-300 mb-2 px-4">
        La IA está creando tu imagen mágica
      </p>
      <p className="text-xs sm:text-sm text-gray-400 px-4">
        Esto puede tomar 15-30 segundos...
      </p>
    </motion.div>
  );
};
