
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Leaf, 
  CheckCircle2,
  Zap,
  Star,
  ShieldCheck,
  Award,
  Circle
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
    setTimeout(() => onLogin(role), 1500);
  };

  // Fotos de perfil reais do Unsplash para evitar links quebrados de geradores aleatórios
  const socialProofAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377f3a?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* Transição Imersiva */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-500">
           <div className="flex flex-col items-center gap-6">
              <div className="relative">
                 <div className="w-20 h-20 border-4 border-emerald-500/20 rounded-full animate-[spin_3s_linear_infinite]" />
                 <div className="absolute inset-0 border-t-4 border-emerald-500 rounded-full animate-spin" />
                 <Leaf className="absolute inset-0 m-auto text-emerald-500" size={28} />
              </div>
              <h2 className="text-white font-black text-lg uppercase italic tracking-widest">Acessando seu Studio...</h2>
           </div>
        </div>
      )}

      {/* LADO ESQUERDO: 45% - Clean Login Form */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 md:p-16 lg:p-24 relative bg-white shrink-0 z-10 shadow-2xl">
        <div className="max-w-md mx-auto w-full space-y-12 animate-in slide-in-from-left duration-700">
          
          {/* Logo e Branding Minimalista */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-slate-950 p-3 rounded-2xl shadow-2xl">
                <Leaf size={28} className="text-emerald-500" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter uppercase italic text-slate-950 leading-none">PilaFlex</h1>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mt-1">Management Suite</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase italic leading-[0.9]">O Futuro do seu <span className="text-emerald-500">Studio.</span></h2>
              <p className="text-slate-400 font-medium text-lg leading-relaxed">
                A plataforma definitiva para controle de alunos, faturamento e cursos online.
              </p>
            </div>
          </div>

          {/* Formulário Refinado */}
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="group relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-emerald-500 transition-colors">E-mail de Acesso</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@pilaflex.com" 
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 shadow-inner"
                  />
                </div>
              </div>

              <div className="group relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block group-focus-within:text-emerald-500 transition-colors">Senha Secreta</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all font-bold text-slate-900 shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">
              <label className="flex items-center gap-2 cursor-pointer hover:text-emerald-600 transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-emerald-500 focus:ring-emerald-500" /> Lembrar-me
              </label>
              <button type="button" className="hover:text-emerald-500 transition-colors">Recuperar Senha</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={(e) => handleSubmit(e, UserRole.PROFESSIONAL)}
                className="group bg-slate-950 text-white py-6 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Painel Gestor <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={(e) => handleSubmit(e, UserRole.STUDENT)}
                className="py-6 bg-white border border-slate-200 text-slate-500 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:border-emerald-500 hover:text-emerald-500 transition-all shadow-sm active:scale-95"
              >
                Área do Aluno
              </button>
            </div>
          </form>

          {/* Social Proof Corrigido e Estilizado */}
          <div className="pt-12 flex items-center justify-between border-t border-slate-50">
             <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                   {socialProofAvatars.map((url, i) => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
                       <img 
                        src={url} 
                        className="w-full h-full object-cover" 
                        alt="User Avatar"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=User+${i}&background=random`;
                        }}
                       />
                     </div>
                   ))}
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-950 uppercase tracking-widest leading-none mb-1">Inspirando +10k alunos</p>
                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Comunidade global ativa</p>
                </div>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
               <ShieldCheck size={24} />
             </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO: 55% - High Impact Hero */}
      <div className="hidden lg:block lg:w-[55%] relative overflow-hidden bg-slate-950">
        <img 
          src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[20s] ease-linear opacity-80" 
          alt="Pilates Session"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-24">
           <div className="max-w-xl space-y-10 animate-in slide-in-from-right duration-1000">
              <div className="flex items-center gap-4">
                 <div className="h-px w-20 bg-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.6em]">Premium Studio Platform</span>
              </div>
              <h2 className="text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                 EQUILÍBRIO <br />
                 EFICIÊNCIA <br />
                 <span className="text-emerald-500">EVOLUÇÃO.</span>
              </h2>
              <p className="text-white/50 text-2xl font-medium leading-relaxed max-w-md">
                 Simplifique sua rotina administrativa e foque no que realmente importa: o movimento dos seus alunos.
              </p>
              <div className="flex gap-12 pt-12 border-t border-white/10">
                 <div>
                    <p className="text-3xl font-black text-white tracking-tighter italic leading-none">99%</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2">Uptime Garantido</p>
                 </div>
                 <div>
                    <p className="text-3xl font-black text-white tracking-tighter italic leading-none">SSL</p>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2">Acesso Seguro</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
