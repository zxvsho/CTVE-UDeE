import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, BookOpen, Calculator, AlertCircle } from 'lucide-react';
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

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `¡Hola Miguel Andrés! Soy tu Tutor Académico de Ecuaciones Diferenciales en el CTEV de la Universidad de Cartagena.
      
Puedo ayudarte a resolver cualquier ecuación diferencial paso a paso, explicarte la deducción de fórmulas de las Unidades 1, 2 y 3, verificar cálculos de amortiguamiento y resonancia, o resolver dudas para tu Trabajo Final.

¿En qué tema o problema deseas profundizar hoy?`
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al conectar con el tutor de IA');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.text || 'Sin respuesta generada.' }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error en la comunicación con el tutor.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ No fue posible procesar la consulta en este momento. Revisa la conexión o intenta con otra formulación matemática.'
        }
      ]);
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
                Asesoría pedagógica paso a paso con Gemini AI para las Unidades 1, 2 y 3
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
                {msg.role === 'user' ? 'Miguel Andrés (Estudiante CTEV)' : 'Profesor Tutor CTEV (Gemini)'}
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

          {error && (
            <div className="flex items-center gap-2 text-xs text-[#fb4934] bg-[#282828] p-3 rounded-xs border border-[#fb4934]/40">
              <AlertCircle size={14} />
              <span>{error}</span>
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
            placeholder="Pregunta sobre la Unidad 1, 2 o 3, o ingresa una ED para resolver..."
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
