import {FlatList} from 'react-native';
import {useCallback, useState} from 'react';
import ItemSeperator from '../common/ItemSpearator';
import PostDetailItem from './PostDetailItem';

const PostDetailItemList = ({
  data,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  hasNextPage = true,
}) => {
  const [viewableItem, setViewableItem] = useState(0);

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible />,
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PostDetailItem item={item} isViewable={index === viewableItem} />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparatorComponent}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && hasNextPage && fetchNextPage()}
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

export default PostDetailItemList;
