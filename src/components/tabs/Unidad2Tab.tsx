import React, { useState } from 'react';
import { UNIDAD_2_DATA } from '../../data/ctevWorkData';
import { MathView } from '../MathView';
import { Binary, CheckCircle, Calculator, Cpu, Sparkles } from 'lucide-react';

export const Unidad2Tab: React.FC = () => {
  const [testTime, setTestTime] = useState<number>(60); // minutos
  const problem = UNIDAD_2_DATA.problem;

  // Q(t) = 50 - 30 * exp(-0.01 * t)
  const calcSalinity = (t: number) => {
    return 50 - 30 * Math.exp(-0.01 * t);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Header Banner */}
      <div className="bg-[#282828] border-l-4 border-[#83a598] p-4 rounded-sm border-t border-r border-b border-[#3c3836]">
        <div className="flex items-center gap-2 text-[#83a598] font-bold text-xs uppercase tracking-wider">
          <Binary size={14} />
          <span>Módulo 2 · Cátedra CTEV Universidad de Cartagena</span>
        </div>
        <h1 className="text-xl font-bold text-[#fbf1c7] mt-1">{UNIDAD_2_DATA.title}</h1>
        <p className="text-xs text-[#a89984] mt-1">{UNIDAD_2_DATA.subtitle}</p>
      </div>

      {/* Los 4 Métodos de Primer Orden */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNIDAD_2_DATA.keyConcepts.map((concept, idx) => (
          <div key={idx} className="bg-[#1d2021] border border-[#3c3836] p-3.5 rounded-sm">
            <h3 className="text-xs font-bold text-[#fabd2f] mb-1.5 flex items-center gap-1.5">
              <span className="text-[#83a598]">#{idx + 1}</span>
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

      {/* Cuadro Metodológico: ¿Qué método intentar primero? */}
      <div className="bg-[#282828] border border-[#3c3836] p-4 rounded-sm space-y-3">
        <h3 className="text-xs font-bold text-[#fbf1c7] flex items-center gap-2">
          <span>┌── Jerarquía Recomendada por la Guía CTEV para EDO de Primer Orden ──┐</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#1d2021] p-3 border border-[#504945] rounded-xs">
            <span className="text-[#b8bb26] font-bold block mb-1">Paso 1: Variables Separables</span>
            <p className="text-[#a89984] text-[11px]">
              El caso más simple. Intentar siempre factorizar como <MathView math="g(y)dy = f(x)dx" />. Se apoya en técnicas estándar de integración (por partes, fracciones parciales).
            </p>
          </div>
          <div className="bg-[#1d2021] p-3 border border-[#504945] rounded-xs">
            <span className="text-[#83a598] font-bold block mb-1">Paso 2: Ecuación Lineal</span>
            <p className="text-[#a89984] text-[11px]">
              Escribir en la forma canónica <MathView math="y' + P(x)y = Q(x)" /> y calcular el factor integrante <MathView math="\mu(x) = e^{\int P(x)dx}" />. Familia amigable siempre resoluble.
            </p>
          </div>
          <div className="bg-[#1d2021] p-3 border border-[#504945] rounded-xs">
            <span className="text-[#fe8019] font-bold block mb-1">Paso 3: Ecuación Exacta</span>
            <p className="text-[#a89984] text-[11px]">
              Forma <MathView math="M dx + N dy = 0" />. Verificar <MathView math="M_y = N_x" />. Si no es exacta, hallar el factor de integración <MathView math="\mu(x)" /> o <MathView math="\mu(y)" />.
            </p>
          </div>
        </div>
      </div>

      {/* Problema de Aplicación U2 Resuelto */}
      <div className="bg-[#1d2021] border border-[#504945] rounded-sm p-4 space-y-4">
        <div className="border-b border-[#3c3836] pb-3">
          <div className="flex items-center gap-2 text-[#fe8019] text-xs font-bold mb-1">
            <Cpu size={14} />
            <span>PROBLEMA DE APLICACIÓN REAL · UNIDAD 2</span>
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
            <span className="text-[#ebdbb2] font-semibold">EDO Lineal</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">ORDEN:</span>
            <span className="text-[#ebdbb2] font-semibold">1° Orden (dQ/dt)</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">MÉTODO:</span>
            <span className="text-[#83a598] font-semibold">Factor Integrante μ(t)</span>
          </div>
          <div>
            <span className="text-[#a89984] block text-[10px]">VARIABLES:</span>
            <span className="text-[#ebdbb2] font-semibold">Q(t) soluto, t tiempo</span>
          </div>
        </div>

        {/* Pasos Analíticos Detallados */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#fabd2f]">
            Desarrollo Matemático Paso a Paso:
          </div>

          {problem.analyticalSolutionSteps.map((step) => (
            <div key={step.step} className="bg-[#282828] p-3 border border-[#3c3836] rounded-xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#83a598]">
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

        {/* Solución Final */}
        <div className="bg-[#282828] border-2 border-[#83a598] p-4 rounded-xs space-y-2">
          <div className="text-xs font-bold text-[#83a598] uppercase">Solución Analítica Final:</div>
          <div className="text-sm font-bold text-[#fbf1c7] text-center">
            <MathView math={problem.finalSolution} block />
          </div>
          <p className="text-xs text-[#ebdbb2] leading-relaxed pt-2 border-t border-[#3c3836]">
            <strong className="text-[#fabd2f]">Interpretación para Ingeniería CTEV: </strong>
            {problem.engineeringInterpretation}
          </p>
        </div>

        {/* Calculadora Interactiva de Salinidad */}
        <div className="bg-[#1d2021] border border-[#3c3836] p-4 rounded-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#fabd2f]">
            <span className="flex items-center gap-1.5">
              <Calculator size={14} />
              <span>Verificación Numérica Interactiva: Salinidad Q(t) en el Tanque</span>
            </span>
            <span className="text-[#a89984]">t = {testTime} minutos</span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="300"
              step="5"
              value={testTime}
              onChange={(e) => setTestTime(parseFloat(e.target.value))}
              className="flex-1 accent-[#83a598] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#282828] p-3 rounded-xs text-xs border border-[#3c3836]">
            <div>
              <span className="text-[#a89984] block text-[10px]">TIEMPO EVALUADO:</span>
              <span className="text-[#fbf1c7] font-bold">{testTime} min</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">MASA DE SAL Q(t):</span>
              <span className="text-[#83a598] font-bold text-sm">{calcSalinity(testTime).toFixed(2)} kg</span>
            </div>
            <div>
              <span className="text-[#a89984] block text-[10px]">CONCENTRACIÓN EN EL AGUA:</span>
              <span className="text-[#b8bb26] font-bold text-sm">{(calcSalinity(testTime) / 1000).toFixed(4)} kg/L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
