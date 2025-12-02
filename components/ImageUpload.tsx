import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';

interface ImageUploadProps {
  onImageSelected: (image: UploadedImage | null) => void;
  currentImage: UploadedImage | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (!file) return;

    // Check if image
    if (!file.type.startsWith('image/')) {
      alert('Iltimos, rasm yuklang (JPEG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Extract base64 data (remove "data:image/jpeg;base64," prefix)
      const base64Data = result.split(',')[1];
      
      onImageSelected({
        base64: base64Data,
        mimeType: file.type,
        previewUrl: result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const clearImage = () => {
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (currentImage) {
    return (
      <div className="relative group w-full h-64 md:h-80 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <img 
          src={currentImage.previewUrl} 
          alt="Uploaded preview" 
          className="w-full h-full object-contain"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={clearImage}
            className="p-2 bg-white/80 hover:bg-white text-red-500 rounded-full shadow-md backdrop-blur-sm transition-all"
            title="Rasmni o‘chirish"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full h-64 md:h-80 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <UploadCloud size={32} className="text-blue-600" />
      </div>
      <p className="text-gray-700 font-medium text-lg">Rasm yuklash uchun bosing</p>
      <p className="text-gray-500 text-sm mt-1">yoki rasmni shu yerga tashlang</p>
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
        <ImageIcon size={14} />
        <span>JPEG, PNG, WEBP</span>
      </div>
    </div>
  );
};