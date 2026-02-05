
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Calendar,
  ChevronDown,
  Search,
  Users,
  Briefcase,
  Truck,
  Dumbbell,
  AlertCircle,
  MoreVertical,
  X,
  Save,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Building2,
  Tool,
  Filter,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'staff' | 'suppliers' | 'assets'>('overview');
  const [selectedMonth, setSelectedMonth] = useState('Dezembro');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div className="p-4 md:p-8 xl:p-12 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* ERP NAVIGATION & PERIOD SELECTOR */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">ERP Finance Pro</span>
          </div>
          <h1 className="text-3xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Controle de <span className="text-emerald-500">Caixa</span></h1>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white transition-all">
                {selectedMonth} <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl p-2 hidden group-hover:block z-50 animate-in fade-in zoom-in-95">
                <div className="grid grid-cols-2 gap-1">
                  {months.map(m => (
                    <button key={m} onClick={() => setSelectedMonth(m)} className="text-[9px] font-bold p-2 hover:bg-emerald-50 rounded-lg text-slate-600 uppercase tracking-widest">{m.substring(0,3)}</button>
                  ))}
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600">
              {selectedYear}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1 border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'overview', label: 'Resumo', icon: TrendingUp },
              { id: 'students', label: 'Alunos', icon: Users },
              { id: 'staff', label: 'Equipe', icon: Briefcase },
              { id: 'suppliers', label: 'Fornecedores', icon: Truck },
              { id: 'assets', label: 'Ativos', icon: Dumbbell },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <tab.icon size={14} /> {tab.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => { setModalType('income'); setShowAddModal(true); }}
            className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-2xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
          >
            <Plus size={16} /> Lançamento
          </button>
        </div>
      </header>

      {/* DASHBOARD SUMMARY (REUSABLE ACROSS TABS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Receita Alunos', value: 'R$ 24.150', color: 'text-emerald-500', icon: Users, sub: '124 Ativos' },
          { label: 'Folha Pagamento', value: 'R$ 8.500', color: 'text-rose-500', icon: Briefcase, sub: '4 Colaboradores' },
          { label: 'Gasto Fornecedores', value: 'R$ 2.400', color: 'text-amber-500', icon: Truck, sub: 'Insumos / Meias' },
          { label: 'Lucro Previsto', value: 'R$ 13.250', color: 'text-blue-600', icon: DollarSign, sub: 'Margem 54%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-slate-100 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color.replace('text', 'bg')}/10 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight size={18} className="text-slate-200" />
            </div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter italic">{stat.value}</h3>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* DYNAMIC CONTENT PER TAB */}
      <div className="animate-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-[400px]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Fluxo Comparativo</h3>
                <div className="flex gap-4 text-[9px] font-black uppercase">
                   <span className="flex items-center gap-1.5 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Receitas</span>
                   <span className="flex items-center gap-1.5 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500" /> Despesas</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={[
                  { label: 'S1', in: 4500, out: 2100 },
                  { label: 'S2', in: 5200, out: 2400 },
                  { label: 'S3', in: 6100, out: 2800 },
                  { label: 'S4', in: 8650, out: 3200 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="in" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                  <Area type="monotone" dataKey="out" fill="#fef2f2" stroke="#f43f5e" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="lg:col-span-4 bg-slate-950 p-10 rounded-[48px] text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Ponto de Equilíbrio</h3>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-8">Meta para cobertura de custos fixos</p>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-white/40 mb-2">
                       <span>Progresso Atual</span>
                       <span className="text-emerald-400">R$ 24.150 / R$ 10.000</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                    <p className="text-xs font-bold text-emerald-100/70 leading-relaxed italic">
                      "Seu studio atingiu o break-even no dia 12. O faturamento restante deste mês é lucro operacional."
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
              <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic">Detalhado: {activeTab.toUpperCase()}</h3>
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 <input placeholder="Buscar lançamento..." className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl outline-none font-bold text-xs" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-10 py-5">Descrição</th>
                    <th className="px-10 py-5">Data</th>
                    <th className="px-10 py-5">Categoria</th>
                    <th className="px-10 py-5 text-right">Valor</th>
                    <th className="px-10 py-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {[
                     { desc: 'Mensalidade: Maria Eduarda', date: '05/12', cat: 'Alunos', val: '450,00', type: 'in' },
                     { desc: 'Manutenção Reformer 04', date: '08/12', cat: 'Ativos', val: '1.200,00', type: 'out' },
                     { desc: 'Salário: Julia Mendes', date: '10/12', cat: 'Folha', val: '4.500,00', type: 'out' },
                   ].map((item, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-10 py-6 font-black text-slate-900 uppercase italic text-sm">{item.desc}</td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-500">{item.date}</td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">{item.cat}</td>
                        <td className={`px-10 py-6 font-black text-right ${item.type === 'in' ? 'text-emerald-600' : 'text-rose-600'}`}>R$ {item.val}</td>
                        <td className="px-10 py-6 text-center">
                           <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase border ${item.type === 'in' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                             {item.type === 'in' ? 'Recebido' : 'Pago'}
                           </span>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL ERP COMPACTO */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Lançamento</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Gestão financeira estratégica</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-8 md:p-10 space-y-6">
                 <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                    <button onClick={() => setModalType('income')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${modalType === 'income' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-400'}`}>Receita</button>
                    <button onClick={() => setModalType('expense')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${modalType === 'expense' ? 'bg-white text-rose-600 shadow-sm border border-rose-100' : 'text-slate-400'}`}>Despesa</button>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                       <input placeholder="Ex: Pagamento Fornecedor" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor</label>
                          <input placeholder="R$ 0,00" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-lg outline-none focus:bg-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria ERP</label>
                          <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 outline-none">
                             <option>Alunos</option>
                             <option>Staff / Equipe</option>
                             <option>Fornecedores</option>
                             <option>Ativos / Equipamentos</option>
                             <option>Gasto Fixo / Geral</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100">
                 <button onClick={() => setShowAddModal(false)} className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Salvar Registro</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Finance;
