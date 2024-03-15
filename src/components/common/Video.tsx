import {View, useWindowDimensions} from 'react-native';
import RNVideo from 'react-native-video';
import common from '../../styles/sharedStyles';

const Video = ({uri}) => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const {flex1} = common;

  return (
    <View
      style={[
        flex1,
        {
          width: windowWidth,
          height: windowHeight * 0.6,
        },
      ]}>
      <RNVideo source={{uri}} style={flex1} resizeMode="stretch" />
    </View>
  );
};

export default Video;
