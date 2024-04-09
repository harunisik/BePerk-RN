import {FlatList} from 'react-native';
import {useCallback, useState} from 'react';
import PostsDetailsItem from '../../components/profile/PostsDetailsItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useGetUserFeed} from '../../hooks/featuredHooks';

const PostsTab = () => {
  const [viewableItem, setViewableItem] = useState(0);
  const {data, fetchNextPage, isFetching, refetch, remove} = useGetUserFeed(1);

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible />,
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PostsDetailsItem item={item} videoPaused={index !== viewableItem} />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
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

export default PostsTab;
