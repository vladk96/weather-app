import Component from '../../framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem/';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
  }
  
  render() {
    return [
      {
        tag: 'section',
        classList: ['week-forecast'],
        children: [
          {
            tag: 'ul',
            classList: ['week-forecast-list'],
            children: this.props.days.map(day => {
              return {
                tag: WeatherForecastItem,
                props: day,
              };
            }),
          },
        ],
      },
    ];
  }

}
