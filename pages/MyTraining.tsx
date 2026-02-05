
import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Play, 
  CheckCircle2, 
  Info, 
  Clock, 
  Zap,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Pause,
  RotateCcw,
  Maximize2,
  Volume2,
  X,
  Target
} from 'lucide-react';

const routine = [
  { id: 1, name: 'The Hundred', reps: '10 respirações', focus: 'Ativação Abdominal', done: true, duration: 120 },
  { id: 2, name: 'Leg Circles', reps: '10 cada perna', focus: 'Mobilidade de Quadril', done: false, duration: 180 },
  { id: 3, name: 'Rolling Like a Ball', reps: '8 repetições', focus: 'Equilíbrio e Coluna', done: false, duration: 90 },
  { id: 4, name: 'Single Leg Stretch', reps: '12 repetições', focus: 'Resistência Core', done: false, duration: 120 },
  { id: 5, name: 'Spine Stretch Forward', reps: '5 repetições', focus: 'Alongamento Coluna', done: false, duration: 150 },
];

const MyTraining: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: any;
    if (activeExercise && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeExercise) {
      // Logic for exercise completion
    }
    return () => clearInterval(interval);
  }, [activeExercise, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startExercise = (ex: any) => {
    setActiveExercise(ex);
    setTimeLeft(ex.duration);
    setIsPaused(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-40">
      
      {/* MODO FOCO ATIVO */}
      {activeExercise && (
        <div className="fixed inset-0 bg-slate-950 z-[400] flex flex-col animate-in slide-in-from-bottom duration-500">
           <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12 text-white">
              <button 
                onClick={() => setActiveExercise(null)}
                className="absolute top-10 right-10 p-4 bg-white/5 rounded-full hover:bg-rose-500 transition-all group"
              >
                 <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>

              <div className="text-center space-y-4">
                 <div className="flex items-center justify-center gap-3 text-emerald-400">
                    <Dumbbell size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Executando Agora</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{activeExercise.name}</h2>
                 <p className="text-white/40 text-xl font-medium tracking-widest uppercase">{activeExercise.focus}</p>
              </div>

              {/* CRONÔMETRO GIGANTE */}
              <div className="relative">
                 <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white/5 flex items-center justify-center shadow-[0_0_100px_rgba(16,185,129,0.1)]">
                    <span className="text-7xl md:text-8xl font-black italic tracking-tighter transition-all">{formatTime(timeLeft)}</span>
                    <div 
                      className="absolute inset-0 border-8 border-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ clipPath: `inset(0 0 0 0)`, strokeDasharray: '1000', strokeDashoffset: (timeLeft / activeExercise.duration) * 1000 }}
                    />
                 </div>
              </div>

              <div className="flex items-center gap-6">
                 <button className="p-8 bg-white/5 rounded-[40px] hover:bg-white/10 transition-all"><RotateCcw size={32} /></button>
                 <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 text-white rounded-[50px] flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-110 transition-all active:scale-95"
                 >
                    {isPaused ? <Play size={48} fill="white" /> : <Pause size={48} fill="white" />}
                 </button>
                 <button className="p-8 bg-white/5 rounded-[40px] hover:bg-white/10 transition-all"><Volume2 size={32} /></button>
              </div>

              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 max-w-2xl text-center">
                 <p className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                    <Sparkles size={16} /> Instrução de Respiração
                 </p>
                 <p className="text-xl font-medium italic leading-relaxed text-white/70">
                    Inspire profundamente pelo nariz enquanto prepara o movimento, solte o ar pela boca como se estivesse soprando um canudo ao realizar a força máxima.
                 </p>
              </div>
           </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none mb-2">Treino do <span className="text-emerald-500">Dia</span></h1>
          <p className="text-slate-500 font-medium text-lg">Sua sequência biomecânica personalizada para hoje.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Clock size={20} /></div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Tempo Estimado</p>
                 <p className="text-sm font-black text-slate-900 tracking-tight">25 MINUTOS</p>
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {routine.map((ex, i) => (
             <div key={ex.id} className={`p-8 rounded-[40px] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group ${ex.done ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-2xl'}`}>
                <div className="flex items-center gap-8 flex-1">
                   <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center font-black text-2xl shadow-sm transition-all ${ex.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-950 group-hover:text-white'}`}>
                      {ex.done ? <CheckCircle2 size={32} /> : (i + 1)}
                   </div>
                   <div className="space-y-1">
                      <h3 className={`text-2xl font-black tracking-tighter uppercase italic leading-none ${ex.done ? 'text-emerald-900 line-through' : 'text-slate-950 group-hover:text-emerald-600 transition-colors'}`}>{ex.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-500" /> {ex.reps}</span>
                         <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                         <span className="flex items-center gap-1.5 text-emerald-500/60"><Dumbbell size={14} /> {ex.focus}</span>
                      </div>
                   </div>
                </div>
                {!ex.done && (
                  <button 
                    onClick={() => startExercise(ex)}
                    className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-slate-950 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95 shadow-xl group-hover:-translate-x-2"
                  >
                    Iniciar <Play size={18} fill="currentColor" />
                  </button>
                )}
             </div>
           ))}
        </div>

        {/* SIDEBAR TÉCNICO */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-emerald-500 rounded-[56px] p-10 text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                       <Sparkles size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Dica da IA PilaFlex</span>
                 </div>
                 <p className="text-2xl font-medium leading-relaxed italic mb-8">
                   "Vimos que você completou 12 treinos focados em core. Hoje vamos focar 15% a mais em mobilidade escapular para equilibrar sua postura."
                 </p>
                 <button className="w-full py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all">Ver Detalhes do Ajuste</button>
              </div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
           </div>

           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Próxima Grande Meta</h3>
              <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-xl mb-6 relative">
                    <Target size={32} />
                    <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full" />
                 </div>
                 <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Handstand Controlado</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Faltam 450 XP para desbloquear</p>
                 <div className="w-full h-1.5 bg-slate-200 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%]" />
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default MyTraining;
