// src/components/Modal.js

import React from "react";

const Modal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <img
          src={imageSrc}
          alt="Large View"
          className="max-w-full max-h-full"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl bg-gray-900 rounded-full p-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
