
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
  FileBadge,
  Building2,
  Stethoscope,
  TrendingUp,
  Headset
} from 'lucide-react';
import { UserRole } from '../types';

interface ProfileProps {
  role: UserRole;
}

const Profile: React.FC<ProfileProps> = ({ role }) => {
  // Simulando sub-roles para demonstração estética
  const isOwner = role === UserRole.ADMIN;
  const isProfessional = role === UserRole.PROFESSIONAL;
  const isStudent = role === UserRole.STUDENT;
  
  // No mundo real, isso viria do back-end
  const subRole = isOwner ? 'Gestor Master' : isProfessional ? 'Fisioterapeuta' : 'Aluno Platinum';

  return (
    <div className="p-4 md:p-10 space-y-10 animate-in fade-in duration-700 max-w-6xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[40px] bg-slate-900 text-white flex items-center justify-center font-black text-5xl shadow-2xl group-hover:rotate-6 transition-all duration-500">
            {isStudent ? 'A' : isOwner ? 'G' : 'P'}
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-all">
            <Camera size={18} />
          </button>
        </div>
        
        <div className="text-center md:text-left space-y-2 flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">
              {isStudent ? 'Aluno Demo' : 'Carlos Alberto'}
            </h1>
            <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg shadow-sm">
              <ShieldCheck size={20} />
            </div>
          </div>
          <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
            <Mail size={16} /> {isStudent ? 'aluno@demo.com' : 'carlos@pilaflex.com'}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
            <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
              {subRole}
            </span>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100">
              Membro desde 2024
            </span>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-8 pr-10">
           {isOwner && (
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faturamento Mês</p>
                <p className="text-2xl font-black text-slate-900 italic tracking-tighter">R$ 28.450</p>
             </div>
           )}
           {isProfessional && (
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aulas Realizadas</p>
                <p className="text-2xl font-black text-slate-900 italic tracking-tighter">124</p>
             </div>
           )}
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Seção Dados Base */}
          <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
                <User size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Informações de Contato</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp / Celular</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold" defaultValue="(11) 98877-6655" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço Residencial</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-emerald-500 transition-all font-bold" defaultValue="Av. Paulista, 1000 - SP" />
                </div>
              </div>
            </div>
          </section>

          {/* CAMPOS ESPECÍFICOS PARA GESTOR / DONO */}
          {isOwner && (
            <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Dados Corporativos</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social / Clínica</label>
                    <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" defaultValue="PilaFlex Studio LTDA" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                    <input className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" defaultValue="00.000.000/0001-00" />
                 </div>
              </div>
            </section>
          )}

          {/* CAMPOS ESPECÍFICOS PARA INSTRUTOR / PROFISSIONAL */}
          {isProfessional && (
            <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                  <Stethoscope size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Formação e Registro</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Conselho (CREF/CREFITO)</label>
                    <div className="relative">
                       <FileBadge className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                       <input className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold" defaultValue="12345-G/SP" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidade Master</label>
                    <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600">
                       <option>Fisioterapeuta - Reabilitação</option>
                       <option>Ed. Física - Mat Pilates</option>
                       <option>Ed. Física - Studio Pro</option>
                    </select>
                 </div>
              </div>
            </section>
          )}

          {/* CAMPOS ESPECÍFICOS PARA ALUNO */}
          {isStudent && (
            <section className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-50">
                <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Bioestatística do Aluno</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { label: 'Peso Atual', value: '74kg' },
                   { label: 'Altura', value: '1.75m' },
                   { label: 'IMC', value: '24.2' },
                   { label: 'Gordura', value: '18%' },
                 ].map(s => (
                   <div key={s.label} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-lg font-black text-slate-900">{s.value}</p>
                   </div>
                 ))}
              </div>
            </section>
          )}

        </div>

        {/* Barra Lateral de Status */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                       <Award size={32} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Acesso Seguro</p>
                       <h4 className="text-xl font-black italic tracking-tighter uppercase">Conta Verificada</h4>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/30 tracking-widest">
                       <span>Segurança Biométrica</span>
                       <span className="text-emerald-500">Ativa</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[100%] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </div>
                 </div>

                 <button className="w-full py-5 bg-white text-slate-950 rounded-[28px] font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                    <Save size={18} /> Salvar Alterações
                 </button>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full -mr-10 -mt-10"></div>
           </div>

           {/* Diferentes Widgets baseados no papel */}
           {isOwner ? (
             <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <TrendingUp size={14} /> Performance Clínica
                </h4>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                   <p className="text-2xl font-black text-emerald-600 tracking-tighter">+12%</p>
                   <p className="text-[9px] font-black text-emerald-900/40 uppercase tracking-widest">Crescimento Mensal</p>
                </div>
             </div>
           ) : isStudent ? (
             <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Dumbbell size={14} /> Histórico de Aulas
                </h4>
                <div className="space-y-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-black text-slate-700 uppercase">Mat Pilates Solo</span>
                        <span className="text-[9px] font-bold text-slate-400">1{i}/12</span>
                     </div>
                   ))}
                </div>
             </div>
           ) : (
             <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Headset size={14} /> Eficiência Atendimento
                </h4>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                   <p className="text-2xl font-black text-blue-600 tracking-tighter">98.4%</p>
                   <p className="text-[9px] font-black text-blue-900/40 uppercase tracking-widest">Taxa de Resposta</p>
                </div>
             </div>
           )}
        </aside>
      </div>
    </div>
  );
};

export default Profile;
