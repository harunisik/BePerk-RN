import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile, {ProfileOptions} from './Profile';
import Settings from './Settings';
import SwitchAccount from './SwitchAccount';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Invite from './Invite';
import CreateNewAccount from './CreateNewAccount';
import RequestVerification from './ReuqestVerification';
import DeleteAccount from './DeleteAccount';
import PrivacyPolicy from './PrivacyPolicy';
import Terms from './Terms';

const ProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileOptions}
      />
      <Stack.Screen name={Settings.name} component={Settings} />
      <Stack.Screen
        name={EditProfile.name}
        component={EditProfile}
        options={{title: 'Edit profile'}}
      />
      <Stack.Screen
        name={ChangePassword.name}
        component={ChangePassword}
        options={{title: 'Change password'}}
      />
      <Stack.Screen name={Invite.name} component={Invite} />
      <Stack.Screen
        name={CreateNewAccount.name}
        component={CreateNewAccount}
        options={{title: 'Create a new account'}}
      />
      <Stack.Screen
        name={RequestVerification.name}
        component={RequestVerification}
        options={{title: 'Request verification'}}
      />
      <Stack.Screen
        name={DeleteAccount.name}
        component={DeleteAccount}
        options={{title: 'Delete account'}}
      />
      <Stack.Screen
        name={PrivacyPolicy.name}
        component={PrivacyPolicy}
        options={{title: 'Privacy policy'}}
      />
      <Stack.Screen name={Terms.name} component={Terms} />
      <Stack.Screen
        name={SwitchAccount.name}
        component={SwitchAccount}
        options={{title: 'Switch account'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
