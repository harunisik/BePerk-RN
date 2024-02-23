import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useStore} from '../../containers/StoreContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';
import {showMessage} from 'react-native-flash-message';
import {ModalActionType} from '../../containers/ModalAction';
import Clipboard from '@react-native-clipboard/clipboard';
import {useDeletePost} from '../../hooks/userHooks';

const DovesItemModal = ({item, onDeleteItem = () => {}}) => {
  const {aiCenter, cGap15, row} = common;
  const {
    dispatch,
    store: {
      authResult: {id},
    },
  } = useStore();

  const handleDeletePost = useDeletePost(() => {
    onDeleteItem();
  });

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, aiCenter, row, cGap15]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
          showMessage({message: 'Link copied'});
          Clipboard.setString(`beperk://dove?id=${item.id}`);
        }}>
        <MaterialCommunityIcons name="content-copy" size={26} color="blue" />
        <Text>Copy Link</Text>
      </TouchableOpacity>
      {id === item.user_id ? (
        <TouchableOpacity
          style={[styles.button, aiCenter, row, cGap15]}
          onPress={() =>
            handleDeletePost.mutate({
              items: JSON.stringify([{id: item.id, type: item.type}]),
            })
          }>
          <MaterialCommunityIcons name="delete" size={26} color="red" />
          <Text>Delete</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            style={[styles.button, aiCenter, row, cGap15]}
            onPress={() => Alert.alert('under construction')}>
            <MaterialCommunityIcons
              name="bell-off-outline"
              size={26}
              color="blue"
            />
            <Text>Turn off Post Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, aiCenter, row, cGap15]}
            onPress={() => Alert.alert('under construction')}>
            <MaterialIcons name="report-gmailerrorred" size={26} color="red" />
            <Text>Report</Text>
          </TouchableOpacity>
        </View>
      )}
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

export default DovesItemModal;
