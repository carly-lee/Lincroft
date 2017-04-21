import React, { PropTypes, PureComponent } from 'react';
import { Animated, Platform } from 'react-native';

import HeartIcon from './HeartIcon';

const bezierInputRange = [[ 0, 1 ], [ 0, 0.1, 0.3, 1 ], [ 0, 0.1, 0.3, 1 ], [ 0, 0.4, 1 ], [ 0, 0.4, 1 ], [ 0, 0.4, 1 ], [ 0, 0.4, 1 ]];
const bezierOutputRange = ( index ) => {
  const range = [[ 0, 0 ], [ 0, -18, -28, -48 ], [ 0, 12, 22, 42 ], [ 7, 32, 22 ], [ -12, -32, -22 ], [ -12, -4, -14 ], [ 7, -8, 2 ]];
  return range[index].map( x => Platform.OS === 'ios' ? x + 18 : x );
};
const duration = 1500;

class HeartParticle extends PureComponent{

  static propTypes = {
    onEndParticle: PropTypes.func,
  }

  state = {
    yValue: new Animated.Value( 0 ),
    xValue: new Animated.Value( 0 ),
    fadeAnim: new Animated.Value( 1 ),
    scaleX: new Animated.Value( 1 ),
  }

  componentDidMount(){
    this._startSmallHeart();
  }

  _startSmallHeart = () => {
    this.state.yValue.setValue( 0 );
    this.state.xValue.setValue( 0 );
    this.state.fadeAnim.setValue( 0 );
    this.state.scaleX.setValue( 1 );

    Animated.parallel([
      Animated.timing( this.state.yValue, { toValue: 1, duration }),
      Animated.timing( this.state.xValue, { toValue: 1, duration }),
      Animated.timing( this.state.scaleX, { toValue: 2, duration }),
      Animated.timing( this.state.fadeAnim, { toValue: 1, duration }),
    ]).start( this._endAnimation );
  }

  _endAnimation = () => {
    this.props.onEndParticle();
  }

  render(){
    const y = this.state.yValue.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 10, -200 ],
    });

    const xIndex = Math.floor( Math.random()*bezierInputRange.length );
    const x = this.state.xValue.interpolate({
      inputRange: bezierInputRange[xIndex],
      outputRange: bezierOutputRange( xIndex ),
    });

    const alpha = this.state.fadeAnim.interpolate({
      inputRange: [ 0, 0.3, 1 ],
      outputRange: [ 0, 1, 0 ],
    });

    const scaleX = this.state.scaleX.interpolate({
      inputRange: [ 1, 1.2, 1.3, 2 ],
      outputRange: [ 0.5, 1.2, 1, 1 ],
    });

    const rndScale = Math.random()*0.2+0.4;

    return (
      <Animated.View style={{
        position: 'absolute',
        top: y,
        left: x,
        opacity: alpha,
        transform: [{ scaleX }]}}>
        <HeartIcon scale={ Number( rndScale.toFixed( 1 )) } />
      </Animated.View>
    );
  }
}

export default HeartParticle;