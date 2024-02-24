import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { Form, Button } from 'react-bootstrap';
import HomePage from "./HomePage";
import io from 'socket.io-client';

const StatePage = () => {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [subscription, setSubscription] = useState(null);

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
    //const socket = io('http://192.168.1.100:3002');
    
    const handleSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const pushSubscription = await registration.pushManager.getSubscription();
        setSubscription(pushSubscription);
      } catch (error) {
        console.error('Error getting push subscription:', error);
      }
    };

    handleSubscription();

    // return () => {
    //   socket.disconnect();
    // };
  }, []); 

  useEffect(() => {
    if (chartData.labels.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
      });

      chartInstanceRef.current = newChartInstance;

      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartData]);

  const handleNotificationOnSubmit = () => {
    const todayIndex = chartData.labels.indexOf(label);
    if (todayIndex > 0) {
      const yesterdayValue = chartData.datasets[0].data[todayIndex - 1];
      console.log("value:" + value);
      console.log("yesterday:" + yesterdayValue);
      if (value < yesterdayValue) {
        sendNotification();
      }
    }
  };

  const sendNotification = () => {
    axios.post('http://localhost:3002/api/sendNotification', {
      title: 'Notification Title',
      message: 'La valeur d\'aujourd\'hui est inférieure à celle d\'hier !'
    });
  };

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
    handleNotificationOnSubmit();
  };

  return (
    <div>
      <HomePage />
      <div>
        <Form onSubmit={handleSubmit} id="form">
          <Form.Group className="mb-3" controlId="title">
            <label htmlFor="nom" className="col-form-label">Jour</label>
            <Form.Select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            >
              <option value="" disabled>Sélectionnez un jour</option>
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
            <label htmlFor="nom" className="col-form-label">Valeur</label>
            <Form.Control
              type="text"
              placeholder="Saisir la valeur"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" form="form"> Soumettre </Button>
        </Form>
        <div>
          <h1>Statistiques par base</h1>
          <div className="AppCanva">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default StatePage;
