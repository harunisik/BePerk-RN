import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './settings/Settings';
import SwitchAccount from './settings/SwitchAccount';
import EditProfile, {EditProfileScreenOptions} from './settings/EditProfile';
import ChangePassword from './settings/ChangePassword';
import Invite from './settings/Invite';
import CreateNewAccount, {
  CreateNewAccountScreenOptions,
} from '../auth/CreateNewAccount';
import RequestVerification from './settings/ReuqestVerification';
import DeleteAccount from './settings/DeleteAccount';
import Comment from '../doves/Comment';
import UserSearch, {UserSearchScreenOptions} from './UserSearch';
import Profile, {ProfileScreenOptions} from './Profile';
import ProfilePostsDetails from './ProfilePostsDetails';
import StoryView from './StoryView';
import {useRoute} from '@react-navigation/native';
import {useStore} from '../../containers/StoreContainer';
import Messages, {MessagesScreenOptions} from './Messages';
import MessageDetails, {MessageDetailsScreenOptions} from './MessageDetails';
import StoryView2 from './StoryView2';
import FollowersList from './FollowersList';
import WebView, {WebViewScreenOptions} from '../../components/common/WebView';
import MediaView, {MediaViewScreenOptions} from './MediaView';
import PostDetailItemView from './PostDetailsItemView';

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
          headerBackVisible,
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
        options={CreateNewAccountScreenOptions}
      />
      <Stack.Screen
        name={RequestVerification.name}
        component={RequestVerification}
        options={{title: 'Request verification'}}
      />
      <Stack.Screen
        name={DeleteAccount.name}
        component={DeleteAccount}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
          headerShown: false,
        }}
      />
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
        name={UserSearch.name}
        component={UserSearch}
        options={UserSearchScreenOptions}
      />
      <Stack.Screen
        name={FollowersList.name}
        component={FollowersList}
        options={{title: ''}}
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
        name={StoryView2.name}
        component={StoryView2}
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
      <Stack.Screen
        name={WebView.name}
        component={WebView}
        options={WebViewScreenOptions}
      />
      <Stack.Screen
        name={MediaView.name}
        component={MediaView}
        options={MediaViewScreenOptions}
      />
      <Stack.Screen
        name={PostDetailItemView.name}
        component={PostDetailItemView}
        options={{title: 'Post'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
