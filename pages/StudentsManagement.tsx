
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  UserPlus, 
  Edit2, 
  X, 
  Save, 
  Calendar,
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Dumbbell,
  Receipt,
  MapPin,
  Fingerprint,
  Heart,
  Scale,
  Activity,
  ChevronRight,
  TrendingUp,
  Stethoscope,
  Briefcase
} from 'lucide-react';

interface BMIHistory {
  date: string;
  weight: number;
  bmi: number;
}

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'pago' | 'atrasado' | 'pendente';
  due: string;
  // Novos campos
  rg: string;
  cpf: string;
  dob: string;
  profession: string;
  address: string;
  weight: number;
  height: number;
  bmi: number;
  bmiStatus: string;
  healthNotes: string;
  bmiHistory: BMIHistory[];
}

const calculateBMI = (weight: number, height: number) => {
  if (!weight || !height) return { bmi: 0, status: '-' };
  const hMeters = height / 100;
  const bmi = weight / (hMeters * hMeters);
  let status = 'Normal';
  if (bmi < 18.5) status = 'Abaixo do Peso';
  else if (bmi < 25) status = 'Peso Ideal';
  else if (bmi < 30) status = 'Sobrepeso';
  else status = 'Obesidade';
  return { bmi: parseFloat(bmi.toFixed(2)), status };
};

const StudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'basic' | 'address' | 'health'>('basic');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, name: 'Maria Eduarda', email: 'maria@email.com', phone: '(11) 98765-4321', 
      plan: 'Trimestral', status: 'pago', due: '12/12',
      rg: '12.345.678-9', cpf: '123.456.789-00', dob: '1995-05-15', profession: 'Advogada',
      address: 'Rua das Flores, 123 - SP', weight: 65, height: 168, bmi: 23.03, bmiStatus: 'Peso Ideal',
      healthNotes: 'Leve dor lombar ao acordar. Pratica Yoga.',
      bmiHistory: [{ date: '2024-10-01', weight: 67, bmi: 23.7 }, { date: '2024-11-15', weight: 65, bmi: 23.03 }]
    },
    { 
      id: 2, name: 'João Silva', email: 'joao@email.com', phone: '(11) 91234-5678', 
      plan: 'Mensal', status: 'atrasado', due: '05/12',
      rg: '98.765.432-1', cpf: '987.654.321-11', dob: '1988-11-20', profession: 'Engenheiro',
      address: 'Av. Paulista, 1000 - SP', weight: 88, height: 180, bmi: 27.16, bmiStatus: 'Sobrepeso',
      healthNotes: 'Hipertenso controlado. Cirurgia no joelho esquerdo em 2021.',
      bmiHistory: [{ date: '2024-11-01', weight: 90, bmi: 27.7 }]
    }
  ]);

  const [formData, setFormData] = useState<Partial<Student>>({
    name: '', email: '', phone: '', rg: '', cpf: '', dob: '', profession: '', 
    address: '', plan: 'Mensal', weight: 0, height: 0, healthNotes: ''
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const { bmi, status } = calculateBMI(Number(formData.weight), Number(formData.height));
    const newEntry: Student = {
      ...formData as any,
      id: Date.now(),
      status: 'pendente',
      due: '05/12',
      bmi,
      bmiStatus: status,
      bmiHistory: [{ date: new Date().toISOString().split('T')[0], weight: Number(formData.weight), bmi }]
    };
    setStudents([newEntry, ...students]);
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', rg: '', cpf: '', dob: '', profession: '', address: '', plan: 'Mensal', weight: 0, height: 0, healthNotes: '' });
    setActiveModalTab('basic');
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.cpf.includes(searchTerm)
    );
  }, [students, searchTerm]);

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <Users size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Prontuário Digital v3.0</span>
          </div>
          <h1 className="text-4xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Matriz de <span className="text-emerald-500">Alunos</span></h1>
          <p className="text-slate-500 font-medium">Gestão completa bio-psicossocial e financeira.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" /> Matricular Aluno
        </button>
      </header>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Ativos', val: students.length, color: 'text-emerald-500', icon: Users },
          { label: 'IMC Médio', val: '24.2', color: 'text-blue-500', icon: Scale },
          { label: 'Atrasados', val: '1', color: 'text-rose-500', icon: AlertCircle },
          { label: 'Saúde em Dia', val: '92%', color: 'text-amber-500', icon: Heart },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <stat.icon size={18} className={`${stat.color} mb-3`} />
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* FILTER & LIST */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-xl w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              placeholder="Buscar por nome, CPF ou profissão..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold text-sm shadow-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-500 transition-all shadow-sm">
            <Activity size={16} /> Relatório de Saúde
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-10 py-5">Identificação / CPF</th>
                <th className="px-10 py-5">Profissão / Plano</th>
                <th className="px-10 py-5 text-center">Biometria (IMC)</th>
                <th className="px-10 py-5 text-center">Pagamento</th>
                <th className="px-10 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer" onClick={() => setSelectedStudent(student)}>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg group-hover:rotate-6 transition-transform">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm uppercase italic leading-none">{student.name}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{student.cpf}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-slate-700 uppercase italic leading-none">{student.profession}</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{student.plan}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex flex-col items-center">
                       <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
                         student.bmiStatus === 'Peso Ideal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                       }`}>
                         {student.bmi} - {student.bmiStatus}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                      student.status === 'pago' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-emerald-500 transition-all shadow-sm"><Edit2 size={16} /></button>
                       <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-rose-500 transition-all shadow-sm"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE CADASTRO STEP-BY-STEP (Tabs) */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4 overflow-y-auto">
           <form onSubmit={handleAddStudent} className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 my-auto">
              {/* Header Modal */}
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                       <UserPlus size={24} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Membro</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Prencha o prontuário completo</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              {/* Tabs Navigation */}
              <div className="px-8 pt-6 flex gap-4 border-b border-slate-50">
                 {[
                   { id: 'basic', label: 'Dados Básicos', icon: Fingerprint },
                   { id: 'address', label: 'Endereço', icon: MapPin },
                   { id: 'health', label: 'Saúde & Biometria', icon: Activity },
                 ].map(tab => (
                   <button 
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveModalTab(tab.id as any)}
                    className={`pb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeModalTab === tab.id ? 'text-emerald-600' : 'text-slate-300'}`}
                   >
                     <tab.icon size={14} /> {tab.label}
                     {activeModalTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.5)]" />}
                   </button>
                 ))}
              </div>

              <div className="p-8 md:p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                 {/* BASIC INFO */}
                 {activeModalTab === 'basic' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                         <input required placeholder="Ex: Maria Eduarda Santos" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CPF</label>
                            <input required placeholder="000.000.000-00" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data de Nascimento</label>
                            <input required type="date" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone (WhatsApp)</label>
                            <input required placeholder="(00) 00000-0000" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profissão</label>
                            <div className="relative">
                               <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                               <input placeholder="Ex: Engenheira" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* ADDRESS INFO */}
                 {activeModalTab === 'address' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço Completo</label>
                         <textarea rows={3} placeholder="Rua, Número, Bairro, Cidade - UF" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>
                   </div>
                 )}

                 {/* HEALTH & BIOMETRY */}
                 {activeModalTab === 'health' && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 gap-6 bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Peso Atual (kg)</label>
                            <input type="number" step="0.1" placeholder="70.5" className="w-full p-4 bg-white border border-emerald-200 rounded-2xl font-black text-lg outline-none text-emerald-700" value={formData.weight} onChange={e => setFormData({...formData, weight: Number(e.target.value)})} />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">Altura (cm)</label>
                            <input type="number" placeholder="175" className="w-full p-4 bg-white border border-emerald-200 rounded-2xl font-black text-lg outline-none text-emerald-700" value={formData.height} onChange={e => setFormData({...formData, height: Number(e.target.value)})} />
                         </div>
                      </div>
                      <div className="bg-slate-900 p-6 rounded-3xl text-white flex items-center justify-between">
                         <div>
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Resultado IMC Esperado</p>
                            <h4 className="text-3xl font-black tracking-tighter italic">
                              {formData.weight && formData.height ? calculateBMI(formData.weight, formData.height).bmi : '0.00'}
                            </h4>
                         </div>
                         <span className="text-[10px] font-black uppercase bg-white/10 px-4 py-2 rounded-xl text-emerald-300">
                            {formData.weight && formData.height ? calculateBMI(formData.weight, formData.height).status : 'Aguardando Dados'}
                         </span>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <Stethoscope size={14} /> Anamnese / Notas de Saúde
                         </label>
                         <textarea rows={4} placeholder="Descreva restrições médicas, dores recorrentes ou histórico de cirurgias..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-medium text-xs outline-none focus:bg-white resize-none" value={formData.healthNotes} onChange={e => setFormData({...formData, healthNotes: e.target.value})} />
                      </div>
                   </div>
                 )}
              </div>

              {/* Footer Modal */}
              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 {activeModalTab !== 'health' ? (
                   <button 
                    type="button" 
                    onClick={() => setActiveModalTab(activeModalTab === 'basic' ? 'address' : 'health')}
                    className="w-full py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                   >
                     Próxima Etapa <ChevronRight size={18} />
                   </button>
                 ) : (
                   <button type="submit" className="w-full py-5 bg-emerald-500 text-white rounded-[28px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                      <Save size={18} /> Finalizar Cadastro
                   </button>
                 )}
              </div>
           </form>
        </div>
      )}

      {/* MODAL DETALHES DO ALUNO / PRONTUÁRIO INDIVIDUAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[250] flex items-center justify-center p-4 overflow-y-auto">
           <div className="bg-white w-full max-w-5xl rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col lg:flex-row my-auto">
              {/* Sidebar do Perfil */}
              <div className="lg:w-80 bg-slate-50 p-10 border-r border-slate-100 flex flex-col items-center text-center">
                 <div className="w-32 h-32 bg-slate-950 text-white rounded-[40px] flex items-center justify-center font-black text-5xl shadow-2xl mb-8 transform rotate-6">
                    {selectedStudent.name[0]}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">{selectedStudent.name}</h3>
                 <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-8">{selectedStudent.profession}</p>
                 
                 <div className="w-full space-y-3">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center">
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Status Bio</p>
                       <p className={`text-sm font-black uppercase ${selectedStudent.bmiStatus === 'Peso Ideal' ? 'text-emerald-500' : 'text-amber-500'}`}>{selectedStudent.bmiStatus}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 flex flex-col items-center">
                       <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Matrícula</p>
                       <p className="text-sm font-black uppercase text-slate-900">{selectedStudent.plan}</p>
                    </div>
                 </div>

                 <button onClick={() => setSelectedStudent(null)} className="mt-auto w-full py-4 bg-slate-200 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Fechar Prontuário</button>
              </div>

              {/* Conteúdo do Prontuário */}
              <div className="flex-1 p-10 lg:p-14 space-y-12 overflow-y-auto custom-scrollbar">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* INFO PESSOAL */}
                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Fingerprint size={14}/> Dados Pessoais</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between border-b border-slate-100 pb-2">
                             <span className="text-[10px] font-black uppercase text-slate-300">CPF</span>
                             <span className="text-xs font-bold text-slate-700">{selectedStudent.cpf}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-2">
                             <span className="text-[10px] font-black uppercase text-slate-300">RG</span>
                             <span className="text-xs font-bold text-slate-700">{selectedStudent.rg}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-100 pb-2">
                             <span className="text-[10px] font-black uppercase text-slate-300">Nascimento</span>
                             <span className="text-xs font-bold text-slate-700">{new Date(selectedStudent.dob).toLocaleDateString()}</span>
                          </div>
                          <div className="flex flex-col gap-1 border-b border-slate-100 pb-2">
                             <span className="text-[10px] font-black uppercase text-slate-300 text-left">Endereço</span>
                             <span className="text-xs font-bold text-slate-700 text-left">{selectedStudent.address}</span>
                          </div>
                       </div>
                    </div>

                    {/* BIOMETRIA E HISTÓRICO */}
                    <div className="space-y-6">
                       <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><TrendingUp size={14}/> Evolução Biométrica</h4>
                       <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
                          <div className="flex items-center justify-between mb-4">
                             <div>
                                <p className="text-[8px] font-black text-emerald-600 uppercase">IMC Atual</p>
                                <p className="text-3xl font-black text-emerald-900 tracking-tighter italic">{selectedStudent.bmi}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[8px] font-black text-emerald-600 uppercase">Peso</p>
                                <p className="text-xl font-black text-emerald-900">{selectedStudent.weight} kg</p>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[9px] font-black text-emerald-800/40 uppercase mb-2">Histórico de Pesagens</p>
                             {selectedStudent.bmiHistory.map((h, i) => (
                               <div key={i} className="flex justify-between text-[10px] font-bold text-emerald-800/60 bg-white/40 p-2 rounded-lg">
                                  <span>{new Date(h.date).toLocaleDateString()}</span>
                                  <span>{h.weight} kg (IMC: {h.bmi})</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* ANAMNESE / SAÚDE */}
                 <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 text-rose-500">
                       <Heart size={24} />
                       <h4 className="text-xl font-black uppercase italic tracking-tighter">Prontuário de Saúde</h4>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-slate-200">
                       <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                         "{selectedStudent.healthNotes || 'Nenhuma nota de saúde registrada para este aluno.'}"
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default StudentsManagement;
