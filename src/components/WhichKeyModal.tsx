import React from 'react';
import { TuiTab } from '../types';
import { X, Command, Sliders, FileCode, FileText, Sparkles, Printer, RotateCcw } from 'lucide-react';

interface WhichKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TuiTab) => void;
  onOpenAiTutor: () => void;
  onResetSimulation: () => void;
  onPrintInforme: () => void;
  onCopyRustCode: () => void;
}

export const WhichKeyModal: React.FC<WhichKeyModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenAiTutor,
  onResetSimulation,
  onPrintInforme,
  onCopyRustCode,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs font-mono p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#1d2021] border-2 border-[#fabd2f] shadow-2xl rounded-sm overflow-hidden text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with double border look */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#282828] border-b border-[#3c3836]">
          <div className="flex items-center gap-2">
            <Command size={14} className="text-[#fabd2f]" />
            <span className="text-[#fbf1c7] font-bold tracking-wide">
              LazyVim Which-Key Menu · &lt;Leader&gt; = &lt;Space&gt;
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a89984] hover:text-[#fb4934] transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Shortcuts grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1d2021] text-[#ebdbb2]">
          {/* Navegación de Unidades */}
          <div className="space-y-1.5 border border-[#3c3836] p-2.5 bg-[#282828]/50">
            <div className="text-[#fabd2f] font-bold text-[11px] mb-2 flex items-center justify-between border-b border-[#3c3836] pb-1">
              <span>󱔗 PESTAÑAS Y MODULOS</span>
              <span className="text-[#7c6f64] text-[10px]">1..7</span>
            </div>
            
            <button
              onClick={() => { onSelectTab('dashboard'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.2 rounded font-bold">1</span>
                <span className="text-[#ebdbb2]">Dashboard General</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#fabd2f]">dashboard.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('unidad1'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.2 rounded font-bold">2</span>
                <span className="text-[#ebdbb2]">Unidad 1: Clasificación & Modelos</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#fabd2f]">u1.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('unidad2'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.2 rounded font-bold">3</span>
                <span className="text-[#ebdbb2]">Unidad 2: Métodos 1er Orden</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#fabd2f]">u2.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('unidad3'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.2 rounded font-bold">4</span>
                <span className="text-[#ebdbb2]">Unidad 3: Masa-Resorte & Newton</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#fabd2f]">u3.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('simulador'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#b8bb26] text-[#282828] px-1.5 py-0.2 rounded font-bold">5</span>
                <span className="text-[#ebdbb2] font-semibold">Simulador TUI Interactivo</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#b8bb26]">sim.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('rust_code'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#83a598] text-[#282828] px-1.5 py-0.2 rounded font-bold">6</span>
                <span className="text-[#ebdbb2]">Código Fuente Rust / Cargo</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#83a598]">main.rs</span>
            </button>

            <button
              onClick={() => { onSelectTab('informe'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#d3869b] text-[#282828] px-1.5 py-0.2 rounded font-bold">7</span>
                <span className="text-[#ebdbb2]">Informe Académico UdeC</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#d3869b]">doc.md</span>
            </button>

            <button
              onClick={() => { onSelectTab('docx_export'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.2 rounded font-bold">8</span>
                <span className="text-[#fabd2f] font-semibold">Generar Documento .DOCX</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#fabd2f]">doc.docx</span>
            </button>

            <button
              onClick={() => { onSelectTab('capturas'); onClose(); }}
              className="w-full text-left flex items-center justify-between py-1 px-1.5 rounded hover:bg-[#3c3836] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="bg-[#8ec07c] text-[#282828] px-1.5 py-0.2 rounded font-bold">9</span>
                <span className="text-[#8ec07c] font-semibold">Galería de Capturas TUI</span>
              </div>
              <span className="text-[#7c6f64] group-hover:text-[#8ec07c]">img.png</span>
            </button>
          </div>

          {/* Acciones Rápidas */}
          <div className="space-y-2 border border-[#3c3836] p-2.5 bg-[#282828]/50">
            <div className="text-[#83a598] font-bold text-[11px] mb-2 flex items-center justify-between border-b border-[#3c3836] pb-1">
              <span>󰘳 ACCIONES Y HERRAMIENTAS</span>
              <span className="text-[#7c6f64] text-[10px]">Leader commands</span>
            </div>

            <button
              onClick={() => { onOpenAiTutor(); onClose(); }}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-[#fe8019]/10 hover:bg-[#fe8019]/25 border border-[#fe8019]/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#fe8019]" />
                <span className="text-[#fbf1c7] font-semibold">Tutor IA Ecuaciones Diferenciales</span>
              </div>
              <kbd className="bg-[#fe8019] text-[#282828] px-1.5 py-0.5 rounded font-bold text-[10px]">a</kbd>
            </button>

            <button
              onClick={() => { onResetSimulation(); onClose(); }}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-[#3c3836]/60 hover:bg-[#3c3836] transition-colors"
            >
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-[#fabd2f]" />
                <span className="text-[#ebdbb2]">Reiniciar Parámetros Oscilador</span>
              </div>
              <kbd className="bg-[#fabd2f] text-[#282828] px-1.5 py-0.5 rounded font-bold text-[10px]">r</kbd>
            </button>

            <button
              onClick={() => { onPrintInforme(); onClose(); }}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-[#3c3836]/60 hover:bg-[#3c3836] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Printer size={14} className="text-[#b8bb26]" />
                <span className="text-[#ebdbb2]">Imprimir / Exportar a PDF (CTEV)</span>
              </div>
              <kbd className="bg-[#b8bb26] text-[#282828] px-1.5 py-0.5 rounded font-bold text-[10px]">p</kbd>
            </button>

            <button
              onClick={() => { onCopyRustCode(); onClose(); }}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-[#3c3836]/60 hover:bg-[#3c3836] transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileCode size={14} className="text-[#8ec07c]" />
                <span className="text-[#ebdbb2]">Copiar Código Fuente en Rust</span>
              </div>
              <kbd className="bg-[#8ec07c] text-[#282828] px-1.5 py-0.5 rounded font-bold text-[10px]">c</kbd>
            </button>

            <div className="pt-2 text-[10px] text-[#928374] border-t border-[#3c3836] flex items-center justify-between">
              <span>Presiona cualquier letra o número para saltar</span>
              <span className="text-[#fb4934] font-semibold">&lt;Esc&gt; o q para cerrar</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-1.5 bg-[#282828] border-t border-[#3c3836] text-[#a89984] text-[11px] flex items-center justify-between">
          <span>Universidad de Cartagena · CTEV</span>
          <span className="text-[#fabd2f]">LazyVim + Ratatui v0.29 Gruvbox</span>
        </div>
      </div>
    </div>
  );
};
