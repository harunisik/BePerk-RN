import {useState} from 'react';
import PostDetailItem from './PostDetailItem';
import InfiniteFlatList from '../common/InfiniteFlatList';

const PostDetailItemList = ({
  data,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  hasNextPage = true,
}) => {
  const [viewableItem, setViewableItem] = useState(0);

  return (
    <InfiniteFlatList
      data={data}
      renderItem={({item, index}) => (
        <PostDetailItem item={item} isViewable={index === viewableItem} />
      )}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      onViewableItemsChanged={({viewableItems}) => {
        if (viewableItems.length > 0) {
          const element = viewableItems[0];
          if (element.index) {
            setViewableItem(element.index);
          }
        }
      }}
    />
  );
};

export default PostDetailItemList;
