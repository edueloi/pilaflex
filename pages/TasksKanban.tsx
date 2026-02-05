
import React, { useState } from 'react';
import { 
  Plus, 
  MoreHorizontal, 
  Trash2, 
  PlusCircle, 
  Check, 
  Target, 
  AlertCircle,
  X,
  Layout
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'baixa' | 'média' | 'alta';
  category: 'Administrativo' | 'Profissional' | 'Manutenção' | 'Marketing';
  dueDate: string;
  assignee: string;
}

type ColumnType = 'todo' | 'progress' | 'review' | 'done';

const initialTasks: Record<ColumnType, Task[]> = {
  'todo': [
    { id: '1', title: 'Renovação Contrato HostGator', description: 'Verificar vencimento da hospedagem e SSL da clínica.', priority: 'alta', category: 'Administrativo', dueDate: '15 Dez', assignee: 'Carlos' },
    { id: '2', title: 'Manutenção Reformer 04', description: 'Troca de molas e limpeza do trilho superior.', priority: 'média', category: 'Manutenção', dueDate: '18 Dez', assignee: 'Julia' },
  ],
  'progress': [
    { id: '4', title: 'Certificados Curso Solo', description: 'Emitir certificados para a turma concluinte de Novembro.', priority: 'baixa', category: 'Administrativo', dueDate: 'Hoje', assignee: 'Ana' },
  ],
  'review': [
    { id: '6', title: 'Fechamento Financeiro Nov', description: 'Revisar DRE e fluxo de caixa do mês anterior.', priority: 'alta', category: 'Administrativo', dueDate: 'Ontem', assignee: 'Carlos' },
  ],
  'done': [
    { id: '7', title: 'Compra de Meias Pilates', description: 'Pedido de 50 unidades de meias antiderrapantes.', priority: 'baixa', category: 'Manutenção', dueDate: '10 Dez', assignee: 'Ana' },
  ]
};

const columnOrder: ColumnType[] = ['todo', 'progress', 'review', 'done'];

const TasksKanban: React.FC = () => {
  const [columns, setColumns] = useState<Record<ColumnType, Task[]>>(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedFromCol, setDraggedFromCol] = useState<ColumnType | null>(null);
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'média',
    category: 'Administrativo',
    dueDate: 'Hoje'
  });

  const onDragStart = (e: React.DragEvent, taskId: string, colId: ColumnType) => {
    setDraggedTaskId(taskId);
    setDraggedFromCol(colId);
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('fromCol', colId);
    e.dataTransfer.effectAllowed = 'move';
    
    // Pequeno atraso para feedback visual
    const target = e.currentTarget as HTMLElement;
    setTimeout(() => {
      target.style.opacity = '0.4';
      target.style.transform = 'scale(0.95)';
    }, 0);
  };

  const onDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
    target.style.transform = 'scale(1)';
    setDraggedTaskId(null);
    setDraggedFromCol(null);
    setActiveDropZone(null);
  };

  const onDragOver = (e: React.DragEvent, colId: ColumnType) => {
    e.preventDefault();
    if (colId !== draggedFromCol) {
      setActiveDropZone(colId);
    }
  };

  const onDrop = (e: React.DragEvent, targetCol: ColumnType) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceCol = e.dataTransfer.getData('fromCol') as ColumnType;

    if (!taskId || !sourceCol || sourceCol === targetCol) {
      setActiveDropZone(null);
      return;
    }

    const taskToMove = columns[sourceCol].find(t => t.id === taskId);
    if (!taskToMove) return;

    setColumns(prev => {
      const sourceTasks = prev[sourceCol].filter(t => t.id !== taskId);
      const targetTasks = [...prev[targetCol], taskToMove];
      return {
        ...prev,
        [sourceCol]: sourceTasks,
        [targetCol]: targetTasks
      };
    });
    setActiveDropZone(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title || 'Sem título',
      description: newTask.description || '',
      priority: (newTask.priority as any) || 'média',
      category: (newTask.category as any) || 'Administrativo',
      dueDate: newTask.dueDate || 'Breve',
      assignee: 'Carlos'
    };

    setColumns(prev => ({ ...prev, todo: [...prev.todo, task] }));
    setShowAddModal(false);
    setNewTask({ title: '', description: '', priority: 'média', category: 'Administrativo', dueDate: 'Hoje' });
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'alta': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'média': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const totalTasks = (Object.values(columns) as Task[][]).reduce((acc, curr) => acc + curr.length, 0);
  const doneTasks = columns.done.length;
  const progressPercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <Layout className="text-emerald-500" size={18} />
             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Operations Flow</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Projetos <span className="text-emerald-500">Kanban</span></h1>
          <p className="text-slate-500 font-medium text-lg">Organize o fluxo de trabalho do seu studio com agilidade.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs active:scale-95 group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" /> 
          Adicionar Task
        </button>
      </header>

      {/* Kanban Board */}
      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar -mx-8 px-8">
        {columnOrder.map((colId) => {
          const colLabel = { todo: 'A Fazer', progress: 'Execução', review: 'Revisão', done: 'Concluído' }[colId];
          const colColor = { todo: 'bg-slate-300', progress: 'bg-amber-400', review: 'bg-indigo-400', done: 'bg-emerald-500' }[colId];
          const isOver = activeDropZone === colId;

          return (
            <div 
              key={colId} 
              className={`min-w-[340px] w-[340px] flex flex-col gap-6 p-4 rounded-[40px] transition-all duration-300 ${isOver ? 'bg-emerald-500/5 ring-2 ring-emerald-500/20' : 'bg-transparent'}`}
              onDragOver={(e) => onDragOver(e, colId)}
              onDrop={(e) => onDrop(e, colId)}
            >
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full ${colColor} shadow-lg shadow-black/10`}></div>
                   <h3 className="font-black text-slate-900 uppercase tracking-tighter italic text-xl">{colLabel}</h3>
                </div>
                <span className="bg-white border border-slate-200 text-slate-400 text-[10px] font-black px-3 py-1.5 rounded-2xl shadow-sm">{columns[colId].length}</span>
              </div>

              <div className="flex flex-col gap-6 min-h-[600px]">
                {columns[colId].map((task) => (
                  <div 
                    key={task.id} 
                    draggable 
                    onDragStart={(e) => onDragStart(e, task.id, colId)}
                    onDragEnd={onDragEnd}
                    className="bg-white p-7 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-emerald-200 transition-all cursor-grab active:cursor-grabbing group"
                  >
                    <div className="flex justify-between items-start mb-5">
                      <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <button className="text-slate-200 hover:text-slate-400 transition-colors"><MoreHorizontal size={18} /></button>
                    </div>

                    <h4 className="font-black text-slate-900 text-lg mb-2 leading-tight group-hover:text-emerald-600 transition-colors">{task.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium line-clamp-2 mb-6">{task.description}</p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-[12px] bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-lg">
                             {task.assignee[0]}
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Responsável</p>
                             <p className="text-[10px] font-black uppercase text-slate-800 tracking-tight">{task.assignee}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-slate-300 uppercase leading-none mb-1">Vence</p>
                          <p className="text-[10px] font-black uppercase text-rose-500">{task.dueDate}</p>
                       </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-10 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-300 font-black text-[10px] uppercase tracking-widest hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-500 transition-all flex flex-col items-center gap-2 group"
                >
                   <PlusCircle size={24} className="group-hover:scale-110 transition-transform" /> 
                   <span>Novo Item</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Task */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[120] flex items-center justify-center p-4">
           <form onSubmit={handleAddTask} className="bg-white w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Nova Task <span className="text-emerald-500">Operacional</span></h2>
                 <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Título da Tarefa</label>
                    <input 
                      type="text" required autoFocus
                      className="w-full text-2xl font-black text-slate-900 border-none outline-none pb-2 focus:border-b-4 focus:border-emerald-500 transition-all tracking-tighter"
                      value={newTask.title}
                      onChange={e => setNewTask({...newTask, title: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prioridade</label>
                       <select 
                         className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs uppercase outline-none focus:border-emerald-500"
                         value={newTask.priority}
                         onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                       >
                          <option value="baixa">Baixa</option>
                          <option value="média">Média</option>
                          <option value="alta">Alta</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</label>
                       <select 
                         className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs uppercase outline-none focus:border-emerald-500"
                         value={newTask.category}
                         onChange={e => setNewTask({...newTask, category: e.target.value as any})}
                       >
                          <option value="Administrativo">Administrativo</option>
                          <option value="Profissional">Profissional</option>
                          <option value="Manutenção">Manutenção</option>
                          <option value="Marketing">Marketing</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição</label>
                    <textarea 
                      rows={3} 
                      className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-[32px] outline-none font-bold text-slate-700 text-sm transition-all resize-none shadow-inner"
                      value={newTask.description}
                      onChange={e => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Detalhes sobre a execução..."
                    ></textarea>
                 </div>
              </div>
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                 <button type="submit" className="flex-1 py-5 bg-emerald-500 text-white rounded-[24px] font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95">Salvar no Quadro</button>
              </div>
           </form>
        </div>
      )}
    </div>
  );
};

export default TasksKanban;
