import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Toast as ToastType } from "./types";
import styles from "./styles.module.scss";

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

const ICONS = {
  success: "✓",
  error: "✗",
  warning: "⚠",
  info: "ℹ",
};

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    // Wait for animation to complete before removing
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  useEffect(() => {
    // Auto-dismiss if not persistent
    if (!toast.persist && toast.duration) {
      const timer = setTimeout(() => {
        //handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.persist, toast.duration]);

  return (
    <div
      className={classNames(
        styles.toast,
        styles[toast.variant],
        isExiting && styles.exiting,
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.icon}>{ICONS[toast.variant]}</div>
      <div className={styles.message}>{toast.message}</div>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="Fechar notificação"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
