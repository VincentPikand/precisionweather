# Precision Weather
### Node.js, React Native, Express.
## Description
Precision Weather's objective is to calculate how accurate weather forecasts are.
It fetches several weather forecast API's every day at 10 AM UTC, saving the 24-hour forecast to a database. When 24 hours have passed, it checks what the actual weather is and then calculates the forecasts accuracy overtime.<br/>
<img src="https://github.com/VincentPikand/precisionweather/blob/master/client/assets/ss_2.jpg?raw=true" width="300" align="center">
<img src="https://github.com/VincentPikand/precisionweather/blob/master/client/assets/ss_1.jpg?raw=true" width="300" align="center">
## Installation (with client-side)
To launch this project, you need ``npm``, ``expo``, ``ngrok`` and ``node``.<br/>
``cd client`` and ``npm i`` - Install dependencies for front end.<br/>
Open a new instance of terminal/cmd, and type<br/>
``cd back``, ``npm i`` and ``node index.js`` - Install dependencies and start back end.<br/>
Run ngrok from a third window, forwarding ``localhost:5000``. <br/>
Go to ``precisionweather/client/App.js`` and change ``fetchAddress`` to your ngrok generated address.
Finally, to start the project, run ``expo start`` in the client folder.
You should have 3 windows of terminal/cmd open, 1 for front end, 1 for back end and 1 for ngrok.<br/>
## Installation (CLI)
``cd back``, ``npm i`` and ``node index.js`` - Install dependencies and start back end.<br/>
In your browser, type ``localhost:5000/weatherapi``. The results will be displayed in JSON format.
