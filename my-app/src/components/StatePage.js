import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Form, Button } from 'react-bootstrap';
import HomePage from "./HomePage";
const StatePage = () => {
  const [label, setlabel] = useState('');
  const [value, setvalue] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/stats', {
        label,
        value,
      });

      if (response.status === 200) {
        window.alert('Ajout avec succès !');
        fetchData();
      } else {
        window.alert('Erreur lors de l\'ajout.');
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout des données:', error);
      window.alert('Erreur lors de l\'ajout.');
    }
      };
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3002/stats');
          const dataFromApi = response.data;
  
          setChartData({
            labels: dataFromApi.map((entry) => entry.label),
            datasets: [
              {
                label: 'Linear Curve',
                data: dataFromApi.map((entry) => entry.value),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des données depuis l\'API:', error);
        }
      };
        useEffect(() => {
          fetchData();
        }, []);

  useEffect(() => {
    if (chartData.labels.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Détruit le graphique précédent
      }

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
      });

      // Enregistre la nouvelle instance du graphique
      chartInstanceRef.current = newChartInstance;

      // Nettoie le graphique lors de la destruction du composant
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartData]);

  return (
  <div>
    <HomePage/>
    <div>
      <Form onSubmit={handleSubmit} id="form">
      <Form.Group className="mb-3" controlId="title">
            <label htmlFor="nom" className="col-form-label">Jour</label>
            <Form.Select
            value={label}
            onChange={(e) => setlabel(e.target.value)}
          >
            <option value="" disabled>Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Form.Select>
          </Form.Group>
            <Form.Group className="mb-3" controlId="title">
            <label htmlFor="nom" className="col-form-label">Value</label>
                <Form.Control
                  type="text"
                  placeholder="Saisir value"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" form="form" > Submit </Button>
      </Form>
     
      <div>
        <h1>Statistiques par base</h1>
        <div className="AppCanva">
        <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StatePage;
