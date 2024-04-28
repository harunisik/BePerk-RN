import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './auth/SignIn';
import BottomTab from './BottomTab';
import CreateNewAccount from './profile/settings/CreateNewAccount';
import AddStack from './add/AddStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {store} = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!store.authResult ? (
          <>
            <Stack.Screen name={SignIn.name} component={SignIn} />
            <Stack.Screen
              name={CreateNewAccount.name}
              component={CreateNewAccount}
            />
          </>
        ) : (
          <>
            <Stack.Screen name={BottomTab.name} component={BottomTab} />
            <Stack.Screen
              name={AddStack.name}
              component={AddStack}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
