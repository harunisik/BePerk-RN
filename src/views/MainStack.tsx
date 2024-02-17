import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './SignIn';
import BottomTab from './BottomTab';

const MainStack = () => {
  const Stack = createNativeStackNavigator();

  const {store} = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!store.authResult ? (
          <Stack.Screen name={SignIn.name} component={SignIn} />
        ) : (
          <Stack.Screen name={BottomTab.name} component={BottomTab} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
