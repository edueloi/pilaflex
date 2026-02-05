
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Leaf, 
  ShieldCheck
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
    setTimeout(() => onLogin(role), 1200);
  };

  const socialProofAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377f3a?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* Overlay de Transição */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="flex flex-col items-center gap-6">
              <div className="relative">
                 <div className="w-12 h-12 border-4 border-emerald-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
                 <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
                 <Leaf className="absolute inset-0 m-auto text-emerald-500" size={20} />
              </div>
              <h2 className="text-white font-black text-[10px] uppercase italic tracking-widest animate-pulse">Sincronizando...</h2>
           </div>
        </div>
      )}

      {/* LADO ESQUERDO: Login Form (Compacto) */}
      <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col h-full bg-white relative z-10 shadow-2xl overflow-hidden">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 xl:px-16 login-container space-y-6 md:space-y-8">
          
          {/* Logo Compacto */}
          <div className="flex items-center gap-3 logo-box">
            <div className="bg-slate-950 p-2 rounded-xl shadow-lg">
              <Leaf size={20} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-950 leading-none">PilaFlex</h1>
              <p className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-0.5">Management Suite</p>
            </div>
          </div>

          {/* Headline Reduzido */}
          <div className="space-y-2">
            <h2 className="headline-main text-3xl md:text-4xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.95]">
              O FUTURO DO SEU <span className="text-emerald-500">STUDIO.</span>
            </h2>
            <p className="login-p text-slate-400 font-medium text-sm leading-relaxed max-w-sm">
              Plataforma para controle de alunos e faturamento.
            </p>
          </div>

          {/* Form Compacto */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <div className="group relative input-group">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1 block group-focus-within:text-emerald-500">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500" size={16} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@pilaflex.com" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-[16px] outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="group relative input-group">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-1 block group-focus-within:text-emerald-500">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500" size={16} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-[16px] outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-900 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 px-2">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-600 transition-colors">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-200 text-emerald-500" /> Lembrar-me
              </label>
              <button type="button" className="hover:text-emerald-500">Recuperar Senha</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={(e) => handleSubmit(e, UserRole.PROFESSIONAL)}
                className="group bg-slate-950 text-white py-4 rounded-[16px] font-black uppercase text-[9px] tracking-[0.2em] shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Painel Gestor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={(e) => handleSubmit(e, UserRole.STUDENT)}
                className="py-4 bg-white border border-slate-200 text-slate-500 rounded-[16px] font-black uppercase text-[9px] tracking-[0.2em] hover:border-emerald-500 hover:text-emerald-500 transition-all active:scale-95"
              >
                Área do Aluno
              </button>
            </div>
          </form>

          {/* Social Proof (Ocultável) */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-50 social-proof">
             <div className="flex items-center gap-2">
                <div className="flex -space-x-2.5">
                   {socialProofAvatars.map((url, i) => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow shadow-black/5 overflow-hidden bg-slate-100">
                       <img src={url} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <div>
                   <p className="text-[8px] font-black text-slate-950 uppercase tracking-widest leading-none mb-0.5">+10k Alunos</p>
                   <p className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">Ativos Globalmente</p>
                </div>
             </div>
             <ShieldCheck className="text-emerald-500/20" size={24} />
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Hero (Compacto) */}
      <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-full relative overflow-hidden bg-slate-950">
        <img 
          src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
          alt="Pilates Session"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent flex flex-col justify-end p-12 xl:p-16">
           <div className="max-w-xl space-y-4">
              <div className="flex items-center gap-3">
                 <div className="h-px w-10 bg-emerald-500" />
                 <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.4em]">Premium Studio Platform</span>
              </div>
              <h2 className="hero-text text-5xl xl:text-6xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                 EQUILÍBRIO <br />
                 EFICIÊNCIA <br />
                 <span className="text-emerald-500">EVOLUÇÃO.</span>
              </h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm">
                 Simplifique sua rotina administrativa e foque no movimento.
              </p>
              <div className="flex gap-8 pt-6 border-t border-white/10">
                 <div>
                    <p className="text-xl font-black text-white tracking-tighter italic leading-none">99%</p>
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-1.5">Uptime</p>
                 </div>
                 <div>
                    <p className="text-xl font-black text-white tracking-tighter italic leading-none">SSL</p>
                    <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mt-1.5">Seguro</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
