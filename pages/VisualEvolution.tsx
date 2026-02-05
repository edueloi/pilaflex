
import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  Calendar, 
  TrendingUp, 
  Grid3X3, 
  ChevronRight, 
  ChevronLeft,
  ArrowRightLeft,
  Scale,
  Activity,
  Zap,
  CheckCircle2,
  Info,
  Maximize,
  X,
  Upload,
  Plus,
  Trash2,
  ChevronDown,
  // Fix: Added missing 'Save' icon import
  Save
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const biometricData = [
  { date: '10/Out', imc: 24.5, flex: 60, core: 50 },
  { date: '15/Nov', imc: 23.8, flex: 75, core: 65 },
  { date: '15/Dez', imc: 23.1, flex: 82, core: 80 },
];

const VisualEvolution: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [selectedAngle, setSelectedAngle] = useState('Anterior');
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  
  // State para o novo registro
  const [newRecord, setNewRecord] = useState({
    weight: '',
    height: '',
    fat: '',
    notes: ''
  });

  const [previews, setPreviews] = useState({
    anterior: null as string | null,
    perfil: null as string | null,
    posterior: null as string | null
  });

  const handleFileChange = (side: 'anterior' | 'perfil' | 'posterior', file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [side]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 space-y-10 animate-in fade-in duration-700 max-w-[1500px] mx-auto pb-40">
      
      {/* HEADER DE EVOLUÇÃO */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <Camera size={16} />
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.4em]">Visual Biometry Tracking</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Minha <span className="text-emerald-500">Evolução</span></h1>
          <p className="text-slate-500 font-medium text-lg">Compare seus resultados e visualize sua transformação física.</p>
        </div>

        <div className="flex gap-3">
           <button className="flex items-center gap-3 bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl hover:border-emerald-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm">
             <Grid3X3 size={18} /> Ver Galeria
           </button>
           <button 
            onClick={() => setIsAddingRecord(true)}
            className="flex items-center gap-3 bg-slate-950 text-white px-10 py-4 rounded-2xl hover:bg-emerald-600 shadow-xl transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
           >
             <Plus size={18} /> Novo Registro
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LADO ESQUERDO: COMPARADOR DE FOTOS */}
        <div className="xl:col-span-8 space-y-8">
           <div className="bg-white p-2 rounded-[56px] border border-slate-100 shadow-2xl relative overflow-hidden group">
              <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                       {['Anterior', 'Perfil', 'Posterior'].map(angle => (
                         <button 
                          key={angle}
                          onClick={() => setSelectedAngle(angle)}
                          className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${selectedAngle === angle ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                         >
                           {angle}
                         </button>
                       ))}
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comparar Datas</span>
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-emerald-500 transition-colors"><ArrowRightLeft size={16} /></button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                 {/* FOTO ANTES */}
                 <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-slate-900 group/img">
                    <img 
                      src="https://images.unsplash.com/photo-1518611012118-29a8d63a80ec?q=80&w=800" 
                      className="w-full h-full object-cover opacity-80" 
                      alt="Antes"
                    />
                    
                    {/* GRELHA SOBREPOSTA */}
                    {showGrid && (
                      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-30">
                        {Array.from({ length: 144 }).map((_, i) => (
                          <div key={i} className="border-[0.5px] border-emerald-400/50" />
                        ))}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">INÍCIO: 12 OUT</p>
                    </div>
                    <div className="absolute bottom-8 left-8">
                       <span className="text-4xl font-black text-white italic opacity-20 uppercase tracking-tighter">BASELINE</span>
                    </div>
                 </div>

                 {/* FOTO DEPOIS */}
                 <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-slate-900 group/img">
                    <img 
                      src="https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=800" 
                      className="w-full h-full object-cover" 
                      alt="Depois"
                    />

                    {/* GRELHA SOBREPOSTA */}
                    {showGrid && (
                      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-50">
                        {Array.from({ length: 144 }).map((_, i) => (
                          <div key={i} className="border-[0.5px] border-emerald-400/50" />
                        ))}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 bg-emerald-500 px-4 py-2 rounded-xl shadow-lg">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">HOJE: 15 DEZ</p>
                    </div>
                    <div className="absolute bottom-8 left-8">
                       <span className="text-4xl font-black text-emerald-400 italic opacity-40 uppercase tracking-tighter">TRANSFORMED</span>
                    </div>
                    <button className="absolute bottom-6 right-6 p-4 bg-white text-slate-950 rounded-2xl shadow-2xl hover:scale-110 transition-all">
                       <Maximize size={20} />
                    </button>
                 </div>
              </div>

              {/* Grelha de Postura Digital Toggle */}
              <div className="absolute inset-x-10 bottom-12 flex justify-center pointer-events-none">
                 <div className="bg-slate-950/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 pointer-events-auto flex items-center gap-4 shadow-2xl">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${showGrid ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
                       <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Grelha Postural Digital</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <button 
                      onClick={() => setShowGrid(!showGrid)}
                      className={`text-[9px] font-black uppercase tracking-widest transition-colors ${showGrid ? 'text-emerald-400 hover:text-white' : 'text-slate-400 hover:text-emerald-400'}`}
                    >
                      {showGrid ? 'Desativar' : 'Ativar'}
                    </button>
                 </div>
              </div>
           </div>

           {/* TIMELINE DE EVOLUÇÃO BIOMÉTRICA */}
           <div className="bg-white p-10 rounded-[56px] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">Bio-Data <span className="text-emerald-500">Timeline</span></h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Histórico de Performance Física</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-lg">
                       <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                       <span className="text-[8px] font-black uppercase text-emerald-700">Flexibilidade</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 rounded-lg">
                       <div className="w-2 h-2 bg-blue-500 rounded-full" />
                       <span className="text-[8px] font-black uppercase text-blue-700">Controle Core</span>
                    </div>
                 </div>
              </div>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={biometricData}>
                       <defs>
                          <linearGradient id="colorFlex" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCore" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} />
                       <YAxis hide />
                       <Tooltip 
                        contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px'}}
                        itemStyle={{fontFamily: 'Outfit', fontWeight: 800, textTransform: 'uppercase', fontSize: '9px'}}
                       />
                       <Area type="monotone" dataKey="flex" stroke="#10b981" strokeWidth={4} fill="url(#colorFlex)" dot={{r: 4, fill: '#10b981'}} activeDot={{r: 8}} />
                       <Area type="monotone" dataKey="core" stroke="#3b82f6" strokeWidth={4} fill="url(#colorCore)" dot={{r: 4, fill: '#3b82f6'}} activeDot={{r: 8}} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* LADO DIREITO: RESUMO DE MEDIDAS E CONQUISTAS */}
        <div className="xl:col-span-4 space-y-8">
           
           {/* CARD DE MEDIDAS RÁPIDAS */}
           <div className="bg-slate-950 p-8 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8">Status <span className="text-emerald-500">Atual</span></h3>
              <div className="space-y-4">
                 {[
                   { label: 'Peso', value: '72.4kg', trend: '-2.1kg', icon: Scale, color: 'emerald' },
                   { label: 'Gordura Corporal', value: '18.2%', trend: '-1.5%', icon: Activity, color: 'emerald' },
                   { label: 'Força Escapular', value: 'Nível 4', trend: '+1', icon: Zap, color: 'amber' },
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                      <div className="flex items-center gap-4">
                         <div className={`p-3 bg-${stat.color}-500/20 text-${stat.color}-400 rounded-2xl group-hover:rotate-6 transition-transform`}>
                            <stat.icon size={20} />
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg font-black tracking-tight italic">{stat.value}</p>
                         </div>
                      </div>
                      <div className={`text-[10px] font-black px-3 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                         {stat.trend}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -mr-10 -mt-10" />
           </div>

           {/* BADGES DE CONQUISTA */}
           <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Conquistas Recentes</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Postura de Elite', icon: CheckCircle2, date: 'Setembro' },
                   { label: 'Core Estabilizado', icon: Zap, date: 'Novembro' },
                 ].map((badge, i) => (
                   <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col items-center text-center group hover:bg-emerald-50 transition-all cursor-help">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl mb-4 group-hover:scale-110 transition-transform">
                         <badge.icon size={24} />
                      </div>
                      <p className="text-[9px] font-black text-slate-900 uppercase tracking-tighter leading-tight">{badge.label}</p>
                      <p className="text-[7px] font-bold text-slate-400 uppercase mt-1">{badge.date}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* DICA TÉCNICA DA IA */}
           <div className="bg-emerald-500 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Info size={20} className="text-white/60" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Análise Postural IA</span>
                 </div>
                 <p className="text-lg font-medium italic leading-relaxed">
                   "Seu alinhamento de cabeça e pescoço melhorou visualmente em 15% na vista lateral. Continue focando na ativação do transverso abdominal."
                 </p>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
           </div>
        </div>
      </div>

      {/* MODAL NOVO REGISTRO - DESIGN MASTER */}
      {isAddingRecord && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-2xl z-[500] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20 flex flex-col">
              
              {/* Header Modal */}
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
                       <Camera size={32} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Check-in Visual</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Sincronize suas fotos e biometria hoje</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setIsAddingRecord(false)}
                  className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm"
                 >
                   <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-12">
                 
                 {/* ZONAS DE UPLOAD */}
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Camera size={14} /> Fotos de Diagnóstico
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                       {[
                         { side: 'anterior' as const, label: 'Vista Frontal' },
                         { side: 'perfil' as const, label: 'Vista Lateral' },
                         { side: 'posterior' as const, label: 'Vista Posterior' }
                       ].map((photo) => (
                         <div key={photo.side} className="space-y-3">
                            <div className="relative aspect-[3/4] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] overflow-hidden group hover:border-emerald-400 transition-all flex items-center justify-center">
                               {previews[photo.side] ? (
                                 <>
                                   <img src={previews[photo.side]!} className="w-full h-full object-cover" />
                                   <button 
                                    onClick={() => setPreviews(prev => ({ ...prev, [photo.side]: null }))}
                                    className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                      <Trash2 size={16} />
                                   </button>
                                 </>
                               ) : (
                                 <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-8 text-center gap-3">
                                    <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-300 group-hover:text-emerald-500 transition-colors">
                                       <Upload size={24} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-emerald-600">Subir Foto</span>
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => handleFileChange(photo.side, e.target.files?.[0] || null)} 
                                    />
                                 </label>
                               )}
                            </div>
                            <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">{photo.label}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* DADOS BIOMÉTRICOS */}
                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Scale size={14} /> Medidas do Dia
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Peso (kg)</label>
                          <input 
                            type="number" 
                            placeholder="70.5" 
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-xl outline-none focus:bg-white focus:border-emerald-500 transition-all italic tracking-tighter" 
                            value={newRecord.weight}
                            onChange={e => setNewRecord({...newRecord, weight: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Altura (cm)</label>
                          <input 
                            type="number" 
                            placeholder="175" 
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-xl outline-none focus:bg-white focus:border-emerald-500 transition-all italic tracking-tighter" 
                            value={newRecord.height}
                            onChange={e => setNewRecord({...newRecord, height: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">% Gordura (Opcional)</label>
                          <input 
                            type="number" 
                            placeholder="15.5" 
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-xl outline-none focus:bg-white focus:border-emerald-500 transition-all italic tracking-tighter" 
                            value={newRecord.fat}
                            onChange={e => setNewRecord({...newRecord, fat: e.target.value})}
                          />
                       </div>
                    </div>
                 </div>

                 {/* ANALYTICS PREVIEW NO MODAL */}
                 {(newRecord.weight && newRecord.height) && (
                   <div className="bg-slate-900 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 animate-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center font-black text-2xl">
                            <Activity size={28} />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">IMC Estimado Hoje</p>
                            <h4 className="text-4xl font-black italic tracking-tighter text-emerald-400">
                               {(Number(newRecord.weight) / Math.pow(Number(newRecord.height)/100, 2)).toFixed(1)}
                            </h4>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black bg-emerald-500 text-white px-5 py-2 rounded-xl uppercase tracking-widest shadow-lg">Peso Ideal Detectado</span>
                      </div>
                   </div>
                 )}
              </div>

              {/* Modal Footer */}
              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 shrink-0">
                 <button 
                  onClick={() => setIsAddingRecord(false)}
                  className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 rounded-[28px] font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all"
                 >
                   Cancelar
                 </button>
                 <button 
                  onClick={() => setIsAddingRecord(false)}
                  className="flex-[2] py-5 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    <Save size={18} /> Salvar e Analisar Evolução
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default VisualEvolution;
