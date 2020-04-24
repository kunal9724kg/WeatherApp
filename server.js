const express = require("express")
const server = express()
const https = require("https")

server.get("/", function(req, res){
  const url="https://api.openweathermap.org/data/2.5/weather?appid=1eb1071bd5782b657a71c5aa210f49d9&q=kolkata&units=metric"
  https.get(url, function(response){

    response.on("data", function(data){
      res.writeHead(200,{"Content-Type" : "text/html"});
      const weatherData = JSON.parse(data)
      const weatherDescription=weatherData.weather[0].description
      const temperature= weatherData.main.temp
      const icon=weatherData.weather[0].icon
      const imageURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<img src = " + imageURL + ">")
      res.send()

    })

  })

})


server.listen(3000, function(){
  console.log("Server starting successfully on port 3000")
})
