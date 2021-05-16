// 1 - Current date and time initial setup

let wkdayTime = document.querySelector("#cuedaytime");

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();

wkdayTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//2 - search form - user chooses a city

let form = document.querySelector("#search-form");

form.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault(); //prevented default behaviour

  let searchInput = document.querySelector("#search-txt-input");
  let cityNameH1 = document.querySelector("h1");
  cityNameH1.innerHTML = `${searchInput.value}`;
  // city name = searchInputvalue

  let apiKey = "52ac8e6c98fe31a1b5f64a2cda52b67a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeather);
  // called the API w/ axios

  function displayWeather(response) {
    //function inside a function, needed cuz axios call above
    //console.log(response);
    //console.log(response.data.main.temp);

    let testTempNow = document.querySelector("#temp-now");
    testTempNow.innerHTML = Math.round(response.data.main.temp);

    // the testTempNow is Celsius for now
  }

  //console.log(searchInput.value); // query for city name
}

//console.log(currentDay);
//console.log(currentHour);
//console.log(currentMinutes);

// Celsius vs Fahrenheit toggle (tentative)

let celciusLink = document.querySelector("#click-celcius");

let fahrenheitLink = document.querySelector("#click-fahrenheit");

celciusLink.addEventListener("click", showCelcius);

fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelcius(event) {
  event.preventDefault();
  let CelTempNow = document.querySelector("#temp-now");
  CelTempNow.innerHTML = "19";
}

function showFahrenheit(event) {
  event.preventDefault();
  let FarTempNow = document.querySelector("#temp-now");
  FarTempNow.innerHTML = "66";
}

// Current Location Temp Button

let userLocusBtn = document.querySelector("#user-locus-btn");
userLocusBtn.addEventListener("click", showLocusTemp);

// Current Location Data
function showLocusTemp() {
  function showPosition(position) {
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    //console.log(position);
    //console.log(position.data.name);

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "52ac8e6c98fe31a1b5f64a2cda52b67a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showTemp);
  }

  function showTemp(response) {
    console.log(response.data.main.temp);

    let temperature = Math.round(response.data.main.temp);
    let updateLocalTemp = document.querySelector("#temp-now");
    updateLocalTemp.innerHTML = `${temperature}ºC`;

    let updateCityName = document.querySelector("h1");
    updateCityName.innerHTML = response.data.name;
    //document.querySelector("#city").innerHTML = response.data.name;
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}
