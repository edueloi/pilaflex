
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
  Smartphone
} from 'lucide-react';

const staffData = [
  { id: 1, name: 'Carlos Alberto', role: 'Dono / Master', email: 'carlos@pilaflex.com', permissions: ['all'], status: 'Online' },
  { id: 2, name: 'Julia Mendes', role: 'Fisioterapeuta', email: 'julia@pilaflex.com', permissions: ['agenda', 'students'], status: 'Ausente' },
];

const StaffManagement: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-8 md:p-12 space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <ShieldCheck size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Controle Administrativo</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Minha <span className="text-emerald-500">Equipe</span></h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie acessos e papéis dos seus instrutores e colaboradores.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-12 transition-transform" />
          Novo Membro
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staffData.map((staff) => (
          <div key={staff.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group p-8 flex flex-col">
             <div className="flex justify-between items-start mb-6">
                <div className="relative">
                   <div className="w-20 h-20 rounded-[28px] bg-slate-950 text-white flex items-center justify-center font-black text-3xl shadow-xl transform group-hover:rotate-6 transition-all">
                      {staff.name[0]}
                   </div>
                   <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${staff.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                </div>
                <button className="text-slate-200 hover:text-slate-900 transition-colors"><MoreVertical size={24} /></button>
             </div>
             
             <div className="space-y-1 mb-6">
                <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">{staff.name}</h3>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{staff.role}</p>
             </div>

             <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                   <Mail size={16} /> {staff.email}
                </div>
                <div className="pt-4 border-t border-slate-50">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Permissões</p>
                   <div className="flex flex-wrap gap-2">
                      {staff.permissions.map(p => (
                        <span key={p} className="px-3 py-1 bg-slate-50 text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-100 rounded-lg">
                           {p === 'all' ? 'Acesso Total' : p}
                        </span>
                      ))}
                   </div>
                </div>
             </div>

             <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                   <Edit2 size={14} /> Editar
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-500 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                   <Lock size={14} /> Bloquear
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* Modal Add Staff */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[120] flex items-center justify-center p-4">
           <form onSubmit={(e) => { e.preventDefault(); setIsAdding(false); }} className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
              <div className="p-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Membro</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Configuração de acesso ao sistema</p>
                 </div>
                 <button type="button" onClick={() => setIsAdding(false)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-12 space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Colaborador</label>
                    <div className="relative">
                       <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input 
                         required autoFocus placeholder="Nome completo"
                         className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" 
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail Corporativo</label>
                    <div className="relative">
                       <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                       <input required type="email" placeholder="email@pilaflex.com" className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold" />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Papel / Função</label>
                       <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 outline-none focus:bg-white">
                          <option>Instrutor Master</option>
                          <option>Instrutor Solo</option>
                          <option>Recepção</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone</label>
                       <div className="relative">
                          <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input placeholder="(00) 00000-0000" className="w-full pl-12 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-12 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button type="submit" className="w-full py-6 bg-emerald-500 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">Criar Acesso</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
