import {FlatList} from 'react-native';
import CommentItem from './CommentItem';
import CommentHeaderItem from './CommentHeaderItem';
import {useCallback, useMemo} from 'react';
import ItemSeperator from '../common/ItemSpearator';
import common from '../../styles/sharedStyles';

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
  headerItem,
  onPressReply,
  data,
  isFetching,
  onRefresh,
  onDeleteItem,
  isHeaderVisible = false,
}) => {
  const result = useMemo(() => transformCommentList(data?.comment), [data]);
  const {ph15, pv15} = common;

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator medium />,
    [],
  );

  return (
    <FlatList
      data={result}
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
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={[ph15, pv15]}
      {...(isHeaderVisible && {
        ListHeaderComponent: <CommentHeaderItem item={headerItem} />,
      })}
    />
  );
};

export default CommentList;
