import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../views/Settings';
import Profile, {ProfileOptions} from '../views/Profile';

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Profile.name}
        component={Profile}
        options={ProfileOptions}
      />
      <Stack.Screen name={Settings.name} component={Settings} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
