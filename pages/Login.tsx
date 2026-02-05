
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Award, 
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = (e: React.FormEvent, role: UserRole) => {
    e.preventDefault();
    setIsTransitioning(true);
    // Simula o tempo de loading para o efeito visual premium
    setTimeout(() => onLogin(role), 1800);
  };

  return (
    <div className="relative h-screen w-full flex overflow-hidden bg-slate-50">
      
      {/* LOADING OVERLAY PREMIUM */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] bg-emerald-950 flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full animate-ping absolute" />
            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] relative z-10 animate-bounce">
              <Award className="text-white" size={40} />
            </div>
            <div className="mt-10 space-y-2 text-center">
               <h2 className="text-white font-black text-xs uppercase tracking-[0.5em] animate-pulse">Sincronizando</h2>
               <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '40%' }} />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* LADO ESQUERDO: Login Form (40%) */}
      <div className="w-full lg:w-[40%] xl:w-[35%] bg-white h-full relative z-10 flex flex-col shadow-[20px_0_60px_rgba(0,0,0,0.05)]">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 xl:px-20 py-10 login-box">
          
          {/* Brand */}
          <div className="flex items-center gap-3 mb-10 lg:mb-16">
            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Award className="text-emerald-500" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-slate-950 leading-none">PilaFlex</h1>
              <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.4em] mt-0.5">Professional Studio Management</span>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-8 lg:mb-12 space-y-2">
            <h2 className="login-headline text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.9]">
              ELEVE O SEU <br />
              <span className="text-emerald-500">STUDIO</span> AO TOPO.
            </h2>
            <p className="text-slate-400 font-medium text-xs lg:text-sm">
              Gestão inteligente para instrutores e alunos.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4 lg:space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3 lg:space-y-4">
               <div className="group relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-emerald-500 transition-colors">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com" 
                      className="w-full pl-12 pr-4 py-3.5 lg:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-800 text-xs shadow-sm"
                    />
                  </div>
               </div>

               <div className="group relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block group-focus-within:text-emerald-500 transition-colors">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-4 py-3.5 lg:py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-800 text-xs shadow-sm"
                    />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-emerald-500 focus:ring-emerald-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600">Lembrar acesso</span>
              </label>
              <button type="button" className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500">Esqueceu a senha?</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button 
                onClick={(e) => handleSubmit(e, UserRole.PROFESSIONAL)}
                className="group relative bg-slate-950 text-white py-4 lg:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest overflow-hidden hover:bg-emerald-600 transition-all active:scale-95 shadow-xl"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  Painel Gestor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button 
                onClick={(e) => handleSubmit(e, UserRole.STUDENT)}
                className="py-4 lg:py-5 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all active:scale-95"
              >
                Área do Aluno
              </button>
            </div>
          </form>

          {/* Bottom Info */}
          <div className="mt-12 lg:mt-20 pt-8 border-t border-slate-50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="User" />
                   ))}
                </div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">+12k Gestores Ativos</p>
             </div>
             <div className="flex items-center gap-2 text-emerald-500/30">
                <ShieldCheck size={20} />
                <Zap size={20} />
             </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Hero Visual Premium (60%) */}
      <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-full relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1518611012118-29a8d63a80ec?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
          alt="Modern Pilates Studio"
        />
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-20">
           <div className="max-w-xl space-y-6 animate-in slide-in-from-right duration-1000">
              <div className="flex items-center gap-3">
                 <div className="h-[2px] w-12 bg-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">The Next Gen Platform</span>
              </div>
              <h2 className="text-6xl xl:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                CORPO <br />
                MENTE <br />
                <span className="text-emerald-500">NEGÓCIO.</span>
              </h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm">
                Transforme a gestão da sua clínica em uma experiência fluida e totalmente automatizada.
              </p>
              
              <div className="flex gap-12 pt-10">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-emerald-500" />
                       <p className="text-xl font-black text-white italic tracking-tighter">99.9%</p>
                    </div>
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Uptime Garantido</p>
                 </div>
                 <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-emerald-500" />
                       <p className="text-xl font-black text-white italic tracking-tighter">AES-256</p>
                    </div>
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Dados Criptografados</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Floating Accent */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default Login;
