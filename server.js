const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.use(express.static('public'));

app.set("view engine", "ejs");

app.get("/", (req, res)=>{
  res.render("index");
});

app.post("/", async(req, res)=>{
  let location = await req.body.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`
  const response = await fetch(url);
  const weather__data = await response.json();
  const temp = Math.floor(weather__data.main.temp);
  const weather__info = weather__data.weather[0].description;
  console.log(temp)
  console.log(weather__info)
  res.write(`<h1>Current weather of ${location} is ${weather__info}</h1>`);
  res.write(`<h1> & temperature is ${temp} degrees .</h1>`);
});

app.listen(3000, ()=>{
  console.log("server is running")
})

