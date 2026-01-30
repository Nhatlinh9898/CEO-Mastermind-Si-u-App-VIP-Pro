import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { VoiceGender } from '../types';

interface ResultDisplayProps {
  content: string;
  onGenerateAudio: (gender: VoiceGender) => void;
  isAudioLoading: boolean;
  audioBuffer: ArrayBuffer | null;
  onPlayAudio: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  content,
  onGenerateAudio,
  isAudioLoading,
  audioBuffer,
  onPlayAudio
}) => {
  const [selectedGender, setSelectedGender] = useState<VoiceGender>(VoiceGender.MALE);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 animate-fade-in-up">
      <div className="bg-slate-900 border border-vip-gold/30 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header of Result */}
        <div className="bg-slate-800/80 px-8 py-4 border-b border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-vip-gold font-bold uppercase tracking-wider">Kết Quả Phân Tích Chiến Lược</h3>
          </div>
          
          {/* Voice Studio Pro Controls */}
          <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-full border border-slate-700">
            <span className="text-xs text-slate-400 font-bold ml-2">VOICE STUDIO PRO:</span>
            
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedGender(VoiceGender.MALE)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedGender === VoiceGender.MALE ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                NAM (Trầm Ấm)
              </button>
              <button
                onClick={() => setSelectedGender(VoiceGender.FEMALE)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedGender === VoiceGender.FEMALE ? 'bg-pink-600 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                NỮ (Truyền Cảm)
              </button>
            </div>

            {!audioBuffer ? (
              <button
                onClick={() => onGenerateAudio(selectedGender)}
                disabled={isAudioLoading}
                className="bg-vip-gold text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isAudioLoading ? (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
                Tạo Giọng Đọc
              </button>
            ) : (
              <button
                onClick={onPlayAudio}
                className="bg-green-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-green-400 transition-colors flex items-center gap-2 animate-bounce-short"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Phát Ngay
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 text-slate-200 leading-relaxed font-sans bg-slate-900">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-vip-gold prose-strong:text-amber-200 prose-ul:marker:text-vip-gold">
               <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;