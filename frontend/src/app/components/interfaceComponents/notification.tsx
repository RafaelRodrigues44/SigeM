import React from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose, className = '' }) => {
  const typeClass = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`p-4 rounded shadow-md ${typeClass[type]} ${className}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
