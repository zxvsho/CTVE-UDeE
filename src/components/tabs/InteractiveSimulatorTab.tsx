import React, { useState, useEffect, useRef, useMemo } from 'react';
import { OscillatorParams } from '../../types';
import { solveOscillator } from '../../utils/mathSolver';
import { MathView } from '../MathView';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Zap,
  Info
} from 'lucide-react';

export const InteractiveSimulatorTab: React.FC = () => {
  // Parámetros por defecto calibrados según el problema de la UdeC CTEV
  const [params, setParams] = useState<OscillatorParams>({
    m: 250,
    c: 500,
    k: 10000,
    F0: 500,
    omega: 8,
    x0: 0.05,
    v0: 0,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Solución analítica y numérica
  const solution = useMemo(() => {
    return solveOscillator(params, 12, 300);
  }, [params]);

  // Bucle de animación en tiempo real (60 FPS)
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setSimTime((prev) => {
          const next = prev + dt * 1.5; // velocidad de reproducción
          return next > 12 ? 0 : next;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Interpolación de la posición actual en simTime
  const currentInterpolated = useMemo(() => {
    const { t, x, v } = solution;
    let idx = 0;
    while (idx < t.length - 1 && t[idx] < simTime) {
      idx++;
    }
    return {
      x: x[idx] || 0,
      v: v[idx] || 0,
    };
  }, [solution, simTime]);

  // Dibujado en Canvas: Gráfico de x(t) estilo osciloscopio Ratatui Gruvbox
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fondo Gruvbox BG_HARD
    ctx.fillStyle = '#1d2021';
    ctx.fillRect(0, 0, width, height);

    // Rejilla de osciloscopio
    ctx.strokeStyle = '#32302f';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < width; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let gy = 0; gy < height; gy += 30) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    // Línea central de equilibrio x = 0
    ctx.strokeStyle = '#504945';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Encontrar rango máximo para escalar
    const maxAmp = Math.max(0.08, ...solution.x.map((val) => Math.abs(val)));
    const yScale = (height / 2 - 20) / maxAmp;

    // Trazar curva de x(t)
    ctx.strokeStyle = solution.isResonant ? '#fb4934' : '#fabd2f';
    ctx.lineWidth = 2;
    ctx.beginPath();

    solution.t.forEach((timeVal, idx) => {
      const px = (timeVal / 12) * width;
      const py = height / 2 - solution.x[idx] * yScale;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Cursor de tiempo actual
    const curPx = (simTime / 12) * width;
    const curPy = height / 2 - currentInterpolated.x * yScale;

    ctx.strokeStyle = '#b8bb26';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(curPx, 0);
    ctx.lineTo(curPx, height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Punto trazador luminoso
    ctx.fillStyle = '#fbf1c7';
    ctx.beginPath();
    ctx.arc(curPx, curPy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fabd2f';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Texto de amplitud
    ctx.fillStyle = '#a89984';
    ctx.font = '10px monospace';
    ctx.fillText(`+${(maxAmp * 100).toFixed(1)} cm`, 8, 16);
    ctx.fillText(`-${(maxAmp * 100).toFixed(1)} cm`, 8, height - 6);
    ctx.fillText(`0.0 cm (equilibrio)`, 8, height / 2 - 4);
    ctx.fillText(`t = ${simTime.toFixed(2)} s`, width - 85, 16);
  }, [solution, simTime, currentInterpolated]);

  // Dibujado en Canvas: Plano de Fase (x vs v)
  useEffect(() => {
    const canvas = phaseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#1d2021';
    ctx.fillRect(0, 0, width, height);

    // Ejes x y v
    ctx.strokeStyle = '#3c3836';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    const maxX = Math.max(0.08, ...solution.x.map((val) => Math.abs(val)));
    const maxV = Math.max(0.5, ...solution.v.map((val) => Math.abs(val)));

    const scaleX = (width / 2 - 15) / maxX;
    const scaleV = (height / 2 - 15) / maxV;

    // Trayectoria del espacio de fase
    ctx.strokeStyle = '#83a598';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    solution.x.forEach((xVal, idx) => {
      const px = width / 2 + xVal * scaleX;
      const py = height / 2 - solution.v[idx] * scaleV;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Punto actual en el plano de fase
    const curPx = width / 2 + currentInterpolated.x * scaleX;
    const curPy = height / 2 - currentInterpolated.v * scaleV;

    ctx.fillStyle = '#fb4934';
    ctx.beginPath();
    ctx.arc(curPx, curPy, 4, 0, Math.PI * 2);
    ctx.fill();

    // Etiquetas
    ctx.fillStyle = '#a89984';
    ctx.font = '10px monospace';
    ctx.fillText('v (velocidad)', width / 2 + 5, 12);
    ctx.fillText('x (posición)', width - 65, height / 2 - 5);
  }, [solution, currentInterpolated]);

  // Animación del resorte en ASCII
  const asciiSpring = useMemo(() => {
    const normX = currentInterpolated.x * 100; // en cm (-10 a +10)
    const coilCount = Math.max(3, Math.min(12, Math.round(7 + normX * 0.4)));
    let coils = '';
    for (let i = 0; i < coilCount; i++) {
      coils += '/\\';
    }
    return coils;
  }, [currentInterpolated.x]);

  // Presets pedagógicos
  const applyPreset = (preset: 'cartagena' | 'critico' | 'sobre' | 'resonancia' | 'libre') => {
    switch (preset) {
      case 'cartagena':
        setParams({ m: 250, c: 500, k: 10000, F0: 500, omega: 8, x0: 0.05, v0: 0 });
        break;
      case 'critico':
        // c = 2 * sqrt(m * k) = 2 * sqrt(250 * 10000) = 2 * 1581.14 ≈ 3162
        setParams({ m: 250, c: 3162, k: 10000, F0: 0, omega: 0, x0: 0.08, v0: 0 });
        break;
      case 'sobre':
        setParams({ m: 250, c: 5500, k: 10000, F0: 0, omega: 0, x0: 0.08, v0: 0 });
        break;
      case 'resonancia':
        // omega = sqrt(k/m) = sqrt(10000/250) = 6.3245
        setParams({ m: 250, c: 60, k: 10000, F0: 300, omega: 6.32, x0: 0, v0: 0 });
        break;
      case 'libre':
        setParams({ m: 250, c: 0, k: 10000, F0: 0, omega: 0, x0: 0.06, v0: 0 });
        break;
    }
    setSimTime(0);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto font-mono text-[#ebdbb2]">
      {/* Top Banner TUI */}
      <div className="bg-[#282828] border border-[#fabd2f] p-3 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-[#fabd2f]" />
          <div>
            <h1 className="text-sm font-bold text-[#fbf1c7]">
              Laboratorio TUI: Oscilador Masa-Resorte Amortiguado (2da Ley de Newton)
            </h1>
            <p className="text-[11px] text-[#a89984]">
              Simulador interactivo en tiempo real con resolución RK4 y cálculo exacto de discriminante Δ
            </p>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xs text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1]'
                : 'bg-[#b8bb26] text-[#282828] hover:bg-[#8ec07c]'
            }`}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pausar' : 'Reanudar'}</span>
          </button>

          <button
            onClick={() => setSimTime(0)}
            className="px-2.5 py-1.5 bg-[#3c3836] hover:bg-[#504945] text-[#ebdbb2] border border-[#504945] rounded-xs text-xs font-semibold flex items-center gap-1 transition-colors"
            title="Reiniciar tiempo a 0s"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Selector de Presets Pedagógicos */}
      <div className="bg-[#1d2021] border border-[#3c3836] p-3 rounded-sm space-y-2">
        <div className="text-[11px] text-[#fabd2f] font-bold flex items-center justify-between">
          <span>┌── PRESETS DE ANÁLISIS CURRICULAR CTEV ──┐</span>
          <span className="text-[10px] text-[#7c6f64]">Haz clic para cargar condiciones físicas</span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => applyPreset('cartagena')}
            className="px-2.5 py-1 bg-[#282828] hover:bg-[#3c3836] text-[#8ec07c] border border-[#3c3836] rounded-xs transition-colors"
          >
            • Subamortiguado (Estación Cartagena)
          </button>

          <button
            onClick={() => applyPreset('critico')}
            className="px-2.5 py-1 bg-[#282828] hover:bg-[#3c3836] text-[#fabd2f] border border-[#3c3836] rounded-xs transition-colors"
          >
            • Amortiguamiento Crítico (Diseño Óptimo)
          </button>

          <button
            onClick={() => applyPreset('sobre')}
            className="px-2.5 py-1 bg-[#282828] hover:bg-[#3c3836] text-[#fe8019] border border-[#3c3836] rounded-xs transition-colors"
          >
            • Sobreamortiguado (Alta Fricción)
          </button>

          <button
            onClick={() => applyPreset('resonancia')}
            className="px-2.5 py-1 bg-[#282828] hover:bg-[#3c3836] text-[#fb4934] border border-[#fb4934]/40 rounded-xs transition-colors font-bold"
          >
            ⚠ Resonancia Pura (Alerta Destructiva)
          </button>

          <button
            onClick={() => applyPreset('libre')}
            className="px-2.5 py-1 bg-[#282828] hover:bg-[#3c3836] text-[#83a598] border border-[#3c3836] rounded-xs transition-colors"
          >
            • Movimiento Armónico Simple (c = 0)
          </button>
        </div>
      </div>

      {/* Grid Principal: Terminal Visualizer + Control Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (Canvas Plots & ASCII animation) - 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          {/* ASCII Mechanical Schematic in Ratatui Block */}
          <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm p-3">
            <div className="text-[11px] text-[#8ec07c] font-bold mb-2 flex items-center justify-between border-b border-[#3c3836] pb-1">
              <span>󰊠 ESQUEMA MECÁNICO EN TIEMPO REAL (TERMINAL ASCII)</span>
              <span className="text-[#fabd2f]">x = {(currentInterpolated.x * 100).toFixed(2)} cm</span>
            </div>

            <div className="bg-[#282828] p-3 rounded-xs font-mono text-xs overflow-x-auto select-none border border-[#3c3836]">
              <div className="text-[#a89984] mb-1">
                ║ TECHO RÍGIDO (ANCLAJE ESTACIÓN)
              </div>
              <div className="text-[#83a598]">
                ║ ├── Resorte (k={params.k} N/m):  <span className="text-[#fabd2f] font-bold">{asciiSpring}</span>
              </div>
              <div className="text-[#a89984]">
                ║ └── Amortiguador (c={params.c}): [===|===] (piston viscoso)
              </div>
              <div className="text-[#fbf1c7] mt-1 font-bold">
                ║     ┌───────────────────────┐
              </div>
              <div className="text-[#fbf1c7] font-bold">
                ║     │ MASSA ELECTROMBA      │ &lt;-- Desplazamiento x(t) = {(currentInterpolated.x * 100).toFixed(2)} cm
              </div>
              <div className="text-[#fbf1c7] font-bold">
                ║     │ m = {params.m} kg             │     Velocidad v(t) = {currentInterpolated.v.toFixed(3)} m/s
              </div>
              <div className="text-[#fbf1c7] font-bold">
                ║     └───────────────────────┘
              </div>
              {params.F0 > 0 && (
                <div className="text-[#fe8019] mt-1 font-bold">
                  ║        ↓↓↓ Fuerza impulsora F(t) = {params.F0}·cos({params.omega}t) N
                </div>
              )}
            </div>
          </div>

          {/* Gráfico 1: Desplazamiento x(t) */}
          <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#fabd2f] font-bold">
                󰄮 OSCILOGRAMA: Posición x(t) vs Tiempo t [0..12s]
              </span>
              <span className={`text-[10px] font-bold ${solution.isResonant ? 'text-[#fb4934] animate-pulse' : 'text-[#b8bb26]'}`}>
                {solution.isResonant ? '¡PELIGRO: RESONANCIA!' : 'ESTABLE'}
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={600}
              height={190}
              className="w-full h-[190px] rounded-xs border border-[#3c3836] bg-[#1d2021]"
            />
          </div>

          {/* Gráfico 2: Plano de Fase (x vs v) */}
          <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#83a598] font-bold">
                󰍹 PLANO DE FASE: Posición x vs Velocidad v (Espacio de Estados)
              </span>
              <span className="text-[10px] text-[#a89984]">
                Espiral hacia el origen (atractor) o ciclo límite
              </span>
            </div>

            <canvas
              ref={phaseCanvasRef}
              width={600}
              height={150}
              className="w-full h-[150px] rounded-xs border border-[#3c3836] bg-[#1d2021]"
            />
          </div>
        </div>

        {/* Right Column (Controls & Analytical Inspector) - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          {/* Analytical Diagnosis Box */}
          <div className="bg-[#282828] border border-[#504945] rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#3c3836] pb-2">
              <span className="text-xs font-bold text-[#fabd2f]">
                DIAGNÓSTICO ANALÍTICO EXACTO
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                solution.regime === 'subamortiguado' ? 'bg-[#83a598]/20 text-[#83a598]' :
                solution.regime === 'critico' ? 'bg-[#fabd2f]/20 text-[#fabd2f]' :
                'bg-[#fe8019]/20 text-[#fe8019]'
              }`}>
                {solution.regime}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#3c3836]/50">
                <span className="text-[#a89984]">Discriminante Δ = c² - 4mk:</span>
                <span className={`font-bold ${solution.discriminant < 0 ? 'text-[#83a598]' : solution.discriminant === 0 ? 'text-[#fabd2f]' : 'text-[#fe8019]'}`}>
                  {solution.discriminant.toFixed(1)} {solution.discriminant < 0 ? '(< 0)' : '(≥ 0)'}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#3c3836]/50">
                <span className="text-[#a89984]">Frecuencia Natural ω₀ = √(k/m):</span>
                <span className="text-[#fbf1c7] font-bold">
                  {solution.naturalFreq.toFixed(3)} rad/s ({(solution.naturalFreq / (2 * Math.PI)).toFixed(2)} Hz)
                </span>
              </div>

              {solution.dampedFreq !== undefined && (
                <div className="flex justify-between py-1 border-b border-[#3c3836]/50">
                  <span className="text-[#a89984]">Frecuencia Amortiguada ω_d:</span>
                  <span className="text-[#8ec07c] font-bold">
                    {solution.dampedFreq.toFixed(3)} rad/s
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-[#3c3836]/50">
                <span className="text-[#a89984]">Atenuación γ = c/(2m):</span>
                <span className="text-[#fbf1c7] font-bold">{solution.gamma.toFixed(3)} s⁻¹</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#3c3836]/50">
                <span className="text-[#a89984]">Raíces Ecuación Auxiliar:</span>
                <span className="text-[#fabd2f] font-bold text-[11px]">
                  r₁ = {solution.roots.r1}, r₂ = {solution.roots.r2}
                </span>
              </div>
            </div>

            {/* Formula LaTeX */}
            <div className="bg-[#1d2021] p-2.5 rounded-xs border border-[#3c3836] text-[11px] overflow-x-auto text-center">
              <MathView math={solution.analyticSolutionFormula} block />
            </div>
          </div>

          {/* Sliders de Parámetros Físicos */}
          <div className="bg-[#1d2021] border border-[#3c3836] rounded-sm p-4 space-y-4">
            <div className="text-xs font-bold text-[#fabd2f] flex items-center justify-between border-b border-[#3c3836] pb-2">
              <span className="flex items-center gap-1.5">
                <Sliders size={14} />
                <span>Modificar Parámetros Dinámicos</span>
              </span>
              <span className="text-[10px] text-[#7c6f64]">Ajuste en vivo</span>
            </div>

            {/* Masa m */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Masa de la Bomba (m):</span>
                <span className="text-[#fabd2f] font-bold">{params.m} kg</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={params.m}
                onChange={(e) => setParams({ ...params, m: parseFloat(e.target.value) })}
                className="w-full accent-[#fabd2f] cursor-pointer"
              />
            </div>

            {/* Fricción c */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Amortiguamiento Viscoso (c):</span>
                <span className="text-[#8ec07c] font-bold">{params.c} N·s/m</span>
              </div>
              <input
                type="range"
                min="0"
                max="4000"
                step="25"
                value={params.c}
                onChange={(e) => setParams({ ...params, c: parseFloat(e.target.value) })}
                className="w-full accent-[#8ec07c] cursor-pointer"
              />
              <div className="text-[10px] text-[#7c6f64] flex justify-between">
                <span>0 (Sin fricción)</span>
                <span>Crítico ≈ {(2 * Math.sqrt(params.m * params.k)).toFixed(0)}</span>
                <span>4000 (Alto)</span>
              </div>
            </div>

            {/* Constante k */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Rigidez del Resorte (k):</span>
                <span className="text-[#83a598] font-bold">{params.k} N/m</span>
              </div>
              <input
                type="range"
                min="2000"
                max="30000"
                step="500"
                value={params.k}
                onChange={(e) => setParams({ ...params, k: parseFloat(e.target.value) })}
                className="w-full accent-[#83a598] cursor-pointer"
              />
            </div>

            {/* Amplitud de Fuerza Forzada F0 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Amplitud Fuerza Motriz (F₀):</span>
                <span className="text-[#fe8019] font-bold">{params.F0} N</span>
              </div>
              <input
                type="range"
                min="0"
                max="1500"
                step="50"
                value={params.F0}
                onChange={(e) => setParams({ ...params, F0: parseFloat(e.target.value) })}
                className="w-full accent-[#fe8019] cursor-pointer"
              />
            </div>

            {/* Frecuencia impulsora omega */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Frecuencia Impulsora (ω):</span>
                <span className={`font-bold ${solution.isResonant ? 'text-[#fb4934]' : 'text-[#fbf1c7]'}`}>
                  {params.omega.toFixed(2)} rad/s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={params.omega}
                onChange={(e) => setParams({ ...params, omega: parseFloat(e.target.value) })}
                className="w-full accent-[#fb4934] cursor-pointer"
              />
              <div className="text-[10px] text-[#7c6f64] flex justify-between">
                <span>0 rad/s</span>
                <span className="text-[#fb4934]">Resonancia ≈ {solution.naturalFreq.toFixed(2)} rad/s</span>
                <span>20 rad/s</span>
              </div>
            </div>

            {/* Posición Inicial x0 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#ebdbb2]">Posición Inicial x(0):</span>
                <span className="text-[#d3869b] font-bold">{(params.x0 * 100).toFixed(1)} cm</span>
              </div>
              <input
                type="range"
                min="-0.1"
                max="0.1"
                step="0.01"
                value={params.x0}
                onChange={(e) => setParams({ ...params, x0: parseFloat(e.target.value) })}
                className="w-full accent-[#d3869b] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
