import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Zap, Activity, AlertOctagon, CheckCircle, RefreshCw, Server, Flame, ShieldCheck, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ArchitectureMode, ServerNode, ChaosEvent } from '../types';
import { soundFx } from '../utils/audio';

const INITIAL_SERVERS: ServerNode[] = [
  { id: 1, name: 'Servidor Alpha', role: 'Catálogo de Produtos', status: 'healthy', load: 42, latency: 15, requestsHandled: 1240 },
  { id: 2, name: 'Servidor Beta', role: 'Autenticação & Login', status: 'healthy', load: 38, latency: 18, requestsHandled: 980 },
  { id: 3, name: 'Servidor Gamma', role: 'Processador de Pagamentos', status: 'healthy', load: 55, latency: 22, requestsHandled: 1450 },
  { id: 4, name: 'Servidor Delta', role: 'Streaming de Vídeo', status: 'healthy', load: 49, latency: 19, requestsHandled: 2100 },
  { id: 5, name: 'Servidor Epsilon', role: 'Banco de Dados Cache', status: 'healthy', load: 35, latency: 12, requestsHandled: 890 },
  { id: 6, name: 'Servidor Zeta (Reserva)', role: 'Standby Auto-Healing', status: 'standby', load: 0, latency: 0, requestsHandled: 0, isBackup: true },
];

export const ChaosEngineeringSimulator: React.FC = () => {
  const [architectureMode, setArchitectureMode] = useState<ArchitectureMode>('resilient');
  const [servers, setServers] = useState<ServerNode[]>(INITIAL_SERVERS);
  const [events, setEvents] = useState<ChaosEvent[]>([]);
  const [isMonkeyAttacking, setIsMonkeyAttacking] = useState<boolean>(false);
  const [autoChaos, setAutoChaos] = useState<boolean>(false);
  const [systemHealth, setSystemHealth] = useState<number>(100);
  const [totalRequests, setTotalRequests] = useState<number>(6660);
  const [recoveredCount, setRecoveredCount] = useState<number>(0);
  const [outageCount, setOutageCount] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Add initial welcome event log
  useEffect(() => {
    addLogEvent('detection', 'Sistema inicializado em monitoramento ativo.');
  }, []);

  // Traffic heartbeat simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setServers((prev) =>
        prev.map((s) => {
          if (s.status === 'healthy') {
            const jitterLoad = Math.max(20, Math.min(90, s.load + Math.floor(Math.random() * 11 - 5)));
            return {
              ...s,
              load: jitterLoad,
              requestsHandled: s.requestsHandled + Math.floor(Math.random() * 15 + 5),
            };
          }
          if (s.status === 'failing' && architectureMode === 'fragile') {
            return { ...s, load: 100, latency: Math.min(999, s.latency + 150) };
          }
          return s;
        })
      );
      setTotalRequests((prev) => prev + Math.floor(Math.random() * 80 + 20));
    }, 1200);

    return () => clearInterval(timer);
  }, [architectureMode]);

  // Auto-chaos timer toggle
  useEffect(() => {
    if (autoChaos) {
      intervalRef.current = setInterval(() => {
        triggerChaosMonkey();
      }, 4500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoChaos, servers, architectureMode]);

  const addLogEvent = (type: ChaosEvent['type'], message: string, affectedServerId?: number) => {
    const timeStr = new Date().toLocaleTimeString('pt-BR');
    const newEv: ChaosEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: timeStr,
      type,
      message,
      affectedServerId,
    };
    setEvents((prev) => [newEv, ...prev.slice(0, 15)]);
  };

  const triggerChaosMonkey = () => {
    if (isMonkeyAttacking) return;

    setIsMonkeyAttacking(true);
    soundFx.playChaosMonkeySound();

    // Select a random active healthy server (1 to 5)
    const activeServers = servers.filter((s) => s.status === 'healthy' && !s.isBackup);
    if (activeServers.length === 0) {
      addLogEvent('outage', '⚠️ Todos os servidores ativos já estão offline!');
      setIsMonkeyAttacking(false);
      return;
    }

    const targetServer = activeServers[Math.floor(Math.random() * activeServers.length)];

    // Log Monkey Attack
    addLogEvent('attack', `🐒 Chaos Monkey DERRUBOU o ${targetServer.name} (${targetServer.role})!`, targetServer.id);

    // Turn target server DEAD
    setServers((prev) =>
      prev.map((s) => (s.id === targetServer.id ? { ...s, status: 'dead', load: 0, latency: 0 } : s))
    );

    if (architectureMode === 'fragile') {
      // Fragile mode: Cascade failure!
      soundFx.playSinkingSound();
      setSystemHealth((prev) => Math.max(10, prev - 35));
      setOutageCount((prev) => prev + 1);

      // Overload remaining servers
      setServers((prev) =>
        prev.map((s) =>
          s.id !== targetServer.id && s.status === 'healthy'
            ? { ...s, status: 'failing', load: 98, latency: 850 }
            : s
        )
      );

      addLogEvent('outage', `💥 FALHA EM CASCATA! Sem auto-healing, a carga sobrecarregou o sistema.`);

      setTimeout(() => {
        setIsMonkeyAttacking(false);
      }, 1500);
    } else {
      // Resilient mode: Self-healing failover!
      setSystemHealth((prev) => Math.max(85, prev - 5));

      setTimeout(() => {
        addLogEvent('detection', `🔍 Health Check detectou queda do ${targetServer.name}. Ativando rota de resiliência...`);

        setTimeout(() => {
          // Promote backup server or spin up new instance
          const backup = servers.find((s) => s.isBackup);
          soundFx.playSelfHealingSound();

          setServers((prev) =>
            prev.map((s) => {
              if (s.id === targetServer.id) {
                return { ...s, status: 'rebooting' };
              }
              if (s.isBackup) {
                return { ...s, status: 'healthy', load: 45, latency: 14 };
              }
              return s;
            })
          );

          addLogEvent(
            'failover',
            `⚡ FAILOVER AUTOMÁTICO! ${backup ? backup.name : 'Instância Reserva'} assumiu o tráfego sem queda pro usuário!`
          );
          setRecoveredCount((prev) => prev + 1);
          setSystemHealth(100);

          // Reboot original target server after brief moment
          setTimeout(() => {
            setServers((prev) =>
              prev.map((s) => (s.id === targetServer.id ? { ...s, status: 'healthy', load: 30, latency: 16 } : s))
            );
            addLogEvent('recovered', `✅ ${targetServer.name} foi reiniciado e reintegrado ao cluster.`);
            setIsMonkeyAttacking(false);
          }, 1800);
        }, 1200);
      }, 800);
    }
  };

  const handleResetSystem = () => {
    setServers(INITIAL_SERVERS);
    setSystemHealth(100);
    setIsMonkeyAttacking(false);
    setAutoChaos(false);
    addLogEvent('recovered', '🔄 Sistema reinicializado com topologia saudável.');
  };

  return (
    <section id="modulo-2" className="py-16 bg-white text-slate-900 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            Módulo 02
          </span>
          <span className="text-xs text-slate-500 font-medium">Do Oceano à Nuvem de Computadores</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-sky-950 tracking-tight flex items-center gap-3">
          <span>Engenharia do Caos (Chaos Monkey)</span>
        </h2>

        <p className="mt-3 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Como a <strong>Netflix, Amazon e Google</strong> aplicam o mesmo princípio do barco de Amir Klink? Elas criaram o <em>Chaos Monkey</em>: um robô que <strong>derruba servidores de propósito</strong> no meio do dia para testar se a infraestrutura se recupera sozinha antes que o usuário final perceba qualquer travamento.
        </p>

        {/* Top Control Bar & Architecture Mode Switch */}
        <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="w-full lg:w-auto">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Modo de Arquitetura de TI:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setArchitectureMode('fragile'); handleResetSystem(); }}
                className={`px-4 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  architectureMode === 'fragile'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Sem Resiliência (Tradicional)</span>
              </button>

              <button
                onClick={() => { setArchitectureMode('resilient'); handleResetSystem(); }}
                className={`px-4 py-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  architectureMode === 'resilient'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Com Resiliência (Auto-Healing)</span>
              </button>
            </div>
          </div>

          {/* Attack Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={() => setAutoChaos(!autoChaos)}
              className={`px-4 py-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                autoChaos
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {autoChaos ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{autoChaos ? 'Pausar Modo Caos' : 'Caos Automático'}</span>
            </button>

            <button
              onClick={triggerChaosMonkey}
              disabled={isMonkeyAttacking}
              className={`px-6 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2.5 shadow-md transition-all ${
                isMonkeyAttacking
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 cursor-pointer transform hover:-translate-y-0.5'
              }`}
            >
              <Flame className={`w-5 h-5 ${isMonkeyAttacking ? 'animate-spin' : ''}`} />
              <span>🐒 Soltar o Chaos Monkey!</span>
            </button>

            <button
              onClick={handleResetSystem}
              className="p-3 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer"
              title="Reiniciar Servidores"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Saúde Geral da Nuvem</div>
            <div className="mt-1 text-2xl font-black flex items-center gap-2">
              <span className={systemHealth > 80 ? 'text-emerald-600' : systemHealth > 40 ? 'text-amber-600' : 'text-rose-600'}>
                {systemHealth}%
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Requisições Atendidas</div>
            <div className="mt-1 text-2xl font-black text-sky-600">
              {totalRequests.toLocaleString('pt-BR')}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Auto-Healing bem-sucedidos</div>
            <div className="mt-1 text-2xl font-black text-emerald-600">
              {recoveredCount}
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Quedas Visíveis pro Usuário</div>
            <div className="mt-1 text-2xl font-black text-rose-600">
              {outageCount}
            </div>
          </div>
        </div>

        {/* Server Nodes Visual Grid & Live Telemetry Logs */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Server Nodes Grid (6 Nodes) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {servers.map((server) => {
              const isDead = server.status === 'dead';
              const isFailing = server.status === 'failing';
              const isRebooting = server.status === 'rebooting';
              const isStandby = server.status === 'standby';

              return (
                <motion.div
                  key={server.id}
                  layout
                  className={`relative p-5 rounded-2xl border transition-all ${
                    isDead
                      ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200 text-rose-950 shadow-sm'
                      : isFailing
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 text-amber-950 animate-pulse'
                      : isRebooting
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200 text-sky-950'
                      : isStandby
                      ? 'bg-slate-50 border-slate-200 text-slate-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm'
                  }`}
                >
                  {/* Status Indicator Chip */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        isDead
                          ? 'bg-rose-500 animate-ping'
                          : isFailing
                          ? 'bg-amber-500'
                          : isRebooting
                          ? 'bg-sky-500 animate-spin'
                          : isStandby
                          ? 'bg-slate-400'
                          : 'bg-emerald-500 shadow-sm'
                      }`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {server.name}
                      </span>
                    </div>

                    {server.isBackup && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                        Reserva
                      </span>
                    )}
                  </div>

                  {/* Icon & Role */}
                  <div className="flex items-center gap-3 my-2">
                    <div className={`p-2.5 rounded-xl ${
                      isDead
                        ? 'bg-rose-100 text-rose-600'
                        : isFailing
                        ? 'bg-amber-100 text-amber-600'
                        : isStandby
                        ? 'bg-slate-200 text-slate-500'
                        : 'bg-sky-100 text-sky-600'
                    }`}>
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{server.role}</div>
                      <div className="text-[11px] font-medium text-slate-500">
                        {isDead
                          ? '💥 FORA DO AR (DERRUBADO)'
                          : isFailing
                          ? '⚠️ SOBRECARREGADO'
                          : isRebooting
                          ? '🔄 REINICIANDO...'
                          : isStandby
                          ? '💤 EM ESPERA (STANDBY)'
                          : '🟢 ATIVO & SAUDÁVEL'}
                      </div>
                    </div>
                  </div>

                  {/* Load Bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                      <span>Uso de CPU</span>
                      <span className="font-bold text-slate-900">{server.load}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isDead
                            ? 'bg-rose-600'
                            : server.load > 85
                            ? 'bg-rose-500'
                            : server.load > 60
                            ? 'bg-amber-500'
                            : 'bg-sky-600'
                        }`}
                        style={{ width: `${server.load}%` }}
                      />
                    </div>
                  </div>

                  {/* Latency */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>Latência:</span>
                    <span className={`font-mono font-bold ${server.latency > 500 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {server.latency}ms
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Live Telemetry Log Column */}
          <div className="lg:col-span-4 bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 h-[480px] flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase text-white">Console de Eventos ao Vivo</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Auto-Update</span>
              </div>

              {/* Log List */}
              <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
                <AnimatePresence initial={false}>
                  {events.map((ev) => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-2.5 rounded-lg text-xs font-mono leading-relaxed border ${
                        ev.type === 'attack'
                          ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
                          : ev.type === 'failover' || ev.type === 'recovered'
                          ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                          : ev.type === 'outage'
                          ? 'bg-rose-950/40 border-rose-700/60 text-rose-200'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="text-slate-500 text-[10px] mr-1.5">[{ev.timestamp}]</span>
                      {ev.message}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* Professional Polish Theme Banner Callout */}
        <div className="mt-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-xl text-amber-950 shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded bg-amber-200/60 text-amber-900 shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Lição Central da Engenharia do Caos:</span>
              <p className="text-base sm:text-lg font-bold text-amber-950 mt-0.5">
                "Coisas vão quebrar. O segredo é ter um sistema que se conserte antes que você perceba."
              </p>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed font-medium">
                Ao injetar falhas propositais e controladas durante o dia, os engenheiros aprendem exatamente como a aplicação se comporta sob estresse. Assim, quando um cabo submarino rompe ou um servidor queima às 3h da manhã, a automação <strong>desvira o sistema instantaneamente</strong>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
