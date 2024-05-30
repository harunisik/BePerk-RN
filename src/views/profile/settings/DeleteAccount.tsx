import {Pressable} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {deleteUser as userDeleteUser} from '../../../services/AuthService';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';
import {showMessage} from 'react-native-flash-message';
import Popup from '../../../components/common/Popup';
import Text from '../../../components/common/Text';

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
    <Popup
      visible={modalVisible}
      header="Delete Your Account?"
      message="If you delete your account, all your post will be deleted beyond retrieval"
      onPressOk={handleModalDelete}
      onPressCancel={handleModalCancel}
    />
  );
};

export default DeleteAccount;
