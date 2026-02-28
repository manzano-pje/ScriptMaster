
export type CreationMode = 'Automático' | 'Roteiro Manual';
export type Platform = 'YouTube Longo' | 'Shorts';
export type Presentation = 'Com avatar' | 'Sem avatar' | 'Apenas roteiro';

export interface ScriptParams {
  mode: CreationMode;
  theme: string;
  audience: string;
  objective: string;
  platform: Platform;
  duration: string;
  depth: string;
  style: string;
  tone: string;
  emotion: string;
  authority: string;
  cta: string;
  presentation: Presentation;
  baseScript?: string;
  isViralPotential: boolean;
}

export interface ScriptStructureItem {
  time: string;
  label: string;
  content: string;
}

export interface ScriptResult {
  hook: string;
  promise: string;
  structure: ScriptStructureItem[];
  microHooks: string[];
  bRollSuggestions: string[];
  avatarInstructions?: {
    intonation: string;
    pauses: string;
    bodyLanguage: string;
    expressions: string;
  };
  optimizedTitle: string;
  optimizedDescription: string;
  tags: string[];
  thumbnailConcept: {
    text: string;
    expression: string;
    element: string;
    color: string;
  };
  fullScriptContent: string;
}
