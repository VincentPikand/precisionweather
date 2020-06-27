# Precision Weather
### Node.js, React Native, Express.
## Description
Precision Weather's objective is to calculate how accurate are weather forecasts.
It fetches several weather forecast API's every day at 10 AM UTC, saving the 24-hour forecast to a database. When 24 hours have passed, it checks what the actual weather is and then calculates the forecasts accuracy overtime.<br/>
<img src="https://github.com/VincentPikand/precisionweather/blob/master/client/assets/ss_2.jpg?raw=true" width="300" align="center">
<img src="https://github.com/VincentPikand/precisionweather/blob/master/client/assets/ss_1.jpg?raw=true" width="300" align="center">
## Installation
to launch this project, you need ``npm``, ``expo``, ``ngrok`` and ``node``. A few, I know. <br/>

``cd client`` and ``npm i`` - to install dependencies for frontend<br/>
Open a new instance of terminal/cmd, and type<br/>
``cd back``, ``npm i`` and ``node index.js`` - to install dependencies and start backend<br/>
Run ngrok from a third window, forwarding ``localhost:5000``. <br/>
Go to ``precisionweather/client/App.js`` and change ``fetchAddress`` to your ngrok generated address.
Finally, to start the project, run ``expo start`` in client folder.
You should have 3 windows of terminal/cmd open, 1 for clientside, 1 for backend and 1 for ngrok.
