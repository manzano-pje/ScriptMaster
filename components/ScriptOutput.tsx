
import React, { useState } from 'react';
import { ScriptResult } from '../types';

interface Props {
  result: ScriptResult;
}

const ScriptOutput: React.FC<Props> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'roteiro' | 'seo' | 'visual'>('roteiro');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado!");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-right duration-500">
      {/* Tabs */}
      <div className="flex bg-slate-800/50 p-1 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('roteiro')}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'roteiro' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🎬 Roteiro
        </button>
        <button 
          onClick={() => setActiveTab('seo')}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'seo' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🔍 SEO & Tags
        </button>
        <button 
          onClick={() => setActiveTab('visual')}
          className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'visual' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
        >
          🖼️ Visual & Thumb
        </button>
      </div>

      <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {activeTab === 'roteiro' && (
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Hook</span>
                <h3 className="text-xl font-bold text-white">O Gancho (Primeiros 15s)</h3>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-200 italic leading-relaxed">
                "{result.hook}"
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Promessa</span>
                <h3 className="text-lg font-bold text-white">O que o espectador ganha</h3>
              </div>
              <p className="text-slate-400 text-sm">{result.promise}</p>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Estrutura Narrativa</h3>
              <div className="space-y-4">
                {result.structure.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-300 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        {item.time}
                      </div>
                      {idx !== result.structure.length - 1 && <div className="w-px h-full bg-slate-800 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-bold text-slate-300 mb-1">{item.label}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-3">Roteiro Completo</h3>
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {result.fullScriptContent}
              </div>
              <button 
                onClick={() => copyToClipboard(result.fullScriptContent)}
                className="mt-4 text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                COPIAR ROTEIRO COMPLETO
              </button>
            </section>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Título Magnético</h3>
              <div className="p-4 bg-slate-800 border-l-4 border-red-500 rounded-r-2xl text-xl font-extrabold text-white">
                {result.optimizedTitle}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Descrição Otimizada</h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-400 text-sm whitespace-pre-wrap">
                {result.optimizedDescription}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Tags Estratégicas</h3>
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Micro Ganchos de Retenção</h3>
              <ul className="space-y-2">
                {result.microHooks.map((hook, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-400 text-sm italic">
                    <span className="text-red-500">→</span> "{hook}"
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'visual' && (
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Conceito de Thumbnail</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-red-400 uppercase">Texto Impactante</p>
                    <p className="text-xl font-black text-white">{result.thumbnailConcept.text}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Expressão Sugerida</p>
                    <p className="text-slate-300">{result.thumbnailConcept.expression}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Elemento Dominante</p>
                    <p className="text-slate-300">{result.thumbnailConcept.element}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Cor Predominante</p>
                    <p className="text-slate-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: result.thumbnailConcept.color.toLowerCase().includes('vermelho') ? '#ef4444' : result.thumbnailConcept.color.toLowerCase().includes('amarelo') ? '#f59e0b' : '#3b82f6' }}></span>
                      {result.thumbnailConcept.color}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sugestões de B-Roll (Visual)</h3>
              <div className="grid grid-cols-1 gap-3">
                {result.bRollSuggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-800">
                    <div className="bg-slate-700 p-1.5 rounded-lg text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-400">{suggestion}</p>
                  </div>
                ))}
              </div>
            </section>

            {result.avatarInstructions && (
              <section className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/20">
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Performance do Avatar IA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="font-bold text-slate-300 mb-1">Entonação</p>
                    <p className="text-slate-400 italic">{result.avatarInstructions.intonation}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-300 mb-1">Linguagem Corporal</p>
                    <p className="text-slate-400 italic">{result.avatarInstructions.bodyLanguage}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-300 mb-1">Pausas</p>
                    <p className="text-slate-400 italic">{result.avatarInstructions.pauses}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-300 mb-1">Expressões</p>
                    <p className="text-slate-400 italic">{result.avatarInstructions.expressions}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Persistent Footer */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Estratégia Otimizada por ScriptMaster AI
        </div>
        <button 
          onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
        >
          Baixar Dados JSON
        </button>
      </div>
    </div>
  );
};

export default ScriptOutput;
