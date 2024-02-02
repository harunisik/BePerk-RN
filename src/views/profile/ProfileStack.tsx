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
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name={ChangePassword.name}
        component={ChangePassword}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen name={Invite.name} component={Invite} />
      <Stack.Screen
        name={CreateNewAccount.name}
        component={CreateNewAccount}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name={RequestVerification.name}
        component={RequestVerification}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name={DeleteAccount.name}
        component={DeleteAccount}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen
        name={PrivacyPolicy.name}
        component={PrivacyPolicy}
        options={({route}) => ({title: route.params.title})}
      />
      <Stack.Screen name={Terms.name} component={Terms} />
      <Stack.Screen
        name={SwitchAccount.name}
        component={SwitchAccount}
        options={({route}) => ({title: route.params.title})}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
