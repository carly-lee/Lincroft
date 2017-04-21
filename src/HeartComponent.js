import React, { PropTypes, PureComponent } from 'react';
import { Animated, View, PanResponder } from 'react-native';
import { throttle } from 'lodash';

import HeartIcon from './HeartIcon';
import HeartParticle from './HeartParticle';

class HeartComponent extends PureComponent{

  static propTypes = {
    onPressEnd: PropTypes.func,
    onPressStart: PropTypes.func,
  }

  interval = null;
  speedInterval = null;
  key = 0;
  makeParticle = null;
  particleThrottleTime = 400;
  particleIntervalTime = 400;

  constructor( props ){
    super( props );
    this.state = {
      bounceValue: new Animated.Value( 1 ),
      particles: [],
    };

    this.makeParticle = throttle( this._playParticle, this.particleThrottleTime );

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: ( evt, gestureState ) => true,
      onStartShouldSetPanResponderCapture: ( evt, gestureState ) => true,
      onMoveShouldSetPanResponder: ( evt, gestureState ) => true,
      onMoveShouldSetPanResponderCapture: ( evt, gestureState ) => true,
      onPanResponderTerminationRequest: ( evt, gestureState ) => true,

      onPanResponderGrant: ( evt, gestureState ) => {
        this._press();
        this.props.onPressStart( evt, gestureState );
      },
      onPanResponderMove: ( evt, gestureState ) => {
      },
      onPanResponderRelease: ( evt, gestureState ) => {
        this._release();
        this.props.onPressEnd( evt, gestureState );
      },
      onPanResponderTerminate: ( evt, gestureState ) => {
      },
    });
  }

  _press = () => {
    this.state.bounceValue.setValue( 1 );
    Animated.timing( this.state.bounceValue, { toValue: 0.9, duration: 50 }).start();
    this.makeParticle();
    this._particleContinue();
  }

  _release = () => {
    clearInterval( this.interval );
    clearInterval( this.speedInterval );
    this.particleIntervalTime = 400;
    Animated.timing( this.state.bounceValue, { toValue: 1, duration: 50 }).start();
  }

  _particleContinue = () => {
    clearInterval( this.interval );
    this.interval = setInterval(() => {
      this._playParticle();
    }, this.particleIntervalTime );

    if( this.particleIntervalTime > 100 ){
      this.speedInterval = setTimeout(() => {
        this.particleIntervalTime = this.particleIntervalTime - 50;
        this._particleContinue();
      }, 1000 );
    }
  }

  _playParticle = () => {
    this.setState(( ps ) => {
      const newParticles = ps.particles.concat(
        <HeartParticle key={ this.key++ } onEndParticle={ this._onEndParticle } /> );
      return { particles: newParticles };
    });
  }

  _onEndParticle = () => {
    this.setState(( ps ) => {
      const newParticles = ps.particles.concat();
      newParticles.shift();
      return { particles: newParticles };
    });
  }

  render(){
    return (
      <View>
        {this.state.particles}

        <Animated.View { ...this._panResponder.panHandlers }
          style={{
            position: 'absolute',
            width: 67, height: 58,
            transform: [{ scale: this.state.bounceValue }]}}>
          <HeartIcon />
        </Animated.View>
      </View>
    );
  }
}

export default HeartComponent;