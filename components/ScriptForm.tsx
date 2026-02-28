
import React, { useState } from 'react';
import { ScriptParams, CreationMode, Platform, Presentation } from '../types';
import { DEPTH_OPTIONS, STYLE_OPTIONS, TONE_OPTIONS, EMOTION_OPTIONS, AUTHORITY_OPTIONS, CTA_OPTIONS } from '../constants';

interface Props {
  onSubmit: (params: ScriptParams) => void;
  isSubmitting: boolean;
}

const ScriptForm: React.FC<Props> = ({ onSubmit, isSubmitting }) => {
  const [params, setParams] = useState<ScriptParams>({
    mode: 'Automático',
    theme: '',
    audience: '',
    objective: '',
    platform: 'YouTube Longo',
    duration: '10 minutos',
    depth: DEPTH_OPTIONS[1],
    style: STYLE_OPTIONS[0],
    tone: TONE_OPTIONS[0],
    emotion: EMOTION_OPTIONS[0],
    authority: AUTHORITY_OPTIONS[0],
    cta: CTA_OPTIONS[0],
    presentation: 'Com avatar',
    isViralPotential: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setParams(prev => ({ ...prev, [name]: checked }));
    } else {
      setParams(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Configurações do Roteiro</h2>
        <div className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">Setup</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Modo de Criação</label>
          <select 
            name="mode" 
            value={params.mode} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
          >
            <option value="Automático">Automático</option>
            <option value="Roteiro Manual">Roteiro Manual</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Plataforma</label>
          <select 
            name="platform" 
            value={params.platform} 
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all cursor-pointer"
          >
            <option value="YouTube Longo">YouTube Longo</option>
            <option value="Shorts">Shorts</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase">Tema do Vídeo</label>
        <input 
          type="text" 
          name="theme" 
          placeholder="Ex: Como crescer no YouTube em 2024"
          value={params.theme}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Público Alvo</label>
          <input 
            type="text" 
            name="audience" 
            placeholder="Ex: Empreendedores"
            value={params.audience}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Duração / Objetivo</label>
          <input 
            type="text" 
            name="duration" 
            placeholder="Ex: 12 min / Venda"
            value={params.duration}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
        </div>
      </div>

      {params.mode === 'Roteiro Manual' && (
        <div className="space-y-2 animate-in fade-in duration-300">
          <label className="text-xs font-semibold text-slate-400 uppercase">Roteiro Base</label>
          <textarea 
            name="baseScript"
            value={params.baseScript}
            onChange={handleChange}
            rows={4}
            placeholder="Cole seu roteiro rascunho aqui para otimização..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Estilo</label>
          <select name="style" value={params.style} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            {STYLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Tom</label>
          <select name="tone" value={params.tone} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            {TONE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Emoção</label>
          <select name="emotion" value={params.emotion} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            {EMOTION_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase">Apresentação</label>
          <select name="presentation" value={params.presentation} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white">
            <option value="Com avatar">Com avatar</option>
            <option value="Sem avatar">Sem avatar</option>
            <option value="Apenas roteiro">Apenas roteiro</option>
          </select>
        </div>
      </div>

      {/* Special Toggle */}
      <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${params.isViralPotential ? 'bg-red-500/10 border-red-500/50' : 'bg-slate-800/50 border-slate-700'}`} onClick={() => setParams(prev => ({ ...prev, isViralPotential: !prev.isViralPotential }))}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${params.isViralPotential ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.450 1.348c.067.121.11.27.114.44a1.144 1.144 0 01-1.293 1.22 4.708 4.708 0 00-3.508 8.522s.087.044.087.052c.034.02.044.052.048.092.004.041.001.079-.002.11a5.2 5.2 0 01-.038.721 7.634 7.634 0 007.278-4.435 4.47 4.47 0 002.816-4.944 3.746 3.746 0 00-4.045-3.126zm-6.21 12.641a3.984 3.984 0 01-.03-.02l-.019-.012a4.772 4.772 0 01-.033-.022 9.988 9.988 0 01-.352-.27c-.41-.322-.756-.628-1.04-.901a3.69 3.69 0 01-.783-1.079 2.235 2.235 0 01-.151-.774 1.309 1.309 0 01.155-.64 2.1 2.1 0 01.51-.647 6.16 6.16 0 01.202-.166l.016-.013.017-.013a2.852 2.852 0 01.25-.191 4.676 4.676 0 01.444-.268 3.977 3.977 0 01.579-.232c.753-.242 1.613-.305 2.443-.305.458 0 .912.017 1.352.06a2.731 2.731 0 01.733.148 1.45 1.45 0 01.662.403c.283.303.45.692.45 1.116 0 .654-.443 1.25-1.136 1.391a3.665 3.665 0 01-.93.1c-.074 0-.15-.002-.225-.004-.232-.001-.463-.008-.68-.025a1.124 1.124 0 00-.557.085c-.136.053-.246.145-.304.252a1.24 1.24 0 00-.114.333c-.033.172-.026.347-.014.527.027.273.049.55.049.827 0 .239-.015.478-.047.715a1.277 1.277 0 01-.065.382.996.996 0 01-.258.424 1.483 1.483 0 01-.456.342c-.19.11-.399.16-.612.163-.353.005-.7-.072-1.013-.23z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Potencial Viral</p>
            <p className="text-[10px] text-slate-500">Retenção agressiva e gatilhos psicológicos</p>
          </div>
        </div>
        <input 
          type="checkbox" 
          name="isViralPotential" 
          checked={params.isViralPotential} 
          onChange={handleChange}
          className="w-5 h-5 accent-red-500"
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <span>Estrategizando...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Gerar Roteiro Viral</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ScriptForm;
