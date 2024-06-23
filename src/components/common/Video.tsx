import {ActivityIndicator, Pressable} from 'react-native';
import RNVideo, {ReactVideoProps} from 'react-native-video';
import common from '../../styles/sharedStyles';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {PlayIcon} from './Icons';
import Text from './Text';
import {ProgressBar} from 'react-native-paper';
import View from './View';

const {absolute, jcCenter, aiCenter} = common;

type VideoProps = ReactVideoProps & {
  uri: string;
  paused?: boolean;
};

const Video = ({uri, paused = false, ...rest}: VideoProps) => {
  const [displayIcon, setDisplayIcon] = useState(false);
  const [_paused, setPaused] = useState(paused);
  const [isBuffering, setIsBuffering] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playableDuration, setPlayableDuration] = useState(0);
  const [seekableDuration, setSeekableDuration] = useState(0);
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
      onPress={() => {
        setPaused(!_paused);
        setDisplayIcon(!displayIcon);
      }}
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
          setIsBuffering(isBuffering);
          setError(false);
        }}
        onLoad={({currentTime, duration}) => {
          // console.log(currentTime, duration);
        }}
        onError={error => {
          console.log(error);
          setError(true);
        }}
        onProgress={e => {
          setPlayableDuration(e.playableDuration);
          setSeekableDuration(e.seekableDuration);
          setProgress(e.currentTime / e.playableDuration);
        }}
        // controls
        {...rest}
      />
      {displayIcon && _paused && <PlayIcon size={width / 4} style={absolute} />}
      {isBuffering && <ActivityIndicator style={absolute} />}

      {/* {error && (
        <Text style={absolute} color="white">
          Video not displaying
        </Text>
      )} */}
    </Pressable>
    // <View
    //   style={{
    //     flexDirection: 'row',
    //     width: '100%',
    //     padding: 5,
    //     position: 'absolute',
    //     left: 0,
    //     bottom: 0,
    //     alignItems: 'center',
    //   }}>
    //   <Text size={13}>{seekableDuration}</Text>
    //   <View style={{flex: 1, paddingHorizontal: 5}} disableTheme>
    //     <ProgressBar
    //       style={[
    //         {
    //           height: 3,
    //         },
    //       ]}
    //       color="#0AAEEF"
    //       progress={progress}
    //     />
    //   </View>
    //   <Text size={13}>{playableDuration}</Text>
    // </View>
  );
};

export default Video;
