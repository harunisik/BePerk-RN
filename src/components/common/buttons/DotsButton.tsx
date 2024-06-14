import {useState} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deletePost as userDeletePost} from '../../../services/UserService';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {useStore} from '../../../containers/StoreContainer';
import Button from './Button';
import Popup from '../Popup';
import {DotsIcon} from '../Icons';
import BottomSheetModal from '../BottomSheetModal';
import {colors, useColors} from '../../../hooks/customHooks';
import View from '../View';

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
  const {theme, color} = useColors();
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
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={['27%']}>
      <View style={{rowGap: 10, width: '85%'}} disableTheme>
        <Button
          onPress={handlePressCopyLink}
          title="Copy Link"
          icon="content-copy"
          iconColor={colors.blue}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        {authUserId === userId || authUsername === username ? (
          <>
            <Button
              title="Delete"
              onPress={() => setModalVisible(true)}
              icon="delete"
              iconColor="red"
              theme={{
                color,
                backgroundColor:
                  theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
              }}
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
              title="Turn off Post Notifications"
              icon="bell-off-outline"
              iconColor={colors.blue}
              theme={{
                color,
                backgroundColor:
                  theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
              }}
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
              theme={{
                color,
                backgroundColor:
                  theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
              }}
            />
          </>
        )}
      </View>
    </BottomSheetModal>
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
