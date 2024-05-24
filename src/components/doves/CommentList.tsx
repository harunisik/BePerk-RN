import CommentItem from './CommentItem';
import CommentHeaderItem from './CommentHeaderItem';
import {useMemo} from 'react';
import common from '../../styles/sharedStyles';
import FlatList from '../common/FlatList';

const findTopParent = (searchId, dataList) => {
  const parent = dataList.find(({id}) => id === searchId);
  if (parent.comment_id === 0) {
    return parent;
  }

  return findTopParent(parent.comment_id, dataList);
};

const transformCommentList = commentList => {
  return commentList?.reduce((acc, item) => {
    const {comment_id} = item;

    if (comment_id === 0) {
      acc.push(item);
    } else {
      const topParent = findTopParent(comment_id, commentList);
      if (!topParent.childList) {
        topParent.childList = [];
      }
      topParent.childList.push(item);
    }

    return acc;
  }, []);
};

const CommentList = ({
  fullname,
  username,
  userId,
  caption,
  uploadTime,
  onPressReply,
  data,
  isFetching,
  onRefresh,
  onDeleteItem,
  isHeaderVisible = false,
}) => {
  const result = useMemo(() => transformCommentList(data?.comment), [data]);
  const {ph15, pv15} = common;

  return (
    <FlatList
      data={result}
      renderItem={({item}) => (
        <CommentItem
          item={item}
          onDelete={onDeleteItem}
          onPressReply={onPressReply}
        />
      )}
      onRefresh={onRefresh}
      refreshing={isFetching}
      contentContainerStyle={[ph15, pv15]}
      {...(isHeaderVisible && {
        ListHeaderComponent: (
          <CommentHeaderItem
            fullname={fullname}
            username={username}
            userId={userId}
            caption={caption}
            uploadTime={uploadTime}
          />
        ),
      })}
    />
  );
};

export default CommentList;
