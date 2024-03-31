import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {useMemo} from 'react';
import {RNAnimatedPagerView} from '../../views/home/ForYouTab';

const {flex1} = common;

interface ViewItemProps {
  item: any;
  index: number;
}

interface AnimatedPagerViewProps {
  data: [any];
  ViewItem: React.ComponentType<ViewItemProps>;
  onPageSelected?: (position: number) => void;
}

const AnimatedPagerView = ({
  data,
  ViewItem,
  onPageSelected,
}: AnimatedPagerViewProps) => {
  // const RNAnimatedPagerView = useMemo(
  //   () => Animated.createAnimatedComponent(PagerView),
  //   [],
  // );

  return (
    <View style={flex1}>
      {
        // useMemo(() =>
        data && (
          <RNAnimatedPagerView
            style={flex1}
            initialPage={0}
            orientation="vertical"
            onPageScroll={event => {
              if (onPageSelected) {
                onPageSelected(event.nativeEvent.position);
              }
            }}>
            {data.map((item, index) => {
              return (
                <View key={index} collapsable={false}>
                  <ViewItem item={item} index={index} />
                </View>
              );
            })}
          </RNAnimatedPagerView>
        )
        //, [data, ViewItem],)
      }
    </View>
  );
};

export default AnimatedPagerView;
