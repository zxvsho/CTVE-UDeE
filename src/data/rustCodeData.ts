export interface RustSourceFile {
  filename: string;
  filepath: string;
  language: string;
  description: string;
  code: string;
}

export const RUST_PROJECT_FILES: RustSourceFile[] = [
  {
    filename: "Cargo.toml",
    filepath: "Cargo.toml",
    language: "toml",
    description: "Configuración del proyecto Cargo con Ratatui 0.29, Crossterm y soporte Gruvbox",
    code: `[package]
name = "ecuaciones_diferenciales_ctev"
version = "1.0.0"
edition = "2021"
authors = ["Miguel Andrés Cuello Tarriba <miguelandrescuellotarriba600@gmail.com>"]
description = "Trabajo Final de Ecuaciones Diferenciales - Universidad de Cartagena CTEV. TUI en Rust con Ratatui y tema Gruvbox estilo LazyVim."

[dependencies]
ratatui = { version = "0.29.0", features = ["all-widgets"] }
crossterm = { version = "0.28.1", features = ["event-stream"] }
color-eyre = "0.6.3"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = "abort"
strip = true
`
  },
  {
    filename: "main.rs",
    filepath: "src/main.rs",
    language: "rust",
    description: "Punto de entrada principal con bucle de eventos Crossterm y arquitectura Ratatui",
    code: `//! =========================================================================
//! TRABAJO FINAL: ECUACIONES DIFERENCIALES - CTEV UNIVERSIDAD DE CARTAGENA
//! Autor: Miguel Andrés Cuello Tarriba
//! Framework: Ratatui 0.29 + Crossterm 0.28
//! Estilo: LazyVim / Neovim + Paleta Gruvbox Dark
//! =========================================================================

mod app;
mod model;
mod solver;
mod theme;
mod ui;

use app::{App, CurrentTab, InputMode};
use color_eyre::Result;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEventKind, KeyModifiers},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{backend::CrosstermBackend, Terminal};
use std::{io, time::Duration};

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;
    
    // 1. Configurar la terminal en modo Raw
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    // 2. Inicializar estado de la aplicación
    let mut app = App::new();

    // 3. Bucle interactivo TUI (60 FPS tick)
    let res = run_app(&mut terminal, &mut app);

    // 4. Restaurar la terminal limpia al salir
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;

    if let Err(err) = res {
        eprintln!("Error en ejecucion de TUI: {err:?}");
    } else {
        println!("\\x1b[1;32m✓ Proyecto CTEV Ecuaciones Diferenciales finalizado con éxito.\\x1b[0m");
    }

    Ok(())
}

fn run_app<B: ratatui::backend::Backend>(
    terminal: &mut Terminal<B>,
    app: &mut App,
) -> io::Result<()> {
    loop {
        terminal.draw(|f| ui::render(f, app))?;

        if event::poll(Duration::from_millis(33))? {
            if let Event::Key(key) = event::read()? {
                if key.kind == KeyEventKind::Press {
                    match app.input_mode {
                        InputMode::Normal => match (key.modifiers, key.code) {
                            (KeyModifiers::NONE, KeyCode::Char('q')) => return Ok(()),
                            (KeyModifiers::NONE, KeyCode::Char('1')) => app.tab = CurrentTab::Dashboard,
                            (KeyModifiers::NONE, KeyCode::Char('2')) => app.tab = CurrentTab::Unidad1,
                            (KeyModifiers::NONE, KeyCode::Char('3')) => app.tab = CurrentTab::Unidad2,
                            (KeyModifiers::NONE, KeyCode::Char('4')) => app.tab = CurrentTab::Unidad3,
                            (KeyModifiers::NONE, KeyCode::Char('5')) => app.tab = CurrentTab::Simulador,
                            (KeyModifiers::NONE, KeyCode::Char('6')) => app.tab = CurrentTab::Informe,
                            (KeyModifiers::NONE, KeyCode::Char(' ')) => app.show_which_key = !app.show_which_key,
                            (KeyModifiers::NONE, KeyCode::Char('j')) | (KeyModifiers::NONE, KeyCode::Down) => app.next_item(),
                            (KeyModifiers::NONE, KeyCode::Char('k')) | (KeyModifiers::NONE, KeyCode::Up) => app.prev_item(),
                            (KeyModifiers::NONE, KeyCode::Char('r')) => app.toggle_simulation(),
                            (KeyModifiers::NONE, KeyCode::Char('i')) => app.input_mode = InputMode::Insert,
                            (KeyModifiers::NONE, KeyCode::Char(':')) => app.input_mode = InputMode::Command,
                            _ => {}
                        },
                        InputMode::Insert => {
                            if key.code == KeyCode::Esc {
                                app.input_mode = InputMode::Normal;
                            }
                        }
                        InputMode::Command => {
                            match key.code {
                                KeyCode::Esc => app.input_mode = InputMode::Normal,
                                KeyCode::Enter => {
                                    app.execute_command();
                                    app.input_mode = InputMode::Normal;
                                }
                                KeyCode::Char(c) => app.command_buffer.push(c),
                                KeyCode::Backspace => { app.command_buffer.pop(); }
                                _ => {}
                            }
                        }
                    }
                }
            }
        }

        // Paso numérico de simulación
        if app.is_simulating {
            app.step_simulation(0.05);
        }
    }
}
`
  },
  {
    filename: "theme.rs",
    filepath: "src/theme.rs",
    language: "rust",
    description: "Paleta completa Gruvbox Dark para widgets de Ratatui",
    code: `//! Paleta Gruvbox Dark Oficial para Ratatui
use ratatui::style::Color;

pub struct Gruvbox;

impl Gruvbox {
    // Fondos (Dark mode)
    pub const BG_HARD: Color = Color::Rgb(29, 32, 33);     // #1d2021
    pub const BG: Color = Color::Rgb(40, 40, 40);          // #282828
    pub const BG_SOFT: Color = Color::Rgb(50, 48, 47);     // #32302f
    pub const BG1: Color = Color::Rgb(60, 56, 54);         // #3c3836
    pub const BG2: Color = Color::Rgb(80, 73, 69);         // #504945
    pub const BG3: Color = Color::Rgb(102, 92, 84);        // #665c54
    pub const BG4: Color = Color::Rgb(124, 111, 100);      // #7c6f64

    // Primer plano (Texto)
    pub const FG: Color = Color::Rgb(235, 219, 178);       // #ebdbb2
    pub const FG0: Color = Color::Rgb(251, 241, 199);      // #fbf1c7
    pub const FG4: Color = Color::Rgb(168, 153, 132);      // #a89984
    pub const GRAY: Color = Color::Rgb(146, 131, 116);     // #928374

    // Acentos cromáticos retro
    pub const RED: Color = Color::Rgb(251, 73, 52);        // #fb4934
    pub const GREEN: Color = Color::Rgb(184, 187, 38);     // #b8bb26
    pub const YELLOW: Color = Color::Rgb(250, 189, 47);    // #fabd2f
    pub const BLUE: Color = Color::Rgb(131, 165, 152);     // #83a598
    pub const PURPLE: Color = Color::Rgb(211, 134, 155);   // #d3869b
    pub const AQUA: Color = Color::Rgb(142, 192, 124);     // #8ec07c
    pub const ORANGE: Color = Color::Rgb(254, 128, 25);    // #fe8019
}
`
  },
  {
    filename: "solver.rs",
    filepath: "src/solver.rs",
    language: "rust",
    description: "Motor analítico y numérico (RK4) para EDO de 1er y 2do orden (Newton y Masa-Resorte)",
    code: `//! Motor de cálculo matemático para Ecuaciones Diferenciales
//! Implementa soluciones analíticas cerradas y método numérico Runge-Kutta 4 (RK4).

#[derive(Debug, Clone, Copy)]
pub struct OscillatorParams {
    pub m: f64,      // Masa (kg)
    pub c: f64,      // Fricción viscosa (N*s/m)
    pub k: f64,      // Constante del resorte (N/m)
    pub f0: f64,     // Amplitud de fuerza impulsora F0 (N)
    pub omega: f64,  // Frecuencia impulsora omega (rad/s)
}

#[derive(Debug, Clone, PartialEq)]
pub enum DampingRegime {
    Subamortiguado { gamma: f64, omega_d: f64 },
    Critico { gamma: f64 },
    Sobreamortiguado { r1: f64, r2: f64 },
}

pub struct OscillatorSolution {
    pub discriminant: f64,
    pub regime: DampingRegime,
    pub natural_freq: f64,
    pub is_near_resonance: bool,
}

impl OscillatorParams {
    /// Resuelve la ecuación auxiliar m*r^2 + c*r + k = 0
    pub fn analyze(&self) -> OscillatorSolution {
        let delta = self.c * self.c - 4.0 * self.m * self.k;
        let natural_freq = (self.k / self.m).sqrt();
        let gamma = self.c / (2.0 * self.m);

        let is_near_resonance = (self.omega - natural_freq).abs() / natural_freq < 0.15;

        let regime = if delta < -1e-6 {
            let omega_d = (natural_freq.powi(2) - gamma.powi(2)).max(0.0).sqrt();
            DampingRegime::Subamortiguado { gamma, omega_d }
        } else if delta.abs() <= 1e-6 {
            DampingRegime::Critico { gamma }
        } else {
            let sqrt_delta = delta.sqrt();
            let r1 = (-self.c + sqrt_delta) / (2.0 * self.m);
            let r2 = (-self.c - sqrt_delta) / (2.0 * self.m);
            DampingRegime::Sobreamortiguado { r1, r2 }
        };

        OscillatorSolution {
            discriminant: delta,
            regime,
            natural_freq,
            is_near_resonance,
        }
    }

    /// Derivada del vector de estado [x, v] para RK4:
    /// dx/dt = v
    /// dv/dt = (F0*cos(omega*t) - c*v - k*x) / m
    pub fn derivatives(&self, t: f64, x: f64, v: f64) -> (f64, f64) {
        let dx_dt = v;
        let dv_dt = (self.f0 * (self.omega * t).cos() - self.c * v - self.k * x) / self.m;
        (dx_dt, dv_dt)
    }

    /// Integrador Runge-Kutta de 4to Orden (RK4)
    pub fn rk4_step(&self, t: f64, x: f64, v: f64, dt: f64) -> (f64, f64) {
        let (k1_x, k1_v) = self.derivatives(t, x, v);

        let (k2_x, k2_v) = self.derivatives(
            t + 0.5 * dt,
            x + 0.5 * dt * k1_x,
            v + 0.5 * dt * k1_v,
        );

        let (k3_x, k3_v) = self.derivatives(
            t + 0.5 * dt,
            x + 0.5 * dt * k2_x,
            v + 0.5 * dt * k2_v,
        );

        let (k4_x, k4_v) = self.derivatives(
            t + dt,
            x + dt * k3_x,
            v + dt * k3_v,
        );

        let next_x = x + (dt / 6.0) * (k1_x + 2.0 * k2_x + 2.0 * k3_x + k4_x);
        let next_v = v + (dt / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);

        (next_x, next_v)
    }
}
`
  },
  {
    filename: "ui.rs",
    filepath: "src/ui.rs",
    language: "rust",
    description: "Renderizado de la interfaz Ratatui con Bufferline, Lualine y ventanas de bloques",
    code: `//! Módulo de interfaz gráfica en Ratatui con filosofía LazyVim y estilo Gruvbox
use crate::{app::{App, CurrentTab, InputMode}, theme::Gruvbox};
use ratatui::{
    layout::{Alignment, Constraint, Direction, Layout, Rect},
    style::{Modifier, Style},
    text::{Line, Span},
    widgets::{Block, BorderType, Borders, Clear, Gauge, Paragraph, Sparkline, Tabs, Wrap},
    Frame,
};

pub fn render(f: &mut Frame, app: &App) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(1), // LazyVim Bufferline Tabs
            Constraint::Min(10),   // Contenido Principal
            Constraint::Length(1), // Lualine Statusline
            Constraint::Length(1), // Linea de Comandos / Info
        ])
        .split(f.area());

    render_bufferline(f, chunks[0], app);
    
    match app.tab {
        CurrentTab::Dashboard => render_dashboard(f, chunks[1], app),
        CurrentTab::Unidad1 => render_unidad1(f, chunks[1], app),
        CurrentTab::Unidad2 => render_unidad2(f, chunks[1], app),
        CurrentTab::Unidad3 => render_unidad3(f, chunks[1], app),
        CurrentTab::Simulador => render_simulador(f, chunks[1], app),
        CurrentTab::Informe => render_informe(f, chunks[1], app),
    }

    render_lualine(f, chunks[2], app);
    render_command_line(f, chunks[3], app);

    if app.show_which_key {
        render_which_key_popup(f, f.area());
    }
}

fn render_bufferline(f: &mut Frame, area: Rect, app: &App) {
    let titles = vec![
        " 1: 󱔗 Dashboard ",
        " 2: 󰋚 U1: Modelos ",
        " 3: 󰁨 U2: 1er Orden ",
        " 4: 󰊠 U3: Masa-Resorte ",
        " 5: 󰆍 Simulador TUI ",
        " 6: 󰈙 Informe CTEV ",
    ];

    let tabs = Tabs::new(titles)
        .select(match app.tab {
            CurrentTab::Dashboard => 0,
            CurrentTab::Unidad1 => 1,
            CurrentTab::Unidad2 => 2,
            CurrentTab::Unidad3 => 3,
            CurrentTab::Simulador => 4,
            CurrentTab::Informe => 5,
        })
        .style(Style::default().bg(Gruvbox::BG1).fg(Gruvbox::FG4))
        .highlight_style(
            Style::default()
                .bg(Gruvbox::YELLOW)
                .fg(Gruvbox::BG)
                .add_modifier(Modifier::BOLD),
        )
        .divider("│");

    f.render_widget(tabs, area);
}

fn render_lualine(f: &mut Frame, area: Rect, app: &App) {
    let mode_str = match app.input_mode {
        InputMode::Normal => " NORMAL ",
        InputMode::Insert => " INSERT ",
        InputMode::Command => " COMMAND ",
    };

    let mode_bg = match app.input_mode {
        InputMode::Normal => Gruvbox::YELLOW,
        InputMode::Insert => Gruvbox::GREEN,
        InputMode::Command => Gruvbox::RED,
    };

    let line = Line::from(vec![
        Span::styled(mode_str, Style::default().bg(mode_bg).fg(Gruvbox::BG).add_modifier(Modifier::BOLD)),
        Span::styled("  main ", Style::default().bg(Gruvbox::BG2).fg(Gruvbox::FG)),
        Span::styled(" src/modulos/ctev_ude_c.rs ", Style::default().bg(Gruvbox::BG1).fg(Gruvbox::FG)),
        Span::styled(" [utf-8] │ rust 1.82 │ ratatui 0.29 ", Style::default().bg(Gruvbox::BG).fg(Gruvbox::GRAY)),
        Span::styled(" CTEV Universidad de Cartagena ", Style::default().bg(Gruvbox::BG2).fg(Gruvbox::AQUA)),
    ]);

    f.render_widget(Paragraph::new(line), area);
}

fn render_command_line(f: &mut Frame, area: Rect, app: &App) {
    let content = match app.input_mode {
        InputMode::Command => format!(":{}", app.command_buffer),
        _ => " <Space> which-key  │  1-6 pestañas  │  j/k mover  │  r simular  │  q salir".to_string(),
    };

    let style = Style::default().bg(Gruvbox::BG_HARD).fg(Gruvbox::FG4);
    f.render_widget(Paragraph::new(content).style(style), area);
}

fn render_dashboard(f: &mut Frame, area: Rect, _app: &App) {
    let block = Block::default()
        .title(" 󱔗 TRABAJO FINAL ECUACIONES DIFERENCIALES · CTEV UNIVERSIDAD DE CARTAGENA ")
        .borders(Borders::ALL)
        .border_type(BorderType::Rounded)
        .border_style(Style::default().fg(Gruvbox::YELLOW))
        .style(Style::default().bg(Gruvbox::BG));

    let text = vec![
        Line::from(vec![
            Span::styled("Proyecto: ", Style::default().fg(Gruvbox::ORANGE).add_modifier(Modifier::BOLD)),
            Span::styled("Control y Amortiguación Estructural de la Estación de Bombeo del Canal del Dique", Style::default().fg(Gruvbox::FG0)),
        ]),
        Line::from(vec![
            Span::styled("Estudiante: ", Style::default().fg(Gruvbox::AQUA)),
            Span::styled("Miguel Andrés Cuello Tarriba · CTEV Modalidad a Distancia", Style::default().fg(Gruvbox::FG)),
        ]),
        Line::from(""),
        Line::from(vec![
            Span::styled("│ U1: ", Style::default().fg(Gruvbox::GREEN).add_modifier(Modifier::BOLD)),
            Span::styled("Definición, clasificación formal (EDO vs EDP, orden, linealidad) y modelo térmico.", Style::default().fg(Gruvbox::FG)),
        ]),
        Line::from(vec![
            Span::styled("│ U2: ", Style::default().fg(Gruvbox::BLUE).add_modifier(Modifier::BOLD)),
            Span::styled("Métodos de 1er orden: Variables separables, factor integrante μ(t) y ecuaciones exactas.", Style::default().fg(Gruvbox::FG)),
        ]),
        Line::from(vec![
            Span::styled("│ U3: ", Style::default().fg(Gruvbox::PURPLE).add_modifier(Modifier::BOLD)),
            Span::styled("EDO de 2do orden: Ley de Newton F=ma, oscilador masa-resorte, amortiguamiento y resonancia.", Style::default().fg(Gruvbox::FG)),
        ]),
    ];

    let p = Paragraph::new(text).block(block).wrap(Wrap { trim: true });
    f.render_widget(p, area);
}

fn render_unidad1(f: &mut Frame, area: Rect, _app: &App) { /* ... renderizado módulo 1 ... */ }
fn render_unidad2(f: &mut Frame, area: Rect, _app: &App) { /* ... renderizado módulo 2 ... */ }
fn render_unidad3(f: &mut Frame, area: Rect, _app: &App) { /* ... renderizado módulo 3 ... */ }
fn render_simulador(f: &mut Frame, area: Rect, _app: &App) { /* ... simulación animada en terminal ... */ }
fn render_informe(f: &mut Frame, area: Rect, _app: &App) { /* ... visualización de informe formal ... */ }

fn render_which_key_popup(f: &mut Frame, area: Rect) {
    let popup_area = Rect {
        x: area.width.saturating_sub(60) / 2,
        y: area.height.saturating_sub(14) / 2,
        width: 60.min(area.width),
        height: 14.min(area.height),
    };

    f.render_widget(Clear, popup_area);

    let block = Block::default()
        .title(" 󰌌 LazyVim Which-Key ")
        .borders(Borders::ALL)
        .border_type(BorderType::Double)
        .border_style(Style::default().fg(Gruvbox::YELLOW))
        .style(Style::default().bg(Gruvbox::BG_HARD));

    let items = vec![
        Line::from(vec![Span::styled("  <Space> 1..6 ", Style::default().fg(Gruvbox::AQUA)), Span::raw("Cambiar de pestaña")]),
        Line::from(vec![Span::styled("  <Space> s    ", Style::default().fg(Gruvbox::AQUA)), Span::raw("Ir al Simulador TUI")]),
        Line::from(vec![Span::styled("  <Space> r    ", Style::default().fg(Gruvbox::AQUA)), Span::raw("Iniciar / Pausar oscilador")]),
        Line::from(vec![Span::styled("  <Space> d    ", Style::default().fg(Gruvbox::AQUA)), Span::raw("Ver Documento / Informe")]),
        Line::from(vec![Span::styled("  <Space> c    ", Style::default().fg(Gruvbox::AQUA)), Span::raw("Código fuente en Rust")]),
        Line::from(vec![Span::styled("  q            ", Style::default().fg(Gruvbox::RED)), Span::raw("Salir / Cerrar popup")]),
    ];

    let p = Paragraph::new(items).block(block);
    f.render_widget(p, popup_area);
}
`
  }
];
