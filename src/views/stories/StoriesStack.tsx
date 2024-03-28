import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../doves/Search';
import StoryView from '../profile/StoryView';
import Stories from './Stories';
import StoriesScreenOptions from './StoriesScreenOptions';
import Profile from '../profile/Profile';
import ProfileScreenOptions from '../profile/ProfileScreenOptions';
import Followers from '../profile/Followers';
import FollowersScreenOptions from '../profile/FollowersScreenOptions';

const Stack = createNativeStackNavigator();

const StoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Stories.name}
        component={Stories}
        options={StoriesScreenOptions}
      />
      <Stack.Screen name={Search.name} component={Search} />
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileScreenOptions}
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
        name={Followers.name}
        component={Followers}
        options={FollowersScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default StoriesStack;
