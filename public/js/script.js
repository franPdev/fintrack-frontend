const API_KEY = 'AIzaSyCBzniiDLKROLPdZLwYbxbTT3OGpZd2-HA';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;
const STORAGE_KEY = 'fintrack_gastos';

const form = document.getElementById('movimientos-form');
const transaccionesList = document.getElementById('transacciones');
const balanceLabel = document.getElementById('balance');
const ingresosLabel = document.getElementById('ingresosTotal');
const egresosLabel = document.getElementById('egresosTotal');
const advicePanel = document.getElementById('iaAdvice');
const consultarButton = document.getElementById('consultarIA');
const voiceButton = document.getElementById('voiceAdvice');

let movimientos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { descripcion: 'Salario', monto: 2200, tipo: 'ingreso' },
  { descripcion: 'Supermercado', monto: 460, tipo: 'egreso' },
  { descripcion: 'Transporte', monto: 190, tipo: 'egreso' }
];

let balanceChart = null;
let gastosChart = null;

function init() {
  form.addEventListener('submit', handleSubmit);
  consultarButton.addEventListener('click', consultarInteligente);
  voiceButton.addEventListener('click', function () {
    const text = advicePanel.dataset.ultima || advicePanel.textContent;
    speakAdvice(text);
  });

  if (!('speechSynthesis' in window)) {
    voiceButton.classList.add('hidden');
  }

  renderAll();
  initCharts();
}

function handleSubmit(event) {
  event.preventDefault();

  const descripcion = document.getElementById('descripcion').value.trim();
  const monto = Number(document.getElementById('monto').value);
  const tipo = document.getElementById('tipo').value;

  if (!descripcion || !monto || isNaN(monto)) {
    return;
  }

  movimientos.unshift({ descripcion: descripcion, monto: monto, tipo: tipo });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movimientos));

  renderAll();
  form.reset();
  document.getElementById('descripcion').focus();
}

function renderAll() {
  renderResumen();
  renderTransacciones();
  updateCharts();
}

function renderResumen() {
  const ingresos = movimientos
    .filter((mov) => mov.tipo === 'ingreso')
    .reduce((total, mov) => total + mov.monto, 0);

  const egresos = movimientos
    .filter((mov) => mov.tipo === 'egreso')
    .reduce((total, mov) => total + mov.monto, 0);

  const balance = ingresos - egresos;

  balanceLabel.textContent = '$' + balance.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  ingresosLabel.textContent = '$' + ingresos.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  egresosLabel.textContent = '$' + egresos.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderTransacciones() {
  if (!movimientos.length) {
    transaccionesList.innerHTML = '<li class="empty-state">Aún no hay movimientos registrados.</li>';
    return;
  }

  transaccionesList.innerHTML = movimientos
    .map(function (mov, index) {
      const signo = mov.tipo === 'ingreso' ? '+' : '-';
      const clase = mov.tipo === 'ingreso' ? 'income' : 'expense';
      return '<li class="transaction-item ' + clase + '" style="animation-delay: ' + (index * 40) + 'ms">' +
        '<span>' + mov.descripcion + '</span>' +
        '<strong>' + signo + '$' + mov.monto.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '</strong>' +
        '</li>';
    })
    .join('');
}

function buildPrompt() {
  if (!movimientos.length) {
    return 'El usuario no tiene movimientos registrados. Generá un consejo financiero motivador para empezar a registrar gastos e ingresos.';
  }

  var detalle = movimientos
    .slice()
    .reverse()
    .map(function (mov, index) {
      var tipoTexto = mov.tipo === 'ingreso' ? 'Ingreso' : 'Gasto';
      return (index + 1) + '. ' + tipoTexto + ' — ' + mov.descripcion + ': $' + mov.monto.toFixed(2);
    })
    .join('\n');

  var ingresos = movimientos
    .filter(function (mov) { return mov.tipo === 'ingreso'; })
    .reduce(function (total, mov) { return total + mov.monto; }, 0);

  var egresos = movimientos
    .filter(function (mov) { return mov.tipo === 'egreso'; })
    .reduce(function (total, mov) { return total + mov.monto; }, 0);

  var balance = ingresos - egresos;

  return 'Eres un asesor financiero experto. Analiza estos movimientos y genera un consejo corto, claro y motivador en español. Menciona una acción concreta para ahorrar o reducir gastos.\n\n' +
    'Movimientos:\n' + detalle + '\n\n' +
    'Ingresos totales: $' + ingresos.toFixed(2) + '\n' +
    'Gastos totales: $' + egresos.toFixed(2) + '\n' +
    'Balance actual: $' + balance.toFixed(2) + '\n\n' +
    'Respuesta:';
}

async function consultarInteligente() {
    const btn = document.getElementById('consultarIA');
    const MI_LLAVE = 'AIzaSyCBzniiDLKROLPdZLwYbxbTT3OGpZd2-HA';
    
    
const URL_FINAL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${MI_LLAVE}`;    showAdvice('Generando consejo...');
    btn.disabled = true;

    try {
        const response = await fetch(URL_FINAL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: buildPrompt() }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Google Offline");
        }

        const resultadoIA = data.candidates[0].content.parts[0].text;
        showAdvice(resultadoIA.trim());
        voiceButton.classList.remove('hidden');

    } catch (error) {
        console.warn("Usando motor local por error en API");
        const ingresos = movimientos.filter(m => m.tipo === 'ingreso').reduce((a, b) => a + b.monto, 0);
        const gastosTotal = movimientos.filter(m => m.tipo === 'egreso').reduce((a, b) => a + b.monto, 0);
        
        let consejoLocal = "¡Buen trabajo manteniendo tus registros! ";
        if (gastosTotal > ingresos) {
            consejoLocal += "Atención: tus gastos superan tus ingresos. Priorizá recortar gastos no esenciales.";
        } else {
            consejoLocal += "Tenés un balance positivo. Considerá ahorrar el 10% para fondo de emergencia.";
        }
        
        showAdvice(consejoLocal + " (Modo Offline)");
        voiceButton.classList.remove('hidden');
    } finally {
        btn.disabled = false;
    }
}

function showAdvice(text) {
  advicePanel.textContent = text;
  advicePanel.dataset.ultima = text;
  advicePanel.classList.toggle('loading', text.toLowerCase().includes('generando consejo'));
}

function speakAdvice(text) {
  if (!('speechSynthesis' in window) || !text) {
    return;
  }

  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function initCharts() {
  var balanceData = getBalanceHistory();
  var categories = getCategoryData();

  balanceChart = new ApexCharts(document.querySelector('#balanceChart'), {
    chart: {
      type: 'area',
      height: 240,
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    series: [{ name: 'Balance', data: balanceData }],
    grid: { show: false },
    tooltip: { theme: 'light' },
    xaxis: { categories: balanceData.map(function (_, index) { return 'M' + (index + 1); }), labels: { show: false } },
    fill: { gradient: { shade: 'light', type: 'horizontal', shadeIntensity: 0.35, opacityFrom: 0.85, opacityTo: 0.25 } },
    colors: ['#2563eb']
  });

  gastosChart = new ApexCharts(document.querySelector('#gastosChart'), {
    chart: { type: 'donut', height: 240 },
    series: categories.series,
    labels: categories.labels,
    colors: ['#2563eb', '#0f766e', '#9333ea', '#f97316', '#ec4899'],
    legend: { position: 'bottom' },
    tooltip: { theme: 'light' }
  });

  balanceChart.render();
  gastosChart.render();
}

function updateCharts() {
  if (!balanceChart || !gastosChart) {
    return;
  }

  var balanceData = getBalanceHistory();
  var categories = getCategoryData();

  balanceChart.updateOptions({
    xaxis: { categories: balanceData.map(function (_, index) { return 'M' + (index + 1); }) }
  });

  balanceChart.updateSeries([{ data: balanceData }]);
  gastosChart.updateOptions({ labels: categories.labels });
  gastosChart.updateSeries(categories.series);
}

function getBalanceHistory() {
  var balance = 0;
  return movimientos
    .slice()
    .reverse()
    .map(function (mov) {
      balance += mov.tipo === 'ingreso' ? mov.monto : -mov.monto;
      return Number(balance.toFixed(2));
    });
}

function getCategoryData() {
  var totals = {};

  movimientos.forEach(function (mov) {
    var key = mov.descripcion;
    totals[key] = (totals[key] || 0) + mov.monto;
  });

  var labels = Object.keys(totals);
  var series = labels.map(function (label) { return totals[label]; });

  if (!labels.length) {
    labels = ['Sin datos'];
    series = [1];
  }

  return { labels: labels, series: series };
}

init();
