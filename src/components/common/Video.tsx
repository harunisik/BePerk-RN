import {View, useWindowDimensions} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';

interface VideoProps extends ReactVideoProps {
  uri: string;
}

const Video = ({uri, ...rest}: VideoProps) => {
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
      <RNVideo source={{uri}} style={flex1} resizeMode="stretch" {...rest} />
    </View>
  );
};

export default Video;
