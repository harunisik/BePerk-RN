import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {postNotify, deletePost} from '../../../services/UserService';
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
  subscribed: number;
  username: string;
  visible: boolean;
  onDismiss: () => void;
}

const ItemModal = ({
  id,
  type,
  userId,
  username,
  subscribed,
  visible,
  onDismiss,
}: ItemModalProps) => {
  const [_subscribed, setSubscribed] = useState(subscribed);
  const [modalVisible, setModalVisible] = useState(false);
  const {theme, color} = useColors();
  const {
    store: {
      userInfo: {userId: authUserId, username: authUsername},
    },
  } = useStore();
  const isAuthUser = authUserId === userId || authUsername === username;

  const deletePostApi = useMutation(deletePost);
  const postNotifyApi = useMutation(postNotify);

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
    deletePostApi.mutate(
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

  const handlePressPostNotify = () =>
    postNotifyApi.mutate(
      {
        id: userId,
        subscribed: _subscribed === 0 ? 1 : 0,
      },
      {
        onSuccess: () => {
          onDismiss();
          setSubscribed(_subscribed === 0 ? 1 : 0);
          // showMessage({message: 'Post deleted'});
        },
      },
    );

  useEffect(() => {
    setSubscribed(subscribed);
  }, [subscribed]);

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={isAuthUser ? ['20%'] : ['27%']}>
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
        {isAuthUser ? (
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
              onPress={handlePressPostNotify}
              title={
                _subscribed === 0
                  ? 'Turn on Post Notifications'
                  : 'Turn off Post Notifications'
              }
              icon={_subscribed === 0 ? 'bell-outline' : 'bell-off-outline'}
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

interface PostItemSettingsProps {
  id: number;
  type: number;
  userId: number;
  username: string;
  subscribed: number;
  iconSize?: number;
  color?: string;
}

const PostItemSettings = ({
  id,
  type,
  userId,
  username,
  subscribed,
  iconSize,
  color,
}: PostItemSettingsProps) => {
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
        subscribed={subscribed}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </>
  );
};

export default PostItemSettings;
