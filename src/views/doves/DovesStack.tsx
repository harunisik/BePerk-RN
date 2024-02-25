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

const DovesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Doves.name}
        component={Doves}
        options={DovesScreenOptions}
      />
      <Stack.Screen name={Comment.name} component={Comment} />
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
    </Stack.Navigator>
  );
};

export default DovesStack;
