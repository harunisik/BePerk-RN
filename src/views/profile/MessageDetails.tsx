import {useNavigation, useRoute} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {formatDate} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import {useMutation} from '../../hooks/customHooks';
import {chatAdd, chatSend} from '../../services/ChatService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Profile from './Profile';
import StoryView from './StoryView';
import {useStore} from '../../containers/StoreContainer';
import FlatList from '../../components/common/FlatList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageBox2 from '../../components/common/MessageBox2';
import uuid from 'react-native-uuid';
import {useEffect, useState} from 'react';
import {useChatListOpen, useGetChat} from '../../hooks/userHooks';

const {flex1, row, aiCenter, bold, cGap5, p10} = common;

export const MessageDetailsScreenOptions = ({navigation, route}) => {
  const {
    params: {title, isMultiple},
  } = route;

  return {
    title: '',
    headerLeft: () => (
      <View style={[row, aiCenter]}>
        <MaterialIcons
          name="arrow-back-ios"
          color="dodgerblue"
          size={26}
          onPress={() => navigation.goBack()}
        />

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

  const handlePressMediaPost = () => {
    // TODO: handlePressMediaPost
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
          <MaterialIcons name="account-circle" size={30} color="lightgray" />
        )}

        {item.type === 7 ? ( // post
          <View
            style={{
              backgroundColor: 'dodgerblue',
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: 'white'}}>{item.media}</Text>
          </View>
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
                  columnGap: 10,
                  paddingHorizontal: 5,
                },
              ]}>
              <MaterialIcons
                name="account-circle"
                size={26}
                color="lightgray"
              />
              <View>
                <Text>{item.media.username}</Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  {item.media.fullname}
                </Text>
              </View>
            </View>
          </Pressable>
        ) : item.type === 2 ? ( // story
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
        ) : (
          <Pressable onPress={handlePressMediaPost}>
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

  const sendMessage = (message: string, chat_id: number) => {
    chatSendApi.mutate(
      {
        chat_id,
        message,
        uid: uuid.v4(),
      },
      {onSuccess: () => setIsSending(false)},
    );
  };

  const handlePressSend = (message: string) => {
    setIsSending(true);
    if (chatId) {
      sendMessage(message, chatId);
    } else {
      chatAddApi.mutate(
        {to_users: JSON.stringify([userId])},
        {
          onSuccess: ({id}) => {
            setChatId(id);
            sendMessage(message, id);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatApi().then(({messages}) => {
        setData(
          messages.map(({id, date, type, media, user_id}, index, arr) => {
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
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});

export default MessageDetails;
