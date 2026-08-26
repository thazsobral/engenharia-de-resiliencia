import React from 'react';
import { ExternalLink, Heart, Shield, Anchor } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Inspiration Link Section */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-sm">
          <Anchor className="w-4 h-4 text-sky-600" />
          <span>Inspirado no conteúdo de <strong>A Beleza dos Dados</strong>:</span>
          <a
            href="https://www.youtube.com/shorts/VMJ2veWH1SI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 underline font-bold flex items-center gap-1 inline-flex"
          >
            <span>Assista ao vídeo no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mandatory Highlighted Centered Text */}
        <div className="pt-4 pb-2 border-t border-slate-200/60">
          <p className="text-sm sm:text-base font-bold text-sky-950 tracking-wide max-w-4xl mx-auto bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            Desenvolvido por ThazSobral para fins de Educação Tecnológica Prática e Interativa. © 2026 — Todos os direitos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};
