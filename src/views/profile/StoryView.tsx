import {
  View,
  Text,
  GestureResponderEvent,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Followers, {ChatShareHeaderRight} from './Followers';
import {deletePost as userDeletePost} from '../../services/UserService';
import {useCustomMutation as useMutation} from '../../hooks/customHooks';
import {useStore} from '../../containers/StoreContainer';
import {
  chatSend as userChatSend,
  chatShare as userChatShare,
} from '../../services/ChatService';
import uuid from 'react-native-uuid';
import {postMy24Like} from '../../services/My24Service';
import Popup from '../../components/common/Popup';
import FastImage from '../../components/common/FastImage';
import Video from '../../components/common/Video';

const {
  jcSpaceBetween,
  jcCenter,
  flex1,
  rGap10,
  pv50,
  ph15,
  cGap3,
  font11,
  cGap5,
  aiCenter,
  row,
  cGap10,
  white,
} = common;

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
        <MaterialIcons name="account-circle" size={30} color="white" />
        <Text style={white}>{item.fullname}</Text>
        <Text style={[font11, white]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
      {/* <Text style={white}>Left</Text> */}
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
    <View style={styles.footerIcon}>
      <IconComponent
        name={icon}
        size={24}
        color={color}
        onPress={onPress}
        disabled={disabled}
      />
    </View>
  );
};

const Footer = ({item, onShare, onDelete}) => {
  const navigation = useNavigation();

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

  const deletePost = useMutation(userDeletePost);
  const my24Like = useMutation(postMy24Like);
  const chatShare = useMutation(userChatShare);
  const chatSend = useMutation(userChatSend);

  const tick = 200; // ms
  const duration = 5000; // ms
  const currentItem = data[currentIndex];
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === data.length - 1;
  const hasNext = currentIndex < data.length - 1;

  useEffect(() => {
    if (!paused) {
      setPaused(false);

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
  }, [currentIndex, paused]);

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
    navigation.navigate(Followers.name, {
      HeaderRightComp: ChatShareHeaderRight.name,
      headerRightProps: {
        itemId: currentItem.id,
        type: 2,
      },
    });
  };

  const handleLike = () => {
    my24Like.mutate(
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
    chatShare.mutate(
      {
        id: currentItem.id,
        type: currentItem.type,
        share_to: JSON.stringify([currentItem.user_id]),
      },
      {
        onSuccess: ({chat_id}) => {
          Keyboard.dismiss();
          setPaused(false);

          chatSend.mutate(
            {
              chat_id,
              message,
              uid: uuid.v4(),
            },
            {
              onSuccess: () => {
                // navigation.goBack();
                // showMessage({message: 'Message sent'});
              },
            },
          );
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
    deletePost.mutate(
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
      <TouchableWithoutFeedback
        style={flex1}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}>
        <View style={[jcSpaceBetween, flex1, ph15, pv50]}>
          <View style={rGap10}>
            <ProgressBarSet
              length={data.length}
              currentIndex={currentIndex}
              progress={progress / duration}
            />
            <Header item={currentItem} />
          </View>
          {currentItem.type === 1 ? (
            <FastImage uri={currentItem.filename} />
          ) : (
            <Video uri={currentItem.filename} />
          )}
          {userIdParam === userId ? (
            <Footer
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
      </TouchableWithoutFeedback>
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
