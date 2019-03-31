import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    
    AppState.watch('CHANGECITY', this.updateMyself);
  }
  
  init() {
    this.updateMyself = this.updateMyself.bind(this);
  }

  updateMyself(subState) {
    this.updateState(subState);
    
  }

  render() {
    if (this.state.currentWeather === undefined) {
      return '';
    } else {
    return [
      {
        tag: 'section',
        classList: ['today-weather'],
        children: [
          {
            tag: 'div',
            classList: ['wrapper'],
            children: [
              {
                tag: 'header',
                children: [
                  {
                    tag: 'h2',
                    classList: ['city-name'],
                    content: `${this.state.currentWeather.name}, ${this.state.currentWeather.country}`,
                  },
                  {
                    tag: 'button',
                    classList: ['favorite-btn'],
                    attributes: [
                      {
                        name: 'type',
                        value: 'button',
                      },
                      {
                        name: 'title',
                        value: 'Add to favorites'
                      },
                    ],
                    children: [
                      {
                        tag: 'span',
                        classList: ['icon-star-outlined'], // props
                      },
                    ],
                  },
                ],
              },
              {
                tag: 'p',
                content: `${this.state.currentWeather.desc}`, // props
                classList: ['weather-desc'],
              },
              {
                tag: 'p',
                content: `${this.state.currentWeather.date}`, // props
                classList: ['date'],
              },
              {
                tag: 'div',
                classList: ['weather-image'],
                children: [
                  {
                    tag: 'img',
                    attributes: [
                      {
                        name: 'src',
                        value: this.state.weatherImage, // props
                      },
                      {
                        name: 'alt',
                        value: 'weather-icon'
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tag: 'div',
            classList: 'wrapper',
            children: [
              {
                tag: 'p',
                content: `Wind speed: ${this.state.currentWeather.wind} mps`, // props
                classList: ['wind-speed'],
              },
              {
                tag: 'p',
                content: `Humidity ${this.state.currentWeather.humidity} %`, // props
                classList: ['humidity'],
              },
              {
                tag: 'p',
                content: `Pressure ${this.state.currentWeather.pressure} mmhg`, // props
                classList: ['plessure'],
              },
              {
                tag: 'p',
                content: `${this.state.currentWeather.temp}&deg`, // props
                classList: ['temperature'],
              },
            ],
          },
        ],
      },
    ];
    }
    
  }

}
