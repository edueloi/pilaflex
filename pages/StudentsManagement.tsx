
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  UserPlus, 
  Edit2, 
  X, 
  Save, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Dumbbell,
  Receipt
} from 'lucide-react';

const StudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'Maria Eduarda', email: 'maria@email.com', phone: '(11) 98765-4321', plan: 'Trimestral', status: 'pago', due: '12/12' },
    { id: 2, name: 'João Silva', email: 'joao@email.com', phone: '(11) 91234-5678', plan: 'Mensal', status: 'atrasado', due: '05/12' },
    { id: 3, name: 'Ana Beatriz', email: 'ana@email.com', phone: '(11) 94444-5555', plan: 'Anual', status: 'pendente', due: '15/12' },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Mensal',
    value: '',
    dueDay: '05'
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now();
    const student = {
      id,
      name: newStudent.name,
      email: newStudent.email,
      phone: newStudent.phone,
      plan: newStudent.plan,
      status: 'pendente',
      due: `${newStudent.dueDay}/12`
    };
    setStudents([student, ...students]);
    setIsAdding(false);
    setNewStudent({ name: '', email: '', phone: '', plan: 'Mensal', value: '', dueDay: '05' });
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <Users size={16} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Gestão de Membros</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Matriz de <span className="text-emerald-500">Alunos</span></h1>
          <p className="text-slate-500 font-medium">Controle de matrículas, pagamentos e prontuários.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" /> Novo Aluno
        </button>
      </header>

      {/* FILTER & LIST */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-xl w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              placeholder="Buscar aluno por nome ou CPF..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-3 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-all">Exportar PDF</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-10 py-5">Identificação</th>
                <th className="px-10 py-5">Plano / Venc.</th>
                <th className="px-10 py-5 text-center">Status Pagamento</th>
                <th className="px-10 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm uppercase italic leading-none">{student.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-700 uppercase">{student.plan}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Todo dia {student.due.split('/')[0]}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                      student.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      student.status === 'atrasado' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-all shadow-sm"><Receipt size={16} /></button>
                       <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-all shadow-sm"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CADASTRO CORRIGIDO */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <form onSubmit={handleAddStudent} className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Matricular <span className="text-emerald-500">Aluno</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Criando novo acesso e ficha financeira</p>
                 </div>
                 <button type="button" onClick={() => setIsAdding(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-8 md:p-10 space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                       <input 
                        required 
                        placeholder="Nome do aluno" 
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all"
                        value={newStudent.name}
                        onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                          <input 
                            required type="email" 
                            placeholder="aluno@email.com" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white"
                            value={newStudent.email}
                            onChange={e => setNewStudent({...newStudent, email: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone (WhatsApp)</label>
                          <input 
                            placeholder="(00) 00000-0000" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white"
                            value={newStudent.phone}
                            onChange={e => setNewStudent({...newStudent, phone: e.target.value})}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plano</label>
                          <select 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none"
                            value={newStudent.plan}
                            onChange={e => setNewStudent({...newStudent, plan: e.target.value})}
                          >
                             <option>Mensal</option>
                             <option>Trimestral</option>
                             <option>Semestral</option>
                             <option>Anual</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vencimento (Dia)</label>
                          <input 
                            type="number" 
                            placeholder="05" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none"
                            value={newStudent.dueDay}
                            onChange={e => setNewStudent({...newStudent, dueDay: e.target.value})}
                          />
                       </div>
                       <div className="col-span-2 md:col-span-1 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Valor Mensal</label>
                          <input 
                            placeholder="R$ 0,00" 
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-emerald-600 outline-none"
                            value={newStudent.value}
                            onChange={e => setNewStudent({...newStudent, value: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <Save size={18} /> Confirmar Matrícula
                 </button>
              </div>
           </form>
        </div>
      )}

    </div>
  );
};

export default StudentsManagement;
