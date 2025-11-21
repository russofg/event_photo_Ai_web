import React, { useState } from "react";
import { PresetPrompt, ART_STYLES } from "../types";

interface PromptSelectorProps {
  prompt: string;
  setPrompt: (value: string) => void;
  selectedStyleId: string;
  setSelectedStyleId: (value: string) => void;
  presets: PresetPrompt[];
}

export const PromptSelector: React.FC<PromptSelectorProps> = ({
  prompt,
  setPrompt,
  selectedStyleId,
  setSelectedStyleId,
  presets,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Presets - Mobile Optimized */}
      <div>
        <label className="block text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs sm:text-sm">
            1
          </span>
          Elige tu Escenario
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {presets.map((preset) => {
            const isSelected = prompt === preset.text;
            return (
              <button
                key={preset.id}
                onClick={() => setPrompt(preset.text)}
                className={`
                  relative flex flex-col items-center justify-center p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group
                  ${
                    isSelected
                      ? "bg-blue-600/20 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "bg-gray-800 border-gray-700 active:border-gray-500 active:bg-gray-750"
                  }
                `}
              >
                <div
                  className={`text-3xl sm:text-5xl mb-2 sm:mb-3 transition-transform duration-300 ${
                    isSelected ? "scale-110" : ""
                  }`}
                >
                  {preset.icon}
                </div>
                <span
                  className={`text-xs sm:text-lg font-bold text-center ${
                    isSelected ? "text-white" : "text-gray-300"
                  }`}
                >
                  {preset.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Toggle for custom input (hidden by default) */}
        <div className="mt-3 sm:mt-4 text-center">
          <button
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-xs sm:text-sm text-gray-500 underline active:text-gray-300"
          >
            {showCustomInput
              ? "Ocultar entrada manual"
              : "¿Prefieres escribir algo específico?"}
          </button>
        </div>

        {showCustomInput && (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe tu escenario..."
            className="w-full mt-2 h-20 sm:h-24 bg-gray-900 border border-gray-700 rounded-xl p-3 sm:p-4 text-sm sm:text-base text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        )}
      </div>

      {/* Style Selector - Mobile Optimized Grid */}
      <div>
        <label className="block text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs sm:text-sm">
            2
          </span>
          Elige el Estilo
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {ART_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyleId(style.id)}
              className={`
                relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 h-20 sm:h-24 text-left transition-all duration-200 group border-2 flex flex-col justify-end
                ${
                  selectedStyleId === style.id
                    ? "border-purple-500 bg-gray-800 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "border-gray-700 bg-gray-800/50 active:border-gray-500"
                }
              `}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.previewColor} opacity-20 transition-opacity`}
              />
              <span
                className={`block text-sm sm:text-lg font-bold z-10 relative ${
                  selectedStyleId === style.id ? "text-white" : "text-gray-300"
                }`}
              >
                {style.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
