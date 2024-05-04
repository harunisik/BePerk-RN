import {View, Text, Pressable, StyleSheet} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Modal} from 'react-native';
import {useState} from 'react';
import {useCustomMutation as useMutation} from '../../../hooks/customHooks';
import {deleteUser as userDeleteUser} from '../../../services/AuthService';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';
import {showMessage} from 'react-native-flash-message';

const {row, aiCenter, jcSpaceBetween, bold, font16} = common;

const pageTitle = 'Delete account';

export const DeleteAccountListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(DeleteAccount.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
  );
};

const DeleteModal = ({onDelete, onCancel, modalVisible}) => {
  return (
    <Modal transparent={true} visible={modalVisible} onRequestClose={onCancel}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 40,
            shadowOpacity: 0.25,
          }}>
          <View style={{alignItems: 'center', padding: 20, rowGap: 5}}>
            <Text style={[bold, font16]}>Delete Your Account?</Text>
            <Text>
              If you delete your account, all your post will be deleted beyond
              retrieval
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Pressable
              style={{
                paddingVertical: 15,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: 'gray',
                alignItems: 'center',
              }}
              onPress={onDelete}>
              <Text style={{color: 'red'}}>Delete Account</Text>
            </Pressable>
            <Pressable
              style={{
                paddingVertical: 15,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: 'gray',
                alignItems: 'center',
              }}
              onPress={onCancel}>
              <Text style={{color: 'dodgerblue'}}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const {
    store: {
      authResult: {id},
    },
    dispatch,
  } = useStore();
  const deleteUser = useMutation(userDeleteUser);

  const handleModalDelete = () => {
    deleteUser.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          showMessage({message: 'Account deleted'});
          setModalVisible(false);
          dispatch({type: AuthActionType.SIGN_OUT});
        },
      },
    );
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <DeleteModal
      modalVisible={modalVisible}
      onDelete={handleModalDelete}
      onCancel={handleModalCancel}
    />
  );
};

export default DeleteAccount;
