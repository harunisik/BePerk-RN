import {useState} from 'react';
import PostDetailItem from './PostDetailItem';
import InfiniteFlatList from '../common/InfiniteFlatList';

const PostDetailItemList = ({
  data,
  fetchNextPage,
  isFetching,
  refetch,
  remove,
  ...rest
}) => {
  const [viewableItem, setViewableItem] = useState(0);

  return (
    <InfiniteFlatList
      data={data}
      renderItem={({item, index}) => (
        <PostDetailItem
          id={item.id}
          type={item.type}
          userId={item.user_id}
          username={item.username}
          fullname={item.fullname}
          caption={item.caption}
          bookmark={item.bookmark}
          filename={item.filename}
          cover={item.cover}
          liked={item.liked}
          likesCount={item.likes_count}
          commentsCount={item.comments_count}
          uploadTime={item.upload_time}
          isViewable={index === viewableItem}
          width={item.width}
          height={item.height}
          subscribed={item.subscribed}
        />
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
      {...rest}
    />
  );
};

export default PostDetailItemList;
