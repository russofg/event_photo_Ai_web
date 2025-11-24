import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthLayout } from "./AuthLayout";
import { LogIn } from "lucide-react";

export const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err: any) {
      setError("Error al iniciar sesión con Google. Intenta nuevamente.");
      console.error(err);
    }
  };

  return (
    <AuthLayout
      title="AI Photo Booth"
      subtitle="Inicia sesión para crear magia"
    >
      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continuar con Google
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-red-200 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </AuthLayout>
  );
};
