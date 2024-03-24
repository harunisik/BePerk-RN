import {Alert} from 'react-native';
import {Fragment, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/buttons/Button';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PostDove from '../doves/PostDove';

const PostButton = () => {
  return (
    <Button
      title="Post"
      onPress={() => Alert.alert('under construction')}
      iconComponent={
        <SimpleLineIcons name="picture" size={26} color="dodgerblue" />
      }
    />
  );
};

const StoryButton = () => {
  return (
    <Button
      title="Story"
      onPress={() => Alert.alert('under construction')}
      icon="account-multiple"
    />
  );
};

const DoveButton = ({onPress}) => {
  return <Button title="Dove" onPress={onPress} icon="bird" />;
};

const DoveModal = ({visible, onDismiss}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  const navigation = useNavigation();

  const handlePress = () => {
    onDismiss();
    navigation.navigate(PostDove.name, {
      subtype: 0,
      buttonText: "Post what's on your mind",
      inputTextPlaceHolder: "What's on your mind?",
      title: 'Post Dove',
    });
  };

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  return (
    <Modal visible={modalVisible} onDismiss={handlePress}>
      <Button
        title="Discussion"
        onPress={() => setModalVisible(false)}
        iconComponent={
          <AntDesign name="picture" size={26} color="dodgerblue" />
        }
      />
    </Modal>
  );
};

const Add = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [doveModalVisible, setDoveModalVisible] = useState(false);

  const handleModalDismiss = () => {
    if (!doveModalVisible) {
      navigation.goBack();
    }
  };

  const handleDoveModalDismiss = () => {
    navigation.goBack();
  };

  const handleDovePress = () => {
    setModalVisible(false);
    setDoveModalVisible(true);
  };

  return (
    <Fragment>
      <Modal visible={modalVisible} onDismiss={handleModalDismiss}>
        <PostButton />
        <StoryButton />
        <DoveButton onPress={handleDovePress} />
      </Modal>
      <DoveModal
        visible={doveModalVisible}
        onDismiss={handleDoveModalDismiss}
      />
    </Fragment>
  );
};

export default Add;
