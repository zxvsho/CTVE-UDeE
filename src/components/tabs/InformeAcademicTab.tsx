import React from 'react';
import { ACADEMIC_PROJECT_INFO, UNIDAD_1_DATA, UNIDAD_2_DATA, UNIDAD_3_DATA } from '../../data/ctevWorkData';
import { MathView } from '../MathView';
import { Printer, GraduationCap, CheckCircle, FileText, Download } from 'lucide-react';

export const InformeAcademicTab: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto font-serif text-[#282828] bg-white rounded-sm shadow-xl print:p-0 print:shadow-none print:m-0">
      {/* Print Action Bar (Hidden on print) */}
      <div className="no-print bg-[#1d2021] text-[#ebdbb2] p-3 rounded-sm flex items-center justify-between font-mono text-xs border border-[#3c3836]">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#fabd2f]" />
          <span>Documento Formal CTEV Listo para Presentación y Calificación</span>
        </div>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Printer size={13} />
          <span>Imprimir / Guardar PDF</span>
        </button>
      </div>

      {/* PORTADA INSTITUCIONAL FORMAL (CTEV UNIVERSIDAD DE CARTAGENA) */}
      <div className="text-center py-12 px-6 border-b-2 border-stone-800 space-y-6">
        <div className="space-y-1">
          <h1 className="text-lg md:text-xl font-bold tracking-wider uppercase text-stone-900 font-sans">
            {ACADEMIC_PROJECT_INFO.institution}
          </h1>
          <h2 className="text-sm md:text-base font-semibold tracking-wide text-stone-700 uppercase font-sans">
            {ACADEMIC_PROJECT_INFO.faculty}
          </h2>
          <h3 className="text-xs md:text-sm text-stone-600 font-sans">
            {ACADEMIC_PROJECT_INFO.program}
          </h3>
          <div className="text-xs text-stone-500 font-sans uppercase tracking-widest pt-1">
            Asignatura: {ACADEMIC_PROJECT_INFO.course}
          </div>
        </div>

        <div className="py-8 my-6 border-y border-stone-300">
          <div className="text-xs text-stone-500 uppercase tracking-widest mb-2 font-sans font-bold">
            TRABAJO FINAL INTEGRAL DE ASIGNATURA
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-stone-900 max-w-3xl mx-auto leading-tight">
            {ACADEMIC_PROJECT_INFO.projectTitle}
          </h2>
        </div>

        <div className="space-y-1 text-sm text-stone-800 font-sans">
          <div className="font-bold">Presentado por:</div>
          <div className="text-base font-semibold text-stone-900">{ACADEMIC_PROJECT_INFO.author}</div>
          <div className="text-xs text-stone-600">{ACADEMIC_PROJECT_INFO.email}</div>
        </div>

        <div className="pt-6 text-xs text-stone-600 font-sans">
          {ACADEMIC_PROJECT_INFO.cityYear}
        </div>
      </div>

      {/* RESUMEN Y PALABRAS CLAVE */}
      <div className="py-4 space-y-2 text-justify">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          Resumen
        </h3>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          {ACADEMIC_PROJECT_INFO.abstract}
        </p>
        <p className="text-xs text-stone-600 font-sans pt-1">
          <strong>Palabras clave:</strong> Ecuaciones Diferenciales Ordinarias (EDO), Clasificación de ED, Factor Integrante, Ecuaciones Exactas, Segunda Ley de Newton, Oscilador Masa-Resorte Amortiguado, Resonancia Mecánica, Ratatui, Rust, CTEV.
        </p>
      </div>

      {/* 1. INTRODUCCIÓN */}
      <div className="py-3 space-y-2 text-justify">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          1. Introducción y Contexto Curricular
        </h3>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          Las ecuaciones diferenciales constituyen el lenguaje fundamental mediante el cual las ciencias físicas y la ingeniería modelan los sistemas dinámicos del mundo real. Desde el desarrollo simultáneo del cálculo infinitesimal por Isaac Newton y Gottfried Wilhelm Leibniz en el siglo XVII, el estudio de las razones de cambio ha permitido describir fenómenos tan diversos como el enfriamiento térmico, la cinética química y las vibraciones mecánicas.
        </p>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          En el marco de la asignatura de Ecuaciones Diferenciales del CTEV de la Universidad de Cartagena, este trabajo final integra los contenidos de los tres módulos académicos: (1) Definición y clasificación; (2) Métodos de solución de primer orden; y (3) Ecuaciones lineales de orden superior con énfasis en la segunda ley de Newton y los osciladores armónicos.
        </p>
      </div>

      {/* 2. OBJETIVOS */}
      <div className="py-3 space-y-2 text-justify">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          2. Objetivos del Trabajo
        </h3>
        <div className="text-sm text-stone-800 space-y-2">
          <p>
            <strong>2.1 Objetivo General:</strong> {ACADEMIC_PROJECT_INFO.objectives.general}
          </p>
          <div className="space-y-1">
            <strong>2.2 Objetivos Específicos:</strong>
            <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm">
              {ACADEMIC_PROJECT_INFO.objectives.specifics.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 3. DESARROLLO UNIDAD 1 */}
      <div className="py-3 space-y-3 text-justify page-break-before">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          3. Unidad 1: Definición, Clasificación y Modelos Matemáticos
        </h3>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          Una ecuación diferencial es una igualdad que relaciona una función incógnita con una o más de sus derivadas. La clasificación rigurosa constituye el paso obligado previo a cualquier intento de solución:
        </p>

        <ul className="list-disc pl-6 text-sm text-stone-800 space-y-1">
          <li>
            <strong>Por Tipo:</strong> Ordinarias (EDO), cuando la función depende de una sola variable independiente (ej. <MathView math="dy/dt = ky" />), y Parciales (EDP), cuando involucra derivadas respecto a dos o más variables independientes (ej. <MathView math="\partial^2 u/\partial t^2 = c^2 \partial^2 u/\partial x^2" />).
          </li>
          <li>
            <strong>Por Orden:</strong> Determinado por el orden de la derivada más alta presente en la ecuación.
          </li>
          <li>
            <strong>Por Linealidad:</strong> Se dice lineal si la variable dependiente y y todas sus derivadas aparecen exclusivamente en primer grado, sin productos entre ellas ni argumentos dentro de funciones no lineales.
          </li>
        </ul>

        {/* Problema U1 en Informe */}
        <div className="bg-stone-50 border border-stone-300 p-4 rounded-xs space-y-2 my-2">
          <h4 className="font-sans font-bold text-stone-900 text-sm">
            3.1 Aplicación Modelada: Ley de Enfriamiento de Newton en Transformadores de Potencia
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            {UNIDAD_1_DATA.problem.context}
          </p>
          <div className="text-center py-2">
            <MathView math="\frac{dT}{dt} = -k(T - 30), \quad T(0) = 95^\circ\text{C}, \quad T(10) = 82^\circ\text{C}" block />
          </div>
          <p className="text-xs text-stone-800">
            Integrando por separación de variables se deduce la constante convectiva <MathView math="k \approx 0.022314 \text{ min}^{-1}" />, conduciendo a la solución particular del PVI:
          </p>
          <div className="text-center py-1">
            <MathView math="T(t) = 30 + 65 e^{-0.022314 t} \quad \implies \quad t_{\text{seguro}} (T=45^\circ\text{C}) \approx 65.71 \text{ minutos}" block />
          </div>
        </div>
      </div>

      {/* 4. DESARROLLO UNIDAD 2 */}
      <div className="py-3 space-y-3 text-justify">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          4. Unidad 2: Métodos de Solución de EDO de Primer Orden
        </h3>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          Las ecuaciones de primer orden admiten diversas técnicas analíticas. En el caso de las lineales <MathView math="y' + P(x)y = Q(x)" />, la multiplicación por el factor integrante <MathView math="\mu(x) = e^{\int P(x)dx}" /> convierte el término diferencial en la regla del producto <MathView math="d/dx [\mu(x) y] = \mu(x) Q(x)" />. Para ecuaciones en forma diferencial <MathView math="M(x,y)dx + N(x,y)dy = 0" />, el criterio de exactitud <MathView math="\partial M/\partial y = \partial N/\partial x" /> garantiza la existencia de una función de estado <MathView math="F(x,y) = C" />.
        </p>

        {/* Problema U2 en Informe */}
        <div className="bg-stone-50 border border-stone-300 p-4 rounded-xs space-y-2 my-2">
          <h4 className="font-sans font-bold text-stone-900 text-sm">
            4.1 Aplicación Modelada: Homogenización de Salinidad en Tanque de Tratamiento
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            {UNIDAD_2_DATA.problem.context}
          </p>
          <div className="text-center py-2">
            <MathView math="\frac{dQ}{dt} + 0.01 Q(t) = 0.5, \quad Q(0) = 20\text{ kg}, \quad \mu(t) = e^{0.01 t}" block />
          </div>
          <p className="text-xs text-stone-800">
            Multiplicando por el factor integrante <MathView math="\mu(t)" /> e integrando:
          </p>
          <div className="text-center py-1">
            <MathView math="Q(t) = 50 - 30 e^{-0.01 t} \quad \implies \quad Q(60) = 33.54\text{ kg}, \quad \lim_{t\to\infty} Q(t) = 50\text{ kg}" block />
          </div>
        </div>
      </div>

      {/* 5. DESARROLLO UNIDAD 3 */}
      <div className="py-3 space-y-3 text-justify page-break-before">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          5. Unidad 3: Ecuaciones Diferenciales Lineales de Orden Superior y Oscilador Masa-Resorte
        </h3>
        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          El punto de partida del módulo radica en que la <strong>Segunda Ley de Newton</strong> (<MathView math="F = ma" />) es intrínsecamente una EDO de segundo orden, dado que la aceleración corresponde a la segunda derivada temporal de la posición <MathView math="a(t) = d^2x/dt^2" />. El oscilador armónico con amortiguamiento viscoso y excitación periódica externa resume los comportamientos cualitativos de la ingeniería estructural:
        </p>

        <div className="text-center py-2">
          <MathView math="m \frac{d^2x}{dt^2} + c \frac{dx}{dt} + k x = F_0 \cos(\omega t)" block />
        </div>

        <p className="text-sm text-stone-800 leading-relaxed indent-6">
          A través de la ecuación característica auxiliar <MathView math="m r^2 + c r + k = 0" />, el signo del discriminante <MathView math="\Delta = c^2 - 4mk" /> define tres regímenes fundamentales:
        </p>

        <ul className="list-disc pl-6 text-sm text-stone-800 space-y-1">
          <li><strong>Subamortiguado (<MathView math="\Delta < 0" />):</strong> Raíces complejas <MathView math="-\gamma \pm i\omega_d" />, oscilaciones acotadas por una envolvente exponencial decreciente.</li>
          <li><strong>Amortiguamiento Crítico (<MathView math="\Delta = 0" />):</strong> Raíz real repetida <MathView math="-\gamma" />, máxima tasa de retorno a la posición de equilibrio sin sobreoscilación.</li>
          <li><strong>Sobreamortiguado (<MathView math="\Delta > 0" />):</strong> Dos raíces reales distintas negativas, respuesta lenta aperiódica.</li>
        </ul>

        {/* Problema U3 en Informe */}
        <div className="bg-stone-50 border border-stone-300 p-4 rounded-xs space-y-2 my-2">
          <h4 className="font-sans font-bold text-stone-900 text-sm">
            5.1 Aplicación Modelada: Sistema Amortiguador de la Bomba Hidráulica en Cartagena
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            Parámetros: <MathView math="m = 250\text{ kg}" />, <MathView math="c = 500\text{ N}\cdot\text{s/m}" />, <MathView math="k = 10000\text{ N/m}" />, <MathView math="F(t) = 500\cos(8t)\text{ N}" />, PVI: <MathView math="x(0) = 0.05\text{ m}" />, <MathView math="x'(0) = 0" />.
          </p>
          <div className="text-center py-2">
            <MathView math="r^2 + 2r + 40 = 0 \implies \Delta = -156 < 0 \implies r_{1,2} = -1 \pm i\sqrt{39}" block />
          </div>
          <p className="text-xs text-stone-800">
            Solución analítica combinada (transitorio amortiguado + régimen permanente forzado):
          </p>
          <div className="text-center py-1">
            <MathView math="x(t) = e^{-t}[0.0789 \cos(6.245 t) - 0.0120 \sin(6.245 t)] - 0.0288 \cos(8t) + 0.0192 \sin(8t)" block />
          </div>
          <p className="text-xs text-stone-700 font-sans">
            <strong>Verificación de Resonancia:</strong> La frecuencia natural del sistema es <MathView math="\omega_0 = \sqrt{10000/250} \approx 6.325 \text{ rad/s}" />. La frecuencia de bombeo <MathView math="\omega = 8.0 \text{ rad/s}" /> se aleja en un 26.5%, impidiendo el fenómeno catastrófico de resonancia en las instalaciones de Cartagena.
          </p>
        </div>
      </div>

      {/* 6. CONCLUSIONES */}
      <div className="py-3 space-y-2 text-justify">
        <h3 className="text-base font-bold text-stone-900 font-sans uppercase tracking-wide border-b border-stone-300 pb-1">
          6. Conclusiones
        </h3>
        <ul className="list-decimal pl-6 text-sm text-stone-800 space-y-2">
          <li>
            La clasificación de ecuaciones diferenciales (Unidad 1) proporciona la brújula metodológica indispensable para discernir si una ecuación requiere técnicas analíticas exactas o aproximaciones numéricas.
          </li>
          <li>
            Los métodos de primer orden (Unidad 2), particularmente el factor integrante y las ecuaciones exactas, resolvieron de manera analítica y precisa la dinámica de concentración de solutos en procesos de saneamiento hídrico.
          </li>
          <li>
            El modelado de segundo orden mediante la Segunda Ley de Newton (Unidad 3) demostró ser la herramienta definitiva para el análisis y diseño de amortiguadores en maquinaria pesada, permitiendo verificar y evitar los riesgos de resonancia mecánica.
          </li>
          <li>
            La implementación del simulador interactivo en Rust con Ratatui bajo estética LazyVim/Gruvbox evidenció la sinergia entre el rigor matemático del cálculo diferencial y el desarrollo de software científico de alto rendimiento.
          </li>
        </ul>
      </div>

      {/* 7. REFERENCIAS */}
      <div className="py-4 border-t border-stone-300 text-xs text-stone-700 space-y-1 font-sans">
        <h4 className="font-bold text-stone-900 uppercase">Referencias Bibliográficas</h4>
        <p>1. Zill, D. G. (2018). <em>Ecuaciones Diferenciales con Aplicaciones de Modelado</em> (11ª ed.). Cengage Learning.</p>
        <p>2. Boyce, W. E., & DiPrima, R. C. (2017). <em>Ecuaciones Diferenciales y Problemas con Valores en la Frontera</em> (10ª ed.). Limusa Wiley.</p>
        <p>3. Edwards, C. H., & Penney, D. E. (2009). <em>Ecuaciones Diferenciales y Problemas con Valores en la Frontera: Cómputo y Modelado</em> (4ª ed.). Pearson Educación.</p>
        <p>4. Universidad de Cartagena - CTEV. (2026). <em>Módulos Guía de Ecuaciones Diferenciales: Unidades 1, 2 y 3</em>. Cartagena de Indias, Colombia.</p>
      </div>
    </div>
  );
};
