export type ToastVariant = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  persist?: boolean;
}

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number,
    persist?: boolean,
  ) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}
