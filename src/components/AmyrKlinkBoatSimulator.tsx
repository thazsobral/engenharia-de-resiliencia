import React, { useState, useEffect } from 'react';
import { Waves, RefreshCw, AlertTriangle, CheckCircle2, Info, Compass, Shield, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BoatType } from '../types';
import { soundFx } from '../utils/audio';

export const AmyrKlinkBoatSimulator: React.FC = () => {
  const [boatType, setBoatType] = useState<BoatType>('joao_bobo');
  const [waveIntensity, setWaveIntensity] = useState<number>(3); // 1 to 5
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [boatRotation, setBoatRotation] = useState<number>(0);
  const [boatYOffset, setBoatYOffset] = useState<number>(0);
  const [isCapsized, setIsCapsized] = useState<boolean>(false);
  const [isSunk, setIsSunk] = useState<boolean>(false);
  const [recoveryTimeSeconds, setRecoveryTimeSeconds] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'simulator' | 'physics'>('simulator');
  const [stats, setStats] = useState({ capsizes: 0, recoveries: 0, failures: 0 });

  // Reset boat position when changing boat type
  useEffect(() => {
    setBoatRotation(0);
    setBoatYOffset(0);
    setIsCapsized(false);
    setIsSunk(false);
    setRecoveryTimeSeconds(null);
  }, [boatType]);

  const handleLaunchWave = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    soundFx.playWaveSound();

    // Step 1: Wave approaches and lifts boat
    setBoatYOffset(-30);
    setBoatRotation(-25 * (waveIntensity / 3));

    setTimeout(() => {
      // Step 2: Giant wave flips the boat
      setIsCapsized(true);
      setBoatYOffset(20);
      setBoatRotation(180);

      if (boatType === 'rigid') {
        // Rigid Boat Sinks / Breaks!
        setTimeout(() => {
          setIsSunk(true);
          setBoatYOffset(60);
          soundFx.playSinkingSound();
          setIsSimulating(false);
          setStats((prev) => ({ ...prev, capsizes: prev.capsizes + 1, failures: prev.failures + 1 }));
        }, 1200);
      } else {
        // João Bobo Boat: Rights itself automatically!
        const startTime = Date.now();
        setTimeout(() => {
          // Roll 360 degrees back to upright (0 deg)
          setBoatRotation(360);
          setBoatYOffset(0);
          soundFx.playBoatRightedSound();

          setTimeout(() => {
            // Reset rotation angle normalized to 0
            setBoatRotation(0);
            setIsCapsized(false);
            setIsSimulating(false);
            const elapsed = Number(((Date.now() - startTime) / 1000).toFixed(1));
            setRecoveryTimeSeconds(elapsed);
            setStats((prev) => ({ ...prev, capsizes: prev.capsizes + 1, recoveries: prev.recoveries + 1 }));
          }, 800);
        }, 1400);
      }
    }, 800);
  };

  const handleReset = () => {
    setBoatRotation(0);
    setBoatYOffset(0);
    setIsCapsized(false);
    setIsSunk(false);
    setIsSimulating(false);
    setRecoveryTimeSeconds(null);
  };

  return (
    <section id="modulo-1" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
              Módulo 01
            </span>
            <span className="text-xs text-slate-500 font-medium">História Real + Simulação Física</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-sky-950 tracking-tight">
          O Dilema de Amyr Klink: O Barco "João Bobo"
        </h2>
        
        <p className="mt-3 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Em 1984, Amyr Klink atravessou o Atlântico a remo sozinho em 100 dias. Em alto-mar, tempestades e ondas gigantes são inevitáveis. A maioria das embarcações tenta ser forte e rígida para nunca capotar — mas quando a onda vem, elas quebram ou afundam. Amyr mudou o foco: <strong>em vez de tentar não virar, ele projetou um barco feito para desvirar sozinho.</strong>
        </p>

        {/* Tab Selector */}
        <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Simulador Interativo do Barco
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'physics'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Segredos da Engenharia do Barco
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span>Ondas Enfrentadas: <strong className="text-slate-900">{stats.capsizes}</strong></span>
            <span>Recuperações: <strong className="text-emerald-600 font-bold">{stats.recoveries}</strong></span>
            <span>Naufrágios: <strong className="text-rose-600 font-bold">{stats.failures}</strong></span>
          </div>
        </div>

        {activeTab === 'simulator' ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  1. Escolha o Design do Barco:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option A: Rigid Boat */}
                  <button
                    onClick={() => { setBoatType('rigid'); handleReset(); }}
                    disabled={isSimulating}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      boatType === 'rigid'
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 text-rose-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-rose-600 uppercase">Opção A</span>
                      {boatType === 'rigid' && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Barco Rígido</div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">Foco em evitar falhas. Se a onda for muito forte, a estrutura quebra e afunda.</p>
                  </button>

                  {/* Option B: João Bobo Boat */}
                  <button
                    onClick={() => { setBoatType('joao_bobo'); handleReset(); }}
                    disabled={isSimulating}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      boatType === 'joao_bobo'
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 text-sky-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-sky-600 uppercase">Opção B (Amyr Klink)</span>
                      {boatType === 'joao_bobo' && <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Barco "João Bobo"</div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">Projetado para desvirar sozinho em segundos caso capote.</p>
                  </button>
                </div>
              </div>

              {/* Wave Intensity Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    2. Força da Onda:
                  </label>
                  <span className="text-xs font-bold text-amber-600">
                    {waveIntensity === 1 ? 'Mar Leve' : waveIntensity === 3 ? 'Tempestade Atlântica' : 'Onda Gigante de 12 metros'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={waveIntensity}
                  onChange={(e) => setWaveIntensity(Number(e.target.value))}
                  disabled={isSimulating}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Launch Wave Button */}
              <div className="pt-2">
                <button
                  onClick={handleLaunchWave}
                  disabled={isSimulating}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    isSimulating
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 cursor-pointer transform hover:-translate-y-0.5'
                  }`}
                >
                  <Waves className={`w-5 h-5 ${isSimulating ? 'animate-bounce' : ''}`} />
                  <span>{isSimulating ? 'Onda Atingindo o Barco...' : '🌊 Lançar Onda Gigante'}</span>
                </button>

                {isSunk && (
                  <button
                    onClick={handleReset}
                    className="w-full mt-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 bg-rose-50 rounded-lg border border-rose-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reiniciar Barco Naufragado</span>
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status da Embarcação:</div>
                {isSunk ? (
                  <div className="text-sm font-bold text-rose-600 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>NAUFRÁGIO CATASTRÓFICO: Barco encheu de água e afundou!</span>
                  </div>
                ) : recoveryTimeSeconds ? (
                  <div className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>RECUPERAÇÃO CONCLUÍDA! Desvirou sozinho em apenas {recoveryTimeSeconds}s!</span>
                  </div>
                ) : isCapsized ? (
                  <div className="text-sm font-bold text-amber-700 flex items-center gap-2 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                    <span>CAPOTANDO NA ONDA... Exercendo força física autocompensadora!</span>
                  </div>
                ) : (
                  <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-600" />
                    <span>Navegando em estabilidade normal. Pronto para o impacto.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Interactive Visual Ocean Canvas */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 border border-slate-800 relative min-h-[420px] flex flex-col justify-between overflow-hidden shadow-md">
              
              {/* Sky / Clouds background */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-xs text-slate-300 z-10">
                <span className="flex items-center gap-1.5 font-bold bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-slate-800 text-sky-300">
                  <Shield className="w-3.5 h-3.5 text-sky-400" />
                  Modelo: {boatType === 'rigid' ? 'Barco Rígido Tradicional' : 'Paratii (João Bobo)'}
                </span>

                {recoveryTimeSeconds && (
                  <span className="bg-emerald-950/90 text-emerald-300 font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-700 animate-pulse">
                    ⏱️ MTTR (Tempo de Recuperação): {recoveryTimeSeconds}s
                  </span>
                )}
              </div>

              {/* Animated Sea & Boat SVG Canvas */}
              <div className="relative flex-1 flex items-center justify-center my-8">
                
                {/* Simulated Ocean Waves SVG */}
                <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10 opacity-80">
                  <svg className="w-full h-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
                    <motion.path
                      animate={{
                        d: isSimulating
                          ? [
                              'M0,80 Q300,20 600,80 T1200,80 L1200,180 L0,180 Z',
                              'M0,40 Q300,120 600,40 T1200,40 L1200,180 L0,180 Z',
                              'M0,80 Q300,20 600,80 T1200,80 L1200,180 L0,180 Z',
                            ]
                          : [
                              'M0,100 Q300,70 600,100 T1200,100 L1200,180 L0,180 Z',
                              'M0,90 Q300,110 600,90 T1200,90 L1200,180 L0,180 Z',
                              'M0,100 Q300,70 600,100 T1200,100 L1200,180 L0,180 Z',
                            ],
                      }}
                      transition={{ duration: isSimulating ? 1.2 : 3, repeat: Infinity, ease: 'easeInOut' }}
                      fill="#0284c7"
                      fillOpacity="0.4"
                    />
                    <motion.path
                      animate={{
                        d: isSimulating
                          ? [
                              'M0,90 Q300,140 600,90 T1200,90 L1200,180 L0,180 Z',
                              'M0,50 Q300,10 600,50 T1200,50 L1200,180 L0,180 Z',
                              'M0,90 Q300,140 600,90 T1200,90 L1200,180 L0,180 Z',
                            ]
                          : [
                              'M0,110 Q300,90 600,110 T1200,110 L1200,180 L0,180 Z',
                              'M0,100 Q300,120 600,100 T1200,100 L1200,180 L0,180 Z',
                              'M0,110 Q300,90 600,110 T1200,110 L1200,180 L0,180 Z',
                            ],
                      }}
                      transition={{ duration: isSimulating ? 1.5 : 4, repeat: Infinity, ease: 'easeInOut' }}
                      fill="#0369a1"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>

                {/* Giant Wave Graphic overlay when active */}
                <AnimatePresence>
                  {isSimulating && (
                    <motion.div
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 200, opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cyan-400/30 to-blue-500/10 rounded-full blur-2xl pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Boat Component (SVG) */}
                <motion.div
                  animate={{
                    rotate: boatRotation,
                    y: boatYOffset,
                  }}
                  transition={{
                    duration: isSimulating ? 0.8 : 0.4,
                    ease: 'easeInOut',
                  }}
                  className="relative z-20 w-48 h-32 flex items-center justify-center"
                >
                  {boatType === 'rigid' ? (
                    /* Rigid Boat Visual */
                    <div className="relative">
                      <svg width="180" height="110" viewBox="0 0 180 110" fill="none">
                        {/* Hull */}
                        <path d="M20 50 L160 50 L140 90 L40 90 Z" fill="#b91c1c" stroke="#ef4444" strokeWidth="3" />
                        {/* Cabin */}
                        <rect x="50" y="20" width="80" height="30" fill="#991b1b" rx="2" stroke="#f87171" strokeWidth="2" />
                        {/* Flat Roof (Vulnerable) */}
                        <line x1="45" y1="20" x2="135" y2="20" stroke="#fca5a5" strokeWidth="3" />
                        {/* Text */}
                        <text x="90" y="72" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">RÍGIDO (Sem Lastro)</text>
                      </svg>
                      {isSunk && (
                        <div className="absolute -top-6 inset-x-0 text-center text-xs font-bold text-rose-400 bg-slate-950/90 py-1 rounded border border-rose-800">
                          💥 ÁGUA ENTROU / AFUNDOU
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Amyr Klink's Self-Righting Boat (João Bobo) */
                    <div className="relative">
                      <svg width="200" height="120" viewBox="0 0 200 120" fill="none">
                        {/* Rounded Hull (Aerodynamic / Hydrodynamic) */}
                        <path d="M10 55 C10 95 60 105 100 105 C140 105 190 95 190 55 C170 30 130 20 100 20 C70 20 30 30 10 55 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
                        {/* Curved Bubble Canopy (Pushes water off when inverted) */}
                        <path d="M45 45 C45 20 155 20 155 45 Z" fill="#0369a1" stroke="#7dd3fc" strokeWidth="2" />
                        {/* Low Center of Gravity Weighted Keel (Ballast) */}
                        <ellipse cx="100" cy="95" rx="35" ry="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
                        {/* Text */}
                        <text x="100" y="65" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">PARATII (João Bobo)</text>
                        <text x="100" y="98" fill="#0f172a" fontSize="8" textAnchor="middle" fontWeight="extrabold">LASTRO PESADO DE REPOSICIONAMENTO</text>
                      </svg>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Professional Polish Theme Banner Callout */}
              <div className="relative z-20 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-xl text-amber-950 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-amber-200/60 text-amber-900 shrink-0 mt-0.5">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Lição de Resiliência:</span>
                    <p className="text-sm font-bold text-amber-950 mt-0.5">
                      "Em vez de gastar energia evitando a onda, projete o barco para desvirar sozinho."
                    </p>
                    <p className="text-xs text-amber-900 mt-1 leading-relaxed font-medium">
                      No oceano assim como na tecnologia, falhas catastróficas acontecem quando tentamos criar um sistema 100% inquebrável. O verdadeiro segredo é a capacidade de <strong>autocorreção automática</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Physics Details Tab */
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Centro de Gravidade Baixo (Lastro)</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Amyr colocou o peso principal do barco no fundo da quilha (com baterias e suprimentos pesados). Quando o barco vira de ponta-cabeça, a gravidade puxa esse peso de volta para baixo instantaneamente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Superfície Curva Autocorretiva</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Teto plano faz o barco "estabilizar de ponta-cabeça". O barco Paratii tinha o teto arredondado e estanque: ao capotar, o formato curvo obriga o barco a continuar rolando até voltar para a posição certa.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Vedações Estanques Total</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Nenhuma gota de água entra na cabine mesmo quando submerso a 360°. O sistema não perde energia tentando remover a água depois — a água simplesmente escorre pela cabine selada.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
