import {Pressable} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PlayIcon} from './Icons';

const {absolute, jcCenter, aiCenter} = common;

type VideoProps = ReactVideoProps & {
  uri: string;
  paused?: boolean;
};

const Video = ({uri, paused = false, ...rest}: VideoProps) => {
  const [_paused, setPaused] = useState(paused);
  const [width, setWidth] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      setPaused(paused);
      return () => setPaused(true);
    }, [paused]),
  );

  return (
    <Pressable
      style={[aiCenter, jcCenter]}
      onPress={() => setPaused(!_paused)}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      <RNVideo
        source={{uri}}
        style={{
          width: '100%',
          height: '100%',
        }}
        // resizeMode="stretch"
        paused={_paused}
        // controls
        repeat
        // onProgress={({currentTime, playableDuration, seekableDuration}) =>
        //   console.log(currentTime, playableDuration, seekableDuration)
        // }
        onBuffer={({isBuffering}) => {
          // console.log(isBuffering);
        }}
        onLoad={({currentTime, duration}) => {
          // console.log(currentTime, duration);
        }}
        {...rest}
      />
      {_paused && <PlayIcon size={width / 4} style={absolute} />}
    </Pressable>
  );
};

export default Video;
