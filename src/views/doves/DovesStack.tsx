import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';
import Followers, {FollowersOptions} from '../profile/Followers';

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
