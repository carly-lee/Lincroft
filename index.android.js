import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/App';

export default class Lincroft extends PureComponent{

  render(){
    return <App />;
  }

}

AppRegistry.registerComponent( 'Lincroft', () => Lincroft );