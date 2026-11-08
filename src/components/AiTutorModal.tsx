import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, BookOpen, Calculator, AlertCircle, CheckCircle } from 'lucide-react';
import { MathView } from './MathView';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_PROMPTS = [
  "¿Por qué la segunda ley de Newton conduce naturalmente a una ED de segundo orden?",
  "Explica paso a paso cómo deducir el factor integrante μ(x) = exp(∫P dx)",
  "¿Cómo se verifica si una ecuación M dx + N dy = 0 es exacta y cómo se halla la función potencial?",
  "¿Qué condición matemática exacta produce resonancia en un oscilador amortiguado y forzado?",
  "Diferencia entre solución general, particular y singular con un ejemplo de la UdeC"
];

function getLocalCtevAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('newton') || q.includes('segunda ley') || q.includes('segundo orden')) {
    return `### Explicación CTEV: La Segunda Ley de Newton y las EDO de 2° Orden\n\n` +
      `1. **Principio Físico Fundamental:** Por definición de cinemática, la aceleración es la segunda derivada de la posición con respecto al tiempo: a(t) = d²x/dt².\n\n` +
      `2. **Sumatoria de Fuerzas:** Al aplicar ΣF = m · a sobre una masa conectada a un resorte elástico (fuerza restitutiva de Hooke -kx), inmersa en un medio con fricción viscosa (fuerza amortiguadora -c dx/dt) y sujeta a una fuerza de excitación externa F(t), se obtiene:\n` +
      `m (d²x/dt²) = -kx - c(dx/dt) + F(t)\n\n` +
      `3. **Forma Canónica Estándar:** Al reordenar los términos obtenemos la EDO lineal de segundo orden:\n` +
      `m (d²x/dt²) + c (dx/dt) + k x = F(t)\n\n` +
      `Por tanto, cualquier sistema físico regido por leyes dinámicas newtonianas donde la aceleración dependa de la posición y la velocidad conduce de forma natural e inevitable a una EDO de segundo orden.`;
  }

  if (q.includes('factor integrante') || q.includes('lineal') || q.includes('mu(x)') || q.includes('μ')) {
    return `### Deducción del Factor Integrante para Ecuaciones Lineales de 1er Orden (CTEV)\n\n` +
      `Dada la forma estándar canónica:\n` +
      `dy/dx + P(x)y = Q(x)\n\n` +
      `Buscamos una función multiplicadora μ(x) tal que al multiplicar toda la ecuación, el lado izquierdo se convierta en la derivada del producto d/dx [μ(x) y]:\n` +
      `μ(x) dy/dx + μ(x) P(x) y = d/dx [μ(x) y]\n\n` +
      `Por regla del producto:\n` +
      `d/dx [μ(x) y] = μ(x) dy/dx + μ'(x) y\n\n` +
      `Igualando coeficientes:\n` +
      `μ'(x) y = μ(x) P(x) y => dμ/dx = μ P(x) => dμ/μ = P(x) dx\n\n` +
      `Integrando ambos lados:\n` +
      `ln|μ(x)| = ∫ P(x) dx => μ(x) = exp(∫ P(x) dx)\n\n` +
      `Integrando luego ambos miembros con respecto a x se obtiene la solución general:\n` +
      `y(x) = [1 / μ(x)] · [ ∫ μ(x) Q(x) dx + C ]`;
  }

  if (q.includes('exacta') || q.includes('euler') || q.includes('potencial')) {
    return `### Criterio de Exactitud y Solución (Módulo 2 CTEV)\n\n` +
      `Una ecuación diferencial en forma de diferencial total:\n` +
      `M(x,y) dx + N(x,y) dy = 0\n\n` +
      `es **exacta** si el lado izquierdo es la diferencial total de una función de dos variables F(x,y) tal que dF = 0, lo que implica que la solución es de la forma F(x,y) = C.\n\n` +
      `1. **Criterio de Euler (Derivadas cruzadas):** Por el teorema de igualdad de derivadas parciales:\n` +
      `∂M/∂y = ∂²F/(∂y ∂x) = ∂²F/(∂x ∂y) = ∂N/∂x\n` +
      `Por lo tanto, la ecuación es exacta si y solo si ∂M/∂y = ∂N/∂x.\n\n` +
      `2. **Cálculo de la Función Potencial F(x,y):**\n` +
      `• Se integra M(x,y) respecto a x: F(x,y) = ∫ M(x,y) dx + g(y).\n` +
      `• Se deriva respecto a y e iguala a N(x,y): ∂/∂y [∫ M dx] + g'(y) = N(x,y).\n` +
      `• Se despeja g'(y) y se integra para hallar g(y).\n\n` +
      `3. **Factor de Integración:** Si My ≠ Nx, si (My - Nx)/N depende solo de x, entonces μ(x) = exp(∫ [(My - Nx)/N] dx).`;
  }

  if (q.includes('resonancia')) {
    return `### Fenómeno de Resonancia Mecánica (Módulo 3 CTEV)\n\n` +
      `En un sistema oscilatorio forzado sin amortiguamiento (c = 0):\n` +
      `m x'' + k x = F0 cos(ω t)\n\n` +
      `1. La frecuencia angular natural libre es ω0 = √(k/m).\n` +
      `2. Si la frecuencia de excitación externa ω coincide exactamente con ω0 (ω = ω0), la solución particular toma la forma resonante pura:\n` +
      `xp(t) = [F0 / (2 m ω0)] · t · sin(ω0 t)\n\n` +
      `3. El término multiplicador 't' hace que la amplitud crezca linealmente hasta infinito, provocando fatiga y colapso de las tuberías y anclajes.\n\n` +
      `**En presencia de amortiguamiento (c > 0):**\n` +
      `La amplitud permanece acotada. En la estación de bombeo de Cartagena, ω0 = 6.325 rad/s y la bomba rota a ω = 8.0 rad/s, asegurando un margen del 26.5% libre de peligro por resonancia.`;
  }

  if (q.includes('general') || q.includes('particular') || q.includes('singular')) {
    return `### Tipos de Soluciones de una EDO (Módulo 1 CTEV)\n\n` +
      `1. **Solución General:** Familia de curvas que contiene n constantes arbitrarias independientes (siendo n el orden de la ecuación) y satisface la ED en un intervalo I.\n` +
      `   * Ejemplo: Para dy/dx = 2x, la solución general es y(x) = x² + C.\n\n` +
      `2. **Solución Particular:** Cualquier solución individual que se obtiene fijando valores numéricos específicos a las constantes arbitrarias a partir de condiciones iniciales (PVI).\n` +
      `   * Ejemplo: Con y(0) = 5, se deduce C = 5, obteniéndose la solución particular y(x) = x² + 5.\n\n` +
      `3. **Solución Singular:** Una solución que no puede obtenerse asignando ningún valor numérico a las constantes de la familia general, correspondiendo usualmente a curvas envolventes de las trayectorias integrales.`;
  }

  return `### Análisis Pedagógico CTEV Universidad de Cartagena\n\n` +
    `Para responder a tu consulta sobre "${query}":\n\n` +
    `1. **Identificación y Clasificación:** Se evalúa si es una EDO (una sola variable) o EDP, su orden (derivada mayor) y si es lineal en la variable dependiente y sus derivadas.\n` +
    `2. **Estrategia Metodológica recomendada por la cátedra:**\n` +
    `   • Primer orden: Probar primero variables separables; si no, verificar linealidad para aplicar el factor integrante μ(x) = exp(∫ P dx); o comprobar exactitud ∂M/∂y = ∂N/∂x.\n` +
    `   • Segundo orden: Resolver la ecuación auxiliar a r² + b r + c = 0, clasificar por el discriminante Δ = b² - 4ac (Subamortiguado Δ < 0, Crítico Δ = 0, Sobreamortiguado Δ > 0) y hallar la particular por coeficientes indeterminados.\n` +
    `3. **Validación:** Puedes comprobar los parámetros y observar la gráfica animada en el Simulador TUI del programa.`;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `¡Hola Miguel Andrés! Soy tu Tutor Académico de Ecuaciones Diferenciales en el CTEV de la Universidad de Cartagena.
      
Estoy preparado para ayudarte a resolver cualquier ecuación diferencial paso a paso, explicarte las deducciones de las Unidades 1, 2 y 3, verificar cálculos de amortiguamiento y resonancia, o resolver dudas para tu Trabajo Final.

¿En qué tema o problema deseas profundizar hoy?`
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Intentar llamar al backend proxy de Gemini
      const response = await fetch('/api/gemini/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text || getLocalCtevAnswer(query) }]);
      } else {
        // 2. Si estamos en GitHub Pages (servidor estático sin API), responder con el motor pedagógico local
        const localAnswer = getLocalCtevAnswer(query);
        setMessages((prev) => [...prev, { role: 'assistant', content: localAnswer }]);
      }
    } catch {
      // Fallback local garantizado para GitHub Pages
      const localAnswer = getLocalCtevAnswer(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: localAnswer }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs font-mono p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl h-[85vh] bg-[#1d2021] border-2 border-[#fe8019] shadow-2xl rounded-sm flex flex-col text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#282828] border-b border-[#3c3836]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#fe8019]" />
            <div>
              <span className="text-[#fbf1c7] font-bold">
                Tutor Inteligente de Ecuaciones Diferenciales · CTEV UdeC
              </span>
              <span className="text-[10px] text-[#a89984] block">
                Asesoría pedagógica paso a paso para las Unidades 1, 2 y 3 (Compatible con GitHub Pages)
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#a89984] hover:text-[#fb4934] transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="px-3 py-2 bg-[#282828]/60 border-b border-[#3c3836] overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] text-[#fabd2f] font-bold shrink-0">Consultas Rápidas:</span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] text-[#ebdbb2] bg-[#1d2021] hover:bg-[#3c3836] hover:text-[#fabd2f] border border-[#3c3836] px-2.5 py-1 rounded-xs shrink-0 transition-colors truncate max-w-[260px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1d2021]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[10px] text-[#7c6f64] mb-1 flex items-center gap-1 font-bold">
                {msg.role === 'user' ? 'Miguel Andrés (Estudiante CTEV)' : 'Profesor Tutor CTEV (Motor Académico)'}
              </div>
              <div
                className={`p-3 rounded-xs max-w-[90%] leading-relaxed text-xs whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-[#3c3836] text-[#fbf1c7] border border-[#504945]'
                    : 'bg-[#282828] text-[#ebdbb2] border border-[#3c3836]'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#fabd2f] bg-[#282828] p-3 rounded-xs border border-[#3c3836] w-fit">
              <Loader2 size={14} className="animate-spin text-[#fabd2f]" />
              <span>El tutor está resolviendo con pasos matemáticos detallados...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#282828] border-t border-[#3c3836] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre la Unidad 1, 2 o 3, o escribe una ecuación diferencial..."
            className="flex-1 bg-[#1d2021] text-[#fbf1c7] px-3 py-2 rounded-xs border border-[#504945] focus:border-[#fabd2f] outline-none text-xs font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#fe8019] text-[#282828] hover:bg-[#fabd2f] disabled:opacity-50 font-bold text-xs rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send size={13} />
            <span>Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
