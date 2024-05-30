import {Animated} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {useEffect, useMemo, useState} from 'react';
import PagerItem from '../../components/home/PagerItem';
import {useRoute} from '@react-navigation/native';
import {useGetFeaturedFeed} from '../../hooks/infiniteQueryHooks';
import View from '../../components/common/View';

const {flex1} = common;
const WINDOW_SIZE = 5;
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const FeaturedItemDetails = () => {
  const route = useRoute();
  const {
    params: {index: indexParam},
  } = route;
  const [moveWindow, setMoveWindow] = useState(false);
  const [dataIndex, setDataIndex] = useState(indexParam);
  const {data, fetchNextPage} = useGetFeaturedFeed();

  const calculateStart = (index: number) => {
    let start = index - WINDOW_SIZE;
    return start < 0 ? 0 : start;
  };

  const calculateEnd = (index: number) => {
    let end = index + WINDOW_SIZE + 1;
    return end > data.length ? data.length : end;
  };

  const calculatePage = (index: number) => {
    return index < WINDOW_SIZE ? index : WINDOW_SIZE;
  };

  const getData = (index: number) => {
    const start = calculateStart(index);
    const end = calculateEnd(index);
    return data.slice(start, end);
  };

  const [newData, setNewData] = useState(() => getData(indexParam));

  const initialPage = useMemo(
    () => calculatePage(indexParam),
    [indexParam, data],
  );
  const [page, setPage] = useState(initialPage);

  const handlePageSelected = async ({nativeEvent: {position}}) => {
    // back
    if (page > position) {
      setDataIndex(prevIndex => prevIndex - 1);
      setPage(prevPage => prevPage - 1);
      setMoveWindow(position === 1);
      // forward
    } else if (page < position) {
      if (dataIndex + 1 === data.length - 2) {
        await fetchNextPage();
      }
      setDataIndex(prevIndex => prevIndex + 1);
      setPage(prevPage => prevPage + 1);
      setMoveWindow(position === newData.length - 2);
    }
  };

  useEffect(() => {
    if (moveWindow) {
      setMoveWindow(false);
      setPage(calculatePage(dataIndex));
      setNewData(getData(dataIndex));
    }
  }, [moveWindow]);

  return (
    <View style={flex1}>
      {useMemo(
        () => (
          <AnimatedPagerView
            style={flex1}
            initialPage={initialPage}
            orientation="vertical"
            onPageSelected={handlePageSelected}>
            {newData.map((item, index) => {
              return (
                <View key={item.id} collapsable={false}>
                  <PagerItem item={item} paused={page !== index} />
                </View>
              );
            })}
          </AnimatedPagerView>
        ),
        [newData, page],
      )}
    </View>
  );
};

export default FeaturedItemDetails;
