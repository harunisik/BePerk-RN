import {Animated} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {getVideoFeed} from '../../services/UserService';
import {useMemo, useState} from 'react';
import PagerItem from '../../components/home/PagerItem';
import {useInfiniteQuery} from 'react-query';
import View from '../../components/common/View';

const {flex1} = common;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ForYouTab = () => {
  const [page, setPage] = useState(0);

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: [getVideoFeed.name],
    queryFn: ({pageParam = 0}) => {
      const limit = 25;
      return getVideoFeed(1, limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.feed?.length > 0 ? pages.length : undefined;
    },
  });

  const newData = useMemo(() => data?.pages.flatMap(({feed}) => feed), [data]);

  const handlePageSelected = ({nativeEvent: {position}}) => {
    setPage(position);
    if (newData && newData.length > 1) {
      if (position === newData.length - 2 && !isFetching) {
        fetchNextPage();
      }
    }
  };

  return (
    <View style={flex1}>
      {useMemo(
        () =>
          newData && (
            <AnimatedPagerView
              style={flex1}
              initialPage={0}
              orientation="vertical"
              onPageSelected={handlePageSelected}>
              {newData.map((item, index) => {
                return (
                  <View key={item.id}>
                    <PagerItem item={item} paused={page !== index} />
                  </View>
                );
              })}
            </AnimatedPagerView>
          ),
        [data, page],
      )}
    </View>
  );
};

export default ForYouTab;
