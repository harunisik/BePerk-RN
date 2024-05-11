import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {Alert, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deletePost as userDeletePost} from '../../../services/UserService';
import {useMutation} from '../../../hooks/customHooks';
import {useStore} from '../../../containers/StoreContainer';
import Button from './Button';
import BottomModal from '../BottomModal';
import Popup from '../Popup';

const ItemModal = ({item, visible, onDismiss}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    store: {
      authResult: {id, username},
    },
  } = useStore();

  const deletePost = useMutation(userDeletePost);

  const handlePressCopyLink = () => {
    onDismiss();
    showMessage({message: 'Link copied'});
    if (item.type === 1 || item.type === 0) {
      Clipboard.setString(`beperk://post?id=${item.id}&type=${item.type}`);
    } else {
      Clipboard.setString(`beperk://dove?id=${item.id}`);
    }
  };

  const handlePressDelete = () =>
    deletePost.mutate(
      {
        items: JSON.stringify([{id: item.id, type: item.type}]),
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
      {id === item.user_id || username === item.username ? (
        <>
          <Button
            title="Delete"
            onPress={() => setModalVisible(true)}
            icon="delete"
            iconColor="red"
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
        <View>
          <Button
            onPress={() => Alert.alert('under construction')}
            icon="bell-off-outline"
            title="Turn off Post Notifications"
          />
          <Button
            onPress={() => Alert.alert('under construction')}
            title="Report"
            iconComponent={
              <MaterialIcons
                name="report-gmailerrorred"
                size={26}
                color="red"
              />
            }
          />
        </View>
      )}
    </BottomModal>
  );
};

interface DotsButtonProps {
  item: any;
  size?: number;
  color?: string;
}

const DotsButton = ({
  item,
  size = 24,
  color = 'dodgerblue',
}: DotsButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <MaterialCommunityIcons
        name="dots-horizontal"
        size={size}
        color={color}
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <ItemModal
        item={item}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </>
  );
};

export default DotsButton;
