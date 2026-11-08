import React from 'react';
import { TuiTab } from '../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Binary, 
  Activity, 
  Sliders, 
  FileCode2, 
  FileText,
  Terminal,
  Sparkles,
  Command,
  Monitor,
  Download
} from 'lucide-react';

interface GruvboxTuiHeaderProps {
  currentTab: TuiTab;
  onSelectTab: (tab: TuiTab) => void;
  onOpenWhichKey: () => void;
  onOpenAiTutor: () => void;
  scanlineActive: boolean;
  onToggleScanline: () => void;
}

const TABS: { id: TuiTab; key: string; label: string; icon: React.ReactNode; ext: string }[] = [
  { id: 'dashboard', key: '1', label: 'Dashboard', icon: <LayoutDashboard size={14} />, ext: 'rs' },
  { id: 'unidad1', key: '2', label: 'U1: Definición', icon: <BookOpen size={14} />, ext: 'rs' },
  { id: 'unidad2', key: '3', label: 'U2: 1er Orden', icon: <Binary size={14} />, ext: 'rs' },
  { id: 'unidad3', key: '4', label: 'U3: Masa-Resorte', icon: <Activity size={14} />, ext: 'rs' },
  { id: 'simulador', key: '5', label: 'Simulador TUI', icon: <Sliders size={14} />, ext: 'rs' },
  { id: 'rust_code', key: '6', label: 'Código Rust', icon: <FileCode2 size={14} />, ext: 'rs' },
  { id: 'informe', key: '7', label: 'Informe CTEV', icon: <FileText size={14} />, ext: 'md' },
  { id: 'docx_export', key: '8', label: 'Descargar DOCX', icon: <Download size={14} />, ext: 'docx' },
];

export const GruvboxTuiHeader: React.FC<GruvboxTuiHeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenWhichKey,
  onOpenAiTutor,
  scanlineActive,
  onToggleScanline,
}) => {
  return (
    <header className="bg-[#1d2021] border-b border-[#3c3836] select-none text-xs font-mono">
      {/* Top OS / Neovim Titlebar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#282828] border-b border-[#3c3836]">
        <div className="flex items-center gap-2">
          {/* Terminal Dots with Gruvbox colors */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fb4934] inline-block opacity-90" title="Cerrar" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#fabd2f] inline-block opacity-90" title="Minimizar" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#b8bb26] inline-block opacity-90" title="Maximizar" />
          </div>

          <Terminal size={14} className="text-[#fabd2f]" />
          <span className="text-[#ebdbb2] font-semibold tracking-wide">
            ratatui-lazyvim
          </span>
          <span className="text-[#7c6f64]">::</span>
          <span className="text-[#83a598]">ctev-ude-c</span>
          <span className="text-[#7c6f64]">·</span>
          <span className="text-[#a89984] text-[11px] hidden sm:inline">
            Ecuaciones Diferenciales — Trabajo Final Miguel Cuello
          </span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleScanline}
            title="Alternar filtro CRT / Scanlines retro"
            className={`px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors ${
              scanlineActive 
                ? 'bg-[#b8bb26]/20 text-[#b8bb26] border border-[#b8bb26]/40' 
                : 'text-[#a89984] hover:bg-[#3c3836] hover:text-[#ebdbb2]'
            }`}
          >
            <Monitor size={12} />
            <span className="hidden md:inline">CRT FX</span>
          </button>

          <button
            onClick={onOpenAiTutor}
            title="Consultar al Tutor IA de Ecuaciones Diferenciales CTEV"
            className="px-2 py-0.5 rounded text-[11px] bg-[#fe8019]/20 text-[#fe8019] hover:bg-[#fe8019]/30 border border-[#fe8019]/40 flex items-center gap-1 font-semibold transition-colors"
          >
            <Sparkles size={12} />
            <span>Tutor IA UdeC</span>
          </button>

          <button
            onClick={onOpenWhichKey}
            title="Abrir menú de atajos LazyVim Which-Key (<Space>)"
            className="px-2 py-0.5 rounded text-[11px] bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold flex items-center gap-1 transition-colors"
          >
            <Command size={12} />
            <span>&lt;Space&gt; Keymap</span>
          </button>
        </div>
      </div>

      {/* LazyVim Bufferline Tabs */}
      <div className="flex items-center overflow-x-auto scrollbar-none bg-[#1d2021]">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors border-r border-[#3c3836] shrink-0 ${
                isActive
                  ? 'bg-[#282828] text-[#fabd2f] font-semibold border-b-2 border-b-[#fabd2f]'
                  : 'text-[#a89984] hover:bg-[#282828]/60 hover:text-[#ebdbb2]'
              }`}
            >
              <span className={`text-[10px] px-1 rounded ${isActive ? 'bg-[#fabd2f] text-[#282828] font-bold' : 'bg-[#3c3836] text-[#928374]'}`}>
                {tab.key}
              </span>
              <span className={isActive ? 'text-[#fabd2f]' : 'text-[#83a598]'}>
                {tab.icon}
              </span>
              <span className="text-[12px]">{tab.label}</span>
              <span className="text-[10px] text-[#7c6f64]">.{tab.ext}</span>
            </button>
          );
        })}

        <div className="flex-1 bg-[#1d2021] min-w-[20px]" />
      </div>
    </header>
  );
};
