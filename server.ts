import express from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint to resolve or explain differential equations with CTEV pedagogy
app.post('/api/gemini/solve', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'El enunciado es requerido' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `Eres el Asistente Académico y Tutor Titular de la cátedra de Ecuaciones Diferenciales de la Universidad de Cartagena (Centro de Tecnologías para la Educación Virtual - CTEV).
Tu rol es resolver y explicar problemáticas de Ecuaciones Diferenciales para el Trabajo Final de los 3 módulos:
- Unidad 1: Definición, clasificación (EDO/EDP, orden, linealidad) y modelos matemáticos (decaimiento, enfriamiento, caída libre).
- Unidad 2: Métodos de 1er orden (variables separables, lineales con factor integrante e^(∫P dx), exactas M dx + N dy = 0, factores de integración).
- Unidad 3: ED lineales de orden superior (2da ley de Newton, osciladores armónicos masa-resorte amortiguados/forzados, ecuación auxiliar/característica, Wronskiano, soluciones generales).

Responde siempre en español con estructura limpia, paso a paso, rigor analítico e interpretaciones físicas aplicadas a la ingeniería.`,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error en Gemini:', error);
    res.status(500).json({ error: error?.message || 'Error en el servidor de IA' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    // In AI Studio and Cloud Run environments, HMR WebSockets are disabled.
    process.env.DISABLE_HMR = 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor activo en http://0.0.0.0:${PORT}`);
  });
}

startServer();
