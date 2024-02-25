import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';
import {useStore} from '../../containers/StoreContainer';
import {ModalActionType} from '../../containers/ModalAction';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';
import Followers from '../../views/profile/Followers';

const UserProfileModal = ({navigation, userId}) => {
  const {dispatch} = useStore();
  const {aiCenter, cGap15, row} = common;

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
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
          dispatch({type: ModalActionType.CLOSE});
          navigation.navigate(Followers.name, {id: userId, type: 6});
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
    </View>
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
