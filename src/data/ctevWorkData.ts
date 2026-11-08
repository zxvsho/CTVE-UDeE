export interface AcademicUnit {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  topics: string[];
  keyConcepts: { title: string; desc: string; latex?: string }[];
  methods: { name: string; formula: string; explanation: string; steps: string[] }[];
  problem: {
    title: string;
    context: string;
    statement: string;
    classification: {
      type: string;
      order: string;
      linearity: string;
      variables: string;
    };
    analyticalSolutionSteps: {
      step: number;
      title: string;
      math: string;
      description: string;
    }[];
    finalSolution: string;
    engineeringInterpretation: string;
  };
}

export const ACADEMIC_PROJECT_INFO = {
  institution: "UNIVERSIDAD DE CARTAGENA",
  faculty: "CENTRO DE TECNOLOGÍAS PARA LA EDUCACIÓN VIRTUAL (CTEV)",
  program: "Ingeniería de Software / Sistemas (Modalidad a Distancia)",
  course: "ECUACIONES DIFERENCIALES",
  projectTitle: "MODELADO Y RESOLUCIÓN COMPUTACIONAL EN RUST/RATATUI DE UNA PROBLEMÁTICA EN INGENIERÍA: APLICACIÓN INTEGRAL DE LOS MÓDULOS 1, 2 Y 3",
  author: "Miguel Andrés Cuello Tarriba",
  email: "miguelandrescuellotarriba600@gmail.com",
  cityYear: "Cartagena de Indias D.T. y C., Colombia · 2026",
  abstract: "El presente trabajo final articula de manera teórico-práctica los tres módulos fundamentales de la cátedra de Ecuaciones Diferenciales del CTEV de la Universidad de Cartagena. A través del planteamiento de una problemática real de ingeniería en la infraestructura hídrica y de bombeo del Canal del Dique (Cartagena), se desarrolla: (1) La definición, clasificación y modelado matemático diferencial de primer y segundo orden; (2) La aplicación rigurosa de métodos analíticos de primer orden (variables separables, factor integrante y ecuaciones diferenciales exactas); y (3) El modelado dinámico de orden superior fundamentado en la 2da Ley de Newton aplicado a un oscilador masa-resorte con amortiguamiento y forzamiento armónico externo (evitando la falla estructural por resonancia). El proyecto cuenta además con un artefacto de software de alto rendimiento programado en Rust con Ratatui bajo la estética LazyVim/Gruvbox para la simulación numérica e interactiva de los modelos.",
  objectives: {
    general: "Desarrollar, resolver y simular computacionalmente en Rust con Ratatui una problemática de ingeniería que integre las definiciones, clasificaciones, métodos de solución de primer orden y ecuaciones diferenciales lineales de orden superior establecidas en el currículo de Ecuaciones Diferenciales de la Universidad de Cartagena CTEV.",
    specifics: [
      "Clasificar rigurosamente las ecuaciones diferenciales involucradas según tipo (ordinaria/parcial), orden (primer y segundo orden) y linealidad, formulando modelos matemáticos basados en principios físicos.",
      "Resolver analíticamente ecuaciones diferenciales de primer orden utilizando variables separables, factores integrantes para lineales y el criterio de exactitud con factor de integración dependiente de una variable.",
      "Modelar e interpretar físicamente un sistema vibratorio de segundo orden basado en la 2da ley de Newton (oscilador masa-resorte amortiguado y forzado), deduciendo las soluciones generales en los regímenes subamortiguado, críticamente amortiguado y sobreamortiguado.",
      "Implementar un software terminal interactivo en Rust utilizando Ratatui con filosofía LazyVim y paleta Gruvbox que visualice analítica y gráficamente las soluciones obtenidas."
    ]
  }
};

export const UNIDAD_1_DATA: AcademicUnit = {
  id: "unidad1",
  number: 1,
  title: "Unidad 1: Definición y Clasificación de Ecuaciones Diferenciales",
  shortTitle: "U1: Definición y Clasificación",
  subtitle: "Origen histórico en Newton y Leibniz, clasificación y formulación de modelos matemáticos",
  topics: [
    "1. Definición formal de Ecuación Diferencial y origen físico",
    "2. Clasificación por tipo: EDO (Ordinarias) vs EDP (Parciales)",
    "3. Clasificación por orden y grado de la ecuación",
    "4. Clasificación por linealidad (lineales y no lineales)",
    "5. Tipos de soluciones: General, Particular y Singular",
    "6. Modelos matemáticos clásicos: Caída libre, enfriamiento de Newton, decaimiento radiactivo"
  ],
  keyConcepts: [
    {
      title: "¿Qué es una Ecuación Diferencial?",
      desc: "Es una relación matemática que vincula una función desconocida y(x) con una o más de sus derivadas respecto a una o varias variables independientes.",
      latex: "F\\left(x, y, \\frac{dy}{dx}, \\frac{d^2y}{dx^2}, \\dots, \\frac{d^ny}{dx^n}\\right) = 0"
    },
    {
      title: "Clasificación por Tipo",
      desc: "EDO (Ecuación Diferencial Ordinaria): contiene derivadas de una función respecto a una sola variable independiente. EDP (Ecuación Diferencial Parcial): contiene derivadas parciales respecto a dos o más variables independientes (ej. ecuación del calor o de onda).",
      latex: "\\text{EDO: } \\frac{dy}{dx} = k y \\quad \\longleftrightarrow \\quad \\text{EDP: } \\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}"
    },
    {
      title: "Orden y Linealidad",
      desc: "El orden es el grado de la derivada más alta en la ecuación. Una ED es lineal si la función dependiente y y todas sus derivadas aparecen con exponente 1, y no hay productos entre ellas ni funciones no lineales (sen(y), e^y, etc.).",
      latex: "a_n(x) y^{(n)} + a_{n-1}(x) y^{(n-1)} + \\dots + a_1(x) y' + a_0(x) y = g(x)"
    },
    {
      title: "Solución General vs Particular",
      desc: "La solución general contiene una o más constantes arbitrarias (según el orden n). Al fijar estas constantes mediante condiciones iniciales (PVI), se obtiene una solución particular única.",
      latex: "y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x} \\xrightarrow{y(0)=y_0, y'(0)=v_0} y_p(x)"
    }
  ],
  methods: [
    {
      name: "Modelado Matemático por Leyes de Conservación",
      formula: "\\frac{d(\\text{Cantidad})}{dt} = \\text{Tasa de Entrada} - \\text{Tasa de Salida}",
      explanation: "Base universal para modelar decaimiento, calentamiento, disolución de solutos y dinámica de fluidos en ingeniería.",
      steps: [
        "1. Identificar la variable dependiente y la variable independiente (usualmente el tiempo t).",
        "2. Aplicar el principio físico fundamental (Newton, balance de masa, energía).",
        "3. Expresar las tasas de variación como razones proporcionales con derivadas.",
        "4. Establecer las condiciones iniciales (PVI) del problema real."
      ]
    }
  ],
  problem: {
    title: "Problema U1: Modelado de Refrigeración en Transformadores de la Estación de Bombeo CTEV",
    context: "En la subestación eléctrica que alimenta las electrobombas del acueducto en Cartagena de Indias, un transformador de potencia opera a alta temperatura (T0 = 95 °C). Por falla del refrigerante, el transformador se apaga a las 14:00 horas en un ambiente costero con temperatura media constante Tm = 30 °C. Tras 10 minutos su temperatura desciende a 82 °C.",
    statement: "Formular la ecuación diferencial que rige la temperatura T(t), clasificarla formalmente (tipo, orden, linealidad), resolver el PVI y determinar el tiempo necesario para alcanzar la temperatura segura de inspección de 45 °C.",
    classification: {
      type: "Ecuación Diferencial Ordinaria (EDO), pues la variable dependiente T depende únicamente de una variable independiente (el tiempo t).",
      order: "Primer Orden (la derivada de mayor orden es dT/dt).",
      linearity: "Lineal (la variable T aparece en primer grado y los coeficientes son constantes).",
      variables: "Variable dependiente: T (temperatura en °C); Variable independiente: t (tiempo en minutos)."
    },
    analyticalSolutionSteps: [
      {
        step: 1,
        title: "Planteamiento del Modelo (Ley de Enfriamiento de Newton)",
        math: "\\frac{dT}{dt} = -k(T - T_m), \\quad T(0) = 95, \\; T_m = 30",
        description: "La tasa de cambio de temperatura del cuerpo es directamente proporcional a la diferencia entre su temperatura instantánea y la del medio circundante."
      },
      {
        step: 2,
        title: "Separación de Variables e Integración",
        math: "\\frac{dT}{T - 30} = -k dt \\implies \\int \\frac{dT}{T - 30} = -k \\int dt \\implies \\ln|T - 30| = -kt + C_1",
        description: "Se integran ambos lados con respecto a sus respectivas variables."
      },
      {
        step: 3,
        title: "Exponenciación y Solución General",
        math: "T(t) - 30 = C e^{-kt} \\implies T(t) = 30 + C e^{-kt}",
        description: "Familia uniparamétrica de soluciones característica de una EDO lineal de primer orden."
      },
      {
        step: 4,
        title: "Aplicación de la Condición Inicial T(0) = 95",
        math: "T(0) = 30 + C e^0 = 95 \\implies C = 95 - 30 = 65",
        description: "Por lo tanto: T(t) = 30 + 65 e^{-kt}."
      },
      {
        step: 5,
        title: "Determinación de la Constante de Enfriamiento k",
        math: "T(10) = 30 + 65 e^{-10k} = 82 \\implies 65 e^{-10k} = 52 \\implies e^{-10k} = \\frac{52}{65} = 0.8 \\implies k = -\\frac{\\ln(0.8)}{10} \\approx 0.022314 \\text{ min}^{-1}",
        description: "La constante k cuantifica la tasa de transferencia de calor por convección en el aire de Cartagena."
      },
      {
        step: 6,
        title: "Cálculo del Tiempo para T = 45 °C",
        math: "45 = 30 + 65 e^{-0.022314 t} \\implies 15 = 65 e^{-0.022314 t} \\implies e^{-0.022314 t} = \\frac{15}{65} \\approx 0.23077 \\implies t = -\\frac{\\ln(0.23077)}{0.022314} \\approx 65.71 \\text{ min}",
        description: "El técnico del CTEV puede intervenir el equipo de forma segura aproximadamente a los 65.7 minutos (~1 hora y 6 minutos)."
      }
    ],
    finalSolution: "T(t) = 30 + 65 e^{-0.022314 t} \\quad \\longrightarrow \\quad t_{seguro} \\approx 65.71 \\text{ minutos}",
    engineeringInterpretation: "La solución demuestra el decaimiento exponencial asintótico hacia la temperatura ambiente Tm = 30 °C. Este modelo de primer orden lineal permite programar protocolos de mantenimiento preventivo y paradas de emergencia en plantas industriales."
  }
};

export const UNIDAD_2_DATA: AcademicUnit = {
  id: "unidad2",
  number: 2,
  title: "Unidad 2: Métodos de Solución de EDO de Primer Orden",
  shortTitle: "U2: Métodos de Primer Orden",
  subtitle: "Variables separables, factor integrante para lineales, ecuaciones exactas y factores de integración",
  topics: [
    "1. Método de Variables Separables y técnicas de integración (por partes, sustitución)",
    "2. Ecuaciones Lineales de 1er Orden: Forma estándar dy/dx + P(x)y = Q(x)",
    "3. Deducción y aplicación del Factor Integrante μ(x) = exp(∫ P(x)dx)",
    "4. Ecuaciones Diferenciales Exactas: M(x,y)dx + N(x,y)dy = 0 y criterio de Euler ∂M/∂y = ∂N/∂x",
    "5. Búsqueda de Factores de Integración para ecuaciones no exactas μ(x) o μ(y)",
    "6. Ecuaciones homogéneas y ecuación de Bernoulli"
  ],
  keyConcepts: [
    {
      title: "Variables Separables",
      desc: "Toda ecuación que pueda reescribirse como g(y)dy = f(x)dx. Se resuelve integrando directamente a ambos lados.",
      latex: "\\int g(y)\\,dy = \\int f(x)\\,dx + C"
    },
    {
      title: "Ecuación Lineal y Factor Integrante",
      desc: "Posee la forma canónica y' + P(x)y = Q(x). Al multiplicar por μ(x) = exp(∫ P(x)dx), el lado izquierdo se transforma en la derivada de un producto d/dx [μ(x) y].",
      latex: "\\mu(x) = e^{\\int P(x)dx} \\implies \\frac{d}{dx}[\\mu(x)y] = \\mu(x)Q(x) \\implies y(x) = \\frac{1}{\\mu(x)}\\left[\\int \\mu(x)Q(x)dx + C\\right]"
    },
    {
      title: "Criterio de Exactitud",
      desc: "La ecuación M(x,y)dx + N(x,y)dy = 0 es exacta si y solo si las derivadas cruzadas son idénticas: ∂M/∂y = ∂N/∂x, lo que garantiza la existencia de una función potencial F(x,y) = C.",
      latex: "\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x} \\iff dF = \\frac{\\partial F}{\\partial x}dx + \\frac{\\partial F}{\\partial y}dy = 0"
    },
    {
      title: "Factor de Integración Especial",
      desc: "Si ∂M/∂y ≠ ∂N/∂x, se busca una función μ tal que d(μ M dx + μ N dy) = 0. Si (∂M/∂y - ∂N/∂x)/N depende solo de x, entonces μ(x) = exp(∫ [(My - Nx)/N] dx).",
      latex: "\\mu(x) = \\exp\\left( \\int \\frac{\\frac{\\partial M}{\\partial y} - \\frac{\\partial N}{\\partial x}}{N}\\,dx \\right)"
    }
  ],
  methods: [
    {
      name: "Algoritmo para Ecuación Exacta",
      formula: "F(x,y) = \\int M(x,y)\\,dx + g(y) \\quad \\text{con } g'(y) = N(x,y) - \\frac{\\partial}{\\partial y}\\int M\\,dx",
      explanation: "Reconstruye la función potencial bivariable cuyo gradiente reproduce la diferencial total.",
      steps: [
        "1. Comprobar la condición de exactitud ∂M/∂y = ∂N/∂x.",
        "2. Integrar M respecto a x, añadiendo una función desconocida g(y).",
        "3. Derivar el resultado respecto a y e igualar a N(x,y) para despejar g'(y).",
        "4. Integrar g'(y) respecto a y para obtener la solución implícita F(x,y) = C."
      ]
    }
  ],
  problem: {
    title: "Problema U2: Control de Salinidad y Cloración en el Tanque de Mezcla de Cartagena",
    context: "Para asegurar la potabilidad del agua en Cartagena, un tanque de mezcla contiene inicialmente V0 = 1000 Litros de agua con una salinidad inicial Q0 = 20 kg de sales disueltas. Se inyecta una solución salina tratada con concentración Cin = 0.05 kg/L a una tasa de flujo de entrada rin = 10 L/min. La mezcla se mantiene perfectamente homogénea y se bombea hacia la red a una tasa de salida rout = 10 L/min (volumen constante V(t) = 1000 L).",
    statement: "Modelar la cantidad de soluto Q(t) mediante una EDO lineal de primer orden, resolver analíticamente usando el método del Factor Integrante μ(t), hallar la solución particular con la condición inicial Q(0) = 20 kg, y calcular la salinidad a los 60 minutos y en el estado estacionario (t → ∞).",
    classification: {
      type: "EDO (Ecuación Diferencial Ordinaria).",
      order: "Primer orden (dQ/dt).",
      linearity: "Lineal no homogénea con coeficientes constantes.",
      variables: "Dependiente: Q(t) (kg de sal); Independiente: t (minutos)."
    },
    analyticalSolutionSteps: [
      {
        step: 1,
        title: "Balance de Materia y Formulación de la EDO",
        math: "\\frac{dQ}{dt} = R_{in} - R_{out} = r_{in} C_{in} - r_{out} \\left(\\frac{Q(t)}{V(t)}\\right)",
        description: "Sustituyendo los datos: rin = 10, Cin = 0.05, rout = 10, V = 1000: dQ/dt = (10)(0.05) - 10(Q/1000) = 0.5 - 0.01 Q."
      },
      {
        step: 2,
        title: "Expresión en Forma Estándar Canónica",
        math: "\\frac{dQ}{dt} + 0.01 Q(t) = 0.5",
        description: "Esta es la forma estándar y' + P(t)y = g(t), donde P(t) = 0.01 y g(t) = 0.5."
      },
      {
        step: 3,
        title: "Cálculo del Factor Integrante μ(t)",
        math: "\\mu(t) = e^{\\int P(t)\\,dt} = e^{\\int 0.01\\,dt} = e^{0.01 t}",
        description: "El factor integrante transformará el lado izquierdo en la derivada de un producto."
      },
      {
        step: 4,
        title: "Multiplicación e Integración de Ambos Lados",
        math: "e^{0.01 t}\\frac{dQ}{dt} + 0.01 e^{0.01 t} Q = 0.5 e^{0.01 t} \\implies \\frac{d}{dt}\\left[ e^{0.01 t} Q(t) \\right] = 0.5 e^{0.01 t}",
        description: "Integrando con respecto al tiempo t: e^{0.01 t} Q(t) = \\int 0.5 e^{0.01 t} dt = \\frac{0.5}{0.01} e^{0.01 t} + C = 50 e^{0.01 t} + C."
      },
      {
        step: 5,
        title: "Despeje de la Solución General",
        math: "Q(t) = 50 + C e^{-0.01 t}",
        description: "Familia uniparamétrica de soluciones para la concentración en el tanque."
      },
      {
        step: 6,
        title: "Condición Inicial Q(0) = 20 kg",
        math: "Q(0) = 50 + C = 20 \\implies C = 20 - 50 = -30",
        description: "Por ende, la solución particular única es: Q(t) = 50 - 30 e^{-0.01 t}."
      },
      {
        step: 7,
        title: "Evaluación a t = 60 min y Estado Estacionario (t → ∞)",
        math: "Q(60) = 50 - 30 e^{-0.6} = 50 - 30(0.54881) \\approx 33.54 \\text{ kg} \\quad \\Big| \\quad \\lim_{t \\to \\infty} Q(t) = 50 \\text{ kg}",
        description: "La concentración tiende asintóticamente a 50 kg / 1000 L = 0.05 kg/L, igual a la concentración del flujo de entrada."
      }
    ],
    finalSolution: "Q(t) = 50 - 30 e^{-0.01 t} \\quad \\implies \\quad Q(60) = 33.54 \\text{ kg}, \\; Q_{estacionario} = 50 \\text{ kg}",
    engineeringInterpretation: "El método del factor integrante permite predecir el comportamiento transitorio y permanente en reactores químicos e ingeniería ambiental, garantizando que el agua entregada a la ciudad cumple con los umbrales de salinidad permitidos."
  }
};

export const UNIDAD_3_DATA: AcademicUnit = {
  id: "unidad3",
  number: 3,
  title: "Unidad 3: Ecuaciones Diferenciales Lineales de Orden Superior",
  shortTitle: "U3: ED de Orden Superior",
  subtitle: "Segunda Ley de Newton, el oscilador masa-resorte, ecuación característica, Wronskiano y resonancia",
  topics: [
    "1. Origen físico: La 2da ley de Newton (F = ma) como EDO de 2do orden",
    "2. El Oscilador Masa-Resorte: Amortiguamiento viscoso y fuerzas externas",
    "3. Principio de Superposición y el Wronskiano W(y1, y2) para independencia lineal",
    "4. Ecuación Característica Auxiliar: Raíces reales distintas, repetidas y complejas",
    "5. Clasificación de regímenes: Subamortiguado, críticamente amortiguado y sobreamortiguado",
    "6. Solución no homogénea por Coeficientes Indeterminados y fenómeno de Resonancia"
  ],
  keyConcepts: [
    {
      title: "La 2da Ley de Newton como EDO de 2do Orden",
      desc: "Dado que la aceleración a(t) = d²x/dt², toda ley de fuerza dinámica F = m·a conduce de manera natural a una ecuación de segundo orden.",
      latex: "m \\frac{d^2x}{dt^2} = \\sum F = -k x - c \\frac{dx}{dt} + F_{ext}(t) \\implies m x'' + c x' + k x = F(t)"
    },
    {
      title: "Ecuación Auxiliar o Característica",
      desc: "Al proponer la solución exponencial x(t) = e^{rt} en la ecuación homogénea m x'' + c x' + k x = 0, se obtiene la ecuación cuadrática algebraica.",
      latex: "m r^2 + c r + k = 0 \\implies r_{1,2} = \\frac{-c \\pm \\sqrt{c^2 - 4mk}}{2m} = -\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}"
    },
    {
      title: "Los Tres Regímenes de Amortiguamiento",
      desc: "Dependen del signo del discriminante Δ = c² - 4mk: (1) Δ < 0: Subamortiguado (oscilatorio decreciente, raíces complejas conjugadas -γ ± i ω_d); (2) Δ = 0: Críticamente amortiguado (retorno rápido sin oscilar, raíces reales repetidas); (3) Δ > 0: Sobreamortiguado (movimiento lento aperiódico, raíces reales distintas).",
      latex: "\\Delta = c^2 - 4mk \\begin{cases} < 0 & \\text{Subamortiguado: } e^{-\\gamma t}(C_1 \\cos \\omega_d t + C_2 \\sin \\omega_d t) \\\\ = 0 & \\text{Crítico: } (C_1 + C_2 t)e^{-\\gamma t} \\\\ > 0 & \\text{Sobreamortiguado: } C_1 e^{r_1 t} + C_2 e^{r_2 t} \\end{cases}"
    },
    {
      title: "Resonancia Mecánica",
      desc: "Si la frecuencia impulsora externa ω se aproxima a la frecuencia natural no amortiguada ω₀ = √(k/m), la amplitud de vibración crece drásticamente, lo cual puede destruir tuberías, puentes y maquinaria.",
      latex: "x_p(t) = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + (c\\omega)^2}} \\cos(\\omega t - \\phi) \\xrightarrow{\\omega \\to \\omega_0, c \\to 0} \\text{Amplitud } \\to \\infty"
    }
  ],
  methods: [
    {
      name: "Solución de ED Lineales con Coeficientes Constantes",
      formula: "a y'' + b y' + c y = g(x) \\implies y(x) = y_h(x) + y_p(x)",
      explanation: "Método de dos fases: resolución de la complementaria/homogénea mediante raíces algebraicas y cálculo de la particular mediante coeficientes indeterminados o variación de parámetros.",
      steps: [
        "1. Resolver la ecuación homogénea asociada ar² + br + c = 0.",
        "2. Verificar la independencia lineal mediante el Wronskiano W(y1, y2) ≠ 0.",
        "3. Proponer la forma de y_p(x) basada en g(x) evitando duplicidad con y_h.",
        "4. Sustituir en la ED original para hallar las constantes de y_p(x).",
        "5. Aplicar condiciones iniciales y(0)=y0, y'(0)=v0 sobre la solución total y(x) = y_h + y_p."
      ]
    }
  ],
  problem: {
    title: "Problema U3: Diseño del Sistema Amortiguador de la Bomba Hidráulica Principal",
    context: "La electrobomba impulsora de 150 kW en la estación de Cartagena pesa m = 250 kg. El soporte elástico posee una constante de rigidez del resorte k = 10,000 N/m. Durante el arranque, la vibración del motor induce una fuerza armónica periódica F(t) = 500 cos(8t) Newtons con frecuencia impulsora ω = 8 rad/s. Se instala un amortiguador hidráulico con coeficiente de fricción viscosa c = 500 N·s/m. Al tiempo t = 0, el motor arranca desde el reposo con x(0) = 0.05 m y velocidad inicial x'(0) = 0 m/s.",
    statement: "Escribir la ecuación diferencial que modela la vibración, calcular el discriminante y clasificar el régimen de amortiguamiento, hallar la solución homogénea x_h(t), la solución particular x_p(t) mediante coeficientes indeterminados, la solución general completa sujeta al PVI, y verificar si el sistema opera cerca de la resonancia.",
    classification: {
      type: "EDO (Ecuación Diferencial Ordinaria).",
      order: "Segundo Orden (involucra d²x/dt² y dx/dt).",
      linearity: "Lineal No Homogénea con coeficientes constantes.",
      variables: "Dependiente: x(t) (desplazamiento vertical en metros); Independiente: t (tiempo en segundos)."
    },
    analyticalSolutionSteps: [
      {
        step: 1,
        title: "Formulación de la EDO por 2da Ley de Newton (F = ma)",
        math: "250 x''(t) + 500 x'(t) + 10000 x(t) = 500 \\cos(8t)",
        description: "Dividiendo toda la ecuación entre la masa m = 250 para llevarla a forma canónica: x'' + 2 x' + 40 x = 2 \\cos(8t)."
      },
      {
        step: 2,
        title: "Ecuación Auxiliar y Discriminante",
        math: "r^2 + 2r + 40 = 0 \\implies \\Delta = b^2 - 4ac = (2)^2 - 4(1)(40) = 4 - 160 = -156 < 0",
        description: "Como el discriminante Δ = -156 es estrictamente negativo, el sistema es SUBAMORTIGUADO (oscilaciones armónicas con envolvente exponencial decreciente)."
      },
      {
        step: 3,
        title: "Cálculo de las Raíces Complejas Conjugadas",
        math: "r_{1,2} = \\frac{-2 \\pm \\sqrt{-156}}{2} = -1 \\pm \\frac{i \\sqrt{156}}{2} = -1 \\pm i \\sqrt{39} \\approx -1 \\pm 6.245 i",
        description: "El factor de atenuación es γ = 1 y la frecuencia angular natural amortiguada es ω_d = √39 ≈ 6.245 rad/s."
      },
      {
        step: 4,
        title: "Solución Homogénea x_h(t)",
        math: "x_h(t) = e^{-t} \\left( C_1 \\cos(\\sqrt{39} t) + C_2 \\sin(\\sqrt{39} t) \\right)",
        description: "Esta componente transitoria decae a cero rápidamente debido a la disipación de energía por el amortiguador."
      },
      {
        step: 5,
        title: "Cálculo de la Solución Particular x_p(t) por Coeficientes Indeterminados",
        math: "x_p(t) = A \\cos(8t) + B \\sin(8t) \\implies x'_p = -8A \\sin(8t) + 8B \\cos(8t), \\; x''_p = -64A \\cos(8t) - 64B \\sin(8t)",
        description: "Sustituyendo en x'' + 2x' + 40x = 2 cos(8t): (-64A + 16B + 40A) cos(8t) + (-64B - 16A + 40B) sin(8t) = 2 cos(8t)."
      },
      {
        step: 6,
        title: "Sistema Algebraico para A y B",
        math: "\\begin{cases} -24 A + 16 B = 2 \\\\ -16 A - 24 B = 0 \\end{cases} \\implies A = -\\frac{3}{104} \\approx -0.02885, \\quad B = \\frac{2}{104} \\approx 0.01923",
        description: "Por lo tanto: x_p(t) = -0.02885 cos(8t) + 0.01923 sin(8t) con amplitud estacionaria X = √(A² + B²) ≈ 0.0347 m (3.47 cm)."
      },
      {
        step: 7,
        title: "Solución General y Aplicación de PVI x(0) = 0.05, x'(0) = 0",
        math: "x(0) = C_1 + A = 0.05 \\implies C_1 = 0.05 - (-0.02885) = 0.07885 \\text{ m}",
        description: "De x'(0) = -C_1 + √39 C_2 + 8B = 0: C_2 = (C_1 - 8B)/√39 = (0.07885 - 8(0.01923))/6.245 = -0.01201."
      },
      {
        step: 8,
        title: "Evaluación de Resonancia",
        math: "\\omega_0 = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{10000}{250}} = \\sqrt{40} \\approx 6.325 \\text{ rad/s} \\quad \\text{vs} \\quad \\omega_{impulsora} = 8.0 \\text{ rad/s}",
        description: "La frecuencia de operación (8 rad/s) está alejada en un 26.5% de la frecuencia de resonancia (6.325 rad/s), asegurando que las vibraciones no dañarán los anclajes de la estación."
      }
    ],
    finalSolution: "x(t) = e^{-t}\\left[ 0.0789 \\cos(6.245 t) - 0.0120 \\sin(6.245 t) \\right] - 0.0288 \\cos(8 t) + 0.0192 \\sin(8 t)",
    engineeringInterpretation: "El modelo predice con exactitud dos etapas: una respuesta transitoria amortiguada que se desvanece en t > 4 s, y una respuesta forzada permanente en régimen estacionario con amplitud contenida de 3.47 cm, validando la estabilidad estructural del sistema."
  }
};
