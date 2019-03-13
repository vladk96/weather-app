import Component from '../../framework/Component';

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }
  
  render() {
    return [
      {
        tag: 'li',
        classList: ['week-forecast-day'],
        children: [
          {
            tag: 'h2',
            content: `${this.props.day}`,
            classList: ['week-forecast-title'],
          },
          {
            tag: 'p',
            content: `${this.props.temp}&deg`,
            classList: ['week-forecast-temperature'],
          },
        ],
      },
    ];
  }

}
