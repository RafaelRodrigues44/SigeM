// Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className = '', width, height }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg ${className} p-4`}
        style={{ width, height }} // Aplicar largura e altura aqui
      >
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
