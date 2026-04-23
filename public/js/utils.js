// Utilidades y funciones auxiliares

export const Utils = {
  // Formatear fecha
  formatDate: (date = new Date()) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  },

  // Obtener hora legible
  getTimeAgo: (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'hace unos segundos';
    if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
    return this.formatDate(new Date(timestamp));
  },

  // Validar formulario
  validateForm: (formData) => {
    const errors = [];

    if (!formData.activo || formData.activo.trim() === '') {
      errors.push('El activo es requerido');
    }

    if (!formData.temporalidad || formData.temporalidad === '') {
      errors.push('La temporalidad es requerida');
    }

    if (!formData.sesion || formData.sesion === '') {
      errors.push('La sesión es requerida');
    }

    if (!formData.volatilidad || formData.volatilidad === '' || isNaN(formData.volatilidad)) {
      errors.push('La volatilidad debe ser un número válido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Copiar al portapapeles
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Error al copiar:', err);
      return false;
    }
  },

  // Mostrar notificación
  showNotification: (message, type = 'info', duration = 3000) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#00c896' : type === 'error' ? '#ff4757' : '#0084ff'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  },

  // Formatear objeto de análisis para guardar
  formatAnalysisForStorage: (formData, analysis) => {
    return {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      activo: formData.activo,
      temporalidad: formData.temporalidad,
      sesion: formData.sesion,
      volatilidad: formData.volatilidad,
      analysis: analysis,
      formData: formData
    };
  },

  // Obtener historial del localStorage
  getHistory: () => {
    try {
      const history = localStorage.getItem('tradingAnalysisHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error obteniendo historial:', error);
      return [];
    }
  },

  // Guardar al localStorage
  saveToHistory: (analysisData) => {
    try {
      const history = this.getHistory();
      history.unshift(analysisData);
      // Limitar a últimos 20 análisis
      if (history.length > 20) {
        history.pop();
      }
      localStorage.setItem('tradingAnalysisHistory', JSON.stringify(history));
      return true;
    } catch (error) {
      console.error('Error guardando historial:', error);
      return false;
    }
  },

  // Limpiar historial
  clearHistory: () => {
    try {
      localStorage.removeItem('tradingAnalysisHistory');
      return true;
    } catch (error) {
      console.error('Error limpiando historial:', error);
      return false;
    }
  },

  // Obtener tema
  getTheme: () => {
    return localStorage.getItem('theme') || 'dark';
  },

  // Guardar tema
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.body.className = theme === 'light' ? 'light-mode' : '';
  },

  // Inicializar tema
  initTheme: () => {
    const theme = this.getTheme();
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    }
  },

  // Crear elemento con seguridad (XSS prevention)
  createSafeElement: (tag, content = '', attributes = {}) => {
    const element = document.createElement(tag);

    // Establecer contenido de texto (no HTML)
    if (content) {
      element.textContent = content;
    }

    // Establecer atributos
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  },

  // Debounce para búsquedas/inputs
  debounce: (func, delay = 300) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};

// Crear estilos de animación si no existen
if (!document.querySelector('style[data-animations]')) {
  const style = document.createElement('style');
  style.setAttribute('data-animations', 'true');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
