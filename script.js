const getData = async value => {
  try {
    let apiKey = "19b6f658c03014c2930d23477b161226"
    let responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`
    )
    let result = await responce.json()
    insertData(result)
  } catch (error) {
    document.body.innerHTML = error
  }
}

const insertData = data => {
  const weatherInfo = document.querySelector(".weather_info")
  weatherInfo.innerHTML = `
             <img src="https://openweathermap.org/img/wn/${
               data.weather[0].icon
             }@2x.png"alt="img">
            <span class="city">${data.name}</span>
            <span class="temperature">${Math.round(
              data.main.temp - 273
            )}&deg;</span>
            <span class="sky">${data.weather[0].main}</span>
  `
}

const chooseCity = () => {
  const cities = document.querySelector(".cities")
  getData(cities[1].value)
  cities.addEventListener("change", event => {
    getData(event.target.value)
  })
}

chooseCity()
