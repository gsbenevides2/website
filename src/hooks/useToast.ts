import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import { ToastContextValue } from "@/components/Toast/types";

/**
 * Hook to access toast notifications from React components
 *
 * @example
 * const toast = useToast();
 * toast.success('Operation completed!');
 * toast.error('Something went wrong');
 * toast.warning('Be careful!');
 * toast.info('Here is some information');
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
