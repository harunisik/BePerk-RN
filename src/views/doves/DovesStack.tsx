import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Doves from './Doves';
import Comment from './Comment';

const DovesStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name={Doves.name} component={Doves} />
      <Stack.Screen name={Comment.name} component={Comment} />
    </Stack.Navigator>
  );
};

export default DovesStack;
