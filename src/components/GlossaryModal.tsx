import React from 'react';
import { X, BookOpen, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_TERMS = [
  {
    term: 'Barco João Bobo (Self-Righting)',
    category: 'Engenharia Naval',
    definition: 'Embarcação projetada com centro de gravidade baixíssimo e formato de cabine arredondada. Caso vire de ponta-cabeça 180° com uma onda gigante, a própria física e a gravidade o forçam a desvirar sozinho em segundos.',
  },
  {
    term: 'Engenharia do Caos (Chaos Engineering)',
    category: 'Tecnologia & Nuvem',
    definition: 'Disciplina na computação onde engenheiros injetam falhas propositais e controladas em sistemas em produção para descobrir pontos fracos antes que acidentes reais aconteçam.',
  },
  {
    term: 'Chaos Monkey',
    category: 'Ferramenta da Netflix',
    definition: 'Robô criado pela Netflix em 2011 que desliga aleatoriamente instâncias de servidores no ambiente de produção para garantir que os serviços continuem funcionando sem interrupção para o usuário.',
  },
  {
    term: 'MTTR (Mean Time To Recovery)',
    category: 'Métrica de Qualidade',
    definition: 'Tempo Médio de Recuperação. Mede quanto tempo um sistema leva para voltar ao ar após uma falha. A Engenharia da Resiliência foca em diminuir o MTTR para milissegundos.',
  },
  {
    term: 'Auto-Healing (Auto-Cura)',
    category: 'Automação',
    definition: 'Capacidade de um software monitorar a própria saúde e substituir peças ou servidores quebrados por réplicas saudáveis sem nenhuma intervenção humana.',
  },
  {
    term: 'Failover (Transbordo Automático)',
    category: 'Infraestrutura',
    definition: 'Mecanismo de segurança que redireciona automaticamente o tráfego de dados para um servidor standby de reserva no exato momento em que o servidor principal falha.',
  },
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col text-slate-900"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-800">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-sky-950">Glossário Descomplicado</h3>
                  <p className="text-xs text-slate-500 font-medium">Termos didáticos explicados para leigos</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Terms List */}
            <div className="mt-6 space-y-4 overflow-y-auto pr-2 flex-1">
              {GLOSSARY_TERMS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-sky-950">{item.term}</span>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs cursor-pointer shadow-sm"
              >
                Entendi, voltar à jornada
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
