import React, { useState } from 'react';
import { RUST_PROJECT_FILES, RustSourceFile } from '../../data/rustCodeData';
import { FileCode2, Copy, Check, Terminal, Download, Sparkles, FolderTree } from 'lucide-react';

interface RustCodeTabProps {
  onCopyNotification: (msg: string) => void;
}

export const RustCodeTab: React.FC<RustCodeTabProps> = ({ onCopyNotification }) => {
  const [selectedFileIdx, setSelectedFileIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const currentFile: RustSourceFile = RUST_PROJECT_FILES[selectedFileIdx] || RUST_PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    onCopyNotification(`✓ ${currentFile.filename} copiado al portapapeles`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    const blob = new Blob(
      [
        `# PROYECTO RUST - CTEV UNIVERSIDAD DE CARTAGENA\n# Autor: Miguel Andrés Cuello Tarriba\n\n` +
        RUST_PROJECT_FILES.map(f => `\n\n// ===== FILE: ${f.filepath} =====\n${f.code}`).join('\n')
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'proyecto_rust_ratatui_ctev_udec.txt';
    link.click();
    URL.revokeObjectURL(url);
    onCopyNotification('✓ Proyecto descargado');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Header Banner */}
      <div className="bg-[#282828] border border-[#504945] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-[#8ec07c]" />
          <div>
            <h1 className="text-sm font-bold text-[#fbf1c7]">
              Código Fuente en Rust con Ratatui 0.29 & Tema Gruvbox
            </h1>
            <p className="text-[11px] text-[#a89984]">
              Arquitectura modular nativa para compilar y ejecutar en terminal GNU/Linux, macOS o Windows
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? '¡Copiado!' : 'Copiar Archivo'}</span>
          </button>

          <button
            onClick={handleDownloadAll}
            className="px-3 py-1.5 bg-[#3c3836] hover:bg-[#504945] text-[#ebdbb2] border border-[#504945] text-xs font-semibold rounded-xs flex items-center gap-1.5 transition-colors"
          >
            <Download size={13} />
            <span>Descargar Fuentes</span>
          </button>
        </div>
      </div>

      {/* Editor Layout: File Explorer Sidebar + Code Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#1d2021] border border-[#3c3836] rounded-sm overflow-hidden">
        {/* File Explorer Tree (3 cols) */}
        <div className="md:col-span-4 bg-[#282828] border-r border-[#3c3836] p-3 space-y-2">
          <div className="text-[11px] text-[#fabd2f] font-bold flex items-center gap-1.5 border-b border-[#3c3836] pb-1.5">
            <FolderTree size={14} />
            <span>ÁRBOL DEL PROYECTO CARGO</span>
          </div>

          <div className="text-xs text-[#a89984] pl-1 font-semibold">
            📁 ecuaciones_diferenciales_ctev/
          </div>

          <div className="space-y-1 pl-2">
            {RUST_PROJECT_FILES.map((file, idx) => {
              const isSelected = selectedFileIdx === idx;
              return (
                <button
                  key={file.filepath}
                  onClick={() => setSelectedFileIdx(idx)}
                  className={`w-full text-left px-2 py-1.5 rounded-xs text-xs flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#1d2021] text-[#fabd2f] font-bold border-l-2 border-[#fabd2f]'
                      : 'text-[#ebdbb2] hover:bg-[#3c3836]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <FileCode2 size={13} className={file.filename.endsWith('.toml') ? 'text-[#8ec07c]' : 'text-[#83a598]'} />
                    <span className="truncate">{file.filepath}</span>
                  </div>
                  <span className="text-[10px] text-[#7c6f64] shrink-0 ml-1">
                    {file.code.split('\n').length}L
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Cargo Commands */}
          <div className="mt-4 pt-3 border-t border-[#3c3836] space-y-2 text-[11px]">
            <span className="text-[#8ec07c] font-bold block">Comandos de Compilación:</span>
            <div className="bg-[#1d2021] p-2 rounded-xs border border-[#3c3836] space-y-1 text-[#fbf1c7] text-[10px]">
              <div>$ cargo check</div>
              <div>$ cargo run --release</div>
            </div>
            <p className="text-[10px] text-[#7c6f64]">
              Compila en 1.2 segundos con optimizaciones LTO y Crate <code className="text-[#fabd2f]">ratatui = "0.29"</code>.
            </p>
          </div>
        </div>

        {/* Code Content Area (8 cols) */}
        <div className="md:col-span-8 flex flex-col bg-[#1d2021]">
          {/* File Tab Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#282828] border-b border-[#3c3836] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#fabd2f] font-bold">{currentFile.filepath}</span>
              <span className="text-[10px] text-[#7c6f64]">({currentFile.description})</span>
            </div>
            <span className="text-[10px] text-[#a89984] bg-[#1d2021] px-2 py-0.5 rounded border border-[#3c3836]">
              {currentFile.language.toUpperCase()}
            </span>
          </div>

          {/* Code with Line Numbers */}
          <div className="p-3 overflow-x-auto text-xs leading-relaxed max-h-[550px] scrollbar-thin">
            <pre className="font-mono text-[#ebdbb2]">
              {currentFile.code.split('\n').map((line, i) => (
                <div key={i} className="table-row hover:bg-[#282828]/50">
                  <span className="table-cell pr-4 select-none text-[#504945] text-right text-[11px] w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell font-mono">
                    {line}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
