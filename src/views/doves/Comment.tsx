import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import MessageBox from '../../components/common/MessageBox';
import CommentList from '../../components/doves/CommentList';
import {useRoute} from '@react-navigation/native';
import {
  useCustomQuery as useQuery,
  useCustomMutation as useMutation,
} from '../../hooks/commonHooks';
import {
  getUserComments,
  deleteComment as userDeleteComment,
  postComment as userPostComment,
} from '../../services/UserService';

const Comment = () => {
  const route = useRoute();
  const {
    params: {item},
  } = route;
  const [selectedComment, setSelectedComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(item.id);
  const {flex1} = common;

  const {data, refetch, isFetching} = useQuery(
    getUserComments,
    {id: item.id, type: item.type},
    route.key,
  );

  const postComment = useMutation(userPostComment, route.key);
  const deleteComment = useMutation(userDeleteComment, route.key);

  const handleRefresh = () => {
    clearSelectedComment();
    refetch();
  };

  const clearSelectedComment = () => {
    setSelectedComment('');
    setSelectedCommentId(item.id);
  };

  return (
    <View style={flex1}>
      <CommentList
        headerItem={item}
        data={data}
        isFetching={isFetching}
        onRefresh={handleRefresh}
        onPressReply={(message, commentId) => {
          setSelectedComment(message);
          setSelectedCommentId(commentId);
        }}
        onDeleteItem={({id}) =>
          deleteComment.mutate(
            {id, isMy24: 0},
            {onSuccess: () => clearSelectedComment()},
          )
        }
        isHeaderVisible={item.type === 3}
      />

      <MessageBox
        initialText={selectedComment}
        onPress={comment => {
          if (comment) {
            postComment.mutate(
              {
                comment,
                id: item.id,
                type: item.type,
                ...(item.id !== selectedCommentId && {
                  comment_id: selectedCommentId,
                }),
              },
              {onSuccess: () => clearSelectedComment()},
            );
          }
        }}
        onClearText={clearSelectedComment}
      />
    </View>
  );
};

export default Comment;
