import React, { PropTypes } from 'react';
import { Platform, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HeartIcon = ({ scale }) => {

  if( Platform.OS === 'ios' ){
    return (
      <Svg style={{ flex: 1 }} width={ 67 } height={ 58 }>
        <Path scale={ scale } d="M33.5 8.104C29.848 3.32 24.254 0 18.425 0 8.107 0 0 8.338 0 17.94c0 11.785 11.39 21.386 28.642 35.944L33.5 58l4.858-4.083C55.61 39.327 67 29.725 67 17.94 67 8.338 58.892 0 48.576 0 42.746 0 37.15 3.32 33.5 8.104z" fill="#FF008A" />
      </Svg>
    );
  }else{
    return <Image style={{ transform: [{ scale }]}} source={{ uri: 'heart_icon' }} />;
  }
};

HeartIcon.propTypes = {
  scale: PropTypes.number,
};

HeartIcon.defaultProps = {
  scale: 1,
};

export default HeartIcon;