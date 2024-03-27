import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import HomeScreenOptions from './HomeScreenOptions';
import Search from '../doves/Search';
import Activity from '../doves/Activity';
import Profile from '../profile/Profile';
import ProfileScreenOptions from '../profile/ProfileScreenOptions';

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default HomeStack;
