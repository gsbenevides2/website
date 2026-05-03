/**
 * EventBus for Toast notifications
 * Allows toast notifications to be triggered from anywhere in the application,
 * including outside React components (services, API calls, etc.)
 */

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastEvent {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

type ToastEventListener = (event: ToastEvent) => void;

class ToastEventBus {
  private listeners: ToastEventListener[] = [];

  /**
   * Subscribe to toast events
   */
  subscribe(listener: ToastEventListener): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Emit a toast event
   */
  emit(
    message: string,
    variant: ToastVariant = "info",
    duration?: number,
  ): void {
    const event: ToastEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      variant,
      duration,
    };

    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error("Error in toast event listener:", error);
      }
    });
  }

  /**
   * Convenience methods for different toast variants
   */
  success(message: string, duration?: number): void {
    this.emit(message, "success", duration);
  }

  error(message: string, duration?: number): void {
    this.emit(message, "error", duration);
  }

  warning(message: string, duration?: number): void {
    this.emit(message, "warning", duration);
  }

  info(message: string, duration?: number): void {
    this.emit(message, "info", duration);
  }
}

// Singleton instance
export const toastEventBus = new ToastEventBus();
