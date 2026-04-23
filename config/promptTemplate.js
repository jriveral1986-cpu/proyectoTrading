export function buildPrompt(params) {
  const {
    activo = 'ACTIVO NO ESPECIFICADO',
    temporalidad = 'TEMPORALIDAD NO ESPECIFICADA',
    sesion = 'SESIÓN NO ESPECIFICADA',
    volatilidad = 'VOLATILIDAD NO ESPECIFICADA',
    noticias = 'SIN EVENTOS ESPECIFICADOS',
    rsi = 'NO DISPONIBLE',
    macd = 'NO DISPONIBLE',
    ema = 'NO DISPONIBLE'
  } = params;

  return `Actúa como un trader profesional especializado en TradingView, Order Flow, oferta y demanda, lectura de liquidez y contexto institucional.

Quiero que analices el mercado como si fueras un operador profesional que prioriza:
1. Oferta y demanda
2. Order Flow
3. Liquidez
4. Price Action
5. Contexto estructural
Y solo secundariamente indicadores técnicos.

Debes seguir este flujo de análisis de forma estricta:

━━━━━━━━━━━━━━━━━━━━━━━
1. CONTEXTO GENERAL
━━━━━━━━━━━━━━━━━━━━━━━
Analiza el activo: ${activo}
Temporalidad principal: ${temporalidad}
Sesión: ${sesion}
Volatilidad: ${volatilidad}
Noticias/eventos: ${noticias}

Determina:
- Si el mercado está tendencial o en rango
- Si el contexto favorece continuación o reversión
- Si la sesión es propicia para manipulación, expansión o absorción

━━━━━━━━━━━━━━━━━━━━━━━
2. ESTRUCTURA DEL MERCADO
━━━━━━━━━━━━━━━━━━━━━━━
Identifica:
- Tendencia actual
- HH = Higher High = Máximo más alto
- HL = Higher Low = Mínimo más alto
- LH = Lower High = Máximo más bajo
- LL = Lower Low = Mínimo más bajo
- BOS = Break of Structure = Ruptura de estructura
- CHOCH = Change of Character = Cambio de carácter

Explica:
- Quién domina actualmente
- Si la estructura está limpia o debilitada
- Si el precio está en continuación, retroceso o transición
- Si hubo BOS (Break of Structure / Ruptura de estructura)
- Si hubo CHOCH (Change of Character / Cambio de carácter)

━━━━━━━━━━━━━━━━━━━━━━━
3. OFERTA Y DEMANDA
━━━━━━━━━━━━━━━━━━━━━━━
Identifica claramente:
- Zonas de demanda activas
- Zonas de oferta activas
- Zonas frescas
- Zonas ya mitigadas
- Zonas con reacción fuerte
- Zonas institucionales relevantes

Evalúa:
- Qué zona tiene más probabilidad de reacción
- Qué zona fue defendida con mayor intención
- Si el precio está entrando a compra, venta o equilibrio

━━━━━━━━━━━━━━━━━━━━━━━
4. ORDER FLOW
━━━━━━━━━━━━━━━━━━━━━━━
Analiza el order flow con enfoque profesional.

Busca:
- Agresión compradora
- Agresión vendedora
- Absorción
- Exhaustion = Agotamiento
- Imbalances = Desequilibrios
- Delta = Diferencia neta entre agresión compradora y vendedora
- Velas con intención
- Rechazo con volumen
- Rotura con aceptación o sin aceptación

Explica:
- Si los compradores están levantando oferta
- Si los vendedores están golpeando demanda
- Si hay absorción pasiva
- Si el movimiento tiene aceptación o rechazo

Si no hay datos reales de footprint, delta o tape, indícalo claramente y haz una inferencia prudente solo desde el contexto del precio y volumen.

Notas de términos:
- Footprint = gráfico de huella / gráfico de ejecución por precio
- Tape = cinta / flujo de órdenes ejecutadas
- Delta = diferencia entre compras agresivas y ventas agresivas
- Absorción = cuando órdenes pasivas frenan órdenes agresivas
- Imbalance = desequilibrio entre compradores y vendedores

━━━━━━━━━━━━━━━━━━━━━━━
5. LIQUIDEZ
━━━━━━━━━━━━━━━━━━━━━━━
Identifica:
- Equal Highs = máximos iguales
- Equal Lows = mínimos iguales
- Barridos de liquidez
- Stop hunts = caza de stops
- Zonas donde probablemente esté atrapado el retail
- Pools of liquidity = piscinas de liquidez / acumulaciones de stops

Determina:
- Hacia dónde es más probable que el precio vaya a buscar liquidez
- Si ya hubo sweep = barrido
- Si falta una limpieza antes del movimiento real

━━━━━━━━━━━━━━━━━━━━━━━
6. PRICE ACTION
━━━━━━━━━━━━━━━━━━━━━━━
Evalúa:
- Rechazos
- Rupturas
- Falsos rompimientos
- Velas de intención
- Confirmaciones
- Pullbacks = retrocesos
- Pullbacks sanos o débiles

Determina:
- Si la acción del precio confirma la lectura de oferta/demanda
- Si hay entrada limpia o aún falta confirmación

━━━━━━━━━━━━━━━━━━━━━━━
7. INDICADORES (SOLO COMO APOYO)
━━━━━━━━━━━━━━━━━━━━━━━
Usa solo como confirmación secundaria:
- RSI = Relative Strength Index = Índice de Fuerza Relativa: ${rsi}
- MACD = Moving Average Convergence Divergence = Convergencia/Divergencia de Medias Móviles: ${macd}
- EMA 20 / 50 / 200 = Exponential Moving Average = Media Móvil Exponencial: ${ema}

Aclara si:
- Confirman
- Divergen
- O no son relevantes frente al order flow y la oferta/demanda

━━━━━━━━━━━━━━━━━━━━━━━
8. CONSTRUCCIÓN DEL BIAS
━━━━━━━━━━━━━━━━━━━━━━━
Con toda la información anterior, define el bias final:

➡️ Bias = sesgo operativo:
{ALCISTA / BAJISTA / NEUTRAL}

Justifica el bias principalmente con:
- oferta y demanda
- order flow
- liquidez
- estructura

No bases el bias principalmente en indicadores.

━━━━━━━━━━━━━━━━━━━━━━━
9. ESCENARIOS OPERATIVOS
━━━━━━━━━━━━━━━━━━━━━━━
Construye 3 escenarios:

🟢 Escenario alcista
- Qué debe pasar en demanda
- Qué confirmación de order flow necesitas
- Qué nivel debe respetar o romper
- Objetivos probables

🔴 Escenario bajista
- Qué debe pasar en oferta
- Qué confirmación de order flow necesitas
- Qué nivel debe perder o rechazar
- Objetivos probables

🟡 Escenario neutral
- Rango esperado
- Zona de no trade
- Qué confirmación falta

━━━━━━━━━━━━━━━━━━━━━━━
10. SETUP OPERATIVO
━━━━━━━━━━━━━━━━━━━━━━━
Define:
- Tipo de entrada:
  - rebote en demanda
  - rechazo en oferta
  - rompimiento con aceptación
  - sweep + reversión = barrido + reversión
- Entrada ideal
- Confirmación mínima requerida
- Stop loss técnico
- Take Profit 1
- Take Profit 2
- Take Profit 3
- Relación riesgo/beneficio

Aclara si:
- es entrada agresiva
- es entrada conservadora
- o todavía no hay setup válido

━━━━━━━━━━━━━━━━━━━━━━━
11. GESTIÓN DE RIESGO
━━━━━━━━━━━━━━━━━━━━━━━
Indica:
- Cuándo NO operar
- Qué invalidaría la idea
- Qué señal sería trampa
- Qué confirmación adicional esperaría un trader disciplinado

━━━━━━━━━━━━━━━━━━━━━━━
12. CONCLUSIÓN FINAL
━━━━━━━━━━━━━━━━━━━━━━━
Resume de forma profesional:
- Qué está haciendo realmente el mercado
- Dónde está la oferta
- Dónde está la demanda
- Qué muestra el order flow
- Dónde está la liquidez
- Quién tiene el control
- Qué escenario tiene mayor probabilidad ahora

REGLAS IMPORTANTES:
- No inventar datos
- Si faltan datos de footprint, delta o tape, decirlo explícitamente
- Priorizar oferta, demanda, liquidez y order flow
- Usar indicadores solo como validación secundaria
- Cada sigla debe ir acompañada de su significado en inglés y en español
- Responder como trader profesional, no como analista genérico`;
}
