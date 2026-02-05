
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download,
  DollarSign,
  ArrowRightLeft,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  Tag,
  Target,
  X,
  Save,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie
} from 'recharts';

const monthlyComparison = [
  { month: 'Jul', receita: 18000, despesa: 12000, lucro: 6000, meta: 20000 },
  { month: 'Ago', receita: 19500, despesa: 11500, lucro: 8000, meta: 20000 },
  { month: 'Set', receita: 21000, despesa: 14000, lucro: 7000, meta: 22000 },
  { month: 'Out', receita: 24500, despesa: 13000, lucro: 11500, meta: 22000 },
  { month: 'Nov', receita: 22000, despesa: 12500, lucro: 9500, meta: 25000 },
  { month: 'Dez', receita: 28000, despesa: 15000, lucro: 13000, meta: 35000 },
];

const expenseStructure = [
  { name: 'Aluguel & Cond.', value: 4500, color: '#10b981' },
  { name: 'Profissionais', value: 8200, color: '#3b82f6' },
  { name: 'Marketing', value: 1200, color: '#f59e0b' },
  { name: 'Manutenção', value: 800, color: '#f43f5e' },
  { name: 'Outros', value: 1500, color: '#6366f1' },
];

const profPerformance = [
  { name: 'Prof. Carlos', aulas: 124, faturamento: 12400, satisfacao: 98 },
  { name: 'Profa. Julia', aulas: 98, faturamento: 8200, satisfacao: 95 },
  { name: 'Profa. Mariana', aulas: 45, faturamento: 4500, satisfacao: 92 },
];

const Finance: React.FC = () => {
  const [filterYear, setFilterYear] = useState('2024');
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [goals, setGoals] = useState(monthlyComparison.map(m => m.meta));

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Financeiro Pro</h1>
          <p className="text-slate-500 font-medium">Ecossistema completo de gestão financeira e inteligência de mercado.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
             {['2023', '2024'].map(year => (
               <button 
                 key={year}
                 onClick={() => setFilterYear(year)}
                 className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${filterYear === year ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {year}
               </button>
             ))}
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all font-bold text-sm shadow-sm group">
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Exportar Relatórios
          </button>
          <button 
            onClick={() => setShowLaunchModal(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all font-black text-sm active:scale-95"
          >
            <Plus size={18} /> Novo Lançamento
          </button>
        </div>
      </header>

      {/* Main Kpis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento Anual', value: 'R$ 284.500', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '+18%', up: true },
          { label: 'Lucro Líquido Médio', value: 'R$ 9.420', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+5%', up: true },
          { label: 'Custo Operacional', value: 'R$ 12.800', icon: PieChartIcon, color: 'text-rose-500', bg: 'bg-rose-50', trend: '-2%', up: true },
          { label: 'Taxa de Conversão', value: '42%', icon: Tag, color: 'text-amber-500', bg: 'bg-amber-50', trend: '+12%', up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between hover:border-emerald-200 transition-all hover:shadow-xl group">
            <div className="flex justify-between items-center mb-6">
               <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:rotate-6 transition-transform`}>
                 <stat.icon size={24} />
               </div>
               <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${stat.up ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                 {stat.trend}
               </span>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue/Expense Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 overflow-hidden relative">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Fluxo de Caixa Dinâmico</h3>
                <p className="text-slate-400 text-xs font-bold">Acompanhamento mensal de entradas vs saídas.</p>
              </div>
              <div className="flex gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">Receita</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase">Despesa</span>
                 </div>
              </div>
           </div>
           <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={monthlyComparison} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                       <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorDesp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px'}}
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                    />
                    <Area type="monotone" dataKey="receita" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorRec)" />
                    <Area type="monotone" dataKey="despesa" stroke="#f43f5e" strokeWidth={5} fillOpacity={1} fill="url(#colorDesp)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Professional Performance */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 h-full flex flex-col">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Performance Equipe</h3>
              <div className="space-y-6 flex-1">
                 {profPerformance.map((prof, i) => (
                   <div key={i} className="group p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white transition-all">
                      <div className="flex justify-between items-center mb-3">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                               {prof.name.split(' ')[1][0]}
                            </div>
                            <div>
                               <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{prof.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{prof.aulas} aulas/mês</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-sm font-black text-emerald-600 tracking-tighter">R$ {prof.faturamento.toLocaleString()}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Faturamento</p>
                         </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-emerald-500 rounded-full group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all" 
                           style={{ width: `${prof.satisfacao}%` }}
                         ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                         <span className="text-[9px] font-black text-slate-400 uppercase">Satisfação Alunos</span>
                         <span className="text-[9px] font-black text-emerald-600 uppercase">{prof.satisfacao}%</span>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="mt-8 w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-emerald-200 hover:text-emerald-500 transition-all">
                 Ver Detalhes da Equipe
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Detailed Table */}
         <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
               <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">Lançamentos Consolidados</h3>
                  <p className="text-slate-400 text-xs font-bold">Últimas movimentações do caixa central.</p>
               </div>
               <button className="bg-white px-5 py-2 rounded-xl text-emerald-500 border border-emerald-100 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-sm">Extrato DRE</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/20 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                       <th className="px-8 py-5">Data Operação</th>
                       <th className="px-8 py-5">Identificação</th>
                       <th className="px-8 py-5">Classificação</th>
                       <th className="px-8 py-5 text-right">Montante</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[
                       { date: '12/12/2024', desc: 'Mensalidade - Aluna Roberta', cat: 'Receita Alunos', val: '+ R$ 450,00', color: 'text-emerald-600', sub: 'Crédito' },
                       { date: '11/12/2024', desc: 'Energia Elétrica Studio', cat: 'Custo Fixo', val: '- R$ 380,00', color: 'text-slate-900', sub: 'Débito' },
                       { date: '10/12/2024', desc: 'Mensalidade - Aluno Marcos', cat: 'Receita Alunos', val: '+ R$ 450,00', color: 'text-emerald-600', sub: 'Crédito' },
                       { date: '08/12/2024', desc: 'Novo Kit Magic Circle', cat: 'Investimento', val: '- R$ 850,00', color: 'text-slate-900', sub: 'Débito' },
                     ].map((t, i) => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <Calendar size={14} className="text-slate-300" />
                                <span className="text-xs font-bold text-slate-500">{t.date}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <p className="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors">{t.desc}</p>
                             <p className="text-[10px] text-slate-400 font-medium uppercase">{t.sub}</p>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-lg text-slate-500 border border-slate-200">{t.cat}</span>
                          </td>
                          <td className={`px-8 py-6 text-right font-black tracking-tighter text-lg ${t.color}`}>{t.val}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Goal Card with Dynamic Adjustment */}
         <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
                     <Target size={24} />
                  </div>
                  <button className="text-white/40 hover:text-white transition-colors"><ChevronRight size={24} /></button>
               </div>
               <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-1 leading-none">Meta de <span className="text-emerald-400">Dezembro</span></h3>
               <p className="text-emerald-100/40 text-xs font-bold uppercase tracking-widest">Alvo: R$ 35.000,00</p>
               
               <div className="mt-12 space-y-8">
                  <div className="space-y-4">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100/60">
                        <span>Atingido (80%)</span>
                        <span>Faltam 20%</span>
                     </div>
                     <div className="w-full h-4 bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-1000" style={{ width: '80%' }}></div>
                     </div>
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-3xl backdrop-blur-xl border border-white/10 space-y-2 group-hover:bg-white/10 transition-all">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                        <ArrowRightLeft size={14} /> Deficit Restante
                     </div>
                     <p className="text-3xl font-black tracking-tighter">R$ 7.000,00</p>
                     <p className="text-[10px] text-white/30 font-medium leading-relaxed">Considerando a média histórica, você atingirá a meta em 4 dias.</p>
                  </div>
               </div>
            </div>
            
            <div className="relative z-10 mt-12">
               <button 
                onClick={() => setShowGoalsModal(true)}
                className="w-full bg-white text-slate-900 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2"
               >
                 Ajustar Planejamento Anual <ArrowUpRight size={16} />
               </button>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full -ml-10 -mb-10"></div>
         </div>
      </div>

      {/* Adjust Annual Goals Modal */}
      {showGoalsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Ajustar Metas <span className="text-emerald-500">2024</span></h2>
                    <p className="text-slate-400 text-sm font-bold">Defina as metas de faturamento para cada período do ano.</p>
                 </div>
                 <button onClick={() => setShowGoalsModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-10 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((month, i) => (
                   <div key={month} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-emerald-200 hover:bg-white transition-all">
                      <div className="flex items-center justify-between mb-4">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{month}</span>
                         <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded">Meta Ativa</span>
                      </div>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">R$</span>
                         <input 
                           type="text" 
                           placeholder="0,00" 
                           defaultValue={goals[i]?.toLocaleString() || '20.000'}
                           className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent group-hover:border-slate-100 focus:border-emerald-500 rounded-2xl outline-none font-black text-slate-800 text-xl transition-all" 
                         />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                       <TrendingUp size={28} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Previsão Anual Consolidada</p>
                       <p className="text-2xl font-black text-slate-900 tracking-tighter">R$ 312.000,00</p>
                    </div>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => setShowGoalsModal(false)} className="flex-1 md:flex-none px-10 py-4 rounded-2xl border-2 border-slate-200 font-black uppercase text-xs tracking-widest text-slate-400 hover:bg-slate-100 transition-all">Descartar</button>
                    <button onClick={() => setShowGoalsModal(false)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-12 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">
                      <Save size={18} /> Salvar Planejamento
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* New Launch Modal Refined */}
      {showLaunchModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[110] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo Movimento <span className="text-emerald-500">Financeiro</span></h2>
                    <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Caixa Geral Studio</p>
                 </div>
                 <button onClick={() => setShowLaunchModal(false)} className="text-slate-400 hover:text-slate-600 font-bold p-2">FECHAR</button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <button className="group bg-emerald-50 text-emerald-600 border-2 border-emerald-100 p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-white hover:border-emerald-500 transition-all shadow-sm">
                       <ArrowUpRight size={32} className="group-hover:scale-110 transition-transform" />
                       <span className="font-black text-[10px] uppercase tracking-widest">Entrada de Capital</span>
                    </button>
                    <button className="group bg-rose-50 text-rose-600 border-2 border-rose-100 p-6 rounded-3xl flex flex-col items-center gap-3 hover:bg-white hover:border-rose-500 transition-all opacity-50 grayscale hover:grayscale-0">
                       <ArrowDownRight size={32} className="group-hover:scale-110 transition-transform" />
                       <span className="font-black text-[10px] uppercase tracking-widest">Saída / Despesa</span>
                    </button>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Montante da Operação</label>
                       <div className="relative">
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-300 tracking-tighter">R$</span>
                          <input type="text" placeholder="0,00" className="w-full text-5xl font-black text-slate-900 border-none outline-none pb-2 pl-14 transition-all tracking-tighter" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-xs uppercase tracking-widest text-slate-600">
                             <option>Mensalidades</option>
                             <option>Produtos / Merch</option>
                             <option>Cursos</option>
                             <option>Eventos</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Forma Pagto</label>
                          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-xs uppercase tracking-widest text-slate-600">
                             <option>Cartão de Crédito</option>
                             <option>Pix / Transferência</option>
                             <option>Dinheiro</option>
                             <option>Boleto</option>
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Notas Internas</label>
                       <textarea rows={2} placeholder="Opcional: Detalhes sobre o recebimento..." className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl outline-none font-bold text-slate-700 text-sm focus:bg-white focus:border-emerald-200 transition-all resize-none"></textarea>
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 border-t border-slate-100">
                <button onClick={() => setShowLaunchModal(false)} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-black transition-all active:scale-95">Registrar Lançamento no DRE</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
