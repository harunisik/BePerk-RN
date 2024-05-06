import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost, {NewPostScreenOptions} from './NewPost';
import {useRoute} from '@react-navigation/native';
import Followers, {FollowersScreenOptions} from '../profile/Followers';
import GooglePlaces from './GooglePlaces';
import GooglePlacesScreenOptions from './GooglePlacesScreenOptions';
import NewStory, {NewStoryScreenOptions} from './NewStory';
import PostDove, {PostDoveScreenOptions} from '../doves/PostDove';

const Stack = createNativeStackNavigator();

const AddStack = () => {
  const route = useRoute();
  const {
    params: {assets},
  } = route;

  return (
    <Stack.Navigator>
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
        name={Followers.name}
        component={Followers}
        options={FollowersScreenOptions}
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
