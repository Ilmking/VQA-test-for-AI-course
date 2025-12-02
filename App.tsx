import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { QAInterface } from './components/QAInterface';
import { UploadedImage } from './types';

function App() {
  const [image, setImage] = useState<UploadedImage | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                Rasm
              </h2>
              <ImageUpload 
                currentImage={image} 
                onImageSelected={setImage} 
              />
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Platforma rasmni tahlil qilib, uning mazmuni, undagi obyektlar va detallar bo‘yicha savollaringizga javob beradi. 
                Savollar aniq va rasmga aloqador bo‘lishi kerak.
              </p>
            </div>

            {/* Instruction Card */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">Qanday ishlatiladi?</h3>
              <ul className="space-y-2 text-sm text-blue-800 list-disc list-inside">
                <li>Rasm yuklang (Drag & Drop yoki tanlash).</li>
                <li>Rasm haqida o‘z savolingizni yozing.</li>
                <li>Sun'iy intellekt faqat rasmga asoslanib javob beradi.</li>
              </ul>
            </div>
          </div>

          <div className="h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 lg:hidden">
              <span className="w-1 h-6 bg-green-600 rounded-full"></span>
              Savol-Javob
            </h2>
            <QAInterface image={image} />
          </div>

        </div>
      </main>
      
      <footer className="py-6 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} VQA Platform. Gemini API.
      </footer>
    </div>
  );
}

export default App;