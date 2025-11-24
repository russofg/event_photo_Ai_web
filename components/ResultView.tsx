import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, QrCode, RefreshCw } from "lucide-react";

interface ResultViewProps {
  generatedImages: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  onDownload: () => void;
  onGenerateQR: () => void;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  generatedImages,
  selectedImageIndex,
  setSelectedImageIndex,
  onDownload,
  onGenerateQR,
  onReset,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col space-y-4 sm:space-y-6"
    >
      {/* Main Photo */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
          ✨ Tu Foto Mágica ✨
        </h2>

        <div className="relative w-full max-w-3xl aspect-square sm:aspect-[4/3] bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-purple-500/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9, filter: "brightness(2)" }}
              animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 bg-white z-10 pointer-events-none mix-blend-overlay"
              />
              <img
                src={generatedImages[selectedImageIndex]}
                alt="Result"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Variations */}
      <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-purple-500/30">
        <h3 className="text-sm sm:text-lg font-bold mb-3 sm:mb-4 text-purple-300 uppercase tracking-wider">
          Variaciones
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {generatedImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-square sm:aspect-[4/3] rounded-lg sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedImageIndex === idx
                  ? "ring-2 sm:ring-4 ring-pink-500 scale-105 shadow-xl sm:shadow-2xl shadow-pink-500/50"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Variación ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 sm:space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl shadow-lg transition-all"
        >
          <Download className="w-6 h-6" />
          DESCARGAR IMAGEN
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerateQR}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl shadow-lg transition-all"
        >
          <QrCode className="w-6 h-6" />
          CÓDIGO QR
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-lg shadow-lg transition-all border border-white/20"
        >
          <RefreshCw className="w-5 h-5" />
          Nueva Foto
        </motion.button>
      </div>
    </motion.div>
  );
};
