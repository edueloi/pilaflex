
import React, { useState } from 'react';
import { 
  Dumbbell, 
  Plus, 
  Search, 
  ChevronRight, 
  Zap, 
  Activity, 
  Target, 
  ClipboardList,
  Trash2,
  Edit3,
  CheckCircle2,
  Users,
  Save,
  X,
  Sparkles,
  PlayCircle
} from 'lucide-react';

const initialExercises = [
  { id: '1', name: 'The Hundred (Solo)', type: 'Abdominal', focus: 'Core', reps: '10 respirações' },
  { id: '2', name: 'Leg Circles', type: 'Mobilidade', focus: 'Quadril', reps: '10 cada perna' },
  { id: '3', name: 'Caminhada Estática 15min', type: 'Cardio', focus: 'Resistência', reps: 'Contínuo' },
];

const initialProtocols = [
  { id: 'p1', name: 'Reabilitação Lombar I', itemsCount: 6, level: 'Iniciante' },
  { id: 'p2', name: 'Alta Intensidade Reformer', itemsCount: 12, level: 'Avançado' },
];

const TrainingCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exercises' | 'protocols'>('exercises');
  const [showAddModal, setShowAddModal] = useState(false);
  const [exercises, setExercises] = useState(initialExercises);
  const [protocols, setProtocols] = useState(initialProtocols);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-500">
             <Dumbbell size={16} />
             <span className="text-[9px] font-black uppercase tracking-[0.4em]">Engine de Prescrição</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Centro de <span className="text-emerald-500">Treino</span></h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg">Gerencie sua biblioteca de movimentos e planos de aula.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-1 flex shadow-sm">
            <button 
              onClick={() => setActiveTab('exercises')}
              className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'exercises' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Exercícios
            </button>
            <button 
              onClick={() => setActiveTab('protocols')}
              className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${activeTab === 'protocols' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Protocolos/Listas
            </button>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 text-white p-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
          >
            <Plus size={24} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Filtros e Busca */}
        <aside className="lg:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                 <input placeholder="Buscar..." className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none font-bold text-xs focus:border-emerald-500" />
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Filtros Rápidos</h3>
                 <div className="flex flex-wrap gap-2">
                    {['Solo', 'Reformer', 'Cardio', 'Alongamento', 'Core'].map(cat => (
                      <button key={cat} className="px-3 py-1.5 bg-slate-50 text-[8px] font-black uppercase text-slate-500 rounded-lg border border-slate-100 hover:border-emerald-500 hover:text-emerald-500 transition-all">
                        {cat}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                 <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 relative overflow-hidden group">
                    <div className="relative z-10">
                       <Sparkles className="text-emerald-500 mb-3" size={24} />
                       <p className="text-[10px] font-black text-emerald-900 uppercase italic mb-1 leading-none">Sincronia Global</p>
                       <p className="text-[8px] font-bold text-emerald-800/60 leading-relaxed uppercase">Suas listas aparecem automaticamente no Pila-Builder dos alunos.</p>
                    </div>
                 </div>
              </div>
           </div>
        </aside>

        {/* Lado Direito: Listagem Principal */}
        <main className="lg:col-span-9">
           {activeTab === 'exercises' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                {exercises.map(ex => (
                  <div key={ex.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                           <Activity size={24} />
                        </div>
                        <button className="text-slate-200 hover:text-slate-400 p-1"><Edit3 size={18} /></button>
                     </div>
                     <div>
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">{ex.type} &bull; {ex.focus}</p>
                        <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter leading-tight">{ex.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{ex.reps}</p>
                     </div>
                     <button className="mt-8 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Ver Detalhes</button>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-white border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center gap-3 p-10 text-slate-300 hover:border-emerald-200 hover:text-emerald-500 transition-all group"
                >
                   <Plus size={32} className="group-hover:rotate-90 transition-transform" />
                   <span className="font-black text-[10px] uppercase tracking-widest">Novo Exercício</span>
                </button>
             </div>
           ) : (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                {protocols.map(prot => (
                  <div key={prot.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all flex flex-col md:flex-row items-center gap-8 group">
                     <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                        <ClipboardList size={32} />
                     </div>
                     <div className="flex-1 text-center md:text-left">
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">{prot.level}</p>
                        <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{prot.name}</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{prot.itemsCount} exercícios vinculados</p>
                     </div>
                     <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-slate-950/20 active:scale-95 flex items-center justify-center gap-2">
                           <Users size={16} /> Vincular a Aluno
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all">
                           Editar Lista
                        </button>
                     </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-12 border-2 border-dashed border-slate-100 rounded-[40px] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-emerald-200 hover:text-emerald-500 transition-all group"
                >
                   <Plus size={32} className="group-hover:rotate-90 transition-transform" />
                   <span className="font-black text-[10px] uppercase tracking-widest">Criar Novo Protocolo de Treino</span>
                </button>
             </div>
           )}
        </main>
      </div>

      {/* Modal Genérico para Adicionar Item */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[150] flex items-center justify-center p-4">
           <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }} className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Adicionar à <span className="text-emerald-500">Biblioteca</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Criando novo {activeTab === 'exercises' ? 'exercício' : 'protocolo'}</p>
                 </div>
                 <button type="button" onClick={() => setShowAddModal(false)} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome de Identificação</label>
                    <input 
                      placeholder={activeTab === 'exercises' ? "Ex: The Hundred" : "Ex: Treino Mensal Avançado"}
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-slate-800 text-lg focus:bg-white focus:border-emerald-500 transition-all" 
                    />
                 </div>

                 {activeTab === 'exercises' ? (
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Foco / Objetivo</label>
                         <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-[10px] uppercase tracking-widest text-slate-600">
                            <option>Core / Abdominal</option>
                            <option>Flexibilidade</option>
                            <option>Cardio</option>
                            <option>Mobilidade Articular</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Repetições/Tempo</label>
                         <input placeholder="Ex: 3 séries de 12" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                      </div>
                   </div>
                 ) : (
                   <div className="space-y-6">
                      <div className="bg-slate-950 p-8 rounded-3xl text-white">
                         <div className="flex items-center gap-3 mb-6">
                            <Activity className="text-emerald-500" size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Selecionar Exercícios da Biblioteca</span>
                         </div>
                         <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                            {exercises.map(ex => (
                              <label key={ex.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all group">
                                 <span className="text-xs font-black uppercase italic tracking-tighter">{ex.name}</span>
                                 <input type="checkbox" className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500 bg-transparent" />
                              </label>
                            ))}
                         </div>
                      </div>
                   </div>
                 )}

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Instruções Técnicas</label>
                    <textarea placeholder="Detalhe a execução correta e respiração..." className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none text-sm font-medium resize-none focus:bg-white focus:border-emerald-500 h-32"></textarea>
                 </div>
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button type="submit" className="w-full py-6 bg-emerald-500 text-white rounded-[28px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <Save size={18} /> Salvar na Base
                 </button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default TrainingCenter;
