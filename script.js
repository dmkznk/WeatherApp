const getData = async value => {
  try {
    if (!value) return
    let apiKey = "19b6f658c03014c2930d23477b161226"
    let responce = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`
      // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
    )
    let result = await responce.json()
    render(result, null)
  } catch (error) {
    render(null, error)
  }
}

const sucessfulLookup = async position => {
  try {
    const {
      latitude,
      longitude
    } = position.coords

    let responce = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b819976a24274eb4ab3d638cea23f92e`)
    let result = await responce.json()

    const userCity = result.results[0].components.city
    getData(userCity)

  } catch (error) {
    render(null, error)
  }
}

const render = (data, error) => {
  const weatherInfo = document.querySelector(".weather_info")
  if (error) {
    weatherInfo.innerHTML = `<span class="error">${error}</span>`
  } else {
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
}


const chooseCity = () => {
  const input = document.querySelector('input')
  getData(input.value)
  input.value = ''
}

const trigger = () => {
  const btnSubmit = document.querySelector('button')
  btnSubmit.addEventListener('click', () => {
    chooseCity()
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') chooseCity()
  })
}

geo = window.navigator.geolocation
geo.getCurrentPosition(sucessfulLookup)

trigger()