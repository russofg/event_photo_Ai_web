import React from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-purple-500/30 shadow-2xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-2">
            {title}
          </h1>
          <p className="text-purple-300">{subtitle}</p>
        </div>
        {children}
      </motion.div>
    </div>
  );
};
