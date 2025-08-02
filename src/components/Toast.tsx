import React from 'react';
import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded shadow-lg">
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button onClick={() => { setVisible(false); onClose(); }} aria-label="Close">
          <AiOutlineClose className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Toast;