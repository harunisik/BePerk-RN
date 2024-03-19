import {
  View,
  Text,
  GestureResponderEvent,
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {ProgressBar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Followers from './Followers';
import {deletePost as userDeletePost} from '../../services/UserService';
import {useCustomMutation as useMutation} from '../../hooks/commonHooks';

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
}) => {
  return (
    <View style={styles.footerIcon}>
      <IconComponent name={icon} size={24} color={color} onPress={onPress} />
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
        <FooterIcon
          icon="download"
          onPress={() => Alert.alert('under construction')}
        />
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

const DeleteModal = ({onDelete, onCancel, modalVisible}) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onCancel();
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            margin: 20,
            shadowOpacity: 0.25,
          }}>
          <Text>Delete this story?</Text>
          <Text>Once you delete it's gone!</Text>
          <Pressable
            onPress={() => {
              onDelete();
            }}>
            <Text>Delete</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onCancel();
            }}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const StoryView = () => {
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const {width: windowWidth} = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {data: dataParam, index: indexParam},
  } = route;
  const [data, setData] = useState(dataParam);
  const [currentIndex, setCurrentIndex] = useState(indexParam);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState();
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const deletePost = useMutation(userDeletePost);

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

  const handlePress = (event: GestureResponderEvent) => {
    const isLeft = windowWidth / 2 > event.nativeEvent.locationX;

    if ((isLeft && isFirstItem) || (!isLeft && isLastItem)) {
      setFinished(true);
      return;
    }

    setCurrentIndex(prevIndex => {
      if (isLeft && prevIndex > 0) {
        setProgress(0);
        return prevIndex - 1;
      }

      if (!isLeft && prevIndex < data.length - 1) {
        setProgress(0);
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
      itemId: currentItem.id,
      type: 2,
    });
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
      <ImageBackground
        source={{uri: currentItem.filename}}
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
                currentIndex={currentIndex}
                duration={duration}
                progress={progress}
              />
              <Header item={currentItem} />
            </View>
            <Footer
              item={currentItem}
              onShare={handleShare}
              onDelete={handleDelete}
            />
          </View>
        </TouchableWithoutFeedback>
        <DeleteModal
          modalVisible={modalVisible}
          onDelete={handleModalDelete}
          onCancel={handleModalCancel}
        />
      </ImageBackground>
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
});

export default StoryView;
