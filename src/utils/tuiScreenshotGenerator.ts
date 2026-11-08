/**
 * Generador de capturas gráficas de alta resolución del programa Ratatui/LazyVim
 * para incrustación directa en el documento .docx según normas APA 7.
 */

export function generateDashboardCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1100;
  canvas.height = 580;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Fondo Gruvbox BG_HARD
  ctx.fillStyle = '#1d2021';
  ctx.fillRect(0, 0, 0 + canvas.width, canvas.height);

  // Barra de título Neovim / LazyVim
  ctx.fillStyle = '#282828';
  ctx.fillRect(0, 0, canvas.width, 36);
  ctx.strokeStyle = '#3c3836';
  ctx.strokeRect(0, 0, canvas.width, 36);

  // Terminal dots
  const dots = ['#fb4934', '#fabd2f', '#b8bb26'];
  dots.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(22 + i * 18, 18, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  // Texto de título
  ctx.fillStyle = '#ebdbb2';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('ratatui-lazyvim :: ctev-ude-c · Ecuaciones Diferenciales (Trabajo Final)', 80, 23);

  // Bufferline tabs
  ctx.fillStyle = '#1d2021';
  ctx.fillRect(0, 36, canvas.width, 32);
  const tabs = ['1: 󱔗 Dashboard.rs', '2: 󰋚 U1_Modelos.rs', '3: 󰁨 U2_1erOrden.rs', '4: 󰊠 U3_MasaResorte.rs', '5: 󰆍 Simulador.rs'];
  let tabX = 10;
  tabs.forEach((t, i) => {
    ctx.fillStyle = i === 0 ? '#282828' : '#1d2021';
    ctx.fillRect(tabX, 36, 175, 32);
    ctx.strokeStyle = '#3c3836';
    ctx.strokeRect(tabX, 36, 175, 32);

    if (i === 0) {
      ctx.fillStyle = '#fabd2f';
      ctx.fillRect(tabX, 66, 175, 2);
      ctx.fillStyle = '#fabd2f';
    } else {
      ctx.fillStyle = '#a89984';
    }
    ctx.font = '12px monospace';
    ctx.fillText(t, tabX + 12, 57);
    tabX += 180;
  });

  // Ventana Principal (Dashboard)
  ctx.strokeStyle = '#fabd2f';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, 85, canvas.width - 40, canvas.height - 135);

  ctx.fillStyle = '#282828';
  ctx.fillRect(21, 86, canvas.width - 42, canvas.height - 137);

  // Título del bloque Ratatui
  ctx.fillStyle = '#fabd2f';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('┌── [ UNIVERSIDAD DE CARTAGENA · CTEV · TRABAJO FINAL ECUACIONES DIFERENCIALES ] ──┐', 40, 115);

  // Banner ASCII
  ctx.fillStyle = '#fabd2f';
  ctx.font = '12px monospace';
  const asciiLines = [
    '  ______ _____  _    _          _____ _____ ____  _   _ ______  _____ ',
    ' |  ____|  __ \\| |  | |   /\\   / ____|_   _/ __ \\| \\ | |  ____|/ ____|',
    ' | |__  | |  | | |  | |  /  \\ | |      | || |  | |  \\| | |__  | (___  ',
    ' |  __| | |  | | |  | | / /\\ \\| |      | || |  | | . ` |  __|  \\___ \\ ',
    ' | |____| |__| | |__| |/ ____ \\ |____ _| || |__| | |\\  | |____ ____) |',
    ' |______|_____/ \\____//_/    \\_\\_____|_____\\____/|_| \\_|______|_____/ '
  ];
  asciiLines.forEach((l, i) => {
    ctx.fillText(l, 60, 150 + i * 16);
  });

  // Metadatos y problemática
  ctx.fillStyle = '#ebdbb2';
  ctx.font = '13px monospace';
  ctx.fillText('Estudiante: Miguel Andrés Cuello Tarriba · Modalidad a Distancia', 60, 275);
  ctx.fillText('Problemática: Control Estructural de la Estación de Bombeo del Canal del Dique', 60, 298);

  // Cajas de los 3 módulos
  const modBoxes = [
    { title: 'U1: Definición y Clasificación', desc: 'EDO vs EDP, linealidad y modelo térmico de Newton.', col: '#8ec07c' },
    { title: 'U2: Métodos de 1er Orden', desc: 'Factor Integrante, variables separables y exactas.', col: '#83a598' },
    { title: 'U3: ED de Orden Superior', desc: 'Segunda Ley de Newton, oscilador y resonancia.', col: '#d3869b' },
  ];

  modBoxes.forEach((m, i) => {
    const bx = 60 + i * 325;
    ctx.strokeStyle = m.col;
    ctx.strokeRect(bx, 325, 305, 130);
    ctx.fillStyle = '#1d2021';
    ctx.fillRect(bx + 1, 326, 303, 128);

    ctx.fillStyle = m.col;
    ctx.font = 'bold 12px monospace';
    ctx.fillText(m.title, bx + 12, 352);

    ctx.fillStyle = '#ebdbb2';
    ctx.font = '11px monospace';
    ctx.fillText(m.desc, bx + 12, 380);
    ctx.fillStyle = '#fabd2f';
    ctx.fillText('✓ Resuelto y Verificado', bx + 12, 420);
  });

  // Statusline Lualine
  ctx.fillStyle = '#282828';
  ctx.fillRect(0, canvas.height - 35, canvas.width, 35);
  ctx.strokeStyle = '#3c3836';
  ctx.strokeRect(0, canvas.height - 35, canvas.width, 35);

  ctx.fillStyle = '#fabd2f';
  ctx.fillRect(0, canvas.height - 35, 110, 35);
  ctx.fillStyle = '#282828';
  ctx.font = 'bold 13px monospace';
  ctx.fillText(' NORMAL ', 20, canvas.height - 13);

  ctx.fillStyle = '#d5c4a1';
  ctx.font = '12px monospace';
  ctx.fillText(' main │ src/dashboard.rs │ utf-8 │ rust 1.82 │ Ln 1, Col 1', 130, canvas.height - 13);
  ctx.fillStyle = '#b8bb26';
  ctx.fillText('CTEV · Universidad de Cartagena', canvas.width - 290, canvas.height - 13);

  return canvas;
}

export function generateOscillatorCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1100;
  canvas.height = 550;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#1d2021';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Barra de título Neovim
  ctx.fillStyle = '#282828';
  ctx.fillRect(0, 0, canvas.width, 36);
  ctx.fillStyle = '#fabd2f';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('ratatui-lazyvim :: src/simulador/oscilador_tui.rs · Sistema Masa-Resorte Amortiguado', 25, 23);

  // Contenedor de la simulación
  ctx.strokeStyle = '#d3869b';
  ctx.strokeRect(20, 50, canvas.width - 40, canvas.height - 90);
  ctx.fillStyle = '#282828';
  ctx.fillRect(21, 51, canvas.width - 42, canvas.height - 92);

  // ASCII spring schematic
  ctx.fillStyle = '#1d2021';
  ctx.fillRect(40, 75, 480, 160);
  ctx.strokeStyle = '#3c3836';
  ctx.strokeRect(40, 75, 480, 160);

  ctx.fillStyle = '#a89984';
  ctx.font = '12px monospace';
  ctx.fillText('║ TECHO RÍGIDO (ANCLAJE DE BOMBA)', 55, 100);
  ctx.fillStyle = '#fabd2f';
  ctx.fillText('║ ├── Resorte (k = 10000 N/m): /\\/\\/\\/\\/\\/\\/\\/\\', 55, 125);
  ctx.fillStyle = '#83a598';
  ctx.fillText('║ └── Amortiguador Viscoso (c = 500 N·s/m): [===|===]', 55, 145);
  ctx.fillStyle = '#fbf1c7';
  ctx.fillText('║     ┌──────────────────────────────────┐', 55, 170);
  ctx.fillText('║     │ MASA BOMBA m = 250 kg (x = 3.4cm) │', 55, 190);
  ctx.fillText('║     └──────────────────────────────────┘', 55, 210);

  // Analytical Inspector Box
  ctx.fillStyle = '#1d2021';
  ctx.fillRect(540, 75, 520, 160);
  ctx.strokeStyle = '#504945';
  ctx.strokeRect(540, 75, 520, 160);

  ctx.fillStyle = '#fabd2f';
  ctx.font = 'bold 13px monospace';
  ctx.fillText('┌── DIAGNÓSTICO ANALÍTICO EXACTO (PVI) ──┐', 560, 100);

  ctx.fillStyle = '#ebdbb2';
  ctx.font = '12px monospace';
  ctx.fillText('• EDO Canónica: x\'\' + 2 x\' + 40 x = 2 cos(8t)', 560, 125);
  ctx.fillText('• Discriminante: Δ = c² - 4mk = -156 < 0 (SUBAMORTIGUADO)', 560, 148);
  ctx.fillText('• Raíces Complejas: r = -1 ± i√39 ≈ -1 ± 6.245i', 560, 171);
  ctx.fillText('• Frecuencia Natural: ω₀ = 6.325 rad/s | Impulsora: ω = 8.0 rad/s', 560, 194);
  ctx.fillStyle = '#b8bb26';
  ctx.fillText('✓ Margen de Seguridad frente a Resonancia: 26.5% (ESTABLE)', 560, 217);

  // Oscilograma x(t) en Canvas
  const plotX = 40;
  const plotY = 255;
  const plotW = 1020;
  const plotH = 220;

  ctx.fillStyle = '#1d2021';
  ctx.fillRect(plotX, plotY, plotW, plotH);
  ctx.strokeStyle = '#3c3836';
  ctx.strokeRect(plotX, plotY, plotW, plotH);

  // Grid
  ctx.strokeStyle = '#32302f';
  for (let gx = plotX; gx < plotX + plotW; gx += 60) {
    ctx.beginPath();
    ctx.moveTo(gx, plotY);
    ctx.lineTo(gx, plotY + plotH);
    ctx.stroke();
  }
  for (let gy = plotY; gy < plotY + plotH; gy += 35) {
    ctx.beginPath();
    ctx.moveTo(plotX, gy);
    ctx.lineTo(plotX + plotW, gy);
    ctx.stroke();
  }

  // Centro
  ctx.strokeStyle = '#504945';
  ctx.beginPath();
  ctx.moveTo(plotX, plotY + plotH / 2);
  ctx.lineTo(plotX + plotW, plotY + plotH / 2);
  ctx.stroke();

  // Curva de vibración subamortiguada
  ctx.strokeStyle = '#fabd2f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let px = 0; px < plotW; px++) {
    const t = (px / plotW) * 10;
    const xVal = Math.exp(-t) * (0.07885 * Math.cos(Math.sqrt(39) * t) - 0.01201 * Math.sin(Math.sqrt(39) * t)) - 0.02885 * Math.cos(8 * t) + 0.01923 * Math.sin(8 * t);
    const py = plotY + plotH / 2 - xVal * 1200;
    if (px === 0) ctx.moveTo(plotX + px, py);
    else ctx.lineTo(plotX + px, py);
  }
  ctx.stroke();

  // Etiquetas
  ctx.fillStyle = '#a89984';
  ctx.font = '11px monospace';
  ctx.fillText('Trayectoria x(t) en metros vs tiempo t [0..10 s]', plotX + 15, plotY + 20);
  ctx.fillText('+0.08 m', plotX + 15, plotY + 38);
  ctx.fillText('-0.08 m', plotX + 15, plotY + plotH - 10);
  ctx.fillText('0.0 m (Equilibrio estático)', plotX + 15, plotY + plotH / 2 - 4);

  return canvas;
}

export function canvasToUint8Array(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(new Uint8Array());
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(new Uint8Array(arrayBuffer));
      };
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}
