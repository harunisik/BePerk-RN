import {SafeAreaView, View} from 'react-native';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import MessageBox from '../../components/common/MessageBox';
import CommentList from '../../components/doves/CommentList';
import {useRoute} from '@react-navigation/native';
import {useQuery, useMutation} from '../../hooks/customHooks';
import {
  getUserComments,
  deleteComment as userDeleteComment,
  postComment as userPostComment,
} from '../../services/UserService';

const Comment = () => {
  const route = useRoute();
  const {
    params: {id, type, fullname, username, userId, caption, uploadTime},
  } = route;
  const [selectedComment, setSelectedComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(id);
  const {flex1} = common;

  const {data, refetch, isFetching} = useQuery(getUserComments, {id, type});

  const postComment = useMutation(userPostComment);
  const deleteComment = useMutation(userDeleteComment);

  const handleRefresh = () => {
    clearSelectedComment();
    refetch();
  };

  const clearSelectedComment = () => {
    setSelectedComment('');
    setSelectedCommentId(id);
  };

  return (
    <SafeAreaView style={flex1}>
      <CommentList
        data={data}
        fullname={fullname}
        username={username}
        userId={userId}
        caption={caption}
        uploadTime={uploadTime}
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
        isHeaderVisible={type === 3}
      />

      <MessageBox
        initialText={selectedComment}
        onPress={comment => {
          if (comment) {
            postComment.mutate(
              {
                comment,
                id,
                type,
                ...(id !== selectedCommentId && {
                  comment_id: selectedCommentId,
                }),
              },
              {onSuccess: () => clearSelectedComment()},
            );
          }
        }}
        onClearText={clearSelectedComment}
      />
    </SafeAreaView>
  );
};

export default Comment;
