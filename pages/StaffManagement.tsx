
import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Plus, 
  X, 
  MoreVertical, 
  Trash2, 
  Edit2, 
  Zap,
  Star,
  CheckCircle2,
  Lock,
  Mail,
  Smartphone,
  TrendingUp,
  Clock,
  DollarSign,
  Award,
  Calendar,
  ChevronRight,
  Heart,
  Save,
  UserCheck
} from 'lucide-react';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'Disponível' | 'Em Aula' | 'Ausente';
  salary: string;
  commission: string;
  rating: number;
  retention: string;
  attendances: number;
  schedule: string;
  specialties: string[];
  permissions: string[];
}

const staffData: StaffMember[] = [
  { 
    id: 1, 
    name: 'Carlos Alberto', 
    role: 'Diretor Master', 
    email: 'carlos@pilaflex.com', 
    phone: '(11) 98888-7766',
    status: 'Disponível',
    salary: '12.500',
    commission: '0%',
    rating: 5.0,
    retention: '98%',
    attendances: 1450,
    schedule: '08:00 - 18:00',
    specialties: ['Gestão Esportiva', 'Fisioterapia'],
    permissions: ['Todas']
  },
  { 
    id: 2, 
    name: 'Julia Mendes', 
    role: 'Fisioterapeuta Sênior', 
    email: 'julia@pilaflex.com', 
    phone: '(11) 97766-5544',
    status: 'Em Aula',
    salary: '5.200',
    commission: '15%',
    rating: 4.9,
    retention: '92%',
    attendances: 840,
    schedule: '07:00 - 13:00',
    specialties: ['Reforma Avançado', 'Pilates Solo'],
    permissions: ['Agenda', 'Alunos']
  },
];

const StaffManagement: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'basic' | 'pro' | 'finance'>('basic');
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Disponível': return 'bg-emerald-500';
      case 'Em Aula': return 'bg-amber-500';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER E RESUMO OPERACIONAL */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <ShieldCheck size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Recursos Humanos & Governança</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Capital <span className="text-emerald-500">Humano</span></h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie talentos, performance e custos operacionais da equipe.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="hidden xl:flex items-center gap-6 px-8 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm mr-4">
              <div className="text-center">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Custo Folha</p>
                 <p className="text-lg font-black text-slate-900 tracking-tighter">R$ 17.700</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">NPS Equipe</p>
                 <p className="text-lg font-black text-emerald-500 tracking-tighter">4.95</p>
              </div>
           </div>
           <button 
             onClick={() => { setIsAdding(true); setActiveModalTab('basic'); }}
             className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
           >
             <Plus size={20} className="group-hover:rotate-90 transition-transform" />
             Novo Profissional
           </button>
        </div>
      </header>

      {/* GRID DE CARDS PREMIUM */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {staffData.map((staff) => (
          <div key={staff.id} className="bg-white rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col relative overflow-hidden p-8">
             {/* Indicador de Status Flutuante */}
             <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(staff.status)} ${staff.status === 'Em Aula' ? 'animate-pulse' : ''}`} />
                <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{staff.status}</span>
             </div>

             <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                   <div className="w-24 h-24 rounded-[32px] bg-slate-950 text-white flex items-center justify-center font-black text-4xl shadow-2xl transform group-hover:rotate-3 transition-transform">
                      {staff.name[0]}
                   </div>
                </div>
                <div className="space-y-1">
                   <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight">{staff.name}</h3>
                   <div className="flex items-center gap-2 text-emerald-600">
                      <Briefcase size={14} />
                      <p className="text-[10px] font-black uppercase tracking-widest">{staff.role}</p>
                   </div>
                </div>
             </div>

             {/* MÉTRICAS DE PERFORMANCE */}
             <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                   <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                      <Star size={12} fill="currentColor" />
                      <span className="text-sm font-black tracking-tighter">{staff.rating}</span>
                   </div>
                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Avaliação</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                   <p className="text-sm font-black text-emerald-600 tracking-tighter mb-1">{staff.retention}</p>
                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Retenção</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center">
                   <p className="text-sm font-black text-slate-900 tracking-tighter mb-1">{staff.attendances}</p>
                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Aulas</p>
                </div>
             </div>

             {/* DETALHES OPERACIONAIS */}
             <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                   <div className="flex items-center gap-3">
                      <Clock size={16} className="text-slate-300" />
                      <span className="text-[10px] font-black text-slate-400 uppercase">Jornada</span>
                   </div>
                   <span className="text-xs font-black text-slate-700 italic">{staff.schedule}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                   {staff.specialties.map(spec => (
                     <span key={spec} className="px-3 py-1.5 bg-emerald-50 text-[8px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100 rounded-lg">
                        {spec}
                     </span>
                   ))}
                </div>
             </div>

             {/* AÇÕES DE GESTÃO */}
             <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10">
                   <Edit2 size={14} /> Perfil Completo
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 text-slate-400 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:text-rose-500 hover:border-rose-100 transition-all">
                   <Lock size={14} /> Acessos
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* MODAL DE CADASTRO 360º */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 overflow-y-auto">
           <form onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }} className="bg-white w-full max-w-2xl rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 my-auto">
              
              {/* Header Modal */}
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
                       <UserCheck size={28} />
                    </div>
                    <div>
                       <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Contratar <span className="text-emerald-500">Talento</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Sincronizando RH e Operações</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => setIsAdding(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              {/* Tabs Navigation */}
              <div className="px-10 pt-6 flex gap-8 border-b border-slate-50 bg-white">
                 {[
                   { id: 'basic', label: 'Identidade', icon: Users },
                   { id: 'pro', label: 'Profissional', icon: Award },
                   { id: 'finance', label: 'Financeiro', icon: DollarSign },
                 ].map(tab => (
                   <button 
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id as any)}
                    className={`pb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeModalTab === tab.id ? 'text-emerald-600' : 'text-slate-300'}`}
                   >
                     <tab.icon size={14} /> {tab.label}
                     {activeModalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.5)]" />}
                   </button>
                 ))}
              </div>

              {/* Form Content */}
              <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 {activeModalTab === 'basic' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                         <input required placeholder="Nome do colaborador" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                            <div className="relative">
                               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required type="email" placeholder="nome@pilaflex.com" className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold text-xs outline-none focus:bg-white" />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                            <div className="relative">
                               <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input placeholder="(00) 00000-0000" className="w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold text-xs outline-none focus:bg-white" />
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeModalTab === 'pro' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cargo / Função</label>
                            <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-black text-[10px] uppercase tracking-widest outline-none">
                               <option>Fisioterapeuta</option>
                               <option>Instrutor de Pilates</option>
                               <option>Recepção / Comercial</option>
                               <option>Gestor de Unidade</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Jornada Semanal</label>
                            <input placeholder="Ex: 07h às 13h (Seg a Sex)" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-bold text-xs outline-none focus:bg-white" />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidades (Separadas por vírgula)</label>
                         <textarea rows={3} placeholder="Ex: Reformer, Cadillac, Solo, Gestantes..." className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-medium text-xs outline-none focus:bg-white resize-none" />
                      </div>
                   </div>
                 )}

                 {activeModalTab === 'finance' && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="bg-emerald-50/50 p-8 rounded-[40px] border border-emerald-100 grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Salário Base (R$)</label>
                            <input placeholder="0,00" className="w-full p-5 bg-white border border-emerald-200 rounded-3xl font-black text-xl outline-none text-emerald-700 shadow-sm" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Comissão p/ Aula (%)</label>
                            <input placeholder="0%" className="w-full p-5 bg-white border border-emerald-200 rounded-3xl font-black text-xl outline-none text-emerald-700 shadow-sm" />
                         </div>
                      </div>
                      <div className="flex items-center gap-4 bg-slate-900 p-6 rounded-3xl text-white">
                         <TrendingUp className="text-emerald-400" size={24} />
                         <div>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Previsão de Custo Mensal</p>
                            <p className="text-sm font-bold">Base + Estimativa de 40 aulas/mês</p>
                         </div>
                         <div className="ml-auto text-right">
                            <p className="text-xl font-black text-emerald-400 italic tracking-tighter">R$ 0,00</p>
                         </div>
                      </div>
                   </div>
                 )}
              </div>

              {/* Footer Modal */}
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 <div className="flex-1 flex items-center gap-3 text-slate-400">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">As permissões de acesso ao sistema serão enviadas por e-mail após a ativação.</p>
                 </div>
                 <button type="submit" className="w-full sm:w-auto px-12 py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <Save size={18} /> Salvar Membro
                 </button>
              </div>
           </form>
        </div>
      )}

    </div>
  );
};

export default StaffManagement;
