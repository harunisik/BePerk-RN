import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ProgressBar from '../../components/common/ProgressBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import Emoji from '../../components/common/Emoji';

const StoryViewItem = ({item}) => {
  const {
    white,
    font11,
    gray,
    row,
    cGap5,
    jcSpaceBetween,
    jcCenter,
    flex1,
    aiCenter,
  } = common;

  return (
    <ImageBackground
      source={{uri: item.filename}}
      resizeMode="cover"
      style={[flex1, jcCenter]}>
      <View style={[jcSpaceBetween, flex1]}>
        <View>
          {/* <ProgressBar duration={5000} /> */}
          <View style={[row, jcSpaceBetween, aiCenter]}>
            <View style={[row, cGap5, aiCenter]}>
              <MaterialIcons name="account-circle" size={30} color="white" />
              <Text style={white}>{item.fullname}</Text>
              <Text style={[font11, white]}>
                {dateDiff(item.upload_time * 1000)}
              </Text>
            </View>
            <Text style={white}>Left</Text>
          </View>
        </View>

        <View style={[row, jcSpaceBetween]}>
          <Text style={white}>Viewed:</Text>
          <View style={[row, cGap5]}>
            <MaterialIcons name="account-circle" size={30} color="white" />
            <MaterialIcons name="account-circle" size={30} color="white" />
            <MaterialIcons name="account-circle" size={30} color="white" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const ProgressBarSet = ({length, activeIndex = 0}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const {row, cGap3, flex1} = common;

  return (
    <View style={[row, cGap3]}>
      {Array.from({length}, (_item, index) => {
        console.log(index);
        return (
          <View style={[flex1]}>
            <ProgressBar
              duration={3000}
              key={index}
              play={index === currentIndex}
              onIntervalEnd={() => setCurrentIndex(prevIndex => prevIndex + 1)}
            />
          </View>
        );
      })}
    </View>
  );
};

const StoryView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {data, index, item},
  } = route;
  const {flex1} = common;
  const [loopIndex, setLoopIndex] = useState(0);

  // const handleProgressBar = () => {
  //   setLoopIndex(prevIndex => prevIndex + 1);
  // };

  return (
    <View style={flex1}>
      <ProgressBarSet
        length={5}
        activeIndex={loopIndex}
        // onIntervalEnd={handleProgressBar}
      />
      <StoryViewItem item={item} />
    </View>
  );
};

export default StoryView;
