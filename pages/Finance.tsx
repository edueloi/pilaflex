
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
  Briefcase,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  Layers,
  Sparkles,
  // Added missing Search import
  Search
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
  Pie,
  ComposedChart,
  Line,
  Legend
} from 'recharts';

const analyticsData = [
  { month: 'Jul', receita: 18000, despesa: 12000, margem: 33, projecao: 17000 },
  { month: 'Ago', receita: 19500, despesa: 11500, margem: 41, projecao: 18500 },
  { month: 'Set', receita: 21000, despesa: 14000, margem: 33, projecao: 20000 },
  { month: 'Out', receita: 24500, despesa: 13000, margem: 46, projecao: 22000 },
  { month: 'Nov', receita: 22000, despesa: 12500, margem: 43, projecao: 25000 },
  { month: 'Dez', receita: 29000, despesa: 15500, margem: 46, projecao: 28000 },
];

const expenseBreakdown = [
  { name: 'Equipe', value: 8500, color: '#10b981' },
  { name: 'Aluguel', value: 3200, color: '#3b82f6' },
  { name: 'Marketing', value: 1800, color: '#f59e0b' },
  { name: 'Sistemas', value: 900, color: '#6366f1' },
  { name: 'Outros', value: 1100, color: '#f43f5e' },
];

const pendingPayments = [
  { id: 1, aluna: 'Bianca Viana', valor: 450.00, vencimento: 'Ontem', status: 'atrasado' },
  { id: 2, aluna: 'Juliana Paes', valor: 380.00, vencimento: 'Hoje', status: 'pendente' },
  { id: 3, aluna: 'Ricardo Melo', valor: 450.00, vencimento: 'Em 2 dias', status: 'pendente' },
];

const Finance: React.FC = () => {
  const [filterPeriod, setFilterPeriod] = useState('Este Mês');
  const [showLaunchModal, setShowLaunchModal] = useState(false);

  return (
    <div className="p-4 md:p-8 xl:p-12 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-32">
      
      {/* HEADER ESTRATÉGICO */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Controladoria & BI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Saúde <span className="text-emerald-500">Financeira</span></h1>
          <p className="text-slate-500 font-medium text-lg">Visão analítica de 360º sobre o fluxo de caixa e rentabilidade.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
            {['Este Mês', 'Trimestre', 'Anual'].map(p => (
              <button 
                key={p}
                onClick={() => setFilterPeriod(p)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterPeriod === p ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all font-black text-xs shadow-sm group">
            <FileSpreadsheet size={18} className="text-emerald-500" /> Exportar DRE
          </button>
          <button 
            onClick={() => setShowLaunchModal(true)}
            className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-3.5 rounded-2xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all font-black text-xs uppercase tracking-widest active:scale-95"
          >
            <Plus size={18} /> Novo Movimento
          </button>
        </div>
      </header>

      {/* POWER KPIS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Receita Total', value: 'R$ 29.450', sub: '+12% vs mês ant.', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Lucro Operacional', value: 'R$ 13.950', sub: 'Margem de 47.3%', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Ticket Médio', value: 'R$ 412,00', sub: 'Estável no período', icon: Tag, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Inadimplência', value: '3.2%', sub: '2 alunos atrasados', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col justify-between hover:border-emerald-200 transition-all hover:shadow-2xl group relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
               <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:rotate-6 transition-transform`}>
                 <stat.icon size={24} />
               </div>
               <div className="text-right">
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
               </div>
            </div>
            <p className={`mt-6 text-[10px] font-black uppercase tracking-widest ${stat.color} relative z-10`}>{stat.sub}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-emerald-50 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BIG ANALYTICAL CHART */}
        <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-[48px] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
             <div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Desempenho Consolidado</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Comparativo semestral dinâmico</p>
             </div>
             <div className="flex flex-wrap gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase">Receita</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase">Despesas</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                   <span className="text-[10px] font-black text-slate-500 uppercase">Margem %</span>
                </div>
             </div>
          </div>

          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#3b82f6', fontSize: 10, fontWeight: 800}} />
                <Tooltip 
                  contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '20px'}}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="despesa" fill="#fef2f2" stroke="#f43f5e" strokeWidth={0} />
                <Bar yAxisId="left" dataKey="receita" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                <Line yAxisId="right" type="step" dataKey="margem" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 3, stroke: '#fff' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DISTRIBUTION & INSIGHTS */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* EXPENSE STRUCTURE (DONUT) */}
           <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 flex flex-col h-[350px]">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-4">Estrutura de Gastos</h3>
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={expenseBreakdown}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={8}
                          dataKey="value"
                       >
                          {expenseBreakdown.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                       <Tooltip 
                          contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                       />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                 {expenseBreakdown.slice(0, 4).map(e => (
                   <div key={e.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }}></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{e.name}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* AI FINANCE ADVISOR */}
           <div className="bg-slate-950 rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl group flex flex-col justify-between">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-emerald-400" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Pila-AI Advisor</span>
                 </div>
                 <p className="text-lg font-medium leading-relaxed italic text-emerald-50/80">
                    "Sua margem de lucro cresceu 8% devido à redução de custos operacionais. Recomendamos investir R$ 2k em tráfego pago para captar 5 novos alunos VIP."
                 </p>
              </div>
              <button className="relative z-10 mt-8 w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-500 transition-all">
                 Ver Plano de Investimento
              </button>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full"></div>
           </div>
        </div>
      </div>

      {/* SECONDARY ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* PENDING / ARREARS */}
         <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Pendências</h3>
               <span className="bg-rose-50 text-rose-600 p-2.5 rounded-xl"><AlertCircle size={20} /></span>
            </div>
            <div className="space-y-4">
               {pendingPayments.map(p => (
                 <div key={p.id} className="p-5 rounded-[28px] bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-rose-200 transition-all">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${p.status === 'atrasado' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'}`}>
                          {p.aluna[0]}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900 uppercase italic leading-none">{p.aluna}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Vencimento: {p.vencimento}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-900">R$ {p.valor.toFixed(2)}</p>
                       <button className="text-[8px] font-black text-emerald-500 uppercase hover:underline">Notificar</button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* CASH FLOW PROJECTION */}
         <div className="bg-white p-8 rounded-[48px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Projeção Próx. Mês</h3>
            <div className="space-y-6">
               <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 relative overflow-hidden group">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Entrada Estimada</p>
                  <p className="text-4xl font-black text-emerald-900 tracking-tighter">R$ 32.500</p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600/60 font-black text-[9px] uppercase">
                     <TrendingUp size={14} /> +15% de renovações previstas
                  </div>
                  <Layers className="absolute -bottom-4 -right-4 text-emerald-500/10" size={80} />
               </div>
               <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Margem Projetada</p>
                  <div className="flex items-end gap-3">
                     <p className="text-4xl font-black text-slate-900 tracking-tighter">48%</p>
                     <div className="w-full h-2 bg-slate-200 rounded-full mb-3 flex-1 overflow-hidden">
                        <div className="h-full bg-slate-900 w-[48%] rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* QUICK ACTIONS & METRICS */}
         <div className="bg-emerald-500 rounded-[48px] p-8 text-white shadow-2xl flex flex-col justify-between group">
            <div className="space-y-6">
               <h3 className="text-2xl font-black tracking-tighter uppercase italic leading-none">Meta de <span className="text-emerald-950">Faturamento</span></h3>
               <div className="bg-white/10 p-6 rounded-3xl border border-white/20">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-100/60 mb-3">
                     <span>Atingido (R$ 29k)</span>
                     <span>Alvo (R$ 35k)</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] w-[82%]" />
                  </div>
               </div>
            </div>
            <div className="mt-12 space-y-3">
               <button className="w-full py-4 bg-emerald-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">
                  Visualizar DRE Detalhado
               </button>
               <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all">
                  Conciliação Bancária
               </button>
            </div>
         </div>
      </div>

      {/* DATA GRID - TRANSACTIONS */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30">
            <div>
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Extrato Consolidado</h3>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Últimas 50 movimentações</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input placeholder="Filtrar lançamentos..." className="pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-xs focus:border-emerald-500 shadow-sm min-w-[300px]" />
               </div>
               <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-500 shadow-sm transition-all"><Filter size={20} /></button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                     <th className="px-10 py-6">Data & Hora</th>
                     <th className="px-10 py-6">Operação / Aluna</th>
                     <th className="px-10 py-6">Categoria</th>
                     <th className="px-10 py-6">Forma</th>
                     <th className="px-10 py-6 text-right">Montante</th>
                     <th className="px-10 py-6 text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {[
                     { date: '12/12/2024 14:30', desc: 'Mensalidade - Roberta G.', cat: 'Receita Alunos', form: 'Pix', val: '+ 450,00', status: 'Confirmado', type: 'in' },
                     { date: '12/12/2024 10:15', desc: 'Energia Studio - Enel', cat: 'Custo Operacional', form: 'Boleto', val: '- 382,40', status: 'Pago', type: 'out' },
                     { date: '11/12/2024 17:00', desc: 'Venda Meia Antiderrapante', cat: 'Venda Produtos', form: 'Cartão', val: '+ 45,00', status: 'Confirmado', type: 'in' },
                     { date: '10/12/2024 09:00', desc: 'Reposição Molas Reformer', cat: 'Manutenção', form: 'Transferência', val: '- 850,00', status: 'Pago', type: 'out' },
                     { date: '09/12/2024 13:45', desc: 'Mensalidade - Juliana P.', cat: 'Receita Alunos', form: 'Cartão', val: '+ 380,00', status: 'Aguardando', type: 'in' },
                  ].map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                       <td className="px-10 py-7">
                          <div className="flex items-center gap-3 text-slate-400">
                             <Clock size={14} />
                             <span className="text-xs font-bold">{t.date}</span>
                          </div>
                       </td>
                       <td className="px-10 py-7">
                          <p className="text-sm font-black text-slate-900 uppercase italic leading-none group-hover:text-emerald-600 transition-colors">{t.desc}</p>
                          <p className="text-[9px] text-slate-400 font-black uppercase mt-1 tracking-widest">{t.type === 'in' ? 'Entrada Direta' : 'Saída Prevista'}</p>
                       </td>
                       <td className="px-10 py-7">
                          <span className="px-4 py-1.5 rounded-xl bg-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{t.cat}</span>
                       </td>
                       <td className="px-10 py-7 text-xs font-black text-slate-500 uppercase italic">{t.form}</td>
                       <td className={`px-10 py-7 text-right text-xl font-black tracking-tighter ${t.type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>R$ {t.val}</td>
                       <td className="px-10 py-7 text-center">
                          <div className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border inline-flex items-center gap-2 ${
                             t.status === 'Confirmado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                             t.status === 'Pago' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${
                                t.status === 'Confirmado' ? 'bg-emerald-500' : 
                                t.status === 'Pago' ? 'bg-blue-500' : 'bg-amber-500'
                             }`}></div>
                             {t.status}
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-center">
            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-emerald-500 transition-colors">Carregar histórico completo</button>
         </div>
      </div>

      {/* MODAL DE NOVO MOVIMENTO */}
      {showLaunchModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-300">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Lançamento</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Registrar entrada ou saída de caixa</p>
                 </div>
                 <button onClick={() => setShowLaunchModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <button className="p-6 bg-emerald-50 text-emerald-600 border-2 border-emerald-500 rounded-3xl flex flex-col items-center gap-2">
                       <ArrowUpRight size={24} />
                       <span className="font-black text-[10px] uppercase tracking-widest">Receita</span>
                    </button>
                    <button className="p-6 bg-slate-50 text-slate-400 border-2 border-transparent rounded-3xl flex flex-col items-center gap-2 hover:bg-rose-50 hover:text-rose-600 transition-all">
                       <ArrowDownRight size={24} />
                       <span className="font-black text-[10px] uppercase tracking-widest">Despesa</span>
                    </button>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2 text-center">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor da Operação</label>
                       <div className="relative">
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-300 tracking-tighter">R$</span>
                          <input placeholder="0,00" className="w-full text-5xl font-black text-slate-900 border-none outline-none text-center bg-transparent tracking-tighter" />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                          <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none focus:bg-white focus:border-emerald-500">
                             <option>Mensalidades</option>
                             <option>Serviços Extras</option>
                             <option>Venda de Produtos</option>
                             <option>Cursos Academy</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Forma</label>
                          <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none focus:bg-white focus:border-emerald-500">
                             <option>Pix</option>
                             <option>Cartão Crédito</option>
                             <option>Cartão Débito</option>
                             <option>Dinheiro</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button onClick={() => setShowLaunchModal(false)} className="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Salvar Lançamento</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
