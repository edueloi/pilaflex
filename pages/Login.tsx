
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
    setTimeout(() => onLogin(role), 1800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-white overflow-x-hidden">
      
      {/* LOADING OVERLAY PREMIUM */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[300] bg-emerald-950 flex flex-col items-center justify-center animate-in fade-in duration-500">
          <div className="relative flex flex-col items-center p-6 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-500/20 rounded-full animate-ping absolute" />
            <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl relative z-10 animate-bounce">
              <Award className="text-white" size={32} />
            </div>
            <div className="mt-10 space-y-3">
               <h2 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.5em] animate-pulse">Sincronizando</h2>
               <div className="w-40 md:w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-emerald-500 animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '40%' }} />
               </div>
            </div>
          </div>
        </div>
      )}

      {/* LADO ESQUERDO: Login Form Container */}
      <div className="w-full lg:w-[480px] xl:w-[550px] shrink-0 min-h-screen flex flex-col relative z-10 bg-white shadow-2xl">
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-12 md:py-20">
          
          {/* Brand */}
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-950 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Award className="text-emerald-500" size={20} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-slate-950 leading-none">PilaFlex</h1>
              <span className="text-[7px] md:text-[8px] font-black text-emerald-600 uppercase tracking-[0.4em] mt-0.5 block">Studio Management</span>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-10 md:mb-12 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.9]">
              ELEVE O SEU <br />
              <span className="text-emerald-500">STUDIO</span> AO TOPO.
            </h2>
            <p className="text-slate-400 font-medium text-xs md:text-sm max-w-xs">
              A plataforma definitiva para gestão de clínicas e fidelização de alunos.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
               <div className="group relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-500 transition-colors">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-800 text-sm shadow-sm"
                    />
                  </div>
               </div>

               <div className="group relative">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-500 transition-colors">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-800 text-sm shadow-sm"
                    />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-emerald-500 focus:ring-emerald-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600">Lembrar</span>
              </label>
              <button type="button" className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500">Esqueceu a senha?</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button 
                onClick={(e) => handleSubmit(e, UserRole.PROFESSIONAL)}
                className="group relative bg-slate-950 text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest overflow-hidden hover:bg-emerald-600 transition-all active:scale-95 shadow-xl"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  Painel Gestor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button 
                onClick={(e) => handleSubmit(e, UserRole.STUDENT)}
                className="py-4 md:py-5 bg-white border-2 border-slate-100 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all active:scale-95"
              >
                Área do Aluno
              </button>
            </div>
          </form>

          {/* Footer do Form */}
          <div className="mt-12 md:mt-20 pt-8 border-t border-slate-50 flex items-center justify-between">
             <div className="flex items-center gap-4 text-emerald-500/20">
                <ShieldCheck size={20} />
                <Zap size={20} />
             </div>
             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">© 2024 PilaFlex Intelligence</p>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Hero Visual (Oculto em Mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-emerald-950 items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay scale-110" 
          alt="Modern Pilates Studio"
        />
        
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/90 via-slate-900/40 to-transparent p-12 xl:p-24 flex flex-col justify-end">
           <div className="max-w-xl space-y-6 md:space-y-8 animate-in slide-in-from-right duration-1000">
              <div className="flex items-center gap-3">
                 <div className="h-[2px] w-12 bg-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">Future of Pilates</span>
              </div>
              <h2 className="text-6xl xl:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                CORPO <br />
                MENTE <br />
                <span className="text-emerald-500">NEGÓCIO.</span>
              </h2>
              <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-sm">
                A tecnologia que o seu studio precisa para escalar com qualidade e controle absoluto.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-12 pt-10">
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
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Criptografia Bancária</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="absolute top-20 right-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
};

export default Login;
