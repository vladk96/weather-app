import Component from "../../framework/Component";
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService';
import { weatherImages } from '../../images';
import { toCamelCase } from '../../utils/helpers';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
    
    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['searchCity', 'updateMyself']
      .forEach(methodName => this[methodName] = this[methodName].bind(this));
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  searchCity({ target }) {
    const ENTER_KEY_CODE = 13;

    if (event.keyCode === ENTER_KEY_CODE) {

      WeatherDataService
      .getCurrentWeather(target.value)
      .then(currentData => {

        WeatherDataService
          .getWeatherForecast(target.value)
          .then(forecastData => {

            AppState.update('CHANGECITY', {
              currentWeather: currentData,
              weatherImage: weatherImages[ toCamelCase(currentData.mainDesc) ],
              weatherForecast: forecastData,
            });

          });
      })
      .catch(() => { 
        alert('Incorrect city name. Try again'); // Prettify it in future
      });

    }
  }
  
  render() {
    return [
      {
        tag: 'section',
        classList: ['search-bar'],
        children: [
          {
            tag: 'input',
            classList: ['search-input'],
            eventHandlers: {
              keydown: this.searchCity,
            },
            attributes: [
              {
                name: 'type',
                value: 'text',
              },
              {
                name: 'placeholder',
                value: 'Search...',
              },
            ],
          },
          {
            tag: 'select',
            classList: ['units'],
            attributes: [
              {
                name: 'name',
                value: 'units',
              },
              {
                name: 'id',
                value: 'units',
              },
            ],
            children: [
              {
                tag: 'option',
                content: '&degC',
                attributes: [
                  {
                    name: 'value',
                    value: 'celsius',
                  },
                ],
              },
              {
                tag: 'option',
                content: '&degF',
                attributes: [
                  {
                    name: 'value',
                    value: 'fahrenheit',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

  }
}
