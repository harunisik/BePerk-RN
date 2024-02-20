import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import {useMutation, useQuery} from 'react-query';
import {
  deleteComment,
  getUserComments,
  postComment,
} from '../../services/UserService';
import {useState} from 'react';
import MessageBox from '../../components/common/MessageBox';
import CommentList from '../../components/doves/CommentList';
import {showMessage} from 'react-native-flash-message';

const Comment = ({
  route: {
    params: {comment: headerComment},
  },
}) => {
  const [selectedComment, setSelectedComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(headerComment.id);
  const {flex1} = common;

  const {data, refetch, isFetching} = useQuery({
    queryKey: [
      'getUserComments',
      {id: headerComment.id, type: headerComment.type},
    ],
    queryFn: getUserComments,
  });

  const handleSendComment = useMutation({
    mutationFn: newComment => postComment(newComment),
    onSuccess: () => handleRefresh(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  const handleDeleteComment = useMutation({
    mutationFn: comment => deleteComment(comment),
    onSuccess: () => {
      handleRefresh();
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  const handleRefresh = () => {
    clearSelectedComment();
    refetch();
  };

  const clearSelectedComment = () => {
    setSelectedComment('');
    setSelectedCommentId(headerComment.id);
  };

  return (
    <View style={flex1}>
      <CommentList
        headerComment={headerComment}
        data={data}
        isFetching={isFetching}
        onRefresh={handleRefresh}
        onPressReply={(message, commentId) => {
          setSelectedComment(message);
          setSelectedCommentId(commentId);
        }}
        onDeleteItem={item =>
          handleDeleteComment.mutate({id: item.id, isMy24: 0})
        }
      />

      <MessageBox
        initialText={selectedComment}
        onPress={message => {
          if (message) {
            handleSendComment.mutate({
              comment: message,
              id: headerComment.id,
              type: headerComment.type,
              ...(headerComment.id !== selectedCommentId && {
                comment_id: selectedCommentId,
              }),
            });
          }
        }}
        onClearText={clearSelectedComment}
      />
    </View>
  );
};

export default Comment;
