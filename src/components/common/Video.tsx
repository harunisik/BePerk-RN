import {Pressable} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PlayIcon} from './Icons';

const {absolute, jcCenter, aiCenter} = common;

interface VideoProps extends ReactVideoProps {
  uri: string;
  paused?: boolean;
}

const Video = ({uri, paused = true, ...rest}: VideoProps) => {
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
        // controls
        {...rest}
      />
      {videoPaused && <PlayIcon size={width / 3} style={absolute} />}
    </Pressable>
  );
};

export default Video;
