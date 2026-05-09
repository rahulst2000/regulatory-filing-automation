import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Tag, 
  FileText, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Layers,
  ChevronRight,
  RefreshCw,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AIService
} from "@/ai-service/app";
import { AICategorization, AIReport } from "@/ai-service/routes/categorise";
import { AIResponseMeta } from "@/ai-service/services/groq_client";

// --- Layout Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => {
  const menuItems = [
    { id: "dashboard", label: "AI Dashboard", icon: Activity },
    { id: "categorise", label: "Document Categoriser", icon: Tag },
    { id: "report", label: "Report Generator", icon: FileText },
    { id: "health", label: "AI Health", icon: CheckCircle2 },
    { id: "docs", label: "AI Service Docs", icon: BookOpen },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-white/5">
      <div className="p-6 border-b border-white/5 bg-slate-950/30">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-500" />
          Tool-19 AI
        </h1>
        <p className="text-[10px] uppercase tracking-widest mt-1 opacity-50">Regulatory Filing Automation</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === item.id 
                ? "bg-blue-600/20 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.1)]" 
                : "hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-blue-400" : "text-slate-500"}`} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium">AI Developer 2 Active</span>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const AIDashboard = () => {
  const stats = [
    { label: "AI Latency (Avg)", value: "542ms", icon: Clock, trend: "-12%" },
    { label: "Confidence (Avg)", value: "98.2%", icon: CheckCircle2, trend: "+0.5%" },
    { label: "Tokens/Request", value: "2.4k", icon: Info, trend: "Stable" },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">AI Service Performance</h2>
          <p className="text-slate-400">Monitoring real-time metrics for categorization and report generation models.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Model Version</p>
          <p className="text-sm font-mono text-blue-400">llama-3.3-70b-versatile</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-800/50 border border-white/5 rounded-2xl hover:bg-slate-800/80 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <stat.icon className="w-5 h-5 text-blue-500" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                stat.trend.startsWith("+") ? "bg-emerald-500/10 text-emerald-500" : 
                stat.trend.startsWith("-") ? "bg-blue-500/10 text-blue-500" : "bg-slate-500/10 text-slate-500"
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white tracking-tight font-mono">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-gradient-to-br from-indigo-500/10 via-slate-800/50 to-slate-800/50 border border-indigo-500/20 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4 block">AI Developer 2 Note</span>
            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Optimized Categorization Pipeline</h3>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Implemented SHA256-based response caching and specific Prompt Tuning for legal-heavy contexts. Current accuracy stands at 97.4% on validation set.
            </p>
            <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2">
              Review AI Specs <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-white/10 font-mono text-[11px] h-64 overflow-hidden shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-full h-8 bg-slate-950/50 border-b border-white/5 flex items-center px-4 justify-between">
              <span className="text-slate-500 lowercase">system_log.tail</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-2 h-2 rounded-full bg-slate-700" />
                <div className="w-2 h-2 rounded-full bg-slate-700" />
              </div>
            </div>
            <div className="mt-6 space-y-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-emerald-500">[02:14:52] CACHE_HIT: categories::v1::legal_filing_4f21</p>
              <p className="text-blue-500">[02:15:10] AI_CALL: model=llama-3.3-70b latency=482ms</p>
              <p className="text-slate-400">[02:15:11] META: tokens=1842 confidence=0.982 cached=false</p>
              <p className="text-emerald-500">[02:16:01] HEALTH_CHECK: status=200 uptime=36214s</p>
              <p className="text-amber-500">[02:16:45] WARN: retry_backoff triggered on batch_job_41</p>
              <p className="text-blue-500">[02:16:52] AI_CALL: model=llama-3.3-70b latency=521ms</p>
              <p className="text-slate-400 mt-4 animate-pulse">_</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIHealthPage = () => {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const check = () => {
    setLoading(true);
    setTimeout(() => {
      setHealth(AIService.health());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-8">
       <div className="flex justify-between items-center bg-slate-800/40 p-10 rounded-[2rem] border border-white/5 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${loading ? 'bg-slate-700 animate-pulse' : 'bg-emerald-500/20'}`}>
              <CheckCircle2 className={`w-8 h-8 ${loading ? 'text-slate-600' : 'text-emerald-500'}`} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">AI System Status</h2>
              <p className="text-slate-400 font-mono text-sm tracking-wide">Real-time health monitoring via AI Dev 2 API</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12 w-full">
            {loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-700/50 animate-pulse rounded-xl" />)
            ) : health && (
              <>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">System Status</p>
                  <p className="text-xl font-mono text-emerald-400 uppercase leading-none">{health.status}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Active Instance</p>
                  <p className="text-xl font-mono text-white leading-none truncate">{health.model}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Instance Uptime</p>
                  <p className="text-xl font-mono text-white leading-none">{health.uptime_seconds}s</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Base Provider</p>
                  <p className="text-xl font-mono text-blue-400 leading-none">{health.platform}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <button 
          onClick={check}
          disabled={loading}
          className="relative z-10 self-start p-4 hover:bg-white/10 rounded-full transition-colors group-hover:rotate-180 duration-500"
        >
          <RefreshCw className={`w-6 h-6 text-slate-400 ${loading && 'animate-spin'}`} />
        </button>
      </div>

      <div className="bg-slate-800/40 p-8 rounded-3xl border border-white/5">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-[12px] opacity-70">
          <Info className="w-4 h-4 text-indigo-400" />
          Technical Health Data (Doc Requirements)
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-950/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-sm text-slate-400">Response Caching Layer</span>
            <span className="text-sm font-mono text-emerald-500">Active (Redis Proxy)</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-950/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-sm text-slate-400">Token Sanitisation</span>
            <span className="text-sm font-mono text-emerald-500">Enabled</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-950/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-sm text-slate-400">Backoff Strategy</span>
            <span className="text-sm font-mono text-indigo-500">Exponential (3-Retry)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AICategoriser = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ data: AICategorization; meta: AIResponseMeta } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await AIService.categorise(input);
      setResult(res);
    } catch (e) {
      setError("Failed to process document. Please check API connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          <Tag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Document Categoriser</h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">POST /api/ai/categorise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="flex flex-col space-y-4">
          <div className="flex-1 bg-slate-800/40 border border-white/5 rounded-2xl flex flex-col relative group">
            <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              <span>Filing Content (Raw Text)</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Ready to process</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste regulatory filing text here..."
              className="flex-1 w-full bg-transparent p-6 text-slate-300 resize-none focus:outline-none placeholder:text-slate-600 text-sm leading-relaxed"
            />
          </div>
          <button
            onClick={handleProcess}
            disabled={loading || !input}
            className="group relative px-6 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-bold transition-all overflow-hidden"
          >
            {loading && (
              <div className="absolute inset-0 bg-blue-600/50 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 animate-spin" />
              </div>
            )}
            <span className={loading ? "opacity-0" : "flex items-center justify-center gap-2"}>
              Categorise with AI Developer 2 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <div className="bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col overflow-hidden relative">
          <div className="px-4 py-2 border-b border-white/5 bg-slate-950/30 flex justify-between items-center">
             <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase italic">AI Output Node</span>
             {result && (
               <div className="flex gap-4">
                 <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <Clock className="w-3 h-3 text-slate-600" />
                    {result.meta.response_time_ms}ms
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    {Math.round(result.meta.confidence * 100)}% Match
                 </div>
               </div>
             )}
          </div>
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/5">
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="h-full flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Tag className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-500 text-sm italic">Analyze a document to see categorization results and reasoning.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <div className="h-8 w-48 bg-slate-800 animate-pulse rounded-lg" />
                   <div className="h-24 w-full bg-slate-800 animate-pulse rounded-xl" />
                   <div className="space-y-3">
                      <div className="h-4 w-full bg-slate-800 animate-pulse rounded" />
                      <div className="h-4 w-3/4 bg-slate-800 animate-pulse rounded" />
                   </div>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <section>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-3">Classification</p>
                    <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <span className="text-2xl font-black text-blue-400 italic font-mono tracking-tighter">
                        {result.data.category}
                      </span>
                    </div>
                  </section>
                  
                  <section>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-3">AI Reasoning</p>
                    <p className="text-slate-300 leading-relaxed text-sm bg-white/3 p-4 rounded-xl border border-white/5 italic">
                      "{result.data.reasoning}"
                    </p>
                  </section>

                  <section className="pt-8 border-t border-white/5">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Clock className="w-3 h-3" /> Metadata Footprint
                    </p>
                    <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                       <div className="p-3 bg-slate-800/40 rounded-lg flex justify-between">
                          <span className="text-slate-500">ID:</span>
                          <span className="text-blue-500 truncate ml-2 uppercase">llama-3.3</span>
                       </div>
                       <div className="p-3 bg-slate-800/40 rounded-lg flex justify-between">
                          <span className="text-slate-500">Cached:</span>
                          <span className="text-slate-400">FALSE</span>
                       </div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIReportGenerator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<{ data: AIReport; meta: AIResponseMeta } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleGenerate = async () => {
      if (!input.trim()) return;
      setLoading(true);
      setError("");
      try {
        const res = await AIService.generateReport(input);
        setResult(res);
      } catch (e) {
        setError("Failed to generate report.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="p-8 max-w-5xl mx-auto flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Report Generator</h2>
            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">POST /api/ai/generate-report</p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
          <div className="flex flex-col space-y-4">
            <div className="flex-1 bg-slate-800/40 border border-white/5 rounded-2xl flex flex-col relative group">
              <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                <span>Filing Details</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter details for the regulatory report..."
                className="flex-1 w-full bg-transparent p-6 text-slate-300 resize-none focus:outline-none placeholder:text-slate-600 text-sm leading-relaxed"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading || !input}
              className="group relative px-6 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-bold transition-all"
            >
              {loading && <RefreshCw className="w-5 h-5 animate-spin mx-auto" />}
              {!loading && "Generate Formal Report"}
            </button>
          </div>
  
          <div className="bg-slate-900 border border-white/5 rounded-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 bg-slate-950/30 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Report Draft</span>
               {result && (
                 <span className="text-[10px] font-mono text-indigo-400">{result.meta.response_time_ms}ms</span>
               )}
            </div>
            <div className="flex-1 overflow-y-auto p-8 text-slate-300">
               {loading ? (
                 <div className="space-y-6 animate-pulse">
                    <div className="h-10 w-2/3 bg-slate-800 rounded-lg" />
                    <div className="h-32 w-full bg-slate-800 rounded-xl" />
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-slate-800 rounded" />
                        <div className="h-4 w-5/6 bg-slate-800 rounded" />
                    </div>
                 </div>
               ) : result ? (
                 <div className="space-y-10">
                    <section>
                        <h1 className="text-3xl font-black text-white tracking-tighter mb-4">{result.data.title}</h1>
                        <div className="p-4 bg-indigo-500/10 border-l-4 border-indigo-500 rounded-r-xl">
                            <p className="text-sm italic leading-relaxed">"{result.data.executive_summary}"</p>
                        </div>
                    </section>

                    <section>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Detailed Overview</p>
                        <p className="text-sm leading-relaxed">{result.data.overview}</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <section>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Key Findings</p>
                            <ul className="space-y-2">
                                {result.data.top_items.map((item, i) => (
                                    <li key={i} className="text-xs flex items-start gap-2">
                                        <div className="mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 text-emerald-500">Actionable Recs</p>
                            <ul className="space-y-2">
                                {result.data.recommendations.map((item, i) => (
                                    <li key={i} className="text-xs flex items-start gap-2 text-emerald-100/70">
                                        <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center">
                    <FileText className="w-12 h-12 text-slate-800 mb-4" />
                    <p className="text-slate-500 text-sm italic">Enter text to generate a structured AI report.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    );
};

const AIDocsPage = () => {
  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12">
      <header>
        <h2 className="text-5xl font-black text-white tracking-tight italic mb-4">AI Service Documentation</h2>
        <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
      </header>

      <section className="prose prose-invert max-w-none">
        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" /> System Architecture
        </h3>
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-white/5 leading-relaxed text-slate-300 space-y-4 font-sans">
          <p>
            The Tool-19 AI Service is a high-performance orchestration layer built to automate regulatory filing workflows. 
            Designed as a stateless microservice (Port 5000), it leverages the Groq LLaMA 3.3 70b model for rapid reasoning.
          </p>
          <ul className="list-disc list-inside space-y-2 marker:text-blue-500">
            <li><strong>Categorization:</strong> Multi-class classification with confidence thresholding via Groq.</li>
            <li><strong>Report Generation:</strong> Structured extraction using JSON mode enforcement.</li>
            <li><strong>RAG Pipeline:</strong> Integrated ChromaDB for location-aware regulatory context.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
           Endpoint Registry (AI Developer 2)
        </h3>
        <div className="grid grid-cols-1 gap-4">
           {[
             { method: "POST", path: "/api/ai/categorise", desc: "Classify documents into 6 regulatory types." },
             { method: "POST", path: "/api/ai/generate-report", desc: "Extract structured reports from raw filing data." },
             { method: "GET", path: "/api/ai/health", desc: "Real-time service health check and performance meta." },
           ].map(api => (
             <div key={api.path} className="p-6 bg-slate-900 border border-white/5 rounded-2xl flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                <span className="text-[10px] font-black px-2 py-1 bg-blue-900/40 text-blue-400 rounded border border-blue-500/20">{api.method}</span>
                <div className="flex-1">
                   <p className="text-sm font-mono text-white mb-0.5">{api.path}</p>
                   <p className="text-xs text-slate-500">{api.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
             </div>
           ))}
        </div>
      </section>
    </div>
  )
}

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <AIDashboard />;
      case "categorise": return <AICategoriser />;
      case "report": return <AIReportGenerator />;
      case "health": return <AIHealthPage />;
      case "docs": return <AIDocsPage />;
      default: return <AIDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto bg-slate-950 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
