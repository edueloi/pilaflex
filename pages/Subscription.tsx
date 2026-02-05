
import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck,
  Calendar,
  History,
  Users
} from 'lucide-react';

const Subscription: React.FC = () => {
  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-500">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Faturamento & Plano</span>
        </div>
        <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Minha <span className="text-emerald-500">Assinatura</span></h1>
        <p className="text-slate-500 font-medium text-lg">Gerencie seu plano corporativo PilaFlex.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Card Plano Atual */}
        <div className="lg:col-span-7 bg-slate-950 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between h-full">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="bg-emerald-500 p-4 rounded-3xl shadow-xl shadow-emerald-500/20">
                <Zap size={32} />
              </div>
              <span className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">Plano Gold Ativo</span>
            </div>
            
            <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-2">PilaFlex <span className="text-emerald-500">GOLD</span></h2>
            <p className="text-white/40 text-lg font-medium">Faturado mensalmente no cartão final •••• 9928</p>
            
            <div className="mt-12 space-y-6">
              {[
                { label: 'Limite de Instrutores', val: 'Até 10', icon: Users },
                { label: 'Armazenamento Aulas', val: 'Ilimitado 4K', icon: Zap },
                { label: 'Suporte Premium', val: '24/7 Ativo', icon: Clock },
              ].map(feat => (
                <div key={feat.label} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <feat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{feat.label}</p>
                    <p className="text-sm font-black uppercase tracking-tight">{feat.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Próxima Cobrança</p>
              <p className="text-2xl font-black text-emerald-400 tracking-tighter italic uppercase">R$ 299,90 <span className="text-[10px] font-medium normal-case text-white/40">em 12/01/2025</span></p>
            </div>
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-[28px] font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2">
              Mudar Plano <ArrowUpRight size={18} />
            </button>
          </div>

          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        </div>

        {/* Histórico Simples */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tighter italic flex items-center gap-3">
              <History className="text-slate-400" size={24} /> Histórico Faturas
            </h3>
            <div className="space-y-4">
              {[
                { date: '12 Dez, 2024', val: '299,90', status: 'Pago' },
                { date: '12 Nov, 2024', val: '299,90', status: 'Pago' },
                { date: '12 Out, 2024', val: '299,90', status: 'Pago' },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl text-slate-400 group-hover:text-emerald-500 transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none mb-1">{inv.date}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fatura Digital</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 tracking-tight">R$ {inv.val}</p>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">PAGO</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 border-2 border-slate-100 rounded-2xl text-[10px] font-black uppercase text-slate-400 tracking-widest hover:border-emerald-200 hover:text-emerald-500 transition-all">Ver Todas as Faturas</button>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[48px] border border-emerald-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Segurança do Cartão</span>
              </div>
              <p className="text-emerald-900/60 text-xs font-medium leading-relaxed italic">
                Seus dados de pagamento são processados de forma criptografada e nunca ficam salvos em nossos servidores.
              </p>
            </div>
            <div className="pt-6">
              <div className="bg-white/60 p-4 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold uppercase tracking-widest">VISA</div>
                  <p className="text-xs font-black text-slate-900 italic tracking-tighter">•••• 9928</p>
                </div>
                <button className="text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Alterar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
