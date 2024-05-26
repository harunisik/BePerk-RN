import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './auth/SignIn';
import BottomTab from './BottomTab';
import CreateNewAccount from './auth/CreateNewAccount';
import AddStack from './add/AddStack';
import * as Keychain from 'react-native-keychain';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {oneSignalToken} from '../services/AuthService';
import {useMutation} from '../hooks/customHooks';
import {AuthActionType} from '../containers/AuthAction';
import ForgotPassword from './auth/ForgotPassword';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {store, dispatch} = useStore();

  const oneSignalTokenApi = useMutation(oneSignalToken);

  useEffect(() => {
    const init = async () => {
      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const authResult = JSON.parse(credentials.password);

          oneSignalTokenApi.mutate(authResult.token, {
            onSuccess: () => {
              dispatch({
                type: AuthActionType.SIGN_IN,
                authResult,
              });
            },
          });
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!store.authResult ? (
          <>
            <Stack.Screen name={SignIn.name} component={SignIn} />
            <Stack.Screen
              name={ForgotPassword.name}
              component={ForgotPassword}
            />
            <Stack.Screen
              name={CreateNewAccount.name}
              component={CreateNewAccount}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={BottomTab.name}
              component={BottomTab}
              options={{animation: 'fade'}}
            />
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
