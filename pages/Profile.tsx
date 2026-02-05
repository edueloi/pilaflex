
import React from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Award, 
  Dumbbell, 
  Save, 
  Camera,
  Target,
  Heart,
  Briefcase,
  FileBadge
} from 'lucide-react';
import { UserRole } from '../types';

interface ProfileProps {
  role: UserRole;
}

const Profile: React.FC<ProfileProps> = ({ role }) => {
  const isProfessional = role === UserRole.PROFESSIONAL || role === UserRole.ADMIN;

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[40px] bg-slate-900 text-white flex items-center justify-center font-black text-5xl shadow-2xl group-hover:rotate-6 transition-all duration-500">
            {isProfessional ? 'C' : 'A'}
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-all">
            <Camera size={18} />
          </button>
        </div>
        
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">
              {isProfessional ? 'Carlos Alberto' : 'Aluno Demo'}
            </h1>
            <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg">
              <ShieldCheck size={18} />
            </div>
          </div>
          <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} /> {isProfessional ? 'carlos@pilaflex.com' : 'aluno@demo.com'}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
              {role} Member
            </span>
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
              ID: #99283
            </span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Dados Gerais */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                <User size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Dados Pessoais</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone / WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold" defaultValue="(11) 98877-6655" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Localidade</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold" defaultValue="São Paulo, SP" />
                </div>
              </div>
            </div>
          </section>

          {/* Dados Específicos: Profissional */}
          {isProfessional && (
            <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Credenciais do Profissional</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Registro (CREF/CREFITO)</label>
                  <div className="relative">
                    <FileBadge className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold" placeholder="Ex: 00000-G/SP" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidade Principal</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-black text-[10px] uppercase tracking-widest text-slate-600">
                    <option>Pilates de Aparelhos</option>
                    <option>Pilates Solo (Mat)</option>
                    <option>Reabilitação Postural</option>
                    <option>Pilates para Gestantes</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Minibiografia / Resumo Profissional</label>
                <textarea rows={3} className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl outline-none text-sm font-medium focus:bg-white focus:border-emerald-500 transition-all resize-none" placeholder="Fale um pouco sobre sua formação e experiência..."></textarea>
              </div>
            </section>
          )}

          {/* Dados Específicos: Aluno */}
          {!isProfessional && (
            <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Ficha Bioestatística</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Peso (kg)', value: '74.5' },
                  { label: 'Altura (cm)', value: '178' },
                  { label: 'Gordura (%)', value: '18.2' },
                  { label: 'Massa Magra', value: '34.0' },
                ].map(stat => (
                  <div key={stat.label} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-slate-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Objetivo de Treino</label>
                <div className="relative">
                  <Target className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" defaultValue="Melhora de flexibilidade e alívio de dor lombar." />
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Lado Direito: Ações e Status */}
        <aside className="space-y-8">
          <div className="bg-slate-950 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/20">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em]">Status Conta</p>
                  <p className="text-xl font-black italic uppercase tracking-tighter">Premium Ativo</p>
                </div>
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Conta verificada desde Dezembro de 2024. Segurança AES-256 habilitada.
              </p>
              <button className="w-full py-5 bg-white text-slate-900 rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3">
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Dumbbell size={14} /> Histórico de Sessões
            </h3>
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">Reformer Solo</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400">12/12</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
