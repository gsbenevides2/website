import { toastEventBus, ToastVariant } from "./toastEventBus";

/**
 * Global toast utility functions
 * Can be called from anywhere in the application, including outside React components
 * (services, API calls, utility functions, etc.)
 *
 * @example
 * import { toast } from '@/utils/toast';
 *
 * // Show a generic toast
 * toast.show('Something happened');
 *
 * // Show success toast
 * toast.success('File uploaded successfully!');
 *
 * // Show error toast
 * toast.error('Failed to save changes');
 *
 * // Show warning toast
 * toast.warning('Your session is about to expire');
 *
 * // Show info toast
 * toast.info('New version available');
 *
 * // Custom duration (in milliseconds)
 * toast.success('Saved!', 3000);
 */

export const toast = {
  /**
   * Show a toast notification
   */
  show: (
    message: string,
    variant: ToastVariant = "info",
    duration?: number,
  ) => {
    toastEventBus.emit(message, variant, duration);
  },

  /**
   * Show a success toast (green)
   */
  success: (message: string, duration?: number) => {
    toastEventBus.success(message, duration);
  },

  /**
   * Show an error toast (red)
   */
  error: (message: string, duration?: number) => {
    toastEventBus.error(message, duration);
  },

  /**
   * Show a warning toast (yellow)
   */
  warning: (message: string, duration?: number) => {
    toastEventBus.warning(message, duration);
  },

  /**
   * Show an info toast (blue)
   */
  info: (message: string, duration?: number) => {
    toastEventBus.info(message, duration);
  },
};

// Export individual functions for direct import
export const showToast = toast.show;
export const showSuccess = toast.success;
export const showError = toast.error;
export const showWarning = toast.warning;
export const showInfo = toast.info;
