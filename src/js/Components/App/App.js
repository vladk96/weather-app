import Component from '../../framework/Component';
import { SearchBar } from '../SearchBar/';
import { CurrentWeather } from '../CurrentWeather/';
import { WeatherForecast } from '../WeatherForecast/';
import { FavouriteLocations } from '../FavouriteLocations/';
import { SearchHistory } from '../SearchHistory/';

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
          },
          { 
            tag: WeatherForecast,
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
