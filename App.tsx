
import React, { useState, useEffect } from 'react';
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
import Agenda from './pages/Agenda';
import TasksKanban from './pages/TasksKanban';
import MyTraining from './pages/MyTraining';
import { 
  Bell, 
  User as UserIcon, 
  Menu, 
  Search, 
  Award, 
  Command, 
  AlertTriangle, 
  ArrowLeft,
  SearchX
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

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === UserRole.STUDENT) {
        setActiveTab('student-dashboard');
      } else {
        setActiveTab('dashboard');
      }
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [isAuthenticated, userRole]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
    setHideLayout(false);
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
      case 'finance': return <Finance />;
      case 'agenda': return <Agenda />;
      case 'manage-courses': return <ManageCourses />;
      case 'staff': return <StaffManagement />;
      case 'tasks': return <TasksKanban />;
      case 'student-dashboard': return <StudentDashboard />;
      case 'my-training': return <MyTraining />;
      case 'courses': return <Courses onViewingCourse={setHideLayout} />;
      case 'my-certificates': return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-6">
          <header>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Meus Certificados</h1>
            <p className="text-slate-500 font-medium">Suas conquistas e especializações na plataforma.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Fundamentos do Mat Pilates', date: '12/10/2024', hours: '20h' },
              { title: 'Anatomia para Iniciantes', date: '05/09/2024', hours: '12h' },
            ].map((cert, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:border-emerald-500 transition-all group cursor-pointer relative overflow-hidden">
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
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      );
      default: return <Page404 onReset={resetToHome} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
      
      <main className={`flex-1 min-h-screen flex flex-col transition-all duration-500 ${!hideLayout ? 'lg:pl-72' : ''}`}>
        {!hideLayout && (
          <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-10 flex items-center justify-between sticky top-0 z-40">
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
              <div className="hidden lg:flex items-center relative group">
                 <Search className="absolute left-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                 <input type="text" placeholder="Comando rápido (Alt + K)..." className="pl-12 pr-6 py-3 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-full text-sm outline-none w-56 focus:w-80 transition-all font-bold shadow-inner" />
              </div>
              
              <button className="relative p-3.5 text-slate-400 hover:text-emerald-500 transition-colors bg-white rounded-2xl border-2 border-slate-50 shadow-sm hover:border-emerald-100">
                <Bell size={22} />
                <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-pulse shadow-sm"></span>
              </button>

              <div className="flex items-center gap-4 pl-4 md:pl-8 border-l border-slate-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 leading-none tracking-tight">
                    {userRole === UserRole.PROFESSIONAL ? 'Carlos Alberto' : 'Aluno Demo'}
                  </p>
                  <p className="text-[9px] uppercase font-black text-emerald-600 tracking-widest mt-1.5 italic">
                    {userRole} Member
                  </p>
                </div>
                <div className="w-12 h-12 bg-slate-900 text-white rounded-[18px] flex items-center justify-center shadow-xl shadow-slate-900/20 transform hover:rotate-6 transition-all cursor-pointer">
                  <UserIcon size={22} />
                </div>
              </div>
            </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
          {renderContent()}
        </div>
        
        {!hideLayout && (
          <footer className="p-10 text-center bg-white border-t border-slate-100">
            <p className="text-slate-300 text-[11px] font-black uppercase tracking-[0.4em] italic">
              PilaFlex Global Standards &bull; Cloud Optimized &bull; 2024
            </p>
          </footer>
        )}
      </main>
    </div>
  );
};

export default App;
