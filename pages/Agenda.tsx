
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  User, 
  MapPin,
  CheckCircle,
  MoreVertical,
  Filter,
  LayoutGrid,
  List,
  CalendarDays,
  X,
  Users,
  Save
} from 'lucide-react';

const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const initialAppointments = [
  { id: 1, time: '08:00', student: 'Maria Oliveira', instructor: 'Prof. Carlos', type: 'Reformer Duo', status: 'confirmed', duration: '55min' },
  { id: 2, time: '08:00', student: 'João Santos', instructor: 'Prof. Carlos', type: 'Reformer Duo', status: 'confirmed', duration: '55min' },
  { id: 3, time: '10:00', student: 'Ana Clara', instructor: 'Profa. Julia', type: 'Solo Particular', status: 'waiting', duration: '55min' },
];

const Agenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [showAddModal, setShowAddModal] = useState(false);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedTime, setSelectedTime] = useState('08:00');

  const handleOpenModal = (time?: string) => {
    if (time) setSelectedTime(time);
    setShowAddModal(true);
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de salvamento
    setShowAddModal(false);
    alert('Aula agendada com sucesso!');
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'waiting': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const renderMonthView = () => {
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    return (
      <div className="grid grid-cols-7 border-t border-l border-slate-100 bg-white animate-in fade-in duration-500">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
          <div key={d} className="p-4 border-r border-b border-slate-100 bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
            {d}
          </div>
        ))}
        {days.map(d => (
          <div key={d} onClick={() => handleOpenModal()} className="h-24 md:h-32 p-3 border-r border-b border-slate-100 relative group hover:bg-emerald-50/20 transition-all cursor-pointer overflow-hidden">
            <span className={`text-[10px] md:text-xs font-black ${d === 12 ? 'bg-emerald-500 text-white w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
              {d > 31 ? d - 31 : d}
            </span>
            {d === 12 && (
              <div className="mt-1 space-y-1">
                <div className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[7px] md:text-[8px] font-black uppercase truncate">18 Aulas</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => (
    <div className="overflow-y-auto max-h-[70vh] custom-scrollbar animate-in fade-in duration-500">
      {timeSlots.map((time) => {
        const dayAppointments = appointments.filter(a => a.time === time);
        return (
          <div key={time} className="flex border-b border-slate-50 min-h-[120px] group/slot">
            <div className="w-20 md:w-24 p-4 md:p-6 border-r border-slate-50 flex flex-col items-center justify-start bg-slate-50/30">
              <span className="text-xs md:text-sm font-black text-slate-400 group-hover/slot:text-emerald-500 transition-colors">{time}</span>
            </div>
            <div className="flex-1 p-2 md:p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative">
               {dayAppointments.length > 0 ? (
                 dayAppointments.map(app => (
                   <div key={app.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-black text-slate-900 text-sm md:text-base group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{app.student}</p>
                          <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                            <Clock size={10} /> {app.duration} &bull; {app.type}
                          </div>
                        </div>
                        <button className="text-slate-200 hover:text-slate-500 p-1"><MoreVertical size={16} /></button>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                         <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-[9px]">
                              {app.instructor.split(' ')[1][0]}
                            </div>
                            <span className="text-[9px] font-black text-slate-500 uppercase">{app.instructor}</span>
                         </div>
                         <span className={`px-2 py-1 rounded-lg text-[7px] md:text-[8px] font-black uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                           {app.status === 'confirmed' ? 'Confirmado' : 'Espera'}
                         </span>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/40">
                    <button 
                      onClick={() => handleOpenModal(time)}
                      className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-widest bg-white px-5 py-2.5 rounded-full border border-emerald-100 shadow-xl hover:scale-105 transition-all"
                    >
                      <Plus size={14} /> Reservar Horário
                    </button>
                 </div>
               )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <CalendarIcon className="text-emerald-500" size={16} />
             <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.4em]">Agenda Central</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Minha <span className="text-emerald-500">Agenda</span></h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg">Controle de horários e instrutores.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           {/* View Switcher Compacto */}
           <div className="bg-white border border-slate-200 rounded-2xl p-1 flex gap-1 shadow-sm">
              <button onClick={() => setViewMode('month')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'month' ? 'bg-slate-950 text-white' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={16} /></button>
              <button onClick={() => setViewMode('day')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'day' ? 'bg-slate-950 text-white' : 'text-slate-400 hover:text-slate-600'}`}><List size={16} /></button>
           </div>

           <div className="flex items-center bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <button className="p-3 hover:bg-slate-50 transition-colors border-r border-slate-100"><ChevronLeft size={16} /></button>
             <div className="px-4 py-2 font-black text-slate-900 text-[10px] md:text-xs uppercase italic">
               {viewMode === 'day' ? selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) : 'Dezembro 2024'}
             </div>
             <button className="p-3 hover:bg-slate-50 transition-colors border-l border-slate-100"><ChevronRight size={16} /></button>
           </div>
        </div>
      </header>

      <div className="bg-white rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
         {viewMode === 'month' ? renderMonthView() : renderDayView()}
      </div>

      {/* MODAL DE NOVO AGENDAMENTO */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[150] flex items-center justify-center p-4">
           <form onSubmit={handleSaveAppointment} className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Agendamento</span></h2>
                    <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mt-1.5">Defina os detalhes da reserva</p>
                 </div>
                 <button type="button" onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={20} />
                 </button>
              </div>

              <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Horário Selecionado</label>
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
                       <Clock size={18} />
                       <span className="font-black text-lg tracking-tighter">{selectedTime}</span>
                       <span className="text-[10px] uppercase font-black opacity-50 ml-auto">Disponível</span>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Selecionar Aluno</label>
                    <div className="relative">
                       <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 text-sm focus:bg-white focus:border-emerald-500 transition-all appearance-none">
                          <option>Selecione um aluno...</option>
                          <option>Maria Oliveira</option>
                          <option>João Santos</option>
                          <option>Ana Clara</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Instrutor</label>
                       <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 text-xs">
                          <option>Prof. Carlos</option>
                          <option>Profa. Julia</option>
                          <option>Profa. Mariana</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Modalidade</label>
                       <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700 text-xs">
                          <option>Solo (Mat)</option>
                          <option>Reformer Duo</option>
                          <option>Cadillac</option>
                          <option>Particular</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Observações da Reserva</label>
                    <textarea placeholder="Alguma restrição ou foco específico?" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium resize-none focus:bg-white focus:border-emerald-500" rows={3}></textarea>
                 </div>
              </div>

              <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                 <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-4 border-2 border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">Cancelar</button>
                 <button type="submit" className="flex-[2] flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                    <Save size={16} /> Confirmar Reserva
                 </button>
              </div>
           </form>
        </div>
      )}

      {/* Botão Flutuante Compacto */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[50]">
         <button onClick={() => handleOpenModal()} className="w-14 h-14 md:w-20 md:h-20 bg-emerald-500 text-white rounded-2xl md:rounded-[32px] shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-emerald-600 transition-all active:scale-95 group">
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
         </button>
      </div>
    </div>
  );
};

export default Agenda;
