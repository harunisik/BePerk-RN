import {useState} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deletePost as userDeletePost} from '../../../services/UserService';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {useStore} from '../../../containers/StoreContainer';
import Button from './Button';
import BottomModal from '../BottomModal';
import Popup from '../Popup';
import View from '../View';
import {DotsIcon} from '../Icons';

interface ItemModalProps {
  id: number;
  type: number;
  userId: number;
  username: string;
  visible: boolean;
  onDismiss: () => void;
}

const ItemModal = ({
  id,
  type,
  userId,
  username,
  visible,
  onDismiss,
}: ItemModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    store: {
      userInfo: {userId: authUserId, username: authUsername},
    },
  } = useStore();

  const deletePost = useMutation(userDeletePost);

  const handlePressCopyLink = () => {
    onDismiss();
    showMessage({message: 'Link copied'});
    if (type === 1 || type === 0) {
      Clipboard.setString(`beperk://post?id=${id}&type=${type}`);
    } else {
      Clipboard.setString(`beperk://dove?id=${id}`);
    }
  };

  const handlePressDelete = () =>
    deletePost.mutate(
      {
        items: JSON.stringify([{id: id, type: type}]),
      },
      {
        onSuccess: () => {
          onDismiss();
          showMessage({message: 'Post deleted'});
        },
      },
    );

  return (
    <BottomModal visible={visible} onDismiss={onDismiss}>
      <Button
        onPress={handlePressCopyLink}
        title="Copy Link"
        icon="content-copy"
      />
      {authUserId === userId || authUsername === username ? (
        <>
          <Button
            title="Delete"
            onPress={() => setModalVisible(true)}
            icon="delete"
          />
          <Popup
            visible={modalVisible}
            header="Delete this post?"
            message="Once you delete it's gone!"
            onPressOk={handlePressDelete}
            onPressCancel={() => setModalVisible(false)}
          />
        </>
      ) : (
        <>
          <Button
            onPress={() => Alert.alert('under construction')}
            icon="bell-off-outline"
            title="Turn off Post Notifications"
          />
          <Button
            onPress={() => Alert.alert('under construction')}
            title="Report"
            icon={
              <MaterialIcons
                name="report-gmailerrorred"
                size={26}
                color="red"
              />
            }
          />
        </>
      )}
    </BottomModal>
  );
};

interface DotsButtonProps {
  id: number;
  type: number;
  userId: number;
  username: string;
  iconSize?: number;
  color?: string;
}

const DotsButton = ({
  id,
  type,
  userId,
  username,
  iconSize,
  color,
}: DotsButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <DotsIcon
        onPress={() => {
          setModalVisible(true);
        }}
        size={iconSize}
        color={color}
      />
      <ItemModal
        id={id}
        type={type}
        userId={userId}
        username={username}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </>
  );
};

export default DotsButton;
