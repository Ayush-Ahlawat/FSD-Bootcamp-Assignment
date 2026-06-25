function getWeather() {

    let city = document.getElementById("city").value;

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    let weatherData = {
        Delhi: "38°C, Sunny",
        Mumbai: "32°C, Cloudy",
        Jaipur: "40°C, Hot",
        Chennai: "35°C, Humid",
        Kolkata: "34°C, Rainy"
    };

    let result = document.getElementById("result");

    if(weatherData[city]){
        result.innerHTML =
            "<h3>" + city + "</h3>" +
            "<p>" + weatherData[city] + "</p>";
    } else {
        result.innerHTML =
            "<p>Weather data not available</p>";
    }
}