import {MasonryFlashList} from '@shopify/flash-list';
import PostItem, {IMAGE_HEIGHT} from './PostItem';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from '../common/ListEmptyComponent';

const COL_NUM = 3;

interface PostItemListProps {
  data: any;
  isFetching: boolean;
  refetch: any;
  remove?: any;
  onPressItem: (index: number) => void;
  fetchNextPage?: any;
  hasNextPage?: boolean;
  useTabView?: boolean;
  imageHeight?: number;
  videoHeight?: number;
}

const PostItemList = ({
  data,
  isFetching,
  refetch,
  remove,
  onPressItem,
  fetchNextPage,
  hasNextPage = true,
  useTabView = false,
  imageHeight,
  videoHeight,
}: PostItemListProps) => {
  const ListComp = useTabView ? Tabs.MasonryFlashList : MasonryFlashList;

  return (
    <ListComp
      data={data}
      renderItem={({item, index}) => (
        <PostItem
          item={item}
          onPress={() => onPressItem(index)}
          imageHeight={imageHeight}
          videoHeight={videoHeight}
        />
      )}
      keyExtractor={item => item.id}
      onRefresh={() => {
        if (remove) {
          remove();
        }
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => {
        if (!isFetching && hasNextPage) {
          if (fetchNextPage) {
            fetchNextPage();
          }
        }
      }}
      numColumns={COL_NUM}
      estimatedItemSize={IMAGE_HEIGHT}
      contentContainerStyle={{paddingBottom: 10}}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default PostItemList;
