import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttSubscriber = () => {
  const [message, setMessage] = useState("not yet");
  const brokerUrl = "ws://broker.emqx.io:8083/mqtt"; // Using WebSocket
  const topic = "test/relay/faiz";

  useEffect(() => {
    // Connect to the MQTT broker
    const client = mqtt.connect(brokerUrl);

    // Set up the subscription
    client.on("connect", () => {
      console.log("Connected to broker");
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic '${topic}'`);
        }
      });
    });

    // Set up the message handler
    client.on("message", (topic, message) => {
      console.log(`Received message: ${message.toString()}`);
      setMessage(message.toString());
    });

    // Clean up the client on unmount
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [brokerUrl, topic]);

  return (
    <div>
      <h2>MQTT Subscriber</h2>
      <p>
        Subscribed from topic '{topic}' : {message}
      </p>
    </div>
  );
};

export default MqttSubscriber;
