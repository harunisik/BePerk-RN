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
import {useEffect, useMemo, useState} from 'react';
import {CommentLike} from '../profile/Doves';
import {Swipeable} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';

const CommentItem = ({
  item,
  isChild = false,
  onDeleteComment,
  onPressReply,
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
      onDeleteComment();
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
                  <Text>{item.comment}</Text>
                </Text>
                <View style={[row, cGap5]}>
                  <Text style={[font11, gray]}>
                    {dateDiff(item.date * 1000)}
                  </Text>
                  <Text
                    style={[font11, gray]}
                    onPress={() => {
                      onPressReply(`@${item.username}`, item.id);
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
            <CommentItem
              item={item2}
              onDeleteComment={onDeleteComment}
              onPressReply={onPressReply}
              isChild
            />
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

const Emoji = ({emoji, onPress}) => {
  const {font20} = common;
  return (
    <Text
      style={font20}
      onPress={() => {
        onPress(prev => prev + emoji);
      }}>
      {emoji}
    </Text>
  );
};

const CommentList = ({
  headerComment,
  onPressReply,
  data,
  isFetching,
  onRefresh,
}) => {
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

  return (
    <FlatList
      data={result}
      ListHeaderComponent={<CommentHeaderItem item={headerComment} />}
      renderItem={({item}) => (
        <CommentItem
          item={item}
          onDeleteComment={onRefresh}
          onPressReply={onPressReply}
        />
      )}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={isFetching}
    />
  );
};

const CommentSender = ({
  selectedComment,
  selectedCommentId,
  id,
  type,
  onSendComment,
  onClearText,
}) => {
  const [comment, setComment] = useState(selectedComment);
  const {row, jcSpaceBetween, p10, aiCenter} = common;

  const handleSendComment = useMutation({
    mutationFn: newComment => postComment(newComment),
    onSuccess: () => {
      setComment('');
      onSendComment();
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  const sendComment = () => {
    if (comment) {
      handleSendComment.mutate({
        comment,
        id,
        type,
        ...(id !== selectedCommentId && {comment_id: selectedCommentId}),
      });
    }
  };

  useEffect(() => {
    setComment(selectedComment);
  }, [selectedComment]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      <View style={[p10, styles.shadowProp]}>
        <View style={[row, jcSpaceBetween]}>
          {['😌', '🤣', '❤️', '😍', '😱', '✝️', '🙏', '🔥', '😥'].map(item => {
            return <Emoji emoji={item} onPress={setComment} />;
          })}
        </View>
        <View style={[row, jcSpaceBetween, aiCenter]}>
          <MaterialCommunityIcons name="account" size={26} />
          <TextInput
            placeholder="Message..."
            onChangeText={text => {
              setComment(text);
              if (!text) {
                onClearText();
              }
            }}
            value={comment}
            style={styles.textInput}
            onSubmitEditing={sendComment}
          />
          <MaterialCommunityIcons
            name="share"
            size={26}
            color={comment ? 'blue' : 'gray'}
            onPress={sendComment}
            disabled={!comment}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

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

  const clearSelectedComment = () => {
    setSelectedComment('');
    setSelectedCommentId(headerComment.id);
  };

  return (
    <View style={flex1}>
      <CommentList
        headerComment={headerComment}
        onPressReply={(message, commentId) => {
          setSelectedComment(message);
          setSelectedCommentId(commentId);
        }}
        data={data}
        isFetching={isFetching}
        onRefresh={() => {
          refetch();
          clearSelectedComment();
        }}
      />

      <CommentSender
        selectedComment={selectedComment}
        selectedCommentId={selectedCommentId}
        id={headerComment.id}
        type={headerComment.type}
        onSendComment={() => {
          clearSelectedComment();
          refetch();
        }}
        onClearText={clearSelectedComment}
      />
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
