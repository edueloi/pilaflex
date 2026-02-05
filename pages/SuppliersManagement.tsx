
import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Package, 
  MoreVertical, 
  X, 
  Save, 
  Building2, 
  User, 
  Camera, 
  CheckCircle2, 
  Globe,
  PlusCircle,
  FileText
} from 'lucide-react';

interface Supplier {
  id: number;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  address: string;
  cnpj: string;
  status: 'Ativo' | 'Pendente' | 'Bloqueado';
  avatar?: string;
}

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    contactName: 'Ricardo Molas',
    companyName: 'Pilates Equips Indústria',
    email: 'comercial@pilatesequips.com',
    phone: '5511999887766',
    category: 'Equipamentos',
    description: 'Fornece molas, estofados e peças de reposição para Reformer e Cadillac.',
    address: 'Rua Industrial, 450 - São Paulo/SP',
    cnpj: '12.345.678/0001-90',
    status: 'Ativo',
  },
  {
    id: 2,
    contactName: 'Dra. Márcia',
    companyName: 'LimpStudio Ltda',
    email: 'atendimento@limpstudio.com.br',
    phone: '5511988776655',
    category: 'Limpeza',
    description: 'Produtos específicos para higienização de courvin e aparelhos sem álcool.',
    address: 'Av. das Nações, 1200 - Barueri/SP',
    cnpj: '98.765.432/0001-11',
    status: 'Ativo',
  },
  {
    id: 3,
    contactName: 'Sérgio Meias',
    companyName: 'Grip Solutions',
    email: 'sergio@gripsolutions.com',
    phone: '5511977665544',
    category: 'Insumos',
    description: 'Fornecedor de meias antiderrapantes personalizadas com o logo PilaFlex.',
    address: 'Rua das Meias, 12 - Blumenau/SC',
    cnpj: '11.222.333/0001-44',
    status: 'Pendente',
  }
];

const SuppliersManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'logistics' | 'catalog'>('basic');
  const [formData, setFormData] = useState<Partial<Supplier>>({
    status: 'Ativo',
    category: 'Insumos'
  });

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => 
      s.contactName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier: Supplier = {
      ...formData as any,
      id: Date.now(),
    };
    setSuppliers([newSupplier, ...suppliers]);
    setIsAdding(false);
    setFormData({ status: 'Ativo', category: 'Insumos' });
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">
      
      {/* HEADER DINÂMICO */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-500">
             <Truck size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Supply Chain & ERP</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter italic uppercase leading-none">Meus <span className="text-emerald-500">Fornecedores</span></h1>
          <p className="text-slate-500 font-medium text-lg">Centralize contatos, catálogos e logística de suprimentos.</p>
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-[28px] hover:bg-emerald-600 shadow-2xl transition-all font-black text-xs uppercase tracking-widest active:scale-95 group"
        >
          <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
          Cadastrar Fornecedor
        </button>
      </header>

      {/* QUICK METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Ativos', value: suppliers.length, icon: Truck, color: 'emerald' },
           { label: 'Em Negociação', value: '2', icon: Globe, color: 'blue' },
           { label: 'Categorias', value: '5', icon: Package, color: 'amber' },
           { label: 'Custo Mensal Est.', value: 'R$ 4.2k', icon: FileText, color: 'purple' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-emerald-200 transition-all">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                 <stat.icon size={24} />
              </div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* SEARCH BAR */}
      <div className="relative group max-w-2xl">
         <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
         <input 
           type="text" 
           placeholder="Buscar por nome, empresa ou produto..."
           className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[28px] outline-none font-bold text-sm shadow-sm transition-all focus:shadow-xl focus:border-emerald-200"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      {/* LISTA DE FORNECEDORES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden min-h-[450px]">
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                   <div className="relative">
                      <div className="w-20 h-20 bg-slate-950 text-white rounded-[24px] flex items-center justify-center font-black text-3xl shadow-xl group-hover:rotate-6 transition-transform">
                        {supplier.contactName[0]}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <CheckCircle2 size={16} />
                      </div>
                   </div>
                   <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                     supplier.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                   }`}>
                      {supplier.status}
                   </span>
                </div>

                <div className="space-y-1 mb-6">
                   <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight">{supplier.contactName}</h3>
                   <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <Building2 size={12} /> {supplier.companyName}
                   </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 mb-8">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                     <Package size={12} /> O que fornece:
                   </p>
                   <p className="text-xs font-medium text-slate-600 leading-relaxed italic line-clamp-2">
                     "{supplier.description}"
                   </p>
                </div>
             </div>

             <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                   <div className="flex items-center gap-3">
                      <Phone size={14} className="text-emerald-500" /> {supplier.phone}
                   </div>
                   <div className="flex items-center gap-3">
                      <Mail size={14} className="text-emerald-500" /> Contato
                   </div>
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                   <span className="bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                     {supplier.category}
                   </span>
                   <div className="flex items-center gap-2">
                      <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-emerald-500 transition-all shadow-sm"><Edit2 size={16} /></button>
                      <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-rose-500 transition-all shadow-sm"><Trash2 size={16} /></button>
                   </div>
                </div>
             </div>

             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full -mr-10 -mt-10" />
          </div>
        ))}
      </div>

      {/* MODAL DE CADASTRO STEP-BY-STEP */}
      {isAdding && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
           <form onSubmit={handleSaveSupplier} className="bg-white w-full max-w-2xl rounded-[60px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 flex flex-col max-h-[85vh]">
              
              <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-950 text-white rounded-[24px] flex items-center justify-center shadow-lg transform -rotate-3">
                       <Truck size={32} />
                    </div>
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Novo <span className="text-emerald-500">Fornecedor</span></h2>
                       <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Integração ao ERP Corporativo</p>
                    </div>
                 </div>
                 <button type="button" onClick={() => setIsAdding(false)} className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all shadow-sm">
                   <X size={24} />
                 </button>
              </div>

              <div className="px-10 pt-6 flex gap-8 border-b border-slate-50">
                 {[
                   { id: 'basic', label: 'Identificação', icon: User },
                   { id: 'logistics', label: 'Logística', icon: MapPin },
                   { id: 'catalog', label: 'Catálogo', icon: Package },
                 ].map(tab => (
                   <button 
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-300'}`}
                   >
                     <tab.icon size={14} /> {tab.label}
                     {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-t-full shadow-[0_-4px_10px_rgba(16,185,129,0.5)]" />}
                   </button>
                 ))}
              </div>

              <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                 {activeTab === 'basic' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome do Contato</label>
                            <div className="relative">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required placeholder="Ex: Ricardo Mendes" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white focus:border-emerald-500" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Empresa / Razão Social</label>
                            <div className="relative">
                               <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required placeholder="Ex: Studio Equipamentos LTDA" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                            <input type="email" placeholder="fornecedor@email.com" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                            <input placeholder="00.000.000/0001-00" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})} />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                         <input placeholder="+55 11 00000-0000" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:bg-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                   </div>
                 )}

                 {activeTab === 'logistics' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Endereço de Origem/Entregas</label>
                         <textarea rows={4} placeholder="Rua, Número, Bairro, Cidade - UF" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[32px] font-medium text-xs outline-none focus:bg-white resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>
                   </div>
                 )}

                 {activeTab === 'catalog' && (
                   <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria de Suprimentos</label>
                         <select className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl font-black text-[10px] uppercase tracking-widest outline-none focus:bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            <option>Equipamentos</option>
                            <option>Manutenção</option>
                            <option>Limpeza</option>
                            <option>Insumos / Meias</option>
                            <option>Tecnologia / TI</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">O que este fornecedor entrega?</label>
                         <textarea rows={4} placeholder="Descreva os produtos ou serviços fornecidos detalhadamente..." className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[32px] font-medium text-xs outline-none focus:bg-white resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                   </div>
                 )}
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100">
                 <button type="submit" className="w-full py-6 bg-slate-950 text-white rounded-[28px] font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <Save size={18} /> Salvar Fornecedor
                 </button>
              </div>
           </form>
        </div>
      )}

    </div>
  );
};

export default SuppliersManagement;
