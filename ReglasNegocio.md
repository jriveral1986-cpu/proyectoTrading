# Reglas de Negocio - Trading Analysis Pro

Documento que define las directrices y reglas que rigen el desarrollo y operación de la webapp Trading Analysis Pro.

## 1. Reglas de Desarrollo

### 1.1 Control de Cambios
- **Cada cambio debe ser levantado nuevamente** - Tras completar una modificación, se debe reiniciar el servidor para verificar que funciona correctamente
- **Validar cambios previos** - Antes de hacer un nuevo cambio, verificar en `Revisiones.md` que no se haya hecho antes
- **Registrar todas las revisiones** - Cada cambio, corrección o mejora debe estar documentado en `Revisiones.md` con:
  - Qué se cambió
  - Cuándo se cambió (fecha)
  - Razón del cambio
  - Archivos afectados

### 1.2 Interfaz de Usuario

#### Directrices UI/UX (skill `ui-ux-pro-max`)
- Aplicar las directrices del skill `ui-ux-pro-max` en todos los cambios de UI
- Mantener consistencia visual en toda la aplicación
- Priorizar usabilidad y accesibilidad

#### Touch Targets Mínimos
- **Todos los elementos interactivos deben tener mínimo 44×44 píxeles**
- Incluye: botones, selectores, inputs de radio/checkbox, áreas clickeables
- Esto asegura compatibilidad con dispositivos móviles y toque

#### Animaciones
- **Duración**: entre 150–300ms
- **Curva de animación**: `ease-in-out` para movimientos suaves
- **Respetar preferencias del usuario**: Implementar `prefers-reduced-motion` para usuarios que prefieran animaciones mínimas

#### Iconografía
- **PROHIBIDO**: No usar emojis como iconos de UI
- **REQUERIDO**: Usar SVG (Heroicons, Lucide, o iconos inline) para todos los iconos
- Los emojis solo se pueden usar en contenido textual de análisis, no en la interfaz

#### Diseño Responsive
- **Mobile-first**: Diseñar primero para móvil, luego escalar a desktop
- **Breakpoints estándar**:
  - 375px (móvil pequeño)
  - 768px (tablet)
  - 1024px (laptop)
  - 1440px (desktop grande)
- Todos los componentes deben funcionar en estos breakpoints

### 1.3 Análisis de Trading

#### Metodología
- Seguir **estrictamente** el flujo de 12 pasos del prompt profesional
- No agregar, quitar o reordenar pasos
- Priorización: Order Flow → Oferta/Demanda → Liquidez → Price Action → Indicadores
- Los indicadores técnicos son **solo validación secundaria**, nunca fundamento principal

#### Precisión de datos
- **No inventar datos**: Si no hay datos de footprint, delta o tape, indicarlo explícitamente
- **Transparencia**: Aclarar siempre qué datos son reales vs inferencias
- **Siglas con definición**: Cada sigla técnica debe incluir significado en inglés y español

#### Sesiones de Trading
- Tokio: 22:00-06:00 GMT
- Londres: 08:00-16:00 GMT
- Nueva York: 13:00-21:00 GMT
- Sídney: 21:00-05:00 GMT
- Solapamientos y pre-mercado disponibles

### 1.4 Persistencia y Almacenamiento

#### Historial de Análisis
- **Máximo**: últimos 20 análisis
- **Almacenamiento**: localStorage del navegador
- **Información guardada**: activo, temporalidad, sesión, volatilidad, análisis completo, timestamp
- **Recuperación**: Usuario puede cargar análisis previos

#### Variables de Entorno
- `ANTHROPIC_API_KEY`: Requerida, nunca en código
- `PORT`: Default 3000
- `NODE_ENV`: development o production
- Usar `.env.example` como template

## 2. Reglas Técnicas

### 2.1 Frontend
- **Framework**: Vanilla JavaScript (sin React, Vue, etc.)
- **Streaming**: Server-Sent Events (SSE)
- **Seguridad**: XSS prevention, validación de inputs, sanitización

### 2.2 Backend
- **Framework**: Node.js + Express.js
- **API**: Anthropic SDK oficial
- **Modelo**: Claude 3.5 Sonnet
- **Streaming**: Implementar correctamente para usuarios

### 2.3 Compatibilidad
- Navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Dispositivos móviles (iOS 12+, Android 8+)
- Accesibilidad: WCAG 2.1 Level AA

## 3. Reglas de Contenido

### 3.1 Análisis de Mercado
- Contexto: Activo, temporalidad, sesión, volatilidad, noticias
- Estructura: HH, HL, LH, LL, BOS, CHOCH
- Oferta/Demanda: Zonas identificadas y evaluación
- Order Flow: Agresión compradora/vendedora, absorción, desequilibrios
- Liquidez: Barridos, stop hunts, pools de liquidez
- Price Action: Rechazos, rupturas, pullbacks, confirmaciones
- Indicadores: RSI, MACD, EMA (solo como validación)
- Bias: ALCISTA / BAJISTA / NEUTRAL
- Escenarios: 3 escenarios operativos completos
- Setup: Entrada, stop, targets, relación R/R
- Riesgo: Qué invalidaría la idea
- Conclusión: Resumen profesional

### 3.2 Validación
- Verificar siempre que los 12 pasos se generan
- Checklist: ¿Todos los pasos presentes?
- ¿Análisis coherente y profesional?

## 4. Reglas de Documentación

### 4.1 ReglasNegocio.md
- Actualizar cada vez que se agregue una regla nueva
- Incluir: qué es, por qué importa, cómo se implementa
- Mantener estructura clara y navegable

### 4.2 Revisiones.md
- **Obligatorio**: Documentar cada cambio
- Formato: Fecha | Archivo(s) | Qué cambió | Por qué | Estado
- Validar antes de hacer cambios: ¿Este cambio ya se hizo?

### 4.3 Código
- Sin comentarios innecesarios
- Comentarios solo para lógica compleja o no obvio
- Nombres claros y descriptivos
- No dejar código muerto

## 5. Reglas de Seguridad

### 5.1 API Key
- Nunca incluir en archivos públicos
- Usar `.env` o variables de entorno
- Validación en backend

### 5.2 Datos del Usuario
- localStorage solo para análisis (no datos sensibles)
- No registrar API calls con datos del usuario
- HTTPS en producción

### 5.3 Entrada de Usuario
- Validar en cliente Y servidor
- Sanitizar para prevenir XSS
- Limitar longitud de inputs

## 6. Checklist Pre-Deployment

- [ ] Todas las reglas de UI aplicadas
- [ ] Touch targets 44×44px
- [ ] Animaciones 150-300ms, ease-in-out
- [ ] prefers-reduced-motion implementado
- [ ] Sin emojis como iconos (solo SVG)
- [ ] Mobile-first design validado
- [ ] Revisiones.md actualizado
- [ ] Todos los 12 pasos de análisis presentes
- [ ] API key en variables de entorno
- [ ] Tests pasando (si aplica)
- [ ] Rendimiento optimizado
- [ ] Accesibilidad validada

---

**Versión 1.0** | Actualizado: 2026-04-23
