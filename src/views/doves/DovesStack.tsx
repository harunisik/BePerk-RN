import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';
import FollowersScreenOptions from '../profile/FollowersScreenOptions';
import Followers from '../profile/Followers';
import PostDove from './PostDove';
import PostDoveScreenOptions from './PostDoveScreenOptions';
import DovesScreenOptions from './DovesScreenOptions';
import Activity from './Activity';
import Profile from '../profile/Profile';
import ProfileScreenOptions from '../profile/ProfileScreenOptions';
import Search from './Search';
import StoryView from '../profile/StoryView';

const Stack = createNativeStackNavigator();

const DovesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Doves.name}
        component={Doves}
        options={DovesScreenOptions}
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
        name={PostDove.name}
        component={PostDove}
        options={PostDoveScreenOptions}
      />
      <Stack.Screen name={Activity.name} component={Activity} />
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileScreenOptions}
      />
      <Stack.Screen name={Search.name} component={Search} />
      <Stack.Screen
        name={StoryView.name}
        component={StoryView}
        options={{
          animation: 'fade',
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
    </Stack.Navigator>
  );
};

export default DovesStack;
