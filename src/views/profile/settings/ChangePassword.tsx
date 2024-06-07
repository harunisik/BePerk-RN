import {TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {changePassword as userPostPassword} from '../../../services/AuthService';
import {showMessage} from 'react-native-flash-message';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import HR from '../../../components/common/HR';
import {SettingsListItem1} from './Settings';
import TextInput from '../../../components/common/TextInput';
import Button from '../../../components/common/buttons/Button';

const {gray, aiCenter, rGap30} = common;

const pageTitle = 'Change password';

export const ChangePasswordListItem = () => {
  const navigation = useNavigation();

  return (
    <SettingsListItem1
      onPress={() => navigation.navigate(ChangePassword.name)}
      title={pageTitle}
    />
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();
  const postPassword = useMutation(userPostPassword);

  const handlePressSave = () => {
    if (!oldPassword) {
      showMessage({
        message: 'Old password is empty',
        type: 'warning',
      });
      return;
    }

    if (!newPassword) {
      showMessage({
        message: 'New password is empty',
        type: 'warning',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showMessage({
        message: 'New password is not the same as confirm password',
        type: 'danger',
      });
      return;
    }

    postPassword.mutate(
      {
        oldPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          navigation.goBack();
          showMessage({message: 'Password changed'});
        },
      },
    );
  };

  return (
    <View style={[aiCenter, rGap30, {paddingVertical: 30, flex: 1}]}>
      <View style={{width: '75%'}}>
        <Text style={gray}>Old password</Text>
        <TextInput
          placeholder="Tap to enter old password"
          onChangeText={setOldPassword}
          value={oldPassword}
          secureTextEntry
          style={{paddingLeft: 0}}
        />
        <HR />
      </View>
      <View style={{width: '75%'}}>
        <Text style={gray}>New password</Text>
        <TextInput
          placeholder="Tap to enter new password"
          onChangeText={setNewPassword}
          value={newPassword}
          secureTextEntry
          style={{paddingLeft: 0}}
        />
        <HR />
      </View>
      <View style={{width: '75%'}}>
        <Text style={gray}>Confirm new password</Text>
        <TextInput
          placeholder="Tap to enter confirm password"
          onChangeText={setConfirmNewPassword}
          value={confirmNewPassword}
          secureTextEntry
          style={{paddingLeft: 0}}
        />
        <HR />
      </View>
      <Button
        title="Save"
        onPress={handlePressSave}
        style={{paddingHorizontal: 70}}
      />
    </View>
  );
};

export default ChangePassword;
