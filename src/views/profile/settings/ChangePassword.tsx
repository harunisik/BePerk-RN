import {Pressable, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import common from '../../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {changePassword as userPostPassword} from '../../../services/AuthService';
import {showMessage} from 'react-native-flash-message';
import Text from '../../../components/common/Text';
import View from '../../../components/common/View';
import HR from '../../../components/common/HR';

const {row, gray, aiCenter, rGap30, jcSpaceBetween} = common;

const pageTitle = 'Change password';

export const ChangePasswordListItem = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(ChangePassword.name)}
      style={[row, jcSpaceBetween, aiCenter]}>
      <Text>{pageTitle}</Text>
      <MaterialIcons name="arrow-forward-ios" color="gray" size={20} />
    </Pressable>
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
    <View style={[aiCenter, rGap30, {paddingVertical: 40}]}>
      <View style={{width: '75%'}}>
        <Text style={gray}>Old password</Text>
        <TextInput
          placeholder="Tap to enter old password"
          onChangeText={setOldPassword}
          value={oldPassword}
          style={[styles.textInput, styles.line]}
          secureTextEntry
        />
      </View>
      <View style={{width: '75%'}}>
        <Text style={gray}>New password</Text>
        <TextInput
          placeholder="Tap to enter new password"
          onChangeText={setNewPassword}
          value={newPassword}
          style={[styles.textInput, styles.line]}
          secureTextEntry
        />
      </View>
      <View style={{width: '75%'}}>
        <Text style={gray}>Confirm new password</Text>
        <TextInput
          placeholder="Tap to enter confirm password"
          onChangeText={setConfirmNewPassword}
          value={confirmNewPassword}
          secureTextEntry
        />
        <HR />
      </View>
      <TouchableOpacity
        style={[
          {
            backgroundColor: 'dodgerblue',
            padding: 15,
            width: '75%',
            borderRadius: 20,
          },
          aiCenter,
        ]}
        onPress={handlePressSave}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
