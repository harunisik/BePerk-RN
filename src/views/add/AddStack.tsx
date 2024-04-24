import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPost, {NewPostScreenOptions} from './NewPost';
import {useRoute} from '@react-navigation/native';

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
    </Stack.Navigator>
  );
};

export default AddStack;
