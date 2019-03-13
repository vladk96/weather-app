import Component from '../../framework/Component';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);
  }
  
  render() {
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
            children: this.props.favoriteCities.map(city => {
              return {
                tag: 'li',
                content: `${city.location}`,
              };
            }), //props
          },
        ],
      },
    ];
  }

}
