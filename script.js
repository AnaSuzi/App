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

function showCity(cityName) {
  let apiKey = "dde4ce8f57f17e44f0e63ba4ad67d15c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  //temp
  let temperature = Math.round(response.data.main.temp);
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
  console.log(response);
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

showCity("Ljubljana");
