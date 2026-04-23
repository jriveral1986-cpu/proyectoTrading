// Cliente API para interacción con el servidor

import { Utils } from './utils.js';

export const API = {
  baseURL: '',

  // Realizar análisis con streaming
  analyzeMarket: async (formData, onChunk, onError, onComplete) => {
    try {
      const response = await fetch(`${API.baseURL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const read = async () => {
        try {
          const { done, value } = await reader.read();

          if (done) {
            if (buffer.trim()) {
              try {
                const data = JSON.parse(buffer.trim());
                if (data.text) {
                  onChunk(data.text);
                }
              } catch (e) {
                // Ignorar líneas inválidas al final
              }
            }
            onComplete?.();
            return;
          }

          buffer += decoder.decode(value, { stream: true });

          // Procesar líneas completas
          const lines = buffer.split('\n');
          buffer = lines[lines.length - 1]; // Mantener línea incompleta

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();

            if (line === '[DONE]') {
              onComplete?.();
              return;
            }

            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              if (jsonStr && jsonStr !== '[DONE]') {
                try {
                  const data = JSON.parse(jsonStr);
                  if (data.text) {
                    onChunk(data.text);
                  }
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                }
              }
            }
          }

          // Continuar leyendo
          await read();
        } catch (error) {
          if (error.name !== 'AbortError') {
            onError?.(error);
          }
        }
      };

      await read();
    } catch (error) {
      console.error('Error en análisis:', error);
      onError?.(error);
    }
  },

  // Validar conexión con servidor
  healthCheck: async () => {
    try {
      const response = await fetch(`${API.baseURL}/`, {
        method: 'HEAD'
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};
