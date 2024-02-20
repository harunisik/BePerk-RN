import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {deletePost} from '../../services/UserService';
import {useMutation} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {showMessage} from 'react-native-flash-message';
import {ModalActionType} from '../../containers/ModalAction';
import Clipboard from '@react-native-clipboard/clipboard';

export const DovesItemModal = ({item, onDeleteItem = () => {}}) => {
  const {aiCenter, jcCenter, row} = common;
  const {dispatch} = useStore();

  const handleDeletePost = useMutation({
    mutationFn: posts => deletePost(posts),
    onSuccess: () => {
      onDeleteItem();
      dispatch({type: ModalActionType.CLOSE});
      showMessage({message: 'Message deleted'});
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, aiCenter, jcCenter, row]}
        onPress={() => {
          dispatch({type: ModalActionType.CLOSE});
          showMessage({message: 'Link copied'});
          Clipboard.setString(`beperk://dove?id=${item.id}`);
        }}>
        <MaterialCommunityIcons name="content-copy" size={26} color="blue" />
        <Text>Copy Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, aiCenter, jcCenter, row]}
        onPress={() =>
          handleDeletePost.mutate({
            items: JSON.stringify([{id: item.id, type: item.type}]),
          })
        }>
        <MaterialCommunityIcons name="delete" size={26} color="red" />
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default DovesItemModal;
