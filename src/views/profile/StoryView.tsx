import {
  View,
  Text,
  GestureResponderEvent,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';

const ProgressBarSet = ({length, currentIndex, progress, duration}) => {
  const {cGap3, row, flex1} = common;

  return (
    <View style={[row, cGap3]}>
      {Array.from({length: length}, (_item, index) => {
        return (
          <View style={[flex1]} key={index}>
            <ProgressBar
              progress={
                index === currentIndex
                  ? progress / duration
                  : index < currentIndex + 1
                    ? 1
                    : 0
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const Header = ({item}) => {
  const {white, font11, row, cGap5, jcSpaceBetween, aiCenter} = common;

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <View style={[row, cGap5, aiCenter]}>
        <MaterialIcons name="account-circle" size={30} color="white" />
        <Text style={white}>{item.fullname}</Text>
        <Text style={[font11, white]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
      <Text style={white}>Left</Text>
    </View>
  );
};

const Footer = () => {
  const {white, row, cGap5, jcSpaceBetween} = common;

  return (
    <View style={[row, jcSpaceBetween]}>
      <Text style={white}>Viewed:</Text>
      <View style={[row, cGap5]}>
        <MaterialIcons name="account-circle" size={30} color="white" />
        <MaterialIcons name="account-circle" size={30} color="white" />
        <MaterialIcons name="account-circle" size={30} color="white" />
      </View>
    </View>
  );
};

const StoryView = () => {
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {data, index: indexParam},
  } = route;
  const [currentIndex, setCurrentIndex] = useState(indexParam);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const tick = 200;
  const duration = 5000;
  const {jcSpaceBetween, jcCenter, flex1} = common;

  useEffect(() => {
    if (!paused) {
      setPaused(false);

      const interval = setInterval(() => {
        setProgress(prevProgress => {
          // current slide finished
          if (prevProgress >= duration) {
            // has next
            if (currentIndex < data.length - 1) {
              setCurrentIndex(prevIndex => prevIndex + 1); // go to next slide
              return 0; // clear the progress
            } else {
              // no slide available
              clearInterval(interval);
              setFinished(true);
            }
          }
          return prevProgress + tick; // animation in progress
        });
      }, tick);

      setIntervalId(interval); // save the ID

      return () => clearInterval(interval); // comp did unmount
    }
  }, [currentIndex, paused]);

  useEffect(() => {
    if (finished) {
      navigation.goBack(); // close the page
    }
  }, [finished]);

  const handlePress = (event: GestureResponderEvent) => {
    const pressLocation =
      windowWidth / 2 > event.nativeEvent.locationX ? 'left' : 'right';

    if (
      (pressLocation === 'left' && currentIndex === 0) ||
      (pressLocation === 'right' && currentIndex >= data.length - 1)
    ) {
      clearInterval(intervalId);
      navigation.goBack();
    }

    setCurrentIndex(prevIndex => {
      if (pressLocation === 'left' && prevIndex > 0) {
        setProgress(0);
        return prevIndex - 1;
      }

      if (pressLocation === 'right' && prevIndex < data.length - 1) {
        setProgress(0);
        return prevIndex + 1;
      }

      return prevIndex;
    });
  };

  const handleLongPress = () => {
    clearInterval(intervalId);
    setPaused(true);
  };

  const handlePressOut = () => {
    setPaused(false);
  };

  return (
    <View style={[flex1]}>
      <ImageBackground
        source={{uri: data[currentIndex].filename}}
        resizeMode="contain"
        style={[flex1, jcCenter]}>
        <TouchableWithoutFeedback
          style={flex1}
          onPress={handlePress}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}>
          <View style={[jcSpaceBetween, flex1]}>
            <View>
              <ProgressBarSet
                length={data.length}
                currentIndex={currentIndex}
                duration={duration}
                progress={progress}
              />
              <Header item={data[currentIndex]} />
            </View>
            <Footer />
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

export default StoryView;
