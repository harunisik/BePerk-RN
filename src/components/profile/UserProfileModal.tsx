import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import Followers, {ChatShareHeaderRight} from '../../views/profile/Followers';
import {useNavigation} from '@react-navigation/native';
import BottomModal from '../common/BottomModal';

const {aiCenter, cGap15, row} = common;

const UserProfileModal = ({userId, visible, onDismiss}) => {
  const navigation = useNavigation();

  return (
    <BottomModal visible={visible} onDismiss={onDismiss}>
      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          onDismiss();
          showMessage({message: 'Link copied'});
          Clipboard.setString(`beperk://profile?id=${userId}`);
        }}>
        <MaterialCommunityIcons
          name="content-copy"
          size={26}
          color="dodgerblue"
        />
        <Text>Copy Link</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          onDismiss();
          navigation.navigate(Followers.name, {
            presentation: 'none',
            headerRightComp: ChatShareHeaderRight.name,
            headerRightProps: {itemId: userId, type: 6},
          });
        }}>
        <MaterialCommunityIcons name="share" size={26} color="dodgerblue" />
        <Text>Share This Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => Alert.alert('under construction')}>
        <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
        <Text>Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => Alert.alert('under construction')}>
        <MaterialIcons name="block" size={26} color="red" />
        <Text>Block</Text>
      </TouchableOpacity>
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
