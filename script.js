const initWeatherApp = () => {
  const btnSubmit = document.querySelector(".submit-btn");
  const LOCAL_STORAGE_KEY = "saved_location";
  const currLocationBtn = document.querySelector(".curr-location-btn");
  const input = document.querySelector("input");

  const getData = async value => {
    try {
      if (!value) return;
      let apiKey = "19b6f658c03014c2930d23477b161226";
      let responce = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`
        // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your apikey}
        // this api rounds numbers of the latitude and longitude, so it could give wrong city name
      );
      if (responce.ok) {
        setToLS(LOCAL_STORAGE_KEY, value);
      }
      let result = await responce.json();
      render(result, null);
    } catch (error) {
      render(null, "Something went wrong...");
    }
  };

  const cityByGeo = async position => {
    try {
      const { latitude, longitude } = position.coords;
      let responce = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b819976a24274eb4ab3d638cea23f92e`
      );
      let result = await responce.json();
      const userCity = result.results[0].components.city;

      getData(userCity);
    } catch (error) {
      render(null, "Something went wrong...");
    }
  };

  const setToLS = (key, city) => {
    localStorage.setItem(key, city);
  };

  const getFromLS = key => {
    return localStorage.getItem(key);
  };

  const render = (data, error) => {
    const weatherInfo = document.querySelector(".weather_info");
    if (error) {
      weatherInfo.innerHTML = `<span class="error">${error}</span>`;
    } else {
      weatherInfo.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png"alt="img">
 <span class="city">${data.name}</span>
 <span class="temperature">${Math.round(data.main.temp - 273)}&deg;</span>
 <span class="sky">${data.weather[0].main}</span>
`;
    }
  };

  const chooseCity = () => {
    getData(input.value);
    input.value = "";
  };

  btnSubmit.addEventListener("click", chooseCity);

  document.addEventListener("keydown", e => {
    e.key === "Enter" && chooseCity();
  });

  const getGeo = () => {
    geo = window.navigator.geolocation;
    geo.getCurrentPosition(cityByGeo);
  };

  currLocationBtn.addEventListener("click", getGeo);

  getData(getFromLS(LOCAL_STORAGE_KEY) || "Lviv");
};

initWeatherApp();
