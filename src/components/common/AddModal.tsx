import {Fragment, useState} from 'react';
import Modal from './Modal';
import Button from './buttons/Button';
import {Alert} from 'react-native';
import PostDove from '../../views/doves/PostDove';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

  const handleDovePress = () => {
    onDismiss();
    setDoveModalVisible(true);
  };

  return (
    <Fragment>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Button
          title="Post"
          onPress={() => Alert.alert('under construction')}
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
    </Fragment>
  );
};

export default AddModal;
