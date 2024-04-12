import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import HomeScreenOptions from './HomeScreenOptions';
import Search from '../doves/Search';
import Activity from '../doves/Activity';
import Comment from '../doves/Comment';
import Followers from '../profile/Followers';
import FollowersScreenOptions from '../profile/FollowersScreenOptions';
import Explore from './Explore';
import ExplorePostsDetails from '../profile/ExplorePostsDetails';
import ProfileStack from '../profile/ProfileStack';

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
        name={Comment.name}
        component={Comment}
        options={{presentation: 'formSheet'}}
      />
      <Stack.Screen
        name={Followers.name}
        component={Followers}
        options={FollowersScreenOptions}
      />
      <Stack.Screen name={Explore.name} component={Explore} />
      <Stack.Screen
        name={ExplorePostsDetails.name}
        component={ExplorePostsDetails}
        options={{title: 'Posts'}}
      />
      <Stack.Screen
        name={ProfileStack.name}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
