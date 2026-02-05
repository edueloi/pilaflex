
import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import Courses from './pages/Courses';
import Finance from './pages/Finance';
import StudentsManagement from './pages/StudentsManagement';
import ManageCourses from './pages/ManageCourses';
import StaffManagement from './pages/StaffManagement';
import PermissionsManagement from './pages/PermissionsManagement';
import SuppliersManagement from './pages/SuppliersManagement';
import ClinicalCenter from './pages/ClinicalCenter';
import Agenda from './pages/Agenda';
import TasksKanban from './pages/TasksKanban';
import MyTraining from './pages/MyTraining';
import TrainingCenter from './pages/TrainingCenter';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Manual from './pages/Manual';
import { 
  Bell, 
  User as UserIcon, 
  Menu, 
  Search, 
  Award, 
  Command, 
  ArrowLeft,
  SearchX,
  Settings,
  UserCircle,
  CreditCard,
  LogOut,
  ChevronDown,
  X,
  Trash2,
  Zap,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';

const Page404: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500">
    <div className="relative mb-12">
       <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full scale-150 animate-pulse"></div>
       <div className="relative w-40 h-40 bg-slate-950 rounded-[40px] flex items-center justify-center shadow-2xl border border-white/10 rotate-12">
          <SearchX size={80} className="text-emerald-500" />
       </div>
       <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center font-black text-2xl shadow-xl">404</div>
    </div>
    <h1 className="text-6xl font-black text-slate-950 tracking-tighter uppercase italic leading-none mb-6">Página <span className="text-emerald-500">Perdida</span></h1>
    <p className="text-slate-400 text-xl font-medium max-w-md mb-12">
      O movimento que você tentou realizar não existe no repertório do PilaFlex. Vamos voltar para o equilíbrio?
    </p>
    <button 
      onClick={onReset}
      className="bg-slate-950 text-white px-12 py-5 rounded-[28px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-emerald-600 transition-all shadow-2xl active:scale-95"
    >
      <ArrowLeft size={18} /> Retornar ao Dashboard
    </button>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLayout, setHideLayout] = useState(false); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Novo Aluno Registrado', desc: 'Maria Eduarda acaba de se matricular no plano Gold.', time: '12 min ago', icon: <CheckCircle2 size={16} />, type: 'success' },
    { id: 2, title: 'Manutenção Preventiva', desc: 'O Reformer 04 precisa de lubrificação técnica.', time: '2 horas ago', icon: <Zap size={16} />, type: 'warning' },
    { id: 3, title: 'Assinatura PilaFlex', desc: 'Sua fatura de Dezembro foi processada com sucesso.', time: 'Ontem', icon: <CreditCard size={16} />, type: 'info' }
  ]);
  
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === UserRole.STUDENT) {
        setActiveTab('student-dashboard');
      } else {
        setActiveTab('dashboard');
      }
      const timer = setTimeout(() => setIsLoaded(true), 200);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [isAuthenticated, userRole]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
    setHideLayout(false);
    setIsUserMenuOpen(false);
  };

  const resetToHome = () => {
    setActiveTab(userRole === UserRole.STUDENT ? 'student-dashboard' : 'dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <StudentsManagement />;
      case 'clinical': return <ClinicalCenter />;
      case 'finance': return <Finance />;
      case 'agenda': return <Agenda />;
      case 'manage-courses': return <ManageCourses />;
      case 'staff': return <StaffManagement />;
      case 'permissions': return <PermissionsManagement />;
      case 'suppliers': return <SuppliersManagement />;
      case 'tasks': return <TasksKanban />;
      case 'training-center': return <TrainingCenter />;
      case 'student-dashboard': return <StudentDashboard />;
      case 'my-training': return <MyTraining />;
      case 'courses': return <Courses onViewingCourse={setHideLayout} />;
      case 'profile': return <Profile role={userRole} />;
      case 'subscription': return <Subscription />;
      case 'manual': return <Manual />;
      case 'my-certificates': return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
          <header>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Meus Certificados</h1>
            <p className="text-slate-500 font-medium">Suas conquistas na plataforma.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Fundamentos do Mat Pilates', date: '12/10/2024', hours: '20h' },
              { title: 'Anatomia para Iniciantes', date: '05/09/2024', hours: '12h' },
            ].map((cert, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:border-emerald-500 transition-all group relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-emerald-500 group-hover:text-white">
                      <Award size={40} />
                   </div>
                   <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight mb-2">{cert.title}</h3>
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <span>{cert.date}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span>{cert.hours}</span>
                   </div>
                   <button className="mt-8 text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:underline underline-offset-4">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <Page404 onReset={resetToHome} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex transition-all duration-1000 ${isLoaded ? 'opacity-100 reveal-app' : 'opacity-0'}`}>
      {!hideLayout && (
        <Sidebar 
          role={userRole} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}
      
      <main className={`flex-1 flex flex-col transition-all duration-500 ${!hideLayout ? 'lg:pl-72' : ''} h-screen overflow-hidden`}>
        {!hideLayout && (
          <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-10 flex items-center justify-between sticky top-0 z-40 shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-3 text-slate-500 hover:bg-slate-50 rounded-2xl transition-all"
              >
                <Menu size={24} />
              </button>
              <div className="hidden md:flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                   <Command size={12} />
                   <span>PF-{userRole === UserRole.STUDENT ? 'STUDENT' : 'BIZ'}</span>
                </div>
                <span className="text-slate-200">/</span>
                <span className="text-slate-900 italic tracking-tighter font-black text-sm">{activeTab.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-8">
              {/* NOTIFICATIONS */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-3.5 text-slate-400 hover:text-emerald-500 transition-colors bg-white rounded-2xl border-2 border-slate-50 shadow-sm hover:border-emerald-100"
                >
                  <Bell size={22} />
                  {notifications.length > 0 && (
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-4 w-80 md:w-96 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                       <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest">Centro de Alertas</h3>
                       <button onClick={() => setNotifications([])} className="text-[9px] font-black uppercase text-emerald-500 hover:text-emerald-600 transition-colors flex items-center gap-2">
                         <Trash2 size={12} /> Limpar Tudo
                       </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {notifications.length > 0 ? notifications.map(notif => (
                        <div key={notif.id} className="p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                           <div className="flex gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                notif.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 
                                notif.type === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                              }`}>
                                {notif.icon}
                              </div>
                              <div className="flex-1 space-y-1">
                                 <p className="text-xs font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors uppercase italic tracking-tighter">{notif.title}</p>
                                 <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{notif.desc}</p>
                                 <div className="flex items-center gap-1.5 pt-1 text-slate-300">
                                   <Clock size={10} />
                                   <span className="text-[8px] font-black uppercase tracking-widest">{notif.time}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                      )) : (
                        <div className="py-20 text-center space-y-4">
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                             <Bell size={24} />
                           </div>
                           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Silêncio total por aqui</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* USER PROFILE & DROPDOWN */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-4 pl-4 md:pl-8 border-l border-slate-100 group transition-all"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900 leading-none tracking-tight uppercase italic group-hover:text-emerald-600 transition-colors">
                      {userRole === UserRole.PROFESSIONAL ? 'Carlos Alberto' : 'Aluno Demo'}
                    </p>
                    <p className="text-[9px] uppercase font-black text-emerald-600 tracking-widest mt-1.5 flex items-center justify-end gap-1">
                      {userRole} Member <ChevronDown size={10} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-[18px] flex items-center justify-center shadow-xl shadow-slate-900/20 transform group-hover:rotate-6 transition-all ring-2 ring-transparent group-hover:ring-emerald-500/20">
                    <UserIcon size={22} />
                  </div>
                </button>

                {/* DROPDOWN MENU */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-2xl border border-slate-100 p-2 z-[100] animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Logado como</p>
                      <p className="text-sm font-black text-slate-900 truncate">{userRole === UserRole.PROFESSIONAL ? 'carlos@pilaflex.com' : 'aluno@demo.com'}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <button 
                        onClick={() => { setActiveTab('profile'); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group"
                      >
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                          <UserCircle size={18} />
                        </div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Meu Perfil</span>
                      </button>

                      {/* OCULTAR MANUAL PARA ALUNOS */}
                      {userRole !== UserRole.STUDENT && (
                        <button 
                          onClick={() => { setActiveTab('manual'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group"
                        >
                          <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <BookOpen size={18} />
                          </div>
                          <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Manual do Sistema</span>
                        </button>
                      )}

                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                          <Settings size={18} />
                        </div>
                        <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Configurações</span>
                      </button>

                      {userRole !== UserRole.STUDENT && (
                        <button 
                          onClick={() => { setActiveTab('subscription'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all group"
                        >
                          <div className="p-2 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <CreditCard size={18} />
                          </div>
                          <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Assinatura</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-50">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-rose-50 text-rose-500 transition-all group"
                      >
                        <div className="p-2 bg-rose-50 text-rose-500 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                          <LogOut size={18} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">Encerrar Sessão</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* Scroll interno da área de conteúdo */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30 pb-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
