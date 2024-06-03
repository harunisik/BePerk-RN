import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Featured, {FeaturedScreenOptions} from './Featured';
import FeaturedItemDetails from './FeaturedItemDetails';
import Comment, {CommentScreenOptions} from '../doves/Comment';
import UserSearch, {UserSearchScreenOptions} from '../profile/UserSearch';
import ProfileStack from '../profile/ProfileStack';
import {useColors} from '../../hooks/customHooks';

const Stack = createNativeStackNavigator();

const FeaturedStack = () => {
  const {color, backgroundColor} = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor},
        headerTitleStyle: {color},
      }}>
      <Stack.Screen
        name={Featured.name}
        component={Featured}
        options={FeaturedScreenOptions}
      />
      <Stack.Screen
        name={FeaturedItemDetails.name}
        component={FeaturedItemDetails}
        options={{
          animation: 'fade',
          headerTransparent: true,
          title: '',
          headerBackTitleVisible: false,
        }}
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
        name={ProfileStack.name}
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default FeaturedStack;
