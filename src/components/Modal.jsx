import React from "react";

const Modal = ({ isOpen, onClose, userLocation, userName, picture }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-[#00000080]">
      <div className="w-1/2 h-1/2 flex flex-col p-5 rounded bg-white">
        <button
          className="cursor-pointer self-start border-red-600 bg-red-600 text-white py-1 rounded px-2"
          onClick={onClose}
        >
          X
        </button>
        <div className="w-full h-full flex gap-4">
          <div className="w-96 self-center">{picture}</div>
          <div className="flex flex-col justify-between">
            <span className="font-bold mb-2">{userName}</span>
            <span className="text-blue-400 m-2 text-sm">{userLocation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
