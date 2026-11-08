import React, { useState } from 'react';
import { UNIDAD_3_DATA } from '../../data/ctevWorkData';
import { MathView } from '../MathView';
import { Activity, CheckCircle, Calculator, Cpu, AlertTriangle, ArrowRight } from 'lucide-react';
import { TuiTab } from '../../types';

interface Unidad3TabProps {
  onSelectTab: (tab: TuiTab) => void;
}

export const Unidad3Tab: React.FC<Unidad3TabProps> = ({ onSelectTab }) => {
  const [testTime, setTestTime] = useState<number>(1.5); // segundos
  const problem = UNIDAD_3_DATA.problem;

  // x(t) = exp(-t) * (0.07885*cos(sqrt(39)*t) - 0.01201*sin(sqrt(39)*t)) - 0.02885*cos(8t) + 0.01923*sin(8t)
  const calcDisplacement = (t: number) => {
    const sqrt39 = Math.sqrt(39);
    const xh = Math.exp(-t) * (0.07885 * Math.cos(sqrt39 * t) - 0.01201 * Math.sin(sqrt39 * t));
    const xp = -0.02885 * Math.cos(8 * t) + 0.01923 * Math.sin(8 * t);
    return { total: xh + xp, xh, xp };
  };

  const currentX = calcDisplacement(testTime);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Header Banner */}
      <div className="bg-[#282828] border-l-4 border-[#d3869b] p-4 rounded-sm border-t border-r border-b border-[#3c3836]">
        <div className="flex items-center gap-2 text-[#d3869b] font-bold text-xs uppercase tracking-wider">
          <Activity size={14} />
          <span>Módulo 3 · Cátedra CTEV Universidad de Cartagena</span>
        </div>
        <h1 className="text-xl font-bold text-[#fbf1c7] mt-1">{UNIDAD_3_DATA.title}</h1>
        <p className="text-xs text-[#a89984] mt-1">{UNIDAD_3_DATA.subtitle}</p>
      </div>

      {/* Fundamentos Teóricos de Orden Superior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNIDAD_3_DATA.keyConcepts.map((concept, idx) => (
          <div key={idx} className="bg-[#1d2021] border border-[#3c3836] p-3.5 rounded-sm">
            <h3 className="text-xs font-bold text-[#fabd2f] mb-1.5 flex items-center gap-1.5">
              <span className="text-[#d3869b]">#{idx + 1}</span>
              <span>{concept.title}</span>
            </h3>
            <p className="text-xs text-[#ebdbb2] leading-relaxed mb-2">{concept.desc}</p>
            {concept.latex && (
              <div className="bg-[#282828] p-2 rounded-xs text-[#fbf1c7] text-xs overflow-x-auto border border-[#3c3836]">
                <MathView math={concept.latex} block />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Los 3 Regímenes de Amortiguamiento */}
      <div className="bg-[#282828] border border-[#3c3836] p-4 rounded-sm space-y-3">
        <h3 className="text-xs font-bold text-[#fbf1c7] flex items-center gap-2">
          <span>┌── Clasificación de Comportamiento Dinámico según el Discriminante Δ = c² - 4mk ──┐</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#1d2021] p-3 border border-[#83a598]/50 rounded-xs">
            <span className="text-[#83a598] font-bold block mb-1">1. Subamortiguado (Δ &lt; 0)</span>
            <p className="text-[#a89984] text-[11px] mb-2">
              Raíces complejas conjugadas <MathView math="r = -\gamma \pm i \omega_d" />. Oscilaciones senoidales amortiguadas con envolvente exponencial.
            </p>
            <div className="text-[10px] text-[#fbf1c7] bg-[#282828] p-1.5 rounded">
              <MathView math="x(t) = e^{-\gamma t}(C_1 \cos\omega_d t + C_2 \sin\omega_d t)" />
            </div>
          </div>

          <div className="bg-[#1d2021] p-3 border border-[#fabd2f]/50 rounded-xs">
            <span className="text-[#fabd2f] font-bold block mb-1">2. Crítico (Δ = 0)</span>
            <p className="text-[#a89984] text-[11px] mb-2">
              Raíz real doble repetida <MathView math="r = -\gamma" />. Retorno al equilibrio en el menor tiempo posible sin oscilar.
            </p>
            <div className="text-[10px] text-[#fbf1c7] bg-[#282828] p-1.5 rounded">
              <MathView math="x(t) = (C_1 + C_2 t) e^{-\gamma t}" />
            </div>
          </div>

          <div className="bg-[#1d2021] p-3 border border-[#fe8019]/50 rounded-xs">
            <span className="text-[#fe8019] font-bold block mb-1">3. Sobreamortiguado (Δ &gt; 0)</span>
            <p className="text-[#a89984] text-[11px] mb-2">
              Dos raíces reales distintas <MathView math="r_1, r_2" />. Movimiento lento aperiódico dominado por la fuerte fricción viscosa.
            </p>
            <div className="text-[10px] text-[#fbf1c7] bg-[#282828] p-1.5 rounded">
              <MathView math="x(t) = C_1 e^{r_1 t} + C_2 e^{r_2 t}" />
            </div>
          </div>
        </div>
      </div>

      {/* Problema de Aplicación U3 Resuelto */}
      <div className="bg-[#1d2021] border border-[#504945] rounded-sm p-4 space-y-4">
        <div className="border-b border-[#3c3836] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#fe8019] text-xs font-bold mb-1">
              <Cpu size={14} />
              <span>PROBLEMA DE APLICACIÓN REAL · UNIDAD 3</span>
            </div>
            <button
              onClick={() => onSelectTab('simulador')}
              className="px-2 py-1 bg-[#d3869b]/20 hover:bg-[#d3869b]/30 text-[#d3869b] border border-[#d3869b]/40 rounded text-[11px] font-semibold flex items-center gap-1"
            >
              <span>Abrir en Simulador TUI</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <h2 className="text-base font-bold text-[#fbf1c7]">{problem.title}</h2>
          <p className="text-xs text-[#d5c4a1] mt-1 leading-relaxed bg-[#282828] p-3 border border-[#3c3836] rounded-xs">
            {problem.context}
          </p>
          <div className="mt-2 text-xs font-semibold text-[#fabd2f]">
            Objetivo: {problem.statement}
          </div>
        </div>

        {/* Clasificación formal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs bg-[#282828] p-3 border border-[#3c3836]">
          <div>
            <span className="text-[#a89984] block text-[10px]">TIPO:</span>
            <span className="text-[#ebdbb2] font-semibold">EDO Ordinaria</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">ORDEN:</span>
            <span className="text-[#ebdbb2] font-semibold">2° Orden (d²x/dt²)</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">LINEALIDAD:</span>
            <span className="text-[#b8bb26] font-semibold">Lineal No Homogénea</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">RÉGIMEN:</span>
            <span className="text-[#83a598] font-semibold">Subamortiguado (Δ = -156)</span>
          </div>
        </div>

        {/* Pasos Analíticos Detallados */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#fabd2f]">
            Desarrollo Matemático Paso a Paso:
          </div>

          {problem.analyticalSolutionSteps.map((step) => (
            <div key={step.step} className="bg-[#282828] p-3 border border-[#3c3836] rounded-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#d3869b]">
                <CheckCircle size={13} />
                <span>Paso {step.step}: {step.title}</span>
              </div>
              <div className="bg-[#1d2021] p-2 rounded-xs border border-[#32302f] text-center">
                <MathView math={step.math} block />
              </div>
              <p className="text-[11px] text-[#a89984]">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Resonancia Warning Box */}
        <div className="bg-[#282828] border border-[#fabd2f] p-3 rounded-xs flex items-start gap-3">
          <AlertTriangle size={20} className="text-[#fabd2f] shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="text-[#fabd2f] font-bold block mb-0.5">Diagnóstico de Resonancia Estructural:</span>
            <p className="text-[#ebdbb2] text-[11px] leading-relaxed">
              Frecuencia natural del conjunto bomba-resorte: <MathView math="\omega_0 = 6.325 \text{ rad/s}" /> (1.01 Hz). Frecuencia impulsora del motor: <MathView math="\omega = 8.0 \text{ rad/s}" /> (1.27 Hz). Como existe un margen superior al 25%, el amortiguador disipa eficientemente la energía impidiendo la catástrofe por resonancia en el acueducto de Cartagena.
            </p>
          </div>
        </div>

        {/* Solución Final */}
        <div className="bg-[#282828] border-2 border-[#d3869b] p-4 rounded-xs space-y-2">
          <div className="text-xs font-bold text-[#d3869b] uppercase">Solución Analítica General PVI:</div>
          <div className="text-xs font-bold text-[#fbf1c7] text-center overflow-x-auto">
            <MathView math={problem.finalSolution} block />
          </div>
          <p className="text-xs text-[#ebdbb2] leading-relaxed pt-2 border-t border-[#3c3836]">
            <strong className="text-[#fabd2f]">Interpretación para Ingeniería CTEV: </strong>
            {problem.engineeringInterpretation}
          </p>
        </div>

        {/* Verificación Numérica Instantánea */}
        <div className="bg-[#1d2021] border border-[#3c3836] p-4 rounded-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#fabd2f]">
            <span className="flex items-center gap-1.5">
              <Calculator size={14} />
              <span>Verificación Numérica Instantánea: Posición x(t) de la Bomba</span>
            </span>
            <span className="text-[#a89984]">t = {testTime.toFixed(2)} s</span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="5"
              step="0.05"
              value={testTime}
              onChange={(e) => setTestTime(parseFloat(e.target.value))}
              className="flex-1 accent-[#d3869b] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#282828] p-3 rounded-xs text-xs border border-[#3c3836]">
            <div>
              <span className="text-[#a89984] block text-[10px]">TIEMPO EVALUADO:</span>
              <span className="text-[#fbf1c7] font-bold">{testTime.toFixed(2)} s</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">DESPLAZAMIENTO TOTAL x(t):</span>
              <span className="text-[#fabd2f] font-bold text-sm">{(currentX.total * 100).toFixed(2)} cm</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">TRANSITORIO vs PERMANENTE:</span>
              <span className="text-[#83a598] font-bold text-xs">
                xh: {(currentX.xh * 100).toFixed(2)} cm │ xp: {(currentX.xp * 100).toFixed(2)} cm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
