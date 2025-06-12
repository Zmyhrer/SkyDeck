"use client";

import { useEffect, useState } from "react";

const PopupLeft = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false); // Start slide-out animation

      // Wait for animation to finish before calling onClose
      setTimeout(() => onClose(), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 min-w-[200px] transition-transform duration-300 ease-in-out
      ${visible ? "translate-x-0" : "translate-x-full"}`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-white font-bold hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default PopupLeft;
