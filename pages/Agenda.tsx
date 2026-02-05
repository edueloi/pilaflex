
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
  CalendarDays
} from 'lucide-react';

const timeSlots = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const appointments = [
  { id: 1, time: '08:00', student: 'Maria Oliveira', instructor: 'Prof. Carlos', type: 'Reformer Duo', status: 'confirmed', duration: '55min' },
  { id: 2, time: '08:00', student: 'João Santos', instructor: 'Prof. Carlos', type: 'Reformer Duo', status: 'confirmed', duration: '55min' },
  { id: 3, time: '10:00', student: 'Ana Clara', instructor: 'Profa. Julia', type: 'Solo Particular', status: 'waiting', duration: '55min' },
  { id: 4, time: '11:00', student: 'Ricardo Lima', instructor: 'Prof. Carlos', type: 'Cadillac', status: 'confirmed', duration: '55min' },
  { id: 5, time: '14:00', student: 'Carla Dias', instructor: 'Profa. Julia', type: 'Avançado', status: 'confirmed', duration: '55min' },
  { id: 6, time: '16:00', student: 'Pedro Ramos', instructor: 'Prof. Carlos', type: 'Fisioterapia', status: 'confirmed', duration: '55min' },
];

const Agenda: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

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
          <div key={d} className="h-32 p-4 border-r border-b border-slate-100 relative group hover:bg-emerald-50/20 transition-all cursor-pointer">
            <span className={`text-xs font-black ${d === 12 ? 'bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-400'}`}>
              {d > 31 ? d - 31 : d}
            </span>
            {d === 12 && (
              <div className="mt-2 space-y-1">
                <div className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[8px] font-black uppercase truncate">18 Aulas</div>
                <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[8px] font-black uppercase truncate">2 Avaliações</div>
              </div>
            )}
            {d === 15 && (
              <div className="mt-2 space-y-1">
                 <div className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-[8px] font-black uppercase truncate">Evento Master</div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => (
    <div className="overflow-y-auto max-h-[700px] custom-scrollbar animate-in fade-in duration-500">
      {timeSlots.map((time) => {
        const dayAppointments = appointments.filter(a => a.time === time);
        return (
          <div key={time} className="flex border-b border-slate-50 min-h-[100px] group/slot">
            <div className="w-24 p-6 border-r border-slate-50 flex flex-col items-center justify-start bg-slate-50/30">
              <span className="text-sm font-black text-slate-400 group-hover/slot:text-emerald-500 transition-colors">{time}</span>
            </div>
            <div className="flex-1 p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative">
               {dayAppointments.length > 0 ? (
                 dayAppointments.map(app => (
                   <div key={app.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all group flex flex-col justify-between cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-black text-slate-900 text-base group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{app.student}</p>
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            <Clock size={12} /> {app.duration} &bull; {app.type}
                          </div>
                        </div>
                        <button className="text-slate-200 hover:text-slate-500 p-1"><MoreVertical size={18} /></button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[10px] shadow-lg">
                              {app.instructor.split(' ')[1][0]}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase">{app.instructor}</span>
                         </div>
                         <span className={`px-2.5 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                           {app.status === 'confirmed' ? 'Confirmado' : 'Espera'}
                         </span>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 shadow-xl hover:scale-105 transition-all">
                      <Plus size={16} /> Novo Agendamento
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
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <CalendarIcon className="text-emerald-500" size={18} />
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Controle de Fluxo</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Minha <span className="text-emerald-500">Agenda</span></h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie horários e instrutores com precisão cirúrgica.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
           {/* View Switcher */}
           <div className="bg-white border border-slate-200 rounded-[28px] p-1.5 flex gap-1 shadow-sm">
              <button 
                onClick={() => setViewMode('month')}
                className={`p-3 rounded-2xl flex items-center gap-2 transition-all ${viewMode === 'month' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                 <LayoutGrid size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Mês</span>
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`p-3 rounded-2xl flex items-center gap-2 transition-all ${viewMode === 'week' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                 <CalendarDays size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Semana</span>
              </button>
              <button 
                onClick={() => setViewMode('day')}
                className={`p-3 rounded-2xl flex items-center gap-2 transition-all ${viewMode === 'day' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                 <List size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Dia</span>
              </button>
           </div>

           <div className="flex items-center bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm">
             <button className="p-4 hover:bg-slate-50 transition-colors border-r border-slate-100"><ChevronLeft size={20} /></button>
             <div className="px-8 py-3 font-black text-slate-900 text-sm uppercase italic flex items-center gap-3">
               {viewMode === 'day' 
                 ? selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }) 
                 : 'Dezembro 2024'}
             </div>
             <button className="p-4 hover:bg-slate-50 transition-colors border-l border-slate-100"><ChevronRight size={20} /></button>
           </div>
        </div>
      </header>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden">
         {viewMode === 'month' ? renderMonthView() : renderDayView()}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-12 right-12 z-[50]">
         <button className="w-20 h-20 bg-emerald-500 text-white rounded-[32px] shadow-[0_20px_50px_rgba(16,185,129,0.4)] flex items-center justify-center hover:scale-110 hover:bg-emerald-600 transition-all active:scale-95 group">
            <Plus size={32} className="group-hover:rotate-90 transition-transform duration-300" />
         </button>
      </div>
    </div>
  );
};

export default Agenda;
