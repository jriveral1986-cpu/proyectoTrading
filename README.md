# Trading Analysis Pro

Webapp profesional de análisis de trading que implementa un análisis especializado en **Order Flow**, **Oferta/Demanda**, **Liquidez** y **Market Structure**.

## Características

✅ Análisis profesional de trading en 12 pasos  
✅ Soporte para múltiples activos (Forex, Criptomonedas, Acciones)  
✅ Análisis en tiempo real con streaming  
✅ Historial de análisis persistente  
✅ Interfaz responsive (mobile, tablet, desktop)  
✅ Tema oscuro/claro  
✅ Indicadores técnicos integrados (RSI, MACD, EMA)  

## Stack Tecnológico

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **API**: Claude 3.5 Sonnet con Anthropic SDK
- **Streaming**: Server-Sent Events (SSE)
- **Persistencia**: localStorage

## Instalación

### Requisitos previos

- Node.js 16+ instalado
- API key de Anthropic Claude ([obtener aquí](https://console.anthropic.com))

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd proyectoTrading
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env y agregar tu ANTHROPIC_API_KEY
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   # o en desarrollo con auto-reload
   npm run dev
   ```

5. **Acceder a la aplicación**
   ```
   Abre http://localhost:3000 en tu navegador
   ```

## Uso

1. **Ingresa los parámetros del análisis**:
   - Activo (ej: EURUSD, BTCUSD)
   - Temporalidad (M1, M5, H1, D1, etc.)
   - Sesión de trading (Londres, Nueva York, Tokio)
   - Volatilidad (%)
   - Noticias/eventos relevantes
   - Indicadores técnicos (opcional)

2. **Presiona "Analizar Mercado"**

3. **Recibe análisis en tiempo real** siguiendo la metodología profesional:
   - Contexto general
   - Estructura del mercado (HH, HL, LH, LL, BOS, CHOCH)
   - Análisis de oferta/demanda
   - Order Flow (compradores vs vendedores)
   - Liquidez y barridos
   - Price Action
   - Indicadores técnicos (solo validación)
   - Bias operativo (alcista/bajista/neutral)
   - Escenarios operativos
   - Setup operativo detallado
   - Gestión de riesgo
   - Conclusión final

4. **Guarda análisis** en el historial para consultarlos después

## Estructura de carpetas

```
proyectoTrading/
├── server.js                 # Servidor Express principal
├── config/
│   └── promptTemplate.js     # Template del prompt profesional
├── public/
│   ├── index.html           # Interfaz principal
│   ├── css/
│   │   ├── main.css         # Estilos principales
│   │   └── responsive.css   # Estilos responsive
│   └── js/
│       ├── app.js           # Lógica principal
│       ├── api.js           # Cliente de API
│       └── utils.js         # Funciones auxiliares
├── .env.example             # Template de variables de entorno
├── package.json             # Dependencias
└── README.md               # Este archivo
```

## API Endpoints

### POST /api/analyze

Realiza un análisis de trading completo.

**Parámetros (JSON)**:
```json
{
  "activo": "EURUSD",
  "temporalidad": "H1",
  "sesion": "Londres",
  "volatilidad": "85",
  "noticias": "FOMC hoy 14:00",
  "rsi": "65",
  "macd": "Alcista",
  "ema": "Alineadas alcistas"
}
```

**Respuesta**: Stream de eventos SSE con fragmentos del análisis

## Variables de entorno

```env
ANTHROPIC_API_KEY      # Tu API key de Anthropic (requerido)
PORT                   # Puerto del servidor (default: 3000)
NODE_ENV              # Entorno: development o production
```

## Notas importantes

- El análisis se genera usando Claude 3.5 Sonnet
- Se prioriza Order Flow y Oferta/Demanda sobre indicadores técnicos
- Los análisis se guardan en localStorage (últimos 20)
- No se inventan datos - se indica claramente cuando faltan datos de footprint/delta/tape
- Cada sigla técnica incluye significado en inglés y español

## Reglas de negocio

Ver [ReglasNegocio.md](./ReglasNegocio.md) para las directrices completas de la aplicación.

## Revisiones

Ver [Revisiones.md](./Revisiones.md) para el historial de cambios y correcciones.

## Desarrollo

### Scripts disponibles

```bash
npm start        # Iniciar servidor en producción
npm run dev      # Iniciar servidor en desarrollo con auto-reload
```

### Dependencias principales

- `express`: Framework web
- `cors`: Middleware para CORS
- `dotenv`: Manejo de variables de entorno
- `@anthropic-ai/sdk`: SDK oficial de Anthropic

## Licencia

Este proyecto es de código abierto.

## Soporte

Para reportar bugs o sugerencias, crea un issue en el repositorio.

---

**Trading Analysis Pro v1.0** | Análisis profesional con IA basado en Order Flow y Market Structure