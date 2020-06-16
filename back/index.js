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

function fetchWeather() {
	setTimeout(() => {
		let tempDate = new Date()
		let currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
		tempDate.setDate(tempDate.getDate() - 1)
		let yesterdayDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
		
		db.find({
			date: currentDate
		}, (err, docs) => {
			if (docs.length === 0) {
				db.insert({
					wa_prediction: -100,
					wa_actual: -100,
					wb_prediction: -100,
					wb_actual: -100,
					date: currentDate
				})
			}
		})


		/* FETCH DATA FROM WEATHERAPI (WA) AND INSERT TO DATABASE */

		fetch(`http://api.weatherapi.com/v1/history.json?key=${process.env.WEATHERAPI_KEY}&q=Tallinn&dt=${currentDate}`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						date: currentDate
					},
					{
						$set: { wa_prediction: res.forecast.forecastday[0].hour[12].temp_c }
					}
				))
			)
		fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=Tallinn`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						date: yesterdayDate
					},
					{
						$set: { wa_actual: res.current.temp_c }
					}
				))
			)

		/* FETCH DATA FROM WEATHERBIT (WB) AND INSERT TO DATABASE */

		fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?city=Tallinn&key=${process.env.WEATHERBIT_KEY}&hours=24`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						date: currentDate

					},
					{
						$set: { wb_prediction: res.data[23].temp }
					}
				)
			))
		fetch(`https://api.weatherbit.io/v2.0/history/hourly?city=Tallinn&start_date=${currentDate}:10&end_date=${currentDate}:11&key=${process.env.WEATHERBIT_KEY}`)
			.then(response => (
				response.json()
			)).then(res => (
				db.update(
					{
						date: yesterdayDate

					},
					{
						$set: { wb_actual: res.data[0].temp }
					}
				))
			)
		fetchWeather()
	}, apiCallTime());
}
fetchWeather()

app.get('/weatherapi', async (req, res) => {
	db.find({}, (err, docs) => {
		let wa_sum = 0, wb_sum = 0
		let count = 0
		for (let i = 0; i < docs.length; i++) {
			if (docs[i].wa_actual !== -100 && docs[i].wb_actual !== -100 && docs[i].wa_prediction !== -100 && docs[i].wb_prediction !== -100) {
				wa_sum += Math.pow((docs[i].wa_actual - docs[i].wa_prediction), 2);
				wb_sum += Math.pow((docs[i].wb_actual - docs[i].wb_prediction), 2);
				count++;
			}
		}
		if (count === 0) {
			res.send('cannot calculate')
			return
		}
		let answer = {
			wa_ans: (Math.sqrt(wa_sum / count).toFixed(1)),
			wb_ans: (Math.sqrt(wb_sum / count).toFixed(1))
		}
		console.log(answer)
		res.send(answer)


	})
})


app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});


