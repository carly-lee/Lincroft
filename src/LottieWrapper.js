import React, { PropTypes, PureComponent } from 'react';
import { Animated, View } from 'react-native';
import Animation from 'lottie-react-native';

class LottieWrapper extends PureComponent{
  static propTypes = {
    source: PropTypes.object.isRequired,
    autoPlay: PropTypes.bool,
    duration: PropTypes.number,
    onCompleted: PropTypes.func,
    style: View.propTypes.style,
  }

  static defaultProps = {
    duration: 1000,
  }

  constructor( props ){
    super( props );
    this.state = {
      progress: new Animated.Value( 0 ),
      isStopped: false,
    };
  }

  componentDidMount(){
    if( this.props.autoPlay ){this.playAnimation();}
  }

  playAnimation = () => {
    this.state.progress.setValue( 0 );
    Animated.timing( this.state.progress, {
      toValue: 1,
      duration: this.props.duration,
    }).start( this._animationCompleted );
  }

  _animationCompleted = () => {
    if ( this.props.onCompleted ){this.props.onCompleted();}
  }

  render(){
    return (
      <Animation
        style={ this.props.style }
        source={ this.props.source }
        progress={ this.state.progress }
      />
    );
  }
}

export default LottieWrapper;