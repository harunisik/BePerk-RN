import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './settings/Settings';
import SwitchAccount from './settings/SwitchAccount';
import EditProfile from './settings/EditProfile';
import ChangePassword from './settings/ChangePassword';
import Invite from './settings/Invite';
import CreateNewAccount from './settings/CreateNewAccount';
import RequestVerification from './settings/ReuqestVerification';
import DeleteAccount from './settings/DeleteAccount';
import PrivacyPolicy from './settings/PrivacyPolicy';
import Terms from './settings/Terms';
import Comment from '../doves/Comment';
import FollowersOptions from './FollowerOptions';
import Followers from './Followers';
import Profile from './Profile';
import ProfileOptions from './ProfileOptions';

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
      <Stack.Screen name={Comment.name} component={Comment} />
      <Stack.Screen
        name={Followers.name}
        component={Followers}
        options={FollowersOptions}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
