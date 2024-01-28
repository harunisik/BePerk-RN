import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../views/SignIn';
import BottomTabNavigator from './BottomTabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  const {store} = useStore();

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!store.authResult ? (
            <Stack.Screen name={SignIn.name} component={SignIn} />
          ) : (
            <Stack.Screen
              name={BottomTabNavigator.name}
              component={BottomTabNavigator}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default MainNavigator;
