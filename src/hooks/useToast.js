"use client";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);
ToastContext.displayName = "ToastContext";

// Available variants: ['success', 'info', 'warning', 'error']

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("info");
  const [message, setMessage] = useState("Default message");

  const handleOpenToast = useCallback((type, text) => {
    setOpen(true);
    setVariant(type);
    setMessage(text);
  }, []);

  const handleCloseToast = () => {
    setOpen(false);
  };

  const value = { open, variant, message, handleOpenToast, handleCloseToast };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error(`useToast must be used within ToastProvider`);

  return context;
};

export default ToastProvider;
