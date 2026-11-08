import React, { useState } from 'react';
import { X, Globe, CheckCircle2, Copy, Check, Terminal, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const gitCommands = `# 1. Inicializar git en la carpeta del proyecto
git init
git add .
git commit -m "Trabajo Final Ecuaciones Diferenciales - UdeC CTEV"

# 2. Conectar con tu repositorio de GitHub
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 3. Subir los archivos (GitHub Actions desplegará la web automáticamente)
git push -u origin main`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs font-mono p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-[#1d2021] border-2 border-[#b8bb26] shadow-2xl rounded-sm overflow-hidden text-xs flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#282828] border-b border-[#3c3836]">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-[#b8bb26]" />
            <div>
              <span className="text-[#fbf1c7] font-bold text-sm">
                Guía de Activación en GitHub Pages
              </span>
              <span className="text-[10px] text-[#a89984] block">
                Tu aplicación ya está 100% optimizada para publicarse como página web estática pública
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a89984] hover:text-[#fb4934] transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 bg-[#1d2021] text-[#ebdbb2]">
          {/* Status Badge */}
          <div className="bg-[#282828] border border-[#b8bb26]/50 p-3 rounded-xs flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[#b8bb26] shrink-0" />
            <div className="text-[11px]">
              <span className="text-[#b8bb26] font-bold block">✓ Configuración para GitHub Pages Lista:</span>
              <span className="text-[#a89984]">
                Se configuró <code className="text-[#fabd2f] bg-[#1d2021] px-1 rounded">base: './'</code> en <code className="text-[#8ec07c]">vite.config.ts</code> y se generó el flujo automático en <code className="text-[#83a598]">.github/workflows/deploy.yml</code>.
              </span>
            </div>
          </div>

          {/* Pasos */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#fabd2f]">
              Pasos para Activar tu Web en GitHub (2 minutos):
            </div>

            {/* Paso 1 */}
            <div className="bg-[#282828] p-3 rounded-xs border border-[#3c3836] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8ec07c]">
                <span>Paso 1: Crear el repositorio en GitHub</span>
                <span className="text-[10px] text-[#a89984]">github.com/new</span>
              </div>
              <p className="text-[11px] text-[#a89984]">
                Entra a GitHub y crea un repositorio público (ej. <code className="text-[#fabd2f]">ecuaciones-diferenciales-ctev</code>). No agregues README ni .gitignore inicial porque ya están configurados aquí.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-[#282828] p-3 rounded-xs border border-[#3c3836] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8ec07c]">
                <span>Paso 2: Subir tu código a GitHub</span>
                <button
                  onClick={() => copyToClipboard(gitCommands, 2)}
                  className="px-2 py-0.5 bg-[#3c3836] hover:bg-[#504945] text-[#ebdbb2] rounded text-[10px] flex items-center gap-1 transition-colors"
                >
                  {copiedStep === 2 ? <Check size={11} className="text-[#b8bb26]" /> : <Copy size={11} />}
                  <span>{copiedStep === 2 ? 'Copiado' : 'Copiar comandos'}</span>
                </button>
              </div>
              <pre className="bg-[#1d2021] p-2.5 rounded text-[10px] text-[#fbf1c7] font-mono overflow-x-auto border border-[#3c3836]">
                {gitCommands}
              </pre>
            </div>

            {/* Paso 3 */}
            <div className="bg-[#282828] p-3 rounded-xs border border-[#3c3836] space-y-1.5">
              <div className="text-xs font-semibold text-[#8ec07c]">
                <span>Paso 3: Activar GitHub Pages en el repositorio</span>
              </div>
              <p className="text-[11px] text-[#a89984] leading-relaxed">
                En tu repositorio en GitHub:
              </p>
              <ol className="list-decimal pl-5 text-[11px] text-[#ebdbb2] space-y-1">
                <li>Ve a la pestaña <strong>Settings</strong> (Configuración).</li>
                <li>En el menú izquierdo, haz clic en <strong>Pages</strong>.</li>
                <li>En <strong>Build and deployment &gt; Source</strong>, selecciona: <strong className="text-[#fabd2f]">GitHub Actions</strong>.</li>
                <li>¡Listo! El flujo <code className="text-[#83a598]">deploy.yml</code> se ejecutará y tu página estará disponible en vivo en <code className="text-[#b8bb26]">https://TU_USUARIO.github.io/TU_REPOSITORIO/</code>.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#282828] border-t border-[#3c3836] flex items-center justify-between text-xs">
          <span className="text-[#a89984]">CTEV · Universidad de Cartagena</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#b8bb26] text-[#282828] hover:bg-[#8ec07c] font-bold rounded-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
