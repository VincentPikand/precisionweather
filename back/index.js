const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');


app.get('/weatherapi', async (req, res) => {
	await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=Tallinn&days=1`).then(response => (
		response.json()
	).then(response => {
		res.send(response)
	}))
})



app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});


