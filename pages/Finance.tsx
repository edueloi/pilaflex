
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  Tag,
  X,
  Save,
  Briefcase,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  BarChart3,
  Layers,
  Sparkles,
  Search,
  Users,
  Dumbbell,
  Truck,
  DollarSign,
  Wallet,
  Receipt,
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
  Cell,
  PieChart,
  Pie,
  ComposedChart,
  Line,
  Area
} from 'recharts';

// Dados de BI
const analyticsData = [
  { month: 'Jul', receita: 18000, despesa: 12000, staff: 8000 },
  { month: 'Ago', receita: 19500, despesa: 11500, staff: 8000 },
  { month: 'Set', receita: 21000, despesa: 14000, staff: 8500 },
  { month: 'Out', receita: 24500, despesa: 13000, staff: 8500 },
  { month: 'Nov', receita: 22000, despesa: 12500, staff: 8500 },
  { month: 'Dez', receita: 29000, despesa: 15500, staff: 9000 },
];

const expenseBreakdown = [
  { name: 'Folha Staff', value: 9000, color: '#10b981' },
  { name: 'Equipamentos', value: 3200, color: '#3b82f6' },
  { name: 'Marketing', value: 1800, color: '#f59e0b' },
  { name: 'Aluguel/Contas', value: 4500, color: '#6366f1' },
];

const Finance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'staff' | 'expenses'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-4 md:p-8 xl:p-12 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* NAVEGAÇÃO DE MÓDULOS ERP */}
      <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Financeiro Enterprise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Hub de <span className="text-emerald-500">Capital</span></h1>
          <p className="text-slate-500 font-medium">Controle total de entradas, folha de pagamento e ativos.</p>
        </div>

        <div className="flex flex-wrap bg-white border border-slate-200 rounded-[28px] p-1.5 shadow-sm">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'students', label: 'Mensalidades', icon: Users },
            { id: 'staff', label: 'Folha Staff', icon: Briefcase },
            { id: 'expenses', label: 'Despesas/Ativos', icon: Truck },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* DASHBOARD GERAL */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Faturamento Bruto', value: 'R$ 29.450', sub: 'Recorde Mensal', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Total Despesas', value: 'R$ 15.500', sub: 'Folha + Operacional', icon: TrendingDown, color: 'text-rose-500', bg: 'bg-rose-50' },
              { label: 'Lucro Líquido', value: 'R$ 13.950', sub: 'Margem 47%', icon: Wallet, color: 'text-blue-500', bg: 'bg-blue-50' },
              { label: 'Inadimplência', value: 'R$ 1.280', sub: '3 alunos em atraso', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 group hover:border-emerald-200 transition-all">
                <div className="flex justify-between items-start">
                   <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:rotate-12 transition-transform`}>
                     <stat.icon size={24} />
                   </div>
                   <div className="text-right">
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                   </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                   <p className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>{stat.sub}</p>
                   <ArrowUpRight size={14} className="text-slate-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm h-[500px]">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Fluxo Comparativo</h3>
                 <div className="flex gap-4 text-[9px] font-black uppercase">
                    <span className="flex items-center gap-1.5 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Receitas</span>
                    <span className="flex items-center gap-1.5 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500" /> Despesas</span>
                 </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="receita" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                    <Line type="monotone" dataKey="despesa" stroke="#f43f5e" strokeWidth={3} dot={{r: 5, fill: '#f43f5e'}} />
                 </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="lg:col-span-4 bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between overflow-hidden relative">
               <div className="relative z-10">
                  <Sparkles className="text-emerald-400 mb-6" size={32} />
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4">Análise AI de Saúde</h3>
                  <p className="text-lg text-emerald-50/70 leading-relaxed italic">
                    "O custo com folha representa 31% do faturamento. Sua margem está saudável, mas há um aumento de 5% no custo de manutenção de equipamentos."
                  </p>
               </div>
               <div className="relative z-10 pt-10 border-t border-white/10 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Eficiência de Caixa</span>
                     <span className="text-emerald-400">Excelente</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[92%]" />
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* MÓDULO DE MENSALIDADES / ALUNOS */}
      {activeTab === 'students' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                   <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic">Status de Mensalidades</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Controle de pagamentos e inadimplência</p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                      <input placeholder="Buscar aluno..." className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-xs focus:bg-white focus:border-emerald-500 shadow-sm" />
                   </div>
                   <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg">Cobrança em Massa</button>
                </div>
             </div>
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50/30 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
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
                      { name: 'Bianca Viana', plan: 'Anual Gold', due: '12/12/2024', val: '450,00', status: 'pago' },
                      { name: 'Juliana Paes', plan: 'Mensal Solo', due: '10/12/2024', val: '380,00', status: 'atrasado' },
                      { name: 'Ricardo Melo', plan: 'Trimestral', due: '15/12/2024', val: '410,00', status: 'pendente' },
                   ].map((aluno, i) => (
                     <tr key={i} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-10 py-6 font-black text-slate-900 uppercase italic text-sm">{aluno.name}</td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-500">{aluno.plan}</td>
                        <td className="px-10 py-6 text-xs font-bold text-slate-500">{aluno.due}</td>
                        <td className="px-10 py-6 font-black text-slate-900">R$ {aluno.val}</td>
                        <td className="px-10 py-6 text-center">
                           <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                             aluno.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                             aluno.status === 'atrasado' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                             {aluno.status}
                           </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                           {aluno.status === 'atrasado' ? (
                             <button className="text-[9px] font-black text-rose-500 uppercase hover:underline">Cobrar Via WhatsApp</button>
                           ) : (
                             <button className="text-[9px] font-black text-slate-400 uppercase hover:text-emerald-500 transition-colors">Visualizar Recibo</button>
                           )}
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      )}

      {/* MÓDULO DE FOLHA DE PAGAMENTO (STAFF) */}
      {activeTab === 'staff' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {[
               { name: 'Julia Mendes', role: 'Fisioterapeuta Master', salary: '4.500,00', status: 'Pago', date: '05/12' },
               { name: 'Carlos Alberto', role: 'Diretor Geral', salary: '8.000,00', status: 'Pago', date: '05/12' },
               { name: 'Mariana Silva', role: 'Instrutora Solo', salary: '2.800,00', status: 'Aguardando', date: '05/12' },
             ].map((staff, i) => (
               <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                     <div className="w-16 h-16 bg-slate-900 text-white rounded-[20px] flex items-center justify-center font-black text-2xl group-hover:rotate-6 transition-transform">
                        {staff.name[0]}
                     </div>
                     <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase border ${staff.status === 'Pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {staff.status}
                     </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic leading-none mb-1">{staff.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{staff.role}</p>
                  <div className="flex justify-between items-end pt-6 border-t border-slate-50">
                     <div>
                        <p className="text-[9px] font-black text-slate-300 uppercase">Salário Mensal</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">R$ {staff.salary}</p>
                     </div>
                     <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
                        <Receipt size={18} />
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* MÓDULO DE DESPESAS E ATIVOS (FORNECEDORES/EQUIPAMENTOS) */}
      {activeTab === 'expenses' && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic">Gestão de Fornecedores & Compras</h3>
                    <button onClick={() => setShowAddModal(true)} className="bg-slate-950 text-white px-6 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all">Novo Pedido / Despesa</button>
                 </div>
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                          <th className="px-10 py-5">Item / Fornecedor</th>
                          <th className="px-10 py-5">Categoria</th>
                          <th className="px-10 py-5">Vencimento</th>
                          <th className="px-10 py-5 text-right">Valor</th>
                          <th className="px-10 py-5 text-center">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {[
                          { item: 'Manutenção Reformers', supplier: 'TechPilates BR', cat: 'Equipamentos', due: '18/12', val: '1.250,00', status: 'Pago' },
                          { item: 'Kit Meias Antiderrapantes', supplier: 'MeiaTop Confecções', cat: 'Estoque', due: '20/12', val: '450,00', status: 'Pendente' },
                          { item: 'Aluguel Studio Matriz', supplier: 'Imobiliária Central', cat: 'Operacional', due: '05/01', val: '4.200,00', status: 'Agendado' },
                          { item: 'Software PilaFlex Global', supplier: 'Cloud Solutions', cat: 'Sistemas', due: 'Hoje', val: '199,00', status: 'Vencendo' },
                       ].map((exp, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-10 py-6">
                               <p className="font-black text-slate-900 uppercase italic text-sm">{exp.item}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{exp.supplier}</p>
                            </td>
                            <td className="px-10 py-6 text-xs font-bold text-slate-500">{exp.cat}</td>
                            <td className="px-10 py-6 text-xs font-bold text-slate-500">{exp.due}</td>
                            <td className="px-10 py-6 font-black text-slate-900 text-right">R$ {exp.val}</td>
                            <td className="px-10 py-6 text-center">
                               <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                                 exp.status === 'Pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                 exp.status === 'Vencendo' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-500 border-slate-100'
                               }`}>
                                 {exp.status}
                               </span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="lg:col-span-4 space-y-8">
                 <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm h-full flex flex-col justify-between">
                    <div>
                       <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-8">Patrimônio (Ativos)</h3>
                       <div className="space-y-6">
                          {[
                             { label: 'Aparelhos Reformer (6un)', value: 'R$ 42.000' },
                             { label: 'Cadillacs / Wall Units', value: 'R$ 18.500' },
                             { label: 'Acessórios / Bolas / Meias', value: 'R$ 5.400' },
                          ].map(asset => (
                            <div key={asset.label} className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{asset.label}</p>
                               <p className="text-xl font-black text-slate-900 italic tracking-tighter">{asset.value}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="pt-10 mt-10 border-t border-slate-50">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Valor Total Estimado</p>
                       <h4 className="text-4xl font-black text-slate-950 tracking-tighter italic">R$ 65.900</h4>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MODAL DE LANÇAMENTO PREMIUM */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-300">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Movimento ERP</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Registrar nova transação financeira</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    <button className="p-6 bg-emerald-50 text-emerald-600 border-2 border-emerald-500 rounded-3xl flex flex-col items-center gap-2">
                       <ArrowUpRight size={24} />
                       <span className="font-black text-[10px] uppercase tracking-widest">Receita Aluno</span>
                    </button>
                    <button className="p-6 bg-slate-50 text-slate-400 border-2 border-transparent rounded-3xl flex flex-col items-center gap-2 hover:bg-rose-50 hover:text-rose-600 transition-all">
                       <ArrowDownRight size={24} />
                       <span className="font-black text-[10px] uppercase tracking-widest">Despesa Staff/Fornecedor</span>
                    </button>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição do Lançamento</label>
                       <input placeholder="Ex: Pagamento Fornecedor de Molas" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria Enterprise</label>
                          <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 outline-none focus:bg-white">
                             <option>Folha Staff</option>
                             <option>Equipamentos</option>
                             <option>Marketing / ADS</option>
                             <option>Operacional Studio</option>
                             <option>Impostos / Taxas</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor do Título</label>
                          <input placeholder="R$ 0,00" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-lg text-slate-900 outline-none focus:bg-white" />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button onClick={() => setShowAddModal(false)} className="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Efetivar Lançamento</button>
              </div>
           </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DE LANÇAMENTO RÁPIDO */}
      <div className="fixed bottom-10 right-10 z-[100]">
         <button onClick={() => setShowAddModal(true)} className="w-20 h-20 bg-emerald-500 text-white rounded-[32px] shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all active:scale-95 group">
            <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
         </button>
      </div>

    </div>
  );
};

export default Finance;
