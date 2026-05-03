import React, { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";
import Toast from "@/components/Toast";
import styles from "./styles.module.scss";

const ToastContainer: React.FC = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("ToastContainer must be used within ToastProvider");
  }

  const { toasts, removeToast } = context;

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
