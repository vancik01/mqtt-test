import React from "react";

export default function Senzor({ name, teperature, humidity, mqttPublish }) {
	function handleSendMessage() {
		mqttPublish(`vancik/test/${name}`, 1, "test");
	}

	return (
		<div>
			<h2>Name: {name}</h2>
			<div>Temperature: {teperature} C </div>
			<div>Humidity: {humidity}</div>
			<button onClick={handleSendMessage}>Send message</button>
		</div>
	);
}

// {"Time":"2023-04-05T19:38:09",
//     "type":"senzor"
//     "DeviceID":"ESP_DHT_FA06AA",
//     "DHT11":
//         {
//             "Temperature":21.79999924,
//             "Humidity":39
//         }
// }

//19:39:23.371 MQT: tele/tasmota_POW316_76771C/STATE = {"Time":"2023-04-05T19:39:23","Uptime":"2T01:17:45","UptimeSec":177465,"Heap":150,"SleepMode":"Dynamic","Sleep":50,"LoadAvg":19,"MqttCount":3,"Berry":{"HeapUsed":3,"Objects":45},"POWER":"ON","Wifi":{"AP":1,"SSId":"Area51","BSSId":"40:16:7E:59:6C:70","Channel":10,"Mode":"11n","RSSI":76,"Signal":-62,"LinkCount":1,"Downtime":"0T00:00:04"}}
//19:39:23.383 MQT: tele/tasmota_POW316_76771C/SENSOR = {"Time":"2023-04-05T19:39:23","ENERGY":{"TotalStartTime":"2023-03-16T21:47:21","Total":12.472,"Yesterday":3.555,"Today":1.152,"Period":0,"Power":1,"ApparentPower":36,"ReactivePower":36,"Factor":0.03,"Voltage":231,"Current":0.155}}

// {
//     "DeviceID": 123,
//     "DeviceName": "Senzor1",
//     "DeviceType": "DHT",
//     "MonitoredVariables":[
//         {
//             "Name": "Humidity",
//             "DisplayType": "Numerical",
//             "DisplayUnit": "%"
//         },
//         {
//             "Name": "Temperature",
//             "DisplayType": "Numerical",
//             "DisplayUnit": "C"
//         }
//     ]
//     "ControlledVariables": {}
// }
