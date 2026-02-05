
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  Plus, 
  ChevronRight,
  Info,
  CheckCircle2,
  X,
  Save,
  Search,
  Key
} from 'lucide-react';

interface PermissionRole {
  id: string;
  name: string;
  description: string;
  modules: {
    name: string;
    id: string;
    access: 'none' | 'read' | 'full';
  }[];
}

const initialRoles: PermissionRole[] = [
  {
    id: '1',
    name: 'Master / Dono',
    description: 'Acesso irrestrito a todas as funções do sistema e dados sensíveis.',
    modules: [
      { id: 'dashboard', name: 'Dashboard BI', access: 'full' },
      { id: 'finance', name: 'Financeiro ERP', access: 'full' },
      { id: 'students', name: 'Alunos', access: 'full' },
      { id: 'staff', name: 'Equipe & Staff', access: 'full' },
      { id: 'permissions', name: 'Permissões', access: 'full' }
    ]
  },
  {
    id: '2',
    name: 'Fisioterapeuta Master',
    description: 'Gestão de alunos, agenda e treinos. Sem acesso ao financeiro master.',
    modules: [
      { id: 'dashboard', name: 'Dashboard BI', access: 'read' },
      { id: 'finance', name: 'Financeiro ERP', access: 'none' },
      { id: 'students', name: 'Alunos', access: 'full' },
      { id: 'staff', name: 'Equipe & Staff', access: 'read' },
      { id: 'permissions', name: 'Permissões', access: 'none' }
    ]
  },
  {
    id: '3',
    name: 'Recepção / ADM',
    description: 'Gestão de agenda e mensalidades. Bloqueado para edição de equipe.',
    modules: [
      { id: 'dashboard', name: 'Dashboard BI', access: 'read' },
      { id: 'finance', name: 'Financeiro ERP', access: 'read' },
      { id: 'students', name: 'Alunos', access: 'full' },
      { id: 'staff', name: 'Equipe & Staff', access: 'none' },
      { id: 'permissions', name: 'Permissões', access: 'none' }
    ]
  }
];

const PermissionsManagement: React.FC = () => {
  const [roles, setRoles] = useState<PermissionRole[]>(initialRoles);
  const [editingRole, setEditingRole] = useState<PermissionRole | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleToggleAccess = (moduleId: string) => {
    if (!editingRole) return;
    
    const newModules = editingRole.modules.map(mod => {
      if (mod.id === moduleId) {
        const nextAccess: any = mod.access === 'none' ? 'read' : mod.access === 'read' ? 'full' : 'none';
        return { ...mod, access: nextAccess };
      }
      return mod;
    });

    setEditingRole({ ...editingRole, modules: newModules });
  };

  const handleSave = () => {
    if (!editingRole) return;
    setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
    setEditingRole(null);
  };

  return (
    <div className="p-4 md:p-8 xl:p-12 space-y-8 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-40">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <ShieldCheck size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Controle de Governança</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Cargos & <span className="text-emerald-500">Permissões</span></h1>
          <p className="text-slate-500 font-medium">Defina quem pode visualizar ou gerenciar cada área do studio.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Novo Cargo
        </button>
      </header>

      {/* INFO BANNER */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[32px] flex items-center gap-6">
         <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Key size={28} />
         </div>
         <div className="flex-1">
            <h3 className="text-emerald-900 font-black text-sm uppercase italic tracking-tight">Segurança Habilitada</h3>
            <p className="text-emerald-800/60 text-xs font-medium leading-relaxed">
              Alterações de permissões são aplicadas em tempo real. Usuários conectados serão notificados para atualizar suas sessões caso o acesso a um módulo seja revogado.
            </p>
         </div>
      </div>

      {/* ROLES LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-4">
           {roles.map((role) => (
             <div key={role.id} className="bg-white p-6 md:p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                   <div className="w-16 h-16 bg-slate-950 text-white rounded-[24px] flex items-center justify-center font-black text-2xl group-hover:rotate-6 transition-transform">
                      {role.name[0]}
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">{role.name}</h3>
                      <p className="text-slate-400 text-xs font-medium max-w-md">{role.description}</p>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-center">
                   {role.modules.filter(m => m.access !== 'none').map(m => (
                     <span key={m.id} className="px-3 py-1.5 bg-slate-50 text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-100 rounded-xl">
                        {m.name} {m.access === 'full' ? '★' : ''}
                     </span>
                   ))}
                </div>

                <div className="flex items-center gap-2">
                   <button 
                    onClick={() => setEditingRole(role)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-500 hover:text-white transition-all border border-slate-100 group/btn"
                   >
                      <Edit3 size={14} className="group-hover/btn:scale-110 transition-transform" /> Gerenciar
                   </button>
                   <button className="p-3 bg-slate-50 text-slate-300 rounded-xl hover:text-rose-500 transition-all border border-slate-100">
                      <Trash2 size={16} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* MODAL DE EDIÇÃO DE PERMISSÕES - COMPACTO E ELEGANTE */}
      {editingRole && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                       <ShieldCheck size={24} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Permissões: <span className="text-emerald-500">{editingRole.name}</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Configure o nível de acesso por módulo</p>
                    </div>
                 </div>
                 <button onClick={() => setEditingRole(null)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-8 md:p-10 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 <div className="space-y-4">
                    {editingRole.modules.map((mod) => (
                      <div key={mod.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-[28px] border border-slate-100 group hover:border-emerald-200 transition-all">
                         <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${mod.access === 'none' ? 'bg-slate-200 text-slate-400' : 'bg-white text-emerald-500 shadow-sm'}`}>
                               {mod.access === 'none' ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                            <div>
                               <p className="font-black text-slate-900 uppercase italic text-sm leading-none mb-1">{mod.name}</p>
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acesso {mod.access === 'full' ? 'Irrestrito' : mod.access === 'read' ? 'Apenas Visualização' : 'Bloqueado'}</p>
                            </div>
                         </div>
                         
                         <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                            <button 
                              onClick={() => handleToggleAccess(mod.id)}
                              className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${mod.access === 'none' ? 'bg-rose-50 text-rose-600' : mod.access === 'read' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-500 text-white shadow-lg'}`}
                            >
                              Alternar Nível
                            </button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 <div className="flex-1 flex items-center gap-3 text-slate-400">
                    <Info size={16} />
                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">As alterações serão registradas no log de auditoria do sistema.</p>
                 </div>
                 <button 
                  onClick={handleSave}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Save size={18} /> Aplicar Permissões
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default PermissionsManagement;
