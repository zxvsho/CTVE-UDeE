import React from 'react';
import { VimMode, TuiTab } from '../types';
import { GitBranch, CheckCircle2, ShieldAlert, FileCode } from 'lucide-react';

interface GruvboxTuiStatuslineProps {
  mode: VimMode;
  currentTab: TuiTab;
  commandBuffer: string;
  onCommandChange: (val: string) => void;
  onExecuteCommand: () => void;
  notificationMessage?: string;
}

const TAB_TO_FILE: Record<TuiTab, { path: string; lines: number; col: number }> = {
  dashboard: { path: 'src/dashboard.rs', lines: 114, col: 1 },
  unidad1: { path: 'src/unidades/u1_definicion_modelos.rs', lines: 186, col: 14 },
  unidad2: { path: 'src/unidades/u2_primer_orden.rs', lines: 242, col: 28 },
  unidad3: { path: 'src/unidades/u3_masa_resorte.rs', lines: 320, col: 45 },
  simulador: { path: 'src/simulador/oscilador_tui.rs', lines: 410, col: 12 },
  rust_code: { path: 'src/main.rs', lines: 280, col: 8 },
  informe: { path: 'docs/TRABAJO_FINAL_CTEV_UdeC.md', lines: 520, col: 1 },
  docx_export: { path: 'docs/TRABAJO_FINAL_APA7.docx', lines: 650, col: 1 },
};

export const GruvboxTuiStatusline: React.FC<GruvboxTuiStatuslineProps> = ({
  mode,
  currentTab,
  commandBuffer,
  onCommandChange,
  onExecuteCommand,
  notificationMessage,
}) => {
  const fileInfo = TAB_TO_FILE[currentTab];

  const modeBadge = {
    NORMAL: { bg: 'bg-[#fabd2f]', fg: 'text-[#282828]', label: 'NORMAL' },
    INSERT: { bg: 'bg-[#b8bb26]', fg: 'text-[#282828]', label: 'INSERT' },
    VISUAL: { bg: 'bg-[#fe8019]', fg: 'text-[#282828]', label: 'VISUAL' },
    COMMAND: { bg: 'bg-[#fb4934]', fg: 'text-[#fbf1c7]', label: 'COMMAND' },
  }[mode];

  return (
    <div className="bg-[#1d2021] border-t border-[#3c3836] font-mono text-xs select-none">
      {/* Lualine Status bar */}
      <div className="flex items-center justify-between bg-[#282828] text-[#ebdbb2] border-t border-[#3c3836]">
        {/* Left Section: Mode, Git branch, File */}
        <div className="flex items-center">
          <div className={`${modeBadge.bg} ${modeBadge.fg} font-bold px-2.5 py-1 tracking-wider`}>
            {modeBadge.label}
          </div>

          <div className="flex items-center gap-1 bg-[#3c3836] text-[#d5c4a1] px-2.5 py-1 border-r border-[#504945]">
            <GitBranch size={12} className="text-[#83a598]" />
            <span className="text-[11px]">main</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#282828] text-[#ebdbb2]">
            <FileCode size={12} className="text-[#fabd2f]" />
            <span className="text-[11px] font-medium">{fileInfo.path}</span>
            <span className="text-[10px] text-[#b8bb26]">[+]</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2 py-1 text-[10px] text-[#a89984]">
            <span className="flex items-center gap-0.5 text-[#b8bb26]">
              <CheckCircle2 size={11} /> 0
            </span>
            <span className="flex items-center gap-0.5 text-[#83a598]">
              <ShieldAlert size={11} /> 0 err
            </span>
          </div>
        </div>

        {/* Right Section: CTEV info, Encoding, Position */}
        <div className="flex items-center">
          <div className="hidden lg:flex items-center px-2 py-1 bg-[#32302f] text-[#8ec07c] text-[11px] border-l border-[#3c3836]">
            CTEV · Universidad de Cartagena
          </div>

          <div className="hidden sm:flex items-center px-2 py-1 bg-[#3c3836] text-[#a89984] text-[11px] border-l border-[#504945]">
            utf-8 │ rust 1.82 │ ratatui
          </div>

          <div className="bg-[#fabd2f]/10 text-[#fabd2f] font-semibold px-2.5 py-1 border-l border-[#504945] text-[11px]">
            Ln {fileInfo.lines}, Col {fileInfo.col}
          </div>
        </div>
      </div>

      {/* Neovim Command Line & Prompt Bar */}
      <div className="px-3 py-1 bg-[#1d2021] text-[#a89984] flex items-center justify-between text-[11px]">
        {mode === 'COMMAND' ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onExecuteCommand();
            }}
            className="flex items-center gap-1.5 flex-1"
          >
            <span className="text-[#fb4934] font-bold">:</span>
            <input
              type="text"
              value={commandBuffer}
              onChange={(e) => onCommandChange(e.target.value)}
              placeholder="Escribe :w (guardar), :q (cerrar), :1..7 (pestaña), :help..."
              className="bg-transparent border-none outline-none text-[#fbf1c7] font-mono text-[11px] flex-1"
              autoFocus
            />
            <span className="text-[10px] text-[#7c6f64]">&lt;Enter&gt; ejecutar │ &lt;Esc&gt; cancelar</span>
          </form>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 text-[#928374] truncate">
              {notificationMessage ? (
                <span className="text-[#fabd2f] font-semibold animate-pulse">
                  {notificationMessage}
                </span>
              ) : (
                <>
                  <span className="text-[#83a598]">
                    <kbd className="text-[#fabd2f] font-bold">&lt;Space&gt;</kbd> which-key
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#ebdbb2] font-semibold">1-7</kbd> pestañas
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#ebdbb2] font-semibold">j / k</kbd> navegar
                  </span>
                  <span>·</span>
                  <span>
                    <kbd className="text-[#ebdbb2] font-semibold">:</kbd> comando
                  </span>
                  <span>·</span>
                  <span className="hidden sm:inline">
                    <kbd className="text-[#ebdbb2] font-semibold">r</kbd> oscilador
                  </span>
                </>
              )}
            </div>

            <div className="text-[10px] text-[#7c6f64] shrink-0 ml-2">
              Ratatui Engine v0.29 · Gruvbox Dark
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
