import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['cleanAllHistory', 'updateMyself']
    .forEach(methodName => this[methodName] = this[methodName].bind(this));

    this.state = {
      historyCitiesJSON: localStorage.getItem('historyCities'),
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }
  
  cleanAllHistory() {
    localStorage.removeItem('historyCities');
    AppState.update('CHANGECITY', {
      historyCitiesJSON: null,
    });
  }

  render() {
    console.log(this.state);
    if (this.state.historyCitiesJSON !== null) {
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
                    click: this.cleanAllHistory,
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
    } else {
      return "";
    }
    
  }

}
