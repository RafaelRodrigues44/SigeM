import React from 'react';

interface FileUploadProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700">{label}</label>
      <input
        type="file"
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default FileUpload;
