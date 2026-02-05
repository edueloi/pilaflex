
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  CheckSquare,
  Award,
  X,
  PlusCircle,
  Briefcase,
  Dumbbell,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Target,
  Zap
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout, isOpen, setIsOpen }) => {
  const sections = [
    {
      title: 'Principal',
      roles: [UserRole.ADMIN, UserRole.PROFESSIONAL],
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'agenda', label: 'Agenda Global', icon: Calendar },
        { id: 'training-center', label: 'Centro de Treino', icon: Dumbbell },
        { id: 'tasks', label: 'Projetos Kanban', icon: CheckSquare },
      ]
    },
    {
      title: 'Administração',
      roles: [UserRole.ADMIN, UserRole.PROFESSIONAL],
      items: [
        { id: 'students', label: 'Alunos', icon: Users },
        { id: 'finance', label: 'Financeiro', icon: DollarSign },
        { id: 'staff', label: 'Equipe', icon: Briefcase },
      ]
    },
    {
      title: 'Academia',
      roles: [UserRole.ADMIN, UserRole.PROFESSIONAL],
      items: [
        { id: 'manage-courses', label: 'Editor de Cursos', icon: PlusCircle },
      ]
    },
    {
      title: 'Minha Jornada',
      roles: [UserRole.STUDENT],
      items: [
        { id: 'student-dashboard', label: 'Painel Inicial', icon: LayoutDashboard },
        { id: 'my-training', label: 'Treino de Hoje', icon: Dumbbell },
        { id: 'courses', label: 'Cursos & Aulas', icon: BookOpen },
        { id: 'my-certificates', label: 'Certificados', icon: GraduationCap },
      ]
    }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen bg-slate-950 text-white flex flex-col z-[70] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        border-r border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.3)]
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-72'}
      `}>
        {/* Logo Section */}
        <div className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:rotate-12 transition-transform duration-300">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">PilaFlex</h1>
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] leading-none">Business v2.0</span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 mt-6 px-4 space-y-8 overflow-y-auto custom-scrollbar pb-10">
          {sections.map((section, idx) => {
            if (!section.roles.includes(role)) return null;
            return (
              <div key={idx} className="space-y-2">
                <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                          ${isActive 
                            ? 'bg-gradient-to-r from-emerald-500/20 to-transparent text-emerald-400 border border-emerald-500/10' 
                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}
                        `}
                      >
                        <div className="flex items-center gap-3.5 z-10">
                          <item.icon size={18} className={`${isActive ? 'text-emerald-400 animate-pulse' : 'group-hover:scale-110 group-hover:text-emerald-400 transition-all'}`} />
                          <span className={`text-sm tracking-tight font-bold ${isActive ? 'text-white' : ''}`}>
                            {item.label}
                          </span>
                        </div>
                        {isActive && (
                          <>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                            <ChevronRight size={14} className="text-emerald-400" />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Upgrade Card (Pro context) */}
          {role !== UserRole.STUDENT && (
            <div className="mx-2 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl mt-10 relative overflow-hidden group">
               <div className="relative z-10">
                  <ShieldCheck className="text-emerald-500 mb-3" size={24} />
                  <p className="text-xs font-black text-white mb-1 italic">PLANO GOLD</p>
                  <p className="text-[10px] font-medium text-emerald-100/60 leading-relaxed mb-4">Até 10 instrutores ativos.</p>
                  <button className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:text-white transition-colors">Falar com Gerente</button>
               </div>
               <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full -mb-10 -mr-10 group-hover:bg-emerald-500/20 transition-all" />
            </div>
          )}
        </div>

        {/* User Profile Area */}
        <div className="p-6 border-t border-white/5 bg-slate-900/30">
          <div className="flex items-center gap-4 mb-6 px-2">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-white shadow-xl">
                {role === UserRole.STUDENT ? 'A' : 'C'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-white truncate leading-none mb-1.5 uppercase italic tracking-tighter">
                {role === UserRole.STUDENT ? 'Aluno Demo' : 'Carlos Alberto'}
              </p>
              <div className="flex items-center gap-1.5">
                <Target size={10} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate">
                  {role === UserRole.STUDENT ? 'Pila-Membro' : 'Proprietário Master'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 py-4 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={16} />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
