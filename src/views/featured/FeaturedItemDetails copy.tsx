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
  const [windowIndex, setWindowIndex] = useState(-1);
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

  useEffect(() => {
    // if (windowIndex === 0 && dataIndex > 0) {
    //   setNewData(prevData => {
    //     const start = dataIndex < WINDOW_SIZE ? 0 : dataIndex - WINDOW_SIZE;
    //     const newIndex = dataIndex - start;
    //     setWindowIndex(newIndex);
    //     ref.current?.setPageWithoutAnimation(newIndex);
    //     return [...data.slice(start, dataIndex), ...prevData];
    //   });
    // }
    // if (windowIndex === newData.length - 1 && dataIndex < data.length - 1) {
    //   setNewData(prevData => {
    //     const end =
    //       dataIndex + WINDOW_SIZE > data.length
    //         ? data.length
    //         : dataIndex + WINDOW_SIZE + 1;
    //     return [...prevData, ...data.slice(dataIndex + 1, end)];
    //   });
    // }
  }, [windowIndex]);

  console.log('windowIndex:' + windowIndex, 'dataIndex:' + dataIndex);

  return (
    <View style={flex1}>
      {
        // useMemo(() => (
        <AnimatedPagerView
          ref={ref}
          style={flex1}
          initialPage={initialPage}
          orientation="vertical"
          onPageSelected={({nativeEvent: {position}}) => {
            setWindowIndex(prevPosition => {
              if (prevPosition !== -1) {
                if (prevPosition < position) {
                  setDataIndex(prevIndex => prevIndex + 1);
                } else if (prevPosition > position) {
                  setDataIndex(prevIndex => prevIndex - 1);
                }
              }
              // console.log(
              //   'windowIndex:' + position,
              //   'dataIndex:' + (dataIndex - 1),
              // );

              const temp = dataIndex - 1;
              if (position === 0 && temp > 0) {
                const start = temp < WINDOW_SIZE ? 0 : temp - WINDOW_SIZE;
                const newIndex = temp - start;
                // setWindowIndex(newIndex);
                ref.current?.setPageWithoutAnimation(newIndex);
                setNewData(prevData => {
                  return [...data.slice(start, dataIndex), ...prevData];
                });
                return newIndex;
              }

              return position;
            });
          }}>
          {newData.map((item, index) => {
            return (
              <View key={index} collapsable={false}>
                <PagerItem item={item} paused={index !== windowIndex} />
              </View>
            );
          })}
        </AnimatedPagerView>

        //) ,[newData, windowIndex],)
      }
    </View>
  );
};

export default FeaturedItemDetails;
