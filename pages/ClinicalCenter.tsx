
import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  User, 
  Activity, 
  Heart, 
  Zap, 
  ChevronRight, 
  Plus, 
  Save, 
  X, 
  FileText, 
  Scale, 
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  Share2,
  ClipboardList,
  Sparkles,
  // Added missing imports Target and Dumbbell
  Target,
  Dumbbell
} from 'lucide-react';

interface ClinicalRecord {
  id: string;
  studentName: string;
  date: string;
  type: string;
  professional: string;
  summary: string;
}

const recentRecords: ClinicalRecord[] = [
  { id: '1', studentName: 'Juliana Paes', date: 'Hoje, 10:30', type: 'Evolução SOAP', professional: 'Dr. Carlos Alberto', summary: 'Hérnia L4-L5, redução de dor EVA 7 -> 4.' },
  { id: '2', studentName: 'Marcos Frota', date: 'Ontem', type: 'Avaliação Postural', professional: 'Dra. Julia Mendes', summary: 'Escoliose em S, início de fortalecimento core.' },
];

const ClinicalCenter: React.FC = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeTool, setActiveTool] = useState<'soap' | 'painmap' | 'measurements'>('soap');
  const [selectedStudent, setSelectedStudent] = useState('');

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER CLÍNICO */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <Stethoscope size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Health Intelligence Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Centro <span className="text-emerald-500">Clínico</span></h1>
          <p className="text-slate-500 font-medium text-lg">Prontuário eletrônico e ferramentas de avaliação para profissionais da saúde.</p>
        </div>
        
        <button 
          onClick={() => setIsEvaluating(true)}
          className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Nova Avaliação Clínica
        </button>
      </header>

      {/* QUICK STATS CLÍNICOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Avaliações no Mês', value: '42', icon: FileText, color: 'blue' },
           { label: 'Evoluções Ativas', value: '128', icon: Activity, color: 'emerald' },
           { label: 'Média de Dor (EVA)', value: '3.8', icon: Heart, color: 'rose' },
           { label: 'Tempo Médio Sessão', value: '55m', icon: Clock, color: 'amber' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-emerald-200 transition-all">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                 <stat.icon size={24} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* LADO ESQUERDO: FILA DE ESPERA / ATENDIMENTOS HOJE */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic mb-6">Próximos <span className="text-emerald-500">Pacientes</span></h3>
              <div className="space-y-4">
                 {[
                   { name: 'Maria Eduarda', time: '14:00', reason: 'Pós-operatório Joelho', avatar: 'ME' },
                   { name: 'João Victor', time: '15:15', reason: 'Hérnia Discal L5-S1', avatar: 'JV' },
                   { name: 'Carla Silveira', time: '16:30', reason: 'Escoliose Juvenil', avatar: 'CS' },
                 ].map((patient, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-emerald-500 transition-colors">
                            {patient.avatar}
                         </div>
                         <div>
                            <p className="font-black text-sm text-slate-900 uppercase italic leading-none">{patient.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{patient.reason}</p>
                         </div>
                      </div>
                      <span className="text-xs font-black text-emerald-500 italic">{patient.time}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* INSIGHTS CLÍNICOS IA */}
           <div className="bg-slate-950 p-8 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-emerald-400" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Pila-Health Predictor</span>
                 </div>
                 <p className="text-lg font-medium leading-relaxed italic mb-8">
                   "A incidência de dores lombares na sua base de alunos subiu 15% após a introdução de novos saltos no Reformer. Recomendamos revisão da técnica de aterrissagem."
                 </p>
                 <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all">Ver Relatório Epidemiológico</button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -mr-10 -mt-10" />
           </div>
        </div>

        {/* LADO DIREITO: ÚLTIMAS EVOLUÇÕES / HISTÓRICO */}
        <div className="xl:col-span-8 bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Últimas <span className="text-emerald-500">Evoluções Clínicas</span></h3>
              <div className="flex gap-2">
                 <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-500 transition-all"><Search size={20} /></button>
                 <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-500 transition-all"><Share2 size={20} /></button>
              </div>
           </div>

           <div className="space-y-6">
              {recentRecords.map((record) => (
                <div key={record.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer relative overflow-hidden">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white border border-slate-200 rounded-[24px] flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                            <ClipboardList size={32} />
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-1">
                               <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{record.studentName}</h4>
                               <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest">{record.type}</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <User size={12} /> {record.professional} &bull; <Calendar size={12} /> {record.date}
                            </p>
                         </div>
                      </div>
                      <div className="bg-white p-4 rounded-3xl border border-slate-100 flex-1 md:max-w-xs">
                         <p className="text-xs font-medium text-slate-600 leading-relaxed italic line-clamp-2">
                            "{record.summary}"
                         </p>
                      </div>
                      <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-all" />
                   </div>
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full -mr-10 -mt-10" />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* MODAL DE AVALIAÇÃO CLÍNICA MULTI-TOOL */}
      {isEvaluating && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[300] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-4xl rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-950 text-white rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
                       <Stethoscope size={32} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Avaliação <span className="text-emerald-500">Multiclínica</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Instrumental científico PilaFlex</p>
                    </div>
                 </div>
                 <button onClick={() => setIsEvaluating(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              {/* TABS DE FERRAMENTAS */}
              <div className="px-10 pt-6 flex gap-8 border-b border-slate-50">
                 {[
                   { id: 'soap', label: 'Evolução SOAP', icon: FileText },
                   { id: 'painmap', label: 'Mapa de Dor', icon: Heart },
                   { id: 'measurements', label: 'Bio & Perimetria', icon: Scale },
                 ].map(tool => (
                   <button 
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id as any)}
                    className={`pb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTool === tool.id ? 'text-emerald-600' : 'text-slate-300'}`}
                   >
                     <tool.icon size={14} /> {tool.label}
                     {activeTool === tool.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.5)]" />}
                   </button>
                 ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10">
                 {/* TOOL: SOAP NOTES */}
                 {activeTool === 'soap' && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Paciente / Aluno</label>
                            <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-black text-xs outline-none focus:bg-white focus:border-emerald-500" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                               <option>Selecione o paciente...</option>
                               <option>Juliana Paes</option>
                               <option>Marcos Frota</option>
                            </select>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Data/Hora Atendimento</label>
                            <input type="datetime-local" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-black text-xs outline-none" />
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-1">(S) Subjective / Relato</label>
                            <textarea placeholder="O que o paciente relatou sobre sua dor ou estado?" className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-xs font-medium focus:bg-white resize-none h-32" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">(O) Objective / Exame Físico</label>
                            <textarea placeholder="Sinais vitais, testes físicos, inspeção..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-xs font-medium focus:bg-white resize-none h-32" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest ml-1">(A) Assessment / Avaliação</label>
                            <textarea placeholder="Diagnóstico cinético-funcional..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-xs font-medium focus:bg-white resize-none h-32" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-rose-600 uppercase tracking-widest ml-1">(P) Plan / Conduta</label>
                            <textarea placeholder="Exercícios realizados e orientações para casa..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-xs font-medium focus:bg-white resize-none h-32" />
                         </div>
                      </div>
                   </div>
                 )}

                 {/* TOOL: PAIN MAP (VISUAL) */}
                 {activeTool === 'painmap' && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="flex flex-col md:flex-row items-center gap-10">
                         <div className="bg-slate-50 p-10 rounded-[60px] border border-slate-100 flex items-center justify-center relative group">
                            <div className="w-64 h-96 border-4 border-emerald-500/20 rounded-[40px] flex items-center justify-center text-slate-300 italic font-black text-center p-8">
                               Diagrama do Corpo <br /> (Anterior / Posterior)
                               <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-rose-500 rounded-full animate-ping" />
                               <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-rose-500 rounded-full shadow-lg" />
                            </div>
                         </div>
                         <div className="flex-1 space-y-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Escala de Dor (EVA)</h4>
                               <input type="range" min="0" max="10" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                               <div className="flex justify-between mt-2 font-black text-xs text-slate-400 italic uppercase">
                                  <span>Sem Dor</span>
                                  <span className="text-rose-500">Insuportável</span>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição da Sensação</label>
                               <div className="flex flex-wrap gap-2">
                                  {['Aguda', 'Queimação', 'Latejante', 'Fisgada', 'Cãibra'].map(s => (
                                    <button key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all">{s}</button>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* TOOL: MEASUREMENTS */}
                 {activeTool === 'measurements' && (
                   <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                         {[
                           { label: 'Tórax (cm)', icon: Activity },
                           { label: 'Cintura (cm)', icon: Target },
                           { label: 'Abdômen (cm)', icon: Activity },
                           { label: 'Braço Dir (cm)', icon: Zap },
                           { label: 'Braço Esq (cm)', icon: Zap },
                           { label: 'Coxa Dir (cm)', icon: Dumbbell },
                           { label: 'Coxa Esq (cm)', icon: Dumbbell },
                         ].map((m, i) => (
                           <div key={i} className="space-y-2">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{m.label}</label>
                              <div className="relative">
                                 <input type="number" step="0.1" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-sm outline-none focus:bg-white" placeholder="0.0" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                 <div className="flex-1 flex items-center gap-4 text-emerald-600">
                    <CheckCircle2 size={24} />
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Este registro será criptografado e anexado ao prontuário histórico do paciente para auditoria clínica.</p>
                 </div>
                 <button onClick={() => setIsEvaluating(false)} className="w-full sm:w-auto px-12 py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <Save size={18} /> Finalizar & Sincronizar
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default ClinicalCenter;
