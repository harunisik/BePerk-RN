import {
  View,
  GestureResponderEvent,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserSearch, {ChatShareHeaderRight} from './UserSearch';
import {deletePost} from '../../services/UserService';
import {useMutation} from '../../hooks/customHooks';
import {useStore} from '../../containers/StoreContainer';
import {chatSend, chatShare} from '../../services/ChatService';
import uuid from 'react-native-uuid';
import {postMy24Like} from '../../services/My24Service';
import Popup from '../../components/common/Popup';
// import FastImage from '../../components/common/FastImage';
import Video from '../../components/common/Video';
import FastImage from 'react-native-fast-image';
import AccountCard from '../../components/common/AccountCard';
import Text from '../../components/common/Text';

const {
  jcSpaceBetween,
  flex1,
  rGap10,
  ph15,
  cGap3,
  cGap5,
  aiCenter,
  row,
  cGap10,
  white,
} = common;

const DURATION = 5000;

const ProgressBarSet = ({length, currentIndex, progress}) => {
  return (
    <View style={[row, cGap3]}>
      {Array.from({length: length}, (_item, index) => {
        return (
          <View style={[flex1]} key={index}>
            <ProgressBar
              style={{
                height: 3,
                borderRadius: 10,
                backgroundColor: 'lightgray',
              }}
              color="dodgerblue"
              progress={
                index === currentIndex
                  ? progress
                  : index < currentIndex + 1
                    ? 1
                    : 0
              }
            />
          </View>
        );
      })}
    </View>
  );
};

const Header = ({item}) => {
  const navigation = useNavigation();

  return (
    <View style={[row, jcSpaceBetween, aiCenter]}>
      <View style={[row, cGap5, aiCenter]}>
        <AccountCard
          userId={item.user_id}
          username={item.fullname}
          photo={item.photo}
          size={20}
          labelColor="white"
          goBack
        />
        <Text style={[white]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
      <MaterialIcons
        name="close"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};
const FooterIcon = ({
  icon,
  color = 'dodgerblue',
  IconComponent = MaterialIcons,
  onPress,
  disabled = false,
}) => {
  return (
    <Pressable style={styles.footerIcon} onPress={onPress}>
      <IconComponent
        name={icon}
        size={24}
        color={color}
        // onPress={onPress}
        disabled={disabled}
      />
    </Pressable>
  );
};

const Footer1 = ({item, onShare, onDelete}) => {
  return (
    <View style={[row, jcSpaceBetween]}>
      <View style={styles.viewed}>
        <Text style={white}>{`Viewed: ${item.views_count}`}</Text>
      </View>
      <View style={[row, cGap10]}>
        {/* <FooterIcon
          icon="download"
          onPress={() => Alert.alert('under construction')}
        /> */}
        <FooterIcon
          icon="share"
          IconComponent={MaterialCommunityIcons}
          onPress={onShare}
        />
        <FooterIcon icon="delete" color="red" onPress={onDelete} />
      </View>
    </View>
  );
};

const Footer2 = ({onShare, onLike, onSendMessage, liked, onFocus}) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[row, jcSpaceBetween]}>
        <View style={[row, cGap10]}>
          <TextInput
            placeholder="Message..."
            onChangeText={text => setMessage(text)}
            value={message}
            style={styles.textInput}
            onSubmitEditing={handleSendMessage}
            onFocus={onFocus}
          />
          <FooterIcon
            icon="send"
            color={message ? 'dodgerblue' : 'gray'}
            onPress={handleSendMessage}
            disabled={!message}
          />
          <FooterIcon
            icon={liked ? 'heart' : 'heart-outline'}
            onPress={onLike}
            IconComponent={MaterialCommunityIcons}
          />
          <FooterIcon
            icon="share"
            IconComponent={MaterialCommunityIcons}
            onPress={onShare}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const StoryView = () => {
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {data: dataParam, index: indexParam, userId: userIdParam},
  } = route;
  const {
    store: {
      authResult: {id: userId},
    },
  } = useStore();

  const [data, setData] = useState(dataParam);
  const [currentIndex, setCurrentIndex] = useState(indexParam);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(data.map(item => item.liked));
  const [duration, setDuration] = useState(DURATION);

  const deletePostApi = useMutation(deletePost);
  const my24LikeApi = useMutation(postMy24Like);
  const chatShareApi = useMutation(chatShare);
  const chatSendApi = useMutation(chatSend);

  const tick = 200; // ms
  const currentItem = data[currentIndex];
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === data.length - 1;
  const hasNext = currentIndex < data.length - 1;

  useEffect(() => {
    if (currentItem.type === 1) {
      setDuration(DURATION);
    }

    if (!paused) {
      // setPaused(false);

      const interval = setInterval(() => {
        setProgress(prevProgress => {
          // current slide finished
          if (prevProgress >= duration) {
            if (hasNext) {
              setCurrentIndex(prevIndex => prevIndex + 1); // go to next slide
              return 0; // clear the progress
            } else {
              // no slide available
              setFinished(true);
              return duration;
            }
          }
          return prevProgress + tick; // animation in progress
        });
      }, tick);

      setIntervalId(interval); // save intervalId

      // componentDidUnmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex, paused, duration]);

  useEffect(() => {
    // detect last slide finish
    if (finished) {
      navigation.goBack();
    }
  }, [finished]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPaused(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handlePress = (event: GestureResponderEvent) => {
    Keyboard.dismiss();
    if (paused) {
      setPaused(false);
      return;
    }

    const isLeft = windowWidth / 2 > event.nativeEvent.locationX;

    if ((isLeft && isFirstItem) || (!isLeft && isLastItem)) {
      setFinished(true);
      return;
    }

    setProgress(0);

    setCurrentIndex(prevIndex => {
      if (isLeft && prevIndex > 0) {
        return prevIndex - 1;
      }

      if (!isLeft && prevIndex < data.length - 1) {
        return prevIndex + 1;
      }

      return prevIndex;
    });
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setPaused(true);
  };

  const handleLongPress = () => {
    stopInterval();
  };

  const handlePressOut = () => {
    setPaused(false);
  };

  const handleShare = () => {
    stopInterval();
    navigation.navigate(UserSearch.name, {
      headerRightComp: ChatShareHeaderRight.name,
      headerRightProps: {
        itemId: currentItem.id,
        type: 2,
      },
    });
  };

  const handleLike = () => {
    my24LikeApi.mutate(
      {
        id: currentItem.id,
        type: currentItem.type,
        like: liked[currentIndex] ? -1 : 1,
      },
      {
        onSuccess: () => {
          setLiked(prevLiked => {
            prevLiked[currentIndex] = prevLiked[currentIndex] ? 0 : 1;
            return [...prevLiked];
          });
        },
      },
    );
  };

  const handleSendMessage = message => {
    chatShareApi.mutate(
      {
        id: currentItem.id,
        type: '2',
        share_to: JSON.stringify([currentItem.user_id]),
      },
      {
        onSuccess: ({chat_id}) => {
          Keyboard.dismiss();
          setPaused(false);

          const form = new FormData();
          form.append('chat_id', chat_id);
          form.append('uid', uuid.v4());
          form.append('message', message);

          chatSendApi.mutate(form);
        },
      },
    );
  };

  const handleFocus = () => {
    stopInterval();
  };

  const handleDelete = () => {
    stopInterval();
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setPaused(false);
  };

  const handleModalDelete = () => {
    deletePostApi.mutate(
      {
        items: JSON.stringify([{id: currentItem.id, type: 2}]),
      },
      {
        onSuccess: () => {
          // shortcut logic
          // if deleted item is the last one
          if (data.length === 1) {
            setFinished(true);
            return;
          }

          setModalVisible(false);
          setPaused(false);
          setProgress(0);
          setData(prevData => {
            setCurrentIndex(prevIndex => {
              if (prevIndex === data.length - 1) {
                return prevIndex - 1;
              }
              return prevIndex;
            });

            return prevData.filter((_item, index) => index !== currentIndex);
          });
        },
      },
    );
  };

  return (
    <View style={[flex1]}>
      <Pressable
        style={flex1}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        // onStartShouldSetResponderCapture={_event => true}
      >
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'black',
          }}>
          {currentItem.type === 1 ? (
            <FastImage
              source={{uri: currentItem.filename}}
              style={{
                width: windowWidth,
                aspectRatio: currentItem.height
                  ? currentItem.width / currentItem.height
                  : 1,
              }}
              resizeMode="contain"
            />
          ) : (
            <Video
              uri={currentItem.filename}
              paused={paused}
              onLoad={event => {
                setDuration(event.duration * 1000);
              }}
              // resizeMode="stretch"
            />
          )}
        </View>
        <SafeAreaView
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
          }}>
          <View style={[jcSpaceBetween, ph15, rGap10]}>
            <ProgressBarSet
              length={data.length}
              currentIndex={currentIndex}
              progress={progress / duration}
            />
            <Header item={currentItem} />
          </View>
          <View style={[{marginTop: 'auto', paddingVertical: 15}, ph15]}>
            {userIdParam === userId ? (
              <Footer1
                item={currentItem}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            ) : (
              <Footer2
                onLike={handleLike}
                onShare={handleShare}
                onSendMessage={handleSendMessage}
                liked={liked[currentIndex]}
                onFocus={handleFocus}
              />
            )}
          </View>
        </SafeAreaView>
      </Pressable>
      <Popup
        visible={modalVisible}
        header="Delete this story?"
        message="Once you delete it's gone"
        onPressOk={handleModalDelete}
        onPressCancel={handleModalCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewed: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  footerIcon: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 5,
    opacity: 0.7,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default StoryView;
