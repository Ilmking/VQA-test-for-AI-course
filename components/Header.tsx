import React from 'react';
import { ScanEye } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <ScanEye size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Visual Question Answering</h1>
          <p className="text-xs text-gray-500 font-medium">Gemini 2.5 Flash tomonidan quvvatlanadi</p>
        </div>
      </div>
    </header>
  );
};