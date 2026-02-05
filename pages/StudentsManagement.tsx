
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Calendar,
  Filter,
  Trash2,
  Edit2,
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Camera,
  MapPin,
  CreditCard,
  FileText,
  Activity,
  UserCircle,
  Briefcase,
  HeartPulse,
  ClipboardList
} from 'lucide-react';

const studentsData = [
  { id: 1, name: 'Maria Eduarda', email: 'maria@email.com', phone: '(11) 98765-4321', plan: 'Trimestral', status: 'Ativo', lastClass: '2024-11-20' },
  { id: 2, name: 'João Silva', email: 'joao@email.com', phone: '(11) 91234-5678', plan: 'Mensal', status: 'Ativo', lastClass: '2024-11-19' },
  { id: 3, name: 'Ana Beatriz', email: 'ana@email.com', phone: '(11) 94444-5555', plan: 'Anual', status: 'Inativo', lastClass: '2024-10-05' },
];

const StudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(false);
    alert('Prontuário de aluno criado com sucesso no banco de dados!');
  };

  return (
    <div className="p-8 md:p-12 space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <Users size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Base de Membros</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Gestão de <span className="text-emerald-500">Alunos</span></h1>
          <p className="text-slate-500 font-medium text-lg">Centralize cadastros, evoluções e planos financeiros.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
          Novo Aluno
        </button>
      </header>

      {/* Tabela de Alunos */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nome, e-mail ou CPF..."
              className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[28px] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-sm text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button className="p-5 bg-white border border-slate-200 rounded-[24px] text-slate-400 hover:text-emerald-500 shadow-sm transition-all"><Filter size={20} /></button>
            <select className="px-8 py-5 bg-white border border-slate-200 rounded-[24px] text-slate-600 outline-none focus:border-emerald-500 font-black text-[10px] uppercase tracking-widest shadow-sm">
              <option>Todos os Status</option>
              <option>Ativos</option>
              <option>Inativos</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/20 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identificação</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contato</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Plano</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {studentsData.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[22px] bg-slate-900 text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-emerald-500 transition-all">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg tracking-tighter leading-none mb-1 uppercase italic">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">ID: PF-{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-600">{student.email}</p>
                      <p className="text-xs font-bold text-slate-400">{student.phone}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600">{student.plan}</span>
                  </td>
                  <td className="px-10 py-8 text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${student.status === 'Ativo' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      {student.status}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-emerald-500 rounded-xl transition-all"><Edit2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CADASTRO FICHA COMPLETA */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[120] flex items-center justify-center p-4">
           <form onSubmit={handleRegister} className="bg-white w-full max-w-6xl h-[92vh] rounded-[56px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-white/20">
              
              {/* Header */}
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-950 rounded-[24px] flex items-center justify-center text-emerald-500 shadow-xl">
                      <UserPlus size={32} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Matrícula <span className="text-emerald-500">Premium</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Dossiê completo do novo aluno</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => setIsAdding(false)} className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">
                   <X size={28} />
                 </button>
              </div>

              {/* Conteúdo Rolável */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 bg-slate-50/20">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Lateral Esquerda: Foto e Documentos */}
                    <div className="lg:col-span-4 space-y-10">
                       <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center">
                          <div className="relative group">
                             <div className="w-44 h-44 rounded-[48px] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center group-hover:border-emerald-500 transition-all">
                                <Camera size={48} className="text-slate-300 group-hover:scale-110 transition-transform" />
                             </div>
                             <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                                <Plus size={24} />
                             </div>
                          </div>
                          <p className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Foto de Identificação</p>
                       </div>

                       <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                             <FileText className="text-emerald-500" size={18} />
                             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Documentação</h3>
                          </div>
                          <div className="space-y-4">
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CPF</label>
                                <input required placeholder="000.000.000-00" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RG / Org. Emissor</label>
                                <input placeholder="0.000.000-0 SSP/UF" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profissão / Empresa</label>
                                <div className="relative mt-2">
                                   <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                   <input placeholder="Ex: Arquiteta - Escritório X" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Lado Direito: Pessoal, Endereço e Anamnese */}
                    <div className="lg:col-span-8 space-y-10">
                       {/* Bloco 1: Dados Pessoais */}
                       <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
                          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                             <UserCircle className="text-emerald-500" size={20} />
                             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">01. Dados Pessoais e Contato</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                                <input required className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-black uppercase text-sm italic" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Principal</label>
                                <input required type="email" placeholder="nome@email.com" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Celular / WhatsApp</label>
                                <input required placeholder="(00) 00000-0000" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                          </div>
                       </div>

                       {/* Bloco 2: Endereço Completo */}
                       <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
                          <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                             <MapPin className="text-emerald-500" size={20} />
                             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">02. Localização Residencial</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CEP</label>
                                <input placeholder="00000-000" className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rua / Logradouro</label>
                                <input className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Número</label>
                                <input className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bairro</label>
                                <input className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade / UF</label>
                                <input className="w-full mt-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                             </div>
                          </div>
                       </div>

                       {/* Bloco 3: Anamnese e Saúde */}
                       <div className="bg-emerald-950 p-10 rounded-[48px] text-white shadow-2xl space-y-8">
                          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                             <HeartPulse className="text-emerald-400" size={20} />
                             <h3 className="text-xs font-black uppercase tracking-widest">03. Prontuário Clínico (Anamnese)</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-6">
                                <div>
                                   <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-1">Contato de Emergência</label>
                                   <input placeholder="Nome do parente/amigo" className="w-full mt-2 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                                </div>
                                <div>
                                   <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-1">Telefone Emergência</label>
                                   <input placeholder="(00) 00000-0000" className="w-full mt-2 p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-emerald-500 font-bold" />
                                </div>
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-emerald-400 uppercase tracking-widest ml-1">Observações de Saúde (Doenças, Dores, Cirurgias)</label>
                                <textarea rows={5} className="w-full mt-2 p-5 bg-white/5 border border-white/10 rounded-[32px] outline-none focus:border-emerald-500 text-sm font-medium resize-none" placeholder="Ex: Hérnia de disco L4-L5, cirurgia no joelho em 2022..."></textarea>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="p-10 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-4 shrink-0">
                 <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 py-6 border-2 border-slate-100 text-slate-400 rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-50 transition-all"
                 >
                    Descartar Cadastro
                 </button>
                 <button 
                  type="submit" 
                  className="flex-[2] py-6 bg-emerald-500 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <CheckCircle2 size={20} />
                    Finalizar e Salvar Ficha do Aluno
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
