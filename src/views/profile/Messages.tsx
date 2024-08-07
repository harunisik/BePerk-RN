import {Animated, Pressable, StyleSheet} from 'react-native';
import {useMutation, useQuery} from '../../hooks/reactQueryHooks';
import {chatDelete, chatListOpen} from '../../services/ChatService';
import common from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MessageDetails from './MessageDetails';
import FlatList from '../../components/common/FlatList';
import {Swipeable} from 'react-native-gesture-handler';
import {useStore} from '../../containers/StoreContainer';
import UserSearch, {MessagesHeaderRight} from './UserSearch';
import AccountCard from '../../components/common/AccountCard';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {FileIcon, VerifiedIcon} from '../../components/common/Icons';
import {useColors} from '../../hooks/customHooks';
import Badge from '../../components/common/Badge';
import {dateDiff} from '../../utils/DateUtil';

const {row, cGap3, aiCenter, bold, p10, rGap3, flex1} = common;

export const MessagesScreenOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <FileIcon
        onPress={() =>
          navigation.navigate(UserSearch.name, {
            headerRightComp: MessagesHeaderRight.name,
            headerRightProps: {},
          })
        }
      />
    ),
  };
};

const RenderRightActions = ({item, onPress}) => {
  return (
    <Animated.View style={[styles.deleteButton]}>
      <Pressable onPress={() => onPress(item)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </Pressable>
    </Animated.View>
  );
};

const MessageItem = ({item, onDelete}) => {
  const {
    id,
    to_users,
    username,
    photo,
    last_message_user_id,
    last_message_type,
    last_message,
    not_read,
  } = item;

  const navigation = useNavigation();
  const {
    store: {
      userInfo: {userId: authUserId},
    },
  } = useStore();
  const {theme1} = useColors();

  const title = to_users
    .filter(user => authUserId !== user.id)
    .map(user => user.name)
    .join(', ');
  const isMultiple = to_users.length > 2;
  const isVerified = to_users.find(
    ({id}) => id === last_message_user_id,
  )?.isVerified;

  const handlePress = () => {
    navigation.navigate(MessageDetails.name, {
      title,
      isMultiple,
      chatId: id,
    });
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <RenderRightActions item={item} onPress={onDelete} />
      )}>
      <Pressable onPress={handlePress}>
        <View style={[row, aiCenter, {paddingVertical: 3}]}>
          <AccountCard
            // userId={item.user_id}
            username={username}
            photo={
              !isMultiple
                ? photo
                : to_users.find(({id}) => id === last_message_user_id)?.photo
            }
            displayUsername={false}
            size={26}
            usePush
          />
          <View style={[rGap3, flex1]}>
            <View style={[row, cGap3]}>
              <Text style={[bold, flex1]} numberOfLines={1}>
                {title}
                {!isMultiple && isVerified === 1 && <VerifiedIcon />}
              </Text>
            </View>
            <Text color="gray" size={15} numberOfLines={1}>
              {last_message_type === 0 || last_message_type === 1
                ? 'Post'
                : last_message_type === 2
                  ? 'Story'
                  : last_message_type === 3
                    ? 'Dove'
                    : last_message_type === 6
                      ? 'Profile'
                      : last_message_type === 8
                        ? 'Image'
                        : last_message_type === 7
                          ? last_message
                          : last_message_type}
            </Text>
          </View>
          {not_read > 0 && (
            <View
              style={{
                width: 30,
                alignItems: 'flex-end',
              }}>
              <Badge value={not_read} theme={theme1} />
            </View>
          )}
        </View>
      </Pressable>
    </Swipeable>
  );
};

const Messages = () => {
  const {data, refetch, isFetching} = useQuery(chatListOpen, null, {
    select: data => {
      return {chats: data.chats?.sort((a, b) => b.date - a.date)};
    },
  });

  const chatDeleteApi = useMutation(chatDelete);

  const handleDeleteItem = item => {
    chatDeleteApi.mutate({chat_id: item.id});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data?.chats}
        renderItem={({item}) => (
          <MessageItem item={item} onDelete={handleDeleteItem} />
        )}
        onRefresh={refetch}
        refreshing={isFetching}
        contentContainerStyle={p10}
        // separatorSize="medium"
      />
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

export default Messages;
