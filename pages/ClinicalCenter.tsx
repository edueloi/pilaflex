
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
  Target,
  Dumbbell,
  Camera,
  Grid3X3,
  ListChecks,
  History,
  TrendingUp,
  FileDown,
  Info,
  Maximize2,
  ChevronDown
} from 'lucide-react';

interface ClinicalRecord {
  id: string;
  studentName: string;
  date: string;
  type: string;
  professional: string;
  summary: string;
  painLevel: number;
}

const recentRecords: ClinicalRecord[] = [
  { id: '1', studentName: 'Juliana Paes', date: 'Hoje, 10:30', type: 'Evolução SOAP', professional: 'Dr. Carlos Alberto', summary: 'Hérnia L4-L5, redução de dor EVA 7 -> 4.', painLevel: 4 },
  { id: '2', studentName: 'Marcos Frota', date: 'Ontem', type: 'Avaliação Postural', professional: 'Dra. Julia Mendes', summary: 'Escoliose em S, início de fortalecimento core.', painLevel: 2 },
];

const ClinicalCenter: React.FC = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeTool, setActiveTool] = useState<'soap' | 'posture' | 'tests' | 'measurements'>('soap');
  const [selectedStudent, setSelectedStudent] = useState('');

  return (
    <div className="p-4 md:p-8 lg:p-10 space-y-8 animate-in fade-in duration-700 max-w-[1500px] mx-auto pb-40">
      
      {/* HEADER CLÍNICO - MAIS LIMPO */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Stethoscope size={16} />
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.3em]">Clinical Intelligence</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Centro <span className="text-emerald-500">Clínico</span></h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Gestão de prontuários e diagnósticos biomecânicos.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
           <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-2xl hover:border-emerald-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm">
             <History size={16} /> Histórico
           </button>
           <button 
             onClick={() => setIsEvaluating(true)}
             className="flex items-center gap-3 bg-slate-950 text-white px-8 py-3 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
           >
             <Plus size={18} /> Nova Evolução
           </button>
        </div>
      </header>

      {/* DASHBOARD DE MONITORAMENTO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Pacientes Hoje */}
        <div className="xl:col-span-4 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Clock size={16} className="text-emerald-500" /> Pacientes de Hoje
           </h3>
           <div className="space-y-2">
              {[
                { name: 'Maria Eduarda', time: '14:00', type: 'Fisioterapia' },
                { name: 'João Victor', time: '15:15', type: 'RPG / Pilates' },
                { name: 'Carla Silveira', time: '16:30', type: 'Pós-Op' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-[10px] uppercase italic">{p.name[0]}</div>
                      <div>
                         <p className="font-black text-xs text-slate-900 uppercase italic leading-none">{p.name}</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">{p.type}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-emerald-500 italic">{p.time}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Últimas Evoluções */}
        <div className="xl:col-span-8 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Últimas Atualizações</h3>
              <Search size={16} className="text-slate-300" />
           </div>
           <div className="space-y-3">
              {recentRecords.map((record) => (
                <div key={record.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-4">
                   <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                      <ClipboardList size={20} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                         <h4 className="text-xs font-black text-slate-900 uppercase italic truncate">{record.studentName}</h4>
                         <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest">{record.type}</span>
                      </div>
                      <p className="text-[9px] text-slate-400 font-medium truncate italic">"{record.summary}"</p>
                   </div>
                   <div className="text-right hidden sm:block shrink-0">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{record.date}</p>
                      <div className="flex items-center gap-0.5 mt-1 justify-end">
                         {[1,2,3,4,5].map(v => <div key={v} className={`w-1 h-3 rounded-full ${v <= record.painLevel ? 'bg-emerald-500' : 'bg-slate-200'}`} />)}
                      </div>
                   </div>
                   <ChevronRight size={14} className="text-slate-300" />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* MODAL COMPACTO E REFINADO */}
      {isEvaluating && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[500] flex items-center justify-center">
           <div className="bg-white w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-[32px] md:rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10 flex flex-col relative">
              
              {/* Top Header do Modal - Compacto e sem Tarja */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-lg">
                       <Stethoscope size={24} />
                    </div>
                    <div>
                       <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Avaliação <span className="text-emerald-500">Clínica</span></h2>
                       <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1">Prontuário Digital Sincronizado</p>
                    </div>
                 </div>
                 <button onClick={() => setIsEvaluating(false)} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                   <X size={20} />
                 </button>
              </div>

              {/* Tabs do Modal - Estilo Botões Segmentados */}
              <div className="px-6 md:px-8 py-4 bg-slate-50/50 border-b border-slate-100 overflow-x-auto no-scrollbar shrink-0">
                 <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl w-fit">
                    {[
                      { id: 'soap', label: 'Evolução SOAP', icon: FileText },
                      { id: 'posture', label: 'Postural', icon: Grid3X3 },
                      { id: 'tests', label: 'Testes', icon: ListChecks },
                      { id: 'measurements', label: 'Biometria', icon: Scale },
                    ].map(tool => (
                      <button 
                       key={tool.id}
                       onClick={() => setActiveTool(tool.id as any)}
                       className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${activeTool === tool.id ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                      >
                        <tool.icon size={14} /> {tool.label}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Área de Conteúdo Scrollável */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-8">
                 
                 {/* TOOL: SOAP - Redesenhado para ser denso */}
                 {activeTool === 'soap' && (
                   <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                         <div className="md:col-span-7 space-y-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Paciente / Prontuário</label>
                            <div className="relative">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                               <select className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white focus:border-emerald-500 appearance-none" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                                  <option>Localizar prontuário...</option>
                                  <option>Juliana Paes</option>
                                  <option>Marcos Frota</option>
                               </select>
                            </div>
                         </div>
                         <div className="md:col-span-5 space-y-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nível de Dor (EVA)</label>
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                               <input type="range" min="0" max="10" className="flex-1 h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500" />
                               <span className="font-black text-sm text-slate-900">0/10</span>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {[
                           { k: 'S', l: 'Subjective', p: 'Relato do paciente sobre dores e sensações...' },
                           { k: 'O', l: 'Objective', p: 'Sinais vitais, testes físicos, mobilidade...' },
                           { k: 'A', l: 'Assessment', p: 'Diagnóstico cinesiológico funcional...' },
                           { k: 'P', l: 'Plan', p: 'Exercícios e conduta para próxima sessão...' },
                         ].map((item, i) => (
                           <div key={i} className="space-y-2">
                              <div className="flex items-center gap-2">
                                 <div className="w-6 h-6 bg-slate-900 text-white rounded flex items-center justify-center font-black text-[10px]">{item.k}</div>
                                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.l}</label>
                              </div>
                              <textarea placeholder={item.p} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-medium focus:bg-white focus:border-emerald-500 transition-all resize-none h-32 shadow-inner" />
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* TOOL: POSTURE - Compacto */}
                 {activeTool === 'posture' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-3 gap-4">
                         {['Anterior', 'Posterior', 'Perfil'].map(side => (
                           <div key={side} className="space-y-2">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">{side}</p>
                              <div className="aspect-[4/5] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 transition-all cursor-pointer group">
                                 <Camera size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                                 <span className="font-black text-[8px] uppercase tracking-widest">Foto</span>
                              </div>
                           </div>
                         ))}
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                         <div className="p-2 bg-emerald-500 text-white rounded-xl shadow-lg"><Grid3X3 size={20} /></div>
                         <p className="text-[10px] font-bold text-emerald-800 uppercase italic">Grelha Postural Milimetrada será aplicada automaticamente no upload.</p>
                      </div>
                   </div>
                 )}

                 {/* TOOL: MEASUREMENTS - denso */}
                 {activeTool === 'measurements' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {[
                            { l: 'Cervical', i: Zap },
                            { l: 'Tórax', i: Activity },
                            { l: 'Lombar', i: Activity },
                            { l: 'Quadril', i: Target },
                            { l: 'Ombro D/E', i: Zap },
                            { l: 'Joelho D/E', i: Dumbbell },
                         ].map((m, i) => (
                           <div key={i} className="space-y-1">
                              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">{m.l}</label>
                              <div className="relative">
                                 <input type="number" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl font-black text-sm outline-none focus:bg-white" placeholder="0°" />
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* TOOL: TESTS - checklist limpo */}
                 {activeTool === 'tests' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {['Phalen', 'Lasègue', 'Slump', 'Trendelenburg', 'Apprehension', 'Neer'].map(test => (
                           <div key={test} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                              <span className="font-bold text-xs text-slate-700">{test}</span>
                              <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                                 <button type="button" className="px-3 py-1 rounded-md text-[8px] font-black uppercase text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">Neg</button>
                                 <button type="button" className="px-3 py-1 rounded-md text-[8px] font-black uppercase text-slate-400 hover:bg-rose-500 hover:text-white transition-all">Pos</button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}
              </div>

              {/* Modal Footer - Sólido e Compacto */}
              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                    <div>
                       <p className="text-[10px] font-black text-slate-900 uppercase italic">Registro Validado</p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sincronização em tempo real</p>
                    </div>
                 </div>
                 <div className="flex gap-3 w-full sm:w-auto">
                    <button onClick={() => setIsEvaluating(false)} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-emerald-500 transition-all">Descartar</button>
                    <button onClick={() => setIsEvaluating(false)} className="flex-1 sm:flex-none px-10 py-3.5 bg-slate-950 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                       <Save size={16} /> Finalizar & Sincronizar
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* RODAPÉ DO CENTRO CLÍNICO - DESIGN MASTER */}
      <footer className="bg-slate-950 p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group border border-white/5">
         <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-emerald-500/20 rounded-xl"><Activity size={20} className="text-emerald-400" /></div>
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50 italic">Clinical Master Reports</span>
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Gerar Laudo <br /> de <span className="text-emerald-400">Encaminhamento?</span></h3>
            <p className="text-white/40 font-medium max-w-md text-sm">Compile todos os dados SOAP e fotos posturais em um PDF profissional para médicos ou convênios.</p>
         </div>
         <button className="relative z-10 px-10 py-5 bg-white text-slate-950 rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 flex items-center gap-3">
            <FileDown size={20} /> Exportar Prontuário
         </button>
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -mr-10 -mt-10" />
      </footer>
    </div>
  );
};

export default ClinicalCenter;
