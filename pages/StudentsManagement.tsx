
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
  ClipboardList,
  Dumbbell,
  Sparkles,
  Zap,
  Clock,
  Save,
  Trash,
  ChevronDown
} from 'lucide-react';
import { pilatesAI } from '../services/geminiService';

const studentsData = [
  { id: 1, name: 'Maria Eduarda', email: 'maria@email.com', phone: '(11) 98765-4321', plan: 'Trimestral', status: 'Ativo', lastClass: '2024-11-20' },
  { id: 2, name: 'João Silva', email: 'joao@email.com', phone: '(11) 91234-5678', plan: 'Mensal', status: 'Ativo', lastClass: '2024-11-19' },
  { id: 3, name: 'Ana Beatriz', email: 'ana@email.com', phone: '(11) 94444-5555', plan: 'Anual', status: 'Inativo', lastClass: '2024-10-05' },
];

const protocolsMock = [
  { id: 'p1', name: 'Reabilitação Lombar I' },
  { id: 'p2', name: 'Alta Intensidade Reformer' },
];

const StudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isPrescribing, setIsPrescribing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [trainingList, setTrainingList] = useState<any[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleOpenPrescription = (student: any) => {
    setSelectedStudent(student);
    setIsPrescribing(true);
    setTrainingList([
      { id: '1', name: 'Caminhada Estática', time: '15 min', type: 'Cardio', icon: Zap },
      { id: '2', name: 'The Hundred (Mat)', time: '10 resp.', type: 'Core', icon: Activity }
    ]);
  };

  const loadProtocol = (protocolName: string) => {
    // Simula carregamento de exercícios do protocolo
    const newItems = [
      { id: Date.now().toString() + '1', name: 'Exercício Protocolo A', time: '10 min', type: 'Protocolo', icon: ClipboardList },
      { id: Date.now().toString() + '2', name: 'Exercício Protocolo B', time: '12 min', type: 'Protocolo', icon: ClipboardList }
    ];
    setTrainingList([...trainingList, ...newItems]);
    alert(`Protocolo ${protocolName} importado com sucesso!`);
  };

  const generateAIWorkout = async () => {
    if (!selectedStudent) return;
    setIsLoadingAI(true);
    try {
      const routine = await pilatesAI.generateRoutine("Fortalecimento de Core e Flexibilidade", "Intermediário");
      alert("IA Sugeriu: " + routine.substring(0, 100) + "...");
      setTrainingList([...trainingList, { id: Date.now().toString(), name: 'Sugestão IA: Flexão Lateral', time: '12 rep.', type: 'Evolução', icon: Sparkles }]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(false);
    alert('Ficha salva!');
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <Users size={16} />
             <span className="text-[9px] font-black uppercase tracking-[0.4em]">Base de Membros</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Gestão de <span className="text-emerald-500">Alunos</span></h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg">Prontuários e prescrições personalizadas.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
        >
          <UserPlus size={18} /> Novo Aluno
        </button>
      </header>

      <div className="bg-white rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar aluno..."
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-bold text-sm shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/20 border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Identificação</th>
                <th className="px-8 py-5">Plano</th>
                <th className="px-8 py-5 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {studentsData.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-lg">
                        {student.name[0]}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm md:text-base uppercase italic">{student.name}</p>
                        <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest">Ativo desde 2024</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[8px] font-black uppercase text-slate-500">{student.plan}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => handleOpenPrescription(student)}
                        title="Prescrever Treino"
                        className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center gap-2 font-black text-[9px] uppercase"
                       >
                          <Dumbbell size={16} /> <span className="hidden md:inline">Treino</span>
                       </button>
                       <button className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl transition-all shadow-sm"><Edit2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPrescribing && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[150] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <Dumbbell size={28} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Pila-Builder <span className="text-emerald-500">PRO</span></h2>
                       <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1.5">Prescrevendo para: <span className="text-slate-900">{selectedStudent?.name}</span></p>
                    </div>
                 </div>
                 <button onClick={() => setIsPrescribing(false)} className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">
                   <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50/20">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-7 space-y-4">
                       <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Rotina Atual do Aluno</h3>
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{trainingList.length} Exercícios</span>
                       </div>
                       
                       <div className="space-y-3">
                          {trainingList.map((item) => (
                            <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-950 text-emerald-500 rounded-xl flex items-center justify-center">
                                     <item.icon size={20} />
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900 text-sm uppercase italic leading-none">{item.name}</p>
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.type} &bull; {item.time}</p>
                                  </div>
                               </div>
                               <button 
                                onClick={() => setTrainingList(trainingList.filter(t => t.id !== item.id))}
                                className="p-3 text-slate-200 hover:text-rose-500 transition-colors"
                               >
                                  <Trash size={16} />
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                       {/* Importar do Centro de Treino */}
                       <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                          <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                             <ClipboardList size={14} /> Protocolos Centro de Treino
                          </h3>
                          <div className="space-y-2">
                             {protocolsMock.map(prot => (
                               <button 
                                key={prot.id}
                                onClick={() => loadProtocol(prot.name)}
                                className="w-full p-4 text-left bg-slate-50 border border-slate-100 rounded-2xl font-black text-[9px] uppercase tracking-widest text-slate-500 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-all flex items-center justify-between group"
                               >
                                  {prot.name} <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" />
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="bg-slate-950 p-8 rounded-[40px] text-white relative overflow-hidden group shadow-2xl">
                          <div className="relative z-10">
                             <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="text-emerald-400" size={18} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Sincronização Pila-AI</span>
                             </div>
                             <h4 className="text-xl font-black italic tracking-tighter leading-tight mb-4 uppercase">Gerar Sugestão Personalizada?</h4>
                             <button 
                               onClick={generateAIWorkout}
                               disabled={isLoadingAI}
                               className={`w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all hover:bg-emerald-600 active:scale-95 ${isLoadingAI ? 'opacity-50' : ''}`}
                             >
                                {isLoadingAI ? 'Processando...' : <><Zap size={16} /> Sugerir via IA</>}
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-8 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 <button onClick={() => setIsPrescribing(false)} className="flex-1 py-5 border-2 border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">Descartar</button>
                 <button 
                  onClick={() => { setIsPrescribing(false); alert('Treino vinculado ao aluno!'); }}
                  className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all active:scale-95"
                 >
                    <Save size={18} /> Salvar e Vincular
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
