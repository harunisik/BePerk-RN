import {FlatList} from 'react-native';
import PostItem from './PostItem';

const COL_NUM = 3;

const PostItemList = ({
  data,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  onPressItem,
  hasNextPage = true,
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PostItem
          item={item}
          onPress={() => {
            if (data.length > index) {
              onPressItem();
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
      onEndReached={() => {
        !isFetching && hasNextPage && fetchNextPage();
      }}
      numColumns={COL_NUM}
      contentContainerStyle={{paddingBottom: 10}}
    />
  );
};

export default PostItemList;
