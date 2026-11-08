import React, { useState, useEffect, useCallback } from 'react';
import { TuiTab, VimMode } from './types';
import { GruvboxTuiHeader } from './components/GruvboxTuiHeader';
import { GruvboxTuiStatusline } from './components/GruvboxTuiStatusline';
import { WhichKeyModal } from './components/WhichKeyModal';
import { AiTutorModal } from './components/AiTutorModal';

import { DashboardTab } from './components/tabs/DashboardTab';
import { Unidad1Tab } from './components/tabs/Unidad1Tab';
import { Unidad2Tab } from './components/tabs/Unidad2Tab';
import { Unidad3Tab } from './components/tabs/Unidad3Tab';
import { InteractiveSimulatorTab } from './components/tabs/InteractiveSimulatorTab';
import { RustCodeTab } from './components/tabs/RustCodeTab';
import { InformeAcademicTab } from './components/tabs/InformeAcademicTab';
import { DocxViewerTab } from './components/tabs/DocxViewerTab';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TuiTab>('dashboard');
  const [vimMode, setVimMode] = useState<VimMode>('NORMAL');
  const [whichKeyOpen, setWhichKeyOpen] = useState<boolean>(false);
  const [aiTutorOpen, setAiTutorOpen] = useState<boolean>(false);
  const [scanlineActive, setScanlineActive] = useState<boolean>(false);
  const [commandBuffer, setCommandBuffer] = useState<string>('');
  const [notification, setNotification] = useState<string>('');

  const triggerNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? '' : prev));
    }, 3500);
  }, []);

  // Keyboard navigation & Vim Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in an input/textarea, ignore global keybindings (except Esc)
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      if (e.key === 'Escape') {
        setVimMode('NORMAL');
        setWhichKeyOpen(false);
        setAiTutorOpen(false);
        setCommandBuffer('');
        return;
      }

      if (isInput) return;

      // Space opens Which-Key in Normal mode
      if (e.key === ' ' && vimMode === 'NORMAL') {
        e.preventDefault();
        setWhichKeyOpen((prev) => !prev);
        return;
      }

      // In Normal mode, number shortcuts switch tabs
      if (vimMode === 'NORMAL') {
        switch (e.key) {
          case '1':
            setCurrentTab('dashboard');
            triggerNotification('Buffer: src/dashboard.rs');
            break;
          case '2':
            setCurrentTab('unidad1');
            triggerNotification('Buffer: src/unidades/u1_definicion_modelos.rs');
            break;
          case '3':
            setCurrentTab('unidad2');
            triggerNotification('Buffer: src/unidades/u2_primer_orden.rs');
            break;
          case '4':
            setCurrentTab('unidad3');
            triggerNotification('Buffer: src/unidades/u3_masa_resorte.rs');
            break;
          case '5':
            setCurrentTab('simulador');
            triggerNotification('Buffer: src/simulador/oscilador_tui.rs');
            break;
          case '6':
            setCurrentTab('rust_code');
            triggerNotification('Buffer: Cargo.toml & src/main.rs');
            break;
          case '7':
            setCurrentTab('informe');
            triggerNotification('Buffer: docs/TRABAJO_FINAL_CTEV_UdeC.md');
            break;
          case '8':
            setCurrentTab('docx_export');
            triggerNotification('Buffer: Generador DOCX Normas APA 7');
            break;
          case ':':
            e.preventDefault();
            setVimMode('COMMAND');
            setCommandBuffer('');
            break;
          case 'i':
            setVimMode('INSERT');
            triggerNotification('-- INSERT MODE --');
            break;
          case 'v':
            setVimMode('VISUAL');
            triggerNotification('-- VISUAL MODE --');
            break;
          case 'q':
            if (whichKeyOpen) setWhichKeyOpen(false);
            if (aiTutorOpen) setAiTutorOpen(false);
            break;
          case 's':
            setCurrentTab('simulador');
            break;
          case 'p':
            window.print();
            break;
          case 'a':
            setAiTutorOpen(true);
            break;
          case 'j':
            window.scrollBy({ top: 120, behavior: 'smooth' });
            break;
          case 'k':
            window.scrollBy({ top: -120, behavior: 'smooth' });
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vimMode, whichKeyOpen, aiTutorOpen, triggerNotification]);

  // Command execution for ":" prompt
  const handleExecuteCommand = () => {
    const cmd = commandBuffer.trim().toLowerCase();
    setVimMode('NORMAL');
    setCommandBuffer('');

    if (cmd === 'w' || cmd === ':w') {
      triggerNotification('\"ctev_trabajo_final.rs\" [Escrito] 100% OK');
    } else if (cmd === 'q' || cmd === ':q') {
      triggerNotification('Proyecto guardado en memoria.');
    } else if (cmd === 'wq' || cmd === 'x') {
      triggerNotification('\"ctev_trabajo_final.rs\" guardado y validado.');
    } else if (cmd === '1' || cmd === 'dashboard') {
      setCurrentTab('dashboard');
    } else if (cmd === '2' || cmd === 'u1') {
      setCurrentTab('unidad1');
    } else if (cmd === '3' || cmd === 'u2') {
      setCurrentTab('unidad2');
    } else if (cmd === '4' || cmd === 'u3') {
      setCurrentTab('unidad3');
    } else if (cmd === '5' || cmd === 'sim' || cmd === 'simulador') {
      setCurrentTab('simulador');
    } else if (cmd === '6' || cmd === 'rust' || cmd === 'cargo') {
      setCurrentTab('rust_code');
    } else if (cmd === '7' || cmd === 'doc' || cmd === 'informe') {
      setCurrentTab('informe');
    } else if (cmd === '8' || cmd === 'docx' || cmd === 'word') {
      setCurrentTab('docx_export');
    } else if (cmd === 'help') {
      setWhichKeyOpen(true);
    } else if (cmd === 'crt') {
      setScanlineActive((prev) => !prev);
      triggerNotification(`Efecto CRT Scanlines: ${!scanlineActive ? 'Activado' : 'Desactivado'}`);
    } else if (cmd === 'tutor' || cmd === 'ia') {
      setAiTutorOpen(true);
    } else {
      triggerNotification(`Comando no reconocido: :${cmd} (Escribe :help para atajos)`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] flex flex-col font-mono relative selection:bg-[#fabd2f]/30 selection:text-[#fbf1c7]">
      {/* CRT Retro Scanline Overlay (Optional) */}
      {scanlineActive && (
        <div 
          className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-70"
          aria-hidden="true"
        />
      )}

      {/* LazyVim Bufferline Header */}
      <div className="sticky top-0 z-30 shadow-md">
        <GruvboxTuiHeader
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenWhichKey={() => setWhichKeyOpen(true)}
          onOpenAiTutor={() => setAiTutorOpen(true)}
          scanlineActive={scanlineActive}
          onToggleScanline={() => setScanlineActive((prev) => !prev)}
        />
      </div>

      {/* Main Tab Content */}
      <main className="flex-1 pb-16 pt-2">
        {currentTab === 'dashboard' && (
          <DashboardTab 
            onSelectTab={setCurrentTab} 
            onOpenAiTutor={() => setAiTutorOpen(true)} 
          />
        )}
        {currentTab === 'unidad1' && <Unidad1Tab />}
        {currentTab === 'unidad2' && <Unidad2Tab />}
        {currentTab === 'unidad3' && <Unidad3Tab onSelectTab={setCurrentTab} />}
        {currentTab === 'simulador' && <InteractiveSimulatorTab />}
        {currentTab === 'rust_code' && (
          <RustCodeTab onCopyNotification={triggerNotification} />
        )}
        {currentTab === 'informe' && <InformeAcademicTab />}
        {currentTab === 'docx_export' && (
          <DocxViewerTab onNotification={triggerNotification} />
        )}
      </main>

      {/* LazyVim Lualine Statusline & Command Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 shadow-2xl">
        <GruvboxTuiStatusline
          mode={vimMode}
          currentTab={currentTab}
          commandBuffer={commandBuffer}
          onCommandChange={setCommandBuffer}
          onExecuteCommand={handleExecuteCommand}
          notificationMessage={notification}
        />
      </div>

      {/* Floating Modals */}
      <WhichKeyModal
        isOpen={whichKeyOpen}
        onClose={() => setWhichKeyOpen(false)}
        onSelectTab={setCurrentTab}
        onOpenAiTutor={() => setAiTutorOpen(true)}
        onResetSimulation={() => triggerNotification('Oscilador reajustado a condiciones CTEV')}
        onPrintInforme={() => window.print()}
        onCopyRustCode={() => triggerNotification('✓ Código fuente copiado')}
      />

      <AiTutorModal
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
      />
    </div>
  );
}
