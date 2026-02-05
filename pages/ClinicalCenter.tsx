
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
  Maximize2
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
  const [showEvolutionHistory, setShowEvolutionHistory] = useState(false);

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER CLÍNICO MASTER */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Stethoscope size={20} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Advanced Clinical Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Centro <span className="text-emerald-500">Clínico Pro</span></h1>
          <p className="text-slate-500 font-medium text-lg">Diagnóstico postural, testes funcionais e gestão de prontuários SOAP.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
           <button 
             onClick={() => setShowEvolutionHistory(true)}
             className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-900 px-8 py-5 rounded-[28px] hover:border-emerald-500 transition-all font-black text-xs uppercase tracking-widest shadow-sm group"
           >
             <History size={18} className="group-hover:rotate-[-20deg] transition-transform" />
             Histórico de Evolução
           </button>
           <button 
             onClick={() => setIsEvaluating(true)}
             className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
           >
             <Plus size={20} className="group-hover:rotate-90 transition-transform" />
             Nova Consulta Clínica
           </button>
        </div>
      </header>

      {/* PAINEL DE CONTROLE CLÍNICO */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* COLUNA ESQUERDA: PACIENTES & INSIGHTS */}
        <div className="xl:col-span-4 space-y-8">
           {/* FILA DE ATENDIMENTO */}
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Pacientes <span className="text-emerald-500">Hoje</span></h3>
                 <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">3 Agendados</span>
              </div>
              <div className="space-y-3 relative z-10">
                 {[
                   { name: 'Maria Eduarda', time: '14:00', reason: 'Pós-op LCA', status: 'confirmado' },
                   { name: 'João Victor', time: '15:15', reason: 'Hernia Discal', status: 'em sala' },
                   { name: 'Carla Silveira', time: '16:30', reason: 'Cervicalgia', status: 'pendente' },
                 ].map((patient, i) => (
                   <div key={i} className={`flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer group ${patient.status === 'em sala' ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg scale-[1.02]' : 'bg-slate-50 border-slate-100 hover:border-emerald-200'}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${patient.status === 'em sala' ? 'bg-white text-emerald-600' : 'bg-slate-900 text-white'}`}>
                            {patient.name[0]}
                         </div>
                         <div>
                            <p className="font-black text-sm uppercase italic leading-none">{patient.name}</p>
                            <p className={`text-[9px] font-bold uppercase mt-1 tracking-widest ${patient.status === 'em sala' ? 'text-emerald-100' : 'text-slate-400'}`}>{patient.reason}</p>
                         </div>
                      </div>
                      <span className={`text-[10px] font-black italic ${patient.status === 'em sala' ? 'text-white' : 'text-emerald-500'}`}>{patient.time}</span>
                   </div>
                 ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-10 -mt-10" />
           </div>

           {/* IA ANALYTICS CLINICAL */}
           <div className="bg-slate-950 p-8 rounded-[48px] text-white relative overflow-hidden shadow-2xl border border-white/5">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-emerald-500/20 rounded-xl">
                       <Sparkles className="text-emerald-400" size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Pila-Bot Health Advisor</span>
                 </div>
                 <p className="text-xl font-medium leading-relaxed italic mb-8">
                   "A curva de evolução do paciente <span className="text-emerald-400">João Victor</span> indica estagnação na flexão de tronco. Sugerimos migrar do Reformer para o Cadillac com molas leves para mobilização assistida."
                 </p>
                 <div className="flex gap-3">
                    <button className="flex-1 py-4 bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all border border-white/5">Abrir Bio-Análise</button>
                    <button className="p-4 bg-white/5 text-emerald-400 rounded-2xl border border-white/5"><Info size={20} /></button>
                 </div>
              </div>
           </div>
        </div>

        {/* COLUNA DIREITA: EVOLUÇÕES & GRÁFICOS */}
        <div className="xl:col-span-8 space-y-8">
           <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Monitor de <span className="text-emerald-500">Recuperação</span></h3>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Média de intensidade de dor nos últimos atendimentos</p>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-500 transition-all"><FileDown size={20} /></button>
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-emerald-500 transition-all"><Share2 size={20} /></button>
                 </div>
              </div>

              {/* LISTA DE EVOLUÇÕES COM DASH DE DOR */}
              <div className="space-y-6">
                 {recentRecords.map((record) => (
                   <div key={record.id} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-emerald-200 transition-all group cursor-pointer relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                      <div className="flex items-center gap-6 flex-1">
                         <div className="w-20 h-20 bg-white border border-slate-100 rounded-[28px] flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                            <ClipboardList size={36} />
                         </div>
                         <div className="space-y-1">
                            <div className="flex items-center gap-3">
                               <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{record.studentName}</h4>
                               <span className="bg-slate-900 text-white px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest">{record.type}</span>
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <User size={12} /> {record.professional} &bull; <Calendar size={12} /> {record.date}
                            </p>
                         </div>
                      </div>

                      {/* MINI GRAFICO DOR */}
                      <div className="flex flex-col items-center gap-2 bg-white px-6 py-4 rounded-3xl border border-slate-100">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Nível EVA</p>
                         <div className="flex items-center gap-1">
                            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                              <div key={i} className={`w-1.5 h-6 rounded-full ${i <= record.painLevel ? (record.painLevel > 7 ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-100'}`} />
                            ))}
                         </div>
                         <p className="text-sm font-black text-slate-900">{record.painLevel}/10</p>
                      </div>

                      <ChevronRight className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* MODAL DE AVALIAÇÃO MULTI-TAB (O CORAÇÃO DO CENTRO CLÍNICO) */}
      {isEvaluating && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[300] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-5xl rounded-[64px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10 flex flex-col max-h-[95vh]">
              
              {/* Header Modal */}
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-950 text-white rounded-[32px] flex items-center justify-center shadow-2xl transform -rotate-6">
                       <Stethoscope size={40} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Consulta <span className="text-emerald-500">Clínica Digital</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1.5 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-emerald-500" /> Protocolo Validado Cientificamente
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setIsEvaluating(false)} className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={28} />
                 </button>
              </div>

              {/* TABS NAVEGAÇÃO CLÍNICA */}
              <div className="px-10 pt-8 flex gap-10 border-b border-slate-50 bg-white">
                 {[
                   { id: 'soap', label: 'Evolução SOAP', icon: FileText },
                   { id: 'posture', label: 'Grelha Postural', icon: Grid3X3 },
                   { id: 'tests', label: 'Testes & Sinais', icon: ListChecks },
                   { id: 'measurements', label: 'Bio & Goniometria', icon: Scale },
                 ].map(tool => (
                   <button 
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id as any)}
                    className={`pb-6 flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTool === tool.id ? 'text-emerald-600' : 'text-slate-300 hover:text-slate-500'}`}
                   >
                     <tool.icon size={16} /> {tool.label}
                     {activeTool === tool.id && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-emerald-500 rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.5)]" />}
                   </button>
                 ))}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-12 space-y-12">
                 
                 {/* TOOL: SOAP NOTES (MELHORADO) */}
                 {activeTool === 'soap' && (
                   <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Paciente Selecionado</label>
                            <div className="relative group">
                               <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500" size={20} />
                               <select className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-[28px] font-black text-sm outline-none focus:bg-white focus:border-emerald-500 transition-all appearance-none" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                                  <option>Selecione o prontuário...</option>
                                  <option>Juliana Paes</option>
                                  <option>Marcos Frota</option>
                                  <option>João Victor</option>
                               </select>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Intensidade da Dor (EVA)</label>
                            <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[28px] border border-slate-100">
                               <input type="range" min="0" max="10" className="flex-1 h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-500" />
                               <span className="text-2xl font-black text-slate-900 italic">0/10</span>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {[
                           { key: 'S', label: 'Subjective (Relato)', color: 'emerald', placeholder: 'Dores, sensações, sono, humor...' },
                           { key: 'O', label: 'Objective (Exame)', color: 'blue', placeholder: 'Sinais vitais, inspeção, palpação...' },
                           { key: 'A', label: 'Assessment (Análise)', color: 'amber', placeholder: 'Diagnóstico funcional, hipóteses...' },
                           { key: 'P', label: 'Plan (Conduta)', color: 'rose', placeholder: 'Exercícios, recomendações, frequência...' },
                         ].map(item => (
                           <div key={item.key} className="space-y-3">
                              <div className="flex items-center gap-2">
                                 <div className={`w-7 h-7 bg-${item.color}-500 text-white rounded-lg flex items-center justify-center font-black text-xs`}>{item.key}</div>
                                 <label className={`text-[10px] font-black text-${item.color}-600 uppercase tracking-widest`}>{item.label}</label>
                              </div>
                              <textarea placeholder={item.placeholder} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-medium focus:bg-white focus:border-emerald-500 transition-all resize-none h-44 shadow-inner" />
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {/* TOOL: POSTURAL GRID (GRELHA) */}
                 {activeTool === 'posture' && (
                   <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         {['Frente', 'Costas', 'Perfil'].map(side => (
                           <div key={side} className="space-y-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{side}</p>
                              <div className="aspect-[3/4] bg-slate-50 rounded-[48px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group relative overflow-hidden">
                                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                 <Camera size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                                 <span className="font-black text-[10px] uppercase tracking-widest">Upload Foto</span>
                                 <div className="absolute top-4 right-4">
                                    <Maximize2 size={18} className="text-slate-300" />
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                      <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 flex items-center gap-6">
                         <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><Grid3X3 size={28} /></div>
                         <div className="flex-1">
                            <h4 className="text-emerald-900 font-black text-sm uppercase italic tracking-tight">Grelha Postural Inteligente</h4>
                            <p className="text-emerald-800/60 text-xs font-medium">As fotos enviadas receberão automaticamente o Grid de simetria PilaFlex para análise de desvios angulares.</p>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* TOOL: TESTES ORTOPÉDICOS */}
                 {activeTool === 'tests' && (
                   <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Testes de <span className="text-emerald-500">Coluna & Quadril</span></h3>
                            <div className="space-y-3">
                               {['Teste de Lasègue', 'Teste de Slump', 'Trendelenburg', 'Teste de Thomas', 'Adams (Escoliose)'].map(test => (
                                 <div key={test} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-emerald-200 transition-all">
                                    <span className="font-bold text-sm text-slate-700">{test}</span>
                                    <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                                       <button type="button" className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">Neg</button>
                                       <button type="button" className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:bg-rose-500 hover:text-white transition-all">Pos</button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Membros <span className="text-emerald-500">Superiores</span></h3>
                            <div className="space-y-3">
                               {['Teste de Phalen', 'Teste de Jobe', 'Teste de Speed', 'Apprehension Test', 'Neer Test'].map(test => (
                                 <div key={test} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-emerald-200 transition-all">
                                    <span className="font-bold text-sm text-slate-700">{test}</span>
                                    <div className="flex bg-white p-1 rounded-xl border border-slate-200">
                                       <button type="button" className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">Neg</button>
                                       <button type="button" className="px-3 py-1.5 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:bg-rose-500 hover:text-white transition-all">Pos</button>
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {/* TOOL: MEASUREMENTS & GONIOMETRY */}
                 {activeTool === 'measurements' && (
                   <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                      <div className="bg-slate-900 p-10 rounded-[48px] text-white">
                         <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/20"><TrendingUp size={28} /></div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Amplitude de Movimento (ADM)</h3>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                               { label: 'Flexão de Ombro', icon: Zap },
                               { label: 'Flexão de Quadril', icon: Zap },
                               { label: 'Extensão de Joelho', icon: Zap },
                               { label: 'Abdução de Ombro', icon: Zap },
                               { label: 'Rotação Cervical', icon: Zap },
                               { label: 'Dorsiflexão Tornozelo', icon: Zap },
                            ].map((m, i) => (
                              <div key={i} className="space-y-2">
                                 <label className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{m.label}</label>
                                 <div className="relative">
                                    <input type="number" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl font-black text-2xl outline-none focus:border-emerald-500 text-white" placeholder="0°" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-black text-xs uppercase">Graus</span>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                 )}
              </div>

              {/* Footer Modal Finalização */}
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-5">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-emerald-500"><CheckCircle2 size={32} /></div>
                    <div>
                       <p className="text-xs font-black text-slate-900 uppercase italic tracking-tighter">Assinatura Digital Clínica</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sincronizado com Prontuário PilaFlex-ID</p>
                    </div>
                 </div>
                 <div className="flex gap-4 w-full sm:w-auto">
                    <button onClick={() => setIsEvaluating(false)} className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-500 rounded-[28px] font-black uppercase text-xs tracking-widest hover:border-emerald-500 transition-all">Descartar</button>
                    <button onClick={() => setIsEvaluating(false)} className="flex-1 sm:flex-none px-14 py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3">
                       <Save size={18} /> Finalizar & Sincronizar
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FOOTER CLÍNICO */}
      <footer className="bg-emerald-500 p-12 md:p-16 rounded-[60px] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md"><Activity size={24} /></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Scientific Management</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-6">Pronto para <br /> o Próximo <span className="text-slate-900">Nível?</span></h3>
            <p className="text-white/80 font-medium max-w-lg text-lg leading-relaxed">Utilize o PilaFlex Pro para transformar dados brutos em saúde real. Gere relatórios de alto impacto e fidelize seus pacientes pelo resultado clínico.</p>
         </div>
         <button className="relative z-10 px-14 py-7 bg-slate-950 text-white rounded-[32px] font-black uppercase text-[12px] tracking-[0.3em] shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center gap-4 group/btn">
            <FileDown size={22} className="group-hover/btn:translate-y-1 transition-transform" /> Central de Relatórios
         </button>
         <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
         <div className="absolute top-0 left-0 w-64 h-64 bg-slate-900/5 blur-[80px] rounded-full" />
      </footer>
    </div>
  );
};

export default ClinicalCenter;
