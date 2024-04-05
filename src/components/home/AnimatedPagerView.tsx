import {Animated, View} from 'react-native';
import common from '../../styles/sharedStyles';
import PagerView from 'react-native-pager-view';
import {useMemo} from 'react';
import {OnPageSelectedEventData} from 'react-native-pager-view/lib/typescript/PagerViewNativeComponent';
import {DirectEventHandler} from 'react-native/Libraries/Types/CodegenTypes';

const {flex1} = common;

interface ViewItemProps {
  item: any;
  isSelected: boolean;
}

interface AnimatedPagerViewProps {
  data: [any];
  PagerItem: React.ComponentType<ViewItemProps>;
  onPageSelected?: DirectEventHandler<OnPageSelectedEventData>;
  initialPage?: number;
  currentPage?: number;
  keyExtractor?: (item: any, index: number) => string;
}

const AnimatedPagerView = ({
  data,
  PagerItem,
  onPageSelected,
  initialPage = 0,
  currentPage = 0,
  keyExtractor,
}: AnimatedPagerViewProps) => {
  const RNAnimatedPagerView = useMemo(
    () => Animated.createAnimatedComponent(PagerView),
    [],
  );

  return (
    <View style={flex1}>
      {useMemo(
        () => (
          <RNAnimatedPagerView
            style={flex1}
            initialPage={initialPage}
            orientation="vertical"
            onPageSelected={onPageSelected}>
            {data.map((item, index) => {
              return (
                <View
                  key={keyExtractor ? keyExtractor(item, index) : index}
                  collapsable={false}>
                  <PagerItem item={item} isSelected={currentPage === index} />
                </View>
              );
            })}
          </RNAnimatedPagerView>
        ),
        [data, currentPage],
      )}
    </View>
  );
};

export default AnimatedPagerView;
