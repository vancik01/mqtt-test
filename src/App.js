import React from "react";
import "./App.css";
import mqtt from "mqtt";
import { connect } from "mqtt";

import { useEffect, useState } from "react";
import HookMqtt from "./components/Hook";
import Senzor from "./Senzor";

function App() {
	const [status, setstatus] = useState("");
	const [client, setclient] = useState("");
	const [IsSub, setIsSub] = useState(false);
	const [messages, setmessages] = useState([]);

	const [devices, setdevices] = useState([]);

	useEffect(() => {
		if (client) {
			client.on("connect", () => {
				setstatus("Connected");
				mqttSub("vancik/test/#");
			});
			client.on("error", (err) => {
				console.error("Connection error: ", err);
				client.end();
			});
			client.on("reconnect", () => {
				setstatus("Reconnecting");
			});

			client.on("message", (topic, message) => {
				const payload = { topic: topic, message: message.toString() };
				updateDevice(payload);
			});
		}
	}, [client, messages, devices]);

	const mqttPublish = (topic, qos, payload) => {
		if (client) {
			client.publish(topic, payload, { qos }, (error) => {
				if (error) {
					console.log("Publish error: ", error);
				}
			});
		}
	};

	function addMessage(payload) {
		var newData = [...messages];
		console.log(messages);
		newData.push(payload);
		setmessages(newData);
		console.log(newData);
	}

	function updateDevice(payload) {
		const jsonPayload = JSON.parse(payload.message);
		var newData = [...devices];
		var found = false;

		newData.map((device, i) => {
			console.log();
			if (device.DeviceID == jsonPayload.DeviceID) {
				newData[i] = jsonPayload;
				found = true;
			}
		});

		if (!found) newData.push(jsonPayload);
		setdevices(newData);
	}

	const mqttConnect = (host) => {
		const options = {
			port: 8000,
			keepalive: 30,
			protocolId: "MQTT",
			host: "broker.mqttdashboard.com",
			protocolVersion: 4,
			clean: true,
			reconnectPeriod: 1000,
			connectTimeout: 30 * 1000,
			will: {
				topic: "WillMsg",
				payload: "Connection Closed abnormally..!",
				qos: 0,
				retain: false,
			},
			rejectUnauthorized: false,
		};

		options.clientId = "cliendId-vancik123";
		const url = `ws://broker.mqttdashboard.com:8000/mqtt`;
		setstatus("Connecting...");
		setclient(mqtt.connect(url, options));
	};

	const mqttSub = (topic, qos) => {
		if (client) {
			client.subscribe(topic, 0, (error) => {
				console.log("Wubscribed to topis:", topic);
				if (error) {
					console.log("Subscribe to topics error", error);
					return;
				}
				setIsSub(true);
			});
		}
	};

	return (
		<>
			{/* <HookMqtt></HookMqtt> */}
			<div className='App'>
				{!client && <button onClick={mqttConnect}>Connect to MQTT</button>}
				{status && <div>Status: {status}</div>}

				{devices.map((device, deviceId) => {
					return (
						<Senzor
							mqttPublish={mqttPublish}
							key={deviceId}
							name={device.DeviceID}
							teperature={device.DHT11.Temperature}
							humidity={device.DHT11.Humidity}
						></Senzor>
					);
				})}
				{/* {IsSub && messages.length === 0
					? "Waiting for messages"
					: messages.map((message, id) => {
							return (
								<div className='message'>
									<p>
										{id} - {message.message}
									</p>
									<p style={{ fontSize: 12 }}>{message.topic}</p>
								</div>
							);
					  })} */}
			</div>
		</>
	);
}

export default App;
