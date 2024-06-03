import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost, {NewPostScreenOptions} from './NewPost';
import {useRoute} from '@react-navigation/native';
import UserSearch, {UserSearchScreenOptions} from '../profile/UserSearch';
import NewStory, {NewStoryScreenOptions} from './NewStory';
import PostDove, {PostDoveScreenOptions} from '../doves/PostDove';
import GooglePlaces, {GooglePlacesScreenOptions} from './GooglePlaces';
import {useColors} from '../../hooks/customHooks';

const Stack = createNativeStackNavigator();

const AddStack = () => {
  const route = useRoute();
  const {
    params: {assets},
  } = route;

  const {color, backgroundColor} = useColors();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor},
        headerTitleStyle: {color},
      }}>
      <Stack.Screen
        name={NewPost.name}
        component={NewPost}
        options={NewPostScreenOptions}
        initialParams={{assets}}
      />
      <Stack.Screen
        name={NewStory.name}
        component={NewStory}
        options={NewStoryScreenOptions}
        initialParams={{assets}}
      />
      <Stack.Screen
        name={UserSearch.name}
        component={UserSearch}
        options={UserSearchScreenOptions}
      />
      <Stack.Screen
        name={GooglePlaces.name}
        component={GooglePlaces}
        options={GooglePlacesScreenOptions}
      />
      <Stack.Screen
        name={PostDove.name}
        component={PostDove}
        options={PostDoveScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default AddStack;
