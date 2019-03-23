const APPID = 'e3a8c8fab93d721b4390d12789fa204b';

class WeatherDataService {
  
  getCurrentWeather(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APPID}`)
      .then(result => result.json());
  }

  getWeatherForecast(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${APPID}`)
      .then(result => result.json());
  }

}

export default new WeatherDataService();
