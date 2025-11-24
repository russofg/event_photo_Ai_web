import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { generateEditedImageVariations } from "./services/geminiService";
import { AppStatus, ART_STYLES } from "./types";
import { uploadToImgBB, generateQRCode } from "./services/qrService";
import { PRESETS } from "./constants";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ProcessingOverlay } from "./components/ProcessingOverlay";
import { ResultView } from "./components/ResultView";
import { InputView } from "./components/InputView";
import { QRModal } from "./components/QRModal";

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyleId, setSelectedStyleId] = useState<string>(
    ART_STYLES[0].id
  );

  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [isUploadingQR, setIsUploadingQR] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedFile || !prompt) {
      console.log("Faltan datos: archivo o prompt");
      return;
    }

    console.log("🚀 Iniciando generación...");
    console.log("Archivo:", selectedFile.name, selectedFile.type);
    console.log("Prompt:", prompt);
    console.log("Estilo:", selectedStyleId);

    setStatus(AppStatus.PROCESSING);
    setErrorMessage(null);
    setGeneratedImages([]);
    setSelectedImageIndex(0);

    try {
      console.log("📡 Llamando a Gemini API...");
      const results = await generateEditedImageVariations(
        selectedFile,
        prompt,
        selectedStyleId
      );

      console.log("✅ Respuesta recibida:", results.length, "imágenes");

      if (results.length > 0) {
        setGeneratedImages(results);
        setStatus(AppStatus.SUCCESS);
        console.log("🎉 Imágenes generadas correctamente");
      } else {
        console.error("❌ No se generaron imágenes");
        setErrorMessage("No pudimos generar la imagen. Intenta otra vez.");
        setStatus(AppStatus.ERROR);
      }
    } catch (error: any) {
      console.error("❌ ERROR COMPLETO:", error);
      console.error("Tipo de error:", error?.constructor?.name);
      console.error("Mensaje:", error?.message);
      console.error("Stack:", error?.stack);

      let errorMsg = "Error de conexión. Por favor intenta nuevamente.";
      if (error?.message?.includes("429")) {
        errorMsg =
          "Límite de API alcanzado. Espera unos minutos e intenta de nuevo.";
      } else if (
        error?.message?.includes("API key") ||
        error?.message?.includes("api key")
      ) {
        errorMsg = "Error con la API Key. Verifica tu configuración.";
      } else if (error?.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setGeneratedImages([]);
    setErrorMessage(null);
    setSelectedFile(null);
    setPrompt("");
    setQrCodeUrl(null);
    setShowQRModal(false);
    setDownloadUrl(null);
  };

  const handleGenerateQR = async () => {
    const selectedImage = generatedImages[selectedImageIndex];

    setIsUploadingQR(true);
    setShowQRModal(true);

    try {
      const imageUrl = await uploadToImgBB(selectedImage);

      if (imageUrl) {
        const qrUrl = generateQRCode(imageUrl, 400);
        setQrCodeUrl(qrUrl);
        setDownloadUrl(imageUrl);
      } else {
        setErrorMessage("Error subiendo la foto. Intenta nuevamente.");
        setShowQRModal(false);
      }
    } catch (error) {
      console.error("Error generando QR:", error);
      setErrorMessage("Error generando código QR. Intenta nuevamente.");
      setShowQRModal(false);
    } finally {
      setIsUploadingQR(false);
    }
  };

  const handleDownload = async () => {
    const selectedImage = generatedImages[selectedImageIndex];

    try {
      // Convertir base64 a blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Crear URL temporal
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ai-photo-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar:", error);
      // Fallback: abrir en nueva pestaña en móviles
      window.open(selectedImage, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-sans pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {status === AppStatus.SUCCESS ? (
            <ResultView
              key="result"
              generatedImages={generatedImages}
              selectedImageIndex={selectedImageIndex}
              setSelectedImageIndex={setSelectedImageIndex}
              onDownload={handleDownload}
              onGenerateQR={handleGenerateQR}
              onReset={handleReset}
            />
          ) : (
            <InputView
              key="input"
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyleId={selectedStyleId}
              setSelectedStyleId={setSelectedStyleId}
              presets={PRESETS}
              onGenerate={handleGenerate}
              status={status}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === AppStatus.PROCESSING && <ProcessingOverlay />}
        </AnimatePresence>

        {/* Error Toast */}
        <AnimatePresence>
          {status === AppStatus.ERROR && errorMessage && (
            <div className="fixed bottom-20 sm:bottom-24 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 sm:max-w-md animate-fadeIn">
              <div className="bg-red-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-red-500">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">⚠️</span>
                  <div className="flex-1">
                    <p className="font-bold mb-1 text-sm sm:text-base">Error</p>
                    <p className="text-xs sm:text-sm">{errorMessage}</p>
                  </div>
                  <button
                    onClick={() => setStatus(AppStatus.IDLE)}
                    className="text-white/80 hover:text-white text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

        <QRModal
          show={showQRModal}
          onClose={() => setShowQRModal(false)}
          isUploading={isUploadingQR}
          qrCodeUrl={qrCodeUrl}
          downloadUrl={downloadUrl}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;

