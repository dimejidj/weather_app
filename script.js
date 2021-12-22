"use strict";

const weatherApp = (function () {
  let currentLocation;
  let longtitude;
  let latitude;
  let celciusSymbol = true;
  let shownSymbol;
  const citySearch = document.querySelector(".search-text");
  const searchBtn = document.querySelector(".searchbtn");
  const currentWeatherValue = document.querySelector(".currentweather");
  const locationPlace = document.querySelector(".location-place");
  const locationCountry = document.querySelector(".location-country");
  const topWeatherDesc = document.querySelector(".topweatherdesc");
  const bottomWeatherDesc = document.querySelector(".bottomweatherdesc");
  const minTemp = document.querySelector(".mintemp");
  const maxTemp = document.querySelector(".maxtemp");
  const feelsLike = document.querySelector(".feelslike");
  const oneDayAfterDay = document.querySelector(".onedayafterday");
  const onedayafterweather = document.querySelector(".onedayafterweather");
  const twoDayAfterDay = document.querySelector(".twodayafterday");
  const twodayafterweather = document.querySelector(".twodayafterweather");
  const threeDayAfterDay = document.querySelector(".threedayafterday");
  const threedayafterweather = document.querySelector(".threedayafterweather");
  const fourDayAfterDay = document.querySelector(".fourdayafterday");
  const fourdayafterweather = document.querySelector(".fourdayafterweather");
  const fiveDayAfterDay = document.querySelector(".fivedayafterday");
  const fivedayafterweather = document.querySelector(".fivedayafterweather");
  const sixDayAfterDay = document.querySelector(".sixdayafterday");
  const sixdayafterweather = document.querySelector(".sixdayafterweather");
  const sevenDayAfterDay = document.querySelector(".sevendayafterday");
  const sevendayafterweather = document.querySelector(".sevendayafterweather");
  const hidepageInfo = document.querySelector(".hidden");
  const weatherMetric = document.querySelector(".formatstyle");
  const daysArrayWeather = [
    onedayafterweather,
    twodayafterweather,
    threedayafterweather,
    fourdayafterweather,
    fivedayafterweather,
    sixdayafterweather,
    sevendayafterweather,
  ];
  // oneDayAfterDay.textContent = "Saturday ";
  // onedayafterweather.textContent = "5 C";

  function symbol() {
    celciusSymbol == true
      ? (shownSymbol = `&#8451`)
      : (shownSymbol = `&#x2109;`);
    celciusSymbol == true
      ? (weatherMetric.innerHTML = `&#8451`)
      : (weatherMetric.innerHTML = `&#x2109;`);
    return celciusSymbol, weatherMetric;
  }

  function celciusCal(value) {
    if (celciusSymbol == true) {
      return `${Math.floor(value - 273.15)}${shownSymbol}`;
    } else if (celciusSymbol == false) {
      return `${Math.floor(((value - 273.15) * 9) / 5 + 32)}${shownSymbol}`;
    }
  }

  const getCurrentWeather = async function () {
    symbol();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&appid=b76a747e7afe747f3f857fc661b6f971`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      hidepageInfo.classList.remove("hidden");
      [longtitude, latitude] = [weatherData.coord.lon, weatherData.coord.lat];

      const todayWeatherArr = [
        celciusCal(weatherData.main.temp),
        celciusCal(weatherData.main.temp_min),
        celciusCal(weatherData.main.temp_max),
        celciusCal(weatherData.main.feels_like),
      ];
      locationPlace.textContent = `${weatherData.name},`;
      locationCountry.textContent = `${weatherData.sys.country}`;
      topWeatherDesc.textContent = weatherData.weather[0].main;
      bottomWeatherDesc.textContent = weatherData.weather[0].description;
      currentWeatherValue.innerHTML = todayWeatherArr[0];
      minTemp.innerHTML = todayWeatherArr[1];
      maxTemp.innerHTML = todayWeatherArr[2];
      feelsLike.innerHTML = todayWeatherArr[3];
    } catch (error) {
      hidepageInfo.classList.add("hidden");
      alert("Input Valid City");
    }
  };

  const dayGetter = function (val) {
    if (val == 0) {
      return (val = 1);
    } else if (val == 1) {
      return (val = 2);
    } else if (val == 2) {
      return (val = 3);
    } else if (val == 3) {
      return (val = 4);
    } else if (val == 4) {
      return (val = 5);
    } else if (val == 5) {
      return (val = 6);
    } else if (val == 6) {
      return (val = 0);
    } else if (val == 7) {
      return (val = 1);
    } else if (val == 8) {
      return (val = 2);
    } else if (val == 9) {
      return (val = 3);
    } else if (val == 10) {
      return (val = 4);
    } else if (val == 11) {
      return (val = 5);
    } else if (val == 12) {
      return (val = 6);
    }
  };

  const getDailyWeather = async function () {
    try {
      await getCurrentWeather();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&exclude=minutely&appid=b76a747e7afe747f3f857fc661b6f971`,
        { mode: "cors" }
      );
      const weatherData = await response.json();
      hidepageInfo.classList.remove("hidden");
      const [
        oneDayAfter,
        twoDayAfter,
        threeDayAfter,
        fourDayAfter,
        fiveDayAfter,
        sixDayAfter,
        sevenDayAfter,
      ] = [
        weatherData.daily[1],
        weatherData.daily[2],
        weatherData.daily[3],
        weatherData.daily[4],
        weatherData.daily[5],
        weatherData.daily[6],
        weatherData.daily[7],
      ];

      const dayForecastCelcius = [
        celciusCal(oneDayAfter.temp.day),
        celciusCal(twoDayAfter.temp.day),
        celciusCal(threeDayAfter.temp.day),
        celciusCal(fourDayAfter.temp.day),
        celciusCal(fiveDayAfter.temp.day),
        celciusCal(sixDayAfter.temp.day),
        celciusCal(sevenDayAfter.temp.day),
      ];

      let todayDate = new Date();
      const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      oneDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay())];
      twoDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 1)];
      threeDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 2)];
      fourDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 3)];
      fiveDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 4)];
      sixDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 5)];
      sevenDayAfterDay.innerHTML = weekDay[dayGetter(todayDate.getDay() + 6)];

      onedayafterweather.innerHTML = dayForecastCelcius[0];
      twodayafterweather.innerHTML = dayForecastCelcius[1];
      threedayafterweather.innerHTML = dayForecastCelcius[2];
      fourdayafterweather.innerHTML = dayForecastCelcius[3];
      fivedayafterweather.innerHTML = dayForecastCelcius[4];
      sixdayafterweather.innerHTML = dayForecastCelcius[5];
      sevendayafterweather.innerHTML = dayForecastCelcius[6];

      return "hitting daily weather";
    } catch (error) {
      hidepageInfo.classList.add("hidden");
      console.log(error);
    }
  };

  const searchResults = async function (e) {
    await Promise.all([getCurrentWeather(), getDailyWeather()])
      .then(function (results) {
        console.log("Everything has loaded");
      })
      .catch(function (error) {
        hidepageInfo.classList.add("hidden");
        console.log(error);
      });
  };

  searchBtn.addEventListener("click", function (e) {
    currentLocation = citySearch.value;
    searchResults();
  });

  weatherMetric.addEventListener("click", function (e) {
    if (celciusSymbol == false) {
      celciusSymbol = true;
    } else {
      celciusSymbol = false;
    }
    searchResults();
  });
})();
