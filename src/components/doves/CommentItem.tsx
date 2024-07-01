import {Animated, Pressable} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import {useState} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import LikeButtton from '../common/buttons/LikeButton';
import FlatList from '../common/FlatList';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import View from '../common/View';
import {DeleteIcon} from '../common/Icons';
import {colors} from '../../hooks/customHooks';

const RenderRightActions = ({item, onPress}) => {
  return (
    <Animated.View>
      <Pressable
        onPress={() => onPress(item)}
        style={{
          backgroundColor: colors.red,
          justifyContent: 'center',
          height: '100%',
          paddingHorizontal: 10,
        }}>
        <DeleteIcon />
      </Pressable>
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
        <View style={[row, {alignItems: 'flex-start'}]}>
          <AccountCard
            size={15}
            userId={item.user_id}
            displayUsername={false}
            goBack
          />
          <View style={[row, jcSpaceBetween, flex1, cGap10]}>
            <View style={[rGap15, flex1]}>
              <View style={[rGap5]}>
                <Text style={pr10}>
                  <Text style={bold}>{item.fullname + ' '}</Text>
                  <Text>{item.comment}</Text>
                </Text>
                <View style={[row, cGap5]}>
                  <Text style={[gray]}>{dateDiff(item.date * 1000)}</Text>
                  <Text
                    style={[gray]}
                    onPress={() => {
                      onPressReply(`@${item.username} `, item.id);
                    }}>
                    Reply
                  </Text>
                </View>
              </View>
              {!isChild && item.childList?.length > 0 && (
                <Pressable onPress={handleViewReply}>
                  <Text style={[gray, mb15]}>
                    {showReplies
                      ? 'Hide replies'
                      : `View ${item.childList.length} replies`}
                  </Text>
                </Pressable>
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

export default CommentItem;
