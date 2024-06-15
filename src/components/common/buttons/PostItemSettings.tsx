import {useEffect, useState} from 'react';
import {Alert, Pressable} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  postNotify,
  deletePost,
  sendReport,
} from '../../../services/UserService';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {useStore} from '../../../containers/StoreContainer';
import Button from './Button';
import Popup from '../Popup';
import {DotsIcon} from '../Icons';
import BottomSheetModal from '../BottomSheetModal';
import {colors, useColors} from '../../../hooks/customHooks';
import View from '../View';
import Text from '../Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReportModalItemList = [
  {title: 'Nudity/Pornography', id: 1},
  {title: 'Harassment/Bullying', id: 2},
  {title: 'Violence/Threat of Violence', id: 3},
  {title: 'Hate Speech/Symbols', id: 4},
  {title: 'Self Harm', id: 5},
  {title: 'Pretending to be someone else', id: 6},
  {title: 'Other...', id: 0},
];

const ReportModalItem = ({title, onPress, selected}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-between'}}
        disableTheme>
        <Text>{title}</Text>
        <MaterialCommunityIcons
          name={selected ? 'check-circle' : 'circle-outline'}
          color={selected ? '#0AAEEF' : 'gray'}
          size={22}
        />
      </View>
    </Pressable>
  );
};

const ReportModal = ({visible, onDismiss, username, id, type}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  const sendReportApi = useMutation(sendReport);

  const handlePressReport = () => {
    if (selectedIndex === undefined) {
      showMessage({message: 'Please select a reason', type: 'warning'});
      return;
    }

    sendReportApi.mutate(
      {
        id,
        type,
        reason: ReportModalItemList[selectedIndex].id,
      },
      {
        onSuccess: () => {
          onDismiss();
          showMessage({
            message: 'Report has been sent. Thank you for your activity.',
          });
        },
      },
    );
  };

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={() => {
        onDismiss();
        setSelectedIndex(undefined); // bug?
      }}
      snapPoints={['68%']}>
      <View style={{rowGap: 20, padding: 10}} disableTheme>
        <Text style={{alignSelf: 'center', fontWeight: '600'}}>Report</Text>
        <Text color={colors.blue}>
          Your report is anonymous, excep if you're reportingan intellectual
          property infringement. If someone is in immediate danger, call 911
        </Text>
        <Text style={{fontWeight: '600'}}>
          Username Handle <Text>@{username}</Text>
        </Text>
        {ReportModalItemList.map(({title, id}, index) => {
          return (
            <ReportModalItem
              key={index}
              title={title}
              selected={index === selectedIndex}
              onPress={() => setSelectedIndex(index)}
            />
          );
        })}
        <Button
          title="Report Account"
          theme={{backgroundColor: 'red'}}
          labelStyle={{color: 'white'}}
          onPress={handlePressReport}
        />
      </View>
    </BottomSheetModal>
  );
};

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
  const [reportModalVisible, setReportModalVisible] = useState(false);

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

  const handlePressAlert = () => {
    onDismiss();
    setReportModalVisible(true);
  };

  useEffect(() => {
    setSubscribed(subscribed);
  }, [subscribed]);

  return (
    <>
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
                onPress={handlePressAlert}
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
      <ReportModal
        visible={reportModalVisible}
        onDismiss={() => setReportModalVisible(false)}
        username={username}
        id={id}
        type={type}
      />
    </>
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
