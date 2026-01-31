import React from "react";

export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="btn btn-outline">X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

