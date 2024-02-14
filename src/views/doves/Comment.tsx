import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {useMutation, useQuery} from 'react-query';
import {
  deleteComment,
  getUserComments,
  postComment,
} from '../../services/UserService';
import {dateDiff} from '../../utils/DateUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMemo, useState} from 'react';
import {CommentLike} from '../profile/Doves';
import {Swipeable} from 'react-native-gesture-handler';

const CommentItem = ({
  item,
  isChild = false,
  refetch = undefined,
  reply = undefined,
}) => {
  const {
    row,
    rGap5,
    rGap15,
    cGap5,
    cGap10,
    bold,
    font11,
    gray,
    jcSpaceBetween,
    flex1,
    pr10,
    ml30,
    p15,
    pb5,
  } = common;

  const [showReplies, setShowReplies] = useState(false);

  const handleViewReply = () => {
    setShowReplies(showReplies ? false : true);
  };

  const handleDeleteComment = useMutation({
    mutationFn: comment => deleteComment(comment),
    onSuccess: () => {
      if (refetch !== undefined) {
        refetch();
      }
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    return (
      <Animated.View style={[styles.deleteButton]}>
        <TouchableOpacity
          onPress={() => handleDeleteComment.mutate({id: item.id, isMy24: 0})}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={[p15, pb5, row, cGap10, ...(isChild ? [ml30] : [])]}>
          <MaterialCommunityIcons name="account" size={26} />
          <View style={[row, jcSpaceBetween, flex1, cGap10]}>
            <View style={[rGap15, flex1]}>
              <View style={[rGap5]}>
                <Text style={pr10}>
                  <Text style={bold}>{item.fullname + ' '}</Text>
                  <Text>{item.comment + ' ' + item.id}</Text>
                </Text>
                <View style={[row, cGap5]}>
                  <Text style={[font11, gray]}>
                    {dateDiff(item.date * 1000)}
                  </Text>
                  <Text
                    style={[font11, gray]}
                    onPress={() => {
                      if (reply !== undefined) {
                        reply(`@${item.username}`, item.id);
                      }
                    }}>
                    Reply
                  </Text>
                </View>
              </View>
              {!isChild && item.childList?.length > 0 && (
                <TouchableOpacity onPress={handleViewReply}>
                  <Text style={[font11, gray]}>
                    {showReplies
                      ? 'Hide replies'
                      : `View ${item.childList.length} replies`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <CommentLike
                id={item.id}
                type={4}
                isLiked={item.liked}
                likes_count={item.likes_count}
              />
            </View>
          </View>
        </View>
      </Swipeable>
      {showReplies && (
        <FlatList
          data={item.childList}
          renderItem={({item: item2}) => (
            <CommentItem item={item2} refetch={refetch} reply={reply} isChild />
          )}
          keyExtractor={item2 => item2.id}
        />
      )}
    </View>
  );
};

const CommentHeaderItem = ({item}) => {
  const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

  return (
    <View style={[styles.headerContainer, row, cGap10]}>
      <View>
        <MaterialCommunityIcons name="account" size={26} />
      </View>
      <View style={[rGap15, flex1]}>
        <Text style={pr10}>
          <Text style={bold}>{item.fullname + ' '}</Text>
          <Text>{item.caption}</Text>
        </Text>
        <Text style={[font11, gray]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
    </View>
  );
};

const findTopParent = (id, data) => {
  const parent = data.find(item => item.id === id);
  if (parent.comment_id === 0) {
    return parent;
  }

  return findTopParent(parent.comment_id, data);
};

const Emoji = ({emoji, onPress = undefined}) => {
  const {font20} = common;
  return (
    <Text
      style={font20}
      onPress={() => {
        if (onPress !== undefined) {
          onPress(prev => prev + emoji);
        }
      }}>
      {emoji}
    </Text>
  );
};

const Comment = ({
  route: {
    params: {comment},
  },
}) => {
  const [message, setMessage] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(comment.id);

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserComments', {id: comment.id, type: comment.type}],
    queryFn: getUserComments,
  });

  const handleSendComment = useMutation({
    mutationFn: newComment => postComment(newComment),
    onSuccess: () => {
      setMessage('');
      setSelectedCommentId(comment.id);
      refetch();
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  const result = useMemo(
    () =>
      data?.comment.reduce((acc, item) => {
        const {comment_id} = item;

        if (comment_id === 0) {
          acc.push(item);
        } else {
          const topParent = findTopParent(comment_id, data.comment);
          if (!topParent.childList) {
            topParent.childList = [];
          }
          topParent.childList.push(item);
        }

        return acc;
      }, []),
    [data],
  );

  const {row, jcSpaceBetween, p10, flex1, aiCenter} = common;

  return (
    <View style={flex1}>
      <FlatList
        data={result}
        ListHeaderComponent={<CommentHeaderItem item={comment} />}
        renderItem={({item}) => (
          <CommentItem
            item={item}
            refetch={refetch}
            reply={(message, commentId) => {
              setMessage(message);
              setSelectedCommentId(commentId);
            }}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <View style={[p10, styles.shadowProp]}>
          <View style={[row, jcSpaceBetween]}>
            {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(
              item => {
                return <Emoji emoji={item} onPress={setMessage} />;
              },
            )}
          </View>
          <View style={[row, jcSpaceBetween, aiCenter]}>
            <MaterialCommunityIcons name="account" size={26} />
            <TextInput
              placeholder="Message..."
              onChangeText={setMessage}
              value={message}
              style={styles.textInput}
              onSubmitEditing={() => {
                if (message) {
                  handleSendComment.mutate({
                    comment: message,
                    id: comment.id,
                    type: comment.type,
                    ...(comment.id !== selectedCommentId && {
                      comment_id: selectedCommentId,
                    }),
                  });
                }
              }}
            />
            <MaterialCommunityIcons
              name="share"
              size={26}
              color={message ? 'blue' : 'gray'}
              onPress={() =>
                handleSendComment.mutate({
                  comment: message,
                  id: comment.id,
                  type: comment.type,
                  ...(comment.id !== selectedCommentId && {
                    comment_id: selectedCommentId,
                  }),
                })
              }
              disabled={!message}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'white',
    height: 100,
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default Comment;
