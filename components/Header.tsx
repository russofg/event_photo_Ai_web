import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface HeaderProps {
  user?: any;
  logout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, logout }) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-3 sm:py-4 px-4 bg-black/30 backdrop-blur-lg border-b border-white/10 sticky top-0 z-30"
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-2 flex-1">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          </motion.div>
          <div className="text-left">
            <h1 className="text-lg sm:text-2xl font-black tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 leading-none">
              AI Photo Booth
            </h1>
            <p className="text-[10px] sm:text-xs text-purple-300 font-medium hidden sm:block">
              Transforma tus fotos con IA
            </p>
          </div>
        </div>

        {/* User Profile Area */}
        {user && logout && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white">
                {user.displayName?.split(" ")[0]}
              </p>
            </div>

            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/30 bg-purple-600 flex items-center justify-center text-xs font-bold">
                {user.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <button
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              title="Cerrar sesión"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 text-white/80"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
