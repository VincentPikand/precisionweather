const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const Datastore = require('nedb');
const path = require("path");

const db = new Datastore({
	filename: path.join(__dirname, 'database.db'),
	autoload: true
})

function apiCallTime() {
	let callTime = new Date();

	if (new Date().getHours() >= 12) {
		callTime.setDate(new Date().getDate() + 1)

	}
	callTime.setHours(13)
	callTime.setMinutes(0)
	callTime.setSeconds(0)
	callTime.setMilliseconds(0)
	console.log(callTime);
	return callTime - new Date();
}

function calculateAccuracy() {
	let sum = 0
	let count = 0
	 db.find({}, (err, docs) => {
		for (const key of docs) {
			console.log(key.prediction)
			sum += key.actual - key.prediction;
			count++;
		}
		console.log(sum / count)
		
	})
	
	return sum / count;
}

function fetchWeather() {
	setTimeout(() => {
		let tempDate = new Date()
		let updateId

		db.insert({ prediction: 0, actual: 0 }, (err, newDoc) => {
			updateId = newDoc._id
		})

		fetch(`http://api.weatherapi.com/v1/history.json?key=${process.env.WEATHERAPI_KEY}&q=Tallinn&dt=${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						_id: updateId
					},
					{
						$set: { prediction: res.forecast.forecastday[0].hour[12].temp_c }
					}
				))
			)
		fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=Tallinn`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						_id: updateId
					},
					{
						$set: { actual: res.current.temp_c }
					}
				))
			)
		fetchWeather()
	}, apiCallTime());
}
fetchWeather()

app.get('/weatherapi', async (req, res) => {
	res.send(calculateAccuracy().toString())
})


app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});


