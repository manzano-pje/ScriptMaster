
import React, { useState, useCallback } from 'react';
import { ScriptParams, ScriptResult } from './types';
import { generateScript } from './services/geminiService';
import ScriptForm from './components/ScriptForm';
import ScriptOutput from './components/ScriptOutput';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (params: ScriptParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateScript(params);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Houve um erro ao gerar o roteiro. Verifique sua chave API e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-6xl mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              ScriptMaster <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-amber-500">AI</span>
            </h1>
            <p className="text-slate-400 text-sm">Estrategista Sênior de Conteúdo YouTube</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-xs font-medium text-slate-300">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Engine: Gemini 3 Pro Preview
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 w-full">
          <ScriptForm onSubmit={handleGenerate} isSubmitting={loading} />
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7 w-full sticky top-8">
          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center h-[600px] shadow-2xl">
              <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mb-6"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Construindo sua Estratégia...</h2>
              <p className="text-slate-400 max-w-xs">Analisando tendências de retenção e otimizando ganchos narrativos.</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-3xl p-8 flex flex-col items-center text-center h-[400px] justify-center shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Ops! Ocorreu um erro</h3>
              <p className="text-slate-400">{error}</p>
            </div>
          ) : result ? (
            <ScriptOutput result={result} />
          ) : (
            <div className="bg-slate-900/40 border border-dashed border-slate-700 rounded-3xl p-12 flex flex-col items-center justify-center text-center h-[600px]">
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-300 mb-2">Aguardando Parâmetros</h2>
              <p className="text-slate-500 max-w-sm">Preencha o formulário ao lado para gerar um roteiro otimizado para retenção máxima.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2024 ScriptMaster AI Strategy. Made for top-tier creators.</p>
      </footer>
    </div>
  );
};

export default App;
