const express = require("express")
const server = express()
const https = require("https")
const bodyParser = require("body-parser")

server.use(bodyParser.urlencoded({extended : true}))

server.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

server.post("/", function(req, res){
  const apiKey= "1eb1071bd5782b657a71c5aa210f49d9"
  const unit= "metric"
  const city = req.body.CityName
  const url="https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + city + "&units=" + unit;

  https.get(url, function(response){

    response.on("data", function(data){
      res.writeHead(200,{"Content-Type" : "text/html"});
      const weatherData = JSON.parse(data)
      const weatherDescription=weatherData.weather[0].description
      const temperature= weatherData.main.temp
      const icon=weatherData.weather[0].icon
      const imageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>Weather in "+ city +" is "+weatherDescription + "</h1>");
      res.write("<p>Temperature in "+ city +" is: "+temperature+ " degree Celcius</p>");
      res.write("<img src = " + imageURL + ">")
      res.send()

    })

  })
})




server.listen(3000, function(){
  console.log("Server starting successfully on port 3000")
})
