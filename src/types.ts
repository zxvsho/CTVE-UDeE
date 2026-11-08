export type TuiTab = 
  | 'dashboard' 
  | 'unidad1' 
  | 'unidad2' 
  | 'unidad3' 
  | 'simulador' 
  | 'rust_code' 
  | 'informe'
  | 'docx_export';

export type VimMode = 'NORMAL' | 'INSERT' | 'VISUAL' | 'COMMAND';

export interface OscillatorParams {
  m: number; // masa (kg)
  c: number; // amortiguamiento (N*s/m)
  k: number; // constante de resorte (N/m)
  F0: number; // fuerza externa amplitud (N)
  omega: number; // frecuencia impulsora (rad/s)
  x0: number; // posición inicial (m)
  v0: number; // velocidad inicial (m/s)
}

export interface SimulationResult {
  t: number[];
  x: number[];
  v: number[];
  discriminant: number;
  regime: 'subamortiguado' | 'critico' | 'sobreamortiguado';
  naturalFreq: number; // omega_0 = sqrt(k/m)
  dampedFreq?: number; // omega_d = sqrt(omega_0^2 - gamma^2)
  gamma: number; // c / (2m)
  roots: { r1: string; r2: string };
  analyticSolutionFormula: string;
  isResonant: boolean;
}

export interface TankMixingParams {
  V0: number; // volumen inicial (L)
  Q0: number; // cantidad inicial de sal (kg)
  rin: number; // tasa de entrada (L/min)
  Cin: number; // concentración de entrada (kg/L)
  rout: number; // tasa de salida (L/min)
  totalTime: number; // minutos
}

export interface CoolingParams {
  T0: number; // temperatura inicial (°C)
  Tm: number; // temperatura del medio (°C)
  k: number; // constante de enfriamiento (1/min)
  totalTime: number; // minutos
}
