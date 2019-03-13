import Component from '../../framework/Component';
import { SearchBar } from '../SearchBar/';

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
    this.props = props;
  }
  
  render(){
    // return [temp1, temp2, document.createElement('div')];
    return [
      {
        tag: 'div',
        classList: ['app-content'],
        children: [
          { tag: SearchBar },
        ]
      }
    ];
  }
}
