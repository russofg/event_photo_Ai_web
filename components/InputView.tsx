import React from "react";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { PromptSelector } from "./PromptSelector";
import { AppStatus, PresetPrompt } from "../types";

interface InputViewProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyleId: string;
  setSelectedStyleId: (id: string) => void;
  presets: PresetPrompt[];
  onGenerate: () => void;
  status: AppStatus;
}

export const InputView: React.FC<InputViewProps> = ({
  selectedFile,
  setSelectedFile,
  prompt,
  setPrompt,
  selectedStyleId,
  setSelectedStyleId,
  presets,
  onGenerate,
  status,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Image Upload */}
      <div className="bg-black/30 backdrop-blur-lg p-3 sm:p-6 rounded-xl sm:rounded-3xl border border-purple-500/30 shadow-xl">
        <ImageUploader
          onImageSelected={setSelectedFile}
          selectedImage={selectedFile}
        />
      </div>

      {/* Options */}
      <motion.div
        animate={{
          opacity: selectedFile ? 1 : 0.5,
          y: selectedFile ? 0 : 20,
          pointerEvents: selectedFile ? "auto" : "none",
          filter: selectedFile ? "grayscale(0%)" : "grayscale(100%)",
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-black/30 backdrop-blur-lg p-3 sm:p-6 rounded-xl sm:rounded-3xl border border-purple-500/30 shadow-xl">
          <PromptSelector
            prompt={prompt}
            setPrompt={setPrompt}
            selectedStyleId={selectedStyleId}
            setSelectedStyleId={setSelectedStyleId}
            presets={presets}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGenerate}
            disabled={!selectedFile || !prompt || status === AppStatus.PROCESSING}
            className={`
                w-full mt-4 sm:mt-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-lg sm:text-2xl shadow-2xl uppercase tracking-wider transition-all flex items-center justify-center gap-2
                ${
                  status === AppStatus.PROCESSING
                    ? "bg-purple-900/50 text-purple-300 cursor-wait"
                    : "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                }
              `}
          >
            {status === AppStatus.PROCESSING ? (
              <>
                <Wand2 className="w-6 h-6 animate-spin" />
                ✨ Creando Magia...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                🎨 GENERAR IMAGEN
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
