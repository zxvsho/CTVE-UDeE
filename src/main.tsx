import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Captured in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] p-6 font-mono flex items-center justify-center">
          <div className="max-w-xl w-full bg-[#282828] border-2 border-[#fb4934] p-6 rounded-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#3c3836] pb-3">
              <span className="text-[#fb4934] font-bold text-sm">
                [!] Error de Renderizado en Ratatui TUI
              </span>
              <span className="text-xs text-[#a89984]">CTEV UdeC</span>
            </div>

            <p className="text-xs text-[#ebdbb2]">
              Ocurrió una excepción al procesar la interfaz. Puedes reiniciar el estado o recargar la página:
            </p>

            <pre className="p-3 bg-[#1d2021] border border-[#504945] text-[#fabd2f] text-[11px] overflow-x-auto rounded-xs">
              {this.state.error?.message || 'Error desconocido'}
            </pre>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#fabd2f] text-[#282828] font-bold text-xs rounded-xs hover:bg-[#d5c4a1] transition-colors cursor-pointer"
              >
                Recargar Aplicación
              </button>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-[#3c3836] text-[#ebdbb2] font-semibold text-xs rounded-xs hover:bg-[#504945] transition-colors cursor-pointer"
              >
                Reintentar Renderizado
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
