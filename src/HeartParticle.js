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
    animation: new Animated.Value( 0 ),
  }

  componentDidMount(){
    this._startSmallHeart();
  }

  _startSmallHeart = () => {
    this.state.animation.setValue( 0 );
    Animated.timing( this.state.animation, { toValue: 1, duration }).start( this._endAnimation );
  }

  _endAnimation = () => {
    this.props.onEndParticle();
  }

  _getInterpolateValue = () => {
    const y = this.state.animation.interpolate({
      inputRange: [ 0, 1 ],
      outputRange: [ 10, -200 ],
    });

    const xIndex = Math.floor( Math.random()*bezierInputRange.length );
    const x = this.state.animation.interpolate({
      inputRange: bezierInputRange[xIndex],
      outputRange: bezierOutputRange( xIndex ),
    });

    const alpha = this.state.animation.interpolate({
      inputRange: [ 0, 0.3, 1 ],
      outputRange: [ 0, 1, 0 ],
    });

    const scaleX = this.state.animation.interpolate({
      inputRange: [ 0, 0.2, 0.3, 1 ],
      outputRange: [ 0.5, 1.2, 1, 1 ],
    });

    const rndScale = Math.random()*0.2+0.4;

    return { y, x, alpha, scaleX, rndScale };
  }

  render(){
    const { y, x, alpha, scaleX, rndScale } = this._getInterpolateValue();

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