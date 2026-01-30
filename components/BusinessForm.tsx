import React from 'react';
import { BusinessCategory, FormData } from '../types';
import { BUSINESS_CATEGORIES, INDUSTRIES, SCALES, TONES, AUDIENCES } from '../constants';

interface BusinessFormProps {
  selectedCategory: BusinessCategory;
  onCategoryChange: (cat: BusinessCategory) => void;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const BusinessForm: React.FC<BusinessFormProps> = ({
  selectedCategory,
  onCategoryChange,
  formData,
  onFormChange,
  onSubmit,
  isLoading
}) => {
  const handleChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
      
      {/* Category Selection */}
      <div className="mb-10">
        <label className="block text-vip-gold text-sm font-bold uppercase tracking-wider mb-4 text-center">
          Bước 1: Chọn Chủ Đề Kiến Tạo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {BUSINESS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat)}
              className={`p-3 text-xs md:text-sm font-semibold rounded-xl border transition-all duration-300 h-full flex items-center justify-center text-center ${
                selectedCategory.id === cat.id
                  ? 'bg-gradient-to-br from-amber-400 to-amber-700 text-black border-transparent shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-vip-gold hover:text-vip-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="mt-4 text-center text-slate-300 italic text-sm">
          "{selectedCategory.description}"
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Ngành Nghề</label>
          <div className="relative">
            <select
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 appearance-none focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors"
            >
              <option value="" disabled>-- Chọn Ngành --</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">▼</div>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Quy Mô Doanh Nghiệp</label>
          <div className="relative">
            <select
              value={formData.scale}
              onChange={(e) => handleChange('scale', e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 appearance-none focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors"
            >
              <option value="" disabled>-- Chọn Quy Mô --</option>
              {SCALES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">▼</div>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Đối Tượng Đọc/Nghe</label>
          <div className="relative">
            <select
              value={formData.targetAudience}
              onChange={(e) => handleChange('targetAudience', e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 appearance-none focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors"
            >
              <option value="" disabled>-- Chọn Đối Tượng --</option>
              {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">▼</div>
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Tone Giọng (Style)</label>
          <div className="relative">
            <select
              value={formData.tone}
              onChange={(e) => handleChange('tone', e.target.value)}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 appearance-none focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors"
            >
              <option value="" disabled>-- Chọn Phong Cách --</option>
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-slate-500">▼</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Vấn Đề Cốt Lõi / Bối Cảnh (Core Problem)</label>
          <input
            type="text"
            value={formData.coreProblem}
            onChange={(e) => handleChange('coreProblem', e.target.value)}
            placeholder="VD: Doanh thu giảm 20% do đội ngũ sales mất lửa, thiếu quy trình chốt sale..."
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors placeholder-slate-600"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-slate-400 text-xs font-bold uppercase mb-2">Mục Tiêu Mong Muốn (Goal)</label>
          <input
            type="text"
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            placeholder="VD: Xây dựng quy trình 5 bước để tăng tỷ lệ chốt sale lên 15% trong Q3..."
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-vip-gold focus:ring-1 focus:ring-vip-gold transition-colors placeholder-slate-600"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`
            relative group overflow-hidden rounded-full px-12 py-4 font-bold text-lg tracking-widest uppercase transition-all
            ${isLoading ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-vip-gold to-amber-600 text-black hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.6)]'}
          `}
        >
          <span className="relative z-10">{isLoading ? 'Đang Phân Tích...' : 'Kích Hoạt Siêu Trí Tuệ'}</span>
          {!isLoading && <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-in-out -skew-x-12 origin-left" />}
        </button>
      </div>
    </div>
  );
};

export default BusinessForm;