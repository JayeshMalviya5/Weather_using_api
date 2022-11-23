const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentweatheritemE1 = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryE1 = document.getElementById("country");
const weatherForecastE1 = document.getElementById("weather-forecast");
const currentTempE1 = document.getElementById("current-temp");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const api_key = "3a2ed9bcdb90644916265d2be5fd2a3d";
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hour12 = hour > 12 ? hour % 12 : hour;
  const min = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeE1.innerHTML = ( hour12<10 ? '0' + hour12 : hour12) + ":" + (min <10 ? '0'+min : min) + ":" + " " + ampm;
  dateE1.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);


getweatherdata();


function getweatherdata() {
  navigator.geolocation.getCurrentPosition((k) => {
    let { latitude, longitude } = k.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${api_key}
`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      }).catch((reject) =>{
        console.log('Error 404')
      });
  });
}
function showWeatherData(data) {
console.log(data)

  let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

  timezone.innerHTML = data.timezone;
  countryE1.innerHTML = data.lat + 'N' + " " + data.lon + "  E";
  currentweatheritemE1.innerHTML = `<div class="weather-item">
  <p>Humidity</p>
  <p>${humidity}</p>
</div>
<div class="weather-item">
  <p>Pressure</p>
  <p>${pressure}</p>
</div>
<div class="weather-item">
  <p>Wind Speed</p>
  <p>${wind_speed}</p>
</div>
<div class="weather-item">
  <p>sunrise</p>
  <p>${window.moment(sunrise * 1000).format("HH : mm a")}</p>
</div>
<div class="weather-item">
  <p>sunset</p>
  <p>${window.moment(sunset * 1000).format("HH : mm a")}</p>
</div>`;
  let otherDayForecast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      currentTempE1.innerHTML = `<img src="w_icon.png" alt="Weather icon" class="w-icon" width="300px" />
      <div class="others">
          <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
          <div class="temp">Night ${day.temp.night}&#176;</div>
          <div class="temp">Day ${day.temp.day}&#176;</div>
      </div>`
    } 
    else {
      otherDayForecast += `
    <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
                <img src="w_icon.png" alt="Weather icon" class="w-icon" width="150px" />
                <div class="temp">Night - ${day.temp.night}&#176;</div>
                <div class="temp">Day - ${day.temp.day}&#176;</div>
            </div>`;
    }
  });
  console.log(otherDayForecast);

  weatherForecastE1.innerHTML = otherDayForecast;
}
