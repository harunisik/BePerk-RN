import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../doves/Search';
import StoryView from '../profile/StoryView';
import Stories from './Stories';
import StoriesScreenOptions from './StoriesScreenOptions';
import Profile from '../profile/Profile';
import ProfileScreenOptions from '../profile/ProfileScreenOptions';

const StoriesStack = () => {
  const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default StoriesStack;
