
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
  Zap,
  Star,
  Activity
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Seg', alunos: 12, faturamento: 400 },
  { name: 'Ter', alunos: 19, faturamento: 700 },
  { name: 'Qua', alunos: 15, faturamento: 500 },
  { name: 'Qui', alunos: 22, faturamento: 850 },
  { name: 'Sex', alunos: 18, faturamento: 600 },
  { name: 'Sab', alunos: 10, faturamento: 300 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 xl:p-12 space-y-8 md:space-y-12 animate-in fade-in duration-700 max-w-[1600px] mx-auto overflow-x-hidden">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em]">Ambiente Ativo</span>
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Bem-vindo, Carlos!</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Sua clínica está operando com <span className="text-emerald-500 font-bold">94% de eficiência</span> hoje.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 md:p-4 rounded-3xl border border-slate-100 shadow-sm self-start md:self-auto">
           <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Data do Sistema</p>
              <p className="text-xs font-black text-slate-800 uppercase italic">12 Dez, 2024</p>
           </div>
           <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <CalendarIcon size={20} />
           </div>
        </div>
      </header>

      {/* Stats Grid - Responsivo de 1 a 4 colunas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Alunos Totais', value: '124', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+5%', up: true },
          { label: 'Ocupação', value: '88%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', trend: '+12%', up: true },
          { label: 'NPS Score', value: '9.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', trend: '+0.2', up: true },
          { label: 'Health Index', value: 'Ótimo', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', trend: 'Estável', up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between hover:border-emerald-200 transition-all group">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={20} />
              </div>
              <span className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Gráfico principal que se adapta */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-slate-100 min-h-[400px]">
          <div className="flex justify-between items-center mb-10">
             <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Fluxo Semanal</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Frequência agrupada</p>
             </div>
             <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl">
                <TrendingUp size={20} />
             </div>
          </div>
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlunos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="alunos" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAlunos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-ins lateral que desce em mobile */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter italic">Check-ins</h3>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">Hoje</span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[400px]">
            {[
              { name: 'Maria Oliveira', time: '14:00', type: 'Solo', avatar: 'M' },
              { name: 'João Santos', time: '15:30', type: 'Reformer', avatar: 'J' },
              { name: 'Carla Dias', time: '16:00', type: 'Cadillac', avatar: 'C' },
              { name: 'Pedro Lima', time: '17:30', type: 'Solo', avatar: 'P' },
            ].map((aula, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm">
                    {aula.avatar}
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase tracking-tight text-xs">{aula.name}</p>
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{aula.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 tracking-tighter text-sm">{aula.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full bg-slate-50 py-4 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
             Ver Todos
          </button>
        </div>
      </div>

      {/* Insight Bar - Ajustado para empilhar em mobile */}
      <div className="bg-slate-950 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
         <div className="relative z-10 flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
               <Zap className="text-emerald-400" size={20} />
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">Insight Estratégico</span>
            </div>
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-black tracking-tighter uppercase italic leading-[1.1] mb-4">
               Sua retenção subiu <span className="text-emerald-400">12%</span> este mês.
            </h2>
            <p className="text-white/40 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
               Alunos de Reformer Avançado renovam 3x mais. Considere abrir horários premium no período matutino para maximizar o LTV.
            </p>
         </div>
         <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] text-center flex-1">
               <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Churn</p>
               <p className="text-2xl font-black text-emerald-400">2.4%</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] text-center flex-1">
               <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">LTV</p>
               <p className="text-2xl font-black text-emerald-400">R$ 2.1k</p>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Dashboard;
