import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {getVideoFeed} from '../../services/UserService';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {useMemo, useState} from 'react';
import PagerItem from '../../components/home/ForYouPagerItem';

const {flex1} = common;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ForYouTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {data} = useQuery(getVideoFeed, {
    filter: 1,
    limit: 5,
    offset: 0,
  });

  return (
    <View style={flex1}>
      {useMemo(
        () =>
          data && (
            <AnimatedPagerView
              style={flex1}
              initialPage={0}
              orientation="vertical"
              onPageSelected={event => {
                setCurrentIndex(event.nativeEvent.position);
              }}>
              {data.feed.map((item, index) => {
                return (
                  <View key={index} collapsable={false}>
                    <PagerItem item={item} paused={index !== currentIndex} />
                  </View>
                );
              })}
            </AnimatedPagerView>
          ),
        [data, currentIndex],
      )}
    </View>
  );
};

export default ForYouTab;
