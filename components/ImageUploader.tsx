import React, { useRef } from "react";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  selectedImage: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRetake = () => {
    onImageSelected(null as any);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full aspect-square sm:aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-gray-800 shadow-2xl">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Image Selected */}
        {selectedImage ? (
          <div className="w-full h-full relative group">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Foto seleccionada"
              className="w-full h-full object-contain bg-gray-900"
            />
            <button
              onClick={handleRetake}
              className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold border-2 border-gray-900 hover:bg-white transition-all text-sm sm:text-base active:scale-95"
            >
              🔄 Cambiar foto
            </button>
          </div>
        ) : (
          /* Upload Prompt */
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-8 h-8 sm:w-10 sm:h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 text-center">
              Sube tu Foto
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 text-center px-2">
              Toca o haz clic para seleccionar
            </p>

            <button
              onClick={triggerFileUpload}
              className="w-full max-w-xs px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg active:scale-95"
            >
              <span className="text-xl sm:text-2xl">📸</span>
              Elegir Foto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
