var findLocation = document.querySelector("#findLocation");
var getLocation = document.querySelector("#getLocation");

var currentLocation = 'cairo';

findLocation.addEventListener("keyup", function(){
    currentLocation = findLocation.value
    getWeatherData()
})

getLocation.addEventListener("click", function(){
    getWeatherData()
})

const d = new Date();

let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

let locationData = [];

let weatherData = [];

let forecastData = []; 

let nextDay;

let nnextDay;

async function getWeatherData() {
  let req = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4b477f81a1a046a0ba210300240701&q=${currentLocation}&days=3`
  );
  let data = await req.json();
  forecastData = data.forecast;
  console.log(forecastData);
  locationData = data.location;
  weatherData = data.current;   
  console.log(locationData);
  console.log(weatherData);
  nextDay = new Date(forecastData.forecastday[1].date)
  nnextDay = new Date(forecastData.forecastday[2].date)
  displayData()
}

getWeatherData();

function displayData() {
    var temp = `<div class="col-lg-4 today">
    <div class="card ">
        <div class="c-head ">
            <p id="day" class="d-inline-block ms-3 my-2">${days[d.getDay()]}</p>
            <p id="date" class="d-inline-block position-absolute my-2">${d.getDate() +' '+ months[d.getMonth()]}</p>
        </div>
        <div class="c-body">
            <p id="location">${locationData.name}</p>
            <div class="degree d-flex ">
                <div class="row">
                    <div class="col-md-7 col-sm-2">
                        <h1 id="degree">${weatherData.temp_c}°C</h1>
                    </div>
                    <div class="col-md-5 col-sm-2">
                        <img class=" ms-5" src="${weatherData.condition.icon}" alt="">
                    </div>
                </div>
            </div>
            <p id="status">${weatherData.condition.text}</p>
            <div class="weather-info d-flex justify-content-center">
                <div class="condDiv d-flex ">
                    <img id="rain-img" src="./imgs/icon-umberella@2x.png" alt="">
                    <p id="rain" class="ms-2">${weatherData.cloud} %</p>
                </div>
                <div class="condDiv px-2 d-flex">
                    <img id="wind-img" src="./imgs/icon-wind@2x.png" alt="">
                    <p id="wind" class="ms-2">${weatherData.wind_kph} km/h</p>
                    </div>
                <div class=" condDiv d-flex">
                    <img id="direction-img" src="./imgs/icon-compass@2x.png" alt="">
                    <p id="direction" class="ms-2">${weatherData.wind_dir}</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-4 next-day text-center ">
    <div class="card">
        <div class="c-head">
            <p id="next-day" class="d-inline-block ms-3 my-2">${days[nextDay.getDay()]}</p>
        </div>
        <div class="c-body">
            <img src="${forecastData.forecastday[1].day.condition.icon}" alt="">
            <h1 id="h-degree">${forecastData.forecastday[1].day.maxtemp_c} °C</h1>
            <p id="l-degree">${forecastData.forecastday[1].day.mintemp_c} °C</p>
            <p id="nextDay-status">${forecastData.forecastday[1].day.condition.text}</p>
        </div>
    </div>
</div>
<div class="col-lg-4 nnext-day text-center">
    <div class="card">
        <div class="c-head">
            <p id="next-day2" class="d-inline-block ms-3 my-2">${days[nnextDay.getDay()]}</p>
        </div>
        <div class="c-body">
            <img src="${forecastData.forecastday[2].day.condition.icon}" alt="">
            <h1 id="nh-degree">${forecastData.forecastday[2].day.maxtemp_c} °C</h1>
            <p id="nl-degree">${forecastData.forecastday[2].day.mintemp_c} °C</p>
            <p id="nnextDay-status">${forecastData.forecastday[2].day.condition.text}</p>
        </div>
    </div>
</div>`;
  document.getElementById("showData").innerHTML = temp;
}
