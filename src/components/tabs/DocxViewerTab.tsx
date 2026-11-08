import React, { useState } from 'react';
import { exportToDocx } from '../../utils/docxGenerator';
import { Download, FileText, CheckCircle, Printer, Sparkles, User, GraduationCap, Building2 } from 'lucide-react';
import { generateDashboardCanvas, generateOscillatorCanvas } from '../../utils/tuiScreenshotGenerator';

interface DocxViewerTabProps {
  onNotification?: (msg: string) => void;
}

export const DocxViewerTab: React.FC<DocxViewerTabProps> = ({ onNotification }) => {
  const [studentName, setStudentName] = useState<string>('Miguel Andrés Cuello Tarriba');
  const [professorName, setProfessorName] = useState<string>('Docente / Tutor Asignado CTEV');
  const [courseName, setCourseName] = useState<string>('Ecuaciones Diferenciales');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportToDocx({
        studentName,
        professorName,
        courseName,
      });
      setDownloadSuccess(true);
      onNotification?.('✓ Archivo Trabajo_Final_Ecuaciones_Diferenciales_CTEV_UdeC.docx descargado con éxito.');
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Error al generar el documento .docx');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto font-mono text-[#ebdbb2]">
      {/* Top Banner */}
      <div className="bg-[#282828] border-2 border-[#fabd2f] p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#fabd2f] font-bold text-sm">
            <FileText size={18} />
            <span>Generador Oficial de Documento .DOCX (Normas APA 7ª Edición)</span>
          </div>
          <p className="text-xs text-[#a89984]">
            Documento de Microsoft Word con Hoja de Presentación, Tabla de Contenidos, Unidades 1-3 resueltas, Resultados, Figuras con capturas del software y Bibliografía.
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-4 py-2.5 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] disabled:opacity-50 font-bold text-xs rounded-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shrink-0"
        >
          {downloadSuccess ? <CheckCircle size={15} className="text-emerald-800" /> : <Download size={15} />}
          <span>{isExporting ? 'Generando DOCX...' : downloadSuccess ? '¡DOCX Descargado!' : 'Descargar Archivo .DOCX'}</span>
        </button>
      </div>

      {/* Editor de Metadatos de la Portada */}
      <div className="bg-[#1d2021] border border-[#3c3836] p-4 rounded-sm space-y-3">
        <div className="text-xs font-bold text-[#fabd2f] flex items-center justify-between border-b border-[#3c3836] pb-2">
          <span>DATOS DE LA HOJA DE PRESENTACIÓN (PORTADA APA 7)</span>
          <span className="text-[10px] text-[#7c6f64]">Personaliza los nombres antes de descargar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[#a89984] block text-[10px] mb-1">NOMBRE DEL ESTUDIANTE:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-[#282828] border border-[#504945] rounded-xs px-2.5 py-1.5 text-[#fbf1c7] font-mono outline-none focus:border-[#fabd2f]"
            />
          </div>

          <div>
            <label className="text-[#a89984] block text-[10px] mb-1">DOCENTE TUTOR CTEV:</label>
            <input
              type="text"
              value={professorName}
              onChange={(e) => setProfessorName(e.target.value)}
              className="w-full bg-[#282828] border border-[#504945] rounded-xs px-2.5 py-1.5 text-[#fbf1c7] font-mono outline-none focus:border-[#fabd2f]"
            />
          </div>

          <div>
            <label className="text-[#a89984] block text-[10px] mb-1">ASIGNATURA:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full bg-[#282828] border border-[#504945] rounded-xs px-2.5 py-1.5 text-[#fbf1c7] font-mono outline-none focus:border-[#fabd2f]"
            />
          </div>
        </div>
      </div>

      {/* Vista Previa del Documento en Formato APA 7 (Hoja de Papel) */}
      <div className="bg-white text-stone-900 font-serif p-8 md:p-14 shadow-2xl rounded-xs border border-stone-300 space-y-8 text-sm leading-relaxed text-justify">
        
        {/* Encabezado con número de página APA */}
        <div className="text-right text-xs font-serif text-stone-500 border-b border-stone-200 pb-2">
          1
        </div>

        {/* 1. HOJA DE PRESENTACIÓN */}
        <div className="text-center py-8 space-y-6">
          <h1 className="text-base md:text-lg font-bold font-serif uppercase tracking-wide text-stone-900 max-w-2xl mx-auto leading-snug">
            MODELADO Y RESOLUCIÓN COMPUTACIONAL EN RUST/RATATUI DE UNA PROBLEMÁTICA EN INGENIERÍA: APLICACIÓN INTEGRAL DE LOS MÓDULOS 1, 2 Y 3
          </h1>

          <div className="text-xs text-stone-600 italic">
            Trabajo Final de Asignatura Presentado en Cumplimiento de los Módulos 1, 2 y 3
          </div>

          <div className="py-4 space-y-1 text-sm font-serif">
            <div className="font-bold text-stone-900">Estudiante:</div>
            <div className="text-stone-800">{studentName}</div>
          </div>

          <div className="py-2 space-y-1 text-sm font-serif">
            <div className="font-bold text-stone-900">Docente Tutor:</div>
            <div className="text-stone-800">{professorName}</div>
          </div>

          <div className="pt-6 text-xs text-stone-700 font-serif space-y-0.5">
            <div>Universidad de Cartagena</div>
            <div>Centro de Tecnologías para la Educación Virtual (CTEV)</div>
            <div>Programa de Ingeniería · Modalidad a Distancia</div>
            <div>Asignatura: {courseName}</div>
            <div className="pt-2 text-stone-500">Cartagena de Indias, D.T. y C., Colombia · 2026</div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-stone-300 my-8 pt-4 text-center text-xs text-stone-400 font-sans">
          --- Salto de Página ---
        </div>

        {/* 2. TABLA DE CONTENIDOS */}
        <div className="space-y-3 font-serif">
          <h2 className="text-center font-bold text-base text-stone-900 uppercase">
            Tabla de Contenidos
          </h2>
          <div className="space-y-1.5 text-xs text-stone-800">
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">1. Descripción de la Problemática</span>
              <span>Pág. 3</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">2. Justificación</span>
              <span>Pág. 4</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">3. Objetivos (General y Específicos)</span>
              <span>Pág. 5</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">4. Descripción Detallada de la Solución Planteada</span>
              <span>Pág. 6</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5 pl-4">
              <span>4.1 Unidad 1: Definición, Clasificación y Modelos de EDO</span>
              <span>Pág. 6</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5 pl-4">
              <span>4.2 Unidad 2: Métodos de Solución de EDO de Primer Orden</span>
              <span>Pág. 8</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5 pl-4">
              <span>4.3 Unidad 3: ED Lineales de Orden Superior y Oscilador Masa-Resorte</span>
              <span>Pág. 11</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5 pl-4">
              <span>4.4 Implementación del Software Terminal en Rust con Ratatui</span>
              <span>Pág. 14</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">5. Resultados o Discusión</span>
              <span>Pág. 16</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-stone-400 pb-0.5">
              <span className="font-bold">6. Bibliografía (Normas APA 7)</span>
              <span>Pág. 20</span>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-stone-300 my-8 pt-4 text-center text-xs text-stone-400 font-sans">
          --- Salto de Página ---
        </div>

        {/* 3. DESCRIPCIÓN DE LA PROBLEMÁTICA */}
        <div className="space-y-3 font-serif">
          <h2 className="text-center font-bold text-base text-stone-900 uppercase">
            1. Descripción de la Problemática
          </h2>
          <p className="indent-8 text-stone-800 leading-relaxed text-xs md:text-sm">
            En el sistema de captación y bombeo del Canal del Dique que abastece a la ciudad de Cartagena de Indias, operan electrobombas centrífugas de 150 kW en régimen ininterrumpido. La estación presenta tres problemáticas dinámicas que requieren el modelado riguroso de ecuaciones diferenciales:
          </p>
          <p className="indent-8 text-stone-800 leading-relaxed text-xs md:text-sm">
            1. Enfriamiento térmico convectivo en transformadores eléctricos de potencia (Unidad 1): Determinar la curva temporal tras la desconexión desde 95 °C en un ambiente a 30 °C para autorizar el mantenimiento seguro por debajo de 45 °C.
          </p>
          <p className="indent-8 text-stone-800 leading-relaxed text-xs md:text-sm">
            2. Regulación de salinidad en el tanque de homogenización (Unidad 2): Modelar la masa de soluto Q(t) mediante una EDO lineal resuelta por Factor Integrante μ(t) ante flujos de entrada y salida constantes.
          </p>
          <p className="indent-8 text-stone-800 leading-relaxed text-xs md:text-sm">
            3. Vibraciones forzadas y riesgo de resonancia en el sistema electrobomba-soporte (Unidad 3): Modelar por la Segunda Ley de Newton (F = ma) el oscilador masa-resorte-amortiguador m x'' + c x' + k x = F0 cos(ω t), calcular el discriminante característico y verificar el margen de seguridad frente a la frecuencia de resonancia.
          </p>
        </div>

        {/* 4. JUSTIFICACIÓN */}
        <div className="space-y-3 font-serif">
          <h2 className="text-center font-bold text-base text-stone-900 uppercase">
            2. Justificación
          </h2>
          <p className="indent-8 text-stone-800 leading-relaxed text-xs md:text-sm">
            El presente trabajo se fundamenta en la necesidad de articular el cálculo diferencial superior con la ingeniería aplicada en un entorno geográfico real. El Canal del Dique sustenta a más de un millón de habitantes; asegurar la integridad de sus estaciones de bombeo mediante modelos matemáticos predictivos y herramientas de software de alto rendimiento en Rust evita paradas no programadas y catástrofes estructurales.
          </p>
        </div>

        {/* 5. OBJETIVOS */}
        <div className="space-y-3 font-serif">
          <h2 className="text-center font-bold text-base text-stone-900 uppercase">
            3. Objetivos
          </h2>
          <div className="space-y-2 text-xs md:text-sm">
            <p>
              <strong>3.1 Objetivo General:</strong> Desarrollar, resolver analíticamente y simular mediante un software terminal en Rust/Ratatui una problemática integral de ingeniería que articule los tres módulos de la cátedra de Ecuaciones Diferenciales de la Universidad de Cartagena CTEV.
            </p>
            <p>
              <strong>3.2 Objetivos Específicos:</strong>
            </p>
            <ul className="list-disc pl-8 space-y-1 text-xs">
              <li>Clasificar rigurosamente las ecuaciones según tipo, orden y linealidad, formulando modelos matemáticos basados en leyes físicas.</li>
              <li>Resolver EDO de primer orden mediante variables separables, factor integrante para lineales y ecuaciones exactas con factores de integración.</li>
              <li>Modelar el oscilador masa-resorte de segundo orden fundamentado en la 2da Ley de Newton, deduciendo regímenes de amortiguamiento y diagnosticando el riesgo de resonancia.</li>
              <li>Construir una aplicación interactiva en Rust con Ratatui bajo la estética LazyVim/Gruvbox para la simulación numérica RK4 en tiempo real.</li>
            </ul>
          </div>
        </div>

        {/* 6. CAPTURAS DEL PROGRAMA (MUESTRA PREVIA EN LA VISTA) */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h3 className="font-bold text-stone-900 text-sm">
            Evidencia Gráfica Incrustada en el Documento DOCX:
          </h3>

          {/* Figura 1 */}
          <div className="space-y-1 bg-stone-50 p-4 border border-stone-200 rounded">
            <div className="font-bold text-xs text-stone-900">Figura 1</div>
            <div className="italic text-xs text-stone-700 mb-2">Panel General del Software TUI en Rust con Ratatui y Tema Gruvbox Dark</div>
            <div className="bg-[#1d2021] text-[#fabd2f] p-3 rounded font-mono text-[10px] overflow-x-auto">
              [Captura de Alta Resolución del Dashboard TUI con Banner ASCII y Bufferline LazyVim]
            </div>
            <div className="text-[10px] text-stone-500 italic mt-1">
              Nota. Interfaz de terminal mostrando el Bufferline superior, banner ASCII institucional y las tarjetas conceptuales de las Unidades 1, 2 y 3.
            </div>
          </div>

          {/* Figura 2 */}
          <div className="space-y-1 bg-stone-50 p-4 border border-stone-200 rounded">
            <div className="font-bold text-xs text-stone-900">Figura 2</div>
            <div className="italic text-xs text-stone-700 mb-2">Simulador Dinámico del Oscilador Masa-Resorte con Esquema ASCII y Oscilograma x(t)</div>
            <div className="bg-[#1d2021] text-[#8ec07c] p-3 rounded font-mono text-[10px] overflow-x-auto">
              [Captura de Alta Resolución del Osciloscopio x(t), Resorte ASCII y Discriminante Δ = -156]
            </div>
            <div className="text-[10px] text-stone-500 italic mt-1">
              Nota. Visualización en tiempo real del desplazamiento x(t) calculado por RK4, diagrama mecánico ASCII del resorte y pistón viscoso, e inspector analítico.
            </div>
          </div>
        </div>

        {/* 7. BIBLIOGRAFÍA */}
        <div className="space-y-3 pt-4 border-t border-stone-200 font-serif">
          <h2 className="text-center font-bold text-base text-stone-900 uppercase">
            6. Bibliografía
          </h2>
          <div className="text-xs space-y-2 text-stone-800 pl-6 -indent-6">
            <p>Boyce, W. E., & DiPrima, R. C. (2017). <em>Ecuaciones diferenciales y problemas con valores en la frontera</em> (10ª ed.). Limusa Wiley.</p>
            <p>Edwards, C. H., & Penney, D. E. (2009). <em>Ecuaciones diferenciales y problemas con valores en la frontera: Cómputo y modelado</em> (4ª ed.). Pearson Educación.</p>
            <p>Klabnik, S., & Nichols, C. (2023). <em>The Rust programming language</em> (2nd ed.). No Starch Press.</p>
            <p>Ratatui Contributors. (2024). <em>Ratatui: A Rust library to build rich Terminal User Interfaces (v0.29.0)</em> [Software]. https://ratatui.rs</p>
            <p>Universidad de Cartagena - CTEV. (2026). <em>Módulos de aprendizaje de ecuaciones diferenciales: Unidad 1, Unidad 2 y Unidad 3</em>. Centro de Tecnologías para la Educación Virtual, Cartagena de Indias, Colombia.</p>
            <p>Zill, D. G. (2018). <em>Ecuaciones diferenciales con aplicaciones de modelado</em> (11ª ed.). Cengage Learning.</p>
          </div>
        </div>

      </div>

      {/* Floating Action Button at Bottom */}
      <div className="sticky bottom-4 z-20 flex justify-center">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-6 py-3 bg-[#fabd2f] text-[#282828] hover:bg-[#d5c4a1] font-bold text-sm rounded-xs flex items-center gap-2 shadow-2xl transition-all cursor-pointer transform hover:scale-105"
        >
          <Download size={16} />
          <span>{isExporting ? 'Generando archivo .DOCX...' : 'Descargar Trabajo_Final_CTEV_UdeC.docx'}</span>
        </button>
      </div>
    </div>
  );
};
