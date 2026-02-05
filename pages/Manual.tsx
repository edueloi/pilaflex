
import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  Users, 
  Calendar, 
  DollarSign, 
  Zap, 
  Dumbbell, 
  ShieldCheck, 
  HelpCircle,
  PlayCircle,
  CheckCircle2,
  Settings,
  ArrowLeft,
  GraduationCap,
  X
} from 'lucide-react';

const manualTopics = [
  {
    id: 'alunos',
    title: 'Gestão de Alunos',
    description: 'Aprenda a matricular, gerenciar prontuários e controlar a saúde dos seus alunos.',
    icon: Users,
    color: 'emerald',
    steps: [
      'Acesse o menu "Alunos" na barra lateral.',
      'Clique em "Matricular Aluno" para abrir o prontuário digital.',
      'Preencha as abas de Dados Básicos, Endereço e Saúde (IMC).',
      'Salve para gerar o acesso automático do aluno ao App.'
    ]
  },
  {
    id: 'agenda',
    title: 'Agenda & Horários',
    description: 'Como configurar a grade de aulas e gerenciar instrutores.',
    icon: Calendar,
    color: 'blue',
    steps: [
      'No menu "Agenda Global", selecione o modo de visualização (Dia/Mês).',
      'Clique em um horário vazio para criar um novo agendamento.',
      'Selecione o aluno e o instrutor responsável.',
      'Confirme para que o aluno receba a notificação no App.'
    ]
  },
  {
    id: 'financeiro',
    title: 'Financeiro ERP',
    description: 'Domine o fluxo de caixa, pagamentos de alunos e fornecedores.',
    icon: DollarSign,
    color: 'amber',
    steps: [
      'Aba "Resumo": Visão geral de faturamento e lucro previsto.',
      'Lançamentos: Use o botão "+" para registrar entradas e saídas.',
      'Ponto de Equilíbrio: Acompanhe o progresso automático para cobrir custos.',
      'Relatórios: Exporte o histórico detalhado para contabilidade.'
    ]
  },
  {
    id: 'ia',
    title: 'Inteligência Artificial',
    description: 'Como usar o Pila-Bot para gerar treinos e insights de negócio.',
    icon: Zap,
    color: 'purple',
    steps: [
      'No Dashboard, veja os insights gerados pela IA na barra inferior.',
      'Em "Centro de Treino", use o gerador de rotinas para criar planos bio-segmentados.',
      'O sistema identifica automaticamente "Alunos em Risco" baseado em padrões de falta.'
    ]
  },
  {
    id: 'academia',
    title: 'Cursos & Academia',
    description: 'Crie sua própria "Netflix" de Pilates para seus alunos.',
    icon: GraduationCap,
    color: 'rose',
    steps: [
      'Acesse "Editor de Cursos".',
      'Adicione Módulos e Aulas (Vídeos, PDFs ou Quizzes).',
      'Configure a emissão automática de certificados.',
      'Os cursos ficam disponíveis para os alunos na aba "Minha Jornada".'
    ]
  }
];

const Manual: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<typeof manualTopics[0] | null>(null);

  const filteredTopics = manualTopics.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-40">
      
      {/* HEADER MANUAL */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <BookOpen size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Guia de Operação Master</span>
          </div>
          <h1 className="text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Manual do <span className="text-emerald-500">Sistema</span></h1>
          <p className="text-slate-500 font-medium text-lg">Tudo o que você precisa para dominar o PilaFlex v2.0.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
           <input 
             type="text" 
             placeholder="O que você deseja aprender?"
             className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] outline-none font-bold text-sm shadow-sm transition-all focus:shadow-xl focus:border-emerald-200"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </header>

      {/* GRID DE TÓPICOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTopics.map((topic) => (
          <div 
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 cursor-pointer group flex flex-col justify-between min-h-[300px] relative overflow-hidden"
          >
             <div className="relative z-10">
                <div className={`w-16 h-16 rounded-[24px] bg-slate-900 text-white flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-xl`}>
                   <topic.icon size={32} className={`text-${topic.color}-400`} />
                </div>
                <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight mb-3">{topic.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{topic.description}</p>
             </div>

             <div className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-widest group-hover:gap-4 transition-all">
                Ver Guia Completo <ChevronRight size={14} />
             </div>

             <div className={`absolute top-0 right-0 w-32 h-32 bg-${topic.color}-500/5 blur-[40px] rounded-full -mr-10 -mt-10`} />
          </div>
        ))}
      </div>

      {/* MODAL DE CONTEÚDO DO TÓPICO */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-2xl rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col max-h-[85vh]">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-slate-900 text-white rounded-[24px] flex items-center justify-center shadow-lg">
                       <selectedTopic.icon size={28} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">{selectedTopic.title}</h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Tutorial Passo a Passo</p>
                    </div>
                 </div>
                 {/* Added missing X icon to resolve the reported error */}
                 <button onClick={() => setSelectedTopic(null)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-10">
                 <div className="space-y-6">
                    {selectedTopic.steps.map((step, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                            {i + 1}
                         </div>
                         <p className="text-slate-600 font-medium leading-relaxed pt-2">
                           {step}
                         </p>
                      </div>
                    ))}
                 </div>

                 <div className="p-8 bg-slate-950 rounded-[40px] text-white relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <PlayCircle className="text-emerald-500" size={32} />
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Deseja ver em vídeo?</p>
                             <p className="text-sm font-bold uppercase italic tracking-tight">Assitir Masterclass {selectedTopic.title}</p>
                          </div>
                       </div>
                       <ChevronRight className="text-white/20" size={24} />
                    </div>
                    <div className="absolute inset-0 bg-emerald-500/5 blur-2xl rounded-full" />
                 </div>
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100">
                 <button 
                  onClick={() => setSelectedTopic(null)}
                  className="w-full py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all"
                 >
                    Entendido, voltar ao manual
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* FOOTER INFO */}
      <footer className="bg-emerald-500 p-10 md:p-14 rounded-[60px] text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Ainda com <span className="text-slate-950">Dúvidas?</span></h3>
            <p className="text-white/80 font-medium max-w-md leading-relaxed">Nosso time de suporte especializado está disponível 24/7 para ajudar você a escalar seu studio.</p>
         </div>
         <button className="relative z-10 px-12 py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all active:scale-95 flex items-center gap-3">
            <HelpCircle size={18} /> Chamar Suporte PilaFlex
         </button>
         <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-32 -mb-32" />
      </footer>
    </div>
  );
};

export default Manual;
