import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';
import Followers, {FollowersScreenOptions} from '../profile/Followers';
import PostDove, {PostDoveScreenOptions} from './PostDove';
import DovesScreenOptions from './DovesScreenOptions';
import Activity from './Activity';
import Search from './Search';
import StoryView from '../profile/StoryView';
import ProfileStack from '../profile/ProfileStack';

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
      <Stack.Screen
        name={ProfileStack.name}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default DovesStack;
