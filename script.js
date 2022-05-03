let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

minutes = minutes < 10 ? `0${minutes}` : minutes;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesady",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
document.querySelector("#current").innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#text");
  showCity(searchInput.value);
}

let form = document.querySelector("#form-text");
form.addEventListener("submit", search);

function displayForecast() {
  let forecastElemet = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["TUE", "WED", "THU"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="card" style="width: 8rem; height: 8rem">
          <div class="card-body">
            <h5 class="card-title">${day}</h5>
            <div class="temp">
              <span class="high"> 11° </span>  

              <span class="low">2°</span>
            </div>

            <p class="card-sign">
              <i class="fa-solid fa-cloud-rain"></i>
            </p>
          </div>
        </div>
      </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElemet.innerHTML = forecastHTML;
}

function showCity(cityName) {
  let apiKey = "dde4ce8f57f17e44f0e63ba4ad67d15c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  //temp
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = `${temperature}`;
  //city
  let cityElement = document.querySelector(".cityNew");
  let city = response.data.name.toUpperCase();
  cityElement.innerHTML = city;
  //humidity
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-number");
  humidityElement.innerHTML = `${humidity}`;

  //wind
  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind-number");
  windElement.innerHTML = `${wind}`;
  //pressure
  let pressure = response.data.main.pressure;
  let pressureElement = document.querySelector("#pressure-number");
  pressureElement.innerHTML = `${pressure}`;
  //min-temp
  let min = Math.round(response.data.main.temp_min);
  let minElement = document.querySelector("#min-temp");
  minElement.innerHTML = `${min}`;
  //max-temp
  let max = Math.round(response.data.main.temp_max);
  let maxElement = document.querySelector("#max-temp");
  maxElement.innerHTML = `${max}`;
  // description

  let descriptionElement = document.querySelector("#des");
  descriptionElement.innerHTML = response.data.weather[0].description;

  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dde4ce8f57f17e44f0e63ba4ad67d15c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  let currentCity = document.querySelector(".cityNew");

  currentCity.innerHTML = `${position.coords.latitude} ${position.coords.longitude}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function showFarenheit(event) {
  event.preventDefault();
  let farenTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(farenTemp);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let celsiusTemperature = null;
showCity("Ljubljana");
displayForecast();
