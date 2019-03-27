import { convertPlessure } from '../utils/helpers';

const APPID = 'e3a8c8fab93d721b4390d12789fa204b';
const UNITS = {
  imperial: 'imperial',
  metric: 'metric',
};
const DAY_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class WeatherDataService {
  
  getCurrentWeather(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${UNITS.metric}&APPID=${APPID}`)
      .then(result => result.json())
      .then(this._normalizeResponseData);
  }

  getWeatherForecast(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${UNITS.metric}&APPID=${APPID}`)
      .then(result => result.json())
      .then(this._getForecastDays);
  }

  _normalizeResponseData(data) {
    console.log(data);
    return {
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      pressure: Math.round(convertPlessure(data.main.pressure)),
      humidity: data.main.humidity,
      mainDesc: data.weather[0].main,
      desc: data.weather[0].description,
      wind: data.wind.speed,
      date: new Intl.DateTimeFormat('en-GB').format(new Date(data.dt * 1000)),
    };
  }

  _getForecastDays(data) {
    return data.list.filter( item => {
      const hours = new Date(item.dt * 1000).getUTCHours();
      return hours === 12;
    })
    .map(day => {
      return {
        day: DAY_OF_WEEK[ new Date(day.dt * 1000).getUTCDay() ],
        temp: Math.round(day.main.temp),
      };
    })
  }

}

export default new WeatherDataService();
