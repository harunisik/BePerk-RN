import {FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import PostsDetailsItem from '../../components/profile/PostsDetailsItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useCallback, useEffect, useRef, useState} from 'react';

const PostsDetails = () => {
  const [viewableItem, setViewableItem] = useState(0);
  const flatList = useRef<FlatList>(null);
  const route = useRoute();
  // const {
  //   params: {data, index: indexParam, item},
  // } = route;

  const handleScrollToIndexFailed = ({index}) => {
    // console.log('handleScrollToIndexFailed');
    // const wait = new Promise(resolve => setTimeout(resolve, 500));
    // wait.then(() => {
    //   flatList.current?.scrollToIndex({index, animated: false});
    // });
    // setTimeout(() => {
    //   flatList.current?.scrollToOffset({offset: 1500, animated: false});
    // }, 1500);
  };

  // useEffect(() => {
  // flatList.current?.scrollToIndex({index: indexParam, animated: false});
  // flatList.current?.scrollToItem({item, animated: true});
  // }, [indexParam]);

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible />,
    [],
  );

  return (
    <FlatList
      ref={flatList}
      data={route.params?.data}
      renderItem={({item, index}) => (
        <PostsDetailsItem item={item} videoPaused={index !== viewableItem} />
      )}
      keyExtractor={item => item.id}
      // onRefresh={refetch}
      // refreshing={isFetching}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      // initialScrollIndex={indexParam}
      // initialNumToRender={20}
      onLayout={event => {
        setTimeout(() => {
          // flatList.current?.scrollToOffset({offset: 1500, animated: false});
          // flatList.current?.scrollToIndex({index: indexParam, animated: false});
        }, 0);
      }}
      onViewableItemsChanged={({viewableItems}) => {
        if (viewableItems.length > 0) {
          const element = viewableItems[0];
          if (element.index) {
            setViewableItem(element.index);
          }
        }
      }}
      viewabilityConfig={{viewAreaCoveragePercentThreshold: 100}}
    />
  );
};

export default PostsDetails;
