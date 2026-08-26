import React from 'react';
import { Anchor, ShieldAlert, Cpu, Volume2, VolumeX, HelpCircle, ArrowDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGlossary: () => void;
  onStartJourney: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenGlossary,
  onStartJourney,
}) => {
  return (
    <header className="relative overflow-hidden bg-white text-slate-900 border-b border-slate-200">
      {/* Background Accent Gradient */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden bg-gradient-to-b from-sky-50/60 via-slate-50 to-white">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navbar */}
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between z-10 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-900 flex items-center justify-center shadow-md text-white font-bold">
            <Anchor className="w-5 h-5 text-sky-200" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-sky-950 uppercase flex items-center gap-2">
              Engenharia da Resiliência
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[11px] font-bold bg-sky-100 text-sky-800 rounded-full border border-sky-200 normal-case">
                Design para Recuperação
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Domine a Ciência de Voltar em Pé Sozinho</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-mono border border-slate-200 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SISTEMA: RESILIENTE</span>
          </div>

          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            title="Abrir Glossário de Termos"
          >
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Glossário</span>
          </button>

          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Som Ativado (clique para mutar)' : 'Som Mutado (clique para ativar)'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
                <span className="hidden sm:inline">Áudio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">Áudio Off</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Body */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Mudando o paradigma: De "Nunca Falhar" para "Recuperar Rápido"</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-sky-950 tracking-tight leading-tight uppercase"
        >
          A Arte de Aprender a <br className="hidden sm:inline" />
          <span className="text-sky-600 underline decoration-sky-300 decoration-wavy decoration-2">
            Capotar e Desvirar
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Por que tentar evitar 100% dos erros é uma ilusão impossível — e como os maiores navegadores do oceano e as maiores empresas de tecnologia do mundo desenham sistemas que <strong className="text-sky-900 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">voltam em pé sozinhos em segundos</strong> quando o caos acontece.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3 text-xs sm:text-sm font-semibold"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
            <Anchor className="w-4 h-4 text-sky-600" />
            <span>O Barco João Bobo (1984)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>Engenharia do Caos (Servidores)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>Design para Recuperação</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={onStartJourney}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-extrabold text-white bg-sky-600 hover:bg-sky-700 rounded-full shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>Iniciar Jornada Interativa</span>
            <ArrowDown className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </header>
  );
};
