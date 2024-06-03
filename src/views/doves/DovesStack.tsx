import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves, {DovesScreenOptions} from './Doves';
import Comment, {CommentScreenOptions} from './Comment';
import UserSearch, {UserSearchScreenOptions} from '../profile/UserSearch';
import PostDove, {PostDoveScreenOptions} from './PostDove';
import Activity from './Activity';
import Search from './Search';
import StoryView from '../profile/StoryView';
import ProfileStack from '../profile/ProfileStack';
import {useColors} from '../../hooks/customHooks';

const Stack = createNativeStackNavigator();

const DovesStack = () => {
  const {color, backgroundColor} = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor},
        headerTitleStyle: {color},
      }}>
      <Stack.Screen
        name={Doves.name}
        component={Doves}
        options={DovesScreenOptions}
      />
      <Stack.Screen
        name={Comment.name}
        component={Comment}
        options={CommentScreenOptions}
      />
      <Stack.Screen
        name={UserSearch.name}
        component={UserSearch}
        options={UserSearchScreenOptions}
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
