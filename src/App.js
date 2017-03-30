import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { debounce } from 'lodash';

import HeartComponent from './HeartComponent';
import LottieWrapper from './LottieWrapper';
import finale from '../resources/finale';

const ACTION_TIMER = 400;
const COLORS = [ 'rgb(255,255,255)', 'rgb(111,235,62)' ];

export default class App extends PureComponent{
  interval = null;

  state = {
    count: 0,
    eventState: 'none',
    play: true,
    showFinale: false,
  }

  _pressStart = ( evt, gestureState ) => {
        this.setState(( prevState ) => {
          return { eventState: 'onPanResponderGrant', play: true, count: prevState.count + 1 };
        }, () => {
          this.interval = setInterval(() => {
            this.setState(( prevState ) => ({ count: prevState.count + 1 }),
            () => {
              if( this.state.count % 100 === 0 ){
                this.setState(() => ({ showFinale: true }));
              }
            });
          }, 100 );
        });
  }

  _pressEnd = ( evt, gestureState ) => {
    this.setState(( prevState ) => ({ eventState: 'onPanResponderRelease', play: false }), () => {
      clearInterval( this.interval );
    });
  }

  _handleButtonPress = () => {
    this.setState(( state ) => {
      return { count: state.count + 1 };
    });
  };

  _finaleCompleted = () => {
    this.setState(() => ({ showFinale: false }));
  }

  _getFinale = () => {
    const { showFinale } = this.state;
    if( !showFinale ){return null;}
    return (
      <LottieWrapper
        style={ styles.animation }
        duration={ 2000 }
        source={ finale }
        autoPlay={ true }
        onCompleted={ this._finaleCompleted } />
    );
  }

  render(){
    const { count, eventState } = this. state;

    return (
      <View style={ styles.container }>
        <Text>{`Event State: ${eventState}`}</Text>
        <Text>{`count: ${count}`}</Text>
        <View style={ styles.animationContainer }>
          {this._getFinale()}
          <View style={ styles.responder }>
            <HeartComponent onPressStart={ this._pressStart } onPressEnd={ this._pressEnd } />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  animationContainer: {
    marginTop: 50,
    position: 'relative',
    flex: 1,
  },
  responder: {
    position: 'absolute',
    left: 134,
    top: 242,
    width: 67,
    height: 58,
  },
  animation: {
    position: 'absolute',
    left: 10,
    width: 300,
    height: 360,
  },
});