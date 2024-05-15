import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import LikeButtton from '../common/buttons/LikeButton';
import FlatList from '../common/FlatList';

const RenderRightActions = ({item, onPress}) => {
  return (
    <Animated.View style={[styles.deleteButton]}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const CommentItem = ({item, isChild = false, onDelete, onPressReply}) => {
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
    pl30,
    mb15,
  } = common;

  const [showReplies, setShowReplies] = useState(false);

  const handleViewReply = () => {
    setShowReplies(showReplies ? false : true);
  };

  return (
    <>
      <Swipeable
        renderRightActions={() => (
          <RenderRightActions item={item} onPress={onDelete} />
        )}>
        <View style={[row, cGap10]}>
          <MaterialIcons name="account-circle" size={26} color="lightgray" />
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
                  <Text style={[font11, gray, mb15]}>
                    {showReplies
                      ? 'Hide replies'
                      : `View ${item.childList.length} replies`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <LikeButtton
                id={item.id}
                liked={item.liked}
                likesCount={item.likes_count}
                type={4}
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
              onPressReply={onPressReply}
              isChild
              onDelete={onDelete}
            />
          )}
          style={pl30}
        />
      )}
    </>
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
