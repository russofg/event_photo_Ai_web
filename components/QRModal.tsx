import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface QRModalProps {
  show: boolean;
  onClose: () => void;
  isUploading: boolean;
  qrCodeUrl: string | null;
  downloadUrl: string | null;
}

export const QRModal: React.FC<QRModalProps> = ({
  show,
  onClose,
  isUploading,
  qrCodeUrl,
  downloadUrl,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-md w-full relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              📱 Escanea para descargar
            </h2>

            {isUploading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-16 h-16 text-purple-600 animate-spin mb-4" />
                <p className="text-gray-600">Subiendo foto...</p>
              </div>
            ) : qrCodeUrl ? (
              <>
                <div className="bg-gray-50 p-4 rounded-2xl shadow-inner mb-4">
                  <img
                    src={qrCodeUrl}
                    alt="Código QR"
                    className="w-full h-auto"
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <p className="text-green-800 text-sm font-semibold mb-2">
                    ✅ ¡Listo!
                  </p>
                  <p className="text-gray-600 text-xs">
                    Escanea el QR con tu celular para descargar la foto
                  </p>
                </div>

                {downloadUrl && (
                  <p className="text-xs text-gray-400 mb-4 break-all">
                    Link: {downloadUrl}
                  </p>
                )}
              </>
            ) : (
              <div className="py-12">
                <p className="text-red-600">Error generando el código QR</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl font-bold transition-all"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
