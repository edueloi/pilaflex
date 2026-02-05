
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Filter, 
  Calendar,
  ChevronDown,
  Search,
  Users,
  Briefcase,
  Truck,
  Dumbbell,
  AlertCircle,
  MoreVertical,
  CheckCircle2,
  X,
  Save,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Clock,
  LayoutGrid
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
  ComposedChart,
  Line,
  Area
} from 'recharts';

// Mock de dados para BI por período
const biData = {
  week: [
    { label: 'Seg', entrada: 1200, saida: 400 },
    { label: 'Ter', entrada: 900, saida: 300 },
    { label: 'Qua', entrada: 1500, saida: 600 },
    { label: 'Qui', entrada: 2100, saida: 800 },
    { label: 'Sex', entrada: 1800, saida: 500 },
  ],
  month: [
    { label: 'Sem 1', entrada: 8000, saida: 3500 },
    { label: 'Sem 2', entrada: 7500, saida: 4000 },
    { label: 'Sem 3', entrada: 9200, saida: 3800 },
    { label: 'Sem 4', entrada: 11000, saida: 4200 },
  ],
  year: [
    { label: 'Jan', entrada: 28000, saida: 12000 },
    { label: 'Fev', entrada: 31000, saida: 14000 },
    { label: 'Mar', entrada: 29500, saida: 13500 },
    { label: 'Abr', entrada: 34000, saida: 15000 },
  ]
};

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bi' | 'students' | 'staff' | 'expenses' | 'assets'>('bi');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');

  const currentStats = {
    income: period === 'month' ? 'R$ 29.450' : period === 'week' ? 'R$ 7.500' : 'R$ 342.000',
    expense: period === 'month' ? 'R$ 15.500' : period === 'week' ? 'R$ 3.200' : 'R$ 184.000',
  };

  return (
    <div className="p-4 md:p-8 xl:p-12 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* ERP HEADER & TIME SELECTOR */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">ERP Control Tower</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Gestão <span className="text-emerald-500">Financeira</span></h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
             {['week', 'month', 'year'].map((p) => (
               <button 
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${period === p ? 'bg-slate-950 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
               >
                 {p === 'week' ? 'Semana' : p === 'month' ? 'Este Mês' : 'Ano Atual'}
               </button>
             ))}
             <button className="flex items-center gap-2 px-6 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase hover:bg-slate-100 transition-all">
                <Calendar size={14} /> Outros Meses
             </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-slate-50 p-2 rounded-2xl flex gap-1 border border-slate-100">
             {[
               { id: 'bi', icon: LayoutGrid, label: 'BI' },
               { id: 'students', icon: Users, label: 'Alunos' },
               { id: 'staff', icon: Briefcase, label: 'Staff' },
               { id: 'expenses', icon: Truck, label: 'Compras' },
               { id: 'assets', icon: Dumbbell, label: 'Ativos' },
             ].map(tab => (
               <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-emerald-600 shadow-md border border-emerald-100' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <tab.icon size={14} /> <span className="hidden sm:inline">{tab.label}</span>
               </button>
             ))}
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 transition-all font-black text-xs uppercase tracking-widest active:scale-95"
          >
            <Plus size={18} /> Novo Lançamento
          </button>
        </div>
      </header>

      {/* OVERVIEW STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Entradas Totais', value: currentStats.income, color: 'text-emerald-500', icon: ArrowUpRight, trend: '+12.5%' },
          { label: 'Saídas Totais', value: currentStats.expense, color: 'text-rose-500', icon: ArrowDownRight, trend: '-2.1%' },
          { label: 'Lucro Líquido', value: 'R$ 13.950', color: 'text-blue-500', icon: DollarSign, trend: 'Margem 47%' },
          { label: 'Inadimplência', value: 'R$ 1.280', color: 'text-amber-500', icon: AlertCircle, trend: '3 Alunos' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group hover:border-emerald-200 transition-all">
            <div className="flex justify-between items-start mb-6">
               <div className={`p-4 rounded-2xl ${stat.color.replace('text', 'bg')}/10 ${stat.color}`}>
                  <stat.icon size={24} />
               </div>
               <span className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.trend}</span>
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BI / CHART SECTION */}
        {activeTab === 'bi' && (
          <>
            <div className="lg:col-span-8 bg-white p-8 md:p-10 rounded-[48px] border border-slate-100 shadow-sm min-h-[500px]">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Análise de Performance</h3>
                  <div className="flex gap-4 text-[9px] font-black uppercase">
                     <span className="flex items-center gap-1.5 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Entradas</span>
                     <span className="flex items-center gap-1.5 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500" /> Saídas</span>
                  </div>
               </div>
               <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={biData[period]}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                       <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                       <Bar dataKey="entrada" fill="#10b981" radius={[8, 8, 0, 0]} barSize={period === 'week' ? 60 : 40} />
                       <Area type="monotone" dataKey="saida" fill="#fef2f2" stroke="#f43f5e" strokeWidth={3} />
                    </ComposedChart>
                  </ResponsiveContainer>
               </div>
            </div>
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between h-full relative overflow-hidden group">
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="text-emerald-400" size={24} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Pila-AI Forecast</span>
                     </div>
                     <p className="text-2xl font-black tracking-tighter uppercase italic leading-[1.1] mb-6">
                        Projeção de Lucro para <span className="text-emerald-500">Próximo Mês</span>
                     </p>
                     <h4 className="text-5xl font-black text-white tracking-tighter mb-4">R$ 18.200</h4>
                     <p className="text-emerald-50/40 text-xs font-medium italic">
                        "Baseado na taxa de renovação de 92% e redução de 5% em suprimentos."
                     </p>
                  </div>
                  <button className="relative z-10 mt-10 w-full py-4 bg-white/10 border border-white/10 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-500 transition-all">
                     Ver Relatório Completo
                  </button>
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full" />
               </div>
            </div>
          </>
        )}

        {/* MÓDULO ALUNOS / MENSALIDADES */}
        {activeTab === 'students' && (
          <div className="lg:col-span-12 animate-in slide-in-from-right-4 duration-500">
             <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
                   <div>
                      <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic">Mensalidades & Cobrança</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Status de recebíveis do {period === 'month' ? 'mês' : 'período'}</p>
                   </div>
                   <div className="flex gap-2">
                      <button className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">Filtrar Atrasados</button>
                      <button className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">Baixa em Lote</button>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <tr>
                           <th className="px-10 py-5">Aluno</th>
                           <th className="px-10 py-5">Plano</th>
                           <th className="px-10 py-5">Vencimento</th>
                           <th className="px-10 py-5">Valor</th>
                           <th className="px-10 py-5 text-center">Status</th>
                           <th className="px-10 py-5 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {[
                           { name: 'Roberta G.', plan: 'Gold Annual', due: '12/12', val: '450,00', status: 'pago' },
                           { name: 'Juliana P.', plan: 'Solo Mensal', due: '10/12', val: '380,00', status: 'atrasado' },
                           { name: 'Marcos V.', plan: 'Duo Trimestral', due: '15/12', val: '410,00', status: 'pendente' },
                         ].map((s, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-all">
                              <td className="px-10 py-6 font-black text-slate-900 uppercase italic text-sm">{s.name}</td>
                              <td className="px-10 py-6 text-xs font-bold text-slate-500">{s.plan}</td>
                              <td className="px-10 py-6 text-xs font-bold text-slate-500">{s.due}</td>
                              <td className="px-10 py-6 font-black text-slate-900">R$ {s.val}</td>
                              <td className="px-10 py-6 text-center">
                                 <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                                   s.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                   s.status === 'atrasado' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                 }`}>
                                   {s.status}
                                 </span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-2 text-slate-300 hover:text-emerald-500 transition-all"><MoreVertical size={18} /></button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

        {/* MÓDULO STAFF / FOLHA */}
        {activeTab === 'staff' && (
          <div className="lg:col-span-12 space-y-8 animate-in slide-in-from-right-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Julia Mendes', role: 'Fisioterapeuta Master', salary: '4.500,00', status: 'Pago' },
                  { name: 'Carlos Alberto', role: 'Diretor Geral', salary: '8.000,00', status: 'Pago' },
                  { name: 'Mariana Silva', role: 'Instrutora Solo', salary: '2.800,00', status: 'Pendente' },
                ].map((st, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center font-black text-2xl group-hover:rotate-6 transition-transform">
                           {st.name[0]}
                        </div>
                        <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase border ${st.status === 'Pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                           {st.status}
                        </span>
                     </div>
                     <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">{st.name}</h3>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-6">{st.role}</p>
                     <div className="pt-6 border-t border-slate-50 flex justify-between items-end">
                        <div>
                           <p className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Pagamento Líquido</p>
                           <p className="text-2xl font-black text-slate-900 tracking-tighter italic">R$ {st.salary}</p>
                        </div>
                        <button className="text-[9px] font-black text-emerald-500 uppercase hover:underline">Ver Holerite</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* MÓDULO FORNECEDORES / COMPRAS */}
        {activeTab === 'expenses' && (
           <div className="lg:col-span-12 animate-in slide-in-from-right-4 duration-500">
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center bg-slate-50/30">
                    <div>
                       <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic">Suprimentos & Fornecedores</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase mt-1">Gestão de insumos e consumíveis</p>
                    </div>
                    <button onClick={() => { setModalType('expense'); setShowAddModal(true); }} className="bg-slate-950 text-white px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-xl">Cadastrar Nota/Pedido</button>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                       <tr>
                          <th className="px-10 py-5">Item / Serviço</th>
                          <th className="px-10 py-5">Fornecedor</th>
                          <th className="px-10 py-5">Data</th>
                          <th className="px-10 py-5 text-right">Valor</th>
                          <th className="px-10 py-5 text-center">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {[
                          { item: 'Kit 50 Meias Antiderrapantes', supp: 'PilaStyle Br', date: '08/12', val: '750,00', status: 'Pago' },
                          { item: 'Insumos Limpeza Studio', supp: 'CleanMax', date: '05/12', val: '240,00', status: 'Agendado' },
                          { item: 'ADS Google/Meta', supp: 'Google Ireland', date: '01/12', val: '1.200,00', status: 'Débito Autom.' },
                       ].map((e, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-10 py-6 font-black text-slate-900 uppercase italic text-sm">{e.item}</td>
                            <td className="px-10 py-6 text-xs font-bold text-slate-500">{e.supp}</td>
                            <td className="px-10 py-6 text-xs font-bold text-slate-500">{e.date}</td>
                            <td className="px-10 py-6 font-black text-slate-900 text-right">R$ {e.val}</td>
                            <td className="px-10 py-6 text-center">
                               <span className="px-4 py-1.5 rounded-xl bg-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">{e.status}</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        )}

        {/* MÓDULO ATIVOS / EQUIPAMENTOS */}
        {activeTab === 'assets' && (
           <div className="lg:col-span-12 animate-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { name: 'Reformer Oak Pro', brand: 'TechPilates', val: 'R$ 8.500', health: 95 },
                   { name: 'Cadillac Master', brand: 'TechPilates', val: 'R$ 12.000', health: 88 },
                   { name: 'Wunda Chair', brand: 'Stott Br', val: 'R$ 4.200', health: 72 },
                   { name: 'Ladder Barrel', brand: 'Stott Br', val: 'R$ 3.800', health: 90 },
                 ].map((a, i) => (
                   <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-emerald-200 transition-all">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                            <Dumbbell size={24} />
                         </div>
                         <span className="text-[9px] font-black text-emerald-500 uppercase">Patrimônio</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{a.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{a.brand}</p>
                      <div className="pt-6 border-t border-slate-50">
                         <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            <span>Estado (Saúde)</span>
                            <span className={a.health > 80 ? 'text-emerald-500' : 'text-amber-500'}>{a.health}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${a.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full`} style={{ width: `${a.health}%` }} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}
      </div>

      {/* MODAL ERP COMPACTO & ELEGANTE */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Lançamento</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Alimentando o fluxo de caixa ERP</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-8 md:p-10 space-y-8">
                 <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button 
                      onClick={() => setModalType('income')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${modalType === 'income' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400'}`}
                    >
                      <ArrowUpRight size={14} /> Receita
                    </button>
                    <button 
                      onClick={() => setModalType('expense')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${modalType === 'expense' ? 'bg-white text-rose-600 shadow-sm border border-rose-100' : 'text-slate-400'}`}
                    >
                      <ArrowDownRight size={14} /> Despesa
                    </button>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição / Referência</label>
                       <input placeholder="Ex: Mensalidade Aluna Maria" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor do Título</label>
                          <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xs italic">R$</span>
                             <input placeholder="0,00" className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-lg outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vencimento</label>
                          <input type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria ERP</label>
                       <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 outline-none focus:bg-white">
                          <option>Mensalidades Alunos</option>
                          <option>Folha Staff / Equipe</option>
                          <option>Aluguel / Manutenção</option>
                          <option>Suprimentos / Compras</option>
                          <option>Marketing / ADS</option>
                       </select>
                    </div>
                 </div>
              </div>

              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button onClick={() => setShowAddModal(false)} className="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Efetivar Lançamento</button>
              </div>
           </div>
        </div>
      )}

      {/* FAB - MOBILE QUICK ACTION */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
         <button onClick={() => setShowAddModal(true)} className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-500 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all active:scale-95 group">
            <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
         </button>
      </div>

    </div>
  );
};

export default Finance;
