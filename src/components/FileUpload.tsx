import React, { useRef } from 'react';

interface FileUploadProps {
  onFileSelect: (files: FileList | null) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileSelect(event.target.files);
    }
  };

  return (
    <div className={`file-upload-container ${className}`} aria-label="file upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
