import React, { useState, useRef } from 'react';
import Header from './components/Header';
import BusinessForm from './components/BusinessForm';
import ResultDisplay from './components/ResultDisplay';
import { BusinessCategory, FormData, VoiceGender } from './types';
import { BUSINESS_CATEGORIES } from './constants';
import { generateBusinessContent, generateSpeech, playAudioBuffer } from './services/geminiService';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory>(BUSINESS_CATEGORIES[0]);
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    scale: '',
    targetAudience: '',
    coreProblem: '',
    goal: '',
    tone: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<ArrayBuffer | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleSubmit = async () => {
    // Validation
    if (!formData.industry || !formData.coreProblem) {
        alert("Vui lòng nhập ít nhất Ngành nghề và Vấn đề cốt lõi.");
        return;
    }

    setIsLoading(true);
    setContent(null);
    setAudioBuffer(null); // Reset audio when new content is generated

    try {
      const result = await generateBusinessContent(selectedCategory, formData);
      setContent(result);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAudio = async (gender: VoiceGender) => {
    if (!content) return;
    setIsAudioLoading(true);
    try {
      const buffer = await generateSpeech(content, gender);
      setAudioBuffer(buffer);
      
      // Auto play after generation
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      }
      await playAudioBuffer(buffer, audioContextRef.current);
      
    } catch (error: any) {
      alert("Không thể tạo giọng đọc: " + error.message);
    } finally {
      setIsAudioLoading(false);
    }
  };

  const handlePlayAudio = async () => {
    if (audioBuffer) {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        }
        await playAudioBuffer(audioBuffer, audioContextRef.current);
    }
  };

  return (
    <div className="min-h-screen bg-vip-dark selection:bg-vip-gold selection:text-black pb-20">
      <Header />
      
      <main className="container mx-auto px-4 -mt-10 relative z-20">
        <BusinessForm 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {content && (
          <ResultDisplay 
            content={content}
            onGenerateAudio={handleGenerateAudio}
            isAudioLoading={isAudioLoading}
            audioBuffer={audioBuffer}
            onPlayAudio={handlePlayAudio}
          />
        )}
      </main>
      
      {/* Sticky Bottom Branding */}
      <div className="fixed bottom-0 w-full bg-slate-900/90 backdrop-blur text-center py-2 border-t border-slate-800 z-50">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">
          Powered by Gemini 2.5 Flash & Thien Master AI Core
        </p>
      </div>
    </div>
  );
};

export default App;