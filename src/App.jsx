// src/App.js
import "./App.css";
import React from "react";
import MqttSubscriber from "./MqttSubscriber";
import MqttPublisher from "./MqttPublisher";

function App() {
  return (
    <div className="App">
      <h1 style={{ marginTop:'10%', marginBottom:'2rem' }}>Relay Control using MQTT protocol with ESP32</h1>
      <MqttSubscriber />
      <MqttPublisher />
    </div>
  );
}

export default App;
