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
    ['searchCity', 'changeUnit', 'updateMyself']
      .forEach(methodName => this[methodName] = this[methodName].bind(this));
    
    this.state = {
      unit: 'metric',
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  searchCity({ target }) {
    const ENTER_KEY_CODE = 13;

    if (event.keyCode === ENTER_KEY_CODE) {
      WeatherDataService
        .getAllWeather(target.value, this.state.unit)
        .then(data => {
          AppState.update('CHANGECITY', {
            cityName: target.value,
            currentWeather: data.currentData,
            weatherImage: weatherImages[ toCamelCase(data.currentData.mainDesc) ],
            weatherForecast: data.forecastData,
          });
        });
    }
  }

  changeUnit({ target }) {
    const currentUnit = target.value;

    if (this.state.cityName) {
      WeatherDataService
        .getAllWeather(this.state.cityName, currentUnit)
        .then(data => {
          AppState.update('CHANGECITY', {
            currentWeather: data.currentData,
            weatherForecast: data.forecastData,
            unit: currentUnit,
          });
        });
    } else {
      AppState.update('CHANGECITY', {
        unit: currentUnit,
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
            eventHandlers: {
              change: this.changeUnit,
            },
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
                    value: 'metric',
                  },
                ],
              },
              {
                tag: 'option',
                content: '&degF',
                attributes: [
                  {
                    name: 'value',
                    value: 'imperial',
                  },
                  (this.state.unit === 'imperial') ?  
                  {
                    name: 'selected',
                    value: 'true',
                  }
                  : {},
                ],
              },
            ],
          },
        ],
      },
    ];

  }
}
