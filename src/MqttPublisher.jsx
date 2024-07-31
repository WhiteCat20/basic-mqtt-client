/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import mqtt from "mqtt";

const MqttPublisher = () => {
  const [client, setClient] = useState(null);
  const [isChecked, setChecked] = useState(null);
  const brokerUrl = "ws://broker.emqx.io:8083/mqtt";
  const topic = "test/relay/faiz";

  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl);
    mqttClient.on("connect", () => {
      console.log("Connected to broker!");
    });
    setClient(mqttClient);

    // clean up the client to unmount
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [brokerUrl]);

  const handleSwitchChange = (event) => {
    const newState = event.target.checked;
    setChecked(newState);

    const message = newState ? "1" : "0";

    if (client) {
      client.publish(topic, message, (err) => {
        if (err) {
          console.error("Publish Error", err);
        } else {
          console.log(`Message '${message}' sent to topic '${topic}'`);
        }
      });
    }
  };

  return (
    <div>
      <h2>MQTT Publisher</h2>

      <div
        class="form-check form-switch d-flex justify-content-center"
        style={{ marginTop: "1rem" }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isChecked}
          onChange={handleSwitchChange}
          style={{ width: "120px", height: "50px" }}
        />
      </div>
    </div>
  );
};
export default MqttPublisher;
