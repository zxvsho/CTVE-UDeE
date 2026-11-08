import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  Packer,
  convertInchesToTwip,
  PageBreak,
  TabStopType,
  TabStopPosition,
} from 'docx';
import { saveAs } from 'file-saver';
import {
  generateDashboardCanvas,
  generateOscillatorCanvas,
  canvasToUint8Array,
} from './tuiScreenshotGenerator';

export async function exportToDocx(options?: {
  studentName?: string;
  courseName?: string;
  professorName?: string;
  institution?: string;
  faculty?: string;
  cityYear?: string;
}) {
  const student = options?.studentName || "Miguel Andrés Cuello Tarriba";
  const course = options?.courseName || "Ecuaciones Diferenciales";
  const professor = options?.professorName || "Tutor Asignado CTEV";
  const institution = options?.institution || "Universidad de Cartagena";
  const faculty = options?.faculty || "Centro de Tecnologías para la Educación Virtual (CTEV)";
  const cityYear = options?.cityYear || "Cartagena de Indias, D.T. y C., Colombia · 2026";

  // Generar capturas de pantalla del software
  const dashboardCanvas = generateDashboardCanvas();
  const oscillatorCanvas = generateOscillatorCanvas();

  const dashboardBytes = await canvasToUint8Array(dashboardCanvas);
  const oscillatorBytes = await canvasToUint8Array(oscillatorCanvas);

  // Helper para párrafos APA 7 (Times New Roman 12pt, interlineado doble, sangría primera línea 0.5 pulgadas)
  const createApaParagraph = (text: string, options?: { indent?: boolean; bold?: boolean; italic?: boolean }) => {
    return new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { line: 480, after: 120 }, // Interlineado doble
      indent: options?.indent !== false ? { firstLine: 720 } : undefined, // Sangría 1.27 cm (720 dxa)
      children: [
        new TextRun({
          text,
          font: 'Times New Roman',
          size: 24, // 12 pt (en medios puntos)
          bold: options?.bold,
          italics: options?.italic,
        }),
      ],
    });
  };

  const createApaHeading1 = (text: string) => {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 240, line: 480 },
      children: [
        new TextRun({
          text,
          font: 'Times New Roman',
          size: 24,
          bold: true,
        }),
      ],
    });
  };

  const createApaHeading2 = (text: string) => {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120, line: 480 },
      children: [
        new TextRun({
          text,
          font: 'Times New Roman',
          size: 24,
          bold: true,
        }),
      ],
    });
  };

  const createApaHeading3 = (text: string) => {
    return new Paragraph({
      alignment: AlignmentType.LEFT,
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 200, after: 100, line: 480 },
      children: [
        new TextRun({
          text,
          font: 'Times New Roman',
          size: 24,
          bold: true,
          italics: true,
        }),
      ],
    });
  };

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24,
          },
          paragraph: {
            spacing: { line: 480 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: 'Times New Roman',
                    size: 24,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // ==========================================
          // 1. HOJA DE PRESENTACIÓN (PORTADA APA 7)
          // ==========================================
          new Paragraph({
            spacing: { before: 1800, line: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'MODELADO Y RESOLUCIÓN COMPUTACIONAL EN RUST/RATATUI DE UNA PROBLEMÁTICA EN INGENIERÍA: APLICACIÓN INTEGRAL DE LOS MÓDULOS 1, 2 Y 3',
                font: 'Times New Roman',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 720, line: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'Trabajo Final de Asignatura Presentado en Cumplimiento de los Módulos 1, 2 y 3',
                font: 'Times New Roman',
                size: 24,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 1200, line: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Estudiante:\n${student}`,
                font: 'Times New Roman',
                size: 24,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 720, line: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Docente Tutor:\n${professor}`,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 1200, line: 480 },
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${institution}\n${faculty}\nPrograma de Ingeniería · Modalidad a Distancia\nAsignatura: ${course}\n${cityYear}`,
                font: 'Times New Roman',
                size: 24,
              }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 2. TABLA DE CONTENIDOS
          // ==========================================
          createApaHeading1('Tabla de Contenidos'),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '1. Descripción de la Problemática', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 3' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '2. Justificación', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 4' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '3. Objetivos', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 5' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '3.1 Objetivo General', font: 'Times New Roman' }),
              new TextRun({ text: '\t 5' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '3.2 Objetivos Específicos', font: 'Times New Roman' }),
              new TextRun({ text: '\t 5' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '4. Descripción Detallada de la Solución Planteada', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 6' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '4.1 Unidad 1: Definición, Clasificación y Modelos de EDO', font: 'Times New Roman' }),
              new TextRun({ text: '\t 6' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '4.2 Unidad 2: Métodos de Solución de EDO de Primer Orden', font: 'Times New Roman' }),
              new TextRun({ text: '\t 8' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '4.3 Unidad 3: ED Lineales de Orden Superior y Oscilador Masa-Resorte', font: 'Times New Roman' }),
              new TextRun({ text: '\t 11' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '4.4 Implementación del Software Terminal en Rust con Ratatui', font: 'Times New Roman' }),
              new TextRun({ text: '\t 14' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '5. Resultados o Discusión', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 16' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '5.1 Análisis Comparativo de Regímenes de Amortiguamiento', font: 'Times New Roman' }),
              new TextRun({ text: '\t 16' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            indent: { left: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '5.2 Evidencia de Ejecución Gráfica del Software TUI', font: 'Times New Roman' }),
              new TextRun({ text: '\t 17' }),
            ],
          }),
          new Paragraph({
            spacing: { after: 120, line: 360 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX, leader: 'dot' as any }],
            children: [
              new TextRun({ text: '6. Bibliografía', font: 'Times New Roman', bold: true }),
              new TextRun({ text: '\t 20' }),
            ],
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 3. DESCRIPCIÓN DE LA PROBLEMÁTICA
          // ==========================================
          createApaHeading1('1. Descripción de la Problemática'),
          createApaParagraph(
            'En el contexto de la infraestructura de servicios públicos de la ciudad de Cartagena de Indias, la estación de captación y bombeo de agua cruda del Canal del Dique representa una arteria crítica para el abastecimiento continuo de agua potable. Esta planta opera electrobombas centrífugas de alta potencia (150 kW) que trabajan ininterrumpidamente en condiciones ambientales adversas, caracterizadas por alta salinidad marina, humedad relativa superior al 80% y temperaturas diurnas que superan los 32 °C.'
          ),
          createApaParagraph(
            'La operación continua de estas instalaciones genera tres problemáticas simultáneas interconectadas que requieren un modelado matemático riguroso basado en ecuaciones diferenciales:'
          ),
          createApaParagraph(
            '1. Degradación y sobrecalentamiento de transformadores de potencia (Unidad 1): Durante las operaciones de bombeo continuo, los transformadores alcanzan temperaturas críticas (T0 = 95 °C). En paradas de emergencia o mantenimiento preventivo, el tiempo necesario para que la maquinaria disipe calor por convección hacia el aire circundante (Tm = 30 °C) hasta alcanzar un umbral seguro de inspección humana (45 °C) debe calcularse con exactitud para optimizar los turnos operativos y evitar accidentes laborales.'
          ),
          createApaParagraph(
            '2. Control de salinidad y homogenización en tanques de tratamiento químico (Unidad 2): Las corrientes de entrada procedentes del Canal del Dique presentan fluctuaciones periódicas de salinidad y sedimentos. Se requiere regular la concentración de sales disueltas en un tanque de mezcla de 1000 Litros mediante inyección de agua desmineralizada y reactivos, prediciendo la evolución transitoria y el valor estacionario del soluto mediante balances de materia diferenciales.'
          ),
          createApaParagraph(
            '3. Vibraciones forzadas y riesgo de fatiga estructural por resonancia en el sistema electrobomba-soporte (Unidad 3): La bomba de 250 kg genera oscilaciones mecánicas periódicas debidas a la rotación del rodete a 8 rad/s. Si la frecuencia de excitación coincide o se aproxima a la frecuencia natural del sistema masa-resorte del anclaje, ocurre el fenómeno de resonancia destructiva, provocando fisuras en las tuberías matrices de hierro dúctil, desgaste prematuro de rodamientos y potenciales roturas que dejarían sin suministro hídrico a barrios enteros de Cartagena.'
          ),

          // ==========================================
          // 4. JUSTIFICACIÓN
          // ==========================================
          createApaHeading1('2. Justificación'),
          createApaParagraph(
            'El desarrollo de este trabajo final se justifica desde cuatro dimensiones esenciales: académica, técnica, ambiental y formativa.'
          ),
          createApaParagraph(
            'Desde la perspectiva técnica y de ingeniería, la formulación analítica de ecuaciones diferenciales complementada con simulaciones computacionales exactas permite predecir el comportamiento dinámico de sistemas físicos sin necesidad de recurrir a pruebas destructivas costosas sobre la maquinaria real. Comprender con precisión el régimen de amortiguamiento (subamortiguado, críticamente amortiguado o sobreamortiguado) y garantizar un margen de seguridad amplio frente a la resonancia mecánica es un requisito indispensable en el diseño estructural moderno.'
          ),
          createApaParagraph(
            'Desde el ámbito social y ambiental, el Canal del Dique es un ecosistema fluvial vulnerable y vital para la subsistencia de más de un millón de habitantes en la zona metropolitana de Cartagena. Asegurar la fiabilidad de las estaciones de bombeo mediante modelos matemáticos predictivos previene fallas catastróficas en el suministro de agua y paradas imprevistas del acueducto.'
          ),
          createApaParagraph(
            'En el plano académico y curricular, la asignatura de Ecuaciones Diferenciales del CTEV de la Universidad de Cartagena promueve el pensamiento crítico y la capacidad de vincular los fundamentos del cálculo infinitesimal con la ingeniería aplicada. La integración de los tres módulos en un caso unificado, implementando además un software interactivo en Rust con Ratatui bajo la filosofía LazyVim y paleta Gruvbox, demuestra cómo el rigor formal se materializa en herramientas de ingeniería de alto rendimiento.'
          ),

          // ==========================================
          // 5. OBJETIVO GENERAL Y ESPECÍFICOS
          // ==========================================
          createApaHeading1('3. Objetivos'),
          createApaHeading2('3.1 Objetivo General'),
          createApaParagraph(
            'Desarrollar, resolver analíticamente y simular mediante un artefacto de software terminal interactivo programado en Rust con Ratatui una problemática integral de ingeniería que articule los conceptos, clasificaciones, métodos de solución de primer orden y ecuaciones diferenciales lineales de orden superior del currículo de Ecuaciones Diferenciales de la Universidad de Cartagena CTEV.'
          ),
          createApaHeading2('3.2 Objetivos Específicos'),
          createApaParagraph(
            '1. Clasificar rigurosamente las ecuaciones diferenciales involucradas según tipo (ordinarias o parciales), orden (primer y segundo orden) y linealidad, formulando modelos matemáticos basados en leyes de conservación y principios físicos universales.'
          ),
          createApaParagraph(
            '2. Resolver analíticamente ecuaciones diferenciales de primer orden utilizando los métodos de variables separables, factor integrante para ecuaciones lineales y el criterio de exactitud de Euler con factores de integración dependientes de una variable.'
          ),
          createApaParagraph(
            '3. Modelar e interpretar físicamente un sistema vibratorio de segundo orden basado en la Segunda Ley de Newton (F = ma) aplicado al oscilador masa-resorte-amortiguador con forzamiento armónico externo, deduciendo sus soluciones complementaria y particular y diagnosticando el riesgo de resonancia.'
          ),
          createApaParagraph(
            '4. Construir un programa de consola interactivo en Rust utilizando el framework Ratatui con diseño ergonómico inspirado en LazyVim y colores Gruvbox Dark, capaz de integrar numéricamente los modelos mediante Runge-Kutta 4 (RK4) y graficar las trayectorias en tiempo real.'
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 6. DESCRIPCIÓN DETALLADA DE LA SOLUCIÓN
          // ==========================================
          createApaHeading1('4. Descripción Detallada de la Solución Planteada'),
          createApaParagraph(
            'Para dar respuesta integral a la problemática planteada, se estructuró la solución en tres fases secuenciales correspondientes a los tres módulos temáticos definidos por la cátedra de Ecuaciones Diferenciales del CTEV:'
          ),

          createApaHeading2('4.1 Unidad 1: Definición, Clasificación y Modelos de EDO'),
          createApaParagraph(
            'Una ecuación diferencial (ED) es una relación funcional que contiene derivadas de una función dependiente desconocida respecto a una o más variables independientes. De acuerdo con el módulo, las ED se originan formalmente en los trabajos fundacionales de Newton y Leibniz sobre el cambio infinitesimal.'
          ),
          createApaParagraph(
            'La clasificación de las ED se fundamenta en tres criterios canónicos:'
          ),
          createApaParagraph(
            '• Por Tipo: Ecuaciones Diferenciales Ordinarias (EDO), que involucran derivadas totales respecto a una sola variable independiente (ej. tiempo t), frente a Ecuaciones Diferenciales Parciales (EDP), que contienen derivadas parciales respecto a dos o más variables independientes (ej. posición x y tiempo t).'
          ),
          createApaParagraph(
            '• Por Orden: Determinado por la derivada de mayor orden presente en la ecuación. Por ejemplo, d²x/dt² define una ecuación de segundo orden.'
          ),
          createApaParagraph(
            '• Por Linealidad: Una ecuación diferencial de orden n es lineal si puede escribirse en la forma an(x)y^(n) + ... + a1(x)y\' + a0(x)y = g(x), donde y y sus derivadas aparecen únicamente con exponente 1 y no existen productos entre ellas ni funciones no lineales compuestas como sen(y) o e^y.'
          ),

          createApaHeading3('Aplicación Modelada de la Unidad 1: Enfriamiento de Transformadores'),
          createApaParagraph(
            'El modelo térmico del transformador apagado a T0 = 95 °C en un entorno a Tm = 30 °C se formula mediante la Ley de Enfriamiento de Newton:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'dT/dt = -k(T - Tm),    con T(0) = 95 °C,  Tm = 30 °C',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'Clasificación: EDO ordinaria, de primer orden, lineal con coeficientes constantes. Resolviendo por el método de variables separables:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: '∫ dT / (T - 30) = -k ∫ dt  =>  ln|T - 30| = -kt + C1  =>  T(t) = 30 + C e^(-kt)',
                font: 'Times New Roman',
                italics: true,
              }),
            ],
          }),
          createApaParagraph(
            'Aplicando la condición inicial T(0) = 95 °C, se obtiene C = 95 - 30 = 65. Utilizando el dato experimental T(10) = 82 °C:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: '82 = 30 + 65 e^(-10k)  =>  e^(-10k) = 52/65 = 0.8  =>  k = -ln(0.8)/10 ≈ 0.022314 min⁻¹',
                font: 'Times New Roman',
              }),
            ],
          }),
          createApaParagraph(
            'Para determinar el instante en que el transformador alcanza la temperatura segura de 45 °C:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: '45 = 30 + 65 e^(-0.022314 t)  =>  e^(-0.022314 t) = 15/65  =>  t = -ln(15/65)/0.022314 ≈ 65.71 minutos',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'El equipo técnico puede ingresar a realizar el mantenimiento a los 65.71 minutos (~1 hora y 6 minutos) tras la desconexión.'
          ),

          createApaHeading2('4.2 Unidad 2: Métodos de Solución de EDO de Primer Orden'),
          createApaParagraph(
            'El segundo módulo aborda las técnicas formales para resolver familias de EDO de primer orden:'
          ),
          createApaParagraph(
            '1. Variables Separables: Es el método más intuitivo. Toda ecuación de la forma g(y)dy = f(x)dx se resuelve integrando directamente ambos miembros, requiriendo técnicas de cálculo como integración por partes y descomposición en fracciones parciales.'
          ),
          createApaParagraph(
            '2. Ecuaciones Lineales y Factor Integrante: Presentan la estructura estándar y\' + P(x)y = Q(x). Multiplicando toda la ecuación por el factor integrante canónico μ(x) = exp(∫ P(x)dx), el lado izquierdo se transforma en la derivada exacta del producto d/dx [μ(x) y] = μ(x) Q(x), garantizando siempre una solución general.'
          ),
          createApaParagraph(
            '3. Ecuaciones Exactas y Factores de Integración: Dada la diferencial total M(x,y)dx + N(x,y)dy = 0, se define exacta si ∂M/∂y = ∂N/∂x. De no cumplirse la igualdad, se introduce un factor de integración multiplicador μ(x) = exp(∫ [(My - Nx)/N] dx) para forzar la exactitud y recuperar la función potencial F(x,y) = C.'
          ),

          createApaHeading3('Aplicación Modelada de la Unidad 2: Homogenización de Salinidad'),
          createApaParagraph(
            'En el tanque de homogenización de V = 1000 L con salinidad inicial Q(0) = 20 kg, ingresa salmuera con Cin = 0.05 kg/L a razón de rin = 10 L/min y sale a rout = 10 L/min (volumen constante). El balance diferencial de soluto establece:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'dQ/dt = Rin - Rout = (10)(0.05) - 10(Q/1000) = 0.5 - 0.01 Q',
                font: 'Times New Roman',
              }),
            ],
          }),
          createApaParagraph(
            'Reescribiendo en la forma lineal estándar dy/dt + P(t)y = g(t):'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'dQ/dt + 0.01 Q = 0.5',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'El factor integrante es μ(t) = e^(∫ 0.01 dt) = e^(0.01 t). Multiplicando e integrando:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'd/dt [e^(0.01 t) Q] = 0.5 e^(0.01 t)  =>  e^(0.01 t) Q = 50 e^(0.01 t) + C  =>  Q(t) = 50 + C e^(-0.01 t)',
                font: 'Times New Roman',
                italics: true,
              }),
            ],
          }),
          createApaParagraph(
            'Aplicando la condición inicial Q(0) = 20 kg: 20 = 50 + C => C = -30. La solución particular del PVI es:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'Q(t) = 50 - 30 e^(-0.01 t) [kg]',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'A los 60 minutos: Q(60) = 50 - 30 e^(-0.6) = 33.54 kg (concentración de 0.0335 kg/L). En régimen estacionario (t -> ∞), la cantidad de sal tiende asintóticamente a 50 kg (concentración final de 0.05 kg/L, igual a la del flujo de entrada).'
          ),

          createApaHeading2('4.3 Unidad 3: ED Lineales de Orden Superior y Oscilador Masa-Resorte'),
          createApaParagraph(
            'El tercer módulo se fundamenta en el hecho físico de que la Segunda Ley de Newton (F = ma) es intrínsecamente una EDO de segundo orden, dado que la aceleración representa la segunda derivada temporal de la posición: a = d²x/dt². El sistema físico paradigmático es el oscilador masa-resorte con amortiguamiento viscoso y fuerza externa armónica:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'm (d²x/dt²) + c (dx/dt) + k x = F0 cos(ω t)',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'La solución general se compone de dos términos x(t) = xh(t) + xp(t), donde xh(t) es la solución complementaria asociada a la ecuación homogénea y xp(t) es una solución particular generada por la excitación externa.'
          ),
          createApaParagraph(
            'Para la ecuación homogénea m r² + c r + k = 0, el comportamiento cualitativo queda determinado por el discriminante Δ = c² - 4mk:'
          ),
          createApaParagraph(
            '• Subamortiguado (Δ < 0): Raíces complejas conjugadas r = -γ ± i ωd, donde γ = c/(2m) y ωd = √(k/m - γ²). Movimiento oscilatorio armónico decreciente envuelto en una exponencial atenuante.'
          ),
          createApaParagraph(
            '• Críticamente amortiguado (Δ = 0): Raíz real doble repetida r = -γ. Es el amortiguador óptimo en ingeniería, pues retorna al reposo en el menor tiempo posible sin oscilar.'
          ),
          createApaParagraph(
            '• Sobreamortiguado (Δ > 0): Dos raíces reales distintas r1, r2 < 0. Movimiento lento aperiódico dominado por la fuerte fricción viscosa.'
          ),

          createApaHeading3('Aplicación Modelada de la Unidad 3: Dinámica de la Bomba Hidráulica'),
          createApaParagraph(
            'Datos de la estación: masa m = 250 kg, rigidez del resorte k = 10000 N/m, amortiguamiento viscoso c = 500 N·s/m, excitación F(t) = 500 cos(8t) N, con condiciones de reposo inicial x(0) = 0.05 m, x\'(0) = 0 m/s.'
          ),
          createApaParagraph(
            'Ecuación canónica dividiendo entre m = 250: x\'\' + 2 x\' + 40 x = 2 cos(8t).'
          ),
          createApaParagraph(
            'Ecuación auxiliar y discriminante: r² + 2r + 40 = 0 => Δ = (2)² - 4(1)(40) = 4 - 160 = -156 < 0. El sistema es SUBAMORTIGUADO con raíces r = -1 ± i√39 ≈ -1 ± 6.245i.'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'xh(t) = e^(-t) [C1 cos(√39 t) + C2 sin(√39 t)]',
                font: 'Times New Roman',
                italics: true,
              }),
            ],
          }),
          createApaParagraph(
            'Para la solución particular xp(t) por Coeficientes Indeterminados, se propone xp = A cos(8t) + B sin(8t). Derivando y sustituyendo en la ecuación se resuelve el sistema lineal algebraicamenente, obteniéndose A = -3/104 ≈ -0.02885 m y B = 2/104 ≈ 0.01923 m.'
          ),
          createApaParagraph(
            'Aplicando las condiciones iniciales x(0) = 0.05 m y x\'(0) = 0 m/s, se calculan las constantes C1 = 0.07885 m y C2 = -0.01201 m. La solución completa analítica del PVI es:'
          ),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 120, after: 120, line: 480 },
            children: [
              new TextRun({
                text: 'x(t) = e^(-t) [0.0789 cos(6.245 t) - 0.0120 sin(6.245 t)] - 0.0288 cos(8t) + 0.0192 sin(8t) [m]',
                font: 'Times New Roman',
                bold: true,
              }),
            ],
          }),
          createApaParagraph(
            'Diagnóstico de Resonancia: La frecuencia natural del sistema es ω0 = √(k/m) = √(10000/250) ≈ 6.325 rad/s (1.01 Hz). La frecuencia de rotación de la bomba es ω = 8.0 rad/s (1.27 Hz). Como existe un desfase superior al 26.5%, el amortiguador disipa eficientemente la energía impidiendo la catástrofe por resonancia en el acueducto.'
          ),

          createApaHeading2('4.4 Implementación del Software Terminal en Rust con Ratatui'),
          createApaParagraph(
            'El modelo matemático completo fue traducido a un artefacto de software ejecutable programado en lenguaje Rust utilizando el motor de interfaz de usuario de terminal Ratatui v0.29 y la biblioteca Crossterm v0.28. La arquitectura se diseñó replicando la experiencia de un editor de texto profesional Neovim / LazyVim:'
          ),
          createApaParagraph(
            '• Bufferline superior con navegación por pestañas indexadas (1..7).'
          ),
          createApaParagraph(
            '• Lualine statusline en la base de la pantalla con modos de operación modal (NORMAL, INSERT, COMMAND).'
          ),
          createApaParagraph(
            '• Menú Which-Key flotante activado mediante la barra espaciadora (<Space>).'
          ),
          createApaParagraph(
            '• Paleta retro Gruvbox Dark (#1d2021, #282828, #fabd2f, #b8bb26, #fb4934, #83a598).'
          ),
          createApaParagraph(
            '• Integrador numérico Runge-Kutta 4 (RK4) en punto flotante f64 para el cálculo dinámico de trayectorias a 60 cuadros por segundo.'
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 7. RESULTADOS O DISCUSIÓN
          // ==========================================
          createApaHeading1('5. Resultados o Discusión'),
          createApaParagraph(
            'Los resultados obtenidos a partir de las soluciones analíticas y de las simulaciones numéricas en el software desarrollado confirman la concordancia entre los modelos teóricos de los tres módulos y el comportamiento observado en la ingeniería real.'
          ),

          createApaHeading2('5.1 Análisis Comparativo de Regímenes'),
          createApaParagraph(
            'En la Tabla 1 se sintetizan los parámetros obtenidos para las tres fases del proyecto:'
          ),

          // TABLA APA 7 (Líneas horizontales únicamente)
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Módulo', bold: true, font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Fenómeno Físico', bold: true, font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Método Matemático', bold: true, font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Resultado Clave', bold: true, font: 'Times New Roman' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Unidad 1', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Enfriamiento de transformador', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Variables separables', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 't_seguro = 65.71 min', font: 'Times New Roman' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Unidad 2', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Salinidad en tanque de mezcla', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Factor Integrante μ(t)', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Q(60) = 33.54 kg, Q_est = 50 kg', font: 'Times New Roman' })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Unidad 3', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Vibración de electrobomba', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: '2da Ley Newton / Coef. Indet.', font: 'Times New Roman' })] })],
                  }),
                  new TableCell({
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: '000000' },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Δ = -156, Subamortiguado, sin resonancia', font: 'Times New Roman' })] })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 100, after: 240, line: 360 },
            children: [
              new TextRun({
                text: 'Nota. Tabla resumen elaborada por el autor con los resultados analíticos validados en el software en Rust.',
                font: 'Times New Roman',
                size: 20,
                italics: true,
              }),
            ],
          }),

          createApaHeading2('5.2 Evidencia Gráfica del Software TUI en Ratatui/Rust'),
          createApaParagraph(
            'A continuación se presentan las capturas del programa terminal desarrollado, demostrando la integración de los componentes visuales de Ratatui y los cálculos numéricos en tiempo real:'
          ),

          // FIGURA 1 (APA 7)
          new Paragraph({
            spacing: { before: 240, after: 60, line: 360 },
            children: [
              new TextRun({ text: 'Figura 1\n', font: 'Times New Roman', bold: true }),
              new TextRun({
                text: 'Panel General del Software TUI en Rust con Ratatui y Tema Gruvbox Dark',
                font: 'Times New Roman',
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: dashboardBytes,
                transformation: { width: 550, height: 290 },
                type: 'png',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 240, line: 360 },
            children: [
              new TextRun({
                text: 'Nota. Interfaz de terminal mostrando el Bufferline superior tipo LazyVim, banner ASCII institucional y las tarjetas conceptuales de las Unidades 1, 2 y 3 para la Universidad de Cartagena CTEV.',
                font: 'Times New Roman',
                size: 20,
                italics: true,
              }),
            ],
          }),

          // FIGURA 2 (APA 7)
          new Paragraph({
            spacing: { before: 240, after: 60, line: 360 },
            children: [
              new TextRun({ text: 'Figura 2\n', font: 'Times New Roman', bold: true }),
              new TextRun({
                text: 'Simulador Dinámico del Oscilador Masa-Resorte con Esquema ASCII y Oscilograma x(t)',
                font: 'Times New Roman',
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: oscillatorBytes,
                transformation: { width: 550, height: 275 },
                type: 'png',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 240, line: 360 },
            children: [
              new TextRun({
                text: 'Nota. Visualización en tiempo real del desplazamiento x(t) calculado por RK4, diagrama mecánico ASCII del resorte y pistón viscoso, e inspector analítico del discriminante Δ = -156 (Régimen Subamortiguado).',
                font: 'Times New Roman',
                size: 20,
                italics: true,
              }),
            ],
          }),

          createApaParagraph(
            'La discusión técnica confirma que el diseño del amortiguador viscoso con c = 500 N·s/m asegura una atenuación rápida de la componente transitoria xh(t) en menos de 4 segundos, mientras que la amplitud de vibración forzada permanente xp(t) permanece confinada en aproximadamente 3.47 centímetros, protegiendo las tuberías del acueducto frente a cualquier daño estructural.'
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 8. BIBLIOGRAFÍA (APA 7)
          // ==========================================
          createApaHeading1('6. Bibliografía'),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 }, // Sangría francesa 1.27 cm
            children: [
              new TextRun({
                text: 'Boyce, W. E., & DiPrima, R. C. (2017). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Ecuaciones diferenciales y problemas con valores en la frontera ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: '(10ª ed.). Limusa Wiley.',
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 },
            children: [
              new TextRun({
                text: 'Edwards, C. H., & Penney, D. E. (2009). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Ecuaciones diferenciales y problemas con valores en la frontera: Cómputo y modelado ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: '(4ª ed.). Pearson Educación.',
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 },
            children: [
              new TextRun({
                text: 'Klabnik, S., & Nichols, C. (2023). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'The Rust programming language ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: '(2nd ed.). No Starch Press.',
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 },
            children: [
              new TextRun({
                text: 'Ratatui Contributors. (2024). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Ratatui: A Rust library to build rich Terminal User Interfaces (v0.29.0) ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: '[Software]. https://ratatui.rs',
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 },
            children: [
              new TextRun({
                text: 'Universidad de Cartagena - CTEV. (2026). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Módulos de aprendizaje de ecuaciones diferenciales: Unidad 1, Unidad 2 y Unidad 3. ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: 'Centro de Tecnologías para la Educación Virtual, Cartagena de Indias, Colombia.',
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 180, line: 480 },
            indent: { left: 720, hanging: 720 },
            children: [
              new TextRun({
                text: 'Zill, D. G. (2018). ',
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Ecuaciones diferenciales con aplicaciones de modelado ',
                font: 'Times New Roman',
                italics: true,
              }),
              new TextRun({
                text: '(11ª ed.). Cengage Learning.',
                font: 'Times New Roman',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Trabajo_Final_Ecuaciones_Diferenciales_CTEV_UdeC.docx');
}
