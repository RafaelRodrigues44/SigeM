import React from 'react';
import Button from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg w-1/2 ${className}`}>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
        <div className="mt-4 text-right">
          <Button label="Close" onClick={onClose} className="bg-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
