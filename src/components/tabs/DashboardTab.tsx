import React from 'react';
import { ACADEMIC_PROJECT_INFO, UNIDAD_1_DATA, UNIDAD_2_DATA, UNIDAD_3_DATA } from '../../data/ctevWorkData';
import { MathView } from '../MathView';
import { TuiTab } from '../../types';
import { 
  GraduationCap, 
  BookOpen, 
  Binary, 
  Activity, 
  Sliders, 
  FileCode2, 
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';

interface DashboardTabProps {
  onSelectTab: (tab: TuiTab) => void;
  onOpenAiTutor: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ onSelectTab, onOpenAiTutor }) => {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Gruvbox Retro ASCII Banner */}
      <div className="bg-[#1d2021] border border-[#504945] rounded-sm p-4 relative overflow-hidden shadow-lg">
        <div className="text-[10px] sm:text-xs text-[#fabd2f] leading-none whitespace-pre select-none font-bold overflow-x-auto pb-2">
{`   _____ _______ ________      __   _    _ _____       ______ 
  / ____|__   __|  ____\\ \\    / /  | |  | |  __ \\     |  ____|
 | |       | |  | |__   \\ \\  / /   | |  | | |  | | ___| |__   
 | |       | |  |  __|   \\ \\/ /    | |  | | |  | |/ _ \\  __|  
 | |____   | |  | |____   \\  /     | |__| | |__| |  __/ |____ 
  \\_____|  |_|  |______|   \\/       \\____/|_____/ \\___|______|
`}
        </div>

        <div className="mt-2 pt-3 border-t border-[#3c3836] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 text-[#fabd2f] font-bold text-sm">
              <GraduationCap size={16} />
              <span>{ACADEMIC_PROJECT_INFO.institution} · {ACADEMIC_PROJECT_INFO.faculty}</span>
            </div>
            <p className="text-[#a89984] text-[11px] mt-0.5">
              {ACADEMIC_PROJECT_INFO.program} · Asignatura: <span className="text-[#83a598] font-semibold">{ACADEMIC_PROJECT_INFO.course}</span>
            </p>
            <p className="text-[#ebdbb2] text-[11px] mt-0.5">
              Autor: <span className="text-[#fbf1c7] font-semibold">{ACADEMIC_PROJECT_INFO.author}</span> · {ACADEMIC_PROJECT_INFO.cityYear}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSelectTab('docx_export')}
              className="px-3 py-1.5 bg-[#fe8019] text-[#282828] hover:bg-[#fabd2f] font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Descargar DOCX (APA 7)</span>
            </button>
            <button
              onClick={() => onSelectTab('simulador')}
              className="px-3 py-1.5 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sliders size={13} />
              <span>Simulador TUI</span>
            </button>
            <button
              onClick={() => onSelectTab('informe')}
              className="px-3 py-1.5 bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] font-semibold text-xs rounded-xs flex items-center gap-1.5 transition-colors border border-[#504945]"
            >
              <span>Ver Informe</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Planteamiento de la Problemática Integradora */}
      <div className="bg-[#282828] border border-[#3c3836] p-4 rounded-sm">
        <div className="flex items-center justify-between border-b border-[#3c3836] pb-2 mb-3">
          <div className="flex items-center gap-2 text-[#fe8019] font-bold text-sm">
            <Cpu size={16} />
            <span>Problemática Integradora de Ingeniería (Canal del Dique, Cartagena)</span>
          </div>
          <span className="text-[10px] text-[#b8bb26] bg-[#b8bb26]/10 px-2 py-0.5 border border-[#b8bb26]/30 rounded">
            Articula Unidades 1, 2 y 3
          </span>
        </div>

        <p className="text-xs text-[#ebdbb2] leading-relaxed">
          En la estación de bombeo y tratamiento de agua potable que abastece a Cartagena de Indias desde el Canal del Dique, se requiere modelar y controlar tres fenómenos dinámicos críticos interrelacionados:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 text-xs">
          <div className="bg-[#1d2021] p-3 border border-[#3c3836] rounded-xs">
            <div className="text-[#8ec07c] font-bold mb-1 flex items-center gap-1.5">
              <span>U1: Térmico y Vaciado</span>
            </div>
            <p className="text-[#a89984] text-[11px]">
              Refrigeración por convección en transformadores eléctricos de potencia y tiempo de parada segura.
            </p>
            <div className="mt-2 text-[#fabd2f] text-[11px]">
              <MathView math="\frac{dT}{dt} = -k(T - T_m)" />
            </div>
          </div>

          <div className="bg-[#1d2021] p-3 border border-[#3c3836] rounded-xs">
            <div className="text-[#83a598] font-bold mb-1 flex items-center gap-1.5">
              <span>U2: Mezcla y Salinidad</span>
            </div>
            <p className="text-[#a89984] text-[11px]">
              Dinámica de concentración de solutos salinos en tanques de homogenización resuelta con Factor Integrante.
            </p>
            <div className="mt-2 text-[#fabd2f] text-[11px]">
              <MathView math="\frac{dQ}{dt} + \frac{r_{out}}{V}Q = r_{in}C_{in}" />
            </div>
          </div>

          <div className="bg-[#1d2021] p-3 border border-[#3c3836] rounded-xs">
            <div className="text-[#d3869b] font-bold mb-1 flex items-center gap-1.5">
              <span>U3: Oscilador Masa-Resorte</span>
            </div>
            <p className="text-[#a89984] text-[11px]">
              Amortiguación de vibraciones inducidas por la bomba motriz (2da Ley de Newton) y prevención de resonancia destructiva.
            </p>
            <div className="mt-2 text-[#fabd2f] text-[11px]">
              <MathView math="m x'' + c x' + k x = F_0\cos(\omega t)" />
            </div>
          </div>
        </div>
      </div>

      {/* Módulos de la Asignatura (Ratatui style blocks) */}
      <div className="space-y-4">
        <div className="text-sm font-bold text-[#fabd2f] flex items-center gap-2">
          <Layers size={15} />
          <span>Estructura Curricular del Trabajo Final (CTEV)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Unidad 1 */}
          <div className="bg-[#282828] border border-[#3c3836] hover:border-[#8ec07c] transition-colors p-4 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8ec07c] font-bold mb-1">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} /> Unidad 1
                </span>
                <span className="text-[10px] text-[#7c6f64]">u1.rs</span>
              </div>
              <h3 className="font-bold text-sm text-[#fbf1c7] mb-2">{UNIDAD_1_DATA.shortTitle}</h3>
              <p className="text-xs text-[#a89984] mb-3 leading-relaxed">
                Fundamentos epistemológicos de Newton y Leibniz, clasificación formal (EDO/EDP, orden, linealidad) y soluciones.
              </p>
              <ul className="text-[11px] text-[#ebdbb2] space-y-1 mb-4">
                <li>• EDO vs EDP (derivadas totales vs parciales)</li>
                <li>• Grado y criterio de linealidad</li>
                <li>• PVI y familias de soluciones uniparamétricas</li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTab('unidad1')}
              className="w-full py-1.5 bg-[#1d2021] hover:bg-[#3c3836] text-[#8ec07c] border border-[#3c3836] text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Estudiar Unidad 1</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Card Unidad 2 */}
          <div className="bg-[#282828] border border-[#3c3836] hover:border-[#83a598] transition-colors p-4 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#83a598] font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Binary size={14} /> Unidad 2
                </span>
                <span className="text-[10px] text-[#7c6f64]">u2.rs</span>
              </div>
              <h3 className="font-bold text-sm text-[#fbf1c7] mb-2">{UNIDAD_2_DATA.shortTitle}</h3>
              <p className="text-xs text-[#a89984] mb-3 leading-relaxed">
                Técnicas analíticas de primer orden: Variables separables, ecuaciones lineales con factor integrante y exactas.
              </p>
              <ul className="text-[11px] text-[#ebdbb2] space-y-1 mb-4">
                <li>• Factor Integrante <MathView math="\mu(x) = e^{\int P dx}" /></li>
                <li>• Condición de exactitud de Euler <MathView math="M_y = N_x" /></li>
                <li>• Factores integrantes especiales <MathView math="\mu(x), \mu(y)" /></li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTab('unidad2')}
              className="w-full py-1.5 bg-[#1d2021] hover:bg-[#3c3836] text-[#83a598] border border-[#3c3836] text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Estudiar Unidad 2</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Card Unidad 3 */}
          <div className="bg-[#282828] border border-[#3c3836] hover:border-[#d3869b] transition-colors p-4 rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#d3869b] font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Activity size={14} /> Unidad 3
                </span>
                <span className="text-[10px] text-[#7c6f64]">u3.rs</span>
              </div>
              <h3 className="font-bold text-sm text-[#fbf1c7] mb-2">{UNIDAD_3_DATA.shortTitle}</h3>
              <p className="text-xs text-[#a89984] mb-3 leading-relaxed">
                Segunda Ley de Newton, el oscilador masa-resorte, ecuación característica, Wronskiano y análisis de resonancia.
              </p>
              <ul className="text-[11px] text-[#ebdbb2] space-y-1 mb-4">
                <li>• Ecuación auxiliar <MathView math="m r^2 + c r + k = 0" /></li>
                <li>• Discriminante: Sub, Crítico y Sobreamortiguado</li>
                <li>• Resonancia mecánica y solución forzada <MathView math="x_p(t)" /></li>
              </ul>
            </div>
            <button
              onClick={() => onSelectTab('unidad3')}
              className="w-full py-1.5 bg-[#1d2021] hover:bg-[#3c3836] text-[#d3869b] border border-[#3c3836] text-xs font-semibold rounded-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Estudiar Unidad 3</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal Rust / Ratatui Architecture Overview */}
      <div className="bg-[#1d2021] border border-[#3c3836] p-4 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#b8bb26]">
            <Terminal size={14} />
            <span>Implementación de Alto Rendimiento en Rust + Ratatui 0.29</span>
          </div>
          <p className="text-xs text-[#a89984]">
            Todo el modelo matemático está implementado en código fuente de Rust listo para compilar con <code className="text-[#fabd2f] bg-[#282828] px-1 py-0.5 rounded">cargo run</code> en la terminal local del estudiante o evaluador.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelectTab('rust_code')}
            className="px-3 py-1.5 bg-[#3c3836] hover:bg-[#504945] text-[#ebdbb2] text-xs font-semibold rounded-xs border border-[#504945] flex items-center gap-1.5"
          >
            <FileCode2 size={13} className="text-[#8ec07c]" />
            <span>Ver Cargo.toml & Rust</span>
          </button>
          <button
            onClick={onOpenAiTutor}
            className="px-3 py-1.5 bg-[#fe8019]/20 hover:bg-[#fe8019]/30 text-[#fe8019] border border-[#fe8019]/40 text-xs font-semibold rounded-xs flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            <span>Tutor IA Gemini</span>
          </button>
        </div>
      </div>
    </div>
  );
};
