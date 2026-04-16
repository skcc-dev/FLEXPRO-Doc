/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FileText, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  ChevronRight, 
  Printer, 
  Download,
  Menu,
  X,
  Search,
  Database,
  ShieldCheck,
  Activity,
  BarChart3,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SRS_CONTENT } from './content/srs';
import { SRS_CONTENT_AR } from './content/srs_ar';
import { cn } from './lib/utils';
import TechnicalBlueprint from './components/TechnicalBlueprint';

const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};


type ViewMode = 'document' | 'blueprint';
type Language = 'en' | 'ar';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('document');
  const [lang, setLang] = useState<Language>('en');

  const isRtl = lang === 'ar';
  const content = isRtl ? SRS_CONTENT_AR : SRS_CONTENT;

  // Extract headings for navigation
  const toc = useMemo(() => {
    const lines = content.split('\n');
    return lines
      .filter(line => line.startsWith('### '))
      .map(line => {
        const title = line.replace('### ', '').trim();
        const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        return { title, id };
      });
  }, [content]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = toc.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toc]);

  const filteredToc = toc.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadMarkdown = () => {
    const filename = `FLEXPro_ERP_SRS_${lang.toUpperCase()}.md`;
    downloadFile(filename, content);
  };

  const handleDownloadPrompt = () => {
    const prompt = `
# FLEXPro ERP - System Architecture & Build Prompt

You are a Senior Enterprise Software Architect and Lead Developer. Your task is to architect and build a professional, enterprise-grade ERP system called **FLEXPro ERP** based on the provided Software Requirements Specification (SRS).

## 🏗 System Architecture Guidelines
1. **Architecture Style**: Microservices-inspired Monolith (Modular Monolith) with clear separation of concerns.
2. **Design Patterns**: Repository Pattern, Service Layer, Controller Pattern, and Factory Pattern.
3. **Scalability**: Multi-branch support with branch-level data isolation (RLS or dedicated IDs).
4. **Security**: MFA, AES-256 encryption, and comprehensive RBAC.

## 🛠 Technology Stack
- **Frontend**: React.js 18+, TypeScript, Tailwind CSS, Lucide React, Framer Motion.
- **Backend**: Node.js, Express.js, TypeScript.
- **Database**: PostgreSQL with Prisma.
- **Caching**: Redis and WebSockets for real-time updates.

## 📄 Reference Document (SRS)
${content}

## 🎯 Implementation Goals
1. Setup a clean monorepo structure.
2. Implement Sales/POS, Inventory, Finance, and CRM modules.
3. Ensure "Clean Enterprise" UI/UX with responsive design and dashboard widgets.

Please start by outlining the project structure and database schema.
    `.trim();
    downloadFile('FLEXPro_Build_Prompt.md', prompt);
  };

  const scrollToSection = (id: string) => {
    // ... rest of scroll logic

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle Menu"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <Layers size={20} className="sm:hidden" />
                <Layers size={24} className="hidden sm:block" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">FLEXPro <span className="text-indigo-600">ERP</span></h1>
                <p className="hidden sm:block text-[10px] font-medium uppercase tracking-widest text-slate-500">System Specification</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button 
                onClick={() => setLang('en')}
                className={cn(
                  "rounded-lg px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold transition-all",
                  lang === 'en' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ar')}
                className={cn(
                  "rounded-lg px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold transition-all",
                  lang === 'ar' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                AR
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={handleDownloadMarkdown}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900"
              >
                <Printer size={16} />
                <span className="hidden md:inline">{isRtl ? 'تحميل MD' : 'Download MD'}</span>
              </button>
              <button 
                onClick={handleDownloadPrompt}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-lg"
              >
                <Download size={16} />
                <span className="hidden md:inline">{isRtl ? 'تحميل البرومبت' : 'Download Prompt'}</span>
              </button>
            </div>
            <div className="sm:hidden flex gap-1">
              <button 
                onClick={handleDownloadMarkdown}
                className="p-2 text-slate-600 hover:text-indigo-600"
              >
                <Printer size={18} />
              </button>
              <button 
                onClick={handleDownloadPrompt}
                className="p-2 text-indigo-600"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] pt-16">
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Navigation */}
        <aside 
          className={cn(
            "fixed inset-y-0 z-40 w-72 transform border-r border-slate-200 bg-white pt-16 transition-transform duration-300 ease-in-out lg:sticky lg:translate-x-0",
            isRtl ? "right-0 translate-x-full" : "left-0 -translate-x-full",
            isSidebarOpen && "translate-x-0"
          )}
        >
          <div className="flex h-full flex-col p-6">
            <div className="relative mb-6">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 text-slate-400", isRtl ? "right-3" : "left-3")} size={16} />
              <input 
                type="text" 
                placeholder={isRtl ? "بحث في الأقسام..." : "Search sections..."}
                className={cn(
                  "w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100",
                  isRtl ? "pl-4 pr-10" : "pl-10 pr-4"
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <nav className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              <div className="space-y-1">
                {filteredToc.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-all",
                      activeSection === item.id 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span className="truncate">{item.title}</span>
                    <ChevronRight 
                      size={14} 
                      className={cn(
                        "transition-transform",
                        activeSection === item.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )} 
                    />
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <div className="rounded-xl bg-slate-900 p-4 text-white">
                <p className="text-xs font-medium text-slate-400">{isRtl ? 'حالة النظام' : 'System Status'}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold">{isRtl ? 'الهيكل جاهز' : 'Architecture Ready'}</span>
                </div>
                <p className="mt-2 text-[10px] text-slate-500">v1.0.42-stable</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 sm:py-8 sm:px-8 lg:px-12 overflow-hidden">
          <div className="mx-auto max-w-4xl">
            {/* Document Header */}
            <div className="mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-12 shadow-sm border border-slate-200">
              <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <ShieldCheck size={14} />
                  {isRtl ? 'درجة مؤسسية' : 'Enterprise Grade'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <Activity size={14} />
                  {isRtl ? 'مزامنة فورية' : 'Real-time Sync'}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                  <Database size={14} />
                  {isRtl ? 'متعدد الفروع' : 'Multi-Branch'}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {isRtl ? 'مواصفات متطلبات البرمجيات' : 'Software Requirements Specification'}
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed">
                {isRtl ? (
                  <>
                    مخطط شامل لنظام <span className="font-semibold text-slate-900">FLEXPro ERP</span> المتكامل. 
                    مصمم للقابلية للتوسع والموثوقية والعمليات التجارية عالية الأداء.
                  </>
                ) : (
                  <>
                    A comprehensive blueprint for the <span className="font-semibold text-slate-900">FLEXPro ERP</span> ecosystem. 
                    Designed for scalability, reliability, and high-performance business operations.
                  </>
                )}
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-1 sm:flex-none rounded-2xl bg-slate-50 p-3 sm:p-4 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{isRtl ? 'الإصدار' : 'Version'}</p>
                    <p className="mt-1 text-base sm:text-lg font-bold text-slate-900">1.0.0-Stable</p>
                  </div>
                  <div className="flex-1 sm:flex-none rounded-2xl bg-slate-50 p-3 sm:p-4 border border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{isRtl ? 'آخر تحديث' : 'Last Updated'}</p>
                    <p className="mt-1 text-base sm:text-lg font-bold text-slate-900 whitespace-nowrap">{isRtl ? '11 أبريل 2026' : 'April 11, 2026'}</p>
                  </div>
                </div>

                <div className="flex w-full sm:w-auto rounded-2xl bg-slate-100 p-1.5">
                  <button 
                    onClick={() => setViewMode('document')}
                    className={cn(
                      "flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                      viewMode === 'document' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <FileText size={18} />
                    <span className="whitespace-nowrap">{isRtl ? 'وثيقة SRS' : 'SRS Document'}</span>
                  </button>
                  <button 
                    onClick={() => setViewMode('blueprint')}
                    className={cn(
                      "flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all",
                      viewMode === 'blueprint' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    <Database size={18} />
                    <span className="whitespace-nowrap">{isRtl ? 'المخطط التقني' : 'Technical Blueprint'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {viewMode === 'document' ? (
                <motion.div
                  key="document"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-none markdown-body"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ node, ...props }) => {
                        const id = String(props.children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return <h3 id={id} {...props} />;
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </motion.div>
              ) : (
                <motion.div
                  key="blueprint"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TechnicalBlueprint />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-24 border-t border-slate-200 py-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white flex">
                  <Layers size={18} />
                </div>
                <span className="font-bold text-slate-900">FLEXPro ERP</span>
              </div>
              <p className="text-sm text-slate-500">
                {isRtl ? (
                  <>
                    © 2026 حلول FLEXPro للمؤسسات. جميع الحقوق محفوظة.
                    <br />
                    وثيقة سرية - للاستخدام الداخلي فقط
                  </>
                ) : (
                  <>
                    © 2026 FLEXPro Enterprise Solutions. All rights reserved.
                    <br />
                    Confidential Document - Internal Use Only
                  </>
                )}
              </p>
            </footer>
          </div>
        </main>

        {/* Quick Access / Stats Panel */}
        <aside className={cn("hidden w-80 border-slate-200 bg-white p-8 xl:block", isRtl ? "border-r" : "border-l")}>
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                <BarChart3 size={16} />
                {isRtl ? 'مقاييس النظام' : 'System Metrics'}
              </h4>
              <div className="space-y-4">
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={cn("absolute h-full w-[85%] bg-indigo-500", isRtl ? "right-0" : "left-0")} />
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">{isRtl ? 'تغطية المتطلبات' : 'Requirement Coverage'}</span>
                  <span className="text-slate-900">85%</span>
                </div>
                
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={cn("absolute h-full w-[92%] bg-emerald-500", isRtl ? "right-0" : "left-0")} />
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">{isRtl ? 'الامتثال الأمني' : 'Security Compliance'}</span>
                  <span className="text-slate-900">92%</span>
                </div>

                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={cn("absolute h-full w-[78%] bg-amber-500", isRtl ? "right-0" : "left-0")} />
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">{isRtl ? 'توثيق API' : 'API Documentation'}</span>
                  <span className="text-slate-900">78%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                <LayoutDashboard size={16} />
                {isRtl ? 'الوحدات الأساسية' : 'Core Modules'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: ShoppingCart, label: isRtl ? 'المبيعات' : 'Sales' },
                  { icon: Package, label: isRtl ? 'المخزون' : 'Inventory' },
                  { icon: Users, label: isRtl ? 'CRM' : 'CRM' },
                  { icon: Activity, label: isRtl ? 'المالية' : 'Finance' },
                  { icon: Database, label: isRtl ? 'الفروع' : 'Branches' },
                  { icon: Settings, label: isRtl ? 'الإدارة' : 'Admin' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                    <item.icon size={20} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-200">
              <h5 className="text-lg font-bold">{isRtl ? 'جاهز للتنفيذ؟' : 'Ready to build?'}</h5>
              <p className="mt-2 text-sm text-indigo-100">
                {isRtl ? 'فريقنا الهندسي جاهز لبدء المرحلة الأولى من التطوير.' : 'Our engineering team is standing by to initiate Phase 1 of development.'}
              </p>
              <button className="mt-4 w-full rounded-xl bg-white py-2 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50">
                {isRtl ? 'اتصل بالمهندس' : 'Contact Architect'}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
