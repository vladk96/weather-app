import Component from '../../framework/Component';
import WeatherDataService from '../../Services/WeatherDataService';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);

    WeatherDataService
    .getCurrentWeather(this.props.cityName)
    .then(data => {
      this.updateState({
        currentWeather: data,
      });
    });
    
  }
  
  init() {

    
  }

  render() {
    console.log(this.state.currentWeather);
    if (this.state.currentWeather === undefined) {
      console.log('here');
      return [
        {
          tag: 'section',
          classList: ['today-weather'],
          content: 'Nothing',
        },
      ];
    } else {
      console.log('other');
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
                      // content: `${this.props.cityName}`, //props
                      content: `${this.state.currentWeather.name}`,
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
                  content: `${this.state.currentWeather.weather[0].description}`, // props
                  classList: ['weather-desc'],
                },
                {
                  tag: 'p',
                  content: `${this.props.date}`, // props
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
                          value: this.props.weatherImage, // props
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
                  content: `Wind speed: ${this.props.wind} mph`, // props
                  classList: ['wind-speed'],
                },
                {
                  tag: 'p',
                  content: `Humidity ${this.props.humidity} %`, // props
                  classList: ['humidity'],
                },
                {
                  tag: 'p',
                  content: `Plessure ${this.props.plessure}`, // props
                  classList: ['plessure'],
                },
                {
                  tag: 'p',
                  content: `${this.props.temperature}&deg`, // props
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
