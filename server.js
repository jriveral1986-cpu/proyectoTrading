import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { buildPrompt } from './config/promptTemplate.js';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public'), { etag: false, lastModified: false, setHeaders: (res) => res.setHeader('Cache-Control', 'no-store') }));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.post('/api/analyze', async (req, res) => {
  try {
    const {
      activo = '',
      temporalidad = '',
      sesion = '',
      volatilidad = '',
      noticias = '',
      rsi = '',
      macd = '',
      ema = ''
    } = req.body;

    const systemPrompt = `Eres un trader profesional especializado en TradingView, Order Flow, oferta y demanda, lectura de liquidez y contexto institucional.

Tu análisis debe ser profundo, detallado y profesional. Sigue estrictamente el flujo de análisis de 12 pasos sin desviaciones.

IMPORTANTE:
- Nunca inventar datos. Si faltan datos de footprint, delta o tape, indicarlo explícitamente.
- Priorizar siempre oferta, demanda, liquidez y order flow sobre indicadores.
- Cada sigla debe ir acompañada de su significado en inglés y en español.
- Responder como trader profesional, no como analista genérico.`;

    const userPrompt = buildPrompt({
      activo,
      temporalidad,
      sesion,
      volatilidad,
      noticias,
      rsi,
      macd,
      ema
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await client.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        const text = chunk.delta.text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error en análisis:', error);
    res.status(500).json({
      error: error.message || 'Error procesando análisis'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Trading Analysis Webapp en http://localhost:${PORT}`);
  console.log('Esperando análisis...');
});
