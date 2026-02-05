
import React, { useState } from 'react';
import { 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  Search, 
  Filter, 
  ChevronRight,
  Clock,
  Layout,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronDown
} from 'lucide-react';

interface CoursesProps {
  onViewingCourse: (viewing: boolean) => void;
}

const coursesMock = [
  {
    id: '1',
    title: 'Fundamentos do Pilates Solo',
    description: 'Aprenda os princípios básicos do Joseph Pilates no solo para fortalecimento do core.',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-29a8d63a80ec?q=80&w=1200',
    progress: 45,
    lessons: 12,
    category: 'Iniciante',
    instructor: 'Prof. Carlos'
  },
  {
    id: '2',
    title: 'Avançado no Reformer',
    description: 'Técnicas avançadas para o aparelho Reformer com foco em mobilidade extrema.',
    thumbnail: 'https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=1200',
    progress: 10,
    lessons: 24,
    category: 'Avançado',
    instructor: 'Profa. Julia'
  },
  {
    id: '3',
    title: 'Anatomia Aplicada ao Pilates',
    description: 'Entenda os grupos musculares envolvidos em cada movimento biomecânico.',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
    progress: 85,
    lessons: 8,
    category: 'Teórico',
    instructor: 'Dr. Lucas'
  }
];

const Courses: React.FC<CoursesProps> = ({ onViewingCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleOpenCourse = (course: any) => {
    setSelectedCourse(course);
    onViewingCourse(true);
  };

  const handleCloseCourse = () => {
    setSelectedCourse(null);
    onViewingCourse(false);
  };

  if (selectedCourse) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex flex-col h-screen overflow-hidden animate-in fade-in duration-500">
        {/* Cinema Mode Header */}
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-xl shrink-0">
           <button 
             onClick={handleCloseCourse}
             className="flex items-center gap-3 px-6 py-2.5 bg-white/5 hover:bg-emerald-500 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-white/10 group"
           >
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
             Sair do Curso
           </button>
           <div className="text-center">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">Módulo 1 &bull; Aula 2</p>
              <h2 className="text-sm font-black uppercase italic tracking-tighter">{selectedCourse.title}</h2>
           </div>
           <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                 <p className="text-[10px] font-black text-white/30 uppercase">Seu Progresso</p>
                 <p className="text-xs font-black text-emerald-400">45% Concluído</p>
              </div>
              <button className="p-3 bg-white/5 rounded-xl border border-white/10"><Bookmark size={18} /></button>
           </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Video Area */}
          <div className="flex-1 bg-black overflow-y-auto custom-scrollbar flex flex-col">
            <div className="relative aspect-video w-full bg-slate-900">
               <img src={selectedCourse.thumbnail} className="w-full h-full object-cover opacity-40 blur-sm" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-transform cursor-pointer">
                     <PlayCircle size={48} fill="white" />
                  </div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                  <div className="h-full bg-emerald-500 w-[45%]" />
               </div>
            </div>
            
            <div className="p-8 lg:p-16 space-y-8 max-w-5xl mx-auto">
               <div className="space-y-4">
                  <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Anatomia do Core e Respiração Segmentada</h1>
                  <div className="flex flex-wrap items-center gap-6">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black">C</div>
                        <p className="text-sm font-bold text-white/70">Prof. Carlos Alberto</p>
                     </div>
                     <div className="flex items-center gap-2 text-white/40 text-xs font-bold uppercase tracking-widest">
                        <Clock size={16} /> 24 minutos
                     </div>
                  </div>
               </div>
               <p className="text-white/60 text-lg leading-relaxed">
                 Nesta aula, exploramos profundamente a musculatura transversa do abdômen e como a respiração segmentada potencializa cada movimento no solo. Siga as instruções biomecânicas com precisão.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                     <h3 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Materiais Complementares</h3>
                     <button className="w-full text-left p-4 bg-slate-900 rounded-2xl flex items-center justify-between hover:bg-emerald-500/10 transition-all border border-white/5">
                        <span className="text-sm font-bold">PDF: Guia de Respiração.pdf</span>
                        <ChevronRight size={16} />
                     </button>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-3">
                     <h3 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Dúvidas da Aula</h3>
                     <button className="w-full py-4 bg-emerald-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all">Abrir Chat com Instrutor</button>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Sidebar - Lessons & Modules */}
          <div className="w-full lg:w-[400px] bg-slate-950 border-l border-white/5 flex flex-col shrink-0">
             <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Conteúdo do Curso</h3>
                <Layout size={18} className="text-white/20" />
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                {[1, 2, 3].map((mod) => (
                  <div key={mod} className="border-b border-white/5">
                    <button className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all text-left">
                       <div>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Módulo {mod}</p>
                          <p className="text-sm font-bold text-white">Introdução e Alinhamento</p>
                       </div>
                       <ChevronDown size={16} className="text-white/30" />
                    </button>
                    <div className="bg-slate-900/40">
                       {[1, 2, 3, 4].map((lesson) => (
                         <button key={lesson} className={`w-full p-5 flex items-center gap-4 hover:bg-white/5 border-b border-white/5 last:border-0 group ${mod === 1 && lesson === 2 ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500' : ''}`}>
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-black text-[10px] transition-all ${mod === 1 && lesson === 1 ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/10 text-white/20 group-hover:border-emerald-500'}`}>
                               {mod === 1 && lesson === 1 ? <CheckCircle size={14} /> : lesson}
                            </div>
                            <div className="flex-1 text-left">
                               <p className={`text-xs font-bold leading-tight ${mod === 1 && lesson === 2 ? 'text-white' : 'text-white/40'}`}>Aula {lesson}: Movimentos Bio-Flow</p>
                               <div className="flex items-center gap-2 mt-1">
                                  <Clock size={10} className="text-white/20" />
                                  <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">12:30</span>
                               </div>
                            </div>
                         </button>
                       ))}
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Academy Pro</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Minha Biblioteca</h1>
          <p className="text-slate-500 font-medium text-lg">Evolua sua técnica com a melhor curadoria de Pilates.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Buscar curso..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl outline-none font-bold text-sm shadow-sm transition-all"
            />
          </div>
          <button className="w-full sm:w-auto p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-emerald-500 transition-all shadow-sm">
            <Filter size={24} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {coursesMock.map((course, idx) => (
          <div 
            key={course.id} 
            className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 flex flex-col animate-in slide-in-from-bottom-6"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={course.thumbnail} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-6 right-6">
                 <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{course.category}</div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                 <button 
                  onClick={() => handleOpenCourse(course)}
                  className="w-full py-4 bg-white text-slate-900 rounded-[20px] font-black uppercase text-[10px] tracking-widest shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                 >
                    Continuar Assistindo
                 </button>
              </div>
            </div>
            
            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">{course.title}</h3>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <span className="flex items-center gap-1.5 text-emerald-500"><PlayCircle size={14} /> {course.lessons} Aulas</span>
                 <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                 <span>{course.instructor}</span>
              </div>
              <div className="pt-4 space-y-2">
                 <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span>Progresso Atual</span>
                    <span className="text-emerald-500">{course.progress}%</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
