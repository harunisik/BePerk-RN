import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';
import FollowersOptions from '../profile/FollowerOptions';
import Followers from '../profile/Followers';

const DovesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={Doves.name} component={Doves} />
      <Stack.Screen name={Comment.name} component={Comment} />
      <Stack.Screen
        name={Followers.name}
        component={Followers}
        options={FollowersOptions}
      />
    </Stack.Navigator>
  );
};

export default DovesStack;
