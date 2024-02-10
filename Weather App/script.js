const apiKey = "66dd7fa9bbab634bec7b4d3103435282";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".error");

search.addEventListener("click", async () => {
  const city = document.querySelector(".search-box input").value;

  if (city === "")
    return;

  const res = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

  if(res.status == 404){
    container.style.height = "400px";
    weatherBox.classList.remove("active");
    weatherDetails.classList.remove("active");
    error.classList.add("active");
    return;
  }
  else {
      var data = await res.json();

      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temp = document.querySelector(".weather-box .temp");
      const des = document.querySelector(".weather-box .des");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (data.weather[0].main) {
        case "Clouds":
          image.src = "./images/cloud.png";
          break;

        case "Clear":
          image.src = "./images/clear.png";
          break;

        case "Rain":
          image.src = "./images/rain.png";
          break;

        case "Snow":
          image.src = "./images/snow.png";
          break;

        case "Mist":
          image.src = "./images/mist.png";
          break;

        case "Drizzle":
          image.src = "./images/drizzle.png";
          break;

        default:
          image.src = "";
      }

      temp.innerHTML = `${parseInt(data.main.temp)}<span>°c</span>`;
      des.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity} %`;
      wind.innerHTML = `${parseInt(data.wind.speed)} km/hr`;
    }

});