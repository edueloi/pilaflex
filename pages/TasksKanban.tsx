
import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Trash2, 
  PlusCircle, 
  Check, 
  Target, 
  AlertCircle,
  X,
  Layout,
  ArrowLeft,
  Search,
  Settings2,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  CircleDot,
  CheckCircle2,
  Clock,
  Zap,
  Save,
  Palette
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'baixa' | 'média' | 'alta';
  category: string;
  dueDate: string;
  assignee: string;
}

type ColumnType = 'todo' | 'progress' | 'review' | 'done';

interface Board {
  id: string;
  name: string;
  icon: React.ReactNode;
  lastUpdate: string;
  tasks: Record<ColumnType, Task[]>;
  color: string;
}

const initialBoards: Board[] = [
  {
    id: 'b1',
    name: 'Operação Studio Matriz',
    color: 'emerald',
    lastUpdate: 'há 2 horas',
    icon: <Zap size={20} />,
    tasks: {
      'todo': [
        { id: '1', title: 'Renovação HostGator', description: 'Verificar vencimento da hospedagem e SSL.', priority: 'alta', category: 'TI', dueDate: '15 Dez', assignee: 'Carlos' },
        { id: '2', title: 'Revisão Reformers', description: 'Lubrificação técnica dos trilhos.', priority: 'média', category: 'Manutenção', dueDate: '18 Dez', assignee: 'Julia' },
      ],
      'progress': [
        { id: '3', title: 'Certificados Alunos', description: 'Emitir PDFs da turma de Mat Pilates.', priority: 'baixa', category: 'ADM', dueDate: 'Hoje', assignee: 'Ana' },
      ],
      'review': [],
      'done': [
        { id: '4', title: 'Compra de Meias', description: 'Pedido de 50 unidades antiderrapantes.', priority: 'baixa', category: 'Compras', dueDate: '10 Dez', assignee: 'Carlos' },
      ]
    }
  },
  {
    id: 'b2',
    name: 'Marketing & Vendas',
    color: 'blue',
    lastUpdate: 'há 1 dia',
    icon: <Target size={20} />,
    tasks: {
      'todo': [
        { id: 'm1', title: 'Post Instagram Verão', description: 'Criar artes para a campanha "Pilates no Verão".', priority: 'alta', category: 'Social', dueDate: '20 Dez', assignee: 'Marketing' },
      ],
      'progress': [],
      'review': [],
      'done': []
    }
  }
];

const TasksKanban: React.FC = () => {
  const [view, setView] = useState<'gallery' | 'board'>('gallery');
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedFromCol, setDraggedFromCol] = useState<ColumnType | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  
  // States para novo quadro
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardColor, setNewBoardColor] = useState('emerald');

  const activeBoard = useMemo(() => 
    boards.find(b => b.id === selectedBoardId), 
    [boards, selectedBoardId]
  );

  const handleOpenBoard = (id: string) => {
    setSelectedBoardId(id);
    setView('board');
  };

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    const newBoard: Board = {
      id: `b-${Date.now()}`,
      name: newBoardName,
      color: newBoardColor,
      lastUpdate: 'Agora',
      icon: <Layers size={20} />,
      tasks: {
        todo: [],
        progress: [],
        review: [],
        done: []
      }
    };

    setBoards([newBoard, ...boards]);
    setNewBoardName('');
    setShowCreateBoard(false);
  };

  const onDragStart = (e: React.DragEvent, taskId: string, colId: ColumnType) => {
    setDraggedTaskId(taskId);
    setDraggedFromCol(colId);
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromCol', colId);
  };

  const onDrop = (e: React.DragEvent, targetCol: ColumnType) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceCol = e.dataTransfer.getData('fromCol') as ColumnType;

    if (!activeBoard || !taskId || !sourceCol || sourceCol === targetCol) {
      setActiveDropZone(null);
      return;
    }

    const taskToMove = activeBoard.tasks[sourceCol].find(t => t.id === taskId);
    if (!taskToMove) return;

    const newBoards = boards.map(b => {
      if (b.id === activeBoard.id) {
        return {
          ...b,
          tasks: {
            ...b.tasks,
            [sourceCol]: b.tasks[sourceCol].filter(t => t.id !== taskId),
            [targetCol]: [...b.tasks[targetCol], taskToMove]
          }
        };
      }
      return b;
    });

    setBoards(newBoards);
    setActiveDropZone(null);
  };

  const getPriorityStyles = (p: string) => {
    switch(p) {
      case 'alta': return 'border-rose-500 text-rose-600 bg-rose-50';
      case 'média': return 'border-amber-500 text-amber-600 bg-amber-50';
      default: return 'border-emerald-500 text-emerald-600 bg-emerald-50';
    }
  };

  // UI DE GALERIA DE QUADROS
  if (view === 'gallery') {
    return (
      <div className="p-4 md:p-8 lg:p-12 space-y-12 animate-in fade-in duration-700 max-w-[1400px] mx-auto pb-40">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500">
               <Layers size={18} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Ecosystem Kanban v4.0</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Central de <span className="text-emerald-500">Quadros</span></h1>
            <p className="text-slate-500 font-medium text-lg">Selecione uma área para gerenciar o fluxo de trabalho.</p>
          </div>
          <button 
            onClick={() => setShowCreateBoard(true)}
            className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
          >
             <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Criar Novo Quadro
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {boards.map(board => {
             const total = Object.values(board.tasks).flat().length;
             const done = board.tasks.done.length;
             const progress = total > 0 ? (done / total) * 100 : 0;

             return (
               <div 
                key={board.id} 
                onClick={() => handleOpenBoard(board.id)}
                className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 group cursor-pointer flex flex-col justify-between min-h-[320px] relative overflow-hidden"
               >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                       <div className={`w-16 h-16 rounded-[24px] bg-slate-950 text-white flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform`}>
                          {board.icon}
                       </div>
                       <button onClick={(e) => {e.stopPropagation();}} className="p-3 bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-colors">
                          <MoreHorizontal size={20} />
                       </button>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight mb-2 group-hover:text-emerald-600 transition-colors">{board.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Atualizado {board.lastUpdate}</p>
                  </div>

                  <div className="relative z-10 space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Progresso do Quadro</span>
                        <span className="text-slate-900">{Math.round(progress)}%</span>
                     </div>
                     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            board.color === 'emerald' ? 'bg-emerald-500' : 
                            board.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                          }`} 
                          style={{ width: `${progress}%` }} 
                        />
                     </div>
                     <div className="flex items-center justify-between pt-4">
                        <div className="flex -space-x-3">
                           {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center font-black text-[8px] text-slate-400">
                                {String.fromCharCode(64 + i)}
                             </div>
                           ))}
                        </div>
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">{total} Tarefas</span>
                     </div>
                  </div>

                  <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-[40px] rounded-full -mr-10 -mt-10 ${
                    board.color === 'emerald' ? 'bg-emerald-500' : 
                    board.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
               </div>
             );
           })}
           
           <button 
             onClick={() => setShowCreateBoard(true)}
             className="border-4 border-dashed border-slate-100 rounded-[48px] flex flex-col items-center justify-center gap-4 p-8 text-slate-300 hover:border-emerald-200 hover:text-emerald-500 transition-all group min-h-[320px]"
           >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                <Plus size={40} className="group-hover:rotate-90 transition-transform" />
              </div>
              <span className="font-black text-xs uppercase tracking-widest">Criar Novo Quadro</span>
           </button>
        </div>

        {/* MODAL CRIAR QUADRO */}
        {showCreateBoard && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
             <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20 overflow-hidden">
                <form onSubmit={handleCreateBoard}>
                  <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Quadro</span></h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Defina o nome e a cor do ecossistema</p>
                    </div>
                    <button type="button" onClick={() => setShowCreateBoard(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="p-8 md:p-10 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Quadro</label>
                        <input 
                          autoFocus
                          required
                          value={newBoardName}
                          onChange={(e) => setNewBoardName(e.target.value)}
                          className="w-full p-6 bg-slate-50 border border-slate-100 rounded-3xl font-black text-lg outline-none focus:bg-white focus:border-emerald-500 transition-all italic tracking-tighter" 
                          placeholder="Ex: Expansão Studio Sul" 
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Palette size={14} /> Cor de Destaque
                        </label>
                        <div className="flex gap-4">
                          {[
                            { id: 'emerald', color: 'bg-emerald-500' },
                            { id: 'blue', color: 'bg-blue-500' },
                            { id: 'purple', color: 'bg-purple-500' },
                            { id: 'rose', color: 'bg-rose-500' },
                            { id: 'amber', color: 'bg-amber-500' },
                          ].map(c => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setNewBoardColor(c.id)}
                              className={`w-10 h-10 rounded-2xl ${c.color} transition-all ${newBoardColor === c.id ? 'ring-4 ring-slate-900 ring-offset-4 scale-110' : 'opacity-40 hover:opacity-100'}`}
                            />
                          ))}
                        </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100">
                    <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Criar Ecossistema</button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </div>
    );
  }

  // UI DO QUADRO ATIVO (KANBAN)
  return (activeBoard && (
    <div className="h-screen flex flex-col bg-slate-50 animate-in fade-in slide-in-from-right-10 duration-500">
      {/* HEADER DO QUADRO */}
      <header className="px-8 md:px-12 h-24 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 sticky top-0 z-50">
         <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('gallery')}
              className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all shadow-sm group"
            >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="h-10 w-px bg-slate-100" />
            <div>
               <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quadro Ativo</span>
               </div>
               <h2 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">{activeBoard.name}</h2>
            </div>
         </div>

         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 p-1.5 rounded-2xl">
               <button className="px-4 py-2 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-100 flex items-center gap-2">
                  <Filter size={14} /> Filtros
               </button>
               <button className="px-4 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-all">Prioridade</button>
            </div>
            <button 
              onClick={() => setShowAddTask(true)}
              className="bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2"
            >
               <Plus size={16} /> Add Task
            </button>
         </div>
      </header>

      {/* ÁREA DE COLUNAS */}
      <div className="flex-1 overflow-x-auto custom-scrollbar p-8 md:p-12">
        <div className="flex gap-8 h-full min-h-[600px]">
          {(Object.keys(activeBoard.tasks) as ColumnType[]).map(colId => {
            const label = { todo: 'A Fazer', progress: 'Execução', review: 'Revisão', done: 'Concluído' }[colId];
            const icon = { 
              todo: <CircleDot size={16} className="text-slate-400" />, 
              progress: <Zap size={16} className="text-amber-500" />, 
              review: <Clock size={16} className="text-indigo-500" />, 
              done: <CheckCircle2 size={16} className="text-emerald-500" /> 
            }[colId];

            return (
              <div 
                key={colId}
                onDragOver={(e) => { e.preventDefault(); setActiveDropZone(colId); }}
                onDragLeave={() => setActiveDropZone(null)}
                onDrop={(e) => onDrop(e, colId)}
                className={`flex flex-col gap-6 min-w-[340px] w-[340px] rounded-[40px] p-4 transition-all duration-300 ${activeDropZone === colId ? 'bg-emerald-500/5 ring-4 ring-emerald-500/10' : ''}`}
              >
                {/* Cabeçalho da Coluna */}
                <div className="flex items-center justify-between px-4">
                   <div className="flex items-center gap-3">
                      {icon}
                      <h3 className="font-black text-slate-900 uppercase italic tracking-tighter text-xl">{label}</h3>
                   </div>
                   <div className="bg-white border border-slate-100 text-[10px] font-black text-slate-400 px-3 py-1 rounded-xl shadow-sm">
                      {activeBoard.tasks[colId].length}
                   </div>
                </div>

                {/* Lista de Tasks */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
                   {activeBoard.tasks[colId].map(task => (
                     <div 
                        key={task.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, task.id, colId)}
                        className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 cursor-grab active:cursor-grabbing group relative overflow-hidden"
                     >
                        {/* Indicador de Prioridade */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${task.priority === 'alta' ? 'bg-rose-500' : task.priority === 'média' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        
                        <div className="flex justify-between items-start mb-4">
                           <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${getPriorityStyles(task.priority)}`}>
                              {task.priority}
                           </span>
                           <button className="text-slate-200 hover:text-slate-400"><MoreHorizontal size={18} /></button>
                        </div>

                        <h4 className="text-lg font-black text-slate-950 uppercase italic tracking-tighter leading-tight mb-2 group-hover:text-emerald-600 transition-colors">{task.title}</h4>
                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6 line-clamp-2">{task.description}</p>

                        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[9px] shadow-lg">
                                 {task.assignee[0]}
                              </div>
                              <span className="text-[9px] font-black text-slate-700 uppercase">{task.assignee}</span>
                           </div>
                           <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                              <Calendar size={12} /> {task.dueDate}
                           </div>
                        </div>
                     </div>
                   ))}
                   <button 
                     onClick={() => setShowAddTask(true)}
                     className="w-full py-12 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-emerald-200 hover:text-emerald-500 hover:bg-emerald-50/50 transition-all group"
                   >
                      <PlusCircle size={28} className="group-hover:rotate-90 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Nova Tarefa</span>
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL SIMPLIFICADO PARA NOVA TASK */}
      {showAddTask && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20 overflow-hidden">
              <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div>
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Item</span></h2>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Adicionar à coluna: A Fazer</p>
                 </div>
                 <button onClick={() => setShowAddTask(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>
              <div className="p-8 md:p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título da Tarefa</label>
                    <input className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[24px] font-black text-lg outline-none focus:bg-white focus:border-emerald-500 transition-all italic tracking-tighter" placeholder="Ex: Manutenção Reformer" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prioridade</label>
                       <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600">
                          <option>Alta</option>
                          <option>Média</option>
                          <option>Baixa</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
                       <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600">
                          <option>Operacional</option>
                          <option>Manutenção</option>
                          <option>Financeiro</option>
                          <option>Marketing</option>
                       </select>
                    </div>
                 </div>
              </div>
              <div className="p-8 md:p-10 bg-slate-50 border-t border-slate-100">
                 <button onClick={() => setShowAddTask(false)} className="w-full py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">Salvar na Lista</button>
              </div>
           </div>
        </div>
      )}
    </div>
  ) || null);
};

export default TasksKanban;
