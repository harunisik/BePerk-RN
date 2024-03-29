import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {getVideoFeed} from '../../services/UserService';
import {useCustomQuery} from '../../hooks/commonHooks';
import {useState} from 'react';
import Video from '../../components/common/Video';

const {flex1, dashed} = common;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ForYouTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {data, refetch, isFetching} = useCustomQuery(getVideoFeed, {
    filter: 1,
    limit: 10,
    offset: 0,
  });

  return (
    <View style={flex1}>
      {data && (
        <AnimatedPagerView
          style={flex1}
          initialPage={0}
          layoutDirection="ltr"
          orientation="vertical"
          onPageScroll={event => {
            setCurrentIndex(event.nativeEvent.position);
          }}>
          {data?.feed.map((page, index) => (
            <View key={page.id} collapsable={false}>
              <Video uri={page.filename} paused={index !== currentIndex} />
            </View>
          ))}
        </AnimatedPagerView>
      )}
    </View>
  );
};

export default ForYouTab;
