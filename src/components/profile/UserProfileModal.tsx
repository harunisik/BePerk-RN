import {StyleSheet, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import UserSearch, {ChatShareHeaderRight} from '../../views/profile/UserSearch';
import {useNavigation} from '@react-navigation/native';
import {CopyIcon, ShareIcon} from '../common/Icons';
import Button from '../common/buttons/Button';
import BottomSheetModal from '../common/BottomSheetModal';
import {colors, useColors} from '../../hooks/customHooks';
import View from '../common/View';
import {
  BlockUserButton,
  ShadowBanButton,
} from '../common/buttons/PostItemSettings';
import {useStore} from '../../containers/StoreContainer';
import {useEffect, useState} from 'react';

const UserProfileModal = ({
  userId,
  visible,
  onDismiss,
  bannedUntil,
  blocked,
}) => {
  const [_blocked, setBlocked] = useState(blocked === 1); // optimistic update
  const [banned, setBanned] = useState(bannedUntil !== 0); // optimistic update
  const navigation = useNavigation();
  const {theme, color} = useColors();
  const {
    store: {
      userInfo: {userId: authUserId},
    },
  } = useStore();
  const isBeperk = authUserId === 2565;

  useEffect(() => {
    setBanned(bannedUntil !== 0);
    setBlocked(blocked === 1);
  }, [bannedUntil, blocked]);

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      snapPoints={isBeperk ? ['42%'] : ['26%']}>
      <View style={{rowGap: 10, width: '85%'}} disableTheme>
        <Button
          title="Copy Link"
          onPress={() => {
            onDismiss();
            showMessage({message: 'Link copied'});
            Clipboard.setString(`beperk://profile?id=${userId}`);
          }}
          icon={<CopyIcon color={colors.blue} />}
          iconColor={colors.blue}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        <Button
          title="Share This Profile"
          onPress={() => {
            onDismiss();
            navigation.navigate(UserSearch.name, {
              presentation: 'none',
              headerRightComp: ChatShareHeaderRight.name,
              headerRightProps: {itemId: userId, type: 6},
            });
          }}
          icon={<ShareIcon color={colors.blue} />}
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />

        <Button
          title="Report"
          onPress={() => Alert.alert('under construction')}
          icon={
            <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
          }
          theme={{
            color,
            backgroundColor:
              theme === 'dark' ? 'rgb(50, 50, 50)' : 'rgb(245, 240, 240)',
          }}
        />
        {isBeperk && (
          <>
            <BlockUserButton
              onSuccess={() => {
                setBlocked(!_blocked);
                onDismiss();
              }}
              userId={userId}
              blocked={_blocked}
            />
            <ShadowBanButton
              onSuccess={() => {
                setBanned(!banned);
                onDismiss();
              }}
              userId={userId}
              banned={banned}
            />
          </>
        )}
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    paddingLeft: 70,
    margin: 10,
  },
});

export default UserProfileModal;
