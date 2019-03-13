import Component from '../../framework/Component';
import { SearchBar } from '../SearchBar/';
import { CurrentWeather } from '../CurrentWeather/';
import { WeatherForecast } from '../WeatherForecast/';
import { FavouriteLocations } from '../FavouriteLocations/';
import { SearchHistory } from '../SearchHistory/';
import { weatherImages } from '../../images';

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
  }
  
  render(){
    return [
      {
        tag: 'div',
        classList: ['app-content'],
        children: [
          { tag: SearchBar },
          { tag: CurrentWeather,
            props: {
              cityName: 'Bangalore, IN',
              date: '2019-03-06',
              weatherDesc: 'Thunderstorms',
              weatherImage: weatherImages.thunderstorm,
              wind: 5,
              humidity: 70,
              plessure: 746,
              temperature: 15,
            },
          },
          { 
            tag: WeatherForecast,
            props: {
              days: [
                {
                  day: 'Mon',
                  temp: '15'
                },
                {
                  day: 'Tue',
                  temp: '10'
                },
                {
                  day: 'Wed',
                  temp: '1'
                },
                {
                  day: 'Thu',
                  temp: '5'
                },
                {
                  day: 'Fri',
                  temp: '16'
                },
                {
                  day: 'Sat',
                  temp: '25'
                },
                {
                  day: 'Sun',
                  temp: '19'
                }
              ],
            },
          },
          {
            tag: 'section',
            classList: ['lists'],
            children: [
              {
                tag: FavouriteLocations,
                props: {
                  favoriteCities: [
                    {
                      location: 'Zhytomyr, Zhytomyr Oblast, Ukraine, 10000',
                    },
                    {
                      location: 'Kyiv, Ukraine, 02000',
                    },
                    {
                      location: 'Redmond, WA, USA',
                    },
                    {
                      location: 'Kyiv, Ukraine, 02000',
                    },
                  ],
                },
              },
              {
                tag: SearchHistory,
                props: {
                  historyCities: [
                    {
                      location: 'Redmond, WA, USA',
                    },
                    {
                      location: 'Kyiv, Ukraine, 02000',
                    },
                    {
                      location: 'Zhytomyr, Zhytomyr Oblast, Ukraine, 10000',
                    },
                  ],
                },
              },
            ],
          },
        ]
      }
    ];
  }

}
