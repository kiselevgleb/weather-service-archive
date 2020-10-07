# Weather service
This app shows the weather archive (temperature and precipitation) from 1881 to 2006.
https://kiselevgleb.github.io/weather-service-archive/

   npm start: "webpack-dev-server --mode development"
   npm build: "webpack --mode production"

This application uses:

IndexedDB.

Canvas.

temp.worker.js -  this worker get data form server about temperature 1881 - 2006 and write data to DB table 'temperature'.

precipitation.worker.js - this worker get data form server about precipitation 1881 - 2006 and write data to DB table 'precipitation'.

canvas.worker.js - this worker calculates average data for the canvas.

Back server https://back-weather-service.herokuapp.com/ 

Reguest to get data form server about temperature 1881 - 2006: 
https://back-weather-service.herokuapp.com/temperature

Reguest to get data form server about precipitation 1881 - 2006: 
https://back-weather-service.herokuapp.com/precipitation

Front JS (github) + Back node JS koa (heroku)

Repository with back server:
https://github.com/kiselevgleb/back-weather-service