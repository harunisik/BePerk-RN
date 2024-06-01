import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home, {HomeScreenOptions} from './Home';
import Search from '../doves/Search';
import Activity from '../doves/Activity';
import Comment from '../doves/Comment';
import UserSearch, {UserSearchScreenOptions} from '../profile/UserSearch';
import Explore from './Explore';
import ExplorePostsDetails from '../profile/ExplorePostsDetails';
import ProfileStack from '../profile/ProfileStack';
import StoryView from '../profile/StoryView';
import Messages, {MessagesScreenOptions} from '../profile/Messages';
import {useColors} from '../../hooks/customHooks';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {color, backgroundColor} = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor},
        headerTitleStyle: {color},
      }}>
      <Stack.Screen
        name={Home.name}
        component={Home}
        options={HomeScreenOptions}
        initialParams={{badgeCount: 0}}
      />
      <Stack.Screen name={Search.name} component={Search} />
      <Stack.Screen name={Activity.name} component={Activity} />
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
    </Stack.Navigator>
  );
};

export default HomeStack;
