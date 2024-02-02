import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile, {ProfileOptions} from '../views/Profile';
import Settings from '../views/Settings';
import SwitchAccount from '../views/SwitchAccount';

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
      <Stack.Screen
        name={SwitchAccount.name}
        component={SwitchAccount}
        options={{title: 'Switch Account'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
