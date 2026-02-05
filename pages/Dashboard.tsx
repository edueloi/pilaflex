
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
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Studio Online & Ativo</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Bem-vindo, Prof. Carlos!</h1>
          <p className="text-slate-500 font-medium text-lg mt-2">Sua clínica está operando com <span className="text-emerald-500 font-bold">94% de eficiência</span> hoje.</p>
        </div>
        <div className="hidden lg:flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data do Sistema</p>
              <p className="text-sm font-black text-slate-800 uppercase italic">12 de Dezembro, 2024</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <CalendarIcon size={24} />
           </div>
        </div>
      </header>

      {/* Health & Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Alunos Totais', value: '124', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+5%', up: true },
          { label: 'Ocupação Mensal', value: '88%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50', trend: '+12%', up: true },
          { label: 'NPS Score', value: '9.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50', trend: '+0.2', up: true },
          { label: 'Health Index', value: 'Ótimo', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', trend: 'Estável', up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between hover:scale-[1.02] transition-all cursor-default">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10">
             <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Fluxo de Alunos</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Frequência semanal agrupada</p>
             </div>
             <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <TrendingUp size={24} />
             </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAlunos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px'}}
                />
                <Area type="monotone" dataKey="alunos" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorAlunos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Schedule List */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 flex flex-col h-full group">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Check-ins Pendentes</h3>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg">Próximas 4 horas</span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {[
              { name: 'Maria Oliveira', time: '14:00', type: 'Pilates Solo', level: 'Interm.', avatar: 'M' },
              { name: 'João Santos', time: '15:30', type: 'Reformer Duo', level: 'Avançado', avatar: 'J' },
              { name: 'Carla Dias', time: '16:00', type: 'Cadillac Pro', level: 'Gestante', avatar: 'C' },
              { name: 'Pedro Lima', time: '17:30', type: 'Solo Iniciante', level: 'Inic.', avatar: 'P' },
            ].map((aula, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group/item">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg group-hover/item:scale-110 transition-transform">
                    {aula.avatar}
                  </div>
                  <div>
                    <p className="font-black text-slate-800 uppercase tracking-tight leading-none mb-1">{aula.name}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{aula.type}</span>
                       <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                       <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{aula.level}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-900 tracking-tighter text-xl leading-none">{aula.time}</p>
                  <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline mt-1">Check-in</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full bg-slate-50 py-4 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-inner">
             Ver Agenda Completa
          </button>
        </div>
      </div>

      {/* Analytics Insights */}
      <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 group">
         <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
               <Zap className="text-emerald-400 fill-emerald-400" size={24} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Insight Estratégico do Dia</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic leading-[1.1] mb-6">
               Sua retenção de alunos subiu <span className="text-emerald-400">12%</span> em relação ao mês anterior.
            </h2>
            <p className="text-emerald-100/60 text-lg font-medium leading-relaxed">
               Os alunos que participam das aulas de Reformer Avançado têm 3x mais chances de renovar seus planos trimestrais. 
               Considere abrir mais 2 horários nesta modalidade.
            </p>
         </div>
         <div className="relative z-10 grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] text-center group-hover:bg-white/10 transition-all">
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Taxa Churn</p>
               <p className="text-4xl font-black text-emerald-400">2.4%</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] text-center group-hover:bg-white/10 transition-all">
               <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">LTV Médio</p>
               <p className="text-4xl font-black text-emerald-400">R$ 2k</p>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-20 -mt-20"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -ml-10 -mb-10"></div>
      </div>
    </div>
  );
};

export default Dashboard;
