import { Utils } from './utils.js';
import { API } from './api.js';

let currentAnalysis = '';
let analysisAbortController = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  Utils.initTheme();
  initEventListeners();
  renderHistory();
});

// Event listeners
function initEventListeners() {
  const analysisForm = document.getElementById('analysisForm');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const themeBtn = document.getElementById('themeBtn');
  const closeResultsBtn = document.getElementById('closeResultsBtn');
  const saveAnalysisBtn = document.getElementById('saveAnalysisBtn');
  const copyAnalysisBtn = document.getElementById('copyAnalysisBtn');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  // Envío del formulario
  analysisForm.addEventListener('submit', handleAnalyzeSubmit);

  // Limpiar formulario
  clearBtn.addEventListener('click', () => {
    analysisForm.reset();
  });

  // Toggle de tema
  themeBtn.addEventListener('click', toggleTheme);

  // Cerrar resultados
  closeResultsBtn.addEventListener('click', closeResults);

  // Guardar análisis
  saveAnalysisBtn.addEventListener('click', saveAnalysis);

  // Copiar análisis
  copyAnalysisBtn.addEventListener('click', copyAnalysis);

  // Limpiar historial
  clearHistoryBtn.addEventListener('click', clearHistory);
}

// Manejo del envío del formulario
async function handleAnalyzeSubmit(e) {
  e.preventDefault();

  // Obtener datos del formulario
  const formData = {
    activo: document.getElementById('activo').value.toUpperCase(),
    temporalidad: document.getElementById('temporalidad').value,
    sesion: document.getElementById('sesion').value,
    volatilidad: document.getElementById('volatilidad').value,
    noticias: document.getElementById('noticias').value || 'Sin eventos específicos',
    rsi: document.getElementById('rsi').value || 'No disponible',
    macd: document.getElementById('macd').value || 'No disponible',
    ema: document.getElementById('ema').value || 'No disponible'
  };

  // Validar
  const validation = Utils.validateForm(formData);
  if (!validation.isValid) {
    validation.errors.forEach(error => {
      Utils.showNotification(error, 'error');
    });
    return;
  }

  // Mostrar sección de resultados
  showResults();
  currentAnalysis = '';

  // Deshabilitar botón
  const analyzeBtn = document.getElementById('analyzeBtn');
  analyzeBtn.disabled = true;

  // Realizar análisis
  try {
    API.analyzeMarket(
      formData,
      // onChunk
      (chunk) => {
        currentAnalysis += chunk;
        updateAnalysisDisplay(currentAnalysis);
      },
      // onError
      (error) => {
        Utils.showNotification(
          `Error: ${error.message || 'No se pudo conectar con el servidor'}`,
          'error',
          5000
        );
        hideLoading();
      },
      // onComplete
      () => {
        hideLoading();
        analyzeBtn.disabled = false;
      }
    );
  } catch (error) {
    Utils.showNotification('Error inesperado', 'error');
    hideLoading();
    analyzeBtn.disabled = false;
  }
}

// Mostrar resultados
function showResults() {
  const resultsSection = document.getElementById('resultsSection');
  resultsSection.style.display = 'block';
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Cerrar resultados
function closeResults() {
  const resultsSection = document.getElementById('resultsSection');
  resultsSection.style.display = 'none';
  currentAnalysis = '';
  document.getElementById('analysisResults').textContent = '';
}

// Actualizar display del análisis
function updateAnalysisDisplay(text) {
  const analysisResults = document.getElementById('analysisResults');
  analysisResults.textContent = text;
  analysisResults.scrollTop = analysisResults.scrollHeight;
}

// Mostrar loading
function showLoading() {
  const loading = document.getElementById('analysisLoading');
  loading.style.display = 'flex';
  document.getElementById('analysisResults').style.display = 'none';
}

// Ocultar loading
function hideLoading() {
  const loading = document.getElementById('analysisLoading');
  loading.style.display = 'none';
  document.getElementById('analysisResults').style.display = 'block';
}

// Guardar análisis al historial
function saveAnalysis() {
  if (!currentAnalysis) {
    Utils.showNotification('No hay análisis para guardar', 'error');
    return;
  }

  const formData = {
    activo: document.getElementById('activo').value,
    temporalidad: document.getElementById('temporalidad').value,
    sesion: document.getElementById('sesion').value,
    volatilidad: document.getElementById('volatilidad').value
  };

  const analysisData = Utils.formatAnalysisForStorage(formData, currentAnalysis);
  const saved = Utils.saveToHistory(analysisData);

  if (saved) {
    Utils.showNotification('Análisis guardado en el historial', 'success');
    renderHistory();
  } else {
    Utils.showNotification('Error al guardar análisis', 'error');
  }
}

// Copiar análisis
async function copyAnalysis() {
  if (!currentAnalysis) {
    Utils.showNotification('No hay análisis para copiar', 'error');
    return;
  }

  const success = await Utils.copyToClipboard(currentAnalysis);
  if (success) {
    Utils.showNotification('Análisis copiado al portapapeles', 'success');
  } else {
    Utils.showNotification('Error al copiar', 'error');
  }
}

// Renderizar historial
function renderHistory() {
  const history = Utils.getHistory();
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML = '<p class="empty-state">No hay análisis aún</p>';
    clearHistoryBtn.style.display = 'none';
    return;
  }

  clearHistoryBtn.style.display = 'block';

  history.forEach((item) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';

    const info = document.createElement('div');
    info.className = 'history-item-info';

    const text = document.createElement('div');
    text.className = 'history-item-text';
    text.textContent = `${item.activo} | ${item.temporalidad}`;

    const time = document.createElement('div');
    time.className = 'history-item-time';
    time.textContent = Utils.getTimeAgo(item.timestamp);

    info.appendChild(text);
    info.appendChild(time);

    const loadBtn = document.createElement('button');
    loadBtn.className = 'history-item-btn';
    loadBtn.textContent = 'Cargar';
    loadBtn.addEventListener('click', () => {
      loadHistoryItem(item);
    });

    historyItem.appendChild(info);
    historyItem.appendChild(loadBtn);
    historyList.appendChild(historyItem);
  });
}

// Cargar item del historial
function loadHistoryItem(item) {
  // Rellenar formulario
  document.getElementById('activo').value = item.activo;
  document.getElementById('temporalidad').value = item.temporalidad;
  document.getElementById('sesion').value = item.sesion;
  document.getElementById('volatilidad').value = item.volatilidad;

  // Mostrar análisis
  currentAnalysis = item.analysis;
  showResults();
  hideLoading();
  updateAnalysisDisplay(currentAnalysis);

  // Scroll al formulario
  document.getElementById('analysisForm').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  Utils.showNotification('Análisis cargado', 'success');
}

// Limpiar historial
function clearHistory() {
  if (confirm('¿Estás seguro de que deseas borrar todo el historial?')) {
    Utils.clearHistory();
    renderHistory();
    Utils.showNotification('Historial limpiado', 'success');
  }
}

// Toggle de tema
function toggleTheme() {
  const currentTheme = Utils.getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  Utils.setTheme(newTheme);
  updateThemeIcon();
}

// Inicializar tema en botón
window.addEventListener('load', () => {
  updateThemeIcon();
});

// Actualizar icono del tema
function updateThemeIcon() {
  const theme = Utils.getTheme();
  const themeBtn = document.getElementById('themeBtn');
  const useElement = themeBtn.querySelector('use');
  if (useElement) {
    const iconId = theme === 'dark' ? '#icon-moon' : '#icon-sun';
    useElement.setAttribute('xlink:href', `/icons.svg${iconId}`);
  }
}
