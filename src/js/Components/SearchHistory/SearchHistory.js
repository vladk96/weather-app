import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['cleanHistory', 'updateMyself']
    .forEach(methodName => this[methodName] = this[methodName].bind(this));

    this.state = {
      historyCitiesJSON: localStorage.getItem('historyCities'),
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }
  
  cleanHistory() {
    console.log('clean');
  }

  render() {
    console.log(this.state);
    return [
      {
        tag: 'section',
        classList: ['list', 'viewed-list'],
        children: [
          {
            tag: 'header',
            classList: ['list-head'],
            children: [
              {
                tag: 'h2',
                content: 'Recently viewed',
                classList: ['list-title'],
              },
              {
                tag: 'button',
                classList: ['list-button'],
                eventHandlers: {
                  click: this.cleanHistory,
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
            // tag: 'ul',
            // children: this.props.historyCities.map(city => {
            //   return {
            //     tag: 'li',
            //     content: `${city.location}`,
            //   };
            // }), //props
            tag: 'ul',
            children: (this.state.historyCitiesJSON !== null) ?
              JSON.parse(this.state.historyCitiesJSON).map( cityName => {
                return {
                  tag: 'li',
                  content: `${cityName}`,
                };
              }) : [],
          },
        ],
      },
    ];
  }

}
