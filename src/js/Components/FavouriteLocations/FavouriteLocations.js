import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['updateMyself']
      .forEach(methodName => this[methodName] = this[methodName].bind(this));
    
    this.state = {
      favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [],
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
    
  }

  cleanAllFavorites() {
    localStorage.removeItem('favoriteCities');
    AppState.update('CHANGECITY', {
      favoriteCities: [],
    });
  }
  
  render() {
    if(this.state.favoriteCities.length !== 0) {
      return [
        {
          tag: 'section',
          classList: ['list', 'favorite-list'],
          children: [
            {
              tag: 'header',
              classList: ['list-head'],
              children: [
                {
                  tag: 'h2',
                  content: 'Favorite',
                  classList: ['list-title'],
                },
                {
                  tag: 'button',
                  classList: ['list-button'],
                  eventHandlers: {
                    click: this.cleanAllFavorites,
                  },
                  attributes: [
                    {
                      name: 'type',
                      value: 'button',
                    },
                  ],
                  children: [
                    {
                      tag: 'span',
                      classList: ['icon-bin'],
                    },
                  ],
                },
              ],
            },
            {
              tag: 'ul',
              children: this.state.favoriteCities.map(city => {
                return {
                  tag: 'li',
                  content: `${city}`,
                };
              }), //props
            },
          ],
        },
      ];
    } else {
      return "";
    }
  }

}
