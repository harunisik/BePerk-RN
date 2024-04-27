import {Fragment, useState} from 'react';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/buttons/Button';
import {Alert} from 'react-native';
import PostDove from '../doves/PostDove';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AddStack from './AddStack';

export const ImageVideoSelectionModal = ({visible, onDismiss}) => {
  const navigation = useNavigation();

  const handlePressImage = () => {
    onDismiss();
    check(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );

            request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
              console.log(result);
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            launchImageLibrary(
              {
                mediaType: 'mixed',
                presentationStyle: 'fullScreen',
              },
              data => {
                console.log(data);
                if (data.assets?.length && data.assets.length > 0) {
                  navigation.navigate(AddStack.name, {
                    assets: data.assets,
                  });
                }
              },
            );
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePressVideo = () => {
    onDismiss();
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );

            request(PERMISSIONS.IOS.CAMERA).then(result => {
              console.log(result);
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            launchCamera(
              {
                mediaType: 'mixed',
                presentationStyle: 'fullScreen',
                durationLimit: 10,
              },
              data => {
                console.log(data);
                if (data.assets?.length && data.assets.length > 0) {
                  navigation.navigate(AddStack.name, {
                    assets: data.assets,
                  });
                }
              },
            );
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <Button
        title="Photo Library"
        onPress={handlePressImage}
        iconComponent={
          <AntDesign name="picture" size={26} color="dodgerblue" />
        }
      />

      <Button
        title="Camera"
        onPress={handlePressVideo}
        iconComponent={<AntDesign name="camera" size={26} color="dodgerblue" />}
      />
    </Modal>
  );
};

export const AddDoveModal = ({visible, onDismiss}) => {
  const navigation = useNavigation();

  const handlePressDiscussion = () => {
    onDismiss();
    navigation.navigate(PostDove.name, {
      subtype: 0,
      buttonText: "Post what's on your mind",
      inputTextPlaceHolder: "What's on your mind?",
      title: 'Post Dove',
    });
  };

  const handlePressTestimony = () => {
    onDismiss();
    navigation.navigate(PostDove.name, {
      subtype: 1,
      buttonText: 'Write what God has done for you!',
      inputTextPlaceHolder: 'Share a testimony',
      title: 'Post Testimony',
    });
  };

  const handlePressPrayer = () => {
    onDismiss();
    navigation.navigate(PostDove.name, {
      subtype: 2,
      buttonText: 'Share a prayer request!',
      inputTextPlaceHolder: 'Share a prayer request',
      title: 'Post Prayer Request',
    });
  };

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <Button
        title="Discussion"
        onPress={handlePressDiscussion}
        iconComponent={
          <AntDesign name="picture" size={26} color="dodgerblue" />
        }
      />

      <Button
        title="Testimony"
        onPress={handlePressTestimony}
        icon="account-multiple"
        iconColor="orange"
      />

      <Button
        title="Prayer"
        onPress={handlePressPrayer}
        iconComponent={<MaterialIcons name="work" size={26} color="purple" />}
      />
    </Modal>
  );
};

const AddModal = ({visible, onDismiss}) => {
  const [doveModalVisible, setDoveModalVisible] = useState(false);
  const [imageVideoModalVisible, setImageVideoModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleDovePress = () => {
    onDismiss();
    setDoveModalVisible(true);
  };

  const handlePostPress = () => {
    onDismiss();
    setImageVideoModalVisible(true);
  };

  return (
    <Fragment>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Button
          title="Post"
          onPress={handlePostPress}
          iconComponent={
            <SimpleLineIcons name="picture" size={26} color="dodgerblue" />
          }
        />
        <Button
          title="Story"
          onPress={() => Alert.alert('under construction')}
          icon="account-multiple"
        />
        <Button title="Dove" icon="bird" onPress={handleDovePress} />
      </Modal>
      <AddDoveModal
        visible={doveModalVisible}
        onDismiss={() => setDoveModalVisible(false)}
      />
      <ImageVideoSelectionModal
        visible={imageVideoModalVisible}
        onDismiss={() => setImageVideoModalVisible(false)}
      />
    </Fragment>
  );
};

export default AddModal;