import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Featured from './Featured';
import FeaturedItemDetails from './FeaturedItemDetails';
import FeaturedScreenOptions from './FeaturedScreenOptions';
import Comment from '../doves/Comment';
import Followers from '../profile/Followers';
import FollowersScreenOptions from '../profile/FollowersScreenOptions';
import ProfileStack from '../profile/ProfileStack';

const Stack = createNativeStackNavigator();

const FeaturedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Featured.name}
        component={Featured}
        options={FeaturedScreenOptions}
      />
      <Stack.Screen
        name={FeaturedItemDetails.name}
        component={FeaturedItemDetails}
        options={{
          headerTransparent: true,
          title: '',
          headerBackTitleVisible: false,
        }}
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
        name={ProfileStack.name}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FeaturedStack;
