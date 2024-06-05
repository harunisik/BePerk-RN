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

const {
  row,
  jcSpaceBetween,
  cGap10,
  cGap3,
  aiCenter,
  bold,
  gray,
  p10,
  rGap3,
  flex1,
} = common;

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
  const navigation = useNavigation();
  const {
    store: {
      authResult: {id: authUserId},
    },
  } = useStore();

  const title = item.to_users
    .filter(user => authUserId !== user.id)
    .map(user => user.name)
    .join(', ');
  const isMultiple = item.to_users.length > 2;

  const handlePress = () => {
    navigation.navigate(MessageDetails.name, {
      title,
      isMultiple,
      chatId: item.id,
    });
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <RenderRightActions item={item} onPress={onDelete} />
      )}>
      <Pressable onPress={handlePress}>
        <View style={[row, jcSpaceBetween, aiCenter]}>
          <View style={[flex1, row, cGap10, aiCenter]}>
            <AccountCard
              userId={item.user_id}
              username={item.username}
              photo={item.photo}
              displayUsername={false}
              size={16}
              usePush
            />
            <View style={[flex1, rGap3]}>
              <View style={[row, cGap3, {width: '90%'}]}>
                <Text style={[bold]} numberOfLines={1}>
                  {title}
                </Text>
                {!isMultiple && item.isVerified === 1 && <VerifiedIcon />}
              </View>
              <Text style={[gray]}>
                {item.last_message_type === 0 || item.last_message_type === 1
                  ? 'Post'
                  : item.last_message_type === 2
                    ? 'Story'
                    : item.last_message_type === 3
                      ? 'Dove'
                      : item.last_message_type === 6
                        ? 'Profile'
                        : item.last_message_type === 8
                          ? 'Image'
                          : item.last_message_type === 7
                            ? item.last_message
                            : item.last_message_type}
              </Text>
            </View>
          </View>
          <View>
            {item.not_read > 0 && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#0AAEEF',
                  backgroundColor: '#0AAEEF',
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{item.not_read}</Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const Messages = () => {
  const {data, refetch, isFetching} = useQuery(chatListOpen, null, data => {
    return {chats: data.chats?.sort((a, b) => b.date - a.date)};
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
