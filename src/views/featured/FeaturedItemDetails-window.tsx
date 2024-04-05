import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {useEffect, useMemo, useRef, useState} from 'react';
import PagerItem from '../../components/home/ForYouPagerItem';
import {useRoute} from '@react-navigation/native';

const {flex1} = common;
const WINDOW_SIZE = 5;
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const FeaturedItemDetails = () => {
  const route = useRoute();
  const {
    params: {data, index: indexParam},
  } = route;
  const [page, setPage] = useState(-1);
  const [dataIndex, setDataIndex] = useState(indexParam);
  const [newData, setNewData] = useState(() => {
    const start = indexParam < WINDOW_SIZE ? 0 : indexParam - WINDOW_SIZE;
    const end =
      indexParam + WINDOW_SIZE > data.length
        ? data.length
        : indexParam + WINDOW_SIZE;

    return data.slice(start, end);
  });
  const ref = useRef<PagerView>(null);

  const initialPage = useMemo(
    () =>
      indexParam < WINDOW_SIZE
        ? indexParam
        : indexParam + WINDOW_SIZE > data.length
          ? WINDOW_SIZE + data.length - indexParam
          : WINDOW_SIZE,
    [indexParam, data],
  );

  console.log(
    'page:' + page,
    'dataIndex:' + dataIndex,
    'frameEnd:' + newData.length,
  );

  return (
    <View style={flex1}>
      {
        <AnimatedPagerView
          ref={ref}
          style={flex1}
          initialPage={initialPage}
          orientation="vertical"
          onPageSelected={event => {
            const position = event.nativeEvent.position;

            console.log('position:' + position, 'dataIndex:' + dataIndex);
            if (position === 1 && page > position) {
              const tempIndex = dataIndex - 2;
              setPage(tempIndex + 1);
              setDataIndex(tempIndex + 1);
              setNewData(prevData => {
                const start =
                  tempIndex < WINDOW_SIZE ? 0 : tempIndex - WINDOW_SIZE;
                return [...data.slice(start, tempIndex), ...prevData];
              });
            } else if (position === newData.length - 1) {
            } else {
              setPage(prevPage => {
                if (prevPage !== -1) {
                  if (prevPage < position) {
                    setDataIndex(prevIndex => prevIndex + 1); // forward
                  } else if (prevPage > position) {
                    setDataIndex(prevIndex => prevIndex - 1); // back
                  }
                }
                return position;
              });
            }
          }}>
          {newData.map((item, index) => {
            return (
              <View key={item.id} collapsable={false}>
                <PagerItem item={item} paused={index !== page} />
              </View>
            );
          })}
        </AnimatedPagerView>
      }
    </View>
  );
};

export default FeaturedItemDetails;
