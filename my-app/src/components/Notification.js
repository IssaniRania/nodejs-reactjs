import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = ({ title, message }) => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    // Vérifier si Notification et requestPermission sont définis
    if (Notification && Notification.requestPermission) {
      // Demander la permission pour les notifications
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // Créer et afficher la notification
          new Notification(title, {
            body: message,
          });
        } else {
          console.error('Permission denied for notifications');
        }
      });
    } else {
      console.error('Notification.requestPermission is not supported in this environment');
    }
  }, [title, message]);

  const sendNotification = () => {
    axios.post('http://localhost:3002/api/sendNotification', notification)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>React Notifications</h1>
      <input
        type="text"
        placeholder="Title"
        value={notification.title}
        onChange={(e) => setNotification({ ...notification, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Message"
        value={notification.message}
        onChange={(e) => setNotification({ ...notification, message: e.target.value })}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
}

export default Notification;
