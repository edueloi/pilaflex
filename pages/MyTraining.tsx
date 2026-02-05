
import React, { useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  CheckCircle2, 
  Info, 
  Clock, 
  Zap,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const routine = [
  { id: 1, name: 'The Hundred', reps: '10 respirações', focus: 'Ativação Abdominal', done: true, video: '#' },
  { id: 2, name: 'Leg Circles', reps: '10 cada perna', focus: 'Mobilidade de Quadril', done: true, video: '#' },
  { id: 3, name: 'Rolling Like a Ball', reps: '8 repetições', focus: 'Equilíbrio e Coluna', done: false, video: '#' },
  { id: 4, name: 'Single Leg Stretch', reps: '12 repetições', focus: 'Resistência Core', done: false, video: '#' },
  { id: 5, name: 'Spine Stretch Forward', reps: '5 repetições', focus: 'Alongamento Coluna', done: false, video: '#' },
];

const MyTraining: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none mb-2">Treino do Dia</h1>
          <p className="text-slate-500 font-medium">Siga a rotina preparada especialmente pelo seu instrutor.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <Clock className="text-emerald-500" size={18} />
              <span className="font-black text-xs text-slate-700 uppercase tracking-widest">45 Minutos</span>
           </div>
           <button className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2">
             Iniciar Treino <Play size={18} fill="currentColor" />
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Exercise List */}
        <div className="lg:col-span-8 space-y-4">
           {routine.map((ex, i) => (
             <div key={ex.id} className={`p-6 rounded-[32px] border transition-all flex items-center justify-between group ${ex.done ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-xl'}`}>
                <div className="flex items-center gap-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm ${ex.done ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-300'}`}>
                      {ex.done ? <CheckCircle2 size={28} /> : (i + 1)}
                   </div>
                   <div>
                      <h3 className={`text-xl font-black tracking-tighter uppercase italic leading-none mb-1 ${ex.done ? 'text-emerald-900 line-through opacity-50' : 'text-slate-900'}`}>{ex.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span className="flex items-center gap-1"><Zap size={12} className="text-amber-500" /> {ex.reps}</span>
                         <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                         <span className="flex items-center gap-1"><Info size={12} /> {ex.focus}</span>
                      </div>
                   </div>
                </div>
                {!ex.done && (
                  <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                    <Play size={20} fill="currentColor" />
                  </button>
                )}
             </div>
           ))}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="text-emerald-400" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Dica do Pila-Bot AI</span>
                 </div>
                 <p className="text-xl font-medium leading-relaxed italic mb-8">
                   "Lembre-se de manter os ombros longe das orelhas durante o Hundred. A respiração deve ser curta e vigorosa!"
                 </p>
                 <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Nível de Intensidade</p>
                       <p className="text-lg font-black text-emerald-400">Moderado</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                       <Zap size={20} className="text-amber-500" />
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mb-32 -mr-32"></div>
           </div>

           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Próximo Desafio</h3>
              <div className="p-1 rounded-[32px] bg-slate-50 border border-slate-100 group cursor-pointer hover:bg-white transition-all">
                 <div className="relative aspect-video rounded-[28px] overflow-hidden mb-4">
                    <img src="https://picsum.photos/seed/challenge/400/250" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Challenge" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="bg-white text-slate-900 p-4 rounded-full shadow-2xl"><Play size={20} fill="currentColor" /></div>
                    </div>
                 </div>
                 <div className="px-4 pb-4">
                    <h4 className="font-black text-slate-900 uppercase tracking-tighter italic">Pilates Hiit: Core Explosivo</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Disponível em 2 dias</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyTraining;
