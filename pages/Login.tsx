
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
    setTimeout(() => onLogin(role), 1000);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* Overlay de Transição */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="flex flex-col items-center gap-4">
              <div className="relative">
                 <div className="w-10 h-10 border-4 border-emerald-500/20 rounded-full animate-spin" />
                 <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
              </div>
              <h2 className="text-white font-black text-[9px] uppercase tracking-widest animate-pulse">Acessando...</h2>
           </div>
        </div>
      )}

      {/* LADO ESQUERDO: Formulário Compacto (40%) */}
      <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col h-full bg-white relative z-10 shadow-2xl overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 xl:px-16 space-y-4 md:space-y-6 lg:space-y-8 compact-notebook-p">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-2 rounded-xl shadow-lg">
              <Leaf size={20} className="text-emerald-500" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic text-slate-950 leading-none">PilaFlex</h1>
              <p className="text-[7px] font-black text-emerald-600 uppercase tracking-[0.3em] mt-0.5 leading-none">Management Suite</p>
            </div>
          </div>

          {/* Headline Compacto */}
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-950 tracking-tighter uppercase italic leading-tight compact-notebook-text">
              O FUTURO DO SEU <span className="text-emerald-500">STUDIO.</span>
            </h2>
            <p className="text-slate-400 font-medium text-xs lg:text-sm leading-relaxed max-w-xs">
              Controle de alunos, faturamento e cursos online.
            </p>
          </div>

          {/* Form Ultra Compacto */}
          <form className="space-y-3 lg:space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2 lg:space-y-3">
              <div className="group relative">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-0.5 block group-focus-within:text-emerald-500 transition-colors">E-mail de Acesso</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={14} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@pilaflex.com" 
                    className="w-full pl-11 pr-4 py-2.5 lg:py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-900 text-xs compact-notebook-input shadow-sm"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-0.5 block group-focus-within:text-emerald-500 transition-colors">Senha Secreta</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={14} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-4 py-2.5 lg:py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold text-slate-900 text-xs compact-notebook-input shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-widest text-slate-400 px-2">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-600 transition-colors">
                <input type="checkbox" className="w-3 h-3 rounded border-slate-200 text-emerald-500 focus:ring-emerald-500" /> Lembrar-me
              </label>
              <button type="button" className="hover:text-emerald-500 transition-colors">Esqueci a senha</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 pt-1">
              <button 
                onClick={(e) => handleSubmit(e, UserRole.PROFESSIONAL)}
                className="group bg-slate-950 text-white py-3.5 lg:py-4 rounded-xl font-black uppercase text-[9px] tracking-[0.15em] shadow-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Painel Gestor <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={(e) => handleSubmit(e, UserRole.STUDENT)}
                className="py-3.5 lg:py-4 bg-white border border-slate-200 text-slate-500 rounded-xl font-black uppercase text-[9px] tracking-[0.15em] hover:border-emerald-500 hover:text-emerald-500 transition-all active:scale-95"
              >
                Área do Aluno
              </button>
            </div>
          </form>

          {/* Social Proof Compacto */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-50">
             <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                   {[1,2,3].map((i) => (
                     <div key={i} className="w-7 h-7 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" alt="User" />
                     </div>
                   ))}
                </div>
                <p className="text-[7px] font-black text-slate-900 uppercase tracking-widest leading-none">Inspirando +10k alunos</p>
             </div>
             <ShieldCheck size={18} className="text-emerald-500/30" />
          </div>
        </div>
      </div>

      {/* LADO DIREITO: Hero Imagem Clara & Vibrante (60%) */}
      <div className="hidden lg:block lg:w-[60%] xl:w-[65%] h-full relative overflow-hidden bg-slate-100">
        <img 
          src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-100" 
          alt="Pilates Session"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-12 lg:p-16">
           <div className="max-w-xl space-y-4 animate-in slide-in-from-right duration-700">
              <div className="flex items-center gap-3">
                 <div className="h-px w-10 bg-emerald-500" />
                 <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.5em]">Premium Pilates Suite</span>
              </div>
              <h2 className="text-5xl xl:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                 EQUILÍBRIO <br />
                 EFICIÊNCIA <br />
                 <span className="text-emerald-500">EVOLUÇÃO.</span>
              </h2>
              <div className="flex gap-8 pt-6">
                 <div>
                    <p className="text-xl font-black text-white tracking-tighter italic leading-none">99%</p>
                    <p className="text-[7px] font-black text-emerald-500 uppercase tracking-widest mt-1.5">Uptime Ativo</p>
                 </div>
                 <div>
                    <p className="text-xl font-black text-white tracking-tighter italic leading-none">AES</p>
                    <p className="text-[7px] font-black text-emerald-500 uppercase tracking-widest mt-1.5">Segurança</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
