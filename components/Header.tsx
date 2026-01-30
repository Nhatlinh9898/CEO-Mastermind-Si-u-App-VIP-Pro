import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full py-12 md:py-20 flex flex-col items-center justify-center text-center bg-vip-dark relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-vip-gold/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 px-4">
        <h2 className="text-vip-gold tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4 animate-pulse">
          Hệ Thống Trí Tuệ Nhân Tạo Doanh Nghiệp
        </h2>
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">
          <span className="gradient-text drop-shadow-lg block md:inline">SIÊU APP</span>{' '}
          <span className="text-white block md:inline">VIP PRO</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
          Kiến tạo chiến lược CEO & Nội dung điều hành đỉnh cao với sức mạnh của <span className="text-vip-highlight font-semibold">Thien Master AI</span>.
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-vip-gold to-transparent mt-8 mx-auto" />
      </div>
    </div>
  );
};

export default Header;