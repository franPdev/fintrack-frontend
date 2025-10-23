// Gráfico 1: Balance mensual
  new ApexCharts(document.querySelector("#balanceChart"), {
    chart: { type: 'line', height: 300 },
    series: [
      { name: 'Ingresos', data: [1200, 1600, 1400, 1900, 2100] },
      { name: 'Gastos', data: [900, 1100, 1000, 1300, 1500] }
    ],
    xaxis: { categories: ['Jun', 'Jul', 'Ago', 'Sep', 'Oct'] },
    colors: ['#00E396', '#FF4560'],
    stroke: { width: 3 }
  }).render();

  // Gráfico 2: Distribución de gastos
  new ApexCharts(document.querySelector("#gastosChart"), {
    chart: { type: 'donut', height: 300 },
    series: [500, 300, 200, 400],
    labels: ['Comida', 'Transporte', 'Servicios', 'Entretenimiento'],
    colors: ['#FEB019', '#008FFB', '#FF4560', '#775DD0']
  }).render();



