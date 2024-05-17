import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../containers/StoreContainer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './auth/SignIn';
import BottomTab from './BottomTab';
import CreateNewAccount from './profile/settings/CreateNewAccount';
import AddStack from './add/AddStack';
import * as Keychain from 'react-native-keychain';
import BootSplash from 'react-native-bootsplash';
import {useEffect, useState} from 'react';
import {oneSignalToken} from '../services/AuthService';
import {useMutation} from '../hooks/customHooks';
import {AuthActionType} from '../containers/AuthAction';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const {store, dispatch} = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const oneSignalTokenApi = useMutation(oneSignalToken);

  useEffect(() => {
    const init = async () => {
      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          oneSignalTokenApi.mutate(credentials.password, {
            onSuccess: data => {
              dispatch({
                type: AuthActionType.SIGN_IN,
                authResult: {
                  id: data.user_id,
                  token: credentials.password,
                  username: '',
                },
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
      // setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (store.authResult) {
      setIsLoading(false);
      BootSplash.hide({fade: true});
    }
  }, [store.authResult]);

  useEffect(() => {
    if (!isLoading) {
      // BootSplash.hide({fade: true});
    }
  }, [isLoading]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
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
