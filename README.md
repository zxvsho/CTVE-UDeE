# Trabajo Final: Ecuaciones Diferenciales — CTEV Universidad de Cartagena
### *Modelado, Resolución y Simulación Computacional en Rust/Ratatui con Estilo LazyVim y Tema Gruvbox*

[![Rust](https://img.shields.io/badge/Rust-1.82%2B-orange.svg?logo=rust)](https://www.rust-lang.org/)
[![Ratatui](https://img.shields.io/badge/TUI-Ratatui%200.29-red.svg)](https://ratatui.rs/)
[![Editor Style](https://img.shields.io/badge/Style-LazyVim%20%2F%20Neovim-blueviolet.svg?logo=neovim)](https://lazyvim.github.io/)
[![Theme](https://img.shields.io/badge/Palette-Gruvbox%20Dark-yellow.svg)](https://github.com/morhetz/gruvbox)
[![Universidad de Cartagena](https://img.shields.io/badge/Instituci%C3%B3n-Universidad%20de%20Cartagena%20CTEV-gold.svg)](https://unicartagena.edu.co)
[![Normas APA](https://img.shields.io/badge/Documento-Normas%20APA%207%C2%AA%20Ed.-green.svg)](https://apastyle.apa.org/)

---

## 📌 Datos Generales del Proyecto
* **Institución:** Universidad de Cartagena
* **Unidad Académica:** Centro de Tecnologías para la Educación Virtual (CTEV)
* **Programa:** Ingeniería de Sistemas / Software (Modalidad a Distancia)
* **Asignatura:** Ecuaciones Diferenciales
* **Estudiante:** Miguel Andrés Cuello Tarriba
* **Correo:** `miguelandrescuellotarriba600@gmail.com`
* **Ciudad y Año:** Cartagena de Indias, D.T. y C., Colombia · 2026

---

## 🎯 Descripción de la Problemática de Ingeniería
El trabajo final articula de manera integral los **tres módulos temáticos** del curso a través de un caso real del Caribe colombiano:
> **"Diseño, Modelado y Control Dinámico de Amortiguación Estructural y Calidad Hidráulica en la Estación de Bombeo del Canal del Dique (Cartagena de Indias)"**

La estación capta agua cruda del Canal del Dique impulsada por electrobombas centrífugas de 150 kW trabajando ininterrumpidamente. Se resuelven analítica y computacionalmente tres problemáticas críticas:

1. **Refrigeración Térmica de Transformadores (Unidad 1):** Determinación del tiempo de disipación de calor por convección tras la desconexión desde 95 °C en un ambiente costero a 30 °C, para permitir la inspección humana segura por debajo de 45 °C.
2. **Control de Salinidad en Tanque de Tratamiento (Unidad 2):** Modelado de la cantidad de sal $Q(t)$ en un reactor de 1000 Litros con flujos salinos y dosificación química continua mediante balance diferencial de masa.
3. **Control de Vibraciones y Mitigación de Resonancia en la Electrobomba (Unidad 3):** Modelado físico mediante la Segunda Ley de Newton ($F = ma$) del oscilador amortiguado y forzado, evaluando el discriminante $\Delta$ y garantizando un margen de seguridad amplio frente a la catástrofe por resonancia mecánica.

---

## 📚 Desarrollo Curricular por Módulos

### 📘 Unidad 1: Definición y Clasificación de Ecuaciones Diferenciales
* **Fundamentos epistemológicos:** Origen histórico en el cálculo infinitesimal de Newton y Leibniz.
* **Clasificación formal:**
  * **Por Tipo:** EDO (una sola variable independiente) vs. EDP (múltiples variables independientes).
  * **Por Orden:** Determinado por la derivada de mayor orden presente.
  * **Por Linealidad:** Dependiente lineal en $y, y', \dots, y^{(n)}$, sin productos cruzados ni funciones no lineales compuestas.
* **Modelo resuelto:** Ley de Enfriamiento de Newton:
  $$\frac{dT}{dt} = -k(T - T_m), \quad T(0) = 95^\circ\text{C}, \quad T_m = 30^\circ\text{C}, \quad T(10) = 82^\circ\text{C}$$
  $$\implies T(t) = 30 + 65 e^{-0.022314 t} \quad \longrightarrow \quad t_{\text{seguro}} (45^\circ\text{C}) \approx 65.71\text{ minutos}$$

### 📗 Unidad 2: Métodos de Solución de EDO de Primer Orden
* **Métodos analíticos desarrollados:**
  1. **Variables Separables:** Integración directa $g(y)dy = f(x)dx$ con técnicas de cálculo (integración por partes).
  2. **Ecuaciones Lineales y Factor Integrante:** Forma canónica $y' + P(x)y = Q(x)$ con $\mu(x) = \exp(\int P(x)dx)$.
  3. **Ecuaciones Exactas y Factores de Integración:** Criterio de Euler $\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x}$ y factores multiplicadores $\mu(x) = \exp\left(\int \frac{M_y - N_x}{N}dx\right)$.
* **Modelo resuelto:** Homogenización de salinidad en el tanque de Cartagena:
  $$\frac{dQ}{dt} + 0.01 Q = 0.5, \quad Q(0) = 20\text{ kg}$$
  $$\implies Q(t) = 50 - 30 e^{-0.01 t} \quad \implies \quad Q(60) = 33.54\text{ kg}, \quad \lim_{t\to\infty} Q(t) = 50\text{ kg}$$

### 📙 Unidad 3: Ecuaciones Diferenciales Lineales de Orden Superior
* **Punto de partida:** La Segunda Ley de Newton ($F = ma$) como EDO de segundo orden ($a = d^2x/dt^2$).
* **Oscilador Masa-Resorte Amortiguado y Forzado:**
  $$m \frac{d^2x}{dt^2} + c \frac{dx}{dt} + k x = F_0 \cos(\omega t)$$
* **Ecuación Auxiliar o Característica:** $m r^2 + c r + k = 0$.
  * **Subamortiguado ($\Delta < 0$):** Raíces complejas $r = -\gamma \pm i\omega_d$, oscilaciones con envolvente decreciente.
  * **Crítico ($\Delta = 0$):** Raíz real repetida, retorno rápido al equilibrio sin oscilación.
  * **Sobreamortiguado ($\Delta > 0$):** Dos raíces reales distintas, respuesta lenta aperiódica.
* **Modelo resuelto (Electrobomba de 250 kg en Cartagena):**
  $$250 x'' + 500 x' + 10000 x = 500 \cos(8t), \quad x(0) = 0.05\text{ m}, \quad x'(0) = 0\text{ m/s}$$
  * Discriminante: $\Delta = c^2 - 4mk = (500)^2 - 4(250)(10000) = -9,750,000 \implies r^2 + 2r + 40 = 0 \implies \Delta = -156 < 0$ (**Subamortiguado**).
  * Solución analítica completa:
    $$x(t) = e^{-t}\left[ 0.0789 \cos(6.245 t) - 0.0120 \sin(6.245 t) \right] - 0.0288 \cos(8t) + 0.0192 \sin(8t)$$
  * **Diagnóstico de Resonancia:** $\omega_0 = \sqrt{k/m} = \sqrt{40} \approx 6.325\text{ rad/s}$ frente a $\omega = 8.0\text{ rad/s}$ del motor (margen de seguridad del **26.5%**, impidiendo la fatiga destructiva).

---

## 💻 Arquitectura del Software (Rust + Ratatui + LazyVim + Gruvbox)

La aplicación implementa una interfaz de terminal TUI nativa y un entorno web interactivo que reproduce con fidelidad:
* **LazyVim Bufferline Superior:** Pestañas indexadas (`1..8`) con extensiones de archivo `.rs`, `.md` y `.docx`.
* **Lualine Statusline Inferior:** Modos de Neovim (`[ NORMAL ]`, `[ INSERT ]`, `[ COMMAND ]`), rama Git, archivo activo, diagnósticos y posición del cursor.
* **Which-Key Popup (`<Space>`):** Menú flotante estilo LazyVim con atajos agrupados.
* **Paleta Gruvbox Dark Oficial:**
  * Fondos: `#1d2021` (bg0_hard), `#282828` (bg0), `#3c3836` (bg1).
  * Primer plano: `#ebdbb2` (fg1), `#fbf1c7` (fg0), `#a89984` (fg4).
  * Acentos retro: `#fabd2f` (amarillo), `#b8bb26` (verde), `#fb4934` (rojo), `#83a598` (azul), `#d3869b` (púrpura), `#fe8019` (naranja), `#8ec07c` (aqua).
* **Simulador Numérico:**
  * Animación en tiempo real del resorte elástico en ASCII (`/\/\/\/\`) y del pistón amortiguador viscoso.
  * Osciloscopio para el desplazamiento $x(t)$ e integrador numérico Runge-Kutta 4 (RK4).
  * Plano de fase en dos dimensiones $(x \text{ vs } v)$ con análisis de atractores.

---

## ⌨️ Atajos de Teclado (Keybindings LazyVim)

| Tecla | Acción en la Aplicación |
| :--- | :--- |
| `<Space>` | Abre / cierra el menú flotante **Which-Key** |
| `1` a `8` | Salto directo entre pestañas (Dashboard, U1, U2, U3, Simulador, Rust, Informe, DOCX) |
| `j` / `k` | Desplazamiento vertical suave (scroll down / up) |
| `:` | Abre la línea de comandos de Neovim (`:w`, `:q`, `:docx`, `:crt`, `:help`) |
| `r` | Reinicia las condiciones iniciales del oscilador dinámico |
| `p` | Abre el cuadro de diálogo para imprimir o guardar en PDF |
| `a` | Abre el **Tutor Inteligente IA (Gemini)** para resolver dudas del curso |
| `Esc` | Cierra cualquier modal flotante y retorna al modo `NORMAL` |

---

## 🚀 Guía de Compilación y Ejecución

### Opción A: Ejecutar el Proyecto Web / Servidor Completo
```bash
# 1. Clonar el repositorio
git clone https://github.com/usuario/ecuaciones-diferenciales-ctev-udec.git
cd ecuaciones-diferenciales-ctev-udec

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo en http://localhost:3000
npm run dev
```

### Opción B: Compilar el Software Nativo en Rust (Ratatui TUI)
El proyecto incluye el código fuente nativo de Rust listo para compilar con Cargo:
```bash
# Navegar a la carpeta del proyecto Rust
cd rust_project

# Verificar sintaxis y tipos
cargo check

# Compilar en modo optimizado con LTO (Link-Time Optimization)
cargo build --release

# Ejecutar la aplicación en la terminal
cargo run --release
```

Dependencias de `Cargo.toml`:
```toml
[dependencies]
ratatui = { version = "0.29.0", features = ["all-widgets"] }
crossterm = { version = "0.28.1", features = ["event-stream"] }
color-eyre = "0.6.3"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

---

## 🌐 Despliegue en GitHub Pages (Página Web Pública Gratuita)

Esta aplicación está **100% preparada para funcionar como página web estática pública en GitHub Pages**:
* Se configuró `base: './'` en `vite.config.ts` para rutas relativas automáticas.
* Se incluyó el flujo de integración continua en `.github/workflows/deploy.yml`.
* Toda la física, el solucionador analítico, el motor RK4, KaTeX y el exportador a `.docx` se ejecutan 100% en el navegador del usuario.

### Pasos para Activar tu Página en GitHub Pages:
1. Sube tu código al repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Publicar aplicación CTEV Ecuaciones Diferenciales"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```
2. En GitHub, abre tu repositorio y ve a **Settings** (Configuración) > **Pages**.
3. En **Build and deployment > Source**, selecciona: **GitHub Actions**.
4. ¡Listo! En 1 minuto tu aplicación estará disponible en vivo en:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

---

## 📄 Generador del Documento Oficial en Word (`.docx`)
La aplicación cuenta con un módulo de exportación a Microsoft Word (`.docx`) conforme a las **Normas APA (7.ª edición)** que incluye:
1. **Hoja de Presentación (Portada APA 7):** Datos del estudiante, docente, asignatura e institución.
2. **Tabla de Contenidos:** Con guías punteadas y paginación formal.
3. **Descripción de la Problemática:** Contextualizada en el Canal del Dique.
4. **Justificación:** Dimensiones técnica, social, ambiental y académica.
5. **Objetivos:** Objetivo general y 4 específicos.
6. **Descripción Detallada de la Solución Planteada:** Desarrollo matemático riguroso de las Unidades 1, 2 y 3.
7. **Resultados o Discusión:** Tabla comparativa sin líneas verticales y **Figuras 1 y 2 con capturas reales de alta resolución** del software en Rust incrustadas.
8. **Bibliografía:** En formato APA con sangría francesa.

> Para descargarlo: Haz clic en la pestaña **`8: Descargar DOCX`** en el programa o escribe `:docx` en la consola.

---

## 📖 Referencias Bibliográficas (Normas APA 7)
* Boyce, W. E., & DiPrima, R. C. (2017). *Ecuaciones diferenciales y problemas con valores en la frontera* (10ª ed.). Limusa Wiley.
* Edwards, C. H., & Penney, D. E. (2009). *Ecuaciones diferenciales y problemas con valores en la frontera: Cómputo y modelado* (4ª ed.). Pearson Educación.
* Klabnik, S., & Nichols, C. (2023). *The Rust programming language* (2nd ed.). No Starch Press.
* Ratatui Contributors. (2024). *Ratatui: A Rust library to build rich Terminal User Interfaces (v0.29.0)* [Software]. https://ratatui.rs
* Universidad de Cartagena - CTEV. (2026). *Módulos de aprendizaje de ecuaciones diferenciales: Unidad 1, Unidad 2 y Unidad 3*. Centro de Tecnologías para la Educación Virtual, Cartagena de Indias, Colombia.
* Zill, D. G. (2018). *Ecuaciones diferenciales con aplicaciones de modelado* (11ª ed.). Cengage Learning.

---
*Desarrollado con dedicación para el CTEV de la Universidad de Cartagena · 2026*
