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
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useMemo, useRef, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserSearch, {ChatShareHeaderRight} from './UserSearch';
import {deletePost as userDeletePost} from '../../services/UserService';
import {useMutation} from '../../hooks/customHooks';
import {useStore} from '../../containers/StoreContainer';
import {
  chatSend as userChatSend,
  chatShare as userChatShare,
} from '../../services/ChatService';
import uuid from 'react-native-uuid';
import {postMy24Like} from '../../services/My24Service';
import Popup from '../../components/common/Popup';
import AccountCard from '../../components/common/AccountCard';

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

const ProgressBarSet = ({length, currentIndex, progress, duration}) => {
  return (
    <View style={[row, cGap3]}>
      {Array.from({length: length}, (_item, index) => {
        return (
          <View style={[flex1]} key={index}>
            <ProgressBar
              progress={
                index === currentIndex
                  ? progress / duration
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
        <Text style={[font11, white]}>{dateDiff(item.upload_time * 1000)}</Text>
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

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const StoryView2 = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {data, index: indexParam, userId: userIdParam},
  } = route;
  const {
    store: {
      authResult: {id: userId},
    },
  } = useStore();

  const [page, setPage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [liked, setLiked] = useState(data.map(item => item.liked));

  const tick = 200; // ms
  const duration = 5000; // ms
  const isFirstItem = page === 0;
  const isLastItem = page === data.length - 1;
  const hasNext = page < data.length - 1;

  const deletePost = useMutation(userDeletePost);
  const my24Like = useMutation(postMy24Like);
  const chatShare = useMutation(userChatShare);
  const chatSend = useMutation(userChatSend);

  const handlePageSelected = ({nativeEvent: {position}}) => {
    setPage(position);
  };

  const handlePress = (event: GestureResponderEvent) => {
    Keyboard.dismiss();
    if (paused) {
      setPaused(false);
      return;
    }

    const isLeft = windowWidth / 2 > event.nativeEvent.locationX;

    if ((isLeft && isFirstItem) || (!isLeft && isLastItem)) {
      setFinished(true);
      navigation.goBack();
      return;
    }

    if (isLeft) {
      pagerViewRef.current?.setPage(page - 1);
      if (isLeft && page > 0) {
        setProgress(0);
      }
    } else {
      pagerViewRef.current?.setPage(page + 1);
      if (!isLeft && page < data.length - 1) {
        setProgress(0);
      }
    }
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
          // setData(prevData => {
          //   setCurrentIndex(prevIndex => {
          //     if (prevIndex === data.length - 1) {
          //       return prevIndex - 1;
          //     }
          //     return prevIndex;
          //   });

          //   return prevData.filter((_item, index) => index !== currentIndex);
          // });
        },
      },
    );
  };

  useEffect(() => {
    if (!paused) {
      setPaused(false);

      const interval = setInterval(() => {
        setProgress(prevProgress => {
          // current slide finished
          if (prevProgress >= duration) {
            if (hasNext) {
              pagerViewRef.current?.setPage(page + 1); // go to next slide
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
  }, [page, paused]);

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

  return (
    <View style={[flex1]}>
      {useMemo(
        () =>
          data && (
            <AnimatedPagerView
              ref={pagerViewRef}
              style={flex1}
              initialPage={indexParam}
              orientation="horizontal"
              onPageSelected={handlePageSelected}>
              {data.map((item, index) => {
                return (
                  <View key={item.id} collapsable={false}>
                    <ImageBackground
                      source={{uri: item.filename}}
                      resizeMode="contain"
                      style={[flex1, jcCenter]}>
                      <TouchableWithoutFeedback
                        style={flex1}
                        onPress={handlePress}
                        onLongPress={handleLongPress}
                        onPressOut={handlePressOut}>
                        <View style={[jcSpaceBetween, flex1, ph15, pv50]}>
                          <View style={rGap10}>
                            <ProgressBarSet
                              length={data.length}
                              currentIndex={index}
                              duration={duration}
                              progress={progress}
                            />
                            <Header item={item} />
                          </View>
                          {userIdParam === userId ? (
                            <Footer
                              item={item}
                              onShare={handleShare}
                              onDelete={handleDelete}
                            />
                          ) : (
                            <Footer2
                              onLike={handleLike}
                              onShare={handleShare}
                              onSendMessage={handleSendMessage}
                              liked={liked[index]}
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
                    </ImageBackground>
                  </View>
                );
              })}
            </AnimatedPagerView>
          ),
        [data, page, progress],
      )}
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

export default StoryView2;
