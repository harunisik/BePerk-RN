import {StyleSheet, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import UserSearch, {ChatShareHeaderRight} from '../../views/profile/UserSearch';
import {useNavigation} from '@react-navigation/native';
import BottomModal from '../common/BottomModal';
import {CopyIcon, ShareIcon} from '../common/Icons';
import Button from '../common/buttons/Button';

const UserProfileModal = ({userId, visible, onDismiss}) => {
  const navigation = useNavigation();

  return (
    <BottomModal visible={visible} onDismiss={onDismiss}>
      <Button
        title="Copy Link"
        onPress={() => {
          onDismiss();
          showMessage({message: 'Link copied'});
          Clipboard.setString(`beperk://profile?id=${userId}`);
        }}
        icon={<CopyIcon />}
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
        icon={<ShareIcon />}
      />

      <Button
        title="Report"
        onPress={() => Alert.alert('under construction')}
        icon={
          <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
        }
      />

      <Button
        title="Block"
        onPress={() => Alert.alert('under construction')}
        icon={<MaterialIcons name="block" size={26} color="red" />}
      />
    </BottomModal>
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
