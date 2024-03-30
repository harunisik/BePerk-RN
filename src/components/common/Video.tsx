import {
  Pressable,
  StyleProp,
  View,
  ViewProps,
  useWindowDimensions,
} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';

const {flex1} = common;

interface VideoProps extends ReactVideoProps {
  uri: string;
  paused?: boolean;
  fullscreen?: boolean;
}

const Video = ({
  uri,
  paused = true,
  fullscreen = false,
  ...rest
}: VideoProps) => {
  const [videoPaused, setVideoPaused] = useState(paused);

  useEffect(() => {
    setVideoPaused(paused);
  }, [paused]);

  return (
    <Pressable style={flex1} onPress={() => setVideoPaused(!videoPaused)}>
      <RNVideo
        source={{uri}}
        style={{
          width: '100%',
          height: '100%',
        }}
        // resizeMode="stretch"
        paused={videoPaused}
        {...rest}
      />
    </Pressable>
  );
};

export default Video;
