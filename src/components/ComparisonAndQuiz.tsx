import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, CheckCircle, XCircle, Award, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion, ComparisonCard } from '../types';
import { soundFx } from '../utils/audio';

const COMPARISON_CARDS: ComparisonCard[] = [
  {
    title: '1. Filosofia de Projeto',
    fragileAspect: {
      label: 'Resistência Rígida',
      description: 'Gasta 100% da energia tentando construir uma armadura que nunca quebre.',
      iconName: 'ShieldAlert',
    },
    resilientAspect: {
      label: 'Resiliência Flexível',
      description: 'Aceita que o impacto virá e projeta o sistema para absorver e desvirar sozinho.',
      iconName: 'RefreshCw',
    },
    realWorldExample: 'Um barco rígido afunda com a onda gigante; o barco João Bobo capota e volta em pé em 3 segundos.',
  },
  {
    title: '2. Tratamento de Falhas',
    fragileAspect: {
      label: 'Evitar Erros a Todo Custo',
      description: 'Considera qualquer falha como um desastre inaceitável e punitivo.',
      iconName: 'XCircle',
    },
    resilientAspect: {
      label: 'Design para Recuperação',
      description: 'Mede o sucesso pela velocidade de resposta e reconstrução (MTTR instantâneo).',
      iconName: 'CheckCircle',
    },
    realWorldExample: 'Se um servidor cai no sistema tradicional, o site sai do ar; no sistema resiliente, um standby assume em milissegundos.',
  },
  {
    title: '3. Atitude Perante o Caos',
    fragileAspect: {
      label: 'Torcer para Não Acontecer',
      description: 'Reza para a tempestade passar longe e entra em pânico quando o imprevisto surge.',
      iconName: 'ShieldAlert',
    },
    resilientAspect: {
      label: 'Engenharia do Caos (Provocação)',
      description: 'Provoca falhas pequenas no dia a dia para garantir que o sistema esteja imune ao caos.',
      iconName: 'Sparkles',
    },
    realWorldExample: 'O Chaos Monkey da Netflix derruba serviços em horário comercial para treinar a automação.',
  },
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    concept: 'História do Barco João Bobo',
    question: 'Em uma tempestade no oceano, qual é a principal vantagem do barco "João Bobo" de Amir Klink em relação a um barco rígido tradicional?',
    options: [
      {
        id: 'a',
        text: 'Ele é feito de aço inquebrável para impedir que qualquer onda consiga virá-lo.',
        isCorrect: false,
        explanation: 'Incorreto! Tentar ser inquebrável faz a estrutura rachar quando a onda é muito forte.',
      },
      {
        id: 'b',
        text: 'Ele aceita que vai capotar com a onda, mas seu lastro e formato curvo o fazem desvirar sozinho em segundos.',
        isCorrect: true,
        explanation: 'Exato! Em vez de gastar energia tentando não virar, ele é projetado para voltar em pé automaticamente.',
      },
      {
        id: 'c',
        text: 'Ele possui motores potentes para fugir das tempestades antes que elas cheguem.',
        isCorrect: false,
        explanation: 'Incorreto! Amir Klink fez a travessia a remo, sem motores.',
      },
    ],
  },
  {
    id: 2,
    concept: 'Engenharia do Caos na Tecnologia',
    question: 'Por que empresas como a Netflix criaram robôs como o "Chaos Monkey" para desligar servidores de propósito?',
    options: [
      {
        id: 'a',
        text: 'Para testar e garantir que os sistemas de recuperação automática (auto-healing) funcionam antes que ocorra um acidente real.',
        isCorrect: true,
        explanation: 'Perfeito! Injetar o caos de forma controlada garante que o sistema se conserte sozinho sem o cliente perceber.',
      },
      {
        id: 'b',
        text: 'Para economizar energia desligando computadores que ninguém está usando.',
        isCorrect: false,
        explanation: 'Incorreto! O objetivo é testar a resiliência sob estresse.',
      },
      {
        id: 'c',
        text: 'Para punir os engenheiros de software que cometeram erros de código.',
        isCorrect: false,
        explanation: 'Incorreto! A cultura de resiliência é sem culpa, focada na automação do sistema.',
      },
    ],
  },
  {
    id: 3,
    concept: 'Design para Recuperação',
    question: 'Qual é a mudança de pensamento fundamental defendida pela "Engenharia da Resiliência"?',
    options: [
      {
        id: 'a',
        text: 'Garantir que os humanos nunca cometam erros e que as máquinas nunca falhem.',
        isCorrect: false,
        explanation: 'Incorreto! Achar que nunca haverá falhas é um mito perigoso.',
      },
      {
        id: 'b',
        text: 'Trocar a obsessão por "nunca errar" pelo foco em "garantir a recuperação rápida e automática de falhas".',
        isCorrect: true,
        explanation: 'Corretíssimo! Coisas vão quebrar; a resiliência é a capacidade de voltar ao normal rapidamente.',
      },
      {
        id: 'c',
        text: 'Desistir de usar tecnologia complexa e voltar aos processos totalmente manuais.',
        isCorrect: false,
        explanation: 'Incorreto! A tecnologia resiliente abraça a complexidade com automação inteligente.',
      },
    ],
  },
];

export const ComparisonAndQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId !== null) return; // Prevent double answer

    setSelectedOptionId(optionId);
    const selected = currentQuestion.options.find((o) => o.id === optionId);

    if (selected?.isCorrect) {
      soundFx.playQuizCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundFx.playQuizWrong();
    }

    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setUserAnswers({});
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <section id="modulo-3" className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            Módulo 03
          </span>
          <span className="text-xs text-slate-500 font-medium">Comparativo + Quiz Gamificado</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-sky-950 tracking-tight">
          Resumo Didático & Fixação do Aprendizado
        </h2>
        
        <p className="mt-3 text-slate-600 max-w-3xl text-sm sm:text-base leading-relaxed">
          Compare lado a lado as duas mentalidades e teste seus conhecimentos com nosso quiz rápido interativo para receber seu <strong>Certificado de Aprendizado em Resiliência</strong>.
        </p>

        {/* Part 1: Comparative Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COMPARISON_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-extrabold text-sky-950 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>{card.title}</span>
                </h3>

                {/* Fragile Box */}
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 mb-3">
                  <div className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">
                    ❌ Antes: {card.fragileAspect.label}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {card.fragileAspect.description}
                  </p>
                </div>

                {/* Resilient Box */}
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    ✅ Depois: {card.resilientAspect.label}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {card.resilientAspect.description}
                  </p>
                </div>
              </div>

              {/* Example */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 italic font-medium">
                💡 <strong>Na prática:</strong> {card.realWorldExample}
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Interactive Quiz Component */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mx-auto">
            
            {!isQuizCompleted ? (
              <div>
                {/* Quiz Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
                  <div>
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                      Quiz Rápido de Fixação ({currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length})
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {currentQuestion.concept}
                    </h3>
                  </div>

                  {/* Progress Pill */}
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Pontuação: {score}</span>
                  </div>
                </div>

                {/* Question Prompt */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
                  {currentQuestion.question}
                </h4>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isAnswered = selectedOptionId !== null;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-3 cursor-pointer ${
                          isAnswered
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                              : isSelected
                              ? 'bg-rose-50 border-rose-400 text-rose-950 font-medium'
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 mt-0.5 shadow-sm">
                          {opt.id.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium">{opt.text}</span>
                          
                          {/* Feedback Explanation */}
                          {isAnswered && isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-2 text-xs font-bold pt-2 border-t border-slate-200 flex items-center gap-1.5"
                            >
                              {opt.isCorrect ? (
                                <span className="text-emerald-700 flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  {opt.explanation}
                                </span>
                              ) : (
                                <span className="text-rose-700 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" />
                                  {opt.explanation}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Next Question Button */}
                {selectedOptionId !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex justify-end"
                  >
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                          ? 'Próxima Pergunta'
                          : 'Ver Resultado Final'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Quiz Certificate Result Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-600 via-amber-500 to-emerald-600 p-1 flex items-center justify-center shadow-lg mb-6">
                  <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                    <Award className="w-10 h-10 text-amber-500 animate-bounce" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-sky-950">
                  Parabéns! Jornada Concluída!
                </h3>

                <p className="mt-2 text-sm sm:text-base text-slate-600 font-medium">
                  Você acertou <strong className="text-emerald-700">{score}</strong> de {QUIZ_QUESTIONS.length} perguntas e agora compreende a essência da <strong>Engenharia da Resiliência</strong>!
                </p>

                {/* Certificate Card */}
                <div className="mt-8 p-6 rounded-2xl bg-sky-50 border border-sky-200 text-left relative overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold text-sky-800 uppercase tracking-widest">
                      Certificado de Aprendizado
                    </div>
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  
                  <div className="text-lg font-black text-sky-950">
                    Engenheiro(a) de Sistemas Resilientes
                  </div>
                  
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed font-medium">
                    Certificamos que você dominou a mudança de mindset: de <em>"tentar ser 100% inquebrável"</em> para <em>"projetar sistemas com recuperação rápida e automática de falhas (Design para Recuperação)"</em>.
                  </p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm inline-flex items-center gap-2 border border-slate-200 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-sky-600" />
                    <span>Refazer o Quiz</span>
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
