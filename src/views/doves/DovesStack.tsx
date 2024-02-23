import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';
import FollowersOptions from '../profile/FollowerOptions';
import Followers from '../profile/Followers';
import PostDove from './PostDove';
import PostDoveOptions from './PostDoveOptions';
import DovesOptions from './DovesOptions';

const DovesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Doves.name}
        component={Doves}
        options={DovesOptions}
      />
      <Stack.Screen name={Comment.name} component={Comment} />
      <Stack.Screen
        name={Followers.name}
        component={Followers}
        options={FollowersOptions}
      />
      <Stack.Screen
        name={PostDove.name}
        component={PostDove}
        options={PostDoveOptions}
      />
    </Stack.Navigator>
  );
};

export default DovesStack;
