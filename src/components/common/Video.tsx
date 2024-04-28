import {Pressable} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {absolute, jcCenter, aiCenter} = common;

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
  const [width, setWidth] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setVideoPaused(paused);
      return () => setVideoPaused(true);
    }, [paused]),
  );

  return (
    <Pressable
      style={[aiCenter, jcCenter]}
      onPress={() => setVideoPaused(!videoPaused)}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
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
      {videoPaused && (
        <MaterialIcons
          name="play-arrow"
          size={width / 3}
          color="rgba(255, 255, 255, 0.6)"
          style={absolute}
        />
      )}
    </Pressable>
  );
};

export default Video;
