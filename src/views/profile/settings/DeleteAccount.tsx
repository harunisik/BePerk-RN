import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {deleteUser as userDeleteUser} from '../../../services/AuthService';
import {useStore} from '../../../containers/StoreContainer';
import {AuthActionType} from '../../../containers/AuthAction';
import {showMessage} from 'react-native-flash-message';
import Popup from '../../../components/common/Popup';
import {SettingsListItem1} from './Settings';

const pageTitle = 'Delete account';

export const DeleteAccountListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() => navigation.navigate(DeleteAccount.name)}
      title={pageTitle}
    />
  );
};

const DeleteAccount = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  const {
    store: {
      userInfo: {userId},
    },
    dispatch,
  } = useStore();
  const deleteUser = useMutation(userDeleteUser);

  const handleModalDelete = () => {
    deleteUser.mutate(
      {
        id: userId,
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
