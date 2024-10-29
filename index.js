const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const app = express();

// Load environment variables from .env file
dotenv.config();

// Set the view engine to EJS
app.set("view engine", "ejs");
// Serve the public folder as static files
app.use(express.static("public"));

// Render the index page
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Fetch weather data
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const APIKEY = process.env.APIKEY;
  
    if (!city) {
      const error = 'Please provide a city name.';
      return res.render("index", { weather: null, error });
    }
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKEY}`;
    
    let weather = null;
    let error = null;
  
    try {
      const response = await axios.get(apiUrl);
      weather = response.data;
      console.log(response.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      error = 'Error, please try again';
    }
  
    res.render("index", { weather, error });
  });
  

// Set the port to listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
