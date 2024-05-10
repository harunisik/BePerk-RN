import {MasonryFlashList} from '@shopify/flash-list';
import PostItem, {IMAGE_HEIGHT} from './PostItem';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from '../common/ListEmptyComponent';

const COL_NUM = 3;

const PostItemList = ({
  data,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  onPressItem,
  hasNextPage = true,
  useTabView = false,
}) => {
  const ListComp = useTabView ? Tabs.MasonryFlashList : MasonryFlashList;

  return (
    <ListComp
      data={data}
      renderItem={({item, index}) => (
        <PostItem
          item={item}
          onPress={() => {
            if (data.length > index) {
              onPressItem(index);
            }
          }}
        />
      )}
      keyExtractor={item => item.id}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && hasNextPage && fetchNextPage()}
      numColumns={COL_NUM}
      estimatedItemSize={IMAGE_HEIGHT}
      contentContainerStyle={{paddingBottom: 10}}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default PostItemList;
