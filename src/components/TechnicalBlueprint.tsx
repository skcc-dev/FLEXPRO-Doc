import React, { useState } from 'react';
import { 
  Database, 
  GitBranch, 
  Monitor, 
  ArrowRight, 
  CreditCard, 
  Package, 
  Users, 
  ShoppingCart, 
  ChevronRight,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Bell,
  User,
  Menu,
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type TabType = 'schema' | 'workflow' | 'screens';

export default function TechnicalBlueprint() {
  const [activeTab, setActiveTab] = useState<TabType>('schema');
  const isRtl = document.documentElement.dir === 'rtl';

  const tabs = [
    { id: 'schema', label: isRtl ? 'مخطط قاعدة البيانات' : 'Database Schema', icon: Database },
    { id: 'workflow', label: isRtl ? 'سير عمل النظام' : 'System Workflows', icon: GitBranch },
    { id: 'screens', label: isRtl ? 'نماذج الواجهة' : 'UI Mockups', icon: Monitor },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5 w-full sm:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all",
              activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'schema' && <SchemaView />}
          {activeTab === 'workflow' && <WorkflowView />}
          {activeTab === 'screens' && <ScreensView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SchemaView() {
  const isRtl = document.documentElement.dir === 'rtl';
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900">{isRtl ? 'مخطط علاقة الكيانات' : 'Entity Relationship Diagram'}</h3>
        <p className="text-slate-500">{isRtl ? 'تمثيل مرئي لهياكل البيانات الأساسية ورسم الخرائط العلاقية الخاصة بها.' : 'Visual representation of the core data structures and their relational mapping.'}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-600">{isRtl ? 'التطبيع' : 'Normalization'}</h4>
          <p className="mt-1 text-sm text-slate-600">{isRtl ? 'بنية متوافقة مع 3NF تضمن عدم تكرار البيانات.' : '3NF compliant architecture ensuring zero data redundancy.'}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600">{isRtl ? 'النزاهة' : 'Integrity'}</h4>
          <p className="mt-1 text-sm text-slate-600">{isRtl ? 'قيود مفاتيح خارجية صارمة عبر جميع الجداول المعاملات.' : 'Strict foreign key constraints across all transactional tables.'}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-amber-600">{isRtl ? 'القابلية للتوسع' : 'Scalability'}</h4>
          <p className="mt-1 text-sm text-slate-600">{isRtl ? 'مفهرس للاستعلام عالي الأداء عبر ملايين السجلات.' : 'Indexed for high-performance querying across millions of records.'}</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-slate-50 p-4 sm:p-8">
        <div className="min-w-[800px]">
          <svg width="800" height="600" viewBox="0 0 800 600" className="mx-auto w-full h-auto">
          {/* Definitions */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
          </defs>

          {/* Tables */}
          {/* Branch */}
          <g transform="translate(350, 50)">
            <rect width="120" height="100" rx="12" fill="#4f46e5" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">BRANCHES</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">id (PK)</text>
            <text x="10" y="75" fill="white" fontSize="10">name</text>
            <text x="10" y="95" fill="white" fontSize="10">location</text>
          </g>

          {/* Users */}
          <g transform="translate(100, 50)">
            <rect width="120" height="100" rx="12" fill="#6366f1" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">USERS</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">id (PK)</text>
            <text x="10" y="75" fill="white" fontSize="10">branch_id (FK)</text>
            <text x="10" y="95" fill="white" fontSize="10">role_id (FK)</text>
          </g>

          {/* Products */}
          <g transform="translate(600, 50)">
            <rect width="120" height="100" rx="12" fill="#6366f1" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PRODUCTS</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">id (PK)</text>
            <text x="10" y="75" fill="white" fontSize="10">sku</text>
            <text x="10" y="95" fill="white" fontSize="10">category_id</text>
          </g>

          {/* Inventory */}
          <g transform="translate(475, 250)">
            <rect width="120" height="100" rx="12" fill="#818cf8" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">INVENTORY</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">product_id (FK)</text>
            <text x="10" y="75" fill="white" fontSize="10">branch_id (FK)</text>
            <text x="10" y="95" fill="white" fontSize="10">quantity</text>
          </g>

          {/* Sales */}
          <g transform="translate(225, 250)">
            <rect width="120" height="100" rx="12" fill="#818cf8" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SALES</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">id (PK)</text>
            <text x="10" y="75" fill="white" fontSize="10">branch_id (FK)</text>
            <text x="10" y="95" fill="white" fontSize="10">customer_id</text>
          </g>

          {/* Sales Items */}
          <g transform="translate(350, 450)">
            <rect width="120" height="100" rx="12" fill="#a5b4fc" />
            <text x="60" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SALES_ITEMS</text>
            <line x1="10" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" />
            <text x="10" y="55" fill="white" fontSize="10">sale_id (FK)</text>
            <text x="10" y="75" fill="white" fontSize="10">product_id (FK)</text>
            <text x="10" y="95" fill="white" fontSize="10">price_at_sale</text>
          </g>

          {/* Relationships */}
          <path d="M 220 100 L 350 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 470 100 L 600 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerStart="url(#arrowhead)" />
          <path d="M 410 150 L 410 250" stroke="#94a3b8" strokeWidth="2" fill="none" />
          <path d="M 410 250 L 285 250" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 410 250 L 535 250" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 660 150 L 660 300 L 595 300" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 285 350 L 285 400 L 350 475" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <path d="M 535 350 L 535 400 L 470 475" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        </svg>
      </div>
    </div>
  </div>
);
}

function WorkflowView() {
  const isRtl = document.documentElement.dir === 'rtl';
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900">{isRtl ? 'سير عمل النظام الأساسي' : 'Core System Workflows'}</h3>
        <p className="text-slate-500">{isRtl ? 'تدفقات العمليات التجارية من البداية إلى النهاية من المعاملة إلى التقارير المالية.' : 'End-to-end business process flows from transaction to financial reporting.'}</p>
      </div>

      <div className="space-y-12">
        {/* Sales Workflow */}
        <div className="rounded-2xl bg-slate-50 p-6">
          <h4 className="mb-6 flex items-center gap-2 font-bold text-indigo-600">
            <ShoppingCart size={20} />
            {isRtl ? 'سير عمل المبيعات والمخزون' : 'Sales & Inventory Workflow'}
          </h4>
          <div className={cn("flex flex-col items-center gap-4 sm:flex-row", isRtl && "sm:flex-row-reverse")}>
            <WorkflowStep icon={ShoppingCart} label={isRtl ? 'معاملة POS' : 'POS Transaction'} desc={isRtl ? 'العميل يشتري صنفًا' : 'Customer buys item'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={Package} label={isRtl ? 'تحديث المخزون' : 'Inventory Update'} desc={isRtl ? 'خصم المخزون في الوقت الفعلي' : 'Stock deducted real-time'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={CreditCard} label={isRtl ? 'ترحيل المالية' : 'Finance Posting'} desc={isRtl ? 'تسجيل الإيرادات في الأستاذ العام' : 'Revenue logged to GL'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={Users} label={isRtl ? 'تحديث CRM' : 'CRM Update'} desc={isRtl ? 'إضافة نقاط الولاء' : 'Loyalty points added'} />
          </div>
        </div>

        {/* Procurement Workflow */}
        <div className="rounded-2xl bg-slate-50 p-6">
          <h4 className="mb-6 flex items-center gap-2 font-bold text-emerald-600">
            <Package size={20} />
            {isRtl ? 'سير عمل المشتريات' : 'Procurement Workflow'}
          </h4>
          <div className={cn("flex flex-col items-center gap-4 sm:flex-row", isRtl && "sm:flex-row-reverse")}>
            <WorkflowStep icon={Activity} label={isRtl ? 'تنبيه انخفاض المخزون' : 'Low Stock Alert'} desc={isRtl ? 'يتم تفعيله بواسطة الحد الأدنى' : 'Triggered by threshold'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={FileText} label={isRtl ? 'أمر الشراء' : 'Purchase Order'} desc={isRtl ? 'يتم إرساله إلى المورد' : 'Sent to Supplier'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={Database} label={isRtl ? 'استلام البضائع' : 'Goods Receipt'} desc={isRtl ? 'إضافة المخزون إلى الفرع' : 'Stock added to branch'} />
            <ArrowRight className={cn("hidden text-slate-300 sm:block", isRtl && "rotate-180")} />
            <WorkflowStep icon={CreditCard} label={isRtl ? 'الحسابات الدائنة' : 'Accounts Payable'} desc={isRtl ? 'تسجيل الفاتورة' : 'Invoice logged'} />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({ icon: Icon, label, desc }: { icon: any, label: string, desc: string }) {
  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm sm:w-48">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon size={20} />
      </div>
      <p className="text-sm font-bold text-slate-900">{label}</p>
      <p className="mt-1 text-[10px] text-slate-500">{desc}</p>
    </div>
  );
}

function ScreensView() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const isRtl = document.documentElement.dir === 'rtl';

  const screens = [
    { id: 'dashboard', label: isRtl ? 'لوحة التحكم' : 'dashboard' },
    { id: 'pos', label: isRtl ? 'نقطة البيع' : 'pos' },
    { id: 'inventory', label: isRtl ? 'المخزون' : 'inventory' },
    { id: 'crm', label: isRtl ? 'العملاء' : 'crm' },
    { id: 'finance', label: isRtl ? 'المالية' : 'finance' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{isRtl ? 'نماذج شاشات واجهة المستخدم' : 'UI Screen Mockups'}</h3>
          <p className="text-sm sm:text-base text-slate-500">{isRtl ? 'معاينات تفاعلية لواجهات النظام الأساسية.' : 'Interactive previews of the core system interfaces.'}</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
          {screens.map(s => (
            <button 
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                activeScreen === s.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
        <div className="absolute inset-0 overflow-auto scrollbar-thin">
          <div className="min-w-[640px] h-full">
            {activeScreen === 'dashboard' && <DashboardMockup />}
            {activeScreen === 'pos' && <POSMockup />}
            {activeScreen === 'inventory' && <InventoryMockup />}
            {activeScreen === 'crm' && <CRMMockup />}
            {activeScreen === 'finance' && <FinanceMockup />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="flex h-full w-full flex-col bg-slate-50">
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-2">
          <Menu size={16} className="text-slate-400" />
          <div className="h-6 w-20 rounded bg-slate-100" />
        </div>
        <div className="flex items-center gap-3">
          <Bell size={16} className="text-slate-400" />
          <div className="h-6 w-6 rounded-full bg-indigo-100" />
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-16 border-r border-slate-200 bg-white p-2 space-y-4">
          {[LayoutDashboard, ShoppingCart, Package, Users, FileText, Settings].map((Icon, i) => (
            <div key={i} className={cn("h-10 w-10 rounded-lg flex items-center justify-center", i === 0 ? "bg-indigo-50 text-indigo-600" : "text-slate-400")}>
              <Icon size={18} />
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">Executive Overview</h4>
            <div className="h-6 w-24 rounded bg-white border border-slate-200" />
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm border border-slate-100">
                <div className="h-3 w-12 bg-slate-100 rounded mb-2" />
                <div className="h-5 w-20 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 rounded-xl bg-white p-4 shadow-sm border border-slate-100 h-48">
              <div className="h-4 w-32 bg-slate-100 rounded mb-4" />
              <div className="h-32 w-full bg-slate-50 rounded flex items-end gap-2 p-2">
                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-200 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100 h-48">
              <div className="h-4 w-32 bg-slate-100 rounded mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-slate-50" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full bg-slate-100 rounded" />
                      <div className="h-2 w-1/2 bg-slate-50 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function POSMockup() {
  return (
    <div className="flex h-full w-full bg-white">
      {/* Left: Product Grid */}
      <div className="flex-1 flex flex-col border-r border-slate-200">
        <div className="p-4 border-b border-slate-100 flex gap-2">
          <div className="flex-1 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center px-3 gap-2">
            <Search size={14} className="text-slate-400" />
            <div className="h-3 w-32 bg-slate-200 rounded" />
          </div>
          <div className="h-9 w-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Filter size={14} className="text-slate-400" />
          </div>
        </div>
        <div className="flex-1 p-4 grid grid-cols-4 gap-3 overflow-y-auto">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-white p-2 shadow-sm flex flex-col items-center text-center">
              <div className="aspect-square w-full bg-slate-50 rounded-lg mb-2" />
              <div className="h-2 w-12 bg-slate-100 rounded mb-1" />
              <div className="h-2 w-8 bg-indigo-50 rounded" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Right: Cart */}
      <div className="w-80 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h5 className="text-sm font-bold">Current Order</h5>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-white border border-slate-200" />
              <div className="flex-1">
                <div className="h-2 w-20 bg-slate-200 rounded mb-1" />
                <div className="h-2 w-10 bg-slate-100 rounded" />
              </div>
              <div className="h-2 w-8 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-slate-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold">$245.00</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Tax (15%)</span>
              <span className="font-bold">$36.75</span>
            </div>
            <div className="flex justify-between text-lg font-black text-indigo-600 pt-2 border-t border-slate-100">
              <span>Total</span>
              <span>$281.75</span>
            </div>
          </div>
          <button className="w-full h-12 bg-indigo-600 rounded-xl text-white font-bold shadow-lg shadow-indigo-100">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryMockup() {
  const isRtl = document.documentElement.dir === 'rtl';
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h5 className="text-sm font-bold">{isRtl ? 'سجل المخزون الرئيسي' : 'Inventory Master'}</h5>
        <div className="flex gap-2">
          <button className="h-8 px-3 rounded-lg bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Plus size={12} /> {isRtl ? 'إضافة منتج' : 'Add Product'}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className={cn("p-3 font-bold text-slate-400", isRtl ? "text-right" : "text-left")}>{isRtl ? 'المنتج' : 'PRODUCT'}</th>
              <th className={cn("p-3 font-bold text-slate-400", isRtl ? "text-right" : "text-left")}>{isRtl ? 'SKU' : 'SKU'}</th>
              <th className={cn("p-3 font-bold text-slate-400", isRtl ? "text-right" : "text-left")}>{isRtl ? 'الفرع' : 'BRANCH'}</th>
              <th className={cn("p-3 font-bold text-slate-400", isRtl ? "text-right" : "text-left")}>{isRtl ? 'المخزون' : 'STOCK'}</th>
              <th className={cn("p-3 font-bold text-slate-400", isRtl ? "text-right" : "text-left")}>{isRtl ? 'الحالة' : 'STATUS'}</th>
              <th className="p-3 font-bold text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map(i => (
              <tr key={i}>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-slate-50" />
                    <div className="h-2 w-24 bg-slate-100 rounded" />
                  </div>
                </td>
                <td className="p-3"><div className="h-2 w-16 bg-slate-50 rounded" /></td>
                <td className="p-3"><div className="h-2 w-20 bg-slate-50 rounded" /></td>
                <td className="p-3 font-bold">124</td>
                <td className="p-3">
                  <span className={cn("px-2 py-0.5 rounded-full text-[8px] font-bold uppercase", i === 3 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600")}>
                    {i === 3 ? (isRtl ? 'مخزون منخفض' : 'Low Stock') : (isRtl ? 'متوفر' : 'In Stock')}
                  </span>
                </td>
                <td className="p-3 text-slate-300"><MoreVertical size={14} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CRMMockup() {
  const isRtl = document.documentElement.dir === 'rtl';
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h5 className="text-sm font-bold">{isRtl ? 'إدارة العملاء' : 'Customer Management'}</h5>
        <div className="flex gap-2">
          <button className="h-8 px-3 rounded-lg bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Plus size={12} /> {isRtl ? 'عميل جديد' : 'New Customer'}
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 grid grid-cols-3 gap-4 overflow-y-auto">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User size={20} />
              </div>
              <div>
                <div className="h-3 w-24 bg-slate-200 rounded mb-1" />
                <div className="h-2 w-16 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">{isRtl ? 'إجمالي المشتريات' : 'Total Spent'}</span>
                <span className="font-bold text-slate-700">$1,240.00</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400">{isRtl ? 'نقاط الولاء' : 'Loyalty Points'}</span>
                <span className="font-bold text-indigo-600">450 pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceMockup() {
  const isRtl = document.documentElement.dir === 'rtl';
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <h5 className="text-sm font-bold">{isRtl ? 'التقارير المالية' : 'Financial Reports'}</h5>
        <div className="flex gap-2">
          <button className="h-8 px-3 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
            {isRtl ? 'تصدير' : 'Export'}
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h6 className="text-xs font-bold text-slate-400 uppercase mb-4">{isRtl ? 'الأرباح والخسائر' : 'Profit & Loss'}</h6>
            <div className="space-y-4">
              <div className="flex justify-between items-end h-24 gap-2">
                {[30, 50, 40, 60, 80, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-200 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span>{isRtl ? 'الإيرادات' : 'Revenue'}</span>
                <span className="text-emerald-600">$45,200.00</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span>{isRtl ? 'المصاريف' : 'Expenses'}</span>
                <span className="text-rose-600">$12,400.00</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h6 className="text-xs font-bold text-slate-400 uppercase mb-4">{isRtl ? 'توزيع المصاريف' : 'Expense Distribution'}</h6>
            <div className="flex items-center justify-center h-24">
              <div className="h-20 w-20 rounded-full border-8 border-indigo-500 border-t-emerald-500 border-r-amber-500" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1 text-[8px] font-bold">
                <div className="h-2 w-2 rounded-full bg-indigo-500" /> {isRtl ? 'رواتب' : 'Payroll'}
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold">
                <div className="h-2 w-2 rounded-full bg-emerald-500" /> {isRtl ? 'إيجار' : 'Rent'}
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold">
                <div className="h-2 w-2 rounded-full bg-amber-500" /> {isRtl ? 'مرافق' : 'Utilities'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
