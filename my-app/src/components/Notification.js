import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Notification = ({ message }) => {
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
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
    }, []);
  
    const sendNotification = async () => {
      try {
        await axios.post('/api/send-notification', {
          subscription,
          payload: {
            title: 'New Notification',
            body: 'This is the body of the notification.',
          },
        });
      } catch (error) {
        console.error('Error sending push notification:', error);
      }
    };
  
    return (
      <div>
        <button onClick={sendNotification}>Send Notification</button>
      </div>
    );
  };
  
export default Notification;
