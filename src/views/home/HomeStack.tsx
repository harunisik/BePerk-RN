import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import HomeScreenOptions from './HomeScreenOptions';
import Search from '../doves/Search';
import Activity from '../doves/Activity';
import Profile from '../profile/Profile';
import ProfileScreenOptions from '../profile/ProfileScreenOptions';
import Comment from '../doves/Comment';
import Followers from '../profile/Followers';
import FollowersScreenOptions from '../profile/FollowersScreenOptions';
import FeaturedItemDetails from './FeaturedItemDetails';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Home.name}
        component={Home}
        options={HomeScreenOptions}
      />
      <Stack.Screen name={Search.name} component={Search} />
      <Stack.Screen name={Activity.name} component={Activity} />
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileScreenOptions}
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
        name={FeaturedItemDetails.name}
        component={FeaturedItemDetails}
        options={{
          headerTransparent: true,
          title: '',
        }}
        initialParams={{data: []}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
