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

export const TEXT_SIZE = 14;

const {row, rGap3, cGap5, cGap10, bold, jcSpaceBetween, flex1, pr10, pl30} =
  common;

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
    comment,
    user_id,
    fullname,
    date,
    username,
    id,
    liked,
    likes_count,
    childList,
  } = item;

  const [showReplies, setShowReplies] = useState(false);
  const firstWord = comment.split(' ')[0];
  const commentStr = comment.substr(comment.indexOf(' '), comment.length);

  const handleViewReply = () => {
    setShowReplies(showReplies ? false : true);
  };

  return (
    <>
      <Swipeable
        renderRightActions={() => (
          <RenderRightActions item={item} onPress={onDelete} />
        )}>
        <View style={[row, {alignItems: 'flex-start', paddingVertical: 7}]}>
          <AccountCard
            userId={user_id}
            displayUsername={false}
            goBack
            size={20}
          />
          <View style={[row, jcSpaceBetween, flex1, cGap10]}>
            <View style={[flex1]}>
              <View style={[rGap3]}>
                <Text size={TEXT_SIZE} style={pr10}>
                  <Text size={TEXT_SIZE} style={bold}>
                    {fullname + ' '}
                  </Text>
                  <Text size={TEXT_SIZE} color="gray">
                    {dateDiff(date * 1000)}
                  </Text>
                </Text>
                <View style={[row, cGap5, {justifyContent: 'space-between'}]}>
                  <View style={[flex1, rGap3]}>
                    <Text size={TEXT_SIZE}>
                      {isChild && (
                        <Text size={TEXT_SIZE} color={colors.blue}>
                          {firstWord}
                        </Text>
                      )}
                      {!isChild ? comment : commentStr}
                    </Text>
                    <Text
                      size={TEXT_SIZE}
                      color="gray"
                      onPress={() => {
                        onPressReply(`@${username} `, id);
                      }}>
                      Reply
                    </Text>
                  </View>
                  <LikeButtton
                    id={id}
                    liked={liked}
                    likesCount={likes_count}
                    type={4}
                    iconSize={18}
                    vertical
                    labelSize={TEXT_SIZE}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
      {showReplies && (
        <FlatList
          data={childList}
          renderItem={({item: item2}) => (
            <CommentItem
              item={item2}
              onPressReply={onPressReply}
              isChild
              onDelete={onDelete}
            />
          )}
          style={{paddingLeft: 40}}
        />
      )}
      {!isChild && childList?.length > 0 && (
        <Pressable
          onPress={handleViewReply}
          style={{paddingVertical: 10, paddingLeft: 45}}>
          <Text size={TEXT_SIZE} color="gray">
            <Text size={TEXT_SIZE} color="gray">
              ------{' '}
            </Text>
            {showReplies
              ? ' Hide replies'
              : ` View ${childList.length} replies`}
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default CommentItem;
