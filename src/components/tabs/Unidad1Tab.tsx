import React, { useState } from 'react';
import { UNIDAD_1_DATA } from '../../data/ctevWorkData';
import { MathView } from '../MathView';
import { BookOpen, CheckCircle, Calculator, ChevronRight, Cpu } from 'lucide-react';

export const Unidad1Tab: React.FC = () => {
  const [testTime, setTestTime] = useState<number>(30); // minutos
  const problem = UNIDAD_1_DATA.problem;

  // T(t) = 30 + 65 * exp(-0.022314 * t)
  const calcTemp = (t: number) => {
    return 30 + 65 * Math.exp(-0.022314 * t);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Header Banner */}
      <div className="bg-[#282828] border-l-4 border-[#8ec07c] p-4 rounded-sm border-t border-r border-b border-[#3c3836]">
        <div className="flex items-center gap-2 text-[#8ec07c] font-bold text-xs uppercase tracking-wider">
          <BookOpen size={14} />
          <span>Módulo 1 · Cátedra CTEV Universidad de Cartagena</span>
        </div>
        <h1 className="text-xl font-bold text-[#fbf1c7] mt-1">{UNIDAD_1_DATA.title}</h1>
        <p className="text-xs text-[#a89984] mt-1">{UNIDAD_1_DATA.subtitle}</p>
      </div>

      {/* Conceptos Clave de Clasificación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNIDAD_1_DATA.keyConcepts.map((concept, idx) => (
          <div key={idx} className="bg-[#1d2021] border border-[#3c3836] p-3.5 rounded-sm">
            <h3 className="text-xs font-bold text-[#fabd2f] mb-1.5 flex items-center gap-1.5">
              <span className="text-[#8ec07c]">#{idx + 1}</span>
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

      {/* Tabla Resumen de Clasificación */}
      <div className="bg-[#282828] border border-[#3c3836] p-4 rounded-sm">
        <h3 className="text-sm font-bold text-[#fbf1c7] mb-3 flex items-center gap-2">
          <span>┌── Matriz de Clasificación de Ecuaciones Diferenciales ──┐</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#1d2021] text-[#fabd2f] border-b border-[#504945]">
                <th className="p-2.5">Ecuación</th>
                <th className="p-2.5">Tipo</th>
                <th className="p-2.5">Orden</th>
                <th className="p-2.5">Linealidad</th>
                <th className="p-2.5">Justificación Matemática</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3c3836] text-[#d5c4a1]">
              <tr className="hover:bg-[#32302f]">
                <td className="p-2.5 font-semibold text-[#83a598]">
                  <MathView math="\frac{dy}{dx} = 5y + e^x" />
                </td>
                <td className="p-2.5">EDO</td>
                <td className="p-2.5">1° Orden</td>
                <td className="p-2.5 text-[#b8bb26] font-semibold">Lineal</td>
                <td className="p-2.5 text-[#a89984] text-[11px]">Forma canónica <MathView math="y' - 5y = e^x" /></td>
              </tr>
              <tr className="hover:bg-[#32302f]">
                <td className="p-2.5 font-semibold text-[#83a598]">
                  <MathView math="\frac{d^2y}{dx^2} + y \frac{dy}{dx} = 0" />
                </td>
                <td className="p-2.5">EDO</td>
                <td className="p-2.5">2° Orden</td>
                <td className="p-2.5 text-[#fb4934] font-semibold">No Lineal</td>
                <td className="p-2.5 text-[#a89984] text-[11px]">Producto no lineal entre la función <MathView math="y" /> y su derivada <MathView math="y'" /></td>
              </tr>
              <tr className="hover:bg-[#32302f]">
                <td className="p-2.5 font-semibold text-[#83a598]">
                  <MathView math="\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}" />
                </td>
                <td className="p-2.5">EDP</td>
                <td className="p-2.5">2° Orden</td>
                <td className="p-2.5 text-[#b8bb26] font-semibold">Lineal</td>
                <td className="p-2.5 text-[#a89984] text-[11px]">Dos variables independientes (x, t), lineal en u</td>
              </tr>
              <tr className="hover:bg-[#32302f]">
                <td className="p-2.5 font-semibold text-[#83a598]">
                  <MathView math="m x'' + c x' + k x = F_0 \cos(\omega t)" />
                </td>
                <td className="p-2.5">EDO</td>
                <td className="p-2.5">2° Orden</td>
                <td className="p-2.5 text-[#b8bb26] font-semibold">Lineal</td>
                <td className="p-2.5 text-[#a89984] text-[11px]">Oscilador armónico con coeficientes constantes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Problema Resuelto Paso a Paso */}
      <div className="bg-[#1d2021] border border-[#504945] rounded-sm p-4 space-y-4">
        <div className="border-b border-[#3c3836] pb-3">
          <div className="flex items-center gap-2 text-[#fe8019] text-xs font-bold mb-1">
            <Cpu size={14} />
            <span>PROBLEMA DE APLICACIÓN REAL · UNIDAD 1</span>
          </div>
          <h2 className="text-base font-bold text-[#fbf1c7]">{problem.title}</h2>
          <p className="text-xs text-[#d5c4a1] mt-1 leading-relaxed bg-[#282828] p-3 border border-[#3c3836] rounded-xs">
            {problem.context}
          </p>
          <div className="mt-2 text-xs font-semibold text-[#fabd2f]">
            Objetivo: {problem.statement}
          </div>
        </div>

        {/* Clasificación formal del problema */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs bg-[#282828] p-3 border border-[#3c3836]">
          <div>
            <span className="text-[#a89984] block text-[10px]">TIPO:</span>
            <span className="text-[#ebdbb2] font-semibold">EDO (Ordinaria)</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">ORDEN:</span>
            <span className="text-[#ebdbb2] font-semibold">1° Orden (dT/dt)</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">LINEALIDAD:</span>
            <span className="text-[#b8bb26] font-semibold">Lineal</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">VARIABLES:</span>
            <span className="text-[#83a598] font-semibold">T(t) dependiente, t indep.</span>
          </div>
        </div>

        {/* Pasos Analíticos Detallados */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#fabd2f]">
            Desarrollo Matemático Paso a Paso:
          </div>

          {problem.analyticalSolutionSteps.map((step) => (
            <div key={step.step} className="bg-[#282828] p-3 border border-[#3c3836] rounded-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8ec07c]">
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

        {/* Solución Final e Interpretación */}
        <div className="bg-[#282828] border-2 border-[#b8bb26] p-4 rounded-xs space-y-2">
          <div className="text-xs font-bold text-[#b8bb26] uppercase">Solución Analítica Final del PVI:</div>
          <div className="text-sm font-bold text-[#fbf1c7] text-center">
            <MathView math={problem.finalSolution} block />
          </div>
          <p className="text-xs text-[#ebdbb2] leading-relaxed pt-2 border-t border-[#3c3836]">
            <strong className="text-[#fabd2f]">Interpretación para Ingeniería CTEV: </strong>
            {problem.engineeringInterpretation}
          </p>
        </div>

        {/* Calculadora Interactiva de la Solución */}
        <div className="bg-[#1d2021] border border-[#3c3836] p-4 rounded-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#fabd2f]">
            <span className="flex items-center gap-1.5">
              <Calculator size={14} />
              <span>Verificación Numérica Interactiva: T(t) en cualquier instante</span>
            </span>
            <span className="text-[#a89984]">t = {testTime} minutos</span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="120"
              step="1"
              value={testTime}
              onChange={(e) => setTestTime(parseFloat(e.target.value))}
              className="flex-1 accent-[#fabd2f] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between bg-[#282828] p-3 rounded-xs text-xs border border-[#3c3836]">
            <div>
              <span className="text-[#a89984] block text-[10px]">TIEMPO EVALUADO:</span>
              <span className="text-[#fbf1c7] font-bold">{testTime} min</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">TEMPERATURA CALCULADA:</span>
              <span className="text-[#fabd2f] font-bold text-sm">{calcTemp(testTime).toFixed(2)} °C</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">ESTADO DE INSPECCIÓN:</span>
              <span className={`font-bold ${calcTemp(testTime) <= 45 ? 'text-[#b8bb26]' : 'text-[#fb4934]'}`}>
                {calcTemp(testTime) <= 45 ? 'SEGURO PARA INSPECCIÓN (≤ 45°C)' : 'MUY CALIENTE (> 45°C)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
