import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './settings/Settings';
import SwitchAccount from './settings/SwitchAccount';
import EditProfile, {EditProfileScreenOptions} from './settings/EditProfile';
import ChangePassword from './settings/ChangePassword';
import Invite from './settings/Invite';
import CreateNewAccount from './settings/CreateNewAccount';
import RequestVerification from './settings/ReuqestVerification';
import DeleteAccount from './settings/DeleteAccount';
import PrivacyPolicy from './settings/PrivacyPolicy';
import Terms from './settings/Terms';
import Comment from '../doves/Comment';
import FollowersScreenOptions from './FollowersScreenOptions';
import Followers from './Followers';
import Profile from './Profile';
import ProfileScreenOptions from './ProfileScreenOptions';
import ProfilePostsDetails from './ProfilePostsDetails';
import StoryView from './StoryView';
import {useRoute} from '@react-navigation/native';
import {useStore} from '../../containers/StoreContainer';
import Messages from './Messages';
import MessagesScreenOptions from './MessagesScreenOptions';
import MessageDetails from './MessageDetails';
import MessageDetailsScreenOptions from './MessageDetailsScreenOptions';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const route = useRoute();
  const {
    params: {userId, username, headerBackVisible},
  } = route;
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileScreenOptions}
        initialParams={{
          userId,
          username,
          headerBackVisible: headerBackVisible,
          isAuthUser: userId === id,
        }}
      />
      <Stack.Screen name={Settings.name} component={Settings} />
      <Stack.Screen
        name={EditProfile.name}
        component={EditProfile}
        options={EditProfileScreenOptions}
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
      <Stack.Screen
        name={Comment.name}
        component={Comment}
        options={{presentation: 'formSheet'}}
      />
      <Stack.Screen
        name={Followers.name}
        component={Followers}
        options={FollowersScreenOptions}
      />
      <Stack.Screen
        name={ProfilePostsDetails.name}
        component={ProfilePostsDetails}
        options={{title: 'Posts'}}
      />
      <Stack.Screen
        name={StoryView.name}
        component={StoryView}
        options={{
          animation: 'fade',
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name={Messages.name}
        component={Messages}
        options={MessagesScreenOptions}
      />
      <Stack.Screen
        name={MessageDetails.name}
        component={MessageDetails}
        options={MessageDetailsScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
