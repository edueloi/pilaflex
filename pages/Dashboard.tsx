
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
  Activity,
  DollarSign,
  UserPlus,
  PlusCircle,
  MessageSquare,
  ChevronRight,
  Target,
  AlertCircle
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const mainChartData = [
  { name: 'Seg', aulas: 45, receita: 1200 },
  { name: 'Ter', aulas: 52, receita: 1800 },
  { name: 'Qua', aulas: 48, receita: 1400 },
  { name: 'Qui', aulas: 61, receita: 2100 },
  { name: 'Sex', aulas: 55, receita: 1900 },
  { name: 'Sab', aulas: 30, receita: 900 },
];

const retentionData = [
  { name: 'Ativos', value: 85, color: '#10b981' },
  { name: 'Risco', value: 10, color: '#f59e0b' },
  { name: 'Churn', value: 5, color: '#f43f5e' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 xl:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto overflow-x-hidden pb-40">
      
      {/* HEADER DINÂMICO COM AÇÕES RÁPIDAS */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Live Intelligence Update</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Status do <span className="text-emerald-500">Negócio</span></h1>
          <p className="text-slate-500 font-medium text-base md:text-lg">Olá Carlos, seu faturamento está <span className="text-emerald-500 font-bold">12% acima</span> da meta projetada.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <button className="flex items-center gap-3 px-6 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl active:scale-95 group">
              <UserPlus size={18} className="group-hover:rotate-12 transition-transform" /> Matricular Aluno
           </button>
           <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-emerald-500 transition-all shadow-sm active:scale-95">
              <PlusCircle size={18} className="text-emerald-500" /> Novo Lançamento
           </button>
           <div className="w-px h-10 bg-slate-200 mx-2 hidden md:block" />
           <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Fechamento Mensal</p>
                 <p className="text-xs font-black text-slate-800 italic uppercase">Em 19 Dias</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                 <CalendarIcon size={20} />
              </div>
           </div>
        </div>
      </header>

      {/* CORE BUSINESS METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Receita Bruta', value: 'R$ 42.850', trend: '+18.4%', up: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Alunos Ativos', value: '142', trend: '+12', up: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Ticket Médio', value: 'R$ 302', trend: '-2.1%', up: false, icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Aulas Realizadas', value: '894', trend: '+142', up: true, icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:border-emerald-200 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:rotate-6 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-xl ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
              </span>
            </div>
            <div className="mt-8 relative z-10">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-950 tracking-tighter italic">{stat.value}</p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-50 transition-colors" />
          </div>
        ))}
      </div>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Central Chart */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 flex flex-col">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
             <div>
                <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">Performance <span className="text-emerald-500">Financeira</span></h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">Comparativo Receita vs Volume de Aulas</p>
             </div>
             <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
                <button className="px-6 py-2 bg-white text-slate-950 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm">Receita</button>
                <button className="px-6 py-2 text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-slate-600">Aulas</button>
             </div>
          </div>
          
          <div className="flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mainChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px'}} 
                  itemStyle={{fontFamily: 'Outfit', fontWeight: 800, textTransform: 'uppercase', fontSize: '10px'}}
                />
                <Area type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorRec)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
           {/* In-Studio Now Widget */}
           <div className="bg-slate-950 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl h-full">
              <div className="relative z-10">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">No Studio <span className="text-emerald-500">Agora</span></h3>
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black animate-pulse uppercase tracking-widest">Live</span>
                 </div>

                 <div className="space-y-4">
                    {[
                      { name: 'Maria Eduarda', type: 'Reformer Pro', time: '14:00 - 15:00', avatar: 'ME' },
                      { name: 'João Victor', type: 'Solo Mat', time: '14:00 - 15:00', avatar: 'JV' },
                      { name: 'Carla Silveira', type: 'Cadillac Individual', time: '15:15 - 16:15', avatar: 'CS' },
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-3xl group hover:bg-white/10 transition-all cursor-pointer">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center font-black text-xs">
                               {user.avatar}
                            </div>
                            <div>
                               <p className="font-black text-sm tracking-tight uppercase italic">{user.name}</p>
                               <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{user.type}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-black text-emerald-500 uppercase italic">{user.time.split(' ')[0]}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button className="w-full mt-10 py-5 bg-white text-slate-950 rounded-[28px] font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2">
                    Visualizar Agenda <ChevronRight size={16} />
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -mr-10 -mt-10" />
           </div>
        </div>
      </div>

      {/* LOWER DASHBOARD: Insights & Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Retention Analytics */}
         <div className="lg:col-span-4 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic mb-8">Saúde da <span className="text-rose-500">Base</span></h3>
            <div className="h-64 relative">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={retentionData} layout="vertical" margin={{ left: -20 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                     <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                     <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={32}>
                        {retentionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
               <div className="flex items-center justify-between p-4 bg-rose-50 border border-rose-100 rounded-3xl">
                  <div className="flex items-center gap-3">
                     <AlertCircle size={20} className="text-rose-500" />
                     <p className="text-[10px] font-black text-rose-900 uppercase">5 Alunos em Risco</p>
                  </div>
                  <button className="text-[9px] font-black text-rose-600 uppercase underline decoration-2">Agir Agora</button>
               </div>
            </div>
         </div>

         {/* AI Strategy Bar */}
         <div className="lg:col-span-8 bg-emerald-500 rounded-[48px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 group">
            <div className="relative z-10 flex-1">
               <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                     <Zap className="text-white" size={24} fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 italic">IA Business Consultant</span>
               </div>
               <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-[1] mb-6">
                  Sua retenção de alunos de <br /> <span className="text-slate-900">Solo Pilates</span> subiu <span className="underline decoration-slate-900 underline-offset-8">22%</span>.
               </h2>
               <p className="text-white/80 text-lg font-medium leading-relaxed max-w-2xl italic">
                  "O padrão indica que as manhãs de terça e quinta são os horários mais rentáveis. Recomendamos abrir mais 2 turmas de Reformer nestes períodos para aumentar o lucro líquido em até 15%."
               </p>
            </div>
            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
               <button className="px-10 py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-[11px] tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3">
                  <MessageSquare size={18} /> Ver Relatório IA
               </button>
               <button className="px-10 py-5 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-[28px] font-black uppercase text-[11px] tracking-widest hover:bg-white/30 transition-all flex items-center justify-center gap-3">
                  Aplicar Sugestão
               </button>
            </div>
            
            {/* Background Effects */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full -mr-32 -mb-32 animate-pulse" />
            <div className="absolute top-0 left-0 w-64 h-64 bg-slate-900/10 blur-[100px] rounded-full -ml-32 -mt-32" />
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
