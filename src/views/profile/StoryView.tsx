import {ImageBackground, Text, View, useWindowDimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
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
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const route = useRoute();
  const {
    params: {data},
  } = route;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const tick = 200;
  const duration = 3000;
  const {jcSpaceBetween, jcCenter, flex1} = common;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= duration) {
          clearInterval(interval);
          if (currentIndex < data.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            return 0;
          }
          return duration;
        }
        return prevProgress + tick;
      });
    }, tick);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={[flex1]}>
      <ImageBackground
        source={{uri: data[currentIndex].filename}}
        resizeMode="contain"
        style={[flex1, jcCenter]}
        // width={windowWidth}
        // height={windowHeight}
      >
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
      </ImageBackground>
    </View>
  );
};

export default StoryView;
