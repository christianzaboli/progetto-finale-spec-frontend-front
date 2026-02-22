import { useEffect } from "react";
import { createPortal } from "react-dom";
export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return createPortal(
    <div className="toast-container" onClick={onClose}>
      <div className="toast">
        <span className="toast-message">{message}</span>
      </div>
    </div>,
    document.body,
  );
}
