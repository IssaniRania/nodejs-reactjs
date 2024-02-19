// Importez React et Chart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Composant React pour le graphique linéaire
const LineChart = () => {
  // Utilisez un useRef pour accéder au DOM du canvas
  const chartRef = useRef(null);

  useEffect(() => {
    // Créez un tableau de données de test pour la courbe linéaire
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Linear Curve',
          data: [10, 25, 18, 32, 20],
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };

    // Obtenez le contexte du canvas à partir du useRef
    const ctx = chartRef.current.getContext('2d');

    // Créez l'instance du graphique linéaire
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
    });

    // Nettoyez le graphique lors de la destruction du composant
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <h2>Linear Chart Example</h2>
      <canvas ref={chartRef} width="200" height="200"></canvas>
    </div>
  );
};

export default LineChart;
