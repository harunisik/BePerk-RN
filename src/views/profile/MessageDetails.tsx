import {useNavigation, useRoute} from '@react-navigation/native';
import {Pressable, StyleSheet} from 'react-native';
import {formatDate} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import {useMutation} from '../../hooks/reactQueryHooks';
import {chatAdd, chatSend} from '../../services/ChatService';
import FastImage from 'react-native-fast-image';
import Profile from './Profile';
import StoryView from './StoryView';
import {useStore} from '../../containers/StoreContainer';
import FlatList from '../../components/common/FlatList';
import MessageBox2 from '../../components/common/MessageBox2';
import uuid from 'react-native-uuid';
import {useEffect, useState} from 'react';
import {useChatListOpen, useGetChat} from '../../hooks/queryClientHooks';
import MediaView from './MediaView';
import PostDetailItemView from './PostDetailsItemView';
import AccountCard from '../../components/common/AccountCard';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import {ArrowIcon} from '../../components/common/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {flex1, row, aiCenter, bold, cGap5, p10} = common;

export const MessageDetailsScreenOptions = ({navigation, route}) => {
  const {
    params: {title, isMultiple},
  } = route;

  return {
    title: '',
    headerLeft: () => (
      <View style={[row, aiCenter]}>
        <ArrowIcon onPress={() => navigation.goBack()} />
        <View style={[flex1, row, aiCenter, cGap5]}>
          <MaterialCommunityIcons
            name={isMultiple ? 'account-multiple' : 'account-circle'}
            size={26}
            color="lightgray"
          />
          <Text style={[bold, {width: '70%'}]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    ),
  };
};

export const IMAGE_HEIGHT = 150;
export const IMAGE_WIDTH = 120;

const MessageDetailsItem = ({item}) => {
  const navigation = useNavigation();
  const {
    store: {
      authResult: {id},
    },
  } = useStore();
  const isAuthUser = item.user_id === id;
  const alignSelf = isAuthUser ? 'flex-end' : 'flex-start';

  const handlePressProfile = () => {
    navigation.push(Profile.name, {
      headerBackVisible: true,
      userId: item.media.id,
      username: item.media.username,
      isAuthUser: false,
    });
  };

  const handlePressStory = () => {
    navigation.navigate(StoryView.name, {
      data: [item.media],
      index: 0,
      userId: item.media.user_id,
    });
  };

  const handlePressMedia = () => {
    navigation.navigate(MediaView.name, {
      uri: item.media,
      type: 'image',
    });
  };

  const handlePressPost = () => {
    navigation.navigate(PostDetailItemView.name, {
      id: item.media.id,
      userId: item.media.user_id,
      username: item.media.username,
      fullname: item.media.fullname,
      type: item.media.type,
      bookmark: item.media.bookmark,
      liked: item.media.liked,
      likesCount: item.media.likes_count,
      commentsCount: item.media.comments_count,
      filename: item.media.filename,
      caption: item.media.caption,
      uploadTime: item.media.upload_time,
    });
  };

  return (
    <View style={{rowGap: 10}}>
      {item.date && <Text style={{alignSelf: 'center'}}>{item.date}</Text>}
      <View
        style={{
          flexDirection: 'row',
          alignSelf,
          columnGap: 10,
        }}>
        {!isAuthUser && (
          <AccountCard
            userId={item.user_id}
            username={item.username}
            photo={item.photo}
            displayUsername={false}
            size={16}
            usePush
          />
        )}

        {item.type === 2 ? ( // story
          <Pressable onPress={handlePressStory}>
            <View style={{rowGap: 10}}>
              <Text>{`@${item.media.fullname} story`}</Text>
              <FastImage
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    item.media.type === 0
                      ? item.media.cover
                      : item.media.filename,
                }}
              />
            </View>
          </Pressable>
        ) : item.type === 3 ? ( // dove
          <View
            style={[
              styles.shadowProp,
              styles.card,
              {
                width: '90%',
              },
            ]}>
            <DovesItem item={item.media} />
          </View>
        ) : item.type === 6 ? ( // profile
          <Pressable onPress={handlePressProfile}>
            <View
              style={[
                styles.shadowProp,
                styles.card,
                {
                  flexDirection: 'row',
                  columnGap: 5,
                  paddingHorizontal: 10,
                },
              ]}>
              <AccountCard
                userId={item.media.id}
                username={item.media.fullname}
                photo={item.media.photo}
                displayUsername={false}
                usePush
                size={18}
              />
              <View>
                <Text>{item.media.username}</Text>
                <Text style={{color: 'gray'}}>{item.media.fullname}</Text>
              </View>
            </View>
          </Pressable>
        ) : item.type === 7 ? ( // text message
          <View
            style={{
              backgroundColor: 'dodgerblue',
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text>{item.media}</Text>
          </View>
        ) : item.type === 8 ? ( // dm image
          <Pressable onPress={handlePressMedia}>
            <FastImage
              style={{
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                borderRadius: 10,
              }}
              source={{
                uri: item.media,
              }}
            />
          </Pressable>
        ) : (
          <Pressable onPress={handlePressPost}>
            <View style={{rowGap: 10, alignItems: 'flex-end'}}>
              <Text>{`@${item.media.fullname} post`}</Text>
              <FastImage
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                }}
                source={{
                  uri: item.type === 1 ? item.media.filename : item.media.cover,
                }}
              />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const MessageDetails = () => {
  const [data, setData] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const route = useRoute();
  const {
    params: {chatId: chatIdParam, userId},
  } = route;

  const [chatId, setChatId] = useState(chatIdParam);

  const chatAddApi = useMutation(chatAdd);
  const chatSendApi = useMutation(chatSend);
  const getChatApi = useGetChat({chatId, limit: 1000, offset: 0});
  const chatListOpenApi = useChatListOpen();

  const sendMessage = (chat_id: number, message?: string, asset?: any) => {
    const form = new FormData();
    form.append('chat_id', chat_id);
    form.append('uid', uuid.v4());

    if (message) {
      form.append('message', message);
    }

    if (asset && asset.length > 0) {
      form.append('media', {
        name: asset[0].fileName,
        type: asset[0].type,
        uri: asset[0].uri,
      });
    }

    chatSendApi.mutate(form, {onSuccess: () => setIsSending(false)});
  };

  const handlePressSend = (message?: string, asset?: any) => {
    setIsSending(true);
    if (chatId) {
      sendMessage(chatId, message, asset);
    } else {
      chatAddApi.mutate(
        {to_users: JSON.stringify([userId])},
        {
          onSuccess: ({id}) => {
            setChatId(id);
            sendMessage(id, message, asset);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatApi().then(({messages}) => {
        setData(
          messages.map(({id, date, type, media, user_id, name}, index, arr) => {
            const dateStr = formatDate(date * 1000);
            const prevDateStr =
              index <= arr.length - 2
                ? formatDate(arr[index + 1].date * 1000)
                : null;
            return {
              id,
              date: dateStr === prevDateStr ? null : dateStr,
              type,
              media,
              user_id,
              name,
            };
          }),
        );
      });
    } else {
      chatListOpenApi().then(({chats}) => {
        const result = chats.find(
          ({to_users}) =>
            to_users.length === 2 && to_users.some(({id}) => id === userId),
        );

        if (result) {
          setChatId(result.id);
        }
      });
    }
  }, [chatId, isSending]);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => <MessageDetailsItem item={item} />}
        contentContainerStyle={[p10, {marginTop: 10}]}
        inverted={data?.length > 0}
      />
      <MessageBox2 onPressSend={handlePressSend} />
    </>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  card: {
    borderRadius: 10,
    paddingVertical: 10,
  },
});

export default MessageDetails;
