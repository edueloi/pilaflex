
import React, { useState } from 'react';
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
  Heart,
  Flame,
  Crown,
  TrendingUp,
  Smile,
  Frown,
  BatteryMedium,
  Camera,
  Medal
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
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 lg:p-10 space-y-10 animate-in fade-in duration-700 max-w-[1500px] mx-auto pb-40">
      
      {/* HEADER DINÂMICO COM PONTUAÇÃO */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Athlete Performance Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Boa tarde, <span className="text-emerald-500">Demo!</span></h1>
          <p className="text-slate-500 font-medium text-lg italic">"O corpo alcança o que a mente acredita."</p>
        </div>

        <div className="flex gap-4">
           <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-emerald-500 transition-all">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                 <Flame size={24} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Streak Atual</p>
                 <p className="text-xl font-black text-slate-900 italic tracking-tighter">12 DIAS</p>
              </div>
           </div>
           <div className="bg-slate-950 p-4 rounded-3xl text-white flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                 <Medal size={24} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-emerald-400/50 uppercase tracking-widest leading-none mb-1">PilaPoints</p>
                 <p className="text-xl font-black italic tracking-tighter text-white">2.450 XP</p>
              </div>
           </div>
        </div>
      </header>

      {/* BIO-FEEDBACK: CHECK-IN DE ENERGIA */}
      <section className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm overflow-hidden relative group">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
               <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">Como está seu <span className="text-emerald-500">Flow</span> hoje?</h3>
               <p className="text-slate-400 text-sm font-medium">Ajustaremos sua rotina de acordo com sua disposição.</p>
            </div>
            <div className="flex gap-4">
               {[
                 { id: 'low', icon: Frown, label: 'Baixa', color: 'rose' },
                 { id: 'mid', icon: BatteryMedium, label: 'Normal', color: 'amber' },
                 { id: 'high', icon: Smile, label: 'Foco Total', color: 'emerald' },
               ].map(m => (
                 <button 
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-[32px] border-2 transition-all min-w-[110px] ${mood === m.id ? `bg-${m.color}-500 border-${m.color}-500 text-white shadow-xl scale-105` : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200'}`}
                 >
                   <m.icon size={28} />
                   <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                 </button>
               ))}
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-colors" />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LADO ESQUERDO: TREINOS E RANKING */}
        <div className="xl:col-span-8 space-y-8">
           {/* TREINO EM DESTAQUE */}
           <div className="bg-slate-900 rounded-[56px] p-2 relative overflow-hidden group shadow-2xl">
              <div className="relative aspect-video lg:aspect-[21/9] rounded-[48px] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1518611012118-29a8d63a80ec?q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Aula" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">Próximo na lista</span>
                       <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1"><Zap size={12} className="text-amber-500" /> 450 kcal est.</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-6">Power Pilates: <br /> <span className="text-emerald-400">Core de Ferro</span></h2>
                    <div className="flex flex-wrap items-center gap-4">
                       <button className="bg-white text-slate-950 px-10 py-5 rounded-[28px] flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95">
                          <Play size={20} fill="currentColor" /> Iniciar Agora
                       </button>
                       <div className="flex items-center gap-3 text-white/60">
                          <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center font-black text-xs">C</div>
                          <p className="text-sm font-bold">Prof. Carlos Alberto</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* RANKING DA COMUNIDADE */}
           <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Ranking da <span className="text-emerald-500">Unidade</span></h3>
                 <button className="text-[10px] font-black uppercase text-slate-400 hover:text-emerald-600 transition-colors">Ver Global <ChevronRight size={14} className="inline" /></button>
              </div>
              <div className="space-y-4">
                 {[
                   { pos: 1, name: 'Juliana Paes', points: '12.400', level: 'Pila-God', icon: Crown },
                   { pos: 2, name: 'Marcos Frota', points: '9.850', level: 'Mestre', icon: Star },
                   { pos: 3, name: 'Você (Demo)', points: '2.450', level: 'Iniciante Pro', isUser: true },
                 ].map((player, i) => (
                   <div key={i} className={`flex items-center justify-between p-6 rounded-[32px] transition-all ${player.isUser ? 'bg-emerald-500 text-white shadow-xl scale-[1.02] border-emerald-400' : 'bg-slate-50 border border-slate-100 hover:border-emerald-200'}`}>
                      <div className="flex items-center gap-6">
                         <span className={`text-2xl font-black italic w-8 ${player.isUser ? 'text-emerald-200' : 'text-slate-300'}`}>#{player.pos}</span>
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${player.isUser ? 'bg-white text-emerald-600' : 'bg-slate-900 text-white'}`}>
                            {player.name[0]}
                         </div>
                         <div>
                            <p className="font-black text-lg uppercase italic tracking-tighter leading-none">{player.name}</p>
                            <p className={`text-[10px] font-bold uppercase mt-1 tracking-widest ${player.isUser ? 'text-emerald-100' : 'text-slate-400'}`}>{player.level}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xl font-black italic tracking-tighter">{player.points}</p>
                         <p className={`text-[8px] font-black uppercase ${player.isUser ? 'text-emerald-100' : 'text-slate-400'}`}>PilaPoints</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* LADO DIREITO: EVOLUÇÃO E METAS */}
        <div className="xl:col-span-4 space-y-8">
           {/* GALERIA DE EVOLUÇÃO */}
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Minha <span className="text-emerald-500">Evolução</span></h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-[3/4] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-emerald-500 transition-all cursor-pointer">
                    <Camera size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Antes</span>
                 </div>
                 <div className="aspect-[3/4] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-emerald-500 transition-all cursor-pointer">
                    <Camera size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Depois</span>
                 </div>
              </div>
              <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl">Ver Biometria Completa</button>
           </div>

           {/* DESEMPENHO GRÁFICO */}
           <div className="bg-slate-950 p-8 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Frequência</p>
                       <h4 className="text-2xl font-black italic tracking-tighter">BIO-STATS</h4>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-xl"><TrendingUp size={20} className="text-emerald-400" /></div>
                 </div>
                 <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={activityData}>
                          <defs>
                             <linearGradient id="colorEsforco" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="esforco" stroke="#10b981" strokeWidth={3} fill="url(#colorEsforco)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="mt-8 flex justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/5">
                    <div>
                       <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">Meta Semanal</p>
                       <p className="text-sm font-black text-emerald-400">3/4 AULAS</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-black text-[10px]">75%</div>
                 </div>
              </div>
           </div>

           {/* FEEDBACK DO PROFESSOR REESTILIZADO */}
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-slate-100 rounded-[20px] flex items-center justify-center font-black text-slate-400">C</div>
                 <div>
                    <h4 className="text-sm font-black text-slate-950 uppercase italic tracking-tighter leading-none">Prof. Carlos</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Feedback Técnico</p>
                 </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-[32px] relative italic text-slate-600 text-sm font-medium leading-relaxed">
                 <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 rotate-45" />
                 "Sua estabilidade de cintura escapular melhorou 20% no Reformer. Foco no próximo treino: controle respiratório no Hundred."
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
