import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {useMemo, useState} from 'react';
import PagerItem from './ForYouPagerItem';
import {useRoute} from '@react-navigation/native';

const {flex1} = common;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const FeaturedItemDetails = () => {
  const route = useRoute();
  const {
    params: {data, index: indexParam},
  } = route;
  const [currentIndex, setCurrentIndex] = useState(indexParam);

  const windowSize = 5;
  const start = indexParam < windowSize ? 0 : indexParam - windowSize;
  const end =
    indexParam + windowSize > data.length
      ? data.length
      : indexParam + windowSize;

  const newData = data.slice(start, end);

  const newIndex =
    indexParam < windowSize
      ? indexParam
      : indexParam + windowSize > data.length
        ? windowSize + data.length - indexParam
        : windowSize;

  return (
    <View style={flex1}>
      {useMemo(
        () =>
          newData && (
            <AnimatedPagerView
              style={flex1}
              initialPage={newIndex}
              orientation="vertical"
              onPageSelected={event => {
                setCurrentIndex(event.nativeEvent.position);
              }}>
              {newData.map((item, index) => {
                return (
                  <View key={index} collapsable={false}>
                    <PagerItem item={item} paused={index !== currentIndex} />
                  </View>
                );
              })}
            </AnimatedPagerView>
          ),
        [newData, currentIndex],
      )}
    </View>
  );
};

export default FeaturedItemDetails;
