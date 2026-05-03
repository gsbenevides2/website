import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Toast,
  ToastContextValue,
  ToastVariant,
} from "@/components/Toast/types";
import { toastEventBus } from "@/utils/toastEventBus";

const MAX_TOASTS = 5;
const DEFAULT_DURATION = 5000; // 5 seconds

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant = "info",
      duration?: number,
      persist: boolean = false,
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = {
        id,
        message,
        variant,
        duration: duration ?? DEFAULT_DURATION,
        persist,
      };

      setToasts((prev) => {
        // If we're at max capacity, remove the oldest toast
        const updated = prev.length >= MAX_TOASTS ? prev.slice(1) : prev;
        return [...updated, newToast];
      });

      // Auto-dismiss if not persistent
      if (!persist) {
        setTimeout(() => {
          removeToast(id);
        }, duration ?? DEFAULT_DURATION);
      }
    },
    [removeToast],
  );

  const success = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "success", duration);
    },
    [showToast],
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "error", duration);
    },
    [showToast],
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "warning", duration);
    },
    [showToast],
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      showToast(message, "info", duration);
    },
    [showToast],
  );

  // Subscribe to event bus
  useEffect(() => {
    const unsubscribe = toastEventBus.subscribe((event) => {
      showToast(event.message, event.variant, event.duration);
    });

    return unsubscribe;
  }, [showToast]);

  const value: ToastContextValue = {
    toasts,
    showToast,
    success,
    error,
    warning,
    info,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
