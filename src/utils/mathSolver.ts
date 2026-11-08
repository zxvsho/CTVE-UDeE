import { OscillatorParams, SimulationResult } from '../types';

export function solveOscillator(params: OscillatorParams, duration: number = 15, steps: number = 300): SimulationResult {
  const { m, c, k, F0, omega, x0, v0 } = params;

  const discriminant = c * c - 4 * m * k;
  const omega0 = Math.sqrt(k / m);
  const gamma = c / (2 * m);
  const isResonant = Math.abs(omega - omega0) / omega0 < 0.12 && F0 > 0;

  let regime: 'subamortiguado' | 'critico' | 'sobreamortiguado';
  let dampedFreq: number | undefined;
  let r1Str = '';
  let r2Str = '';
  let analyticFormula = '';

  if (discriminant < -1e-7) {
    regime = 'subamortiguado';
    dampedFreq = Math.sqrt(Math.max(0, omega0 * omega0 - gamma * gamma));
    r1Str = `-${gamma.toFixed(3)} + ${dampedFreq.toFixed(3)}i`;
    r2Str = `-${gamma.toFixed(3)} - ${dampedFreq.toFixed(3)}i`;
    analyticFormula = `x(t) = e^{-${gamma.toFixed(2)}t}[C_1 \\cos(${dampedFreq.toFixed(2)}t) + C_2 \\sin(${dampedFreq.toFixed(2)}t)] + x_p(t)`;
  } else if (Math.abs(discriminant) <= 1e-7) {
    regime = 'critico';
    r1Str = `-${gamma.toFixed(3)}`;
    r2Str = `-${gamma.toFixed(3)}`;
    analyticFormula = `x(t) = (C_1 + C_2 t)e^{-${gamma.toFixed(2)}t} + x_p(t)`;
  } else {
    regime = 'sobreamortiguado';
    const sqrtDisc = Math.sqrt(discriminant);
    const r1 = (-c + sqrtDisc) / (2 * m);
    const r2 = (-c - sqrtDisc) / (2 * m);
    r1Str = r1.toFixed(3);
    r2Str = r2.toFixed(3);
    analyticFormula = `x(t) = C_1 e^{${r1.toFixed(2)}t} + C_2 e^{${r2.toFixed(2)}t} + x_p(t)`;
  }

  // Numerical simulation with 4th Order Runge-Kutta (RK4)
  const dt = duration / steps;
  const tArr: number[] = [];
  const xArr: number[] = [];
  const vArr: number[] = [];

  let currentT = 0;
  let currentX = x0;
  let currentV = v0;

  const deriv = (t: number, x: number, v: number) => {
    const dxdt = v;
    const dvdt = (F0 * Math.cos(omega * t) - c * v - k * x) / m;
    return { dxdt, dvdt };
  };

  for (let i = 0; i <= steps; i++) {
    tArr.push(currentT);
    xArr.push(currentX);
    vArr.push(currentV);

    // RK4
    const k1 = deriv(currentT, currentX, currentV);
    const k2 = deriv(
      currentT + 0.5 * dt,
      currentX + 0.5 * dt * k1.dxdt,
      currentV + 0.5 * dt * k1.dvdt
    );
    const k3 = deriv(
      currentT + 0.5 * dt,
      currentX + 0.5 * dt * k2.dxdt,
      currentV + 0.5 * dt * k2.dvdt
    );
    const k4 = deriv(
      currentT + dt,
      currentX + dt * k3.dxdt,
      currentV + dt * k3.dvdt
    );

    currentX += (dt / 6) * (k1.dxdt + 2 * k2.dxdt + 2 * k3.dxdt + k4.dxdt);
    currentV += (dt / 6) * (k1.dvdt + 2 * k2.dvdt + 2 * k3.dvdt + k4.dvdt);
    currentT += dt;
  }

  return {
    t: tArr,
    x: xArr,
    v: vArr,
    discriminant,
    regime,
    naturalFreq: omega0,
    dampedFreq,
    gamma,
    roots: { r1: r1Str, r2: r2Str },
    analyticSolutionFormula: analyticFormula,
    isResonant,
  };
}
