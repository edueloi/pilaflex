
import React from 'react';
import { 
  Trophy, 
  Play, 
  Calendar, 
  Zap, 
  Star, 
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Target,
  Heart
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const activityData = [
  { day: 'Seg', esforco: 80 },
  { day: 'Ter', esforco: 65 },
  { day: 'Qua', esforco: 90 },
  { day: 'Qui', esforco: 0 },
  { day: 'Sex', esforco: 75 },
  { day: 'Sab', esforco: 40 },
  { day: 'Dom', esforco: 0 },
];

const StudentDashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Minha Jornada PilaFlex</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Olá, Aluno Demo!</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Você completou <span className="text-emerald-500 font-bold">85% da sua meta</span> semanal.</p>
        </div>
        <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
           <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center font-black">
              <Trophy size={24} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nível Atual</p>
              <p className="text-lg font-black text-slate-900 italic tracking-tighter">PILA-MASTER 1</p>
           </div>
        </div>
      </header>

      {/* Main Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-8 bg-white p-1 rounded-[40px] shadow-sm border border-slate-100 overflow-hidden group">
           <div className="p-8 pb-4">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Continuar de onde parou</h3>
           </div>
           <div className="p-2">
              <div className="relative aspect-video lg:aspect-[21/9] rounded-[32px] overflow-hidden">
                 <img src="https://picsum.photos/seed/pilates-learn/1200/600" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Curso" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-8 flex flex-col justify-end">
                    <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg w-fit uppercase tracking-widest mb-4">Módulo 2: Core Intenso</span>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-tight mb-2">Anatomia do Movimento Flow</h2>
                    <div className="flex items-center gap-6">
                       <button className="bg-white text-slate-900 p-4 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
                          <Play size={16} fill="currentColor" /> Assistir Agora
                       </button>
                       <div className="flex-1 max-w-xs space-y-2">
                          <div className="flex justify-between text-[10px] font-black text-white/40 uppercase tracking-widest">
                             <span>Aula 4 de 12</span>
                             <span>65% Concluído</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Next Class / Feedback */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                    <div className="bg-emerald-500 p-3 rounded-2xl shadow-xl shadow-emerald-500/20">
                       <Calendar size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Próxima Aula</span>
                 </div>
                 <p className="text-4xl font-black tracking-tighter uppercase italic mb-1 leading-none">Amanhã</p>
                 <p className="text-3xl font-black text-emerald-400 tracking-tighter italic mb-4">08:00 AM</p>
                 <div className="bg-white/5 p-5 rounded-3xl border border-white/10 mb-8">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Local & Instrutor</p>
                    <p className="text-sm font-bold">Studio Matriz &bull; Prof. Carlos</p>
                    <p className="text-xs text-emerald-100/40">Reformer Duo &bull; 55min</p>
                 </div>
                 <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-emerald-500 hover:text-white transition-all">Ver Detalhes</button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -mr-10 -mt-10"></div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Recado do Professor</h3>
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400">C</div>
                 <div className="flex-1 bg-slate-50 p-4 rounded-3xl border border-slate-100 relative">
                    <div className="absolute left-0 top-6 -translate-x-1 w-2 h-2 bg-slate-50 rotate-45 border-l border-b border-slate-100"></div>
                    <p className="text-xs font-bold text-slate-700 leading-relaxed italic">
                      "Excelente evolução no Cadillac ontem! Continue focando na pelve neutra. Te espero na aula de amanhã."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Stats */}
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Consistência</h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Nível de Esforço Semanal</p>
               </div>
               <Zap className="text-amber-500" size={24} />
            </div>
            <div className="h-40">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                     <defs>
                        <linearGradient id="colorEsforco" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                     <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Area type="monotone" dataKey="esforco" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEsforco)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Goals Card */}
         <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center mb-2">
               <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Minhas Metas</h3>
               <Target className="text-emerald-500" size={24} />
            </div>
            {[
               { label: 'Mobilidade Coluna', progress: 85, color: 'bg-blue-500' },
               { label: 'Força Core', progress: 42, color: 'bg-emerald-500' },
               { label: 'Flexibilidade', progress: 60, color: 'bg-amber-500' },
            ].map((goal, i) => (
               <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <span>{goal.label}</span>
                     <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                     <div className={`h-full ${goal.color} rounded-full`} style={{ width: `${goal.progress}%` }}></div>
                  </div>
               </div>
            ))}
            <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:border-emerald-200 hover:text-emerald-500 transition-all">Ver Histórico de Metas</button>
         </div>

         {/* Health Index Card */}
         <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
               <div className="flex items-center gap-2 text-emerald-600">
                  <Heart size={20} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">PilaFlex Health Index</span>
               </div>
               <h3 className="text-3xl font-black text-emerald-900 tracking-tighter uppercase italic">Saúde de Ferro</h3>
               <p className="text-emerald-800/60 text-xs font-medium leading-relaxed">
                  Sua postura melhorou significativamente nos últimos 30 dias. A frequência cardíaca média durante as aulas de solo está mais estável.
               </p>
            </div>
            <div className="pt-6">
               <div className="flex items-center gap-4 bg-white/60 p-4 rounded-3xl">
                  <div className="bg-emerald-500 text-white p-3 rounded-2xl"><Star size={20} /></div>
                  <div>
                     <p className="text-sm font-black text-emerald-900">Nível 8.2</p>
                     <p className="text-[10px] font-bold text-emerald-600/60 uppercase">Evolução Postural</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
