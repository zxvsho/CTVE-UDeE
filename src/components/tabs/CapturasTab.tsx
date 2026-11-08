import React from 'react';
import { Camera, Download, Terminal, Sliders, Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import dashboardImg from '../../assets/images/ratatui_dashboard_gruvbox_1794106827924.jpg';
import oscillatorImg from '../../assets/images/ratatui_oscillator_simulation_1794106827806.jpg';

interface CapturasTabProps {
  onNotification?: (msg: string) => void;
}

export const CapturasTab: React.FC<CapturasTabProps> = ({ onNotification }) => {
  const downloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    link.click();
    onNotification?.(`✓ Captura ${filename} descargada`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-8 max-w-5xl mx-auto font-mono text-[#ebdbb2]">
      {/* Top Banner */}
      <div className="bg-[#282828] border-2 border-[#fabd2f] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#fabd2f] font-bold text-sm">
            <Camera size={18} />
            <span>Galería de Capturas del Sistema TUI (Ratatui + LazyVim + Gruvbox)</span>
          </div>
          <p className="text-xs text-[#a89984]">
            Evidencias visuales de alta resolución de la interfaz de consola, simulaciones físicas y módulos matemáticos para presentaciones o entregas.
          </p>
        </div>
      </div>

      {/* Captura 1: Dashboard General */}
      <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm overflow-hidden shadow-xl space-y-3 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3c3836] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#fabd2f]">
              <Terminal size={14} />
              <span>CAPTURA 1: Dashboard Principal y Módulos Curriculares CTEV</span>
            </div>
            <p className="text-[11px] text-[#a89984] mt-0.5">
              Bufferline superior LazyVim, Banner ASCII institucional, tarjetas modulares de Unidades 1, 2 y 3 y barra Lualine.
            </p>
          </div>

          <button
            onClick={() => downloadImage(dashboardImg, 'captura_1_dashboard_ratatui_gruvbox.jpg')}
            className="px-3 py-1.5 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Download size={13} />
            <span>Descargar Captura 1</span>
          </button>
        </div>

        {/* Imagen renderizada */}
        <div className="rounded border border-[#504945] overflow-hidden bg-black/40">
          <img
            src={dashboardImg}
            alt="Captura 1: Dashboard Ratatui Gruvbox"
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>

        <div className="text-xs bg-[#282828] p-3 rounded-xs border border-[#3c3836] space-y-1.5">
          <span className="text-[#fabd2f] font-bold block text-[11px]">¿Cómo funciona este panel?</span>
          <p className="text-[#ebdbb2] text-[11px] leading-relaxed">
            Permite la navegación multimodal entre los tres módulos del curso. Cada bloque de Ratatui resume el problema de ingeniería asociado: refrigeración de transformadores por la Ley de Enfriamiento de Newton (Unidad 1), homogenización de salinidad en tanques por Factor Integrante (Unidad 2), y control de vibraciones de electrobomba por la 2da Ley de Newton (Unidad 3).
          </p>
        </div>
      </div>

      {/* Captura 2: Simulador Dinámico del Oscilador */}
      <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm overflow-hidden shadow-xl space-y-3 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3c3836] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#8ec07c]">
              <Sliders size={14} />
              <span>CAPTURA 2: Laboratorio TUI del Oscilador Masa-Resorte Amortiguado</span>
            </div>
            <p className="text-[11px] text-[#a89984] mt-0.5">
              Esquema mecánico dinámico en ASCII, oscilograma de onda x(t), plano de fase en espiral (x vs v) y cálculo del discriminante Δ.
            </p>
          </div>

          <button
            onClick={() => downloadImage(oscillatorImg, 'captura_2_simulador_oscilador_ratatui.jpg')}
            className="px-3 py-1.5 bg-[#8ec07c] text-[#282828] hover:bg-[#b8bb26] font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Download size={13} />
            <span>Descargar Captura 2</span>
          </button>
        </div>

        {/* Imagen renderizada */}
        <div className="rounded border border-[#504945] overflow-hidden bg-black/40">
          <img
            src={oscillatorImg}
            alt="Captura 2: Simulador Oscilador Masa Resorte Ratatui"
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>

        <div className="text-xs bg-[#282828] p-3 rounded-xs border border-[#3c3836] space-y-1.5">
          <span className="text-[#8ec07c] font-bold block text-[11px]">¿Cómo funciona la simulación física?</span>
          <p className="text-[#ebdbb2] text-[11px] leading-relaxed">
            El motor de integración numérica Runge-Kutta 4 (RK4) calcula 300 pasos temporales continuos resolviendo la ecuación diferencial m x'' + c x' + k x = F0 cos(ω t). Detecta automáticamente el signo del discriminante Δ = c² - 4mk = -156 &lt; 0 (Régimen Subamortiguado) y calcula la trayectoria del plano de fase (posición x vs velocidad v) que converge en espiral hacia el atractor de reposo o ciclo límite forzado.
          </p>
        </div>
      </div>
    </div>
  );
};
