import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import UserLike from '../common/UserLike';

const RenderRightActions = ({item, onPress}) => {
  return (
    <Animated.View style={[styles.deleteButton]}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

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

  return (
    <View>
      <Swipeable
        renderRightActions={() => (
          <RenderRightActions item={item} onPress={onDeleteComment} />
        )}>
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
              <UserLike item={item} type={4} />
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
              onPressReply={onPressReply}
              isChild
              onDeleteComment={onDeleteComment}
            />
          )}
          keyExtractor={item2 => item2.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CommentItem;
