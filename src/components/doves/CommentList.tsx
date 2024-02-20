import {FlatList} from 'react-native';
import CommentItem from './CommentItem';
import CommentHeaderItem from './CommentHeaderItem';
import {useMemo} from 'react';

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
  headerComment,
  onPressReply,
  data,
  isFetching,
  onRefresh,
  onDeleteItem,
}) => {
  const result = useMemo(() => transformCommentList(data?.comment), [data]);

  return (
    <FlatList
      data={result}
      ListHeaderComponent={<CommentHeaderItem item={headerComment} />}
      renderItem={({item}) => (
        <CommentItem
          item={item}
          onDeleteComment={onDeleteItem}
          onPressReply={onPressReply}
        />
      )}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={isFetching}
    />
  );
};

export default CommentList;
