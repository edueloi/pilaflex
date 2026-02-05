
import React, { useState } from 'react';
import { 
  Plus, 
  Video, 
  Layers, 
  Trash2, 
  Edit3, 
  Image as ImageIcon,
  CheckCircle,
  ChevronRight,
  Save,
  ArrowLeft,
  Settings,
  Monitor,
  Layout,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'pdf' | 'quiz';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const ManageCourses: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'content' | 'settings'>('details');
  const [modules, setModules] = useState<Module[]>([
    { id: '1', title: 'Módulo 1: Introdução ao Método', lessons: [{ id: 'l1', title: 'Boas-vindas', duration: '05:00', type: 'video' }] }
  ]);

  const addModule = () => {
    const newModule: Module = {
      id: Math.random().toString(),
      title: `Novo Módulo ${modules.length + 1}`,
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const addLesson = (moduleId: string) => {
    setModules(modules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, { id: Math.random().toString(), title: 'Nova Aula', duration: '10:00', type: 'video' }]
        };
      }
      return m;
    }));
  };

  if (isCreating) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col animate-in fade-in duration-500">
        {/* Top Header Editor */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-[60]">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
               <ArrowLeft size={24} />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div>
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-1">Criando Novo Curso</p>
               <h2 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Pilates Reformer Masterclass</h2>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                Salvar Rascunho
             </button>
             <button className="flex items-center gap-2 px-8 py-2.5 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                <Save size={16} /> Publicar Curso
             </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Editor Sidebar */}
          <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 space-y-2">
            <button 
              onClick={() => setActiveTab('details')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'details' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Layout size={18} /> Informações
            </button>
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'content' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Layers size={18} /> Conteúdo & Aulas
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'settings' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <Settings size={18} /> Configurações
            </button>
          </aside>

          {/* Editor Main Content */}
          <main className="flex-1 overflow-y-auto custom-scrollbar p-12 bg-slate-50/50">
             <div className="max-w-4xl mx-auto space-y-10 pb-20">
                {activeTab === 'details' && (
                  <div className="space-y-10 animate-in slide-in-from-right-4 duration-300">
                     <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
                        <div className="flex items-center gap-4 pb-6 border-b border-slate-50">
                           <div className="p-4 bg-emerald-50 text-emerald-500 rounded-3xl">
                              <Layout size={32} />
                           </div>
                           <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">Sobre o Curso</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Treinamento</label>
                              <input type="text" placeholder="Ex: Pilates Funcional para Gestantes" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all" />
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                              <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 outline-none focus:bg-white">
                                 <option>Solo / Mat Pilates</option>
                                 <option>Aparelhos / Studio</option>
                                 <option>Anatomia</option>
                                 <option>Fisioterapia</option>
                              </select>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Breve Descrição</label>
                           <textarea rows={4} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-medium focus:bg-white focus:border-emerald-500 outline-none transition-all resize-none"></textarea>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capa do Curso (16:9)</label>
                           <div className="w-full aspect-video rounded-[32px] border-4 border-dashed border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer">
                              <ImageIcon size={48} className="mb-4" />
                              <span className="font-black text-xs uppercase tracking-widest">Upload da Imagem</span>
                              <span className="text-[10px] font-bold mt-2">JPG, PNG ou WebP até 5MB</span>
                           </div>
                        </div>
                     </section>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                     <div className="flex items-center justify-between bg-slate-900 p-8 rounded-[32px] text-white">
                        <div>
                           <h3 className="text-xl font-black uppercase italic tracking-tighter">Grade Curricular</h3>
                           <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Organize por módulos e aulas</p>
                        </div>
                        <button onClick={addModule} className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl">
                           <Plus size={18} /> Adicionar Módulo
                        </button>
                     </div>

                     {modules.map((module, mIdx) => (
                       <div key={module.id} className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden group">
                          <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">
                                   {mIdx + 1}
                                </div>
                                <input 
                                  className="bg-transparent text-lg font-black text-slate-900 border-none outline-none focus:border-b focus:border-emerald-500 p-0" 
                                  defaultValue={module.title}
                                />
                             </div>
                             <div className="flex items-center gap-2">
                                <button className="p-2 text-slate-400 hover:text-rose-500 transition-all"><Trash2 size={18} /></button>
                             </div>
                          </div>
                          <div className="p-6 space-y-3">
                             {module.lessons.map((lesson, lIdx) => (
                               <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl group/lesson hover:border-emerald-200 hover:shadow-md transition-all">
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                     <Video size={16} />
                                  </div>
                                  <input className="flex-1 font-bold text-sm text-slate-700 bg-transparent border-none outline-none" defaultValue={lesson.title} />
                                  <div className="flex items-center gap-4">
                                     <span className="text-[10px] font-black text-slate-300 uppercase">{lesson.duration}</span>
                                     <button className="text-slate-300 hover:text-emerald-500 transition-colors"><Edit3 size={16} /></button>
                                     <button className="text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                  </div>
                               </div>
                             ))}
                             <button 
                               onClick={() => addLesson(module.id)}
                               className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-widest hover:border-emerald-200 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
                             >
                                <Plus size={16} /> Adicionar Nova Aula
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                     <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-8">Acesso & Certificados</h3>
                        <div className="space-y-6">
                           <label className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                                    <CheckCircle size={24} />
                                 </div>
                                 <div>
                                    <p className="font-black text-slate-900 uppercase italic text-sm tracking-tight">Emitir Certificado Automático</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">O aluno recebe o PDF ao completar 100%</p>
                                 </div>
                              </div>
                              <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-emerald-500 focus:ring-emerald-500" />
                           </label>
                           
                           <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                              <div className="flex items-center gap-3 mb-6">
                                 <Clock size={20} className="text-emerald-400" />
                                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Tempo de Acesso</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 <button className="py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Acesso Vitalício</button>
                                 <button className="py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20">Por 12 Meses</button>
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
                )}
             </div>
          </main>
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
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Creator Studio</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Meus <span className="text-emerald-500">Cursos</span></h1>
          <p className="text-slate-500 font-medium text-lg">Crie e gerencie sua biblioteca de treinamentos para alunos.</p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Novo Curso
        </button>
      </header>

      {/* Course List Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { title: 'Fundamentos do Pilates Solo', modules: 12, lessons: 48, students: 124, status: 'Publicado' },
          { title: 'Pilates para Gestantes', modules: 4, lessons: 24, students: 56, status: 'Rascunho' },
          { title: 'Anatomia e Biomecânica', modules: 8, lessons: 32, students: 89, status: 'Publicado' },
        ].map((course, idx) => (
          <div key={idx} className="bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 group overflow-hidden flex flex-col">
             <div className="relative aspect-video bg-slate-100">
                <img src={`https://picsum.photos/seed/course-gen-${idx}/800/600`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Capa" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-8">
                   <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${course.status === 'Publicado' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-amber-500 text-white border-amber-400'}`}>
                         {course.status}
                      </span>
                      <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold">
                         <Monitor size={14} /> 1080p
                      </div>
                   </div>
                </div>
             </div>
             <div className="p-8 space-y-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight">{course.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Módulos</p>
                      <p className="text-lg font-black text-slate-900">{course.modules}</p>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Aulas</p>
                      <p className="text-lg font-black text-slate-900">{course.lessons}</p>
                   </div>
                </div>
                <div className="pt-6 border-t border-slate-50 mt-auto flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-black uppercase text-slate-400">{course.students} Alunos Inscritos</span>
                   </div>
                   <button onClick={() => setIsCreating(true)} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-xl group-hover:rotate-6">
                      <Edit3 size={18} />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
